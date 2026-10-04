import { existsSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { guardedFetch } from '@aihot/backend/lib/http-fetch';

export function coverCandidates(html: string, base: string): string[] {
  const {document}=parseHTML(html);
  const values: string[]=[];
  for (const meta of document.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]')) values.push(meta.getAttribute('content')||'');
  const content=document.querySelector('article,main,[role="main"]')||document;
  for (const img of content.querySelectorAll('img')) {
    if (/logo|icon|avatar|placeholder/i.test(img.getAttribute('alt')||'')) continue;
    for (const name of ['data-srcset','srcset']) {
      const set=img.getAttribute(name);
      if(set) values.push(...set.split(',').map((v:string)=>v.trim().split(/\s+/)[0]!).reverse());
    }
    for (const name of ['data-src','data-original','data-lazy-src','src']) values.push(img.getAttribute(name)||'');
  }
  return [...new Set(values.flatMap(value=>{
    try { const url=new URL(value,base); return value && ['http:','https:'].includes(url.protocol) && !url.username && !url.password ? [url.href] : []; }
    catch { return []; }
  }))].slice(0,12);
}

// Every browser resource is fetched by the existing SSRF-safe HTTP client. Chromium itself has
// an unusable proxy, so unhandled network requests cannot reach the server's private network.
export async function renderedCover(url: string): Promise<{bytes:Buffer;source:string}|undefined> {
  const executablePath=[process.env.MAKER_CHROMIUM_PATH,'/usr/bin/chromium','/usr/bin/google-chrome','/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'].find(p=>p&&existsSync(p));
  if (!executablePath) return;
  const { chromium }=await import('playwright-core');
  const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--proxy-server=http://127.0.0.1:9','--force-webrtc-ip-handling-policy=disable_non_proxied_udp']});
  const context=await browser.newContext({viewport:{width:1280,height:900},serviceWorkers:'block'});
  const deadline=Date.now()+45000;
  await context.routeWebSocket('**/*',socket=>socket.close());
  await context.route('**/*',async route=>{
    try {
      const request=route.request();
      if(Date.now()>deadline || request.method()!=='GET' || ['media','eventsource'].includes(request.resourceType())) return await route.abort();
      const response=await guardedFetch(request.url(),{timeoutMs:Math.min(12000,Math.max(1,deadline-Date.now())),maxBytes:12000000});
      await route.fulfill({status:response.status,contentType:response.headers.get('content-type')||'application/octet-stream',body:response.body});
    } catch { await route.abort().catch(()=>{}); }
  });
  try {
    const page=await context.newPage();
    const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:25000});
    if(response?.status()!==200) return;
    await page.waitForTimeout(1500);
    const main=page.locator('article,main,[role="main"]').first();
    const images=(await main.count()?main:page.locator('body')).locator('img');
    for(let index=0;index<Math.min(12,await images.count())&&Date.now()<deadline;index++) {
      const img=images.nth(index);
      await img.scrollIntoViewIfNeeded({timeout:3000}).catch(()=>{});
      if(!await img.isVisible()) continue;
      await page.waitForFunction(element=>{
        const el=element as unknown as {complete:boolean;naturalWidth:number};
        return el.complete&&el.naturalWidth>0;
      },await img.elementHandle(),{timeout:Math.min(5000,Math.max(1,deadline-Date.now()))}).catch(()=>{});
      const valid=await img.evaluate((element)=>{const el=element as unknown as {complete:boolean;naturalWidth:number;naturalHeight:number;alt:string};return el.complete&&el.naturalWidth>=400&&el.naturalHeight>=200&&!/logo|icon|avatar/i.test(el.alt)});
      if(!valid) continue;
      const source=await img.evaluate((element)=>{const el=element as unknown as {currentSrc:string;src:string};return el.currentSrc||el.src});
      return {bytes:await img.screenshot({timeout:5000}),source};
    }
  } finally { await browser.close(); }
}
