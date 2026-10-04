// 优先社交封面，再取正文原图，最后截取浏览器中的图片区域。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { coverCandidates, renderedCover } from './maker-cover-images.ts';
import sharp from 'sharp';
import { guardedFetch } from '@aihot/backend/lib/http-fetch';
const path='pages-preview/data.json';
const data=JSON.parse(readFileSync(path,'utf8'));
mkdirSync('pages-preview/assets/covers',{recursive:true});
let found=0,attempts=0,browserAttempts=0;
const version=2;
for(const item of data.items){
  if(process.env.MAKER_COVER_URL && item.url!==process.env.MAKER_COVER_URL)continue;
  if(item.cover || item.coverCheckedVersion===version || attempts>=25)continue;
  attempts++;
  const deadline=Date.now()+25000;
  let deferred=false;
  try{
    const response=await guardedFetch(item.url,{timeoutMs:12000});
    if(response.status!==200)throw new Error('unavailable');
    const html=response.text().slice(0,1500000);
    if(/news\.google\.com/.test(response.url))throw new Error('no article cover');
    let bytes: Buffer | undefined, source: string | undefined;
    for(const url of coverCandidates(html,response.url||item.url)) {
      if(Date.now()>=deadline)break;
      try {
        const photo=await guardedFetch(url,{timeoutMs:Math.min(12000,Math.max(1,deadline-Date.now())),maxBytes:12000000});
        if(photo.status!==200 || !photo.headers.get('content-type')?.startsWith('image/'))continue;
        const meta=await sharp(photo.body,{limitInputPixels:40000000}).metadata();
        if((meta.width??0)<400 || (meta.height??0)<200)continue;
        bytes=photo.body;source=url;break;
      } catch {/* 尝试下一张正文图片。 */}
    }
    if(!bytes && browserAttempts<3) {
      browserAttempts++;
      const image=await renderedCover(response.url||item.url);
      bytes=image?.bytes;source=image?.source;
      if(image)item.coverMethod='browser-image';
    } else if(!bytes)deferred=true;
    if(!bytes)throw new Error('no suitable image');
    const name=createHash('sha256').update(item.url).digest('hex').slice(0,16)+'.webp';
    await sharp(bytes,{limitInputPixels:40000000}).rotate().resize(960,540,{fit:'cover',position:'attention'}).webp({quality:80}).toFile('pages-preview/assets/covers/'+name);
    item.cover='assets/covers/'+name;item.coverSource=source;item.coverMethod ||= 'original-image';found++;
  }catch{/* 无合适图片时保留文字，不生成占位图。 */}
  item.coverChecked=true;if(!deferred)item.coverCheckedVersion=version;
}
writeFileSync(path,JSON.stringify(data,null,2));
console.log(`封面检查 ${attempts} 条，新增 ${found} 张，统一 960×540。`);
