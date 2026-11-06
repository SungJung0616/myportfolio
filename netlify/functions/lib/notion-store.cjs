'use strict';
function createStore({token,gamesId,playersId,fetchImpl=fetch}){
 const request=async(path,body)=>{if(!token)throw new Error('not-configured');const response=await fetchImpl('https://api.notion.com/v1/'+path,{method:'POST',headers:{Authorization:'Bearer '+token,'Notion-Version':'2025-09-03','Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(12000)});if(!response.ok)throw new Error('provider-unavailable');return response.json();};
 async function query(id,filter){if(!/^[0-9a-f-]{32,36}$/i.test(id||''))throw new Error('not-configured');const rows=[];let cursor;for(let page=0;page<20;page++){const data=await request('data_sources/'+id+'/query',{page_size:100,filter,...(cursor?{start_cursor:cursor}:{})});rows.push(...data.results);if(!data.has_more)return rows;cursor=data.next_cursor;}throw new Error('pagination-limit');}
 return {games:()=>query(gamesId,{and:[{property:'Publication Approved',checkbox:{equals:true}},{property:'Review',select:{equals:'검토 완료'}}]}),players:id=>query(playersId,{property:'Game',relation:{contains:id}})};
}
module.exports={createStore};
