import { createHash } from "node:crypto";

export const SAFETY_POLICY = "maker-content-safety-v1";
export type SafetyStatus = "pass" | "blocked" | "retry";
export function safetyEnabled() { return process.env.CONTENT_SAFETY_ENABLED === "true"; }
export function safetyHash(kind: "text" | "image", content: string | Buffer): string {
  return createHash("sha256").update(`${SAFETY_POLICY}:${kind}:`).update(content).digest("hex");
}
/** Unknown, malformed and incomplete provider results always fail closed. */
export function safetyDecision(response: unknown): { status: SafetyStatus; labels: string[] } {
  const body = response as { code?: number; data?: { riskLevel?: string; result?: Array<{ label?: string; riskLevel?: string }> } } | null;
  if (body?.code !== 200 || !body.data || !["none", "low", "medium", "high"].includes(body.data.riskLevel ?? "")) return { status: "retry", labels: ["invalid_response"] };
  const risks = [body.data.riskLevel, ...(body.data.result ?? []).map(r => r.riskLevel).filter(Boolean)];
  const labels = [...new Set((body.data.result ?? []).map(r => r.label).filter((x): x is string => typeof x === "string"))].slice(0, 40);
  if (risks.includes("high")) return { status: "blocked", labels };
  if (risks.every(r => r === "none")) return { status: "pass", labels };
  return { status: "blocked", labels: labels.length ? labels : ["uncertain_risk"] };
}
/** Full text is covered, with overlap to catch a risky phrase straddling the boundary. */
export function safetyTextChunks(text: string): string[] {
  const chars = Array.from(text.normalize("NFKC").replace(/[\u200B-\u200D\uFEFF]/g, ""));
  if (chars.length > 200000) throw new Error("content_safety_text_too_large");
  const result: string[] = [];
  for (let i = 0; i < chars.length; i += 560) result.push(chars.slice(i, i + 600).join(""));
  return result.length ? result : [" "];
}

export class SafetyHold extends Error {
  readonly status: SafetyStatus;
  constructor(status: SafetyStatus) { super(status === "blocked" ? "自动内容审核拦截，未发布。" : "自动内容审核暂未通过，未发布；系统将自动重试。"); this.status = status; }
}
