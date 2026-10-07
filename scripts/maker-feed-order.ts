// Freshly published items lead; refreshes update cards without moving existing items.
export function mergeFeed<T extends {url:string}>(previous:T[], fresh:T[], limit=200):T[] {
  const updates=new Map(fresh.map(item=>[item.url,item]));
  const known=new Set(previous.map(item=>item.url));
  const ordered=[...fresh.filter(item=>!known.has(item.url)),...previous.map(item=>updates.get(item.url)??item)];
  return [...new Map(ordered.map(item=>[item.url,item])).values()].slice(0,limit);
}
