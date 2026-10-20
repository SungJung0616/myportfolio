import * as T from './three.module.js';

const RAIN_COUNT=4200,SNOW_COUNT=3200;
const MIN_X=-30,MAX_X=30,MIN_Z=8.9,MAX_Z=52,MIN_Y=.32,MAX_Y=32;
const clamp01=value=>Number.isFinite(value)?Math.max(0,Math.min(1,value)):0;
const windComponent=value=>Number.isFinite(value)?Math.max(-12,Math.min(12,value)):0;
const wrap=(value,min,max)=>min+((value-min)%(max-min)+(max-min))%(max-min);
const ignoreRaycast=()=>{};

// One fixed pool per precipitation type. The environment controller owns time,
// interpolation and visibility; this helper creates no timer, request or loop.
export function createWeatherEffects({scene,trees=[]}){
 const rainPositions=new Float32Array(RAIN_COUNT*6),rainSpeeds=new Float32Array(RAIN_COUNT),rainLengths=new Float32Array(RAIN_COUNT);
 for(let i=0;i<RAIN_COUNT;i++){
  const k=i*6,length=.5+Math.random()*.55,x=MIN_X+Math.random()*(MAX_X-MIN_X),y=MIN_Y+Math.random()*(MAX_Y-MIN_Y-length),z=MIN_Z+Math.random()*(MAX_Z-MIN_Z);
  rainPositions[k]=rainPositions[k+3]=x;rainPositions[k+1]=y;rainPositions[k+4]=y+length;rainPositions[k+2]=rainPositions[k+5]=z;
  rainSpeeds[i]=14+Math.random()*8;rainLengths[i]=length;
 }
 const rainGeometry=new T.BufferGeometry(),rainAttribute=new T.BufferAttribute(rainPositions,3);
 rainAttribute.setUsage(T.DynamicDrawUsage);rainGeometry.setAttribute('position',rainAttribute);
 const rainMaterial=new T.LineBasicMaterial({color:'#c8dbe8',transparent:true,opacity:0,depthWrite:false,toneMapped:false});
 const rain=new T.LineSegments(rainGeometry,rainMaterial);rain.name='weather-rain';rain.visible=false;rain.frustumCulled=false;rain.raycast=ignoreRaycast;scene.add(rain);

 const snowPositions=new Float32Array(SNOW_COUNT*3),snowSpeeds=new Float32Array(SNOW_COUNT),snowPhases=new Float32Array(SNOW_COUNT);
 for(let i=0;i<SNOW_COUNT;i++){
  const k=i*3;snowPositions[k]=MIN_X+Math.random()*(MAX_X-MIN_X);snowPositions[k+1]=MIN_Y+Math.random()*(MAX_Y-MIN_Y);snowPositions[k+2]=MIN_Z+Math.random()*(MAX_Z-MIN_Z);
  snowSpeeds[i]=.65+Math.random()*.8;snowPhases[i]=Math.random()*Math.PI*2;
 }
 const canvas=document.createElement('canvas');canvas.width=canvas.height=32;
 const ctx=canvas.getContext('2d'),gradient=ctx.createRadialGradient(16,16,0,16,16,16);
 gradient.addColorStop(0,'rgba(255,255,255,1)');gradient.addColorStop(.35,'rgba(255,255,255,.95)');gradient.addColorStop(.75,'rgba(255,255,255,.35)');gradient.addColorStop(1,'rgba(255,255,255,0)');
 ctx.fillStyle=gradient;ctx.fillRect(0,0,32,32);
 const snowTexture=new T.CanvasTexture(canvas);snowTexture.colorSpace=T.SRGBColorSpace;
 const snowGeometry=new T.BufferGeometry(),snowAttribute=new T.BufferAttribute(snowPositions,3);
 snowAttribute.setUsage(T.DynamicDrawUsage);snowGeometry.setAttribute('position',snowAttribute);
 const snowMaterial=new T.PointsMaterial({color:'#f4f2ef',map:snowTexture,size:.20,sizeAttenuation:true,transparent:true,opacity:0,alphaTest:.04,depthWrite:false,toneMapped:false});
 const snow=new T.Points(snowGeometry,snowMaterial);snow.name='weather-snow';snow.visible=false;snow.frustumCulled=false;snow.raycast=ignoreRaycast;scene.add(snow);

 const treeBases=trees.map(tree=>({tree,x:tree.rotation.x,y:tree.rotation.y,z:tree.rotation.z}));
 const fog=scene.fog,baseNear=fog?.near,baseFar=fog?.far;
 const hasLinearFog=Number.isFinite(baseNear)&&Number.isFinite(baseFar);
 const diagnostics={rainCount:RAIN_COUNT,snowCount:SNOW_COUNT,poolObjects:2,treeCount:treeBases.length,rainVisible:false,snowVisible:false,rainOpacity:0,snowOpacity:0,exteriorWeight:0,reduced:false,fogAmount:0,fogNear:baseNear??null,fogFar:baseFar??null,windX:0,windZ:0,treeMaxBend:0,rainUpdates:0,snowUpdates:0};
 let elapsed=0;

 function update(current,exteriorWeight,dt,reduced){
  const weight=clamp01(exteriorWeight),step=Number.isFinite(dt)?Math.max(0,Math.min(.1,dt)):0;
  const moving=weight>0&&!reduced;
  const rainAmount=clamp01(current.rainAmount)*weight,snowAmount=clamp01(current.snowAmount)*weight;
  const windX=windComponent(current.windX),windZ=windComponent(current.windZ),gust=clamp01(current.gustAmount);
  rainMaterial.opacity=moving?rainAmount*.7:0;snowMaterial.opacity=moving?snowAmount*.95:0;
  rain.visible=rainMaterial.opacity>.001;snow.visible=snowMaterial.opacity>.001;
  // The fixed plaza volume starts beyond the canopy's front edge (z=8.4).
  // Endpoints stay in that volume even when the wind changes direction.
  if(moving)elapsed+=step;
  if(rain.visible&&step>0){
   const driftX=windX*.45,driftZ=windZ*.45;
   for(let i=0;i<RAIN_COUNT;i++){
    const k=i*6,length=rainLengths[i];
    const x=wrap(rainPositions[k]+driftX*step,MIN_X,MAX_X),z=wrap(rainPositions[k+2]+driftZ*step,MIN_Z,MAX_Z);
    let y=rainPositions[k+1]-rainSpeeds[i]*step;if(y<MIN_Y)y=MAX_Y-length;
    rainPositions[k]=x;rainPositions[k+1]=y;rainPositions[k+2]=z;
    rainPositions[k+3]=Math.max(MIN_X,Math.min(MAX_X,x-driftX*length/rainSpeeds[i]));rainPositions[k+4]=y+length;rainPositions[k+5]=Math.max(MIN_Z,Math.min(MAX_Z,z-driftZ*length/rainSpeeds[i]));
   }
   rainAttribute.needsUpdate=true;diagnostics.rainUpdates++;
  }
  if(snow.visible&&step>0){
   for(let i=0;i<SNOW_COUNT;i++){
    const k=i*3,phase=snowPhases[i];
    snowPositions[k]=wrap(snowPositions[k]+(windX*.22+Math.sin(elapsed*.65+phase)*.32)*step,MIN_X,MAX_X);
    snowPositions[k+2]=wrap(snowPositions[k+2]+(windZ*.22+Math.cos(elapsed*.53+phase)*.24)*step,MIN_Z,MAX_Z);
    const y=snowPositions[k+1]-snowSpeeds[i]*step;snowPositions[k+1]=y<MIN_Y?MAX_Y:y;
   }
   snowAttribute.needsUpdate=true;diagnostics.snowUpdates++;
  }
  let maxBend=0;
  const speed=Math.hypot(windX,windZ),strength=Math.min(1,speed/8),directionX=speed>0?windX/speed:0,directionZ=speed>0?windZ/speed:0;
  for(let i=0;i<treeBases.length;i++){
   const base=treeBases[i];
   if(!moving||speed===0){base.tree.rotation.set(base.x,base.y,base.z);continue;}
   const phase=i*1.71,pulse=.78+.16*Math.sin(elapsed*1.15+phase)+.06*Math.sin(elapsed*2.1+phase*.7);
   const bend=Math.min(.06,(.038*strength+.022*gust*strength)*pulse)*weight;
   base.tree.rotation.set(base.x+directionZ*bend,base.y,base.z-directionX*bend);maxBend=Math.max(maxBend,bend);
  }
  const fogAmount=clamp01(current.fogAmount)*weight;
  if(hasLinearFog){fog.near=T.MathUtils.lerp(baseNear,10,fogAmount);fog.far=T.MathUtils.lerp(baseFar,65,fogAmount);}
  diagnostics.rainVisible=rain.visible;diagnostics.snowVisible=snow.visible;diagnostics.rainOpacity=rainMaterial.opacity;diagnostics.snowOpacity=snowMaterial.opacity;
  diagnostics.exteriorWeight=weight;diagnostics.reduced=!!reduced;diagnostics.fogAmount=fogAmount;diagnostics.fogNear=hasLinearFog?fog.near:null;diagnostics.fogFar=hasLinearFog?fog.far:null;
  diagnostics.windX=moving?windX:0;diagnostics.windZ=moving?windZ:0;diagnostics.treeMaxBend=maxBend;
 }
 return{update,diagnostics};
}
