import assert from 'node:assert/strict';
import {test} from 'node:test';
import {discoveryPlanSchema, discoveryDay, discoveredHandle} from '../scripts/maker-discovery-rules.ts';
const plan={searches:[
  {category:'hardware',query:'AI robot open source',reason:'实体项目'},
  {category:'ai-products',query:'AI design prototyping',reason:'设计方法'},
  {category:'industry',query:'LLM agent application',reason:'软件实践'},
  {category:'tip',query:'AI classroom learning',reason:'真实教学'},
]};
test('search plans require every category and AI keywords without account instructions',()=>{
  assert.equal(discoveryPlanSchema.safeParse(plan).success,true);
  for(const query of ['from:invented AI','AI since:2026-01-01','@someone AI','robot classroom']) {
    assert.equal(discoveryPlanSchema.safeParse({searches:plan.searches.map((s,i)=>i===0?{...s,query}:s)}).success,false);
  }
  assert.equal(discoveryPlanSchema.safeParse({searches:plan.searches.map(s=>({...s,category:'hardware'}))}).success,false);
});
test('daily plan changes on Beijing midnight regardless of host timezone',()=>{
  assert.equal(discoveryDay(new Date('2026-10-07T15:59:59Z')),'2026-10-07');
  assert.equal(discoveryDay(new Date('2026-10-07T16:00:00Z')),'2026-10-08');
});
test('source accounts can only be valid observed X handles',()=>{
  assert.equal(discoveredHandle('HuggingFace'),'huggingface');
  for(const value of ['https://evil.example','x -filter:replies','a'.repeat(16),null])assert.equal(discoveredHandle(value),null);
});
