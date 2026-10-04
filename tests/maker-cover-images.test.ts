import { test } from 'node:test';
import assert from 'node:assert/strict';
import { coverCandidates } from '../scripts/maker-cover-images.ts';

test('covers fall back to article images and prefer large lazy srcsets',()=>{
  const html='<img src="/nav.jpg"><main><img alt="Logo" src="/logo.png"><img data-srcset="/small.jpg 400w, /large.jpg 1200w" data-src="/lazy.jpg" src="/fallback.jpg"></main>';
  assert.deepEqual(coverCandidates(html,'https://example.com/article'),['https://example.com/large.jpg','https://example.com/small.jpg','https://example.com/lazy.jpg','https://example.com/fallback.jpg']);
});
test('social cover has priority and unsafe image schemes and credentials are ignored',()=>{
  const html='<meta property="og:image" content="https://cdn.example.com/cover.jpg"><img src="data:image/png;base64,AA"><img src="file:///etc/passwd"><img src="https://user:password@example.com/private.jpg"><img src="https://cdn.example.com/cover.jpg"><img src="//cdn.example.com/body.jpg">';
  assert.deepEqual(coverCandidates(html,'https://example.com/article'),['https://cdn.example.com/cover.jpg','https://cdn.example.com/body.jpg']);
});
