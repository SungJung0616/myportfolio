import * as T from './three.module.js';
export const JUMBOTRON_Y=9;
export function isRenderedHit(hit){
 for(let node=hit.object;node;node=node.parent)if(!node.visible)return false;
 const material=Array.isArray(hit.object.material)?hit.object.material[hit.face?.materialIndex||0]:hit.object.material;
 if(!material||material.visible===false||material.opacity===0)return false;
 const planes=material.clippingPlanes||[];
 const clipped=plane=>plane.distanceToPoint(hit.point)<0;
 return !(planes.length&&(material.clipIntersection?planes.every(clipped):planes.some(clipped)));
}
// Scene units: court centre (0,-29), roof ribs at z=-27/-33 and y≈11.1.
// The memorial camera at z=-37.8 looks away from this entire assembly.
export function buildJumbotron(texture){
 const group=new T.Group();group.name='lakers-center-hung-jumbotron';group.position.set(0,JUMBOTRON_Y,-29);
 const shell=new T.MeshStandardMaterial({color:'#342c43',roughness:.66,metalness:.35});
 const trim=new T.MeshStandardMaterial({color:'#d2a657',roughness:.4,metalness:.65});
 const steel=new T.MeshStandardMaterial({color:'#62556d',roughness:.7,metalness:.45});
 const textures=Array.isArray(texture)?texture:[texture,texture,texture,texture];
 const displays=textures.map(map=>new T.MeshBasicMaterial({map,toneMapped:false}));
 const faces=[];
 function box(w,h,d,x,y,z,material){const m=new T.Mesh(new T.BoxGeometry(w,h,d),material);m.position.set(x,y,z);group.add(m);return m;}
 box(5.8,2.4,5.8,0,0,0,shell);
 for(const y of [-1.25,1.25])box(6.02,.12,6.02,0,y,0,trim);
 box(5.9,.2,5.9,0,1.42,0,shell);
 box(5.2,.18,5.2,0,-1.43,0,shell);
 const plane=new T.PlaneGeometry(5.48,2.26);
 for(let i=0;i<4;i++){const a=i*Math.PI/2,m=new T.Mesh(plane,displays[i]);m.position.set(Math.sin(a)*2.91,0,Math.cos(a)*2.91);m.rotation.y=a;m.name='lakers-display-'+i;group.add(m);faces.push(m);}
 // Slim vertical corner mullions give the LED faces a structural frame.
 for(const x of [-2.88,2.88])for(const z of [-2.88,2.88])box(.14,2.4,.14,x,0,z,steel);
 // Longitudinal roof carriers bridge the existing structural ribs.
 for(const x of [-1.65,1.65]){
  box(.18,.18,6.3,x,2,-1,steel);
  for(const z of [-1.65,1.65]){
   box(.11,.5,.11,x,1.72,z,steel);
   box(.32,.12,.32,x,1.52,z,trim);
  }
 }
 box(3.5,.14,.14,0,2,-2,steel);box(3.5,.14,.14,0,2,2,steel);
 group.userData.dimensions={width:6.02,bottom:7.48,top:11.09};
 return {group,faces};
}
