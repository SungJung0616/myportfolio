import {applyHero} from './hero.js';
import {createWelcomeIntro} from './welcome-intro.js';
import {createWeather} from './weather.js?v=fix13a1-lighting-1';
import {createLayrdEasterEgg} from './layrd-easter-egg.js';
import {createFilmArchive} from './film.js';
import * as T from './three.module.js';
import {RoundedBoxGeometry} from './RoundedBoxGeometry.js';
import {career} from './career-data.js';
import {createCareerGallery} from './career-gallery.js';
import {createCareerWalk} from './career-walk.js';
import {GLTFLoader} from './GLTFLoader.js';
import {buildProjectSpace} from './project-space.js?v=film-entrance-plaque-1';
import {buildArenaCourt} from './arena-court.js';
import {layout,rail} from './spatial-data.js';
const canvas=document.querySelector('#world'),scene=new T.Scene();
scene.background=new T.Color('#cbdfea');scene.fog=new T.Fog('#cbdfea',160,300);
let renderer;try{renderer=new T.WebGLRenderer({canvas,antialias:true});}catch(e){document.querySelector('#failure').hidden=false;throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.outputColorSpace=T.SRGBColorSpace;
const camera=new T.PerspectiveCamera(43,1,.1,220);
camera.layers.enable(1);
const mat=(color,roughness=.8,metalness=0)=>new T.MeshStandardMaterial({color,roughness,metalness});
const M={cream:mat('#ddd5c4'),purple:mat('#554066'),deep:mat('#342c43'),gold:mat('#d2a657',.52,.25),stone:mat('#bcb5ad'),pave:mat('#d1c6b4'),glass:mat('#738d9c',.24,.3),leaf:mat('#778574'),bark:mat('#7d6755'),bronze:mat('#9c7845',.48,.65),dark:mat('#211d2b')};
const glow=new T.MeshStandardMaterial({color:'#ffe6a1',emissive:'#ffc66b',emissiveIntensity:1.25});
function mesh(geo,m,x=0,y=0,z=0,parent=scene){const o=new T.Mesh(geo,m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
function box(w,h,d,x,y,z,m=M.cream,r=.1,parent=scene){return mesh(new RoundedBoxGeometry(w,h,d,3,Math.min(r,w/3,h/3,d/3)),m,x,y,z,parent);}
function ell(rx,ry,rz,x,y,z,m,parent=scene){const o=mesh(new T.SphereGeometry(1,32,20),m,x,y,z,parent);o.scale.set(rx,ry,rz);return o;}
function cyl(rt,rb,h,x,y,z,m,parent=scene){return mesh(new T.CylinderGeometry(rt,rb,h,48),m,x,y,z,parent);}
function line(points,r,m,parent=scene){return mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),64,r,8,false),m,0,0,0,parent);}
function limb(a,b,r,m,parent){const aa=new T.Vector3(...a),bb=new T.Vector3(...b),o=mesh(new T.CapsuleGeometry(r,Math.max(.01,aa.distanceTo(bb)),5,14),m,0,0,0,parent);o.position.copy(aa).add(bb).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),bb.sub(aa).normalize());return o;}
function tex(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'));const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;t.anisotropy=renderer.capabilities.getMaxAnisotropy();return t;}
function sign(text,sub,w,h,x,y,z,bg='#35273f',fg='#ecd092',parent=scene){const t=tex(1024,256,c=>{c.fillStyle=bg;c.fillRect(0,0,1024,256);c.textAlign='center';c.fillStyle=fg;c.font='700 86px Arial';c.fillText(text,512,sub?115:160,940);if(sub){c.font='28px Arial';c.fillText(sub,512,194,940);}});return mesh(new T.PlaneGeometry(w,h),new T.MeshStandardMaterial({map:t,roughness:.7,emissive:'#ffffff',emissiveMap:t,emissiveIntensity:.13}),x,y,z,parent);}
// Sunny sky and soft directional shadows, no studio-black backdrop.
scene.add(new T.HemisphereLight('#e7f3ff','#baa7bc',2.2));const sun=new T.DirectionalLight('#ffedcf',3.4);sun.position.set(-20,35,26);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-30,right:30,top:28,bottom:-28,near:1,far:95});sun.shadow.normalBias=.04;sun.shadow.bias=-.00012;scene.add(sun);
const earth=mesh(new T.PlaneGeometry(300,300),mat('#c1d1cb'),0,-.68,0);earth.rotation.x=-Math.PI/2;
earth.name='outside-ground';
const base=cyl(23,23.5,.65,0,-.35,1,M.stone);base.scale.z=.83;
const lawn=cyl(22.6,22.6,.12,0,.01,1,mat('#a2ab91'));lawn.scale.z=.83;
const plaza=cyl(20.7,21,.18,0,.09,1,M.pave);plaza.scale.z=.82;
box(8,.08,14,0,.21,13,mat('#e0d4be'),.05);
// Large paving units and edging replace detailed botanical clutter.
for(let z=8;z<20;z+=1.5)for(let x=-3;x<=3;x+=1.5)box(1.46,.025,1.46,x,.263,z,M.pave,.025);
for(const x of [-4.1,4.1])box(.16,.11,12,x,.29,13,M.cream,.035);
// Oval shell with a true opening at the front, not a picture of a building.
const rx=14,rz=10,cz=-4;
// Outward winding keeps normalBias outside the shell instead of causing self-shadow stripes.
function ringWall(y0,y1,a0,a1,material,radX=rx,radZ=rz){const v=[],idx=[],n=80;for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n,x=Math.sin(a)*radX,z=Math.cos(a)*radZ+cz;v.push(x,y0,z,x,y1,z);if(i<n){const k=i*2;idx.push(k,k+2,k+1,k+1,k+2,k+3);}}const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(v,3));g.setIndex(idx);g.computeVertexNormals();const m=material.clone();m.side=T.DoubleSide;return mesh(g,m);}
ringWall(.25,5.9,.245,Math.PI*2-.245,M.purple);
ringWall(.25,.75,.245,Math.PI*2-.245,M.cream,14.08,10.08);
ringWall(5.5,6.05,0,Math.PI*2,M.cream,14.15,10.15);
ringWall(4.75,5.05,.245,Math.PI*2-.245,M.gold,14.08,10.08);
// Repeated glass bays share a clean stadium vocabulary.
for(let i=0;i<34;i++){const a=(i+.5)*Math.PI*2/34;if(a<.32||a>Math.PI*2-.32)continue;const x=Math.sin(a)*14.12,z=Math.cos(a)*10.12+cz;const g=box(1.22,3.15,.12,x,2.57,z,M.glass,.08);g.rotation.y=a;const mull=box(.15,4.3,.26,x,2.5,z,M.cream,.06);mull.rotation.y=a;}
// Smooth flattened dome and sculpted radial ribs.
const roofMat=M.deep.clone();roofMat.side=T.DoubleSide;
const roof=mesh(new T.SphereGeometry(1,96,32,0,Math.PI*2,0,Math.PI/2),roofMat,0,5.94,cz);roof.scale.set(14.4,2.85,10.4);
for(let i=0;i<12;i++){const a=i*Math.PI*2/12;if(i===0)continue;const points=[];for(let j=0;j<=12;j++){const e=j/12*Math.PI/2;points.push([Math.sin(a)*14.5*Math.cos(e),5.92+2.93*Math.sin(e),cz+Math.cos(a)*10.5*Math.cos(e)]);}line(points,.19,M.cream);}
const roofRing=mesh(new T.TorusGeometry(6,.1,10,80),M.gold,0,8.32,cz);roofRing.rotation.x=Math.PI/2;roofRing.scale.y=.73;
roofRing.position.y=8.72;
for(let i=1;i<10;i++){const a=i*Math.PI*2/10;line([[14.15*Math.sin(a),.6,cz+10.15*Math.cos(a)],[14.35*Math.sin(a),3.2,cz+10.35*Math.cos(a)],[14.5*Math.sin(a),5.8,cz+10.5*Math.cos(a)]],.21,M.cream);}
const roofBadge=sign('SJ','HOME COURT',5,1.25,0,8.89,cz,'#342c43','#ddb871');roofBadge.rotation.x=-Math.PI/2;
// Entrance: open middle aisle, glazing on both sides, canopy and numbered gate.
for(const x of [-3.6,3.6])box(.5,5.25,2.6,x,2.85,6.2,M.cream,.18);
box(8.1,.58,3.8,0,5.32,6.5,M.cream,.22);box(7.6,.11,3.6,0,4.98,6.5,M.gold,.035);
box(8.6,1.5,.48,0,6.3,7.9,M.deep,.2);sign('SUNG JUNG','HOME COURT',8.25,1.28,0,6.3,8.16);
sign('GATE 01','',3.1,.6,0,5.32,8.43,'#ddd5c4','#342c43');
// The widened passage has no floating glazing strips inside the clear opening.
for(const x of [-3.6,3.6])box(.08,2.2,.06,x,2.8,7.54,glow,.02);
// Threshold remains level with a broad accessible path.
box(7.2,.12,3.2,0,.23,6.3,M.pave,.05);
// Ticket booth and freestanding arena guide.
box(2.5,2.4,1.75,-6.2,1.48,7.7,M.cream,.2);box(2.8,.28,2,-6.2,2.82,7.7,M.purple,.12);box(2.05,.94,.07,-6.2,1.84,8.62,M.glass,.05);sign('TICKETS','INFORMATION',2.24,.55,-6.2,2.47,8.68);box(2.15,.15,.5,-6.2,1.23,8.85,M.gold,.04);
// No freestanding text stack beside the guide: the entrance stays visually clear.
// Refined stylized fan tribute, deliberately not a photoreal likeness or replica.
const tribute=new T.Group();tribute.position.set(-8.5,.27,12);scene.add(tribute);
cyl(2,2.2,.2,0,.1,0,M.cream,tribute);box(1.85,1.1,1.45,0,.75,0,M.deep,.14,tribute);sign('KOBE BRYANT','8  /  24  —  A FAN TRIBUTE',1.7,.57,0,.85,.738,'#342c43','#e1bc7c',tribute);
const b=M.bronze,bronzeTrim=mat('#b9945b',.4,.7),bronzeDark=mat('#684a2f',.65,.4);
const jersey=mesh(new T.LatheGeometry([new T.Vector2(.29,0),new T.Vector2(.3,.15),new T.Vector2(.34,.5),new T.Vector2(.42,.85),new T.Vector2(.36,.98)],40),b,0,2.36,0,tribute);jersey.scale.z=.64;
ell(.25,.33,.24,.015,3.73,.015,b,tribute);limb([0,3.22,0],[.015,3.5,.015],.125,b,tribute);
ell(.042,.065,.052,.015,3.7,.235,bronzeTrim,tribute);ell(.045,.075,.04,-.245,3.72,.01,b,tribute);ell(.045,.075,.04,.255,3.72,.01,b,tribute);
for(const x of [-.093,.108]){ell(.043,.02,.014,x,3.8,.238,bronzeDark,tribute);limb([x-.045,3.845,.223],[x+.04,3.85,.229],.018,b,tribute);}
line([[-.075,3.595,.225],[.015,3.582,.24],[.1,3.598,.22]],.012,bronzeDark,tribute);
const numberMap=tex(256,256,c=>{c.clearRect(0,0,256,256);c.fillStyle='#e2bf83';c.font='bold 140px Arial';c.textAlign='center';c.fillText('24',128,180);});mesh(new T.PlaneGeometry(.44,.4),new T.MeshStandardMaterial({map:numberMap,transparent:true,metalness:.6,roughness:.5}),0,2.9,.24,tribute);
// Shorts, planted sneakers and bent knees give a readable athletic stance.
for(const [x,angle]of [[-.21,-.16],[.21,.16]]){const shorts=cyl(.235,.255,.44,x,2.32,0,b,tribute);shorts.rotation.z=angle;shorts.scale.z=.8;}
limb([-.22,2.15,0],[-.36,1.85,.13],.14,b,tribute);limb([-.36,1.85,.13],[-.42,1.48,.23],.105,b,tribute);
limb([.23,2.15,0],[.48,1.87,-.05],.14,b,tribute);limb([.48,1.87,-.05],[.52,1.48,-.02],.105,b,tribute);
for(const [x,z]of [[-.42,.28],[.52,.04]]){box(.32,.095,.6,x,1.36,z+.08,bronzeDark,.06,tribute);ell(.16,.14,.28,x,1.48,z+.08,b,tribute);for(let k=0;k<3;k++)limb([x-.085,1.58,z+.04+k*.055],[x+.085,1.58,z+.04+k*.055],.009,bronzeTrim,tribute);}
limb([-.34,3.19,0],[-.5,3.56,.18],.125,b,tribute);limb([-.5,3.56,.18],[-.18,4.1,.25],.09,b,tribute);
limb([.34,3.19,0],[.51,3.58,.12],.125,b,tribute);limb([.51,3.58,.12],[.25,4.11,.26],.09,b,tribute);
ell(.08,.13,.055,-.14,4.14,.29,b,tribute);ell(.08,.13,.055,.22,4.15,.29,b,tribute);
for(let f=0;f<4;f++){limb([-.19+f*.035,4.18,.31],[-.18+f*.035,4.32,.35],.014,b,tribute);limb([.16+f*.034,4.18,.3],[.14+f*.034,4.31,.34],.014,b,tribute);}
ell(.255,.255,.255,.035,4.37,.34,b,tribute);
for(const rot of [0,Math.PI/2]){const seam=mesh(new T.TorusGeometry(.257,.009,6,48),bronzeDark,.035,4.37,.34,tribute);seam.rotation.y=rot;}const seam=mesh(new T.TorusGeometry(.257,.009,6,48),bronzeDark,.035,4.37,.34,tribute);seam.rotation.x=Math.PI/2;
// Sparse planted forms, benches and poles give the plaza scale.
for(const [x,z]of [[-15,5],[15,5],[-14,12],[13,12]]){cyl(1.55,1.65,.4,x,.46,z,M.cream);cyl(1.4,1.4,.1,x,.7,z,mat('#7b846b'));cyl(.12,.2,2.7,x,1.8,z,M.bark);ell(1.15,1.6,1.05,x,3.8,z,M.leaf);ell(.78,.85,.8,x+.6,3.4,z-.1,M.leaf);}
for(const x of [-11.8,11.8]){box(2.6,.2,.7,x,.8,9,M.purple,.1);for(const d of [-.9,.9])box(.16,.6,.5,x+d,.44,9,M.deep,.035);}
for(const x of [-4.7,4.7])for(const z of [12,16,19]){cyl(.11,.14,.65,x,.6,z,M.deep);ell(.14,.1,.14,x,.98,z,glow);}
for(const x of [12]){cyl(.07,.08,6,x,3.2,5,M.deep);box(1.3,2.5,.06,x+.65,4.1,5,M.purple,.02);sign('77','HOME COURT',1.14,.9,x+.65,4.25,5.05);}
const layrd=createLayrdEasterEgg({scene,canvas,camera,mesh,box,cyl,M});
// A closed vestibule joins the wide gate to the narrower tunnel. All surfaces overlap.
const interiorWall=mat('#a99db6'),interiorCream=mat('#e2daca');
for(const x of [-3.67,3.67])box(1.2,4.8,3.8,x,2.59,6.65,M.purple,.06);
box(8.55,.35,3.9,0,4.84,6.65,M.cream,.05);
box(8.55,.12,3.9,0,.24,6.65,M.pave,.03);
// Preserve the front facade while opening the old rear shell into a real rear hall.
// Local clipping removes only obsolete shell portions behind z=-4; no teleport.
renderer.localClippingEnabled=true;
const shellMaterials=[];const shellCut=new T.Plane(new T.Vector3(0,0,1),4);
scene.traverse(o=>{if(o.isMesh&&o!==earth){const materials=Array.isArray(o.material)?o.material:[o.material];o.material=materials.map(m=>{const c=m.clone();c.clipShadows=true;shellMaterials.push(c);return c;});if(o.material.length===1)o.material=o.material[0];}});
const gallery=new T.Group();scene.add(gallery);
const L=layout.tunnel.length,mid=(layout.tunnel.start+layout.tunnel.end)/2;
for(const x of [-3.05,3.05]){box(.38,4.35,L,x,2.44,mid,M.purple,.06,gallery);box(.1,1.05,L,x-Math.sign(x)*.23,.84,mid,interiorCream,.025,gallery);}
box(6.65,.32,L+.1,0,4.54,mid,interiorCream,.06,gallery);box(6.5,.11,L+.0525,0,.29,mid,mat('#aa9d8b'),.025,gallery);
const guideMat=new T.MeshStandardMaterial({color:'#dfc69e',emissive:'#b49261',emissiveIntensity:.28,roughness:.85});
for(const x of [-2.78,2.78])for(let z=7.4;z>layout.tunnel.end;z-=1.8)box(.035,.055,.8,x,.47,z,guideMat,.015,gallery);
gallery.traverse(o=>o.layers.set(1));
const galleryAmbient=new T.HemisphereLight('#c3b8cc','#65545c',.72);galleryAmbient.layers.set(1);scene.add(galleryAmbient);
// Real rear volume. Front facade/material language remains; old compact back is replaced.
const beforeHall=new Set(scene.children);
box(36,.2,43,0,.19,-25.5,M.pave,.08);
const arenaWall=mat('#665474'),arenaTrim=mat('#b7a7bc');
for(const x of [-18,18]){
 box(.4,11.2,43,x,5.9,-25.5,arenaWall,.12);
 box(.12,1.55,34,x-Math.sign(x)*.25,1.08,-29,interiorCream,.035);
 box(.14,.16,34,x-Math.sign(x)*.26,6.25,-29,arenaTrim,.04);
}
// Rear wall: a real door opening; the cinema is beyond the arena footprint.
box(4.6,11.2,.4,-15.5,5.9,-47,arenaWall,.12);
box(28.6,11.2,.4,3.5,5.9,-47,arenaWall,.12);
box(2.4,7.1,.4,-12,7.95,-47,arenaWall,.06);
box(36,.35,43,0,11.55,-25.5,M.cream,.12);
// Rounded roof ribs create depth without raising or enlarging the hall.
const ribMat=mat('#9a85a5'),innerRoofMat=mat('#e2d9c9');
for(const z of [-15,-21,-27,-33,-39,-45]){
 const pts=[];for(let i=0;i<=32;i++){const x=-17.7+i*35.4/32;pts.push(new T.Vector3(x,8.65+2.45*Math.cos(x/17.7*Math.PI/2),z));}
 mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),48,.17,8,false),ribMat,0,0,0);
 for(const x of [-17.7,17.7])box(.34,8.3,.38,x,4.55,z,ribMat,.10);
}
for(let i=0;i<24;i++){const x=-17.7+(i+.5)*35.4/24,y=8.95+2.45*Math.cos(x/17.7*Math.PI/2);const panel=box(35.4/24+.04,.13,41,x,y,-25.5,innerRoofMat,.03);panel.rotation.z=-2.45*Math.PI/35.4*Math.sin(x/17.7*Math.PI/2);}
for(const x of [-10,0,10]){const y=8.65+2.45*Math.cos(x/17.7*Math.PI/2);box(.16,.18,32,x,y-.13,-30,ribMat,.05);}
// Close front of rear hall on either side of the unchanged-width gallery.
for(const x of [-10.5,10.5])box(14.6,11.2,.4,x,5.9,-4,M.purple,.12);
box(6.6,6.65,.4,0,8.05,-4,M.purple,.08);

