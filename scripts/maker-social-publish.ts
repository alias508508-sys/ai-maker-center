// Explicit single-item publication test; no searches or scheduled collection.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { sql, closeDb } from '@aihot/backend/db';
import { upsertMaterial } from '@aihot/backend/content/materials';
import { analyzeArticle, ANALYZE_PROMPT_VERSION } from '@aihot/backend/editorial/analyze';
import { publishArticle } from '@aihot/backend/publication/publish';
import { v1ItemById } from '@aihot/backend/publication/v1';
import { reviewSafety } from '@aihot/backend/safety/review';
import { reviewArticleSafety } from '@aihot/backend/safety/article';
import { guardedFetch } from '@aihot/backend/lib/http-fetch';
import { stopBoss } from '@aihot/backend/jobs/queue';

try {
  const candidate=JSON.parse(readFileSync(process.argv[2]!,'utf8'));
  const youtube=candidate.evidence==='video-subtitles' && /^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}$/.test(candidate.url);
  if((!candidate.xPost && !youtube) || !candidate.bodyText)throw Error('Expected a real X post or YouTube subtitles');
  if(youtube && candidate.bodyText.length>5000)throw Error('Long subtitles require chunking; no partial-video summary published');
  if(youtube) {
    candidate.publishedAt=candidate.publishedDate?.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3T00:00:00Z');
    candidate.language=candidate.subtitleLanguage; candidate.bodyStatus='ok';
    candidate.media=[{kind:'image',url:candidate.thumbnail}];
  }
  const sourceId=youtube?'maker-youtube-pilot':'maker-x-'+candidate.author;
  await sql`INSERT INTO sources(id,name,kind,tier,enabled,site_fulltext,syndicate_fulltext,config) VALUES(${sourceId},${youtube?'YouTube · 视频字幕':'X · @'+candidate.author},${youtube?'external':'x_search'},'T2',false,false,false,${sql.json(youtube?{evidence:'video-subtitles'}:{query:'from:'+candidate.author+' -filter:replies'})}) ON CONFLICT(id) DO NOTHING`;
  const material=await upsertMaterial({...candidate,publishedAt:candidate.publishedAt?new Date(candidate.publishedAt):null,sourceId,via:'ingest'});
  const [existing]=await sql`SELECT id FROM analyses WHERE article_id=${material.articleId} AND prompt_version=${ANALYZE_PROMPT_VERSION} LIMIT 1`;
  if(!existing) {
    if(await reviewSafety('text',candidate.bodyText)!=='pass')throw Error('Source text held by safety review');
    await analyzeArticle(material.articleId);
  }
  if(!await reviewArticleSafety(material.articleId))throw Error('Article safety pending');
  await publishArticle(material.articleId);
  await new Promise(resolve=>setTimeout(resolve,181000));
  const published=await v1ItemById(material.articleId);
  if(!published)throw Error('Sample did not pass public publication rules');
  const data=JSON.parse(readFileSync('pages-preview/data.json','utf8'));
  const prior=data.items.find((i:{url:string})=>i.url===candidate.url);
  const item={...prior,url:candidate.url,title:published.title,summary:published.summary||'',category:published.category,tags:[],sourceName:published.source.name,reason:published.reason||'',score:published.score,origin:'model',...(youtube?{evidence:'video-subtitles',subtitleLanguage:candidate.subtitleLanguage,subtitleAutomatic:candidate.subtitleAutomatic,publishedAt:candidate.publishedAt}:{})};
  const image=candidate.media?.find((m:{kind:string})=>m.kind==='image');
  if(image && !item.cover) {
    const response=await guardedFetch(image.url,{timeoutMs:15000,maxBytes:12000000});
    if(response.status!==200)throw Error('Source image fetch failed');
    const bytes=await sharp(response.body,{limitInputPixels:40000000}).rotate().resize(960,540,{fit:'cover'}).webp({quality:80}).toBuffer();
    if(await reviewSafety('image',bytes)!=='pass')throw Error('Image held by safety review');
    const path='assets/covers/'+createHash('sha256').update(candidate.url).digest('hex').slice(0,16)+'.webp';
    mkdirSync('pages-preview/assets/covers',{recursive:true});writeFileSync('pages-preview/'+path,bytes);
    Object.assign(item,{cover:path,coverSource:image.url,coverMethod:youtube?'youtube-thumbnail':'x-original-image',coverChecked:true});
  }
  data.items=[item,...data.items.filter((i:{url:string})=>i.url!==item.url)].slice(0,200);
  data.seen=[...new Set([...data.seen,candidate.url])];data.updatedAt=new Date().toISOString();
  writeFileSync('pages-preview/data.json',JSON.stringify(data,null,2));
  writeFileSync('.data/maker-batch.json',JSON.stringify({updatedAt:data.updatedAt,urls:prior?[]:[item.url]}));
  console.log(JSON.stringify({title:item.title,url:item.url,category:item.category,cover:!!item.cover}));
} finally {await stopBoss();await closeDb();}
