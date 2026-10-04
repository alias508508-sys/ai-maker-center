import { randomUUID } from "node:crypto";
import { z } from "zod";
import { sql } from "../db.ts";
import { audit } from "../audit.ts";

const image = z.string().max(900000).regex(/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/);
export const submissionSchema = z.object({
  kind: z.enum(["link", "article"]),
  url: z.string().trim().max(2048).default(""),
  title: z.string().trim().max(300).default(""),
  body: z.string().trim().max(50000).default(""),
  category: z.enum(["auto", "ai-products", "industry", "tip", "opinion"]).default("auto"),
  images: z.array(image).max(6).default([]),
}).superRefine((value, ctx) => {
  if (value.kind === "article" && (!value.title || value.body.length < 20)) ctx.addIssue({ code: "custom", message: "请填写标题和至少 20 字的正文" });
  if (value.kind === "link") {
    try {
      const u = new URL(value.url);
      if (!["http:", "https:"].includes(u.protocol) || u.username || u.password) throw new Error();
    } catch { ctx.addIssue({ code: "custom", message: "请填写 HTTP/HTTPS 公开文章链接" }); }
  }
});
export type SubmissionInput = z.infer<typeof submissionSchema>;
export async function createSubmission(input: unknown, key: string, actor: string) {
  const payload = submissionSchema.parse(input);
  z.string().min(8).max(128).parse(key);
  if (payload.kind === "link") { const u = new URL(payload.url); u.hash = ""; payload.url = u.href; }
  return sql.begin(async tx => {
    const [row] = await tx`INSERT INTO maker_submissions (id,request_key,payload) VALUES (${randomUUID()},${key},${tx.json(payload)}) ON CONFLICT (request_key) DO NOTHING RETURNING id,status`;
    if (!row) return (await tx`SELECT id,status FROM maker_submissions WHERE request_key=${key}`)[0];
    await audit(actor,"maker.submit",`submission:${row.id}`,"站主提交，直接发布",null,{kind:payload.kind,title:payload.title,url:payload.url},{db:tx});
    return row;
  });
}
export async function listSubmissions() {
  return sql`SELECT id,payload->>'kind' AS kind,payload->>'title' AS title,payload->>'url' AS url,status,result_url,error,created_at,updated_at FROM maker_submissions ORDER BY created_at DESC LIMIT 50`;
}
