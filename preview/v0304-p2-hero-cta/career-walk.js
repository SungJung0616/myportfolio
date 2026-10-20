// Native scrolling remains the source of camera progress. Settle only gallery stops.
export function createCareerWalk({stops,railElement,isReduced}) {
 const points=stops.filter(s=>s.s===.26||Number.isInteger(s.careerIndex)||s.s===.55);
 let timer=0,settling=false,lastY=scrollY,lastInput=-Infinity,startY=scrollY,startIndex=-1,direction=0;
 const end=()=>railElement.offsetHeight-innerHeight;
 const blocked=()=>document.hidden||document.querySelector('dialog[open]')||document.body.classList.contains('welcome-active');
 function begin(){
  const now=performance.now();
  if(now-lastInput>200){
   startY=scrollY;const p=startY/end();
   startIndex=points.findIndex(s=>Math.abs(s.s-p)<.004);
  }
  lastInput=now;settling=false;clearTimeout(timer);
 }
 function settle(){
  if(blocked())return;
  const p=scrollY/end();if(p<.305||p>.535)return;
  let index=points.reduce((best,s,i)=>Math.abs(s.s-p)<Math.abs(points[best].s-p)?i:best,0);
  const delta=scrollY-startY;
  if(startIndex>=0&&Math.abs(delta)>12&&performance.now()-lastInput<1800){
   index=direction>0?Math.max(index,Math.min(points.length-1,startIndex+1)):Math.min(index,Math.max(0,startIndex-1));
  }
  const y=points[index].s*end();if(Math.abs(y-scrollY)<2)return;
  settling=true;scrollTo({top:y,behavior:isReduced()?'instant':'smooth'});
 }
 addEventListener('wheel',e=>{if(!blocked()&&e.deltaY){begin();direction=Math.sign(e.deltaY);}}, {passive:true});
 addEventListener('touchstart',()=>{if(!blocked())begin();},{passive:true});
 addEventListener('keydown',e=>{
  if(blocked()||e.target.closest('button,a,input,textarea,select,[contenteditable]'))return;
  if(['ArrowDown','PageDown',' ','ArrowUp','PageUp'].includes(e.key)){begin();direction=['ArrowUp','PageUp'].includes(e.key)?-1:1;}
 });
 addEventListener('scroll',()=>{
  if(Math.abs(scrollY-lastY)>.5)direction=Math.sign(scrollY-lastY);lastY=scrollY;
  clearTimeout(timer);
  timer=setTimeout(()=>{if(settling){settling=false;return;}settle();},180);
 },{passive:true});
 addEventListener('portfolio:navigate',()=>{clearTimeout(timer);settling=false;startIndex=-1;lastInput=-Infinity;});
 return {cancel(){clearTimeout(timer);settling=false;startIndex=-1;lastInput=-Infinity;}};
}
