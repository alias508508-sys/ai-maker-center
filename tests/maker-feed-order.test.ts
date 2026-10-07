import assert from 'node:assert/strict';
import {test} from 'node:test';
import {mergeFeed} from '../scripts/maker-feed-order.ts';
test('refreshing by old source dates cannot bury an already displayed X article',()=>{
 const previous=[{url:'x',title:'X original'},{url:'web',title:'Web'}];
 const refreshed=[{url:'web',title:'Updated web'},{url:'new',title:'New'},{url:'x',title:'Updated X'}];
 assert.deepEqual(mergeFeed(previous,refreshed),[{url:'new',title:'New'},{url:'x',title:'Updated X'},{url:'web',title:'Updated web'}]);
 assert.deepEqual(mergeFeed(previous,refreshed,2).map(i=>i.url),['new','x']);
});
