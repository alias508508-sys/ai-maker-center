import { sql, type Db } from "../db.ts";
import { stableJson } from "../lib/ids.ts";
import { safetyEnabled, safetyHash, safetyTextChunks, SafetyHold } from "./policy.ts";
import { reviewSafety } from "./review.ts";

/** Bind approval to the exact current material, edits and translated text, never just a URL. */
export async function articleSafetyText(articleId: string, db: Db = sql): Promise<string | null> {
  const [row] = await db`SELECT a.title, a.body_text, a.x_post, s.name AS source_name,
    (SELECT jsonb_build_object('title', an.title_zh, 'summary', an.summary_zh, 'reason', an.reason_zh) FROM analyses an WHERE an.article_id = a.id ORDER BY an.input_revision DESC, an.id DESC LIMIT 1) AS generated,
    (SELECT fields FROM editorial_overrides o WHERE o.article_id = a.id) AS edits,
    (SELECT body_text FROM translations t WHERE t.article_id = a.id ORDER BY created_at DESC LIMIT 1) AS translated
    FROM articles a JOIN sources s ON s.id = a.source_id WHERE a.id = ${articleId}`;
  return row ? stableJson(row) : null;
}
export async function articleSafetyPassed(articleId: string, db: Db = sql): Promise<boolean> {
  if (!safetyEnabled()) return true;
  const text = await articleSafetyText(articleId, db);
  if (text === null) return false;
  try {
    const hashes = safetyTextChunks(text).map(part => safetyHash("text", part));
    const [row] = await db`SELECT count(*)::int AS approved FROM content_safety_reviews WHERE input_hash IN ${db(hashes)} AND status = 'pass'`;
    return Number(row?.approved) === new Set(hashes).size;
  } catch { return false; }
}
export async function reviewArticleSafety(articleId: string): Promise<boolean> {
  if (!safetyEnabled()) return true;
  const text = await articleSafetyText(articleId);
  if (text === null) return false;
  for (const part of safetyTextChunks(text)) {
    const status = await reviewSafety("text", part);
    if (status !== "pass") throw new SafetyHold(status);
  }
  return true;
}
