'use strict';
const assert=require('node:assert/strict'),{pathToFileURL}=require('node:url'),path=require('node:path'),fs=require('node:fs');
(async()=>{
 const {createTourState,FACE_NAMES}=await import(pathToFileURL(path.resolve(__dirname,'../preview/v0304-p2-hero-cta/jumbotron-tour.js')));let n=0;
 const check=(s,f)=>{f();n++;console.log('PASS '+s);},t=createTourState();
 check('idle until user starts',()=>assert.equal(t.active,false));t.start(false);
 check('starts at results',()=>assert.equal(t.face,0));
 check('automatic advance after 2.8 seconds',()=>{t.update(2.79,false);assert.equal(t.moving,false);t.update(.02,false);assert.equal(t.moving,true);t.update(.65,false);assert.equal(t.face,1);});t.start(false);
 for(let face=1;face<=3;face++){t.step(1,false);t.update(.65,false);check('manual face '+face,()=>assert.equal(t.face,face%4));}
 check('low frame rate does not extend transition',()=>{t.start(false);t.step(1,false);t.update(.4,false);t.update(.25,false);assert.equal(t.moving,false);assert.equal(t.face,1);});
 t.pause();const a=t.angle;for(let i=0;i<100;i++)t.update(.1,false);check('pause holds dwell',()=>assert.equal(t.angle,a));
 t.start(false);t.step(1,false);t.update(.1,false);t.pause();const mid=t.angle;for(let i=0;i<30;i++)t.update(.1,false);check('pause freezes mid-orbit',()=>assert.equal(t.angle,mid));t.toggle(false);t.update(.1,false);check('resume continues mid-orbit',()=>assert.ok(t.angle>mid));
 t.step(1,true);check('keyboard instant step',()=>assert.equal(t.moving,false));
 t.start(true);for(let i=0;i<200;i++)t.update(.1,true);check('reduced motion never auto orbits',()=>assert.equal(t.angle,0));
 t.step(-1,true);check('previous wraps to face four',()=>assert.equal(t.face,3));
 for(let i=0;i<4;i++){t.step(1,true);const p=t.pose();check('orbit bounds '+i,()=>{assert.ok(Math.abs(p.x)<=10.5);assert.ok(p.z>=-39.5&&p.z<=-18.5);assert.equal(p.y,9);});}
 t.stop();check('exit releases camera',()=>assert.equal(t.active,false));check('four distinct titles',()=>assert.equal(new Set(FACE_NAMES).size,4));
 const ui=fs.readFileSync(path.resolve(__dirname,'../preview/v0304-p2-hero-cta/game-center.js'),'utf8');check('demo clearly labeled',()=>assert.ok(ui.includes('Synthetic preview · not an NBA result')));check('bench pagination',()=>assert.ok(ui.includes('bench.slice(benchPage*5,benchPage*5+5)')));check('no DNP in bench',()=>assert.ok(ui.includes("p.participation==='Played'&&p.lineupRole==='Bench'")));
 check('English date locale',()=>assert.ok(ui.includes("Intl.DateTimeFormat('en-US',")));
 check('manual step is instant and restarts dwell',()=>{t.start(false);t.update(2.5,false);t.step(1,true);assert.equal(t.face,1);t.update(2.79,false);assert.equal(t.moving,false);t.update(.02,false);assert.equal(t.moving,true);});
 check('last face is next game without invented schedule',()=>{assert.equal(FACE_NAMES[3],'Next Game Preview');assert.ok(ui.includes('Schedule awaiting verification'));assert.ok(!ui.includes("line('Previous result'"));});
 check('instant entry and accessible symbol controls',()=>{assert.ok(ui.includes('approach=1;returning=-1;tour.start'));assert.ok(ui.includes("button.setAttribute('aria-label',label)"));assert.ok(ui.includes("el('button','×','gc-icon')"));});
 check('manual controls without Play or Pause',()=>{assert.ok(!ui.includes("el('button','Pause')"));assert.ok(!ui.includes("el('button','Play')"));});
 check('rotation target does not alias output quaternion',()=>{assert.ok(ui.includes('targetRotation.copy(camera.quaternion)'));assert.ok(!ui.includes('slerpQuaternions(approachRotation,camera.quaternion,'));});
 check('player names keep diacritics with complete system font',()=>assert.ok(ui.includes("c.font='600 34px Arial, sans-serif';c.fillText(p.name.normalize('NFC')")));
 const {Quaternion,Euler}=await import(pathToFileURL(path.resolve(__dirname,'../preview/v0304-p2-hero-cta/three.core.js')));
 check('entry rotation interpolates before final frame',()=>{const from=new Quaternion().setFromEuler(new Euler(.3,0,0)),target=new Quaternion(),camera=target.clone();camera.slerpQuaternions(from,target.clone(),.5);assert.ok(camera.angleTo(target)<from.angleTo(target));assert.ok(camera.angleTo(target)>0);});
 console.log(n+' tour/content checks passed; browser verification is separate.');
})().catch(e=>{console.error(e);process.exitCode=1;});
