import * as T from './three.module.js';
export function createExteriorLighting(scene){
 const group=new T.Group();scene.add(group);
 const c=document.createElement('canvas');c.width=c.height=128;const ctx=c.getContext('2d'),g=ctx.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,219,153,0.6)');g.addColorStop(.3,'rgba(255,204,120,0.22)');g.addColorStop(1,'rgba(255,204,120,0)');ctx.fillStyle=g;ctx.fillRect(0,0,128,128);const texture=new T.CanvasTexture(c);texture.colorSpace=T.SRGBColorSpace;
 for(const x of [-4.7,4.7])for(const z of [12,16,19]){const lamp=new T.PointLight('#ffd28b',9,4.4,2);lamp.position.set(x,1.12,z);group.add(lamp);const halo=new T.Sprite(new T.SpriteMaterial({map:texture,transparent:true,depthWrite:false,blending:T.AdditiveBlending}));halo.position.set(x,.99,z);halo.scale.set(.85,.85,1);group.add(halo);}
 for(const x of [-3.6,3.6]){const lamp=new T.SpotLight('#ffce85',65,8,Math.PI/3,.85,1.6);lamp.position.set(x,4.2,8.2);lamp.target.position.set(x*.65,.3,10.3);group.add(lamp,lamp.target);}
 const lamps=group.children.filter(o=>o.isLight).map(light=>({light,intensity:light.intensity}));
 const halos=group.children.filter(o=>o.isSprite);
 const state=window.exteriorLightState={on:false,fixtures:8,strength:0};
 // Fade the existing fixtures; omit their lighting cost once fully extinguished.
 return {update(strength){
  for(const entry of lamps)entry.light.intensity=entry.intensity*strength;
  for(const halo of halos)halo.material.opacity=strength;
  group.visible=strength>.001;state.on=group.visible;state.strength=strength;
 }};
}
