import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { guardedFetch } from '@aihot/backend/lib/http-fetch';
import { readable } from '@aihot/backend/content/extract';
import { parseHTML } from 'linkedom';
import type { Candidate } from '@aihot/backend/sources/types';

export function linkUrl(value: string): string {
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error('请提交不含账号密码的 HTTP/HTTPS 公开链接');
  url.hash = '';
  return url.href;
}

export async function submittedCandidate(value: string): Promise<Candidate | null> {
  const url = linkUrl(value);
  try {
    const response = await guardedFetch(url, {timeoutMs: 20000, maxBytes: 6 * 1024 * 1024});
    if (response.status !== 200 || !response.headers.get('content-type')?.includes('html')) return null;
    const html = response.text();
    const body = readable(html, response.url);
    if (!body) return null;
    const {document} = parseHTML(html);
    const title = document.querySelector('meta[property="og:title"]')?.getAttribute('content') || document.title || new URL(url).hostname;
    return {url, title, bodyText: body.text, bodyHtml: body.html, bodyStatus: 'ok'};
  } catch { return null; }
}

export function saveBookmark(value: string, note: string, status: string) {
  const url = linkUrl(value);
  const path = 'pages-preview/links.json';
  const links = existsSync(path) ? JSON.parse(readFileSync(path, 'utf8')) : [];
  const existing = links.find((entry: {url: string}) => entry.url === url);
  if (existing) { existing.status = status; if (note) existing.note = note; }
  else links.unshift({url, note, status, savedAt: new Date().toISOString()});
  if (status === 'published') {
    const data = JSON.parse(readFileSync('pages-preview/data.json', 'utf8'));
    const item = data.items.find((entry: {url: string}) => entry.url === url);
    if (item) links.find((entry: {url: string}) => entry.url === url).item = item;
  }
  writeFileSync(path, JSON.stringify(links, null, 2));
}
