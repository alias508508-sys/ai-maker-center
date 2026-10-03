// 根据可编辑主题查询生成 Google News RSS 配置；--sync 更新数据库中已有的检索源。
import { readFileSync, writeFileSync } from "node:fs";
const { queries } = JSON.parse(readFileSync("industry/search-queries.json", "utf8")) as { queries: Array<{ id: string; label: string; query: string }> };
const pack = JSON.parse(readFileSync("industry/sources.json", "utf8"));
for (const q of queries) {
  if (!/^[a-z0-9-]+$/.test(q.id) || !q.query.trim()) throw new Error("主题 id 或查询无效");
  const feedUrl = "https://news.google.com/rss/search?" + new URLSearchParams({ q: q.query, hl: "zh-CN", gl: "CN", ceid: "CN:zh-Hans" });
  const source = { id: `search-${q.id}`, name: `主题检索 · ${q.label}`, kind: "rss", config: { feedUrl, _aihot: { initialBackfillLimit: 8 } }, tier: "T2", first_party: false, participation_mode: "editorial", interval_minutes: 180, site_fulltext: false, syndicate_fulltext: false };
  const index = pack.sources.findIndex((s: { id: string }) => s.id === source.id);
  if (index < 0) pack.sources.push(source); else pack.sources[index] = source;
}
writeFileSync("industry/sources.json", JSON.stringify(pack, null, 2) + "\n");
if (process.argv.includes("--sync")) {
  const { sql, closeDb } = await import("@aihot/backend/db");
  for (const q of queries) {
    const s = pack.sources.find((s: { id: string }) => s.id === `search-${q.id}`);
    await sql`UPDATE sources SET config=${sql.json(s.config)}, name=${s.name}, cursor=NULL, next_fetch_at=now() WHERE id=${s.id}`;
  }
  await closeDb();
}
console.log(`已配置 ${queries.length} 个主题查询。新闻 RSS 为发现入口，非完整全网检索。`);