const careerMeshes=[],careerLights=[],careerRims=[],careerOutlines=[],persistentGallery=new Set();
let selectedCareer=null,hoveredCareer=null;
const careerHint=document.createElement('span');careerHint.id='career-frame-hint';careerHint.textContent='Click frame to explore';careerHint.hidden=true;careerHint.setAttribute('role','tooltip');document.body.append(careerHint);
career.forEach((record,i)=>{
  const z=layout.tunnel.frameCenters[i],frame=new T.Group();frame.position.set(-2.78,2.55,z);frame.rotation.y=Math.PI/2;frame.userData.careerIndex=i;scene.add(frame);persistentGallery.add(frame);frame.name="career-frame-"+i;
  const rim=box(2.15,2.25,.13,0,0,0,M.gold.clone(),.075,frame);rim.material.emissive.set('#d7aa63');rim.material.emissiveIntensity=0;careerRims.push(rim);
  const edge=new T.Shape();edge.moveTo(-1.087,-1.137);edge.lineTo(1.087,-1.137);edge.lineTo(1.087,1.137);edge.lineTo(-1.087,1.137);edge.closePath();
  const hole=new T.Path();hole.moveTo(-1.075,-1.125);hole.lineTo(-1.075,1.125);hole.lineTo(1.075,1.125);hole.lineTo(1.075,-1.125);hole.closePath();edge.holes.push(hole);
  const outline=mesh(new T.ShapeGeometry(edge),new T.MeshBasicMaterial({color:'#f3d78f',transparent:true,opacity:0,depthWrite:false}),0,0,.085,frame);outline.castShadow=false;outline.receiveShadow=false;careerOutlines.push(outline);
  const map=tex(1000,1100,c=>{
    c.fillStyle='#f2eddf';c.fillRect(0,0,1000,1100);c.fillStyle='#665576';c.font='40px Arial';c.fillText(record.period,65,95);
    c.fillStyle='#342c43';c.font='bold 84px Arial';c.fillText(record.company,65,211);c.font='44px Arial';c.fillText(record.role,65,275);
    c.fillStyle='#675075';c.fillRect(65,325,85,7);c.fillStyle='#342c43';c.font='bold 64px Arial';record.lines.forEach((line,j)=>c.fillText(line,65,440+j*72));
    record.steps.forEach((s,j)=>{const y=620+j*115;c.fillStyle=j===2?'#d4b36b':'#ded5e5';c.beginPath();c.roundRect(65,y,870,82,16);c.fill();c.fillStyle='#342c43';c.font='43px Arial';c.fillText(s,100,y+53);if(j<2){c.fillStyle='#806b91';c.fillRect(490,y+85,6,24);}});
    c.fillStyle='#665576';c.font='34px Arial';c.fillText(record.note,65,1030);
  });
  const face=mesh(new T.PlaneGeometry(2.02,2.12),new T.MeshStandardMaterial({map,roughness:.95}),0,0,.075,frame);face.userData.careerIndex=i;careerMeshes.push(face);
  box(1.2,.065,.2,0,1.27,.09,M.deep,.02,frame);
  box(1.05,.025,.13,0,1.23,.1,guideMat,.01,frame);
  frame.traverse(o=>o.layers.set(1));
  const lamp=new T.SpotLight('#ffdab0',22,7,.8,.78,1.5);lamp.position.set(-1.85,3.97,z);lamp.target.position.set(-2.85,2.25,z);lamp.layers.set(1);scene.add(lamp,lamp.target);persistentGallery.add(lamp);persistentGallery.add(lamp.target);careerLights.push(lamp);
});
const dialog=document.querySelector('#career-dialog'),detail=document.querySelector('#career-detail');
const careerGallery=createCareerGallery(career);
function clearCareerHover(){careerHint.hidden=true;if(hoveredCareer!==null){hoveredCareer=null;canvas.style.cursor='';}}
function openCareer(i){
 careerWalk.cancel();
 selectedCareer=i;clearCareerHover();
 // Hold the view actually on screen, including when a frame is selected mid-scroll.
 progress=window.arenaDiagnostics?.progress??progress;
 scrollTo({top:progress*(document.querySelector('#rail').offsetHeight-innerHeight),behavior:'instant'});
 careerGallery.open(i);
}
dialog.addEventListener('close',()=>{selectedCareer=null;clearCareerHover();});
function updateCareerLighting(dt){
 const amount=reduce.checked?1:1-Math.exp(-dt*16);
 careerLights.forEach((lamp,i)=>{
  const selected=selectedCareer===i,hovered=selectedCareer===null&&hoveredCareer===i;
  lamp.intensity=T.MathUtils.lerp(lamp.intensity,selected?30:hovered?24:22,amount);
  careerRims[i].material.emissiveIntensity=T.MathUtils.lerp(careerRims[i].material.emissiveIntensity,selected ? .22 : hovered ? .18 : 0,amount);
  careerOutlines[i].material.opacity=T.MathUtils.lerp(careerOutlines[i].material.opacity,selected ? .9 : hovered ? .8 : 0,amount);
 });
}
document.querySelector('#close-career').addEventListener('click',()=>dialog.close());
document.querySelectorAll('[data-career]').forEach(b=>b.addEventListener('click',()=>openCareer(Number(b.dataset.career))));
const panelRay=new T.Raycaster();
panelRay.layers.enable(1);
function careerHit(e){
 if(dialog.open||document.body.classList.contains('reading-mode'))return null;
 panelRay.setFromCamera(new T.Vector2(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2),camera);
 const hit=panelRay.intersectObjects(scene.children,true).find(hit=>hit.object.visible&&hit.object.parent?.visible);
 const index=hit?.object.userData.careerIndex??hit?.object.parent?.userData.careerIndex;
 return hit&&Number.isInteger(index)&&hit.distance<12?index:null;
}
let careerPress=null,lastCareerHover=0;
canvas.addEventListener('pointerdown',e=>{careerPress={x:e.clientX,y:e.clientY,scroll:scrollY};});
canvas.addEventListener('click',e=>{
 if(careerPress&&(Math.hypot(e.clientX-careerPress.x,e.clientY-careerPress.y)>8||Math.abs(scrollY-careerPress.scroll)>6))return;
 const i=careerHit(e);if(i!==null){e.stopImmediatePropagation();openCareer(i);}
});
canvas.addEventListener('pointermove',e=>{
 if(e.pointerType!=='mouse'||!matchMedia('(hover: hover)').matches)return;
 if(dialog.open||(window.arenaDiagnostics?.progress??0)<.30||(window.arenaDiagnostics?.progress??0)>.54){clearCareerHover();return;}
 const now=performance.now();if(now-lastCareerHover<80)return;lastCareerHover=now;
 const i=careerHit(e);if(i!==hoveredCareer){hoveredCareer=i;canvas.style.cursor=i===null?'':'pointer';}
 careerHint.hidden=i===null;if(i!==null){careerHint.style.left=Math.min(innerWidth-190,e.clientX+18)+'px';careerHint.style.top=Math.min(innerHeight-52,e.clientY+20)+'px';}
});
canvas.addEventListener('pointerleave',clearCareerHover);addEventListener('scroll',clearCareerHover,{passive:true});
layrd.connect();
window.careerPanelScreens=()=>careerMeshes.map((face,index)=>{
 const v=face.getWorldPosition(new T.Vector3()).project(camera);
 const corners=[[-1.075,-1.125],[1.075,-1.125],[-1.075,1.125],[1.075,1.125]].map(([x,y])=>face.parent.localToWorld(new T.Vector3(x,y,.075)).project(camera));
 return {index,x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2,bounds:{left:Math.min(...corners.map(p=>(p.x+1)*innerWidth/2)),right:Math.max(...corners.map(p=>(p.x+1)*innerWidth/2)),top:Math.min(...corners.map(p=>(1-p.y)*innerHeight/2)),bottom:Math.max(...corners.map(p=>(1-p.y)*innerHeight/2))}};
});
// Markings and both goals use one uniform NBA-inspired coordinate system.
buildArenaCourt({scene,box,mesh,tex,M});
// Seating stays low at the outer edges, leaving broad circulation bands.
const seats=[],backs=[];
for(let row=0;row<3;row++){const y=.65+row*.48,z=-42-row*.7;box(20,.42,.76,4,y-.12,z,interiorCream,.12);for(let j=0;j<35;j++){const x=(j-17)*.77;if(x<-6.6)continue;seats.push([x,y+.13,z]);backs.push([x,y+.43,z-.18]);}}
for(const side of [-1,1])for(let row=0;row<2;row++){const x=side*(16+row*.7);box(.75,.45,15,x,.55+row*.5,-29,interiorCream,.1);for(let j=0;j<18;j++){seats.push([x,.87+row*.5,-35.3+j*.75]);backs.push([x+side*.17,1.17+row*.5,-35.3+j*.75,side]);}}
function batch(geo,material,positions){const im=new T.InstancedMesh(geo,material,positions.length),o=new T.Object3D();positions.forEach(([x,y,z,side],i)=>{o.position.set(x,y,z);o.rotation.set(0,side?Math.PI/2:0,0);o.updateMatrix();im.setMatrixAt(i,o.matrix);});im.castShadow=true;im.receiveShadow=true;scene.add(im);}
batch(new RoundedBoxGeometry(.55,.12,.48,3,.055),M.purple,seats);batch(new RoundedBoxGeometry(.53,.47,.14,3,.065),M.purple,backs);
// Six existing shadowless lights, with recessed ivory diffusers rather than gold glow.
const courtDiffuser=new T.MeshStandardMaterial({color:'#fff1d9',emissive:'#ffe6bd',emissiveIntensity:.45,roughness:.7}),arenaLights=[];
for(const x of [-8,8])for(const z of [-21,-30,-39]){
 box(3.2,.16,.72,x,10.24,z,M.deep,.06);
 const diffuser=box(3,.045,.55,x,10.14,z,courtDiffuser,.025);diffuser.castShadow=false;
 const lamp=new T.PointLight('#fff0d5',55,35,1.6);lamp.position.set(x,10,z);scene.add(lamp);arenaLights.push(lamp);
}

