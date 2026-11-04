'use strict';
const assert=require('node:assert/strict'),{pathToFileURL}=require('node:url'),path=require('node:path'),fs=require('node:fs');
(async()=>{
 const {createTourState,FACE_NAMES}=await import(pathToFileURL(path.resolve(__dirname,'../preview/v0304-p2-hero-cta/jumbotron-tour.js')));let n=0;
 const check=(s,f)=>{f();n++;console.log('PASS '+s);},t=createTourState();
 check('idle until user starts',()=>assert.equal(t.active,false));t.start(false);
 check('starts at results',()=>assert.equal(t.face,0));
 for(let face=1;face<=3;face++){for(let i=0;i<110;i++)t.update(.1,false);check('autoplay face '+face,()=>assert.equal(t.face,face%4));}
 check('finishes after fourth face instead of looping',()=>{for(let i=0;i<100;i++)t.update(.1,false);assert.equal(t.complete,true);assert.equal(t.face,3);});
 t.pause();const a=t.angle;for(let i=0;i<100;i++)t.update(.1,false);check('pause holds dwell',()=>assert.equal(t.angle,a));
 t.start(false);for(let i=0;i<85;i++)t.update(.1,false);t.pause();const mid=t.angle;for(let i=0;i<30;i++)t.update(.1,false);check('pause freezes mid-orbit',()=>assert.equal(t.angle,mid));t.toggle(false);t.update(.1,false);check('resume continues mid-orbit',()=>assert.ok(t.angle>mid));
 t.step(1,true);check('keyboard instant step',()=>assert.equal(t.moving,false));
 t.start(true);for(let i=0;i<200;i++)t.update(.1,true);check('reduced motion never auto orbits',()=>assert.equal(t.angle,0));
 t.step(-1,true);check('previous wraps to face four',()=>assert.equal(t.face,3));
 for(let i=0;i<4;i++){t.step(1,true);const p=t.pose();check('orbit bounds '+i,()=>{assert.ok(Math.abs(p.x)<=10.5);assert.ok(p.z>=-39.5&&p.z<=-18.5);assert.equal(p.y,9);});}
 t.stop();check('exit releases camera',()=>assert.equal(t.active,false));check('four distinct titles',()=>assert.equal(new Set(FACE_NAMES).size,4));
 const ui=fs.readFileSync(path.resolve(__dirname,'../preview/v0304-p2-hero-cta/game-center.js'),'utf8');check('demo clearly labeled',()=>assert.ok(ui.includes('Synthetic preview · not an NBA result')));check('bench pagination',()=>assert.ok(ui.includes('bench.slice(benchPage*5,benchPage*5+5)')));check('no DNP in bench',()=>assert.ok(ui.includes("p.participation==='Played'&&p.lineupRole==='Bench'")));
 console.log(n+' tour/content checks passed; browser verification is separate.');
})().catch(e=>{console.error(e);process.exitCode=1;});
