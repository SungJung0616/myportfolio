'use strict';
// No credentials or paid API. Fetch the 30 reviewed originals once per clean build.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const manifest=require('./nba-team-logo-manifest.cjs');
const root=path.resolve(__dirname,'..'),cache=path.join(root,'.netlify/nba-team-assets');
const digest=data=>crypto.createHash('sha256').update(data).digest('hex');
function verify(id,data){
 if(data.length>262144||digest(data)!==manifest[id])throw Error(`Team logo ${id}: reviewed SHA-256 mismatch`);
 const svg=data.toString('utf8');
 if(!/<svg\b/.test(svg)||/<(?:script|foreignObject)\b|\bon[a-z]+\s*=|(?:href|xlink:href)\s*=\s*["'](?:https?:|\/\/|data:)/i.test(svg))throw Error(`Team logo ${id}: unsupported SVG content`);
}
async function main(){
 // Refuse redirected cache paths; never remove or overwrite canonical source files.
 for(const dir of [path.dirname(cache),cache]){
  if(fs.existsSync(dir)){const s=fs.lstatSync(dir);if(!s.isDirectory()||s.isSymbolicLink()||fs.realpathSync(dir)!==path.join(fs.realpathSync(root),path.relative(root,dir)))throw Error('Unsafe logo cache directory');}
  else fs.mkdirSync(dir);
 }
 const ids=Object.keys(manifest);let downloads=0;
 for(let i=0;i<ids.length;i+=4)await Promise.all(ids.slice(i,i+4).map(async id=>{
  const file=path.join(cache,`${id}.svg`);
  if(fs.existsSync(file)){const s=fs.lstatSync(file);if(!s.isFile()||s.isSymbolicLink())throw Error('Unsafe cached logo');verify(id,fs.readFileSync(file));return;}
  const response=await fetch(`https://cdn.nba.com/logos/nba/${id}/primary/L/logo.svg`,{redirect:'error',signal:AbortSignal.timeout(20000)});
  if(!response.ok)throw Error(`Team logo ${id}: HTTP ${response.status}`);
  const data=Buffer.from(await response.arrayBuffer());verify(id,data);fs.writeFileSync(file,data,{flag:'wx'});downloads++;
 }));
 console.log(`Verified ${ids.length} NBA team assets (${downloads} downloaded; remaining assets reused from ignored cache).`);
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1;});
module.exports={verify};
