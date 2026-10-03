import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { archiveBatch } from './maker-archive.ts';

test('归档保留每轮内容、北京时间日期和封面，重复运行不覆盖，首页移除不影响历史', () => {
  const root = mkdtempSync(join(tmpdir(), 'maker-archive-'));
  try {
    const first = {updatedAt: '2026-10-03T17:00:00.000Z', urls: ['https://example.com/1']};
    const index = archiveBatch(root, {items: [{url: first.urls[0], title: '第一条', cover: 'assets/covers/one.webp'}, {url: 'https://example.com/old', title: '旧内容'}]}, first);
    assert.equal(index[0].date, '2026-10-04');
    const original = readFileSync(join(root, 'archive', index[0].file), 'utf8');
    assert.equal(JSON.parse(original).items.length, 1);
    assert.equal(JSON.parse(original).items[0].cover, 'assets/covers/one.webp');
    assert.equal(archiveBatch(root, {items: []}, first).length, 1);
    const second = archiveBatch(root, {items: []}, {updatedAt: '2026-10-03T23:00:00.000Z', urls: []});
    assert.equal(second.length, 2);
    assert.equal(second[0].date, second[1].date);
    assert.equal(readFileSync(join(root, 'archive', index[0].file), 'utf8'), original);
    assert.equal(JSON.parse(readFileSync(join(root, 'archive', second[0].file), 'utf8')).items.length, 0);
  } finally { rmSync(root, {recursive: true, force: true}); }
});
