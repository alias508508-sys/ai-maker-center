// Professional moderation only; a general chat model cannot approve an image it has not inspected.
import Green, { ImageModerationRequest, TextModerationPlusRequest } from "@alicloud/green20220302";
import { Config } from "@alicloud/openapi-client";
import { RuntimeOptions } from "@alicloud/tea-util";
import OSS from "ali-oss";
import { randomBytes } from "node:crypto";
import { config, credential } from "../config.ts";
import { sql } from "../db.ts";
import { paidRequest, completeReceipt, rejectReceivedResponse, ProviderRejectedError } from "../providers/receipts.ts";
import { SAFETY_POLICY, safetyDecision, safetyHash, safetyTextChunks, type SafetyStatus } from "./policy.ts";

export function safetyConfigured() {
  return !!credential("integrations", "CONTENT_SAFETY_ACCESS_KEY_ID") && !!credential("integrations", "CONTENT_SAFETY_ACCESS_KEY_SECRET");
}
const runtime = new RuntimeOptions({ connectTimeout: 10000, readTimeout: 30000, autoretry: false });
function client() {
  if (!safetyConfigured()) throw new Error("content_safety_not_configured");
  return new Green.default(new Config({ accessKeyId: credential("integrations", "CONTENT_SAFETY_ACCESS_KEY_ID")!, accessKeySecret: credential("integrations", "CONTENT_SAFETY_ACCESS_KEY_SECRET")!,
    endpoint: process.env.CONTENT_SAFETY_ENDPOINT || "green-cip.ap-southeast-1.aliyuncs.com" }));
}
async function imageParameters(api: InstanceType<typeof Green.default>, bytes: Buffer) {
  const token = (await api.describeUploadTokenWithOptions(runtime)).body;
  const t = token?.data;
  if (token?.code !== 200 || !t?.accessKeyId || !t.accessKeySecret || !t.securityToken || !t.bucketName || !t.ossInternetEndPoint || !t.fileNamePrefix) throw new Error("content_safety_upload_failed");
  const endpoint = new URL(t.ossInternetEndPoint);
  if (endpoint.protocol !== "https:" || !endpoint.hostname.endsWith(".aliyuncs.com")) throw new Error("content_safety_upload_endpoint_invalid");
  const region = /oss-([a-z0-9-]+)\.aliyuncs\.com$/.exec(endpoint.hostname)?.[1];
  if (!region) throw new Error("content_safety_upload_region_invalid");
  const object = `${t.fileNamePrefix}${randomBytes(16).toString("hex")}.webp`;
  const store = new OSS({ endpoint: endpoint.href, region: `oss-${region}`, bucket: t.bucketName, accessKeyId: t.accessKeyId, accessKeySecret: t.accessKeySecret, stsToken: t.securityToken, secure: true, timeout: 30000 });
  await store.put(object, bytes);
  return { ossBucketName: t.bucketName, ossObjectName: object, ossRegionId: region, infoType: "textInImage" };
}

export async function reviewSafety(kind: "text" | "image", input: string | Buffer): Promise<SafetyStatus> {
  const hash = safetyHash(kind, input);
  const [cached] = await sql`SELECT status, attempts, next_retry_at FROM content_safety_reviews WHERE input_hash = ${hash}`;
  if (cached && cached.status !== "retry") return cached.status as SafetyStatus;
  if (cached && cached.next_retry_at && new Date(cached.next_retry_at) > new Date()) return "retry";
  if (!config.modelCallsEnabled || !safetyConfigured()) return "retry";
  const attempts = Number(cached?.attempts ?? 0) + 1;
  const receipts: number[] = [];
  let status: SafetyStatus = "pass";
  const labels = new Set<string>();
  let uncertain = false;
  try {
    const api = client();
    const inputs = kind === "text" ? safetyTextChunks(String(input)) : [input];
    for (const [index, part] of inputs.entries()) {
      let decision: ReturnType<typeof safetyDecision> | undefined;
      // Medium/low results get one independent provider invocation; neither unknown nor conflicting results release content.
      for (let pass = 0; pass < 2; pass++) {
        const service = kind === "text" ? process.env.CONTENT_SAFETY_TEXT_SERVICE || "text_multilingual_pro_global" : process.env.CONTENT_SAFETY_IMAGE_SERVICE || "postImageCheckByVL_global";
        const result = await paidRequest({ service: "content-safety", model: service, purpose: `content_safety_${kind}`, subject: hash,
          identity: { policy: SAFETY_POLICY, kind, hash, index, pass, endpoint: process.env.CONTENT_SAFETY_ENDPOINT || "green-cip.ap-southeast-1.aliyuncs.com", service }, requestSummary: { policy: SAFETY_POLICY, kind, hash, index, pass } }, async () => {
          try {
          const response = kind === "text"
            ? await api.textModerationPlusWithOptions(new TextModerationPlusRequest({ service, serviceParameters: JSON.stringify({ content: part, dataId: hash }) }), runtime)
            : await api.imageModerationWithOptions(new ImageModerationRequest({ service, serviceParameters: JSON.stringify({ ...await imageParameters(api, part as Buffer), dataId: hash }) }), runtime);
          const body = response.body;
          if (!body) throw new Error("content_safety_empty_response");
          // Keep risk labels and IDs, never upload tokens, source text or OCR text in the receipt.
          const safe = { code: body.code, requestId: body.requestId, data: { riskLevel: body.data?.riskLevel, result: body.data?.result?.map(r => ({ label: r.label, riskLevel: "riskLevel" in r ? r.riskLevel : undefined })) } };
          return { response: safe, requestId: body.requestId };
          } catch (error) {
            const status = Number((error as { statusCode?: number }).statusCode);
            if (Number.isInteger(status) && status >= 400 && status <= 599) throw new ProviderRejectedError("content safety request rejected", status, status === 429 || status >= 500);
            throw new Error("content_safety_transport_failed");
          }
        });
        receipts.push(result.receiptId);
        decision = safetyDecision(result.response);
        if (decision.status === "retry") await rejectReceivedResponse(result.receiptId, "content safety response invalid");
        decision.labels.forEach(label => labels.add(label));
        const risk = (result.response as { data?: { riskLevel?: string } }).data?.riskLevel;
        if (!["low", "medium"].includes(risk ?? "")) break;
        uncertain = true;
      }
      // Conservatively block uncertain results even if a second assessment disagrees.
      if (uncertain && decision?.status === "pass") status = "blocked";
      if (decision?.status !== "pass") status = decision?.status ?? "retry";
      if (status !== "pass") break;
    }
  } catch {
    status = "retry";
    labels.add("service_unavailable");
  }
  const delay = Math.min(3600, 60 * 2 ** Math.min(attempts, 6));
  await sql`INSERT INTO content_safety_reviews (input_hash, policy_version, kind, status, labels, attempts, receipt_ids, next_retry_at)
    VALUES (${hash}, ${SAFETY_POLICY}, ${kind}, ${status}, ${[...labels]}, ${attempts}, ${receipts}, ${status === "retry" ? new Date(Date.now() + delay * 1000) : null})
    ON CONFLICT (input_hash) DO UPDATE SET status = EXCLUDED.status, labels = EXCLUDED.labels, attempts = EXCLUDED.attempts, receipt_ids = EXCLUDED.receipt_ids, next_retry_at = EXCLUDED.next_retry_at, updated_at = now()`;
  if (status !== "retry") for (const id of receipts) await completeReceipt(sql, id);
  return status;
}
