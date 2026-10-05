import { filterSafeItems } from "./maker-safety.ts";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// 只归档公开发布层输出；不包含候选原文、密钥或模型内部记录。
export function archiveBatch(root: string, data: {items: Array<Record<string, any>>}, batch: {updatedAt: string; urls: string[]}, initial = false) {
  const directory = join(root, 'archive');
  mkdirSync(directory, { recursive: true });
  const date = new Intl.DateTimeFormat('en-CA', {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date(batch.updatedAt));
  const id = new Date(batch.updatedAt).toISOString().replaceAll(':', '-');
  const file = `${date}/${id}.json`;
  const indexPath = join(directory, 'index.json');
  const index = existsSync(indexPath) ? JSON.parse(readFileSync(indexPath, 'utf8')) : [];
  if (!index.some((entry: {file: string}) => entry.file === file)) {
    const urls = new Set(batch.urls);
    const items = filterSafeItems(data.items).filter(item => urls.has(item.url));
    mkdirSync(join(directory, date), { recursive: true });
    writeFileSync(join(directory, file), JSON.stringify({schemaVersion: 1, collectedAt: batch.updatedAt, date, timezone: 'Asia/Shanghai', kind: initial ? 'initial-snapshot' : 'published-batch', items}, null, 2), {flag: 'wx'});
    index.push({file, date, collectedAt: batch.updatedAt, count: items.length, kind: initial ? 'initial-snapshot' : 'published-batch'});
    index.sort((a: {collectedAt: string}, b: {collectedAt: string}) => b.collectedAt.localeCompare(a.collectedAt));
    writeFileSync(indexPath, JSON.stringify(index, null, 2));
  }
  writeFileSync(join(directory, 'index.html'), `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>历史归档 · AI maker.</title>
<style>*{box-sizing:border-box}body{margin:0;background:#eff1f3;color:#0a1526;font:16px/1.7 Arial,"PingFang SC",sans-serif}main{max-width:1040px;margin:auto;padding:40px 24px}a{color:#2a5ae8}h1{font-size:42px;letter-spacing:-.04em}section{border-top:1px solid #d2d9e2;padding:24px 0}button{padding:10px 18px;border:1px solid #2a5ae8;background:transparent;color:#2a5ae8;cursor:pointer}article{padding:24px 0;border-bottom:1px solid #d2d9e2}img{width:100%;max-width:480px;aspect-ratio:16/9;object-fit:cover}h2{font-size:24px}p{color:#485b75}</style>
<main><a href="../index.html">← 返回创新中心</a><h1>AI maker. 历史归档</h1><p>按北京时间归档每轮发布内容。首页保留最近 200 条，历史归档持续累积。初始快照保存启用归档时已有的资讯。</p><div id="batches"></div></main>
<script>const batches=${JSON.stringify(index).replaceAll('<', '\\u003c')};const root=document.querySelector('#batches');function node(tag,text){const e=document.createElement(tag);e.textContent=text;return e}for(const b of batches){const section=node('section','');section.append(node('h2',b.date+' · '+new Date(b.collectedAt).toLocaleTimeString('zh-CN',{timeZone:'Asia/Shanghai',hour12:false})+' · '+b.count+' 条'+(b.kind==='initial-snapshot'?' · 初始快照':'')));const json=node('a','下载本轮 JSON');json.href=b.file;section.append(json,document.createTextNode('　'));const button=node('button','展开资讯');section.append(button);button.onclick=async()=>{button.disabled=true;try{const response=await fetch(b.file);if(!response.ok)throw new Error();const data=await response.json();for(const item of data.items){const article=node('article','');if(item.cover){const img=document.createElement('img');img.src='../'+item.cover;img.alt=item.title;img.loading='lazy';article.append(img)}article.append(node('h2',item.title),node('p',item.summary||''),node('p',item.sourceName||''));const link=node('a','阅读来源原文 ↗');link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';article.append(link);section.append(article)}button.remove()}catch{button.textContent='加载失败，点击重试';button.disabled=false}};root.append(section)}</script></html>`);
  return index;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const data = JSON.parse(readFileSync('pages-preview/data.json', 'utf8'));
  const initial = process.argv.includes('--initial');
  const batch = initial ? {updatedAt: data.updatedAt, urls: data.items.map((item: {url: string}) => item.url)} : JSON.parse(readFileSync('.data/maker-batch.json', 'utf8'));
  const index = archiveBatch('pages-preview', data, batch, initial);
  console.log(`历史归档已保存，共 ${index.length} 个批次`);
}
