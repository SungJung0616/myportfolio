import * as T from './three.module.js';
import {project} from './project-data.js';
import {createPlaybookStory} from './playbook-story.js';
export function buildProjectSpace({scene,box,mesh,sign,tex,M,interiorCream}){
 const bench=new T.Group();bench.position.set(14,0,-29);bench.rotation.y=-Math.PI/2;scene.add(bench);
 box(6.1,.18,.9,0,.85,0,M.purple,.12,bench);box(6.1,.8,.16,0,1.26,-.4,M.purple,.1,bench);
 for(const x of [-2.5,0,2.5])box(.16,.52,.65,x,.51,0,M.deep,.04,bench);
 for(let i=0;i<5;i++)box(.94,.11,.75,-2.25+i*1.12,.99,0,interiorCream,.09,bench);
 const board=new T.Group();board.position.set(14,0,-36);board.rotation.y=-Math.PI/2;scene.add(board);
 box(6.6,4.15,.19,0,3.1,0,M.purple,.1,board);
 const corkMap=tex(1600,1000,c=>{c.fillStyle='#f5eedf';c.fillRect(0,0,1600,1000);c.textAlign='center';c.fillStyle='#513466';c.font='bold 68px Arial';c.fillText('THE PLAYBOOK',800,100);c.font='bold 42px Arial';c.fillText('Order preparation automation',800,182);c.font='26px Arial';c.fillText('Same input. Same upload target. A different preparation process.',800,235);for(let i=0;i<2;i++){const x=70+i*780;c.fillStyle=i?'#e8ddef':'#e8dfce';c.fillRect(x,285,680,565);c.fillStyle='#513466';c.font='bold 40px Arial';c.fillText(i?'AFTER':'BEFORE',x+340,350);const labels=i?['Order export','Python: map / normalize / validate','Prepared data + flagged exceptions','Human review + upload']:['Order export','Repeated manual preparation','Prepared upload data','Human review + upload'];labels.forEach((s,j)=>{c.fillStyle=j===3?'#e8ce8e':i&&j>0?'#d3bfdf':'#faf6ee';c.fillRect(x+30,390+j*104,620,80);c.fillStyle='#40314b';c.font='28px Arial';c.fillText(s,x+340,440+j*104,595);});}c.fillStyle='#513466';c.font='28px Arial';c.fillText('Click to explore decisions and evidence',800,920);c.font='22px Arial';c.fillText('Explanatory diagram — not a live processing demo',800,965);});
 const boardFace=mesh(new T.PlaneGeometry(6.35,3.9),new T.MeshBasicMaterial({map:corkMap}),0,3.1,.102,board);
 for(const x of [-2.5,2.5]){box(.14,1.55,.14,x,.84,0,M.deep,.03,board);box(.8,.13,.85,x,.35,0,M.deep,.05,board);}
 const cardMeshes=[];
 box(11.4,4.35,.28,0,7.8,-46.6,M.deep,.18);
 const scoreMap=tex(1600,600,c=>{c.fillStyle='#35273f';c.fillRect(0,0,1600,600);c.textAlign='center';c.fillStyle='#ecd092';c.font='bold 52px Arial';c.fillText('ORDER FILE PREPARATION TIME',800,100);c.font='bold 140px Arial';c.fillText('~3h → ~30m',800,290);c.fillStyle='#fff5e3';c.font='32px Arial';c.fillText('Coupang order automation · GPS Logix',800,370);c.fillText('Repetitive preparation automated. Human review retained.',800,430);c.font='26px Arial';c.fillText('Reported approximate daily result · Click for evidence and scope',800,525);});
 const score=mesh(new T.PlaneGeometry(10.9,3.9),new T.MeshBasicMaterial({map:scoreMap}),0,7.8,-46.43);
 // A 12-seat screening room with a central aisle, not a media player.
 const room=new T.Group();room.position.z=-10.2;scene.add(room);const wall=M.purple.clone();wall.color.set('#65516e');const dark=M.deep.clone();dark.color.set('#30253d');
 box(9.6,.16,9.6,-12,.25,-41.6,interiorCream,.05,room);
 for(const x of [-16.8,-7.2])box(.22,5.8,9.6,x,3.2,-41.6,wall,.07,room);
 box(9.6,5.8,.22,-12,3.2,-46.4,wall,.07,room);box(9.8,.24,9.8,-12,6.2,-41.6,interiorCream,.06,room);
 for(const x of [-15,-9])box(3.6,5.8,.22,x,3.2,-36.8,wall,.06,room);
 box(2.4,1.75,.22,-12,5.225,-36.8,wall,.04,room);
 for(const x of [-13.25,-10.75])box(.13,4.1,.3,x,2.3,-36.64,M.gold,.025,room);
 box(2.65,.13,.3,-12,4.4,-36.64,M.gold,.025,room);
 sign('FILM ROOM','SCREENING SPACE',3.8,.65,-12,5.1,-36.40,'#35273f','#ecd092',room);
 box(.10,3.9,2,-10.78,2.25,-37.85,dark,.05,room);
 box(7.6,3.5,.15,-12,3.7,-46.2,dark,.10,room);
 const screenMap=tex(1440,620,c=>{c.fillStyle='#3e3449';c.fillRect(0,0,1440,620);c.fillStyle='#cbbbd7';c.textAlign='center';c.font='600 76px Arial';c.fillText('FILM ROOM',720,290);c.font='26px Arial';c.fillText('12 SEATS · SPATIAL PREVIEW',720,360);});
 const mediaScreen=mesh(new T.PlaneGeometry(7.2,3.1),new T.MeshStandardMaterial({map:screenMap,roughness:1}),-12,3.7,-46.10,room);
 for(let row=0;row<3;row++){const z=-39.2-row*2.1,y=.38+(2-row)*.15;
  for(const x of [-15.1,-13.65,-10.35,-8.9]){box(1.15,.26,1.1,x,y+.4,z,M.purple,.14,room);box(1.15,1.10,.25,x,y+.92,z+.43,M.purple,.15,room);for(const dx of [-.55,.55])box(.12,.42,.85,x+dx,y+.72,z,M.deep,.04,room);box(.6,.35,.65,x,y+.12,z,dark,.05,room);}
 }
 const aisle=new T.MeshStandardMaterial({color:'#b9a380',emissive:'#b89c68',emissiveIntensity:.12,roughness:1});
 for(const x of [-12.65,-11.35])box(.04,.025,7.6,x,.36,-41.1,aisle,.006,room);
 for(const z of [-38.4,-42.5]){box(4,.1,.38,-12,5.95,z,interiorCream,.03,room);const lamp=new T.PointLight('#ffe1b7',15,10,1.5);lamp.position.set(-12,5.6,z);room.add(lamp);}
 window.cinemaMeta={front:-47,back:-56.6,seats:12,width:9.6,depth:9.6,ceiling:6.08,mediaConnected:true};
 const {dialog,open}=createPlaybookStory();
 return {mediaScreen,boardFace,cardMeshes,open,handleHit:hit=>{if(hit.object===boardFace)open(0);else if(hit.object===score)open(2);},dialog,room};
}
