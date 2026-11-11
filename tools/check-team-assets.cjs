const assert=require('node:assert/strict'),{pathToFileURL}=require('node:url'),path=require('node:path'),fs=require('node:fs');
const manifest=require('./nba-team-logo-manifest.cjs'),{verify}=require('./cache-nba-team-logos.cjs');
(async()=>{
 const root=path.resolve(__dirname,'..');
 const {TEAM_ASSETS,resolveTeam,drawTeamBadge,teamBadge,preloadTeamLogos}=await import(pathToFileURL(path.join(root,'preview/v0304-p2-hero-cta/team-assets.js')));
 let n=0;const check=(name,fn)=>{fn();n++;};
 check('30 current teams',()=>assert.equal(Object.keys(TEAM_ASSETS).length,30));
 check('manifest and registry aligned',()=>assert.deepEqual(Object.keys(TEAM_ASSETS).sort(),Object.keys(manifest).sort()));
 for(const [id,t]of Object.entries(TEAM_ASSETS)){
  check(id+' identity',()=>{assert.equal(resolveTeam(Number(id)),t);assert.equal(resolveTeam(t.name),t);assert.equal(resolveTeam(' '+t.abbreviation.toLowerCase()+' '),t);for(const alias of t.aliases)assert.equal(resolveTeam(alias),t);});
  check(id+' source and local path',()=>{assert.equal(t.assetPath,`./team-logos/${id}.svg`);assert.equal(t.assetSource,`https://cdn.nba.com/logos/nba/${id}/primary/L/logo.svg`);});
  check(id+' pinned original',()=>verify(id,fs.readFileSync(path.join(root,'.netlify/nba-team-assets',`${id}.svg`))));
 }
 check('reported Atlanta regression',()=>assert.equal(resolveTeam('1610612737','Atlanta Hawks').name,'Atlanta Hawks'));
 check('Detroit and next Milwaukee game',()=>{assert.equal(resolveTeam('1610612765').abbreviation,'DET');assert.equal(resolveTeam('1610612749').abbreviation,'MIL');});
 check('unknown numeric identifier never becomes a name',()=>{assert.equal(resolveTeam('9999999999').name,'Opponent');assert.equal(resolveTeam('999','777').name,'Opponent');});
 check('provider name retained for unknown identifier',()=>assert.equal(resolveTeam('999','Example visitors').name,'Example visitors'));
 check('provider name resolves known logo after unknown identifier',()=>assert.equal(resolveTeam('999','Atlanta Hawks'),TEAM_ASSETS['1610612737']));
 check('missing values remain safe',()=>{for(const value of [null,undefined,'',0])assert.equal(resolveTeam(value).name,'Opponent');});
 const calls=[],draws=[],ctx=new Proxy({fillText:s=>calls.push(s),drawImage:(...a)=>draws.push(a)},{get:(o,k)=>o[k]||(()=>{})});
 check('canvas abbreviation before load',()=>{drawTeamBadge(ctx,'1610612747',100,100,80);assert.deepEqual(calls,['LAL']);});
 let requests=0;
 global.Image=class{constructor(){requests++;this.naturalWidth=200;this.naturalHeight=100;}set src(value){this.url=value;queueMicrotask(()=>value.includes('1610612749')?this.onerror():this.onload());}cloneNode(){return {src:this.url};}};
 global.document={createElement:()=>({setAttribute(){},replaceChildren(...nodes){this.children=nodes;}})};
 await preloadTeamLogos(['LAL','LAL','Atlanta Hawks']);
 check('one request per logo',()=>assert.equal(requests,2));
 check('canvas draws loaded logo with preserved aspect ratio',()=>{drawTeamBadge(ctx,'1610612747',100,100,80);assert.equal(draws.length,1);assert.equal(draws[0][3]/draws[0][4],2);});
 const badge=teamBadge('1610612737');await Promise.resolve();
 check('HTML uses same official image',()=>assert.ok(badge.children[0].src.endsWith('/team-logos/1610612737.svg')));
 await preloadTeamLogos(['MIL']);const failed=teamBadge('MIL');await Promise.resolve();calls.length=0;drawTeamBadge(ctx,'MIL',100,100,80);
 check('failed logo retains readable fallback',()=>{assert.equal(failed.textContent,'MIL');assert.deepEqual(calls,['MIL']);});
 await preloadTeamLogos(['MIL','ATL']);check('failed and loaded assets do not refetch every paint',()=>assert.equal(requests,3));
 check('tampered original rejected',()=>assert.throws(()=>verify('1610612747',Buffer.from('<svg/>')),/SHA-256 mismatch/));
 console.log(n+' team identity, asset integrity, image-cache and fallback checks passed.');
})().catch(e=>{console.error(e);process.exitCode=1;});
