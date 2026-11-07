// A short, bounded, in-memory cache. Approval changes are rechecked on Refresh.
export function createGameDataClient({fetcher=fetch,now=Date.now,ttl=60000,maxEntries=12}={}){
 const cache=new Map(),pending=new Map();
 async function get(action,game){
  const key=action+':'+(game||''),saved=cache.get(key);
  if(saved&&now()-saved.at<ttl)return saved.data;
  if(pending.has(key))return pending.get(key).promise;
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),15000);
  const url=new URL('/.netlify/functions/game-center',location.origin);
  url.searchParams.set('action',action);if(game)url.searchParams.set('game',game);
  const entry={controller,promise:null};
  entry.promise=(async()=>{try{
   const response=await fetcher(url,{signal:controller.signal});
   if(!response.ok)throw new Error('unavailable');
   const data=await response.json();
   if(controller.signal.aborted)throw new Error('cancelled');
   cache.delete(key);cache.set(key,{at:now(),data});
   while(cache.size>maxEntries)cache.delete(cache.keys().next().value);
   return data;
  }finally{clearTimeout(timer);if(pending.get(key)===entry)pending.delete(key);}})();
  pending.set(key,entry);return entry.promise;
 }
 function clear(){for(const {controller}of pending.values())controller.abort();pending.clear();cache.clear();}
 return {get,clear};
}
