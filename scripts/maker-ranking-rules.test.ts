import test from 'node:test';
import assert from 'node:assert/strict';
import { selectRankings, totalScore, type Assessment, type RankedItem } from './maker-ranking-rules.ts';
const item=(url:string):RankedItem=>({url,title:url,summary:'AI创新',category:'hardware',cover:'image'});
const score=(url:string,event=url):Assessment=>({url,eligible:true,innovation:4,ai:4,practice:4,education:4,evidence:4,event,reason:'具体创新'});
test('榜单排除无图、低AI相关性、低创新、广告和重复事件',()=>{
 const items=['a','b','c','d','e','f','g'].map(item);
 const scores=[score('a'),score('b','a'),score('c'),{...score('d'),ai:2},{...score('e'),innovation:2},{...score('f'),eligible:false},{...score('g'),innovation:3,ai:3,practice:2,education:2,evidence:2}];
 assert.deepEqual(selectRankings(items,scores,i=>i.url!=='c').map(i=>i.url),['a']);
});
test('最多8篇并按加权总分排序，满分100',()=>{
 const items=Array.from({length:12},(_,n)=>item(String(n)));
 const scores=items.map(i=>score(i.url));scores[11]={...scores[11]!,innovation:5};
 const result=selectRankings(items,scores,()=>true);
 assert.equal(result.length,8);assert.equal(result[0]?.url,'11');assert.equal(totalScore({...score('x'),innovation:5,ai:5,practice:5,education:5,evidence:5}),100);
});
test('未公开的模型URL不进入榜单，合格不足8篇不凑数',()=>{
 assert.deepEqual(selectRankings([item('a')],[score('unknown')],()=>true),[]);
 assert.equal(selectRankings([item('a')],[score('a')],()=>true).length,1);
});
