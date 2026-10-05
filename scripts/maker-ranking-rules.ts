export type RankedItem = { url:string; title:string; summary:string; category:string; sourceName?:string; cover?:string };
export type Assessment = { url:string; eligible:boolean; innovation:number; ai:number; practice:number; education:number; evidence:number; event:string; reason:string };
export const totalScore=(a:Assessment)=>Math.round(a.innovation*7+a.ai*6+a.practice*4+a.education*2+a.evidence);
export function selectRankings(items:RankedItem[], scores:Assessment[], hasImage:(item:RankedItem)=>boolean) {
  const seen=new Set<string>();
  return scores.filter(a=>a.eligible&&a.innovation>=3&&a.ai>=3&&totalScore(a)>=70)
    .sort((a,b)=>totalScore(b)-totalScore(a)||b.innovation-a.innovation||b.practice-a.practice||b.evidence-a.evidence||a.url.localeCompare(b.url))
    .flatMap(a=>{
      const item=items.find(i=>i.url===a.url);
      if(!item||!hasImage(item))return [];
      const event=a.event.trim().toLowerCase();
      if(seen.has(event))return [];
      seen.add(event);
      return [{...item,rankingScore:totalScore(a),rankingReason:a.reason,dimensions:{innovation:a.innovation,ai:a.ai,practice:a.practice,education:a.education,evidence:a.evidence}}];
    }).slice(0,8);
}
