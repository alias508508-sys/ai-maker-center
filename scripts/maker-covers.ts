// 只取文章公开的社交分享封面；统一尺寸并保留原文归属。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { parseHTML } from 'linkedom';
import sharp from 'sharp';
import { guardedFetch } from '@aihot/backend/lib/http-fetch';
const path='pages-preview/data.json';
const data=JSON.parse(readFileSync(path,'utf8'));
mkdirSync('pages-preview/assets/covers',{recursive:true});
let found=0,attempts=0;
for(const item of data.items){
  if(item.cover || item.coverChecked || attempts>=25)continue;
  attempts++;
  try{
    const response=await guardedFetch(item.url,{timeoutMs:12000});
    if(response.status!==200)throw new Error('unavailable');
    const html=response.text().slice(0,1500000);
    const {document}=parseHTML(html);
    const image=document.querySelector('meta[property="og:image"]')?.getAttribute('content') || document.querySelector('meta[name="twitter:image"]')?.getAttribute('content');
    if(!image || /news\.google\.com/.test(response.url))throw new Error('no article cover');
    const url=new URL(image,response.url||item.url);
    if(url.protocol!=='https:')throw new Error('invalid image');
    const photo=await guardedFetch(url.toString(),{timeoutMs:12000});
    if(photo.status!==200 || !photo.headers.get('content-type')?.startsWith('image/'))throw new Error('no image');
    const bytes=photo.body;
    if(bytes.length>12000000)throw new Error('oversize');
    const meta=await sharp(bytes).metadata();
    if((meta.width??0)<400 || (meta.height??0)<200)throw new Error('small image');
    const name=createHash('sha256').update(item.url).digest('hex').slice(0,16)+'.webp';
    await sharp(bytes).rotate().resize(960,540,{fit:'cover',position:'attention'}).webp({quality:80}).toFile('pages-preview/assets/covers/'+name);
    item.cover='assets/covers/'+name;item.coverSource=url.toString();found++;
  }catch{/* 无合适文章封面时由页面展示明确的占位图。 */}
  item.coverChecked=true;
}
writeFileSync(path,JSON.stringify(data,null,2));
console.log(`封面检查 ${attempts} 条，新增 ${found} 张，统一 960×540。`);
