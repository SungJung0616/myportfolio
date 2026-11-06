'use strict';
// Daily assisted batch runner. Input is privately retained, source-reviewed JSON.
// No scraping, scheduler, browser credentials, or publication approval is implied.
const fs=require('node:fs');
const {validate,run}=require('./ingest-game-center.cjs');
async function daily(inputs,options={}){
 if(!Array.isArray(inputs)||!inputs.length)throw Error('Expected an array of completed game imports');
 const ids=new Set();
 for(const input of inputs){validate(input);if(ids.has(input.game.id))throw Error('Duplicate game in daily batch');ids.add(input.game.id);}
 const results=[];
 for(const input of [...inputs].sort((a,b)=>a.game.date.localeCompare(b.game.date)))results.push(await run(input,options));
 return results;
}
if(require.main===module){
 const file=process.argv.find(v=>v.endsWith('.json'));
 if(!file){console.error('Usage: node tools/ingest-game-center-daily.cjs private-batch.json [--apply]');process.exitCode=1;}
 else {try{daily(JSON.parse(fs.readFileSync(file,'utf8')),{apply:process.argv.includes('--apply')}).then(r=>console.log(JSON.stringify(r))).catch(()=>{console.error('Batch stopped; review private input and partial writes before retry.');process.exitCode=1;});}catch{console.error('Invalid batch input');process.exitCode=1;}}
}
module.exports={daily};
