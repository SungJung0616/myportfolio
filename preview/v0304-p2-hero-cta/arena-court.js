import * as T from './three.module.js';

// NBA-inspired layout, uniformly scaled inside the existing 24 × 13 floor.
// Source: https://official.nba.com/rule-no-1-court-dimensions-equipment/
// X = playing length; Z = playing width; all dimensions below are in feet.
const FT = .24;
export const courtSpec = Object.freeze({
  scale: FT, length: 94, width: 50, baseline: 47, hoop: 41.75,
  backboard: 43, freeThrow: 28, laneWidth: 16, circleRadius: 6,
  threeRadius: 23.75, corner: 22, restrictedRadius: 4,
  lineWidth: 2 / 12, rimHeight: 10, rimRadius: .75,
  floorY: .3475, centerZ: -29, floorWidth: 24, floorDepth: 13
});

export function buildArenaCourt({scene, box, mesh, tex, M}) {
  const s = courtSpec;
  const map = tex(2048, 1110, c => {
    // Draw in world units: the non-square bitmap does not distort the court.
    c.scale(2048 / s.floorWidth, 1110 / s.floorDepth);
    c.translate(s.floorWidth / 2, s.floorDepth / 2);
    c.fillStyle = '#cdaa79'; c.fillRect(-12, -6.5, 24, 13);
    for (let row = 0; row < 52; row++) {
      const z = -6.5 + row * .25;
      c.fillStyle = ['#d1af7e','#cba674','#d5b482','#cfa979'][row % 4];
      c.fillRect(-12, z, 24, .248);
      c.strokeStyle = '#b58f6245'; c.lineWidth = .008;
      for (let x = -12 + (row % 3) * 1.12; x < 12; x += 3.36) {
        c.beginPath(); c.moveTo(x,z); c.lineTo(x,z+.248); c.stroke();
      }
    }
    c.scale(FT, FT);
    const hx=s.baseline, hz=s.width/2;
    c.fillStyle = '#685174';
    c.fillRect(-50,-6.5/FT,100,6.5/FT-hz);
    c.fillRect(-50,hz,100,6.5/FT-hz);
    c.fillRect(-50,-hz,50-hx,50); c.fillRect(hx,-hz,50-hx,50);
    c.strokeStyle='#fff3d9'; c.lineWidth=s.lineWidth; c.lineCap='butt';
    c.strokeRect(-hx,-hz,hx*2,hz*2);
    c.beginPath(); c.moveTo(0,-hz); c.lineTo(0,hz); c.stroke();
    const arc=(x,y,r,a,b)=>{c.beginPath();c.arc(x,y,r,a,b);c.stroke();};
    arc(0,0,s.circleRadius,0,Math.PI*2);
    arc(0,0,2,0,Math.PI*2);
    for (const side of [-1,1]) {
      c.save(); c.scale(side,1);
      c.fillStyle='#786185'; c.fillRect(s.freeThrow,-8,hx-s.freeThrow,16);
      c.strokeRect(s.freeThrow,-8,hx-s.freeThrow,16);
      // Solid free-throw semicircle faces midcourt; dashed half is in the lane.
      arc(s.freeThrow,0,6,Math.PI/2,Math.PI*1.5);
      c.setLineDash([.65,.65]); arc(s.freeThrow,0,6,-Math.PI/2,Math.PI/2); c.setLineDash([]);
      const theta=Math.asin(s.corner/s.threeRadius);
      const joinX=s.hoop-Math.sqrt(s.threeRadius**2-s.corner**2);
      c.beginPath(); c.moveTo(hx,-s.corner); c.lineTo(joinX,-s.corner);
      c.arc(s.hoop,0,s.threeRadius,Math.PI+theta,Math.PI-theta,true);
      c.lineTo(hx,s.corner); c.stroke();
      c.beginPath(); c.moveTo(s.backboard,-s.restrictedRadius);
      c.lineTo(s.hoop,-s.restrictedRadius);
      c.arc(s.hoop,0,s.restrictedRadius,-Math.PI/2,-Math.PI*1.5,true);
      c.lineTo(s.backboard,s.restrictedRadius); c.stroke();
      // Lane spaces and court hash marks share the same line width.
      for(const z of [-8,8])for(const x of [40,37,34,31]) {
        c.beginPath();c.moveTo(x,z);c.lineTo(x,z+Math.sign(z)*.5);c.stroke();
      }
      for(const z of [-25,25]){c.beginPath();c.moveTo(19,z);c.lineTo(19,z-Math.sign(z)*3);c.stroke();}
      c.restore();
    }
  });
  box(25,.12,14,0,.25,s.centerZ,M.purple,.16);
  const floor=box(24,.035,13,0,.33,s.centerZ,new T.MeshStandardMaterial({map,roughness:.62,metalness:0}),.025);
  floor.name='arena-court';

  const structure=new T.MeshStandardMaterial({color:'#e3dccd',roughness:.67,metalness:.12});
  const padding=new T.MeshStandardMaterial({color:'#4e395f',roughness:.92});
  const ink=new T.MeshStandardMaterial({color:'#272131',roughness:.8});
  const white=new T.MeshStandardMaterial({color:'#fff3dc',roughness:.7});
  const rimMat=new T.MeshStandardMaterial({color:'#d97737',roughness:.52,metalness:.25});
  const glass=new T.MeshStandardMaterial({color:'#e6ede7',transparent:true,opacity:.16,roughness:.22,metalness:.1,side:T.DoubleSide,depthWrite:false});

  // One mirrored assembly per end: local -X faces the playing surface.
  for(const side of [-1,1]) {
    const goal=new T.Group();goal.name=side<0?'goal-left':'goal-right';
    goal.position.set(side*s.backboard*FT,s.floorY,s.centerZ);
    if(side<0)goal.rotation.y=Math.PI;scene.add(goal);
    const solid=(w,h,d,x,y,z,m,r=.025)=>box(w,h,d,x,y,z,m,r,goal);
    const beam=(a,b,width,depth,material)=>{
      const v=new T.Vector3(...a),w=new T.Vector3(...b),delta=w.clone().sub(v);
      const o=solid(width,delta.length(),depth,0,0,0,material);
      o.position.copy(v.add(w).multiplyScalar(.5));
      o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());return o;
    };
    // The apron is lower than the playing floor. Ground the wheels there while
    // keeping the rim height measured from the actual playing surface.
    const groundOffset=.29-s.floorY-.01;
    solid(1.25,.35,1.12,2.425,.21+groundOffset,0,padding,.10);
    solid(1.05,.10,1,2.45,.43+groundOffset,0,structure,.035);
    solid(.36,1.98,.54,2.67,1.46+groundOffset,0,structure,.05);
    solid(.23,1.75,.66,2.43,1.29+groundOffset,0,padding,.055);
    beam([2.64,2.41,0],[.12,2.77,0],.21,.28,structure);
    for(const z of [-.22,.22])beam([2.66,1.52,z],[.28,2.76,z],.07,.07,ink);
    for(const z of [-.32,.32])solid(.10,.34,.055,.07,2.73,z,structure,.012);
    for(const x of [2.02,2.82])for(const z of [-.49,.49]){
      const wheel=mesh(new T.CylinderGeometry(.095,.095,.09,12),ink,x,.105+groundOffset,z,goal);wheel.rotation.x=Math.PI/2;
    }
    // Transparent 6 × 3.5 ft backboard, lower edge at 9 ft.
    const pane=mesh(new T.PlaneGeometry(6*FT,3.5*FT),glass,0,10.75*FT,0,goal);
    pane.rotation.y=-Math.PI/2;pane.castShadow=false;
    for(const y of [9*FT,12.5*FT])solid(.045,.028,6*FT+.028,-.006,y,0,white,.006);
    for(const z of [-3*FT,3*FT])solid(.045,3.5*FT,.028,-.006,10.75*FT,z,white,.006);
    // Shooter's target rectangle: 24 × 18 inches, bottom level with rim.
    for(const y of [10*FT,11.5*FT])solid(.012,.018,2*FT,-.027,y,0,white,.003);
    for(const z of [-FT,FT])solid(.012,1.5*FT,.018,-.027,10.75*FT,z,white,.003);
    solid(.12,.09,6*FT+.08,.018,9*FT-.03,0,padding,.02);
    const rimX=(s.hoop-s.backboard)*FT, rimY=s.rimHeight*FT;
    solid(.16,.07,.12,-.08,rimY-.04,0,rimMat,.012);
    // Torus centre lowered by its tube radius, keeping the upper rim at 10 ft.
    const rim=mesh(new T.TorusGeometry(s.rimRadius*FT+.009,.009,8,48),rimMat,rimX,rimY-.009,0,goal);rim.rotation.x=Math.PI/2;
    // Diamond-woven net: one instanced mesh per goal, no added shadow pass.
    const pieces=[],rings=4,count=12;
    for(let row=0;row<rings;row++)for(let i=0;i<count;i++)for(const direction of [0,1]) {
      const a=i*Math.PI*2/count+(row%2)*Math.PI/count;
      const b=a+(direction?1:-1)*Math.PI/count;
      const r1=.18-row*.019,r2=.18-(row+1)*.019;
      pieces.push([[rimX+Math.cos(a)*r1,rimY-.026-row*.09,Math.sin(a)*r1],
        [rimX+Math.cos(b)*r2,rimY-.026-(row+1)*.09,Math.sin(b)*r2]]);
    }
    const net=new T.InstancedMesh(new T.CylinderGeometry(.006,.006,1,5),white,pieces.length),dummy=new T.Object3D();
    pieces.forEach(([a,b],i)=>{const p=new T.Vector3(...a),q=new T.Vector3(...b),delta=q.clone().sub(p);dummy.position.copy(p.add(q).multiplyScalar(.5));dummy.scale.set(1,delta.length(),1);dummy.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());dummy.updateMatrix();net.setMatrixAt(i,dummy.matrix);});
    goal.add(net);
    goal.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=true;}});
  }
  return {floor,spec:s};
}
