import * as cheerio from 'cheerio';
import { guardedFetch } from '@aihot/backend/lib/http-fetch';
import { fetchWebList } from '@aihot/backend/sources/web-list';
import { fetchRss } from '@aihot/backend/sources/rss';
import type { Candidate, SourceRow } from '@aihot/backend/sources/types';
import { submittedCandidate } from './maker-links.ts';

// 只把具体项目、作品和新闻详情作为候选；不把院系简介、菜单和招生页面当资讯。
export function projectLinks(html: string, base: string): Candidate[] {
  const $ = cheerio.load(html);$('nav,header,footer,script,style').remove();
  const root = $('main,[role="main"]').length ? $('main,[role="main"]') : $('body');
  const found = new Map<string,Candidate>();
  root.find('a[href]').each((_i,el)=>{
    const title=$(el).text().replace(/\s+/g,' ').trim();
    if(title.length<12||/^(read more|view details|learn more|contact|apply|all projects)$/i.test(title))return;
    try {
      const u=new URL($(el).attr('href')!,base);u.hash='';
      if(!['http:','https:'].includes(u.protocol)||u.username||u.password||u.origin!==new URL(base).origin)return;
      if(!/\/(projects?|student-projects|student-work|works?|stories|news|posts|portfolio|showcase)\/[^/]+|\/20\d{2}\/[^/]+/i.test(u.pathname))return;
      if(/\.(pdf|zip|png|jpg|mp4)$|\/(category|tag|page|search|admissions|study|programmes)\//i.test(u.pathname))return;
      found.set(u.href,{url:u.href,title});
    }catch{}
  });
  return [...found.values()];
}

export async function scanSource(source: SourceRow): Promise<{candidates:Candidate[]; status:string; found:number}> {
  if(source.kind==='external')return {candidates:[],status:'reference-no-fetch-url',found:0};
  let list:Candidate[]=[];
  if(source.kind==='rss')list=(await fetchRss(source,{force:true})).candidates;
  else if(source.config.itemSelector)list=await fetchWebList(source,{preview:true});
  else {
    const url=String(source.config.url??'');
    if(new URL(url).hostname==='github.com'){
      const parts=new URL(url).pathname.split('/').filter(Boolean);
      const endpoint=parts.length===1?`https://api.github.com/orgs/${parts[0]}/repos?sort=updated&per_page=3`:`https://api.github.com/repos/${parts[0]}/${parts[1]}`;
      const res=await guardedFetch(endpoint,{timeoutMs:15000});if(res.status!==200)return{candidates:[],status:`github-http-${res.status}`,found:0};
      const data=JSON.parse(res.text());for(const repo of Array.isArray(data)?data:[data]){
        const raw=await guardedFetch(`https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/README.md`,{timeoutMs:12000,maxBytes:512000});
        const body=raw.status===200?raw.text():repo.description??'';
        if(body.length>=200)list.push({url:repo.html_url,title:repo.name,bodyText:body.slice(0,12000),bodyStatus:'ok'});
      }
    }else{
      const res=await guardedFetch(url,{timeoutMs:15000,maxBytes:2*1024*1024});if(res.status!==200)return{candidates:[],status:`http-${res.status}`,found:0};
      if(/<title[^>]*>[^<]*(Client Challenge|Just a moment|Page not found|404|Access Denied)/i.test(res.text()))return{candidates:[],status:'challenge-or-error-page',found:0};
      list=projectLinks(res.text(),res.url);
      if(!list.length&&/\/(news|projects?|student-work|stories)\/[^/]+/.test(new URL(res.url).pathname)){
        const detail=await submittedCandidate(url);if(detail)list=[detail];
      }
    }
  }
  const candidates:Candidate[]=[];
  for(const c of list.slice(0,6)){
    if(candidates.length===3)break;
    const detail=c.bodyText&&c.bodyText.length>=200?c:await submittedCandidate(c.url);
    if(detail?.bodyText&&detail.bodyText.length>=200)candidates.push({...detail,bodyText:detail.bodyText.slice(0,12000)});
  }
  return{candidates,status:candidates.length?'readable':list.length?'body-unavailable':'no-project-items',found:list.length};
}

// 队列写入 JSON 后恢复采集时间，避免日期字符串进入材料保存层。
export function restoreCandidateDates(candidate: Candidate): Candidate {
 const restored={...candidate};
 for(const key of ['publishedAt','sourceUpdatedAt','discoveredAt'] as const){
  const value=restored[key];
  if(typeof value==='string'){
   const date=new Date(value);restored[key]=Number.isFinite(date.getTime())?date:undefined;
  }
 }
 return restored;
}
