import {createExteriorLighting} from './exterior-lighting.js?v=fix13a-environment-1';
import {createWeatherEffects} from './weather-effects.js?v=fix13b1-effects-2';
import * as T from './three.module.js';

const endpoint='https://api.open-meteo.com/v1/forecast?latitude=33.8883&longitude=-118.309&current=temperature_2m,is_day,precipitation,snowfall,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m&wind_speed_unit=ms&timezone=America%2FLos_Angeles&timeformat=unixtime';
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
// Open-Meteo WMO codes. Snow uses overcast lighting, but retains its honest label.
const rainCodes=new Set([51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,97,99]);
const snowCodes=new Set([71,73,75,77,85,86]);
export function classifyWeather(data){
 const code=data?.weather_code;
 if(code===0||code===1)return{category:'clear',description:'Clear',source:'weather-code'};
 if(code===2||code===3)return{category:'cloudy',description:'Cloudy',source:'weather-code'};
 if(code===45||code===48)return{category:'foggy',description:'Fog',source:'weather-code'};
 if(rainCodes.has(code))return{category:'rainy',description:code>=95?'Thunderstorm':'Rain',source:'weather-code'};
 if(snowCodes.has(code))return{category:'cloudy',description:'Snow',source:'snow-overcast'};
 if(Number.isFinite(data?.snowfall)&&data.snowfall>0)return{category:'cloudy',description:'Snow',source:'snowfall-fallback'};
 if(Number.isFinite(data?.precipitation)&&data.precipitation>0)return{category:'rainy',description:'Precipitation',source:'precipitation-fallback'};
 if(Number.isFinite(data?.cloud_cover)&&data.cloud_cover>=45&&data.cloud_cover<=100)return{category:'cloudy',description:'Cloudy',source:'cloud-cover-fallback'};
 return{category:'clear',description:'Conditions unavailable',source:'neutral-fallback'};
}
// Restrained modifiers, never a second environment owner. Clear is exactly FIX 13A.1.
export const weatherModifiers={
 clear:{sun:1,hemi:1,skyLevel:1,mix:0,fogMix:0,lightMix:0,tint:'#adb8c5',arena:1,exterior:1},
 cloudy:{sun:.68,hemi:1.04,skyLevel:.92,mix:.18,fogMix:.12,lightMix:.10,tint:'#adb8c5',arena:1.02,exterior:1.04},
 rainy:{sun:.48,hemi:1.02,skyLevel:.80,mix:.28,fogMix:.24,lightMix:.16,tint:'#91a0b5',arena:1.04,exterior:1.08},
 foggy:{sun:.56,hemi:1.07,skyLevel:1,mix:.24,fogMix:.30,lightMix:.18,tint:'#c0cbd3',arena:1.02,exterior:1.04},
};
const weatherIds=Object.keys(weatherModifiers);
const windModes=['live','calm','breezy','strong'];
const weatherLabels={clear:'Clear',cloudy:'Cloudy',rainy:'Rain',foggy:'Fog',snow:'Snow'};
export function resolveEnvironment(hour,observation,timeOverride=null,weatherOverride=null){
 const phase=phaseIds.includes(timeOverride)?timeOverride:phaseForHour(hour);
 const forcedCondition=weatherIds.includes(weatherOverride)||weatherOverride==='snow'?weatherOverride:null;
 return{phase,weather:forcedCondition==='snow'?'cloudy':forcedCondition||observation.category,forcedCondition};
}
// Lighting keeps four categories; snowfall is a separate precipitation effect.
export function weatherEffectTargets(data,category,forcedCondition=null,windPreview='live'){
 const snow=forcedCondition?forcedCondition==='snow':classifyWeather(data).description==='Snow';
 const rain=!snow&&(forcedCondition?forcedCondition==='rainy':category==='rainy');
 const fog=forcedCondition?forcedCondition==='foggy':category==='foggy';
 const speed=Number.isFinite(data?.wind_speed_10m)&&data.wind_speed_10m>=0&&data.wind_speed_10m<=100?Math.min(18,data.wind_speed_10m):0;
 const gust=Number.isFinite(data?.wind_gusts_10m)&&data.wind_gusts_10m>=0&&data.wind_gusts_10m<=100?Math.min(25,data.wind_gusts_10m):speed;
 const direction=Number.isFinite(data?.wind_direction_10m)&&data.wind_direction_10m>=0&&data.wind_direction_10m<=360?data.wind_direction_10m*Math.PI/180:0;
 const wind=windPreview==='calm'?0:windPreview==='breezy'?6:windPreview==='strong'?14:speed;
 const angle=windPreview==='live'?direction:Math.PI*.65;
 return{rainAmount:rain?.82:0,snowAmount:snow?.95:0,fogAmount:fog?1:rain?.13:snow?.18:0,cloudAmount:category==='cloudy'||rain||fog?1:0,windX:-Math.sin(angle)*wind,windZ:Math.cos(angle)*wind,gustAmount:windPreview==='live'?Math.min(1,Math.max(0,gust-speed)/16):windPreview==='strong'?.8:windPreview==='breezy'?.25:0};
}
const colorKeys=['sky','fog','sunColor','hemiSky','hemiGround'];
const lightingNumberKeys=['sun','hemi','exterior','arena','shadow'];
const effectKeys=['rainAmount','snowAmount','fogAmount','cloudAmount','windX','windZ','gustAmount'];
const numberKeys=[...lightingNumberKeys,...effectKeys];
const smooth=t=>t*t*(3-2*t);

