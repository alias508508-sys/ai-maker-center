import { existsSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const escape = (value: string) => value.replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]!));
type PublicItem = {url: string; title: string; summary?: string};

export function homepageMetadata(siteUrl: string): string {
  const base = new URL('/', siteUrl);
  const title = 'AI maker. 创新中心';
  const description = '面向设计师、创客和教师的 AI 创新案例精选，持续整理 AI 设计、智能硬件、创新项目与教育实践，提供中文摘要、原文入口和 RSS 订阅。';
  return `<meta name="description" content="${description}"><link rel="canonical" href="${escape(base.href)}"><link rel="icon" href="/favicon.ico"><meta property="og:type" content="website"><meta property="og:site_name" content="${title}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${escape(base.href)}"><meta property="og:image" content="${escape(new URL('og/site.png', base).href)}">`;
}

// The caller supplies the same approved items used by the visible homepage.
export function fallbackArticles(items: PublicItem[]): string {
  return items.map(item => {
    const url = new URL(item.url);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return '';
    return `<article><h2><a href="${escape(url.href)}" rel="noopener noreferrer">${escape(item.title)}</a></h2><p>${escape(item.summary ?? '')}</p></article>`;
  }).join('');
}

export function writeDiscoveryFiles(root: string, siteUrl: string, items: PublicItem[]): void {
  const base = new URL('/', siteUrl);
  const pages = new Map([['/', 'index.html'], ['/subscribe.html', 'subscribe.html'], ['/links.html', 'links.html'], ['/archive/index.html', 'archive/index.html']]);
  for (const item of items) {
    const url = new URL(item.url);
    if (url.origin === base.origin && /^\/posts\/[a-f0-9-]+\.html$/.test(url.pathname)) pages.set(url.pathname, url.pathname.slice(1));
  }
  const entries = [...pages].filter(([, file]) => existsSync(join(root, file))).map(([path, file]) =>
    `<url><loc>${escape(new URL(path, base).href)}</loc><lastmod>${statSync(join(root, file)).mtime.toISOString()}</lastmod></url>`
  ).join('\n');
  writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`);
  writeFileSync(join(root, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\nDisallow: /.data/\n\nSitemap: ${new URL('sitemap.xml', base).href}\n`);
}
