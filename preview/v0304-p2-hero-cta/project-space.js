import * as T from './three.module.js';
import {createInteractivePlaybook} from './interactive-playbook.js';
import {createFilmEntrance} from './film-entrance.js';
export function buildProjectSpace({scene,box,mesh,sign,tex,M,interiorCream}){
 const bench=new T.Group();bench.position.set(14,0,-29);bench.rotation.y=-Math.PI/2;scene.add(bench);
 box(6.1,.18,.9,0,.85,0,M.purple,.12,bench);box(6.1,.8,.16,0,1.26,-.4,M.purple,.1,bench);
 for(const x of [-2.5,0,2.5])box(.16,.52,.65,x,.51,0,M.deep,.04,bench);
 for(let i=0;i<5;i++)box(.94,.11,.75,-2.25+i*1.12,.99,0,interiorCream,.09,bench);
 const board=new T.Group();board.position.set(14,0,-36);board.rotation.y=-Math.PI/2;scene.add(board);
 // A physical coaching surface: a quiet court, role magnets and one illustrative pass.
 box(6.8,4.3,.32,0,3.1,-.02,M.deep,.14,board);
 box(6.58,4.08,.10,0,3.1,.115,M.gold,.06,board);
 const corkMap=tex(1600,1000,c=>{
  c.fillStyle='#f5eedf';c.fillRect(0,0,1600,1000);
  c.fillStyle='#40304f';c.fillRect(0,0,1600,154);
  c.textAlign='center';c.fillStyle='#f8f1e2';c.font='bold 82px Arial';c.fillText('THE PLAYBOOK',800,108);
  c.fillStyle='#e8dfcd';c.fillRect(206,200,1188,630);
  c.strokeStyle='#a395b0';c.lineWidth=5;c.strokeRect(226,220,1148,610);
  const line=(x1,y1,x2,y2)=>{c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();};
  line(800,220,800,830);c.beginPath();c.arc(800,525,73.3,0,Math.PI*2);c.stroke();
  for(const side of [-1,1]){
   c.save();c.translate(side<0?226:1374,525);c.scale(-side,1);
   c.strokeRect(0,-97.6,232,195.2);c.beginPath();c.arc(232,0,73.3,-Math.PI/2,Math.PI/2);c.stroke();
   c.setLineDash([10,12]);c.beginPath();c.arc(232,0,73.3,Math.PI/2,Math.PI*1.5);c.stroke();c.setLineDash([]);
   line(48.85,-36.65,48.85,36.65);c.beginPath();c.arc(64.15,0,9.15,0,Math.PI*2);c.stroke();
   const corner=Math.sqrt(290**2-268.7**2),arcAngle=Math.asin(268.7/290);
   line(0,-268.7,64.15+corner,-268.7);line(0,268.7,64.15+corner,268.7);c.beginPath();c.arc(64.15,0,290,-arcAngle,arcAngle);c.stroke();
   c.restore();
  }
  const pass=(points)=>{
   c.strokeStyle='#684886';c.fillStyle='#684886';c.lineWidth=8;c.lineCap='round';c.lineJoin='round';c.setLineDash([17,17]);
   c.beginPath();c.moveTo(...points[0]);points.slice(1).forEach(p=>c.lineTo(...p));c.stroke();c.setLineDash([]);
   const end=points.at(-1),prev=points.at(-2),a=Math.atan2(end[1]-prev[1],end[0]-prev[0]);
   c.save();c.translate(...end);c.rotate(a);c.beginPath();c.moveTo(0,0);c.lineTo(-24,-13);c.lineTo(-24,13);c.closePath();c.fill();c.restore();
  };
  pass([[455,602],[610,602],[732,444]]);pass([[852,408],[1050,408],[1155,554]]);
  const roles=[{x:390,y:602,n:'1',label:'Input'},{x:790,y:408,n:'2',label:'System'},{x:1208,y:602,n:'3',label:'Review'}];
  roles.forEach(({x,y,n,label},i)=>{
   c.fillStyle='#34243f20';c.beginPath();c.arc(x+4,y+7,52,0,Math.PI*2);c.fill();
   c.fillStyle=i===2?'#d7b775':'#5b3e73';c.beginPath();c.arc(x,y,52,0,Math.PI*2);c.fill();
   c.strokeStyle='#f8f2e7';c.lineWidth=5;c.stroke();c.fillStyle=i===2?'#34243f':'#fff7e9';c.font='bold 52px Arial';c.fillText(n,x,y+18);
   c.fillStyle='#f5eedf';c.fillRect(x-105,y+67,210,58);c.fillStyle='#40304f';c.font='bold 39px Arial';c.fillText(label,x,y+109);
  });
  c.fillStyle='#c38d4f';c.beginPath();c.arc(497,602,18,0,Math.PI*2);c.fill();c.strokeStyle='#5a3e32';c.lineWidth=2;c.stroke();
  c.beginPath();c.arc(487,602,18,-1.1,1.1);c.stroke();line(479,602,515,602);
  c.fillStyle='#40304f';c.font='bold 43px Arial';c.fillText('Explore the plays',800,866);
  c.fillStyle='#51415e';c.font='28px Arial';c.fillText('Illustrative workflow · choose a case to see the real process',800,931);
 });
 const boardFace=mesh(new T.PlaneGeometry(6.35,3.9),new T.MeshStandardMaterial({map:corkMap,roughness:.86,emissive:'#ffffff',emissiveMap:corkMap,emissiveIntensity:.16}),0,3.1,.171,board);
 box(6.52,.12,.26,0,1.04,.15,M.deep,.035,board);
 for(const x of [-2.5,2.5]){box(.17,1.55,.17,x,.84,-.03,M.deep,.035,board);box(.8,.13,.85,x,.35,0,M.deep,.05,board);}
 box(5.12,.12,.12,0,.64,-.03,M.deep,.03,board);
 const cardMeshes=[];
 box(11.4,4.35,.42,0,7.8,-46.67,M.deep,.18);
 box(11.12,4.08,.08,0,7.8,-46.42,M.gold,.06);
 const scoreMap=tex(1600,600,c=>{
  c.fillStyle='#30223f';c.fillRect(0,0,1600,600);c.textAlign='center';
  c.fillStyle='#21192c';c.fillRect(110,139,440,282);c.fillRect(1050,139,440,282);c.fillRect(605,161,390,174);
  c.fillStyle='#e2c487';c.font='bold 54px Arial';c.fillText('HOME',330,104);c.fillText('AWAY',1270,104);
  c.fillStyle='#cfc0d8';c.font='bold 30px Arial';c.fillText('CLOCK',800,125);
  // Seven-segment figures keep the scores aligned without an external display font.
  const segments={0:'abcdef',1:'bc',2:'abged',3:'abgcd',4:'fgbc',5:'afgcd',6:'afgecd',7:'abc',8:'abcdefg',9:'abfgcd'};
  function bar(x,y,w,h,active){
   const b=Math.min(w,h)*.45;c.fillStyle=active?'#fff2d6':'#2d2237';
   c.beginPath();c.moveTo(x+b,y);c.lineTo(x+w-b,y);c.lineTo(x+w,y+b);c.lineTo(x+w,y+h-b);c.lineTo(x+w-b,y+h);c.lineTo(x+b,y+h);c.lineTo(x,y+h-b);c.lineTo(x,y+b);c.closePath();c.fill();
  }
  function digital(value,cx,y,w,h,t){
   const gap=w*.18,colon=w*.25,total=[...value].reduce((sum,ch)=>sum+(ch===':'?colon:w),0)+gap*(value.length-1);let x=cx-total/2;
   for(const ch of value){
    if(ch===':'){c.fillStyle='#fff2d6';c.fillRect(x,y+h*.3,colon,colon);c.fillRect(x,y+h*.66,colon,colon);x+=colon+gap;continue;}
    const active=segments[ch],half=h/2,vertical=half-t*1.5;
    const defs={a:[x+t,y,w-2*t,t],b:[x+w-t,y+t,t,vertical],c:[x+w-t,y+half+t/2,t,vertical],d:[x+t,y+h-t,w-2*t,t],e:[x,y+half+t/2,t,vertical],f:[x,y+t,t,vertical],g:[x+t,y+half-t/2,w-2*t,t]};
    Object.entries(defs).forEach(([id,args])=>bar(...args,active.includes(id)));x+=w+gap;
   }
  }
  digital('24',330,170,134,218,19);digital('08',1270,170,134,218,19);digital('01:26',800,190,63,116,10);
  c.fillStyle='#e2c487';c.font='bold 37px Arial';c.fillText('QTR  2',800,397);
  c.strokeStyle='#725c7f';c.lineWidth=2;c.beginPath();c.moveTo(100,456);c.lineTo(1500,456);c.stroke();
  c.fillStyle='#e0d6e5';c.font='32px Arial';c.fillText('01.26.2020',800,516);
  c.fillStyle='#b8a5c6';c.font='21px Arial';c.fillText('ILLUSTRATIVE GAME · A QUIET TRIBUTE',800,558);
 });
 // An unlit display retains deep purple blacks under the bright court lighting.
 mesh(new T.PlaneGeometry(10.9,3.9),new T.MeshBasicMaterial({map:scoreMap,toneMapped:false}),0,7.8,-46.37);
 // A 12-seat screening room with a central aisle, not a media player.
 const room=new T.Group();room.position.z=-10.2;scene.add(room);const wall=M.purple.clone();wall.color.set('#65516e');const dark=M.deep.clone();dark.color.set('#30253d');
 box(9.6,.16,9.6,-12,.25,-41.6,interiorCream,.05,room);
 for(const x of [-16.8,-7.2])box(.22,5.8,9.6,x,3.2,-41.6,wall,.07,room);
 box(9.6,5.8,.22,-12,3.2,-46.4,wall,.07,room);box(9.8,.24,9.8,-12,6.2,-41.6,interiorCream,.06,room);
 for(const x of [-15,-9])box(3.6,5.8,.22,x,3.2,-36.8,wall,.06,room);
 box(2.4,1.75,.22,-12,5.225,-36.8,wall,.04,room);
 const filmEntrance=createFilmEntrance(room);
 // A small architectural plaque shares the glass doors' champagne metal trim.
 const plaqueMetal=new T.MeshStandardMaterial({color:'#c4b294',roughness:.42,metalness:.4});
 const plaqueBack=new T.MeshStandardMaterial({color:'#30243e',roughness:.86});
 box(3.1,.82,.11,-12,5.02,-36.49,plaqueMetal,.065,room);
 box(3.045,.765,.055,-12,5.02,-36.407,plaqueBack,.055,room);
 const plaqueMap=tex(1536,384,c=>{
  c.fillStyle='#30243e';c.fillRect(0,0,1536,384);c.textAlign='center';
  c.fillStyle='#f5f0e5';c.font='156px Georgia, "Times New Roman", serif';c.fillText('The Film Lab',768,190);
  c.fillStyle='#bca682';c.fillRect(680,230,176,3);
  c.font='600 29px "Segoe UI", Arial, sans-serif';
  const label='STUDY THE PLAY',tracking=6,width=[...label].reduce((sum,ch)=>sum+c.measureText(ch).width,0)+(label.length-1)*tracking;
  let x=(1536-width)/2;c.textAlign='left';
  for(const ch of label){c.fillText(ch,x,300);x+=c.measureText(ch).width+tracking;}
 });
 const plaqueFace=mesh(new T.PlaneGeometry(2.96,.74),new T.MeshBasicMaterial({map:plaqueMap,toneMapped:false}),-12,5.02,-36.373,room);plaqueFace.name='film-lab-entrance-plaque';
 box(7.6,3.5,.15,-12,3.7,-46.2,dark,.10,room);
 const screenMap=tex(1440,620,c=>{c.fillStyle='#3e3449';c.fillRect(0,0,1440,620);c.fillStyle='#cbbbd7';c.textAlign='center';c.font='600 76px Arial';c.fillText('THE FILM LAB',720,290);c.font='26px Arial';c.fillText('Study the play. See what I’ve built.',720,360);});
 const mediaScreen=mesh(new T.PlaneGeometry(7.2,3.1),new T.MeshStandardMaterial({map:screenMap,roughness:1}),-12,3.7,-46.10,room);
 for(let row=0;row<3;row++){const z=-39.2-row*2.1,y=.38+(2-row)*.15;
  for(const x of [-15.1,-13.65,-10.35,-8.9]){box(1.15,.26,1.1,x,y+.4,z,M.purple,.14,room);box(1.15,1.10,.25,x,y+.92,z+.43,M.purple,.15,room);for(const dx of [-.55,.55])box(.12,.42,.85,x+dx,y+.72,z,M.deep,.04,room);box(.6,.35,.65,x,y+.12,z,dark,.05,room);}
 }
 const aisle=new T.MeshStandardMaterial({color:'#b9a380',emissive:'#b89c68',emissiveIntensity:.12,roughness:1});
 for(const x of [-12.65,-11.35])box(.04,.025,7.6,x,.36,-41.1,aisle,.006,room);
 for(const z of [-38.4,-42.5]){box(4,.1,.38,-12,5.95,z,interiorCream,.03,room);const lamp=new T.PointLight('#ffe1b7',15,10,1.5);lamp.position.set(-12,5.6,z);room.add(lamp);}
 window.cinemaMeta={front:-47,back:-56.6,seats:12,width:9.6,depth:9.6,ceiling:6.08,mediaConnected:true};
 const interactive=createInteractivePlaybook();
 return {mediaScreen,boardFace,cardMeshes,open:interactive.open,handleHit:hit=>{if(hit.object===boardFace)interactive.open();},dialog:interactive.dialog,room,filmEntrance};
}
