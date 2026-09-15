import React, { useEffect, useRef } from 'react';

// Choreographed motion, with gravity-shaped flight and bounce segments.
export default function CourtCinema({ onReady, onFinish, onUnavailable }) {
  const host = useRef(null);
  useEffect(() => {
    let closed = false, dispose = () => {};
    import('three').then(T => {
      if (closed) return;
      let renderer;
      try { renderer = new T.WebGLRenderer({ antialias: true, alpha: false }); }
      catch (_) { onUnavailable(); return; }
      const scene = new T.Scene(); scene.background = new T.Color('#0c0813'); scene.fog = new T.Fog('#0c0813', 13, 32);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
      renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
      renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.3;
      host.current.appendChild(renderer.domElement);
      const camera = new T.PerspectiveCamera(46, 1, .04, 70);
      const mat = (color, extra = {}) => new T.MeshStandardMaterial({ color, roughness: .55, ...extra });
      const add = (geometry, material, x, y, z, parent = scene) => { const m = new T.Mesh(geometry, material); m.position.set(x,y,z); parent.add(m); return m; };
      const gold = mat('#edb63b'), purple = mat('#452060'), white = mat('#eae1d3');
      const toon = color => new T.MeshToonMaterial({color});
      const skin=toon('#c99068'), jersey=toon('#efb92f'), cloth=toon('#22212b'), trim=toon('#57298a');
      const shooter=new T.Group();shooter.position.set(0,0,4.6);scene.add(shooter);
      const torso=add(new T.CylinderGeometry(.32,.29,.7,24),jersey,0,1.42,0,shooter);torso.castShadow=true;
      add(new T.CylinderGeometry(.11,.12,.18,16),skin,0,1.86,0,shooter);
      const head=add(new T.SphereGeometry(.21,24,20),skin,0,2.08,0,shooter);head.scale.set(.86,1.12,.92);
      add(new T.SphereGeometry(.218,24,16,0,Math.PI*2,0,Math.PI*.48),cloth,0,2.16,0,shooter);
      const brim=add(new T.SphereGeometry(.21,20,12),cloth,0,2.17,-.19,shooter);brim.scale.set(1,.1,1);
      const numberCanvas=document.createElement('canvas');numberCanvas.width=256;numberCanvas.height=256;
      const nc=numberCanvas.getContext('2d');nc.fillStyle='#efb92f';nc.fillRect(0,0,256,256);nc.textAlign='center';nc.fillStyle='#57298a';nc.font='bold 30px Arial';nc.fillText('JUNG',128,60);nc.font='bold 120px Arial';nc.fillText('77',128,195);
      const numberTexture=new T.CanvasTexture(numberCanvas);numberTexture.colorSpace=T.SRGBColorSpace;
      add(new T.PlaneGeometry(.43,.5),new T.MeshToonMaterial({map:numberTexture}),0,1.45,.318,shooter);
      const joints=[];
      const segment=(radius,length,material,parent,y)=>{const m=add(new T.CapsuleGeometry(radius,length,6,12),material,0,y,0,parent);m.castShadow=true;return m;};
      for(const side of [-1,1]){
        const hip=new T.Group();hip.position.set(side*.18,1.06,0);shooter.add(hip);
        segment(.16,.32,cloth,hip,-.2);
        const knee=new T.Group();knee.position.y=-.43;hip.add(knee);segment(.145,.3,cloth,knee,-.2);
        const shoe=add(new T.SphereGeometry(.17,20,12),white,0,-.49,-.09,knee);shoe.scale.set(.85,.48,1.65);
        const sole=add(new T.SphereGeometry(.17,20,12),trim,0,-.54,-.09,knee);sole.scale.set(.89,.14,1.68);
        const shoulder=new T.Group();shoulder.position.set(side*.35,1.68,0);shooter.add(shoulder);
        segment(.105,.2,white,shoulder,-.12);segment(.075,.25,skin,shoulder,-.25);
        const elbow=new T.Group();elbow.position.y=-.42;shoulder.add(elbow);segment(.065,.28,skin,elbow,-.2);
        const hand=add(new T.SphereGeometry(.085,16,12),skin,0,-.41,0,elbow);hand.scale.set(.8,1.2,.6);
        joints.push({hip,knee,shoulder,elbow,side});
      }
      scene.add(new T.HemisphereLight('#bba5ed', '#332116', 1.6));
      const spot = new T.SpotLight('#ffe1a5', 100, 28, .55, .7, 1); spot.position.set(1,8,4); spot.target.position.set(0,0,0); spot.castShadow = true; spot.shadow.mapSize.set(1024,1024); scene.add(spot,spot.target);
      const side = new T.PointLight('#8851eb', 35, 18); side.position.set(-4,4,-2); scene.add(side);
      const floor = add(new T.PlaneGeometry(22,26),mat('#805736',{roughness:.38}),0,0,2); floor.rotation.x=-Math.PI/2; floor.receiveShadow=true;
      for(let x=-10;x<=10;x+=.65){const seam=add(new T.PlaneGeometry(.012,26),mat('#503722'),x,.002,2);seam.rotation.x=-Math.PI/2;}
      const line = (points, color='#deb764', parent=scene) => { const geometry=new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p))); const l=new T.Line(geometry,new T.LineBasicMaterial({color}));parent.add(l);return l;};
      line([[-6,.015,-3],[6,.015,-3],[6,.015,12],[-6,.015,12],[-6,.015,-3]]);
      line([[-1.75,.02,-3],[-1.75,.02,3],[1.75,.02,3],[1.75,.02,-3]]);
      const arc=[];for(let i=0;i<=100;i++){const a=i/100*Math.PI;arc.push([Math.cos(a)*4.7,.02,Math.sin(a)*4.7-1]);}line(arc);
      const circle=[];for(let i=0;i<=90;i++){const a=i/90*Math.PI*2;circle.push([Math.cos(a)*1.75,.02,3+Math.sin(a)*1.75]);}line(circle);
      add(new T.BoxGeometry(.15,4.8,.15),purple,0,2.4,-1.2);
      add(new T.BoxGeometry(2.2,1.3,.08),mat('#bcc5d4',{transparent:true,opacity:.24,metalness:.3}),0,3.7,-.72);
      line([[-1.1,3.05,-.66],[-1.1,4.35,-.66],[1.1,4.35,-.66],[1.1,3.05,-.66],[-1.1,3.05,-.66]],'#eee9e0');
      line([[-.42,3.12,-.65],[-.42,3.65,-.65],[.42,3.65,-.65],[.42,3.12,-.65]],'#edb63b');
      const hoop=add(new T.TorusGeometry(.45,.035,12,72),mat('#f19023',{metalness:.45}),0,3.08,-.16);hoop.rotation.x=Math.PI/2;
      add(new T.BoxGeometry(.15,.06,.25),gold,0,3.08,-.59);
      const net=new T.Group();net.position.set(0,3.06,-.16);scene.add(net);
      for(let i=0;i<16;i++){const a=i/16*Math.PI*2;for(const twist of [-.23,.23])line([[.43*Math.cos(a),0,.43*Math.sin(a)],[.34*Math.cos(a+twist),-.3,.34*Math.sin(a+twist)],[.25*Math.cos(a+twist*2),-.63,.25*Math.sin(a+twist*2)]],'#d4cbdc',net);}
      for(let j=1;j<=3;j++){const r=.43-j*.06;const ring=add(new T.TorusGeometry(r,.007,4,48),white,0,-j*.2,0,net);ring.rotation.x=Math.PI/2;}
      const textureCanvas=document.createElement('canvas');textureCanvas.width=1024;textureCanvas.height=512;
      const ctx=textureCanvas.getContext('2d');ctx.fillStyle='#cf762c';ctx.fillRect(0,0,1024,512);
      for(let y=2;y<512;y+=6)for(let x=2;x<1024;x+=6){ctx.fillStyle=((x+y)%18===0)?'#ad5823':'#bb6427';ctx.beginPath();ctx.arc(x+(y%12?2:0),y,1.6,0,Math.PI*2);ctx.fill();}
      const tex=new T.CanvasTexture(textureCanvas);tex.colorSpace=T.SRGBColorSpace;
      const ball=add(new T.SphereGeometry(.23,64,40),mat('#ffffff',{map:tex,bumpMap:tex,bumpScale:.008,roughness:.83}),0,1.65,4.1);ball.castShadow=true;
      const rubber=mat('#492b1e');for(let i=0;i<3;i++){const seam=add(new T.TorusGeometry(.2305,.0025,5,100),rubber,0,0,0,ball);seam.rotation.set(i===0?Math.PI/2:0,i===1?Math.PI/2:0,i===2?.6:0);}
      const closeLight=new T.PointLight('#ffe0a9',4,5);closeLight.position.set(-1,3.3,7);scene.add(closeLight);
      const halo=add(new T.RingGeometry(.28,.35,48),gold,0,.025,.1);halo.rotation.x=-Math.PI/2;halo.visible=false;
      const resize=()=>{const w=host.current.clientWidth,h=host.current.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};
      const observer=new ResizeObserver(resize);observer.observe(host.current);resize();
      let frame;const start=performance.now();const look=new T.Vector3();
      const render=()=>{if(closed)return;const t=(performance.now()-start)/1000;let x,y,z;
        const clamp=u=>Math.max(0,Math.min(1,u));const smooth=u=>{u=clamp(u);return u*u*(3-2*u);};
        const lift=smooth((t-.45)/1.05),bend=Math.sin(clamp(t/1.5)*Math.PI)*.18;
        shooter.position.y=-bend;shooter.visible=t<4.35;
        joints.forEach(({hip,knee,shoulder,elbow,side})=>{hip.rotation.x=-bend*1.5;knee.rotation.x=bend*2.6;shoulder.rotation.x=1.05+lift*1.35;shoulder.rotation.z=-side*.32;elbow.rotation.x=1.2-lift*.85;});
        if(t<1.5){x=0;y=1.65+lift*.88-bend;z=4.08+lift*.12;}
        else if(t<2.9){const u=(t-1.5)/1.4;x=0;y=2.53+.77*u+1.7*4*u*(1-u);z=4.2-4.36*u;}
        else if(t<3.6){const u=(t-2.9)/.7,a=u*Math.PI*2,r=.25*Math.sin(u*Math.PI);x=Math.sin(a)*r;y=3.3+.035*Math.sin(a);z=-.16+Math.cos(a)*r;}
        else if(t<4.35){const u=(t-3.6)/.75;x=0;y=3.3-3.07*u*u;z=-.16+.5*u;}
        else{const u=clamp((t-4.35)/1.4);x=0;y=.23+5.65*u-3.74*u*u;z=.34+(camera.aspect<.85?7.33:6.73)*smooth(u);}
        ball.scale.setScalar(1);ball.position.set(x,y,z);const spin=t<1.5?0:t<4.35?(t-1.5)*2.3:6.55+(t-4.35)*.35;ball.rotation.set(spin,.45+spin*.4,.35);
        if(t>4.32&&t<4.43)ball.scale.set(1.05,.94,1.05);
        net.scale.y=1+(t>3.6&&t<4.2?Math.sin((t-3.6)/.6*Math.PI)*.3:0);net.rotation.z=t>3.6?Math.sin((t-3.6)*20)*Math.exp(-(t-3.6)*5)*.07:0;
        hoop.position.y=3.08+(t>2.9&&t<3.6?Math.sin(t*40)*.007:0);
        halo.visible=t>4.35&&t<4.65;halo.scale.setScalar(1+Math.max(0,t-4.35)*4);
        const track=smooth((t-1.5)/1.25),chase=smooth((t-3.6)/.75),narrow=camera.aspect<.85;
        camera.position.set((narrow?1.8:3.1)*(1-track)+1.1*track*(1-chase),2.9+.8*track-1.5*chase,(narrow?11:9.5)-track*(narrow?2.2:1.3)-.7*chase);
        look.set(0,2+track*.8-chase*.65,2.7*(1-track));camera.lookAt(look);
        // Stay outside the ball; crossfade while its lit orange surface fills the frame.
        host.current.parentElement.style.opacity=String(1-smooth((t-5.65)/.3));
        renderer.render(scene,camera);
        if(t>=5.95){onFinish();return;}frame=requestAnimationFrame(render);
      };
      const canvas=renderer.domElement;const lost=e=>{e.preventDefault();onUnavailable();};canvas.addEventListener('webglcontextlost',lost);
      dispose=()=>{cancelAnimationFrame(frame);observer.disconnect();canvas.removeEventListener('webglcontextlost',lost);scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});tex.dispose();numberTexture.dispose();renderer.dispose();canvas.remove();};
      onReady();render();
    }).catch(()=>{if(!closed)onUnavailable();});
    return()=>{closed=true;dispose();};
  }, [onReady,onFinish,onUnavailable]);
  return <div className="court-cinema" ref={host} aria-hidden="true" />;
}
