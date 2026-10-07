import { stub } from './setup.ts';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { sql, closeDb } from '@aihot/backend/db';
import { prepareDiscovery } from '../scripts/maker-discovery.ts';

test('a daily plan uses one model call, creates four searches, and preserves administrator disabling',async()=>{
  const fixture={searches:[
    {category:'hardware',query:'AI robot',reason:'硬件'},
    {category:'ai-products',query:'AI design',reason:'设计'},
    {category:'industry',query:'LLM agent',reason:'应用'},
    {category:'tip',query:'AI classroom',reason:'教育'},
  ]};
  const provider=await stub(()=>({choices:[{message:{content:JSON.stringify(fixture)}}],usage:{prompt_tokens:1,completion_tokens:1}}));
  Object.assign(process.env,{SOCIALDATA_API_KEY:'test-only',LLM_BASE_URL:provider.url,LLM_API_KEY:'test-only',LLM_MODEL:'test-only',MODEL_CALLS_ENABLED:'true'});
  const cwd=process.cwd(),temporary=mkdtempSync(join(tmpdir(),'maker-discovery-test-'));
  try {
    process.chdir(temporary);
    await prepareDiscovery();
    await sql`UPDATE sources SET enabled=false WHERE id='maker-discovery-tip'`;
    await prepareDiscovery();
    assert.equal(provider.hits(),1,'retries reuse the daily plan without additional paid calls');
    const rows=await sql`SELECT id,enabled,config FROM sources WHERE id LIKE 'maker-discovery-%' ORDER BY id`;
    assert.equal(rows.length,4);
    assert.equal(rows.find(r=>r.id==='maker-discovery-tip')!.enabled,false);
    assert.ok(rows.every(r=>r.config.query.includes('(AI OR LLM OR "artificial intelligence")')));
  } finally {
    process.chdir(cwd);rmSync(temporary,{recursive:true,force:true});
    await sql`DELETE FROM sources WHERE id LIKE 'maker-discovery-%'`;
    await provider.close();await closeDb();
  }
});
