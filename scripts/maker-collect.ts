// 手动真实采集：默认仅预览，--ingest 使用原项目的入库、判重和任务队列。
import { mkdirSync, writeFileSync } from "node:fs";
import { sql, closeDb } from "@aihot/backend/db";
import { fetchRss } from "@aihot/backend/sources/rss";
import type { SourceRow } from "@aihot/backend/sources/types";
import { upsertMaterial } from "@aihot/backend/content/materials";
import { queueProcessing } from "@aihot/backend/jobs/content";
const ingest = process.argv.includes("--ingest");
const sources = await sql<SourceRow[]>`SELECT * FROM sources WHERE enabled AND kind = 'rss' ORDER BY id`;
const results: Array<Record<string, unknown>> = [];
for (const source of sources) {
  try {
    const { candidates } = await fetchRss(source, { force: true });
    const items = candidates.slice(0, 8);
    let created = 0;
    const [prior] = await sql`SELECT count(*)::int AS count FROM articles WHERE source_id=${source.id}`;
    if (ingest) for (const candidate of items) {
      const result = await upsertMaterial({ ...candidate, sourceId: source.id, via: "fetch", backfill: prior.count === 0 ? "maker-first-preview" : null });
      if (result.created) created++;
      if (result.created || result.revised) await queueProcessing(result.articleId);
    }
    if (ingest) await sql`UPDATE sources SET last_fetch_at=now(),last_ok_at=now(),health='ok',last_error=NULL WHERE id=${source.id}`;
    results.push({ id: source.id, name: source.name, count: candidates.length, created, items });
    console.log(`${source.name}: ${candidates.length} 条，${ingest ? `新入库 ${created}` : "仅预览"}`);
  } catch (error) {
    results.push({ id: source.id, name: source.name, error: String(error) });
    console.error(`${source.name}: ${String(error)}`);
  }
}
mkdirSync(".data", { recursive: true });
writeFileSync(".data/maker-collection.json", JSON.stringify({ collectedAt: new Date().toISOString(), ingest, results }, null, 2));
await closeDb();
if (!results.some(r => Number(r.count) > 0)) process.exitCode = 1;
