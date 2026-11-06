'use strict';
// Assisted import only. Does not scrape NBA.com or schedule automatic collection.
const fs=require('node:fs');
const {fields,source,validateTotals}=require('../netlify/functions/lib/game-center.cjs');
const identity=p=>p.id?'id:'+p.id:'name:'+p.name.normalize('NFKC').trim().toLowerCase();
function validate(input){
 if(!/^\d{10}$/.test(input.game?.id||'')||!/^20\d{2}-\d{2}$/.test(input.game?.season||'')||!/^\d{4}-\d{2}-\d{2}$/.test(input.game?.date||'')||!source(input.game?.source)||!input.game?.opponent||!['Home','Away','Neutral'].includes(input.game.venue))throw Error('Invalid game identity or provenance');
 if(!Number.isInteger(input.game.lakers)||!Number.isInteger(input.game.opponentPoints)||input.game.lakers===input.game.opponentPoints)throw Error('Invalid final score');
 if(!Array.isArray(input.players)||!input.players.length||input.players.length>30)throw Error('Missing player rows');
 const keys=new Set();for(const p of input.players){if(!p.name||!['Played','DNP','Inactive','Unavailable'].includes(p.participation)||!source(p.source))throw Error('Invalid player/status/provenance');if(p.id&&!/^\d+$/.test(p.id))throw Error('Invalid player ID');const key=identity(p);if(keys.has(key))throw Error('Duplicate player');keys.add(key);for(const k of fields){const v=p.stats?.[k];if(v!==null&&v!==undefined&&(!Number.isInteger(v)||(k!=='Plus Minus'&&v<0)))throw Error('Invalid statistic');}if(p.participation==='Played'&&!/^\d{1,3}:[0-5]\d$/.test(p.minutes||''))throw Error('Played row requires source minutes');if(p.participation!=='Played'&&fields.some(k=>p.stats?.[k]!=null))throw Error('Do not infer nonparticipant zeroes');}
 const validation=validateTotals(input.players,input.totals||{},input.teamOnly||{});
 const lineup=input.players.filter(p=>p.lineupRole==='Starter');
 validation.startersConfirmed=lineup.length===5&&lineup.every(p=>p.participation==='Played'&&p.lineupSourceConfirmed===true);
 validation.lineupWarning=validation.startersConfirmed?null:'Five official starter designations have not been confirmed';
 return validation;
}
const rich=value=>({rich_text:value?[{text:{content:String(value)}}]:[]});
async function run(input,{apply=false,env=process.env,fetchImpl=fetch,paceMs=350}={}){
 const validation=validate(input);if(!apply)return {mode:'dry-run',gameId:input.game.id,players:input.players.length,validation,publicationApproved:false};
 if(env.GAME_CENTER_INGEST_RIGHTS!=='approved')throw Error('Source collection permission required before writes');
 const token=env.NOTION_INGEST_TOKEN,games=env.NOTION_GAMES_SOURCE_ID,players=env.NOTION_PLAYERS_SOURCE_ID;if(!token||![games,players].every(x=>/^[a-f0-9-]{32,36}$/i.test(x||'')))throw Error('Server credentials/source IDs not configured');
 async function request(path,body,method='POST'){await new Promise(r=>setTimeout(r,paceMs));const res=await fetchImpl('https://api.notion.com/v1/'+path,{method,headers:{Authorization:'Bearer '+token,'Notion-Version':'2025-09-03','Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});if(!res.ok)throw Error('Notion write/read failed; inspect state before retry');return res.json();}
 async function query(id,filter){const rows=[];let cursor;do{const r=await request('data_sources/'+id+'/query',{filter,page_size:100,...(cursor?{start_cursor:cursor}:{})});rows.push(...r.results);cursor=r.has_more?r.next_cursor:null;if(rows.length>2000)throw Error('Query bound exceeded');}while(cursor);return rows;}
 const g=input.game,matches=await query(games,{property:'NBA Game ID',rich_text:{equals:g.id}});if(matches.length>1)throw Error('Duplicate game in Notion; reconcile manually');
 const props={Game:{title:[{text:{content:`${g.date} — ${g.opponent} ${g.venue==='Home'?'at LAL':'vs LAL'}`}}]},'NBA Game ID':rich(g.id),Season:rich(g.season),Competition:{select:{name:'Regular Season'}},'Game Date PT':{date:{start:g.date}},Opponent:rich(g.opponent),Venue:{select:{name:g.venue}},'Game Status':{select:{name:'Final'}},'LAL PTS':{number:g.lakers},'OPP PTS':{number:g.opponentPoints},Source:{url:g.source},Review:{select:{name:'검토 대기'}},'Publication Approved':{checkbox:false},'Checked On':{date:{start:new Date().toISOString()}},Notes:rich('Collected; '+(validation.passed?'numeric validation passed':'review required')+'. '+JSON.stringify(validation))};
 props['Collection State']=rich(`${input.players.length} player records collected`);
 props['Validation State']=rich(validation.passed&&validation.startersConfirmed?'Numeric totals and official starters validated':'Review required');
 // Revoke publication before changing any player rows. Import never grants approval.
 const page=matches.length?await request('pages/'+matches[0].id,{properties:props},'PATCH'):await request('pages',{parent:{type:'data_source_id',data_source_id:games},properties:props});
 const existing=await query(players,{property:'Game',relation:{contains:page.id}});const txt=p=>(p?.title||p?.rich_text||[]).map(x=>x.plain_text??x.text?.content??'').join('');
 for(const p of input.players){
  const candidates=existing.filter(row=>{const q=row.properties;return (p.id&&txt(q['NBA Player ID'])===p.id)||txt(q.Player).normalize('NFKC').trim().toLowerCase()===p.name.normalize('NFKC').trim().toLowerCase();});
  if(candidates.length>1)throw Error('Ambiguous player identity; reconcile manually');
  const role=p.participation!=='Played'?'Not participating':p.lineupSourceConfirmed===true&&['Starter','Bench'].includes(p.lineupRole)?p.lineupRole:'Unconfirmed';
  const properties={Player:{title:[{text:{content:p.name}}]},Game:{relation:[{id:page.id}]},Team:rich('LAL'),'NBA Player ID':rich(p.id),Participation:{select:{name:p.participation==='Unavailable'?'Unconfirmed':p.participation}},'Status Original':rich(p.statusOriginal),MIN:rich(p.minutes),Source:{url:p.source},Review:{select:{name:'검토 대기'}},'Lineup Role':rich(role),'Collection State':rich('Collected'),'Collected At':{date:{start:new Date().toISOString()}},'Validation State':rich(validation.passed&&validation.startersConfirmed?'Validated':'Review required'),'Validation Notes':rich(validation.lineupWarning||'Source totals validated; publication remains separate'),...Object.fromEntries(fields.map(k=>[k,{number:p.stats?.[k]??null}]))};
  if(candidates.length)await request('pages/'+candidates[0].id,{properties},'PATCH');else await request('pages',{parent:{type:'data_source_id',data_source_id:players},properties});
 }
 return {mode:'applied',gameId:g.id,players:input.players.length,validation,publicationApproved:false,retainedUnmatchedRows:existing.length-input.players.filter(p=>existing.some(r=>txt(r.properties.Player)===p.name)).length};
}
if(require.main===module){const file=process.argv.find(x=>x.endsWith('.json'));if(!file){console.error('Usage: node tools/ingest-game-center.cjs input.json [--apply]');process.exitCode=1;}else{try{run(JSON.parse(fs.readFileSync(file,'utf8')),{apply:process.argv.includes('--apply')}).then(r=>console.log(JSON.stringify(r))).catch(()=>{console.error('Import stopped. No secret or provider response logged. Inspect permissions/input and any partial writes before retry.');process.exitCode=1;});}catch{console.error('Invalid input file');process.exitCode=1;}}}
module.exports={validate,run,identity};
