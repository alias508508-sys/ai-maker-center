// 将已公开的静态内容导入后台；保留归档文件，不重新调用模型。
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { sql, closeDb } from '@aihot/backend/db';
import { upsertMaterial } from '@aihot/backend/content/materials';
import { publishArticle } from '@aihot/backend/publication/publish';
import { stopBoss } from '@aihot/backend/jobs/queue';

const root = process.env.MAKER_IMPORT_ROOT || 'pages-preview';
const data = JSON.parse(readFileSync(join(root, 'data.json'), 'utf8'));
const items = new Map<string, {item: any; at: string}>();
const archive = join(root, 'archive');
if (existsSync(join(archive, 'index.json'))) {
  const index = JSON.parse(readFileSync(join(archive, 'index.json'), 'utf8'));
  for (const batch of [...index].reverse()) {
    const saved = JSON.parse(readFileSync(join(archive, batch.file), 'utf8'));
    for (const item of saved.items) items.set(item.url, {item, at: saved.collectedAt});
  }
}
for (const item of data.items) {
  const prior = items.get(item.url);
  items.set(item.url, {item, at: prior?.at || data.updatedAt});
}
let imported = 0;
try {
  for (const {item, at} of items.values()) {
    const name = item.sourceName || item.sourceId || '历史资讯';
    const sourceId = 'maker-import-' + createHash('sha256').update(name).digest('hex').slice(0, 16);
    await sql`INSERT INTO sources (id,name,kind,tier,site_fulltext,syndicate_fulltext,enabled) VALUES (${sourceId},${name},'external','T2',false,false,false) ON CONFLICT (id) DO NOTHING`;
    const material = await upsertMaterial({sourceId, url:item.url, title:item.title, excerpt:item.summary, bodyStatus:'none', discoveredAt:new Date(at), via:'import', backfill:'published-maker-archive'});
    const [previous] = await sql`SELECT id FROM analyses WHERE article_id=${material.articleId} AND prompt_version='maker-import-v1'`;
    if (previous) continue;
    const [article] = await sql`SELECT revision FROM articles WHERE id=${material.articleId}`;
    await sql`INSERT INTO analyses (article_id,input_revision,origin,prompt_version,relevance,category,tags,title_zh,summary_zh,reason_zh,score,selected,output) VALUES (${material.articleId},${article.revision},'rule','maker-import-v1','pass',${item.category || 'industry'},${item.tags || []},${item.title},${item.summary || '请查看来源原文。'},${item.reason || '已公开内容迁移'},${item.score ?? null},true,${sql.json({method:'published-archive-import',originalOrigin:item.origin,cover:item.cover || null})})`;
    await publishArticle(material.articleId, {releasedAt:new Date(at)});
    imported++;
  }
  console.log(`历史内容导入完成：共 ${items.size} 条，新增 ${imported} 条；未调用模型。`);
} finally {
  await stopBoss();
  await closeDb();
}
