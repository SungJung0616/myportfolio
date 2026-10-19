import * as T from './three.module.js';

// The existing doorway and camera rail remain the geometry/animation reference.
// No independent animation clock: reversing the rail retraces the same door pose.
export function createFilmEntrance(room){
 const entrance=new T.Group();entrance.name='film-glass-entrance';
 entrance.position.set(-12,0,-36.78);room.add(entrance);
 const metal=new T.MeshStandardMaterial({color:'#c4b294',roughness:.36,metalness:.5});
 const glass=new T.MeshStandardMaterial({color:'#b7bec6',roughness:.22,metalness:.12,transparent:true,opacity:.20,depthWrite:false,side:T.DoubleSide});
 const highlight=new T.MeshBasicMaterial({color:'#fff4df',transparent:true,opacity:.075,depthWrite:false,side:T.DoubleSide});
 function solid(w,h,d,x,y,z,material,parent=entrance){
  const mesh=new T.Mesh(new T.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);parent.add(mesh);return mesh;
 }
 // Thin architectural trim, inside the original 2.4 x 4.1 opening.
 for(const x of [-1.23,1.23])solid(.065,4.12,.12,x,2.34,0,metal);
 solid(2.525,.065,.12,0,4.4,0,metal);
 solid(2.4,.035,.18,0,.345,0,metal);
 const leaves=[];
 for(const side of [-1,1]){
  const hinge=new T.Group();hinge.position.set(side*1.17,0,0);entrance.add(hinge);
  const center=-side*.5775,width=1.155,height=3.94,y=2.35;
  const pane=new T.Mesh(new T.PlaneGeometry(width-.07,height-.08),glass);pane.position.set(center,y,0);hinge.add(pane);
  for(const edge of [-1,1])solid(.04,height,.065,center+edge*(width-.04)/2,y,0,metal,hinge);
  for(const edge of [-1,1])solid(width,.045,.065,center,y+edge*(height-.045)/2,0,metal,hinge);
  // A restrained reflection band, not a live reflection pass or emissive glow.
  const reflection=new T.Mesh(new T.PlaneGeometry(.075,3.64),highlight);
  reflection.position.set(center-side*.26,y,.006);reflection.rotation.z=-.035;hinge.add(reflection);
  const handleX=-side*(width-.16);
  for(const face of [-1,1]){
   solid(.035,.76,.04,handleX,2.25,face*.09,metal,hinge);
   for(const offset of [-.3,.3])solid(.035,.035,.075,handleX,2.25+offset,face*.055,metal,hinge);
  }
  leaves.push({hinge,side});
 }
 const ease=(a,b,p)=>{const t=T.MathUtils.clamp((p-a)/(b-a),0,1);return t*t*(3-2*t);};
 let lastOpen=-1;
 function update(progress,reducedMotion=false){
  // Full clearance before crossing the doorway in either direction. Closing only
  // begins after the camera clears the inward swing. No lag or stale callbacks.
  const opening=reducedMotion?1:ease(.948,.969,progress)*(1-ease(.987,.999,progress));
  if(opening===lastOpen)return;
  leaves.forEach(({hinge,side})=>{hinge.rotation.y=-side*opening*T.MathUtils.degToRad(88);});
  lastOpen=opening;
  entrance.userData.openFraction=opening;
 }
 update(0);
 return {update,get openFraction(){return lastOpen;}};
}
