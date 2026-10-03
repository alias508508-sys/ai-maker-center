// Actions 批次：复用原框架回执、预算、分析和公开读取层。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { sql, closeDb } from '@aihot/backend/db';
import { fetchWebList } from '@aihot/backend/sources/web-list';
import type { Candidate } from '@aihot/backend/sources/types';
import { fetchRss } from '@aihot/backend/sources/rss';
import type { SourceRow } from '@aihot/backend/sources/types';
import { upsertMaterial } from '@aihot/backend/content/materials';
import { analyzeArticle } from '@aihot/backend/editorial/analyze';
import { publishArticle } from '@aihot/backend/publication/publish';
import { v1Items } from '@aihot/backend/publication/v1';
import { stopBoss } from '@aihot/backend/jobs/queue';
import { submittedCandidate, saveBookmark, linkUrl } from './maker-links.ts';
import { BudgetExceededError } from '@aihot/backend/providers/receipts';
const path = 'pages-preview/data.json';
const old = JSON.parse(readFileSync(path, 'utf8'));
const seen = new Set<string>(old.seen);
const inputUrl = process.env.MAKER_ARTICLE_URL?.trim();
const submittedUrl = inputUrl ? linkUrl(inputUrl) : undefined;
const sources = submittedUrl ? [] : await sql<SourceRow[]>`SELECT * FROM sources WHERE enabled AND kind IN ('rss','web_list') ORDER BY id`;
await sql`UPDATE budgets SET per_minute=30, per_hour=30, per_day=30 WHERE service IN ('llm','deepseek')`;
let processed = 0, fetched = 0;
const status: Array<{name:string;count:number;status:string}> = [];
const pools: Array<{source:SourceRow;candidates:Candidate[]}> = [];
// 轮换起始信源，避免总是被第一个信源占满。
const offset = sources.length ? Number(old.runs ?? 0) % sources.length : 0;
if (submittedUrl) {
  const candidate = await submittedCandidate(submittedUrl);
  saveBookmark(submittedUrl, process.env.MAKER_NOTE ?? '', candidate ? 'extracted' : 'link-only');
  fetched = 1;
  if (candidate && !seen.has(candidate.url)) {
    await sql`INSERT INTO sources (id,name,kind,tier,site_fulltext,syndicate_fulltext,enabled) VALUES ('maker-links','个人提交','external','T2',false,false,false) ON CONFLICT (id) DO NOTHING`;
    const [source] = await sql<SourceRow[]>`SELECT * FROM sources WHERE id='maker-links'`;
    pools.push({source: source!, candidates: [candidate]});
  }
}
for (const source of [...sources.slice(offset), ...sources.slice(0, offset)]) {
  try {
    const candidates = source.kind === 'rss' ? (await fetchRss(source, { force: true })).candidates : await fetchWebList(source, { preview: true });
    fetched++;
    status.push({name: source.name, count: candidates.length, status: 'ok'});
    console.log(`${source.name}：抓取 ${candidates.length} 条`);
    pools.push({source, candidates: candidates.slice(0,8).filter(c => !seen.has(c.url))});
  } catch { status.push({name:source.name,count:0,status:'unavailable'}); console.log(`信源暂不可用：${source.name}`); }
}
// 每轮每个信源一条，防止单个源占满预算。手动验证优先新增入口。
if (process.env.MAKER_TEST_NEW_SOURCES === 'true') pools.sort((a,b) => Number(/hardware|kickstarter|nvidia/.test(b.source.id))-Number(/hardware|kickstarter|nvidia/.test(a.source.id)));
const batch = Array.from({length:8},(_,index) => pools.flatMap(p => p.candidates[index] ? [{source:p.source,candidate:p.candidates[index]!}] : [])).flat();
for (const {source,candidate} of batch) {

    if (processed >= 12) break;
    if (seen.has(candidate.url)) continue;
    const body = candidate.bodyText || candidate.excerpt;
    // 只依据公开订阅内容；标题不足以生成可信摘要。
    if (!body || body.length < 30) continue;
    const material = await upsertMaterial({ ...candidate, bodyText: body, bodyStatus: 'unconfirmed', sourceId: source.id, via: 'fetch' });
    try {
      const result = await analyzeArticle(material.articleId);
      if (result?.output) {
        await publishArticle(material.articleId);
        seen.add(candidate.url);
        processed++;
        console.log(`已分析 ${processed} 条（${source.name}）`);
      }
    } catch (error) {
      if (error instanceof BudgetExceededError) { processed = 12; break; }
      // 不将服务商返回值写入公开日志。
      throw new Error(`模型分析失败：${error instanceof Error ? error.name : 'unknown'}`);
    }
}
if (!fetched) throw new Error('所有信源均不可用，保留原网站');
// 等待原框架精选发布门槛，不绕过公开规则。
await new Promise(resolve => setTimeout(resolve, 181000));
const result = await v1Items({ mode: 'all', window: '7d', by: 'published', category: null, q: null, limit: 100, cursor: null });
const fresh = result.items.map(i => ({ url: i.links.original, title: i.title, summary: i.summary || '', category: i.category, tags: [], reason: i.reason || '', sourceName: i.source.name, score: i.score, origin: 'model' }));
const merged = [...fresh, ...old.items.filter((i: {url:string}) => !fresh.some(n => n.url === i.url))].slice(0, 200);
const updatedAt = new Date().toISOString();
mkdirSync('.data', { recursive: true });
writeFileSync('.data/maker-batch.json', JSON.stringify({ updatedAt, urls: fresh.map(i => i.url) }));
writeFileSync(path, JSON.stringify({ updatedAt, runs: (old.runs ?? 0) + 1, seen: [...seen].slice(-5000), sources: submittedUrl ? old.sources : status, items: merged }, null, 2));
if (submittedUrl) saveBookmark(submittedUrl, process.env.MAKER_NOTE ?? '', fresh.some(i => i.url === submittedUrl) || old.items.some((i: {url:string}) => i.url === submittedUrl) ? 'published' : 'saved');
console.log(`公开新增 ${fresh.length} 条，保留 ${merged.length} 条`);
await stopBoss();
await closeDb();
