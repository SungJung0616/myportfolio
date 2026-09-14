import React, { useEffect, useRef, useState } from 'react';

export default function PlayerAvatar() {
  const mount = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let disposed = false, cleanup = () => {};
    import('three').then(T => {
      if (disposed) return;
      const host = mount.current;
      let renderer;
      try { renderer = new T.WebGLRenderer({ alpha: true, antialias: true }); } catch (_) { setFailed(true); return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
      host.appendChild(renderer.domElement);
      const scene = new T.Scene(), camera = new T.PerspectiveCamera(35, 1, .1, 100);
      camera.position.set(0, 2.5, 8); camera.lookAt(0, 1.65, 0);
      scene.add(new T.HemisphereLight(0xffefcf, 0x3a175c, 3));
      const light = new T.DirectionalLight(0xffd782, 4); light.position.set(3, 5, 4); scene.add(light);
      const rim = new T.DirectionalLight(0x9861ff, 5); rim.position.set(-3, 2, -2); scene.add(rim);
      const player = new T.Group(); scene.add(player);
      const material = color => new T.MeshStandardMaterial({ color, roughness: .65 });
      const skin = material('#b97850'), gold = material('#f5c447'), purple = material('#542583'), dark = material('#201724');
      const mesh = (geometry, mat, x, y, z = 0, parent = player) => { const m = new T.Mesh(geometry, mat); m.position.set(x,y,z); parent.add(m); return m; };
      const limb = (x,y,length,radius,mat,angle=0) => { const m=mesh(new T.CylinderGeometry(radius,radius*.9,length,16),mat,x,y); m.rotation.z=angle; return m; };
      mesh(new T.CylinderGeometry(.43,.35,.95,8),gold,0,2.03);
      mesh(new T.BoxGeometry(.75,.46,.48),purple,0,1.36);
      [-1,1].forEach(side => { limb(side*.22,.85,.72,.135,skin); limb(side*.21,.36,.28,.14,dark); mesh(new T.BoxGeometry(.3,.18,.48),gold,side*.22,.17,.1); limb(side*.53,2.02,.79,.12,skin,side*.18); mesh(new T.SphereGeometry(.135,16,12),skin,side*.6,1.61); });
      limb(0,2.64,.22,.14,skin);
      const head=mesh(new T.SphereGeometry(.32,24,20),skin,0,2.94); head.scale.set(.85,1.1,.88);
      mesh(new T.SphereGeometry(.29,24,12,0,Math.PI*2,0,Math.PI*.52),dark,0,3.05);
      [-1,1].forEach(side=>mesh(new T.SphereGeometry(.028,12,8),dark,side*.105,2.97,.25));
      const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;const ctx=canvas.getContext('2d');ctx.fillStyle='#f5c447';ctx.fillRect(0,0,256,256);ctx.fillStyle='#542583';ctx.textAlign='center';ctx.font='bold 31px Arial';ctx.fillText('LOS ANGELES',128,70);ctx.font='bold 112px Arial';ctx.fillText('77',128,184);
      const texture=new T.CanvasTexture(canvas);mesh(new T.PlaneGeometry(.55,.64),new T.MeshStandardMaterial({map:texture,side:T.DoubleSide}),0,2.1,.409);
      const ball=mesh(new T.SphereGeometry(.27,28,20),material('#cb6b24'),.72,1.64,.13);
      for(let i=0;i<3;i++){const seam=new T.Mesh(new T.TorusGeometry(.271,.009,6,64),dark);seam.rotation.set(i*Math.PI/2,i===2?Math.PI/2:0,0);ball.add(seam);}
      const floor=mesh(new T.CylinderGeometry(1.45,1.5,.07,64),purple,0,.025,0,scene);
      const ring=mesh(new T.TorusGeometry(1.36,.015,8,100),gold,0,.07,0,scene);ring.rotation.x=Math.PI/2;
      let target=0, frame; const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
      const pointer=e=>{const b=host.getBoundingClientRect();target=((e.clientX-b.left)/b.width-.5)*.7;};
      const reset=()=>{target=0;}; host.addEventListener('pointermove',pointer);host.addEventListener('pointerleave',reset);
      const resize=()=>{const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};const observer=new ResizeObserver(resize);observer.observe(host);resize();
      const start=performance.now();const draw=()=>{if(disposed)return;const t=(performance.now()-start)/1000;player.rotation.y+=(target-player.rotation.y)*.04;player.position.y=motion.matches?0:Math.sin(t*1.7)*.022;floor.rotation.y=.1;renderer.render(scene,camera);frame=requestAnimationFrame(draw);};draw();
      cleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();host.removeEventListener('pointermove',pointer);host.removeEventListener('pointerleave',reset);scene.traverse(o=>{o.geometry?.dispose();if(o.material){o.material.map?.dispose();o.material.dispose();}});renderer.dispose();renderer.domElement.remove();};
    }).catch(()=>{if(!disposed)setFailed(true);});
    return ()=>{disposed=true;cleanup();};
  }, []);
  return <div className="player-stage"><div ref={mount} className="player-canvas" role="img" aria-label="Stylized 3D avatar wearing a purple and gold number 77 basketball uniform" />{failed && <div className="avatar-fallback">SJ<br/><strong>77</strong></div>}<div className="player-caption"><span>HOME COURT / GARDENA, CA</span><strong>SUNG JUNG</strong><p>Lakers faithful. T1 loyal.</p></div></div>;
}
