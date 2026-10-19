import * as T from './three.module.js';

// Official header artwork, kept local (no shop/CDN request at runtime):
// layrd-shop.com/cdn/shop/files/2_31f737d4-a522-4a26-9c72-4559a303853d.jpg
export function createLayrdEasterEgg({scene,canvas,camera,mesh,box,cyl,M}) {
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('./layrd-easter-egg.css',import.meta.url).href;document.head.append(css);
 const burgundy='#520d19',ivory='#f5eee3',kraft='#b88d5e',ground=.18;
 const group=new T.Group();group.name='layrd-ticket-booth';scene.add(group);
 const material=color=>new T.MeshStandardMaterial({color,roughness:.88});
 const wine=material(burgundy),paper=material(ivory),cardboard=material(kraft);
 const flagCanvas=document.createElement('canvas');flagCanvas.width=512;flagCanvas.height=1024;
 const flagTexture=new T.CanvasTexture(flagCanvas);flagTexture.colorSpace=T.SRGBColorSpace;
 const flagMaterial=new T.MeshStandardMaterial({map:flagTexture,roughness:.9,emissive:'#ffffff',emissiveMap:flagTexture,emissiveIntensity:.08});
 const poleX=-9.35,poleZ=8.05,width=1.3,height=2.5;
 // Retain the original left banner's pole/cloth dimensions; the right banner is untouched.
 cyl(.07,.08,6,poleX,3.2,poleZ,M.deep,group);
 const banner=new T.Group();banner.position.set(poleX,0,poleZ);banner.rotation.y=.65;group.add(banner);
 const flag=mesh(new T.BoxGeometry(width,height,.045),[wine,wine,wine,paper,flagMaterial,flagMaterial],.72,4.1,0,banner);
 flag.name='layrd-interactive-flag';
 for(const y of [2.85,5.35])box(1.48,.045,.065,.7,y,0,M.gold,.012,banner);
 const stampTextures=[];
 function stamp(color){
  const surface=document.createElement('canvas');surface.width=256;surface.height=112;
  const texture=new T.CanvasTexture(surface);texture.colorSpace=T.SRGBColorSpace;
  stampTextures.push({surface,texture,color});return new T.MeshStandardMaterial({map:texture,roughness:.88});
 }
 const kraftStamp=stamp(kraft),ivoryStamp=stamp(ivory),packages=[];
 function parcel({w,h,d,x,z,y=ground,angle=0,light=false,whiteBand=false}){
  const item=new T.Group();item.name='layrd-decorative-package';item.position.set(x,y,z);item.rotation.y=angle;group.add(item);
  const body=box(w,h,d,0,h/2,0,light?paper:cardboard,.025,item),band=whiteBand?paper:wine;
  // Wrapping surfaces sit just outside the carton; their bottom matches the resting plane.
  mesh(new T.BoxGeometry(.085,h,d+.008),band,w*.25,h/2,0,item);
  mesh(new T.BoxGeometry(w+.004,.006,.085),band,0,h+.003,-d*.13,item);
  const labelWidth=w*.53;
  const label=mesh(new T.PlaneGeometry(labelWidth,labelWidth*112/256),light?ivoryStamp:kraftStamp,-w*.12,h*.48,d/2+.002,item);
  label.castShadow=false;packages.push({body,item,w,h,d,bottom:y});
 }
 // ~65% of the reference's booth-relative package scale: three grounded, one stacked.
 parcel({w:.9,h:.7,d:.72,x:-8.28,z:8.7,angle:.06});
 parcel({w:.75,h:.64,d:.67,x:-9.3,z:8.85,angle:-.14,whiteBand:true});
 parcel({w:.56,h:.46,d:.49,x:-8.55,z:9.42,angle:.12,light:true});
 parcel({w:.62,h:.47,d:.54,x:-8.33,z:8.68,y:ground+.7,angle:.03});
 function paint(logo){
  const c=flagCanvas.getContext('2d');c.fillStyle=burgundy;c.fillRect(0,0,512,1024);c.fillStyle=ivory;c.fillRect(0,560,512,464);
  if(logo){c.globalCompositeOperation='multiply';const w=420,h=w*logo.height/logo.width;c.drawImage(logo,46,792-h/2,w,h);c.globalCompositeOperation='source-over';}
  flagTexture.needsUpdate=true;
  for(const {surface,texture,color} of stampTextures){const s=surface.getContext('2d');s.fillStyle=color;s.fillRect(0,0,surface.width,surface.height);if(logo){s.globalCompositeOperation='multiply';const w=232,h=w*logo.height/logo.width;s.drawImage(logo,12,(112-h)/2,w,h);s.globalCompositeOperation='source-over';}texture.needsUpdate=true;}
 }
 paint();let logoReady=false;
 const logo=new Image();logo.onload=()=>{paint(logo);logoReady=true;};logo.onerror=()=>console.warn('LAYRD wordmark could not load.');logo.src=new URL('./layrd-wordmark.jpg',import.meta.url).href;
 const link=document.createElement('a');link.id='layrd-shop-link';link.className='layrd-shop-link';link.href='https://layrd-shop.com';link.target='_blank';link.rel='noopener noreferrer';link.textContent='Visit Lāyrd ↗';link.setAttribute('aria-label','Visit the Lāyrd shop (opens in a new tab)');link.hidden=true;document.body.append(link);
 const ray=new T.Raycaster(),pointer=new T.Vector2(),projected=new T.Vector3(),anchor=new T.Vector3();
 let visible=false,hovered=false,focused=false,press=null,lastPosition='';
 function highlight(){for(const m of new Set(Array.isArray(flag.material)?flag.material:[flag.material]))if(m.map)m.emissiveIntensity=(hovered||focused)? .14 : .08;link.classList.toggle('is-hovered',hovered);}
 function clear(){canvas.dataset.layrdHover='false';if(hovered){hovered=false;canvas.style.cursor='';highlight();}}
 function hit(e){
  if(!visible||document.body.classList.contains('reading-mode')||document.querySelector('dialog[open]'))return false;
  const r=canvas.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2);ray.setFromCamera(pointer,camera);
  if(!ray.intersectObject(flag,false).length)return false;
  // Do not let a banner hidden behind a wall or another prop intercept that surface.
  return ray.intersectObjects(scene.children,true).find(h=>{let o=h.object;while(o){if(!o.visible)return false;o=o.parent;}return true;})?.object===flag;
 }
 function connect(){
  canvas.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;hovered=hit(e);if(hovered)canvas.style.cursor='pointer';else if(canvas.dataset.layrdHover==='true')canvas.style.cursor='';canvas.dataset.layrdHover=String(hovered);highlight();});
  canvas.addEventListener('pointerdown',e=>{press=hit(e)?{x:e.clientX,y:e.clientY,scroll:scrollY}:null;});
  canvas.addEventListener('pointercancel',()=>{press=null;clear();});canvas.addEventListener('pointerleave',clear);
  canvas.addEventListener('click',e=>{if(press&&Math.hypot(e.clientX-press.x,e.clientY-press.y)<8&&Math.abs(scrollY-press.scroll)<6&&hit(e)){e.stopImmediatePropagation();link.click();}press=null;});
  addEventListener('scroll',()=>{press=null;clear();},{passive:true});
  link.addEventListener('focus',()=>{focused=true;highlight();});link.addEventListener('blur',()=>{focused=false;highlight();});
 }
 function update(p){
  if(p>.21||document.body.classList.contains('reading-mode')){visible=false;if(!link.hidden)link.hidden=true;clear();return;}
  camera.updateMatrixWorld();
  flag.getWorldPosition(projected).project(camera);
  visible=projected.z>-1&&projected.z<1&&Math.abs(projected.x)<.96&&Math.abs(projected.y)<.88;
  if(link.hidden===visible)link.hidden=!visible;
  if(!visible){clear();return;}
  flag.localToWorld(anchor.set(0,-height/2-.12,0)).project(camera);
  const x=Math.round(Math.max(72,Math.min(innerWidth-72,(anchor.x+1)*innerWidth/2))),y=Math.round(Math.max(90,Math.min(innerHeight-100,(1-anchor.y)*innerHeight/2)));
  const position=`${x}px ${y}px`;if(position!==lastPosition){link.style.left=`${x}px`;link.style.top=`${y}px`;lastPosition=position;}
 }
 // Read-only inspection hook; no additional animation loop or scene reconstruction.
 window.layrdState=()=>({visible,hovered,logoReady,x:(projected.x+1)*innerWidth/2,y:(1-projected.y)*innerHeight/2,url:link.href,boxes:packages.map(p=>({position:p.item.position.toArray(),size:[p.w,p.h,p.d],bottom:p.bottom})),highlight:flag.material[4].emissiveIntensity});
 return {connect,update};
}
