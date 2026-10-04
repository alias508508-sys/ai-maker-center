import assert from 'node:assert/strict';
import {test} from 'node:test';
import {projectLinks,restoreCandidateDates} from '../scripts/maker-source-scan.ts';
import {submissionSchema} from '@aihot/backend/admin/submissions';
test('full-source discovery excludes navigation, credentials, external hosts and downloads',()=>{
 const html='<nav><a href="/projects/menu">University menu links</a></nav><main><a href="/projects/robot">Student adaptive robot</a><a href="/projects/robot#demo">Student adaptive robot</a><a href="https://other.edu/projects/x">Unrelated external project</a><a href="https://user:secret@example.edu/projects/y">Secret-bearing project</a><a href="/projects/report.pdf">Download project report</a><a href="/admissions/about">Student admissions page</a></main>';
 assert.deepEqual(projectLinks(html,'https://example.edu/').map(c=>c.url),['https://example.edu/projects/robot']);
});
test('administrator submission accepts explicit AI hardware classification',()=>{
 assert.equal(submissionSchema.parse({kind:'link',url:'https://example.edu/project',category:'hardware'}).category,'hardware');
 assert.equal(submissionSchema.safeParse({kind:'link',url:'https://example.edu/project',category:'finance'}).success,false);
});

test('persisted RSS candidates restore dates before material storage',()=>{
 const original={url:'https://example.edu/news/robot',title:'Adaptive AI robot',publishedAt:new Date('2026-10-04T10:00:00Z'),sourceUpdatedAt:new Date('2026-10-04T11:00:00Z')};
 const restored=restoreCandidateDates(JSON.parse(JSON.stringify(original)));
 assert.equal(restored.publishedAt?.getTime(),original.publishedAt.getTime());
 assert.equal(restored.sourceUpdatedAt?.getTime(),original.sourceUpdatedAt.getTime());
});