export function createWeather({scene,sun,hemisphere,arenaLights=[],courtDiffuser,trees=[]}){
 const exteriorLights=createExteriorLighting(scene);
 const effects=createWeatherEffects({scene,trees});
 const arenaBase=arenaLights.map(light=>light.intensity);
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const reduceControl=document.getElementById('reduce');
 let clockFormatter;
 try{clockFormatter=new Intl.DateTimeFormat('en-GB',{timeZone,hour:'2-digit',minute:'2-digit',hourCycle:'h23'});}catch{/* Browser-local fallback below. */}
 let data=null,status='loading',updated=0,phase='night',clockSource=timeZone,loadGeneration=0;
 let observedWeather=classifyWeather(null),weather='clear';
 let actualNight=false;
 const diagnostics=window.weatherState={};
 const environmentState=window.environmentState={phase,clockSource,preview:false,transitioning:false};
 // Localhost + explicit opt-in. Alt+Shift+1…4 previews weather; Alt+0 restores live.
 const params=new URLSearchParams(location.search);
 const devPreview=['localhost','127.0.0.1','[::1]'].includes(location.hostname)&&params.has('environmentPreview');
 const requestedPhase=devPreview?params.get('environmentPreview'):null;
 let previewPhase=phaseIds.includes(requestedPhase)?requestedPhase:null;
 const requestedWeather=devPreview?params.get('weatherPreview'):null;
 let previewWeather=weatherIds.includes(requestedWeather)||requestedWeather==='snow'?requestedWeather:requestedWeather==='live'?null:previewPhase?'clear':null;
 let previewWind=devPreview&&windModes.includes(params.get('windPreview'))?params.get('windPreview'):'live';
 const targets={},from={},current={};
 for(const key of colorKeys){targets[key]=new T.Color();from[key]=new T.Color();current[key]=new T.Color();}
 for(const state of [targets,from,current])state.position=new T.Vector3();
 const weatherTint=new T.Color(),tintSample=new T.Color();
 const luminance=color=>.2126*color.r+.7152*color.g+.0722*color.b;
 function tintAtmosphere(color,mix,level=1){
  // Match the phase's luminance: a daytime gray must never bleach the night sky.
  tintSample.copy(weatherTint).multiplyScalar(luminance(color)/Math.max(.0001,luminance(weatherTint)));
  color.lerp(tintSample,mix).multiplyScalar(level);
  color.multiplyScalar(1/Math.max(1,color.r,color.g,color.b));
 }
 let initialized=false,transitionElapsed=0,transitionDuration=2.4,targetKey='';

 const options=(dimension,items)=>items.map(([id,label])=>`<button type="button" data-${dimension}="${id}" aria-pressed="false">${label}</button>`).join('');
 const ui=document.createElement('section');ui.id='arena-atmosphere';ui.setAttribute('aria-label','Arena Atmosphere');
 ui.innerHTML=`<button type="button" id="atmosphere-toggle" aria-label="Arena Atmosphere" aria-haspopup="dialog" aria-expanded="false" aria-controls="atmosphere-panel"><span class="atmosphere-sun" aria-hidden="true">☼</span><span>Arena Atmosphere</span><span class="atmosphere-badge" aria-hidden="true">Live</span></button>
 <div id="atmosphere-panel" role="dialog" aria-modal="false" aria-labelledby="atmosphere-title" aria-describedby="atmosphere-description" hidden>
  <div class="atmosphere-heading"><div><h2 id="atmosphere-title">Set the Scene</h2><p id="atmosphere-description">Explore the court in a different light.</p></div><button type="button" id="atmosphere-close" aria-label="Close Arena Atmosphere">×</button></div>
  <fieldset><legend>TIME OF DAY</legend><div class="atmosphere-options">${options('time',[['live','Live'],...phaseIds.map(id=>[id,environmentPhases[id].label])])}</div></fieldset>
  <fieldset><legend>WEATHER</legend><div class="atmosphere-options">${options('weather',[['live','Live'],...Object.entries(weatherLabels)])}</div></fieldset>
  <p id="atmosphere-scene" role="status" aria-live="polite" aria-atomic="true"></p>
  <div class="atmosphere-footer"><button type="button" id="atmosphere-reset">Reset to Live <span aria-hidden="true">↺</span></button><p id="atmosphere-observation"></p><a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Weather data by Open-Meteo</a><button type="button" id="weather-retry" hidden>Retry live weather</button></div>
 </div>`;
 document.body.append(ui);
 const toggle=ui.querySelector('#atmosphere-toggle'),panel=ui.querySelector('#atmosphere-panel');
 const timeButtons=[...ui.querySelectorAll('[data-time]')],weatherButtons=[...ui.querySelectorAll('[data-weather]')];
 function closePanel(restoreFocus=false){if(panel.hidden)return;const returnFocus=restoreFocus||panel.contains(document.activeElement);panel.hidden=true;toggle.setAttribute('aria-expanded','false');if(returnFocus)toggle.focus({preventScroll:true});}
 toggle.onclick=()=>{const open=panel.hidden;panel.hidden=!open;toggle.setAttribute('aria-expanded',String(open));if(open)label();};
 ui.querySelector('#atmosphere-close').onclick=()=>closePanel(true);
 ui.querySelector('#atmosphere-reset').onclick=()=>{previewPhase=previewWeather=null;previewWind='live';refresh();};
 for(const button of timeButtons)button.onclick=()=>{previewPhase=button.dataset.time==='live'?null:button.dataset.time;refresh();};
 for(const button of weatherButtons)button.onclick=()=>{previewWeather=button.dataset.weather==='live'?null:button.dataset.weather;refresh();};
 ui.querySelector('#weather-retry').onclick=load;
 document.addEventListener('pointerdown',e=>{if(!ui.contains(e.target))closePanel();});
 document.addEventListener('focusin',e=>{if(!ui.contains(e.target))closePanel();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.preventDefault();closePanel(true);}});
 // Dismiss on navigation input without canceling its native scroll behavior.
 addEventListener('wheel',()=>closePanel(),{passive:true});
 addEventListener('touchmove',()=>closePanel(),{passive:true});
 addEventListener('portfolio:navigate',()=>closePanel());
 const previewNote=devPreview?document.createElement('p'):null;
 if(previewNote){previewNote.id='environment-preview-note';panel.append(previewNote);}
 let windSelect;
 if(devPreview){
  const controls=document.createElement('div');controls.className='atmosphere-development';controls.innerHTML='<label>Development wind <select id="environment-wind" aria-label="Development wind"><option value="live">Live wind</option><option value="calm">Calm</option><option value="breezy">Breezy</option><option value="strong">Strong</option></select></label>';panel.append(controls);
  windSelect=controls.querySelector('#environment-wind');windSelect.onchange=e=>{previewWind=e.target.value;refresh();};
 }
 // Retain existing clouds; precipitation uses one reusable rain/snow pool each.
 const clouds=new T.Group();scene.add(clouds);const cm=new T.MeshStandardMaterial({color:'#dce2e9',roughness:1,transparent:true,opacity:.75,depthWrite:false});for(let i=0;i<7;i++){const group=new T.Group();group.position.set(-40+i*14,12+(i%2)*2,-30-(i%3)*5);for(let j=0;j<3;j++){const m=new T.Mesh(new T.SphereGeometry(1,16,10),cm);m.scale.set(5+j,1.4,2.5);m.position.x=(j-1)*5;group.add(m);}clouds.add(group);}

 function effectiveHour(){
  const now=new Date();
  if(clockFormatter){try{const [hour,minute]=clockFormatter.format(now).split(':').map(Number);if(Number.isFinite(hour)&&Number.isFinite(minute)){clockSource=timeZone;return hour+minute/60;}}catch{/* Use the visitor's local clock. */}}
  clockSource='browser-local';return now.getHours()+now.getMinutes()/60;
 }
 function refresh(){
  const hour=effectiveHour();
  actualNight=data?data.is_day===0:hour<6||hour>=18;
  observedWeather=classifyWeather(data);
  const resolved=resolveEnvironment(hour,observedWeather,previewPhase,previewWeather);phase=resolved.phase;weather=resolved.weather;
  const effectTargets=weatherEffectTargets(data,weather,resolved.forcedCondition,previewWind);
  const key=phase+':'+weather+':'+effectKeys.map(name=>effectTargets[name]).join(':');
  if(key!==targetKey){
   targetKey=key;const config=environmentPhases[phase];
   for(const name of colorKeys)targets[name].set(config[name]);
   for(const name of lightingNumberKeys)targets[name]=config[name];
   for(const name of effectKeys)targets[name]=effectTargets[name];
   targets.position.fromArray(config.position);
   const modifier=weatherModifiers[weather];weatherTint.set(modifier.tint);
   tintAtmosphere(targets.sky,modifier.mix,modifier.skyLevel);
   tintAtmosphere(targets.fog,modifier.fogMix,modifier.skyLevel);
   tintAtmosphere(targets.sunColor,modifier.lightMix);
   tintAtmosphere(targets.hemiSky,modifier.lightMix*.5);
   targets.sun*=modifier.sun;targets.hemi*=modifier.hemi;
   targets.arena*=modifier.arena;targets.exterior=Math.min(1,targets.exterior*modifier.exterior);
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
  environmentState.phase=phase;environmentState.clockSource=clockSource;environmentState.preview=!!(previewPhase||previewWeather||previewWind!=='live');environmentState.weather=weather;environmentState.precipitation=effectTargets.snowAmount?'snow':effectTargets.rainAmount?'rain':'none';environmentState.weatherSource=previewWeather?'visitor-selection':observedWeather.source;
  environmentState.timeOverride=previewPhase;environmentState.weatherOverride=previewWeather;
  ui.dataset.scene=environmentState.preview?'custom':'live';ui.dataset.environmentPhase=phase;ui.dataset.environmentWeather=weather;ui.dataset.environmentPrecipitation=environmentState.precipitation;
  for(const button of timeButtons)button.setAttribute('aria-pressed',String(button.dataset.time===(previewPhase||'live')));
  for(const button of weatherButtons)button.setAttribute('aria-pressed',String(button.dataset.weather===(previewWeather||'live')));
  ui.querySelector('.atmosphere-badge').textContent=environmentState.preview?'Custom':'Live';
  ui.querySelector('#atmosphere-scene').textContent=environmentState.preview?'Custom scene · '+environmentPhases[phase].label+' / '+(previewWeather?weatherLabels[previewWeather]:observedWeather.description):'Live scene · Los Angeles';
  if(devPreview){
   windSelect.value=previewWind;
   const windLabel=previewWind==='live'?(Number.isFinite(data?.wind_speed_10m)&&data.wind_speed_10m>=0&&data.wind_speed_10m<=100?'live '+data.wind_speed_10m.toFixed(1)+' m/s':'live unavailable'):previewWind;
   previewNote.textContent='Development preview · '+environmentPhases[phase].label+' / '+(previewWeather==='snow'?'Snow (cloudy lighting)':weather)+' · wind: '+windLabel+'. Alt+1–5: time; Alt+Shift+1–5: clear/cloud/rain/fog/snow; Alt+Shift+0: live weather; Alt+0: reset all.';
   console.info('[environment-preview]',JSON.stringify({phase,weather,weatherSource:environmentState.weatherSource,clockSource,override:previewPhase,weatherOverride:previewWeather,transitionSeconds:transitionDuration}));
  }
  label();
 }
 function label(){
  const el=document.querySelector('.weather'),description=observedWeather.description;
  if(el){el.textContent=data?' · '+description+' '+Math.round(data.temperature_2m)+'°C · '+(actualNight?'Night':'Day'):' · Weather unavailable · —';el.title=data?'Open-Meteo current estimate · '+new Date(data.time*1000).toLocaleString('en-US',{timeZone}):'Weather unavailable. Environment uses approximate clock phases, not astronomical sunrise/sunset.';}
  ui.querySelector('#atmosphere-observation').textContent='Actual LA weather · '+(data?description+' '+Math.round(data.temperature_2m)+'°C':status==='loading'?'Connecting…':'Unavailable; Live uses neutral lighting.');
  ui.querySelector('#weather-retry').hidden=status!=='unconnected';
 }
 async function load(){
  const generation=++loadGeneration;status='loading';label();
  const abort=new AbortController(),timer=setTimeout(()=>abort.abort(),8000);
  try{
   const response=await fetch(endpoint,{signal:abort.signal,credentials:'omit',cache:'no-store'});if(!response.ok)throw Error('http');
   const json=await response.json(),d=json.current;
   // Optional weather fields normalize safely; invalid core data is never shown as live.
   if(!d||!Number.isFinite(d.temperature_2m)||![0,1].includes(d.is_day)||!Number.isFinite(d.time)||Math.abs(Date.now()/1000-d.time)>7200)throw Error('invalid or stale');
   if(generation===loadGeneration){data=d;updated=Date.now();status='connected';}
  }catch{if(generation===loadGeneration){data=null;status='unconnected';}}
  finally{clearTimeout(timer);if(generation===loadGeneration)refresh();}
 }
 refresh();load();setInterval(load,15*60*1000);
 setInterval(()=>{if(data&&Date.now()-updated>30*60*1000){data=null;status='unconnected';}refresh();},60000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
 if(devPreview)document.addEventListener('keydown',e=>{
  if(!e.altKey||e.ctrlKey||e.metaKey||e.repeat||/^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)||e.target.isContentEditable)return;
  const key=/^Digit[0-5]$/.test(e.code)?e.code.slice(-1):e.key;
  if(!/^[0-5]$/.test(key))return;
  const index=Number(key);e.preventDefault();
  if(e.shiftKey)previewWeather=index===5?'snow':index?weatherIds[index-1]:null;
  else if(index)previewPhase=phaseIds[index-1];
  else{previewPhase=null;previewWeather=null;previewWind='live';}
  refresh();
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
  const reading=document.body.classList.contains('reading-mode'),out=p<.235&&!reading;
  const exteriorWeight=reading?0:1-smooth(T.MathUtils.clamp((p-.17)/.065,0,1));
  exteriorLights.update(current.exterior*(1-entrance));
  for(let i=0;i<arenaLights.length;i++)arenaLights[i].intensity=arenaBase[i]*current.arena;
  if(courtDiffuser)courtDiffuser.emissiveIntensity=.45*current.arena;
  clouds.visible=out&&current.cloudAmount>.01;cm.opacity=.75*current.cloudAmount*exteriorWeight;
  effects.update(current,exteriorWeight,dt,reducedMotion.matches||!!reduceControl?.checked);
  if(environmentState.transitioning&&t===1){transitionElapsed=transitionDuration;environmentState.transitioning=false;if(devPreview)console.info('[environment-preview] settled',phase,weather);}
  diagnostics.status=status;diagnostics.mode=environmentState.preview?'custom':'live';diagnostics.outside=out;diagnostics.night=actualNight;diagnostics.rain=effects.diagnostics.rainVisible;diagnostics.snow=effects.diagnostics.snowVisible;diagnostics.clouds=clouds.visible;diagnostics.sun=sun.intensity;diagnostics.hemisphere=hemisphere.intensity;diagnostics.temperature=data?.temperature_2m;diagnostics.sourceTime=data?.time;
 }
 return{update};
}
