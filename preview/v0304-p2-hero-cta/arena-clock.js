import * as T from './three.module.js';

// One minute-resolution canvas, no second hand, lights, or per-frame allocations.
export function createArenaClock(scene){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;
 const c=canvas.getContext('2d'),texture=new T.CanvasTexture(canvas);texture.colorSpace=T.SRGBColorSpace;
 const clock=new T.Mesh(new T.CircleGeometry(1.05,64),new T.MeshBasicMaterial({map:texture,toneMapped:false}));
 // One six-unit roof/column bay toward the entrance (screen-left at Court reveal).
 clock.name='los-angeles-wall-clock';clock.position.set(-17.52,6.5,-33);clock.rotation.y=Math.PI/2;scene.add(clock);
 const formatter=new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',hour:'numeric',minute:'2-digit',hourCycle:'h23'});
 let lastMinute=-1;
 function update(now=Date.now()){
  const minute=Math.floor(now/60000);if(minute===lastMinute)return;lastMinute=minute;
  const parts=formatter.formatToParts(new Date(now)),hour=Number(parts.find(p=>p.type==='hour').value),min=Number(parts.find(p=>p.type==='minute').value);
  c.clearRect(0,0,512,512);c.fillStyle='#342c43';c.beginPath();c.arc(256,256,255,0,Math.PI*2);c.fill();
  c.fillStyle='#f2eadb';c.beginPath();c.arc(256,256,232,0,Math.PI*2);c.fill();
  c.save();c.translate(256,256);c.strokeStyle='#342c43';
  for(let i=0;i<60;i++){c.save();c.rotate(i*Math.PI/30);c.lineWidth=i%5===0?6:2;c.beginPath();c.moveTo(0,-218);c.lineTo(0,i%5===0?-201:-210);c.stroke();c.restore();}
  c.fillStyle='#342c43';c.textAlign='center';c.textBaseline='middle';c.font='600 32px Arial';
  for(let i=1;i<=12;i++){const a=i*Math.PI/6;c.fillText(String(i),Math.sin(a)*174,-Math.cos(a)*174);}
  c.font='16px Arial';c.fillText('LOS ANGELES',0,83);
  function hand(angle,length,width){c.save();c.rotate(angle);c.lineWidth=width;c.lineCap='round';c.beginPath();c.moveTo(0,13);c.lineTo(0,-length);c.stroke();c.restore();}
  hand((hour%12+min/60)*Math.PI/6,112,12);hand(min*Math.PI/30,158,8);
  c.fillStyle='#b18a45';c.beginPath();c.arc(0,0,12,0,Math.PI*2);c.fill();c.restore();texture.needsUpdate=true;
 }
 update();return {update,clock};
}
