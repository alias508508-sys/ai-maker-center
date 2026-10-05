// Static outputs use the private approval cache and fingerprints, never a boolean from public JSON.
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { safetyEnabled, SAFETY_POLICY } from "@aihot/backend/safety/policy";
export const cachePath = ".data/maker-safety.json";
export function postBytes(item: Record<string, any>): Buffer | null {
  if (!/\/posts\/[a-f0-9-]+\.html$/.test(item.url)) return null;
  const name = new URL(item.url).pathname.split("/").pop()!;
  const file = "pages-preview/posts/" + name;
  return readFileSync(existsSync(file) ? file : ".data/safety-quarantine/posts/" + name);
}
export function itemAssets(item: Record<string, any>): string[] {
  const assets = [item.cover, ...(item.images ?? [])].filter(Boolean);
  if (typeof item.url === "string" && /\/posts\/[a-f0-9-]+\.html$/.test(item.url)) {
    const html = postBytes(item)!.toString("utf8");
    for (const match of html.matchAll(/<img[^>]+src="\.\.\/([^"]+)"/g)) assets.push(match[1]);
  }
  return [...new Set(assets)] as string[];
}
export function assetBytes(asset: string): Buffer {
  if (!/^assets\/covers\/[a-f0-9-]+(?:-cover)?\.webp$/.test(asset)) throw new Error("invalid_image_path");
  const file = resolve("pages-preview", asset);
  return readFileSync(existsSync(file) ? file : resolve(".data/safety-quarantine", asset));
}
export function itemSafetyHash(item: Record<string, any>): string {
  const hash = createHash("sha256").update(SAFETY_POLICY).update(JSON.stringify({ url: item.url, title: item.title, summary: item.summary, category: item.category, sourceName: item.sourceName, reason: item.reason }));
  for (const asset of itemAssets(item)) hash.update(asset).update(assetBytes(asset));
  if (/\/posts\/[a-f0-9-]+\.html$/.test(item.url)) hash.update(postBytes(item)!);
  return hash.digest("hex");
}
export function filterSafeItems<T extends Record<string, any>>(items: T[]): T[] {
  if (!safetyEnabled()) return items;
  const cache = existsSync(cachePath) ? JSON.parse(readFileSync(cachePath, "utf8")) : {};
  return items.filter(item => { try { return cache[itemSafetyHash(item)]?.status === "pass"; } catch { return false; } });
}
