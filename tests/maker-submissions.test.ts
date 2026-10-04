import { tag } from './setup.ts';
import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import Fastify from 'fastify';
import { sql, closeDb } from '@aihot/backend/db';
import { config } from '@aihot/backend/config';
import { createSubmission, submissionSchema } from '@aihot/backend/admin/submissions';
import { registerAdmin } from '../apps/api/src/routes/admin.ts';
const T=tag();
after(async()=>{await sql`DELETE FROM maker_submissions WHERE request_key LIKE ${`test-maker-${T}%`}`;await sql`DELETE FROM audit_log WHERE actor=${`test-maker-${T}`}`;await closeDb();});
test('submission rejects unsupported links, incomplete articles and excessive images',()=>{
  for(const url of ['file:///etc/passwd','javascript:alert(1)','https://user:password@example.com'])assert.equal(submissionSchema.safeParse({kind:'link',url}).success,false);
  assert.equal(submissionSchema.safeParse({kind:'article',title:'标题',body:'短文'}).success,false);
  assert.equal(submissionSchema.safeParse({kind:'article',title:'标题',body:'正文'.repeat(20),images:['data:image/svg+xml;base64,AAAA']}).success,false);
});
test('duplicate submit saves exactly one private job and one audit entry',async()=>{
  const input={kind:'link',url:'https://example.com/news#section'};
  const key=`test-maker-${T}-duplicate`, actor=`test-maker-${T}`;
  const [a,b]=await Promise.all([createSubmission(input,key,actor),createSubmission(input,key,actor)]);
  assert.equal(a!.id,b!.id);
  const [row]=await sql`SELECT payload,status FROM maker_submissions WHERE request_key=${key}`;
  assert.equal(row!.payload.url,'https://example.com/news');assert.equal(row!.status,'queued');
  const [audit]=await sql`SELECT count(*)::int AS n FROM audit_log WHERE actor=${actor}`;assert.equal(audit!.n,1);
});
test('submission endpoint requires login and CSRF',async()=>{
  const saved=config.devAdmin;config.devAdmin=null;const app=Fastify();registerAdmin(app);
  try{assert.equal((await app.inject({method:'GET',url:'/api/admin/submissions'})).statusCode,401);assert.equal((await app.inject({method:'POST',url:'/api/admin/submissions',payload:{kind:'link',url:'https://example.com'}})).statusCode,401);}
  finally{config.devAdmin=saved;await app.close();}
});

test('an authenticated development session cannot submit without CSRF',async()=>{
  const saved={dev:config.devAdmin,env:config.environmentName};config.devAdmin={displayName:'Submission test'};config.environmentName='development';
  const app=Fastify();registerAdmin(app);
  try {assert.equal((await app.inject({method:'POST',url:'/api/admin/submissions',payload:{kind:'link',url:'https://example.com'}})).statusCode,403);}
  finally{config.devAdmin=saved.dev;config.environmentName=saved.env;await app.close();}
});
