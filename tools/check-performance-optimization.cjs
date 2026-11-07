const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {pathToFileURL}=require('node:url');
(async()=>{
 global.location={origin:'https://test.invalid'};
 const {createGameDataClient}=await import(pathToFileURL(path.resolve('preview/v0304-p2-hero-cta/game-center-client.js')));
 let calls=0,time=0;const client=createGameDataClient({now:()=>time,fetcher:async()=>{calls++;return {ok:true,json:async()=>({state:'ready'})}}});
 await Promise.all([client.get('history'),client.get('history')]);assert.equal(calls,1);
 await client.get('history');assert.equal(calls,1);
 time=60001;await client.get('history');assert.equal(calls,2);
 client.clear();await client.get('history');assert.equal(calls,3);
 let attempts=0;const failing=createGameDataClient({fetcher:async()=>{attempts++;throw Error('offline')}});
 await assert.rejects(failing.get('history'));await assert.rejects(failing.get('history'));assert.equal(attempts,2);
 let aborted=false;const cancellable=createGameDataClient({fetcher:(_,{signal})=>new Promise((_,reject)=>signal.addEventListener('abort',()=>{aborted=true;reject(Error('cancelled'))}))});
 const pending=cancellable.get('history');cancellable.clear();await assert.rejects(pending);assert.ok(aborted);
 const source=fs.readFileSync('preview/v0304-p2-hero-cta/exterior.js','utf8');
 assert.ok(!source.slice(source.indexOf('function pose(p)'),source.indexOf('window.checkEnclosure')).includes('new T.Vector3'));
 assert.ok(source.includes('camera.position.toArray(diagnostics.camera)'));
 assert.ok(source.includes('if(document.hidden)return'));
 const T=await import(pathToFileURL(path.resolve('preview/v0304-p2-hero-cta/three.module.js')));
 global.document={querySelector:()=>null};
 const {rail}=await import(pathToFileURL(path.resolve('preview/v0304-p2-hero-cta/spatial-data.js')));
 const baseline=require('node:child_process').execFileSync('git',['show','e4bc7c3dd521aea100db55c6a62b67b511ef71b0:preview/v0304-p2-hero-cta/exterior.js'],{encoding:'utf8'});
 const extract=s=>s.slice(s.indexOf('function pose(p)'),s.indexOf('\n\nwindow.checkEnclosure'));
 for(const width of [390,1280]){
  const before=new T.PerspectiveCamera(43,width/720,.1,220),after=before.clone();
  const build=(s,c)=>new Function('T','camera','stops','innerWidth',`const smooth=t=>t*t*(3-2*t);const poseEnd=new T.Vector3(),poseVia=new T.Vector3(),poseTarget=new T.Vector3(),poseTargetEnd=new T.Vector3(),mobilePosition=new T.Vector3(0,6.4,-13.8),mobileTarget=new T.Vector3(0,2.3,-32);${extract(s)};return pose;`)(T,c,rail,width);
  const oldPose=build(baseline,before),newPose=build(source,after);
  for(let i=0;i<=2000;i++){oldPose(i/2000);newPose(i/2000);assert.ok(before.position.distanceTo(after.position)<1e-10);assert.ok(1-Math.abs(before.quaternion.dot(after.quaternion))<1e-10);assert.equal(before.fov,after.fov);}
 }
 console.log('PASS: 4,002 desktop/mobile camera poses numerically identical to production.');
 const gc=fs.readFileSync('preview/v0304-p2-hero-cta/game-center.js','utf8');
 assert.ok(gc.includes('faceKeys[i]===key'));
 assert.ok(gc.includes('document.fonts?.ready.then(()=>paintFaces(true))'));
 const html=fs.readFileSync('preview/v0304-p2-hero-cta/index.html','utf8');
 for(const css of ['project-showcase.css','contact.css']) { const at=html.indexOf(`href="${css}"`); assert.ok(at>=0&&at<html.indexOf('</head>')); }
 assert.ok(!fs.readFileSync('preview/v0304-p2-hero-cta/project-showcase.js','utf8').includes("document.createElement('link')"));
 assert.ok(!fs.readFileSync('preview/v0304-p2-hero-cta/navigation.js','utf8').includes("document.createElement('link')"));
 const hero=fs.readFileSync('preview/v0304-p2-hero-cta/hero.js','utf8');
 const initialState=hero.indexOf("classList.toggle('hero-active'");
 assert.ok(initialState>=0&&initialState<hero.indexOf("document.createElement('section')"));
 console.log('PASS: initial Work/Contact styles and Hero state precede visible component mounting.');
 const a=fs.readFileSync('.netlify/portfolio-2-preview/resume/Sung_Jung_Resume.pdf');
 assert.ok(a.equals(fs.readFileSync('.netlify/portfolio-2-production/resume/Sung_Jung_Resume.pdf')));
 console.log('PASS: request coalescing (2 concurrent -> 1), cache hit (1 -> 0), expiry, refresh, failure retry, cancellation, vector reuse, diagnostics reuse, hidden-tab guard, face invalidation, font refresh, resume identity.');
})().catch(e=>{console.error(e);process.exitCode=1});
