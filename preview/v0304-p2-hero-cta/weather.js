import {createExteriorLighting} from './exterior-lighting.js?v=fix13a-environment-1';
import * as T from './three.module.js';

const endpoint='https://api.open-meteo.com/v1/forecast?latitude=33.8883&longitude=-118.309&current=temperature_2m,is_day,precipitation,weather_code,cloud_cover&timezone=America%2FLos_Angeles&timeformat=unixtime';
const timeZone='America/Los_Angeles';
// Approximate Gardena clock boundaries, not astronomical sunrise/sunset times.
// Palette, natural light, fixture strength and shadow softness live together.
export const environmentPhases={
 sunrise:{start:5.5,label:'Sunrise',sky:'#d6bec9',fog:'#efd1bf',sunColor:'#ffd6b8',sun:1.8,position:[-32,13,28],hemiSky:'#efdae1',hemiGround:'#b5a4b0',hemi:1.35,exterior:.18,arena:1.05,shadow:2.2},
 daytime:{start:8,label:'Daytime',sky:'#cbdfea',fog:'#dce6e6',sunColor:'#fff0d9',sun:3.4,position:[-20,35,26],hemiSky:'#e7f3ff',hemiGround:'#baa7bc',hemi:1.85,exterior:0,arena:1,shadow:1.5},
 'golden-hour':{start:16.5,label:'Golden Hour',sky:'#d5b58e',fog:'#e9c393',sunColor:'#ffc27e',sun:2.7,position:[30,12,22],hemiSky:'#eed4b8',hemiGround:'#a692ac',hemi:1.3,exterior:.12,arena:1.05,shadow:2.5},
 'blue-hour':{start:18,label:'Blue Hour',sky:'#536b91',fog:'#8c91b0',sunColor:'#bdc9ee',sun:.45,position:[32,8,20],hemiSky:'#a4b9e3',hemiGround:'#746786',hemi:.98,exterior:.62,arena:1.12,shadow:2.5},
 night:{start:19.5,label:'Night',sky:'#111d35',fog:'#263651',sunColor:'#b8c9ed',sun:.14,position:[-20,28,26],hemiSky:'#9db1d4',hemiGround:'#8c7c98',hemi:.92,exterior:1,arena:1.18,shadow:2.5},
};
const phaseIds=Object.keys(environmentPhases);
export function phaseForHour(hour){
 let phase='night';
 for(const id of phaseIds)if(hour>=environmentPhases[id].start)phase=id;
 return phase;
}
const colorKeys=['sky','fog','sunColor','hemiSky','hemiGround'];
const numberKeys=['sun','hemi','exterior','arena','shadow'];
const smooth=t=>t*t*(3-2*t);

