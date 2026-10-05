import { sql } from "../db.ts";
import { safetyEnabled } from "./policy.ts";
import { safetyConfigured } from "./review.ts";
export async function safetyOverview() {
  const rows = await sql`SELECT status, count(*)::int AS count FROM content_safety_reviews GROUP BY status`;
  return { enabled: safetyEnabled(), configured: safetyConfigured(), provider: "阿里云内容安全", counts: { pass: 0, blocked: 0, retry: 0, ...Object.fromEntries(rows.map(r => [r.status, r.count])) } };
}
