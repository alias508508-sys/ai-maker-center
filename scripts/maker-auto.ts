// Actions 批次：复用原框架回执、预算、分析和公开读取层。
import { readFileSync, writeFileSync } from 'node:fs';
import { sql, closeDb } from '@aihot/backend/db';
import { fetchRss } from '@aihot/backend/sources/rss';
import type { SourceRow } from '@aihot/backend/sources/types';
import { upsertMaterial } from '@aihot/backend/content/materials';
import { analyzeArticle } from '@aihot/backend/editorial/analyze';
import { publishArticle } from '@aihot/backend/publication/publish';
import { v1Items } from '@aihot/backend/publication/v1';
import { BudgetExceededError } from '@aihot/backend/providers/receipts';
const path = 'pages-preview/data.json';
const old = JSON.parse(readFileSync(path, 'utf8'));
const seen = new Set<string>(old.seen);
const sources = await sql<SourceRow[]>`SELECT * FROM sources WHERE enabled AND kind='rss' ORDER BY id`;
await sql`UPDATE budgets SET per_minute=30, per_hour=30, per_day=30 WHERE service IN ('llm','deepseek')`;
let processed = 0, fetched = 0;
// 轮换起始信源，避免总是被第一个信源占满。
const offset = Number(old.runs ?? 0) % sources.length;
for (const source of [...sources.slice(offset), ...sources.slice(0, offset)]) {
  if (processed >= 12) break;
  let candidates;
  try { candidates = (await fetchRss(source, { force: true })).candidates; fetched++; }
  catch { console.log(`信源暂不可用：${source.name}`); continue; }
  for (const candidate of candidates.slice(0, 8)) {
    if (processed >= 12) break;
    if (seen.has(candidate.url)) continue;
    const body = candidate.bodyText || candidate.excerpt;
    // 只依据公开订阅内容；标题不足以生成可信摘要。
    if (!body || body.length < 80) continue;
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
}
if (!fetched) throw new Error('所有信源均不可用，保留原网站');
// 等待原框架精选发布门槛，不绕过公开规则。
await new Promise(resolve => setTimeout(resolve, 181000));
const result = await v1Items({ mode: 'all', window: '7d', by: 'published', category: null, q: null, limit: 100, cursor: null });
const fresh = result.items.map(i => ({ url: i.links.original, title: i.title, summary: i.summary || '', category: i.category, tags: [], reason: i.reason || '', sourceName: i.source.name, score: i.score, origin: 'model' }));
const merged = [...fresh, ...old.items.filter((i: {url:string}) => !fresh.some(n => n.url === i.url))].slice(0, 200);
writeFileSync(path, JSON.stringify({ updatedAt: new Date().toISOString(), runs: (old.runs ?? 0) + 1, seen: [...seen].slice(-5000), items: merged }, null, 2));
console.log(`公开新增 ${fresh.length} 条，保留 ${merged.length} 条`);
await closeDb();
