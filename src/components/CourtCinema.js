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
      const textureCanvas=document.createElement('canvas');textureCanvas.width=256;textureCanvas.height=128;
      const ctx=textureCanvas.getContext('2d');ctx.fillStyle='#c7732b';ctx.fillRect(0,0,256,128);ctx.fillStyle='#9d4f22';
      for(let y=2;y<128;y+=5)for(let x=2;x<256;x+=5){ctx.beginPath();ctx.arc(x+(y%2),y,.8,0,Math.PI*2);ctx.fill();}
      const tex=new T.CanvasTexture(textureCanvas);tex.colorSpace=T.SRGBColorSpace;
      const ball=add(new T.SphereGeometry(.23,40,28),mat('#ffffff',{map:tex,roughness:.88}),-3,1,4);ball.castShadow=true;
      const rubber=mat('#34202a');for(let i=0;i<3;i++){const seam=add(new T.TorusGeometry(.231,.006,5,80),rubber,0,0,0,ball);seam.rotation.set(i===0?Math.PI/2:0,i===1?Math.PI/2:0,i===2?.6:0);}
      const halo=add(new T.RingGeometry(.28,.35,48),gold,0,.025,.1);halo.rotation.x=-Math.PI/2;halo.visible=false;
      const resize=()=>{const w=host.current.clientWidth,h=host.current.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};
      const observer=new ResizeObserver(resize);observer.observe(host.current);resize();
      let frame;const start=performance.now();const look=new T.Vector3();
      const render=()=>{if(closed)return;const t=(performance.now()-start)/1000;let x,y,z;
        if(t<1.55){const u=t/1.55;x=-3*(1-u);y=1.5+(3.32-1.5)*u+3.8*4*u*(1-u);z=4*(1-u)-.16*u;}
        else if(t<2.55){const u=(t-1.55);const a=u*Math.PI*4;const r=.32*(1-u*.65);x=Math.sin(a)*r;y=3.29+.06*Math.sin(a*2);z=-.16+Math.cos(a)*r;}
        else if(t<3.35){const u=(t-2.55)/.8;x=0;y=3.29-3.06*u*u;z=-.16+u*.5;}
        else {const u=Math.min(1,(t-3.35)/1.5);x=.05*u;y=.23+5.6*u-3.4*u*u;z=.34+7.3*u*u;ball.scale.setScalar(1+Math.max(0,u-.65)*5);}
        ball.position.set(x,y,z);ball.rotation.set(t*2,t*1.3,t*.7);
        if(t>3.32&&t<3.45)ball.scale.set(1.12,.82,1.12);
        net.scale.y=1+(t>2.5&&t<3.1?Math.sin((t-2.5)/.6*Math.PI)*.3:0);net.rotation.z=t>2.5?Math.sin((t-2.5)*20)*Math.exp(-(t-2.5)*5)*.07:0;
        hoop.position.y=3.08+(t>1.55&&t<2.55?Math.sin(t*45)*.008:0);
        halo.visible=t>3.35&&t<3.7;halo.scale.setScalar(1+Math.max(0,t-3.35)*4);
        const chase=Math.max(0,Math.min(1,(t-2.6)/1.15));camera.position.set(1.8*(1-chase),3.7-1.7*chase,8.4-.5*chase);look.set(0,2.65-.7*chase,0);camera.lookAt(look);
        renderer.render(scene,camera);
        if(t>=4.95){onFinish();return;}frame=requestAnimationFrame(render);
      };
      const canvas=renderer.domElement;const lost=e=>{e.preventDefault();onUnavailable();};canvas.addEventListener('webglcontextlost',lost);
      dispose=()=>{cancelAnimationFrame(frame);observer.disconnect();canvas.removeEventListener('webglcontextlost',lost);scene.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});tex.dispose();renderer.dispose();canvas.remove();};
      onReady();render();
    }).catch(()=>{if(!closed)onUnavailable();});
    return()=>{closed=true;dispose();};
  }, [onReady,onFinish,onUnavailable]);
  return <div className="court-cinema" ref={host} aria-hidden="true" />;
}
