import "./setup.ts";
import assert from "node:assert/strict";
import { after, test } from "node:test";
import OSS from "ali-oss";
import Green, { ImageModerationResponse, ImageModerationResponseBody, DescribeUploadTokenResponse, DescribeUploadTokenResponseBody, TextModerationPlusResponse, TextModerationPlusResponseBody } from "@alicloud/green20220302";
import { config } from "@aihot/backend/config";
import { sql, closeDb } from "@aihot/backend/db";
import { upsertMaterial } from "@aihot/backend/content/materials";
import { stopBoss } from "@aihot/backend/jobs/queue";
import { publishArticle } from "@aihot/backend/publication/publish";
import { loadItemDetail } from "@aihot/backend/publication/detail";
import { itemFeed } from "@aihot/backend/publication/feeds";
import { SAFETY_POLICY, safetyDecision, safetyHash, safetyTextChunks } from "@aihot/backend/safety/policy";
import { articleSafetyText, articleSafetyPassed } from "@aihot/backend/safety/article";
import { reviewSafety } from "@aihot/backend/safety/review";

const original = { calls: config.modelCallsEnabled, flag: process.env.CONTENT_SAFETY_ENABLED, key: process.env.CONTENT_SAFETY_ACCESS_KEY_ID, secret: process.env.CONTENT_SAFETY_ACCESS_KEY_SECRET };
const originalCall = Green.default.prototype.textModerationPlusWithOptions;
const originalImageCall = Green.default.prototype.imageModerationWithOptions;
const originalUploadCall = Green.default.prototype.describeUploadTokenWithOptions;
const originalPut = OSS.prototype.put;
after(async () => {
  config.modelCallsEnabled = original.calls;
  for (const [key, value] of [["CONTENT_SAFETY_ENABLED", original.flag], ["CONTENT_SAFETY_ACCESS_KEY_ID", original.key], ["CONTENT_SAFETY_ACCESS_KEY_SECRET", original.secret]]) {
    if (value === undefined) delete process.env[key!]; else process.env[key!] = value;
  }
  Green.default.prototype.textModerationPlusWithOptions = originalCall;
  Green.default.prototype.imageModerationWithOptions = originalImageCall;
  Green.default.prototype.describeUploadTokenWithOptions = originalUploadCall;
  OSS.prototype.put = originalPut;
  await stopBoss(); await closeDb();
});
test("missing, malformed and high/medium/low risk never pass; ordinary none passes", () => {
  assert.equal(safetyDecision(null).status, "retry");
  assert.equal(safetyDecision({ code: 500, data: { riskLevel: "none" } }).status, "retry");
  assert.equal(safetyDecision({ code: 200, data: {} }).status, "retry");
  for (const risk of ["high", "medium", "low"]) assert.equal(safetyDecision({ code: 200, data: { riskLevel: risk } }).status, "blocked");
  assert.equal(safetyDecision({ code: 200, data: { riskLevel: "none", result: [{ label: "violence", riskLevel: "high" }] } }).status, "blocked");
  assert.equal(safetyDecision({ code: 200, data: { riskLevel: "none" } }).status, "pass");
  const chunks = safetyTextChunks("a".repeat(559) + "boundary-test" + "b".repeat(800));
  assert.ok(chunks.some(c => c.includes("boundary-test")));
  assert.ok(chunks.every(c => Array.from(c).length <= 600));
  assert.notEqual(safetyHash("image", Buffer.from("one")), safetyHash("image", Buffer.from("two")));
});
test("provider results are cached and uncertain results automatically reassessed without releasing them", async () => {
  config.modelCallsEnabled = true;
  process.env.CONTENT_SAFETY_ACCESS_KEY_ID = "test-safety-key";
  process.env.CONTENT_SAFETY_ACCESS_KEY_SECRET = "test-safety-secret";
  let calls = 0, risk = "none";
  Green.default.prototype.textModerationPlusWithOptions = async () => {
    calls++;
    return new TextModerationPlusResponse({ body: new TextModerationPlusResponseBody({ code: 200, data: { riskLevel: risk } }) });
  };
  const safe = `test-safe-${Date.now()}`;
  assert.equal(await reviewSafety("text", safe), "pass");
  const once = calls;
  assert.equal(await reviewSafety("text", safe), "pass");
  assert.equal(calls, once);
  risk = "medium";
  assert.equal(await reviewSafety("text", `test-uncertain-${Date.now()}`), "blocked");
  assert.equal(calls, once + 2);
  const [row] = await sql`SELECT response FROM receipts WHERE service = 'content-safety' ORDER BY id DESC LIMIT 1`;
  assert.ok(!JSON.stringify(row!.response).includes(safe));
});
test("images use private temporary OSS upload and content-bound caching without saving upload secrets", async () => {
  let uploaded: unknown, calls = 0;
  Green.default.prototype.describeUploadTokenWithOptions = async () => new DescribeUploadTokenResponse({ body: new DescribeUploadTokenResponseBody({ code: 200, data: { accessKeyId: "test-sts-key", accessKeySecret: "test-sts-secret", securityToken: "test-sts-token", bucketName: "test-cip-bucket", ossInternetEndPoint: "https://oss-ap-southeast-1.aliyuncs.com", fileNamePrefix: "upload/test/" } }) });
  OSS.prototype.put = (async (_object: string, bytes: unknown) => { uploaded = bytes; return {}; }) as typeof OSS.prototype.put;
  Green.default.prototype.imageModerationWithOptions = async (request) => {
    calls++;
    const input = JSON.parse(request.serviceParameters!);
    assert.equal(input.ossBucketName, "test-cip-bucket");
    assert.equal(input.ossRegionId, "ap-southeast-1");
    assert.equal(input.imageUrl, undefined);
    return new ImageModerationResponse({ body: new ImageModerationResponseBody({ code: 200, data: { riskLevel: "none" } }) });
  };
  const bytes = Buffer.from(`test-image-${Date.now()}`);
  assert.equal(await reviewSafety("image", bytes), "pass");
  assert.deepEqual(uploaded, bytes);
  assert.equal(await reviewSafety("image", bytes), "pass");
  assert.equal(calls, 1);
  const [row] = await sql`SELECT response FROM receipts WHERE service = 'content-safety' ORDER BY id DESC LIMIT 1`;
  assert.ok(!JSON.stringify(row!.response).includes("test-sts"));
});
test("publication and RSS fail closed until exact current material is approved, and an edit invalidates approval", async () => {
  process.env.CONTENT_SAFETY_ENABLED = "true";
  const sourceId = `test-safety-${Date.now()}`;
  const title = `独立安全测试标题-${sourceId}`;
  await sql`INSERT INTO sources (id, name, kind, tier, participation_mode, site_fulltext, syndicate_fulltext) VALUES (${sourceId}, '安全测试', 'rss', 'T1', 'editorial', true, true)`;
  const material = await upsertMaterial({ sourceId, url: `https://example.com/${sourceId}`, title: `安全测试标题-${sourceId}`, bodyText: "测试正文", bodyHtml: '<p>测试正文</p><img src="https://example.com/unchecked.jpg">', bodyStatus: "ok", via: "fetch", publishedAt: new Date() });
  await sql`INSERT INTO analyses (article_id, input_revision, origin, relevance, category, title_zh, summary_zh, selected) VALUES (${material.articleId}, 1, 'rule', 'pass', 'hardware', ${title}, '安全摘要', true)`;
  await publishArticle(material.articleId, { releasedAt: new Date() });
  assert.equal(await articleSafetyPassed(material.articleId), false);
  assert.equal((await loadItemDetail(material.articleId)).kind, "not_found");
  assert.ok(!(await itemFeed("all", null)).includes(title));
  for (const part of safetyTextChunks((await articleSafetyText(material.articleId))!)) {
    await sql`INSERT INTO content_safety_reviews (input_hash, policy_version, kind, status) VALUES (${safetyHash("text", part)}, ${SAFETY_POLICY}, 'text', 'pass') ON CONFLICT (input_hash) DO NOTHING`;
  }
  assert.equal(await articleSafetyPassed(material.articleId), true);
  await publishArticle(material.articleId, { releasedAt: new Date() });
  assert.ok((await itemFeed("all", null)).includes(title));
  const detail = await loadItemDetail(material.articleId);
  assert.equal(detail.kind, "found");
  if (detail.kind === "found") assert.equal(detail.detail.body, null, "unchecked full text media must not leak");
  await sql`UPDATE analyses SET summary_zh = '修改后的未审核摘要' WHERE article_id = ${material.articleId}`;
  assert.equal(await articleSafetyPassed(material.articleId), false);
  await publishArticle(material.articleId);
  assert.ok(!(await itemFeed("all", null)).includes("修改后的未审核摘要"));
  delete process.env.CONTENT_SAFETY_ENABLED;
});
