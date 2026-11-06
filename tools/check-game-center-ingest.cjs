'use strict';
const assert=require('node:assert/strict');
const {run}=require('./ingest-game-center.cjs');
const {daily}=require('./ingest-game-center-daily.cjs');
const {fields}=require('../netlify/functions/lib/game-center.cjs');
const stats=Object.fromEntries(fields.map(k=>[k,0]));stats.PTS=10;
const input={game:{id:'0022609999',season:'2026-27',date:'2026-11-03',source:'https://www.nba.com/game/example-0022609999/box-score',opponent:'Synthetic opponent',venue:'Home',lakers:50,opponentPoints:40},players:Array.from({length:5},(_,i)=>({id:String(9000+i),name:'Synthetic '+i,source:'https://www.nba.com/game/example-0022609999/box-score',participation:'Played',lineupRole:'Starter',lineupSourceConfirmed:true,minutes:'10:00',stats})),totals:{...stats,PTS:50}};
let game=null,players=[],writes=0;
const env={GAME_CENTER_INGEST_RIGHTS:'approved',NOTION_INGEST_TOKEN:'synthetic-test-only',NOTION_GAMES_SOURCE_ID:'a'.repeat(32),NOTION_PLAYERS_SOURCE_ID:'b'.repeat(32)};
async function mock(url,options){const body=JSON.parse(options.body),path=url.split('/v1/')[1];let result;
 if(path.endsWith('/query'))result={results:path.includes(env.NOTION_GAMES_SOURCE_ID)?(game?[game]:[]):players,has_more:false};
 else if(path==='pages'){writes++;const page={id:'test-'+writes,properties:body.properties};if(body.parent.data_source_id===env.NOTION_GAMES_SOURCE_ID)game=page;else players.push(page);result=page;}
 else {const page=[game,...players].find(p=>p.id===path.slice(6));assert.ok(page);page.properties=body.properties;result=page;}
 return {ok:true,json:async()=>result};
}
(async()=>{
 const dry=await daily([input]);assert.equal(dry[0].publicationApproved,false);assert.equal(dry[0].validation.startersConfirmed,true);
 const options={apply:true,env,fetchImpl:mock,paceMs:0};await run(input,options);await run(input,options);
 assert.equal(writes,6);assert.equal(players.length,5);assert.equal(game.properties['Publication Approved'].checkbox,false);
 await assert.rejects(daily([input,input]));await assert.rejects(run(input,{apply:true,env:{}}));
 const invalid=structuredClone(input);invalid.players[0].participation='DNP';await assert.rejects(run(invalid));
 console.log('7 ingestion checks passed: dry run, confirmed lineup, idempotent upsert, approval off, duplicate batch rejection, permission gate, nonparticipant null boundary. Mock Notion only.');
})().catch(e=>{console.error(e.message);process.exitCode=1;});
