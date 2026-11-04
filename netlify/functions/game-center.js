'use strict';
const {approvedGames,player,overview,createCache}=require('./lib/game-center.cjs');
const {createStore}=require('./lib/notion-store.cjs');
const cache=createCache();
const headers={'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex'};
const reply=(statusCode,body)=>({statusCode,headers,body:JSON.stringify(body)});
function createHandler({env=process.env,store,sharedCache=cache}={}){return async event=>{
 if(event.httpMethod!=='GET')return reply(405,{error:'method_not_allowed'});
 const q=event.queryStringParameters||{},action=q.action||'history',season=q.season||'2026-27';
 if(!['history','latest','boxscore','season','next'].includes(action)||!/^20\d{2}-\d{2}$/.test(season)||Object.keys(q).some(k=>!['action','season','game'].includes(k))||(action==='boxscore'&&!/^\d{10}$/.test(q.game||'')))return reply(400,{error:'invalid_request'});
 // Explicit fail-closed rights gate. A publication checkbox alone is not a license.
 if(env.GAME_CENTER_PUBLIC_DATA_RIGHTS!=='approved')return reply(200,{state:'pending-rights',games:[],latest:null,season:overview([]),next:null,message:'Game records are awaiting publication clearance. No live statistics are published.'});
 try{
 const provider=store||createStore({token:env.NOTION_TOKEN,gamesId:env.NOTION_GAMES_SOURCE_ID,playersId:env.NOTION_PLAYERS_SOURCE_ID});
 const snapshot=await sharedCache.get('games',async()=>({pages:await provider.games(),fetchedAt:new Date().toISOString()}));
 const games=approvedGames(snapshot.pages).filter(g=>g.season===season);
 const clean=g=>{const {approved,...safe}=g;return safe;};
 const common={state:'ready',fetchedAt:snapshot.fetchedAt,source:'NBA.com; reviewed records maintained in Notion',coverage:overview(games).coverage};
 if(action==='boxscore'){
 const selected=games.find(g=>g.id===q.game);if(!selected)return reply(404,{error:'game_not_published'});
 const page=snapshot.pages.find(p=>p.properties['NBA Game ID']?.rich_text?.map(x=>x.plain_text??x.text?.content??'').join('')===q.game);
 const rows=await sharedCache.get('players:'+page.id+':'+page.last_edited_time,()=>provider.players(page.id));
 const players=rows.map(player);const keys=new Set();for(const p of players){const key=p.id||p.name.normalize('NFKC').toLowerCase();if(keys.has(key))throw new Error('duplicate-player');keys.add(key);}
 if(players.some(p=>!p.reviewed))return reply(200,{...common,state:'pending-review',game:clean(selected),players:[],message:'Player records are awaiting review.'});
 return reply(200,{...common,game:clean(selected),players:players.map(({reviewed,...p})=>p)});
 }
 if(action==='next')return reply(200,{...common,next:null,message:'A verified next-game schedule is not available.'});
 if(action==='season')return reply(200,{...common,season:overview(games),playerTotals:null,message:'Cumulative player totals withheld until coverage is reconciled.'});
 return reply(200,{...common,games:action==='latest'?games.slice(0,1).map(clean):games.map(clean),latest:games[0]?clean(games[0]):null,season:overview(games),next:null});
 }catch{return reply(503,{state:'unavailable',error:'data_temporarily_unavailable',message:'Records could not be loaded. Please try again later.'});}
};}
exports.handler=createHandler();exports.createHandler=createHandler;