const projectSpace=buildProjectSpace({scene,box,mesh,sign,tex,M,interiorCream});
const film=createFilmArchive({camera,renderer,screen:projectSpace.mediaScreen,room:projectSpace.room,onExit:()=>{const b=document.querySelector('[data-stop="0.74"]');b.click();b.focus({preventScroll:true});}});
canvas.addEventListener('click',e=>{panelRay.setFromCamera(new T.Vector2(e.clientX/innerWidth*2-1,1-e.clientY/innerHeight*2),camera);const hit=panelRay.intersectObjects(scene.children,true)[0];if(hit)projectSpace.handleHit(hit);});
const hallObjects=scene.children.filter(o=>!beforeHall.has(o)&&!persistentGallery.has(o));let insideMode=null;function setSpatialView(p){const next=p>.23;if(next===insideMode)return;insideMode=next;hallObjects.forEach(o=>o.visible=next);shellMaterials.forEach(m=>{m.clippingPlanes=next?[shellCut]:[];m.needsUpdate=true;});}setSpatialView(0);window.galleryState=()=>careerMeshes.map((m,i)=>({visible:m.visible&&m.parent.visible,textureReady:!!m.material.map?.image,opacity:m.material.opacity,selected:selectedCareer===i,hovered:hoveredCareer===i,light:careerLights[i].intensity,emphasis:careerRims[i].material.emissiveIntensity}));
window.cardScreens=()=>projectSpace.cardMeshes.map(face=>{const v=face.getWorldPosition(new T.Vector3()).project(camera);return{x:(v.x+1)*innerWidth/2,y:(1-v.y)*innerHeight/2};});
// Contact shadow belongs to scene; candidate remains a separate 2.5D image.
const shadowTex=tex(128,128,c=>{const g=c.createRadialGradient(64,64,3,64,64,62);g.addColorStop(0,'rgba(36,22,44,.55)');g.addColorStop(1,'rgba(36,22,44,0)');c.fillStyle=g;c.fillRect(0,0,128,128);});
const sh=mesh(new T.PlaneGeometry(1.65,.85),new T.MeshBasicMaterial({map:shadowTex,transparent:true,depthWrite:false}),2.3,.285,12.4);sh.rotation.x=-Math.PI/2;sh.castShadow=false;
const weather=createWeather({scene,sun,hemisphere:scene.children.find(o=>o.isHemisphereLight&&o!==galleryAmbient),arenaLights,courtDiffuser});
const welcomeIntro=createWelcomeIntro();
let sung;
new GLTFLoader().load('sung-miniature-v1.glb',g=>{sung=g.scene;sung.scale.setScalar(.86);sung.position.set(2.3,.27,12.4);sung.rotation.y=-.18;sung.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});scene.add(sung);welcomeIntro.attach(sung);window.assetReady=true;document.querySelector('#status').textContent='3D Sung ready';},undefined,()=>{document.querySelector('#status').textContent='3D candidate could not load';});
// Continuous rail; welcome captions never own camera or scroll input.
window.leaveFilmRoom=()=>film.exit({returnToCourt:false});const stops=rail;window.spatialLayout=layout;window.cameraRail=rail;
const smooth=t=>t*t*(3-2*t);let progress=0,last=performance.now();const reduce=document.querySelector('#reduce');reduce.checked=matchMedia('(prefers-reduced-motion: reduce)').matches;
function pose(p){let a=stops.findIndex((s,i)=>i<stops.length-1&&p<=stops[i+1].s);if(a<0)a=stops.length-2;const b=a+1,u=(p-stops[a].s)/(stops[b].s-stops[a].s),t=smooth(Math.max(0,Math.min(1,u)));camera.position.fromArray(stops[a].p).lerp(new T.Vector3(...stops[b].p),t);if(stops[a].via){const v=new T.Vector3(...stops[a].via);camera.position.copy(t<.5?new T.Vector3(...stops[a].p).lerp(v,t*2):v.lerp(new T.Vector3(...stops[b].p),(t-.5)*2));}const target=new T.Vector3(...stops[a].t).lerp(new T.Vector3(...stops[b].t),t);camera.fov=T.MathUtils.lerp(stops[a].fov,stops[b].fov,t);if(innerWidth<650){if(a===0){const k=1-t;camera.position.x*=.65;camera.position.y+=21*k;camera.position.z+=76*k+4*t;}else if(a===1){camera.position.x*=.65;camera.position.z+=4*(1-t);}else{camera.fov+=10;}const weight=smooth(Math.max(0,1-Math.abs(p-.64)/.06));camera.position.lerp(new T.Vector3(0,6.4,-13.8),weight);target.lerp(new T.Vector3(0,2.3,-32),weight);camera.fov=T.MathUtils.lerp(camera.fov,132,weight);camera.fov=T.MathUtils.lerp(camera.fov,116,smooth(Math.max(0,1-Math.abs(p-.88)/.04)));camera.fov=T.MathUtils.lerp(camera.fov,116,smooth(Math.max(0,(p-.94)/.06)));}const galleryWeight=smooth(Math.min(1,Math.max(0,(p-.30)/.08),Math.max(0,(.55-p)/.04)));if(galleryWeight>0){const fitFov=Math.max(43,T.MathUtils.radToDeg(2*Math.atan(2.15/(2*4.18*camera.aspect*.78))));camera.fov=T.MathUtils.lerp(camera.fov,fitFov,galleryWeight);}camera.updateProjectionMatrix();camera.lookAt(target);}

