import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fallbackArticles, homepageMetadata, writeDiscoveryFiles } from './maker-seo.ts';

test('网站地图只包含存在的站内公开页，不加入外站、私有文件和未提供的投稿', () => {
  const root = mkdtempSync(join(tmpdir(), 'maker-seo-'));
  try {
    mkdirSync(join(root, 'posts'));
    for (const file of ['index.html', 'subscribe.html', 'posts/abc-123.html', 'posts/def-456.html']) writeFileSync(join(root, file), 'page');
    const items = [
      {url:'https://aimaker.news/posts/abc-123.html', title:'已审核投稿'},
      {url:'https://aimaker.news/posts/aaa-999.html', title:'已移除投稿'},
      {url:'https://other.example/posts/abc-123.html', title:'外站'},
      {url:'https://aimaker.news/.data/private.html', title:'私有'},
    ];
    writeDiscoveryFiles(root, 'https://aimaker.news', items);
    const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
    assert.ok(sitemap.includes('<loc>https://aimaker.news/</loc>'));
    assert.ok(sitemap.includes('/subscribe.html</loc>'));
    assert.ok(sitemap.includes('/posts/abc-123.html</loc>'));
    assert.ok(!sitemap.includes('def-456') && !sitemap.includes('aaa-999') && !sitemap.includes('other.example') && !sitemap.includes('.data') && !sitemap.includes('/links.html'));
    const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
    assert.ok(robots.includes('Disallow: /admin') && robots.includes('Sitemap: https://aimaker.news/sitemap.xml'));
    writeDiscoveryFiles(root, 'https://aimaker.news', []);
    assert.ok(!readFileSync(join(root, 'sitemap.xml'), 'utf8').includes('/posts/'));
  } finally { rmSync(root, {recursive:true, force:true}); }
});

test('文字版摘要转义来源内容，不执行脚本或非网页链接，分享元数据使用正式域名', () => {
  const html = fallbackArticles([
    {url:'https://example.com/?a=1&b=2', title:'<img src=x onerror=alert(1)>', summary:'</noscript><script>alert(1)</script>'},
    {url:'javascript:alert(1)', title:'不安全链接'},
  ]);
  assert.ok(!html.includes('<script>') && !html.includes('<img') && !html.includes('javascript:'));
  assert.ok(html.includes('&lt;/noscript&gt;') && html.includes('?a=1&amp;b=2'));
  const metadata = homepageMetadata('https://aimaker.news');
  assert.ok(metadata.includes('rel="canonical" href="https://aimaker.news/"'));
  assert.ok(metadata.includes('property="og:title"') && metadata.includes('name="description"'));
});

test('页面生成使用私有审核缓存，未放行内容不会进入文字版或页面数据', () => {
  const root = mkdtempSync(join(tmpdir(), 'maker-seo-safety-'));
  try {
    mkdirSync(join(root, '.data'));
    mkdirSync(join(root, 'pages-preview'));
    const safe = {url:'https://example.com/approved', title:'已放行案例', summary:'公开摘要', category:'hardware'};
    const blocked = {url:'https://example.com/blocked', title:'未放行案例', summary:'私有摘要', category:'hardware'};
    writeFileSync(join(root, 'pages-preview/data.json'), JSON.stringify({items:[safe, blocked], updatedAt:'2026-10-07T12:00:00Z'}));
    execFileSync(process.execPath, ['--input-type=module', '-e', `
      import { writeFileSync } from 'node:fs';
      import { itemSafetyHash } from ${JSON.stringify(new URL('./maker-safety.ts', import.meta.url).href)};
      writeFileSync('.data/maker-safety.json', JSON.stringify({[itemSafetyHash(${JSON.stringify(safe)})]:{status:'pass'}}));
      await import(${JSON.stringify(new URL('./maker-pages.ts', import.meta.url).href)});
    `], {cwd:root, env:{...process.env, SITE_URL:'https://aimaker.news', CONTENT_SAFETY_ENABLED:'true', COLLECT_ENABLED:'false', MODEL_CALLS_ENABLED:'false'}});
    const html = readFileSync(join(root, 'pages-preview/index.html'), 'utf8');
    assert.ok(html.includes('<noscript>') && html.includes('已放行案例'));
    assert.ok(!html.includes('未放行案例') && !html.includes('私有摘要') && !html.includes('/blocked'));
    assert.ok(readFileSync(join(root, 'pages-preview/sitemap.xml'), 'utf8').includes('https://aimaker.news/'));
  } finally { rmSync(root, {recursive:true, force:true}); }
});
