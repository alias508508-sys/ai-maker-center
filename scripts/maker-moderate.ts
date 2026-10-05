import { existsSync, readFileSync, writeFileSync, mkdirSync, renameSync, readdirSync, copyFileSync, unlinkSync } from "node:fs";
import { load } from "cheerio";
import { stopBoss } from "@aihot/backend/jobs/queue";
import { sql, closeDb } from "@aihot/backend/db";
import { reviewSafety, safetyConfigured } from "@aihot/backend/safety/review";
import { reviewArticleSafety } from "@aihot/backend/safety/article";
import { safetyEnabled, type SafetyStatus } from "@aihot/backend/safety/policy";
import { publishArticle } from "@aihot/backend/publication/publish";
import { itemAssets, itemSafetyHash, assetBytes, cachePath, filterSafeItems, postBytes } from "./maker-safety.ts";

try {
  if (!safetyEnabled()) { console.log("专业审核待启用，未调用服务"); }
  else {
    if (!safetyConfigured()) throw new Error("专业审核尚未配置，禁止放行新内容");
    const data = JSON.parse(readFileSync("pages-preview/data.json", "utf8"));
    const pendingPath = ".data/maker-safety-pending.json";
    const previous = existsSync(pendingPath) ? JSON.parse(readFileSync(pendingPath, "utf8")) : [];
    const mainItems = [...data.items, ...previous.filter((i: any) => !data.items.some((n: any) => n.url === i.url))];
    const snapshots: Array<{ file: string; data: any }> = [];
    if (existsSync("pages-preview/archive")) for (const name of readdirSync("pages-preview/archive", { recursive: true })) {
      if (typeof name !== "string" || !new RegExp("^[0-9T:Z./-]+[.]json$").test(name) || name.includes("..")) continue;
      const file = "pages-preview/archive/" + name;
      const backup = ".data/safety-quarantine/archive/" + name;
      if (!existsSync(backup)) { mkdirSync(backup.slice(0, backup.lastIndexOf("/")), { recursive: true }); copyFileSync(file, backup); }
      snapshots.push({ file, data: JSON.parse(readFileSync(backup, "utf8")) });
    }
    const allItems = [...mainItems, ...snapshots.flatMap(s => s.data.items ?? [])];
    const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {};
    mkdirSync(".data", { recursive: true });
    let pass = 0, blocked = 0, pending = 0;
    // Revisit database material as well as the static list, including jobs waiting on the publication gate.
    const rows = await sql`SELECT a.id FROM articles a WHERE EXISTS (SELECT 1 FROM analyses an WHERE an.article_id = a.id) ORDER BY a.discovered_at DESC LIMIT 200`;
    for (const row of rows) {
      await reviewArticleSafety(row.id).catch(() => false);
      await publishArticle(row.id);
    }
    for (const item of allItems) {
      let hash: string;
      try { hash = itemSafetyHash(item); } catch { pending++; continue; }
      if (cache[hash]?.status === "pass") { pass++; continue; }
      if (cache[hash]?.status === "blocked") { blocked++; continue; }
      let status: SafetyStatus = await reviewSafety("text", JSON.stringify({ title: item.title, summary: item.summary, source: item.sourceName, reason: item.reason }));
      if (status === "pass" && /\/posts\/[a-f0-9-]+\.html$/.test(item.url)) {
        const html = postBytes(item)!.toString("utf8");
        status = await reviewSafety("text", load(html)("main").text());
      }
      if (status === "pass") for (const asset of itemAssets(item)) {
        status = await reviewSafety("image", assetBytes(asset));
        if (status !== "pass") break;
      }
      cache[hash] = { status, checkedAt: new Date().toISOString() };
      writeFileSync(cachePath + ".tmp", JSON.stringify(cache, null, 2), { mode: 0o600 });
      renameSync(cachePath + ".tmp", cachePath);
      if (status === "pass") pass++; else if (status === "blocked") blocked++; else pending++;
    }
    // Keep pending material privately; all publicly downloadable snapshots contain only approved items.
    writeFileSync(pendingPath, JSON.stringify(mainItems.filter(i => !filterSafeItems([i]).length)), { mode: 0o600 });
    data.items = filterSafeItems(mainItems);
    writeFileSync("pages-preview/data.json.tmp", JSON.stringify(data, null, 2));
    renameSync("pages-preview/data.json.tmp", "pages-preview/data.json");
    for (const snapshot of snapshots) writeFileSync(snapshot.file, JSON.stringify({ ...snapshot.data, items: filterSafeItems(snapshot.data.items ?? []) }, null, 2));
    const archiveIndex = "pages-preview/archive/index.json";
    if (existsSync(archiveIndex)) {
      const index = JSON.parse(readFileSync(archiveIndex, "utf8"));
      for (const entry of index) {
        const snapshot = snapshots.find(s => s.file === "pages-preview/archive/" + entry.file);
        if (snapshot) entry.count = filterSafeItems(snapshot.data.items ?? []).length;
      }
      writeFileSync(archiveIndex, JSON.stringify(index, null, 2));
    }
    const approvedItems = filterSafeItems(allItems);
    // Downloadable rankings must not retain rejected text or unreviewed recommendation prose.
    if (existsSync("pages-preview/rankings")) for (const name of readdirSync("pages-preview/rankings")) {
      if (!/^(latest|\d{4}-\d{2}-\d{2})\.json$/.test(name)) continue;
      const file = "pages-preview/rankings/" + name;
      const backup = ".data/safety-quarantine/rankings/" + name;
      mkdirSync(".data/safety-quarantine/rankings", { recursive: true });
      const currentRanking = JSON.parse(readFileSync(file, "utf8"));
      const previousRanking = existsSync(backup) ? JSON.parse(readFileSync(backup, "utf8")) : null;
      if (!previousRanking || previousRanking.generatedAt !== currentRanking.generatedAt) copyFileSync(file, backup);
      const ranking = JSON.parse(readFileSync(backup, "utf8"));
      ranking.items = ranking.items.flatMap((entry: any) => {
        const item = approvedItems.find(i => i.url === entry.url);
        return item ? [{ ...item, rankingScore: entry.rankingScore, dimensions: entry.dimensions }] : [];
      });
      writeFileSync(file, JSON.stringify(ranking, null, 2));
    }
    const allowedAssets = new Set<string>(approvedItems.flatMap(itemAssets));
    const quarantine = ".data/safety-quarantine/assets/covers";
    mkdirSync(quarantine, { recursive: true });
    for (const asset of readdirSync("pages-preview/assets/covers")) {
      if (!asset.endsWith(".webp") || allowedAssets.has("assets/covers/" + asset)) continue;
      copyFileSync("pages-preview/assets/covers/" + asset, quarantine + "/" + asset);
      unlinkSync("pages-preview/assets/covers/" + asset);
    }
    for (const asset of allowedAssets) if (!existsSync("pages-preview/" + asset)) copyFileSync(".data/safety-quarantine/" + asset, "pages-preview/" + asset);
    mkdirSync(".data/safety-quarantine/posts", { recursive: true });
    for (const item of allItems) if (/\/posts\/[a-f0-9-]+\.html$/.test(item.url)) {
      const name = new URL(item.url).pathname.split("/").pop()!;
      const file = "pages-preview/posts/" + name;
      const backup = ".data/safety-quarantine/posts/" + name;
      if (filterSafeItems([item]).length) { if (!existsSync(file) && existsSync(backup)) copyFileSync(backup, file); }
      else if (existsSync(file)) { copyFileSync(file, backup); unlinkSync(file); }
    }
    console.log(`自动审核：通过 ${pass}，拦截 ${blocked}，等待重试 ${pending}`);
  }
} finally { await stopBoss(); await closeDb(); }