window.checkEnclosure=()=>{const ray=new T.Raycaster(),leaks=[];let rays=0;scene.updateMatrixWorld(true);camera.updateMatrixWorld(true);for(let y=-.9;y<=.9;y+=.15)for(let x=-.9;x<=.9;x+=.15){ray.setFromCamera(new T.Vector2(x,y),camera);const hits=ray.intersectObjects(scene.children,true);rays++;if(!hits.length||hits[0].object.name==='outside-ground')leaks.push([x,y]);}return {rays,leaks};};
let readingFrameCached=false;
function resize(){renderer.setSize(innerWidth,innerHeight);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();readingFrameCached=false;}resize();addEventListener('resize',resize);
document.querySelectorAll('[data-stop]').forEach(b=>b.addEventListener('click',()=>{const p=Number(b.dataset.stop);progress=p;scrollTo({top:p*(document.querySelector('#rail').offsetHeight-innerHeight),behavior:'instant'});}));
const text=rail.map(r=>[r.title,r.headline,r.hint]);
const railElement=document.querySelector('#rail'),careerActions=document.querySelector('#career-actions'),projectControls=document.querySelector('#project-controls'),progressBar=document.querySelector('.progress i');
const careerWalk=createCareerWalk({stops,railElement,isReduced:()=>reduce.checked});
const stageLabels=['stage','headline','hint'].map(id=>document.getElementById(id)),stopButtons=[...document.querySelectorAll('[data-stop]')];
let lastUiStop=-1,lastUiGoal=-1;
function tick(now){
 requestAnimationFrame(tick);const dt=Math.min(.05,(now-last)/1000);last=now;
 const railEnd=railElement.offsetHeight-innerHeight,goal=welcomeIntro.arrivalTarget??Math.max(0,Math.min(1,scrollY/railEnd));
 if(!dialog.open&&!projectSpace.dialog.open&&!welcomeIntro.holdingCamera){if(scrollY>=railEnd)progress=1;else progress+=(goal-progress)*(1-Math.exp(-dt*8));}
 const reading=document.body.classList.contains('reading-mode');
 welcomeIntro.update(progress,goal,dt,reduce.checked);
 const nearest=stops.reduce((a,b)=>Math.abs(a.s-goal)<Math.abs(b.s-goal)?a:b).s,p=reduce.checked?nearest:progress;
 // Navigation's editorial visibility owns the handoff, not the earlier rail endpoint.
 // Reconcile Film UI before sleeping; keep rendering while editorial content only
 // partially covers the arena so wheel re-entry never exposes stale controls/frames.
 film.update(p,{allowEntry:!reading});
 if(reading&&readingFrameCached&&Math.abs((window.filmState?.light??15)-15)<.05){if(window.arenaDiagnostics){window.arenaDiagnostics.progress=p;window.arenaDiagnostics.rendering=false;}return;}
 setSpatialView(p);pose(p);camera.clearViewOffset();applyHero(camera,p);
 if(p>.95)film.applyCamera(smooth(Math.min(1,(p-.95)/.05)));
 projectSpace.filmEntrance.update(p,reduce.checked);
 welcomeIntro.positionBubble(camera);
 layrd.update(p);
 const nearestIndex=stops.reduce((best,s,j)=>Math.abs(s.s-p)<Math.abs(stops[best].s-p)?j:best,0);
 const isCareer=Number.isInteger(stops[nearestIndex].careerIndex),settledCareer=isCareer&&Math.abs(p-stops[nearestIndex].s)<.002&&Math.abs(goal-stops[nearestIndex].s)<.003;
 const i=isCareer&&!settledCareer?-2:nearestIndex;
 document.body.classList.toggle('career-view',p>.31&&p<.535);
 document.body.classList.toggle('tunnel',p>.34);
 if(i!==lastUiStop){const stop=i>=0?stops[i]:null,careerIndex=stop?.careerIndex;careerActions.hidden=!Number.isInteger(careerIndex);careerActions.querySelectorAll('[data-career]').forEach(b=>{b.hidden=Number(b.dataset.career)!==careerIndex;b.textContent='Explore this experience';b.setAttribute('aria-label','Explore '+career[Number(b.dataset.career)].role+' at '+career[Number(b.dataset.career)].company);});projectControls.hidden=stop?.s!==.83;stageLabels.forEach((node,j)=>node.textContent=(i>=0?text[i]:['Career Walk','','Scroll to explore.'])[j]);stopButtons.forEach(b=>b.setAttribute('aria-current',String(Number(b.dataset.stop)===stop?.s)));lastUiStop=i;}
 if(Math.abs(goal-lastUiGoal)>.00001){progressBar.style.width=goal*100+'%';lastUiGoal=goal;}
 if(window.inspectionCamera){camera.position.fromArray(window.inspectionCamera.p);camera.lookAt(new T.Vector3(...window.inspectionCamera.t));camera.fov=65;camera.updateProjectionMatrix();}
 weather.update(p,dt);updateCareerLighting(dt);renderer.render(scene,camera);readingFrameCached=reading;
 window.arenaDiagnostics={progress:p,camera:camera.position.toArray(),filmDoorOpen:projectSpace.filmEntrance.openFraction,drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,contextLost:renderer.getContext().isContextLost(),rendering:!reading};
}
async function prepareScene(){const start=performance.now();const textures=new Set();scene.traverse(o=>{for(const m of (Array.isArray(o.material)?o.material:[o.material]))if(m)for(const k of ['map','emissiveMap','alphaMap'])if(m[k])textures.add(m[k]);});textures.forEach(t=>renderer.initTexture(t));const target=new T.WebGLRenderTarget(64,64);renderer.setRenderTarget(target);for(const p of [0,.26]){setSpatialView(p);pose(p);await renderer.compileAsync(scene,camera);renderer.render(scene,camera);}renderer.setRenderTarget(null);target.dispose();setSpatialView(0);pose(0);window.preparation={milliseconds:performance.now()-start,textures:textures.size};window.sceneReady=true;last=performance.now();requestAnimationFrame(tick);}prepareScene().catch(e=>{document.querySelector('#failure').hidden=false;console.error(e);});
