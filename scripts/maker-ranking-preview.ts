// 首页排版预览：使用已公开资讯作示例，不生成或冒充 AI 评分。
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

type Item = { title:string; summary:string; url:string; category:string; sourceName?:string; cover?:string };
const data=JSON.parse(readFileSync('pages-preview/data.json','utf8'));
const items:Item[]=data.items;
const escape=(value:string)=>value.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const labels:Record<string,string>={hardware:'AI 与硬件','ai-products':'AI与设计',industry:'AI创新案例',tip:'AI教育实践'};
const choose=(titles:string[])=>titles.flatMap(title=>{const item=items.find(i=>i.title.includes(title));return item?[item]:[];});
const preferred=choose(['InstructMesh','Scopey','AI 增强乐器','Fashion Translator','数字与AI创客空间','AI交互策略与脑感知','AI 与创意实践的教育探索','用 AI 支持学生主动阅读']);
const link=(item:Item)=>{const u=new URL(item.url);if(!['https:','http:'].includes(u.protocol))throw Error('Invalid original URL');return escape(u.href);};
const hasThumbnail=(item:Item)=>!!item.cover?.match(/^assets\/covers\/[a-f0-9]+\.webp$/)&&existsSync('pages-preview/'+item.cover);
const ranked=[...preferred,...items].filter(hasThumbnail).filter((item,index,list)=>list.findIndex(other=>other.url===item.url)===index).slice(0,8);
const photo=(item:Item,cls:string)=>hasThumbnail(item)?`<img class="${cls}" src="${escape(item.cover!)}" alt="${escape(item.title)}" loading="lazy" width="960" height="540">`:'';
const date=new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',year:'numeric',month:'long',day:'numeric'}).format(new Date());
const rankingCard=(item:Item,index:number)=>`<li class="innovation-card">${photo(item,'innovation-photo')}<div class="innovation-body"><span class="rank-category">TOP ${String(index+1).padStart(2,'0')} · ${labels[item.category]||'AI创新'}</span><h3><a href="${link(item)}" target="_blank" rel="noopener noreferrer">${escape(item.title)}</a></h3><p>${escape(item.summary)}</p><div class="innovation-source">${escape(item.sourceName||'原文来源')}<br><span>示例排序 · 待 AI 评分</span></div></div></li>`;
const section=`<section class="daily-preview" aria-label="每日榜单排版预览">
<div class="preview-note">首页排版预览 · 示例排序，尚未进行 AI 评分。<a href="index.html">返回当前首页 ↗</a></div>
<div class="daily-heading"><h2>AI创新每日top排行榜</h2><p>精选 AI 应用、智能硬件、创新设计与教育实践，每天最多 8 篇。</p><div class="daily-meta"><span>${date} · 北京时间</span><a href="#preview-rules">评价规则 ↓</a></div></div>
<ol class="innovation-grid">${ranked.map(rankingCard).join('')}</ol>
<details id="preview-rules" class="preview-rules"><summary>榜单如何选择？</summary><p>创新性 35%、AI 相关性 30%、创客实践价值 20%、启发与教育价值 10%、证据与可信度 5%。入选必须有真实缩略图，无图内容不进入榜单。四个分类统一展示，排除纯广告、重复消息和空泛宣传；内容不足时不凑数。</p></details>
</section>`;
const css=`
.daily-preview{margin-bottom:48px}.preview-note{border:1px solid #3b506b;background:#102038;padding:14px 18px;color:#bccbe0;font-size:13px;display:flex;justify-content:space-between;gap:20px}.preview-note a{white-space:nowrap}.daily-heading{padding:32px 0 24px}.daily-heading h2{font-size:34px;line-height:1.3;letter-spacing:-.025em;margin:0 0 12px}.daily-heading p{margin:0;color:var(--muted);font-size:15px}.daily-meta{display:flex;justify-content:space-between;align-items:center;margin-top:18px;font:12px ui-monospace,monospace;color:var(--muted)}.daily-meta a{color:var(--muted)}.innovation-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;list-style:none;margin:0;padding:0}.innovation-card{min-width:0;border:1px solid #354b65;background:#0d1b30;display:flex;flex-direction:column}.innovation-photo{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover}.innovation-body{padding:18px;flex:1;display:flex;flex-direction:column}.rank-category{font:11px ui-monospace,monospace;color:#9eb3ce}.innovation-card h3{font-size:17px;line-height:1.55;margin:12px 0 12px;overflow-wrap:anywhere;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3;overflow:hidden}.innovation-card h3 a{text-decoration:none}.innovation-card h3 a:hover{color:var(--acid)}.innovation-card p{margin:0 0 20px;font-size:13px;color:var(--muted);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}.innovation-source{margin-top:auto;padding-top:14px;border-top:1px solid var(--line);color:#8a9bb1;font-size:11px;line-height:1.8}.innovation-source span{color:#75859a}.preview-rules{border-bottom:1px solid var(--line);padding:20px 0;margin-top:8px;color:var(--muted);font-size:13px}.preview-rules summary{cursor:pointer;color:#b5c5dc}.preview-rules p{max-width:80ch;margin:16px 0}
@media(max-width:1000px){.innovation-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.preview-note{display:block}.preview-note a{display:block;margin-top:8px}.daily-heading h2{font-size:27px}.innovation-grid{grid-template-columns:1fr}.innovation-photo{max-height:220px}.daily-preview{margin-bottom:32px}}
`;
let html=readFileSync('pages-preview/index.html','utf8');
html=html.replace('<title>AI maker. 创新中心</title>','<title>首页榜单排版预览 · AI maker.</title>');
html=html.replace('</style>',css+'</style>').replace('<main id="news">','<main id="news">'+section);
writeFileSync('pages-preview/rankings-preview.html',html);
console.log(`榜单首页预览已生成：${ranked.length} 篇示例`);