export function createWeather({scene,sun,hemisphere,arenaLights=[],courtDiffuser}){
 const exteriorLights=createExteriorLighting(scene);
 const arenaBase=arenaLights.map(light=>light.intensity);
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const reduceControl=document.getElementById('reduce');
 let clockFormatter;
 try{clockFormatter=new Intl.DateTimeFormat('en-GB',{timeZone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'});}catch{/* Browser-local fallback below. */}
 let data=null,mode='live',status='loading',updated=0,phase='night',clockSource=timeZone;
 const conditions={night:false,rain:false,cloud:false,manual:false};
 const diagnostics=window.weatherState={};
 const environmentState=window.environmentState={phase,clockSource,preview:false,transitioning:false};
 // Localhost + explicit query opt-in only. Alt+1…5 previews phases; Alt+0 resumes live.
 const devPreview=['localhost','127.0.0.1','[::1]'].includes(location.hostname)&&new URLSearchParams(location.search).has('environmentPreview');
 const requestedPhase=devPreview?new URLSearchParams(location.search).get('environmentPreview'):null;
 let previewPhase=phaseIds.includes(requestedPhase)?requestedPhase:null;
 const targets={},from={},current={};
 for(const key of colorKeys){targets[key]=new T.Color();from[key]=new T.Color();current[key]=new T.Color();}
 for(const state of [targets,from,current])state.position=new T.Vector3();
 const cloudSky=new T.Color('#a4b1c1');
 let initialized=false,transitionElapsed=0,transitionDuration=2.4,targetKey='';

 const ui=document.createElement('details');ui.id='weather-review';ui.innerHTML='<summary>Weather preview</summary><label>Exterior conditions <select aria-label="Preview weather"><option value="live">Live</option><option value="clear">Preview · Clear day</option><option value="cloudy">Preview · Cloudy day</option><option value="rain">Preview · Rain</option><option value="night">Preview · Night</option></select></label><p id="weather-note">Loading weather…</p><button id="weather-retry">Retry</button><a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Weather data by Open-Meteo</a>';document.body.append(ui);
 ui.querySelector('select').onchange=e=>{mode=e.target.value;refresh();};ui.querySelector('button').onclick=load;
 // Existing weather effects are retained; FIX 13A adds no cloud/rain system.
 const clouds=new T.Group();scene.add(clouds);const cm=new T.MeshStandardMaterial({color:'#dce2e9',roughness:1,transparent:true,opacity:.75,depthWrite:false});for(let i=0;i<7;i++){const group=new T.Group();group.position.set(-40+i*14,12+(i%2)*2,-30-(i%3)*5);for(let j=0;j<3;j++){const m=new T.Mesh(new T.SphereGeometry(1,16,10),cm);m.scale.set(5+j,1.4,2.5);m.position.x=(j-1)*5;group.add(m);}clouds.add(group);}
 const n=280,positions=new Float32Array(n*6);for(let i=0;i<n;i++){const k=i*6,x=(Math.random()-.5)*90,y=8+Math.random()*34,z=14+Math.random()*40;positions.set([x,y,z,x-.1,y-.65,z],k);}const geo=new T.BufferGeometry();geo.setAttribute('position',new T.BufferAttribute(positions,3));const rain=new T.LineSegments(geo,new T.LineBasicMaterial({color:'#c3d6e3',transparent:true,opacity:.4,depthWrite:false}));scene.add(rain);

 function effectiveHour(){
  const now=new Date();
  if(clockFormatter){try{const [hour,minute]=clockFormatter.format(now).split(':').map(Number);if(Number.isFinite(hour)&&Number.isFinite(minute)){clockSource=timeZone;return hour+minute/60;}}catch{/* Use the visitor's local clock. */}}
  clockSource='browser-local';return now.getHours()+now.getMinutes()/60;
 }
 function refresh(){
  const hour=effectiveHour();
  phase=previewPhase||(mode==='live'?phaseForHour(hour):mode==='night'?'night':'daytime');
  conditions.manual=mode!=='live';
  conditions.night=conditions.manual?mode==='night':data?data.is_day===0:hour<6||hour>=18;
  conditions.rain=conditions.manual?mode==='rain':!!data&&(data.precipitation>0||[51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(data.weather_code));
  conditions.cloud=conditions.manual?mode==='cloudy'||mode==='rain':!!data&&(data.cloud_cover>=45||[2,3,45,48].includes(data.weather_code));
  // A phase preview isolates its lighting; real weather labels are never fabricated.
  const clouded=!previewPhase&&conditions.cloud;
  const key=phase+':'+clouded;
  if(key!==targetKey){
   targetKey=key;const config=environmentPhases[phase];
   for(const name of colorKeys)targets[name].set(config[name]);
   for(const name of numberKeys)targets[name]=config[name];
   targets.position.fromArray(config.position);
   if(clouded){targets.sky.lerp(cloudSky,.3);targets.fog.lerp(cloudSky,.3);targets.sun*=.55;}
   if(!initialized){
    for(const name of colorKeys)current[name].copy(targets[name]);
    for(const name of numberKeys)current[name]=targets[name];
    current.position.copy(targets.position);
   }
   for(const name of colorKeys)from[name].copy(current[name]);
   for(const name of numberKeys)from[name]=initialized?current[name]:targets[name];
   from.position.copy(initialized?current.position:targets.position);
   transitionElapsed=0;transitionDuration=initialized&&!reducedMotion.matches&&!reduceControl?.checked?2.4:0;
   environmentState.transitioning=transitionDuration>0;
   initialized=true;
  }
  environmentState.phase=phase;environmentState.clockSource=clockSource;environmentState.preview=!!previewPhase;
  if(devPreview){
   ui.dataset.environmentPhase=phase;
   console.info('[environment-preview]',JSON.stringify({phase,clockSource,override:previewPhase,transitionSeconds:transitionDuration}));
  }
  label();
 }
 function label(){
  const el=document.querySelector('.weather');if(!el)return;let description='Clear';
  if(data){if([71,73,75,77,85,86].includes(data.weather_code))description='Snow';else if([45,48].includes(data.weather_code))description='Fog';else if(conditions.rain)description='Rain';else if(conditions.cloud)description='Cloudy';}
  el.textContent=mode!=='live'?' · Preview weather · '+({clear:'Clear day',cloudy:'Cloudy day',rain:'Rain',night:'Night'})[mode]:data?' · '+description+' '+Math.round(data.temperature_2m)+'°C · '+(conditions.night?'Night':'Day'):' · Weather unavailable · —';
  el.title=data?'Open-Meteo current estimate · '+new Date(data.time*1000).toLocaleString('en-US',{timeZone}):'Weather unavailable. Environment uses approximate clock phases, not astronomical sunrise/sunset.';
  ui.querySelector('#weather-note').textContent=(mode!=='live'?'Preview effect — not live weather. ':'')+(data?'Open-Meteo · Gardena · Updated every 15 minutes':status==='loading'?'Connecting to weather…':'Weather unavailable. Using approximate clock-based lighting.');
 }
 async function load(){status='loading';label();const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),8000);try{const response=await fetch(endpoint,{signal:abort.signal,credentials:'omit',cache:'no-store'});if(!response.ok)throw Error('http');const json=await response.json(),d=json.current;if(!d||!Number.isFinite(d.temperature_2m)||!Number.isFinite(d.weather_code)||!Number.isFinite(d.cloud_cover)||!Number.isFinite(d.precipitation)||![0,1].includes(d.is_day)||!Number.isFinite(d.time)||Math.abs(Date.now()/1000-d.time)>7200)throw Error('invalid or stale');data=d;updated=Date.now();status='connected';}catch{data=null;status='unconnected';}finally{clearTimeout(timer);refresh();}}
 refresh();load();setInterval(load,15*60*1000);
 setInterval(()=>{if(data&&Date.now()-updated>30*60*1000){data=null;status='unconnected';}refresh();},60000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
 if(devPreview)document.addEventListener('keydown',e=>{
  if(!e.altKey||e.ctrlKey||e.metaKey||e.repeat||/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)||e.target.isContentEditable)return;
  const index=Number(e.key);if(!/^[0-5]$/.test(e.key))return;
  e.preventDefault();previewPhase=index?phaseIds[index-1]:null;refresh();
 });

 function update(p,dt){
  transitionElapsed+=dt;
  const t=transitionDuration===0||reducedMotion.matches||reduceControl?.checked?1:smooth(Math.min(1,transitionElapsed/transitionDuration));
  for(const name of colorKeys)current[name].lerpColors(from[name],targets[name],t);
  for(const name of numberKeys)current[name]=T.MathUtils.lerp(from[name],targets[name],t);
  current.position.lerpVectors(from.position,targets.position,t);
  // One environment on both sides of the entrance; no abrupt day reset at p=.20.
  scene.background.copy(current.sky);if(scene.fog)scene.fog.color.copy(current.fog);
  sun.color.copy(current.sunColor);sun.intensity=current.sun;sun.position.copy(current.position);sun.shadow.radius=current.shadow;
  hemisphere.color.copy(current.hemiSky);hemisphere.groundColor.copy(current.hemiGround);
  const entrance=smooth(T.MathUtils.clamp((p-.18)/.10,0,1));
  hemisphere.intensity=T.MathUtils.lerp(current.hemi,Math.max(.95,current.hemi),entrance);
  const reading=document.body.classList.contains('reading-mode'),out=p<.20&&!reading;
  exteriorLights.update(current.exterior*(1-entrance));
  for(let i=0;i<arenaLights.length;i++)arenaLights[i].intensity=arenaBase[i]*current.arena;
  if(courtDiffuser)courtDiffuser.emissiveIntensity=.45*current.arena;
  clouds.visible=out&&!previewPhase&&conditions.cloud;rain.visible=out&&!previewPhase&&conditions.rain;
  if(rain.visible&&!reducedMotion.matches){for(let i=0;i<n;i++){const k=i*6;positions[k+1]-=dt*12;positions[k+4]-=dt*12;if(positions[k+1]<2){positions[k+1]=40;positions[k+4]=39.35;}}geo.attributes.position.needsUpdate=true;}
  if(environmentState.transitioning&&t===1){transitionElapsed=transitionDuration;environmentState.transitioning=false;if(devPreview)console.info('[environment-preview] settled',phase);}
  diagnostics.status=status;diagnostics.mode=mode;diagnostics.outside=out;diagnostics.night=conditions.night;diagnostics.rain=rain.visible;diagnostics.clouds=clouds.visible;diagnostics.sun=sun.intensity;diagnostics.hemisphere=hemisphere.intensity;diagnostics.temperature=data?.temperature_2m;diagnostics.sourceTime=data?.time;
 }
 return{update};
}
