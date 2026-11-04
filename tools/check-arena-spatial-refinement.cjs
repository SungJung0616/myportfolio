const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const base=path.resolve(__dirname,'../preview/v0304-p2-hero-cta');
 const labels=[];const ctx=new Proxy({fillText:t=>labels.push(t)},{get:(o,k)=>o[k]||(()=>{})});
 global.document={querySelector:()=>null,createElement:()=>({width:0,height:0,getContext:()=>ctx})};
 const {rail,layout}=await import(pathToFileURL(path.join(base,'spatial-data.js')));
 const T=await import(pathToFileURL(path.join(base,'three.module.js')));
 const {createArenaClock}=await import(pathToFileURL(path.join(base,'arena-clock.js')));
 let n=0;function check(name,fn){fn();n++;console.log('PASS '+name);}
 check('strict forward and reverse stop ordering',()=>rail.forEach((s,i)=>{if(i)assert.ok(s.s>rail[i-1].s);}));
 const cue=rail.find(s=>s.s===.69);
 check('cue between court and center',()=>assert.ok(cue&&rail.find(s=>s.s===.64)&&rail.find(s=>s.s===.74)));
 check('cue moves forward and looks upward',()=>{assert.ok(cue.p[2]<-15.2);assert.ok(cue.t[1]>cue.p[1]);});
 check('memorial target restored to original placement',()=>assert.deepEqual(rail.find(s=>s.s===.88).t,layout.score));
 const scene=new T.Scene(),{clock,update}=createArenaClock(scene);
 check('clock on left wall above far-side goal sightline',()=>{assert.deepEqual(clock.position.toArray(),[-17.52,6.5,-39]);assert.equal(clock.rotation.y,Math.PI/2);});
 const now=Date.parse('2026-11-04T15:30:00Z');update(now);const version=clock.material.map.version;update(now+1000);
 check('no repeated texture upload within minute',()=>assert.equal(clock.material.map.version,version));
 update(now+60000);check('updates next minute',()=>assert.equal(clock.material.map.version,version+1));
 check('LA label visible',()=>assert.ok(labels.includes('LOS ANGELES')));
 check('no shadow or new light',()=>{assert.equal(scene.children.length,1);assert.equal(clock.castShadow,false);});
 console.log(n+' spatial refinement checks passed; visual checks are separate.');
})().catch(e=>{console.error(e);process.exitCode=1;});
