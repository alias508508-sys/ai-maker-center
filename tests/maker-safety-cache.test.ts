import "./setup.ts";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { filterSafeItems, itemSafetyHash, cachePath } from "../scripts/maker-safety.ts";

test("static approval is private and bound to text and exact image bytes", () => {
  const cwd = process.cwd(), old = process.env.CONTENT_SAFETY_ENABLED;
  const root = mkdtempSync(join(tmpdir(), "maker-safety-"));
  try {
    process.chdir(root);
    process.env.CONTENT_SAFETY_ENABLED = "true";
    mkdirSync("pages-preview/assets/covers", { recursive: true });
    mkdirSync(".data", { recursive: true });
    writeFileSync("pages-preview/assets/covers/abc-cover.webp", "synthetic-image-one");
    const item = { url: "https://example.com/safe", title: "AI 工具", summary: "内容", cover: "assets/covers/abc-cover.webp", approved: true };
    assert.equal(filterSafeItems([item]).length, 0, "public approved flags cannot bypass review");
    writeFileSync(cachePath, JSON.stringify({ [itemSafetyHash(item)]: { status: "pass" } }));
    assert.equal(filterSafeItems([item]).length, 1);
    assert.equal(filterSafeItems([{ ...item, title: "changed" }]).length, 0);
    writeFileSync("pages-preview/assets/covers/abc-cover.webp", "synthetic-image-two");
    assert.equal(filterSafeItems([item]).length, 0);
    assert.equal(filterSafeItems([{ ...item, cover: "../../.env" }]).length, 0);
  } finally {
    process.chdir(cwd);
    if (old === undefined) delete process.env.CONTENT_SAFETY_ENABLED; else process.env.CONTENT_SAFETY_ENABLED = old;
    rmSync(root, { recursive: true, force: true });
  }
});
