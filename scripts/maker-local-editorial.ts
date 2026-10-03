// 首版本地人工整理，仅处理已真实采集的文章，使用原项目公开发布层。
import { readFileSync } from "node:fs";
import { sql, closeDb } from "@aihot/backend/db";
import { publishArticle } from "@aihot/backend/publication/publish";
if (process.env.NODE_ENV === "production" || !/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(process.env.SITE_URL ?? "")) throw new Error("仅可用于本地验证站点");
const pack = JSON.parse(readFileSync("industry/local-editorial.json", "utf8"));
for (const item of pack.items) {
  const [article] = await sql`SELECT id, revision FROM articles WHERE source_id=${item.sourceId} AND url=${item.url}`;
  if (!article) throw new Error(`未真实采集：${item.url}`);
  const [existing] = await sql`SELECT id FROM analyses WHERE article_id=${article.id} AND prompt_version='maker-local-editorial-v1'`;
  if (!existing) await sql`INSERT INTO analyses (article_id,input_revision,origin,prompt_version,relevance,category,tags,title_zh,summary_zh,reason_zh,selected,output)
    VALUES (${article.id},${article.revision},'rule','maker-local-editorial-v1','pass',${item.category},${item.tags},${item.title},${item.summary},${item.reason},true,${sql.json({ method:"manual-local-editorial", evidence:"RSS 标题与摘要", automatedScore:false })})`;
  if (existing) await sql`UPDATE analyses SET reason_zh=${item.reason} WHERE id=${existing.id}`;
  await publishArticle(article.id);
  console.log(`已发布人工整理：${item.title}`);
}
await closeDb();
