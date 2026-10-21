// Isolated editorial panel for the three interactive Playbook cases.
export function createInteractivePlaybook(){
 const style=document.createElement('link');style.rel='stylesheet';style.href='interactive-playbook.css';document.head.append(style);
 const dialog=document.createElement('dialog');dialog.id='interactive-playbook';dialog.setAttribute('aria-labelledby','interactive-playbook-title');
 const bar=document.createElement('div');bar.className='interactive-playbook-bar';
 const title=document.createElement('h2');title.id='interactive-playbook-title';title.textContent='The Interactive Playbook';
 const close=document.createElement('button');close.type='button';close.textContent='Back to Arena ×';close.autofocus=true;
 const frame=document.createElement('iframe');frame.title='Three practical problem-solving plays';frame.setAttribute('loading','lazy');
 bar.append(title,close);dialog.append(bar,frame);document.body.append(dialog);
 const launch=document.createElement('button');launch.type='button';launch.id='open-interactive-playbook';launch.textContent='Open Interactive Playbook';
 document.querySelector('#project-controls>div').replaceChildren(launch);
 let trigger=null,loaded=false,pendingFrame=0;
 const signal=type=>frame.contentWindow?.postMessage({type},location.origin);
 function open(){if(dialog.open)return;trigger=document.activeElement;if(!loaded){frame.src='../p2-03b-playbook/?case=label&stage=0&embed=1';loaded=true;}dialog.showModal();signal('playbook:resume');close.focus({preventScroll:true});}
 close.onclick=()=>dialog.close();launch.onclick=open;
 window.addEventListener('portfolio:navigate',event=>{cancelAnimationFrame(pendingFrame);if(event.detail.id!=='playbook')return;const start=performance.now();function arrive(){if(Math.abs((window.arenaDiagnostics?.progress??0)-.83)<.004){open();return;}if(performance.now()-start<12000)pendingFrame=requestAnimationFrame(arrive);}pendingFrame=requestAnimationFrame(arrive);});
 dialog.addEventListener('close',()=>{signal('playbook:pause');trigger?.focus({preventScroll:true});});
 window.addEventListener('message',event=>{if(event.origin===location.origin&&event.source===frame.contentWindow&&event.data?.type==='playbook:close'&&dialog.open)dialog.close();});
 return {dialog,open};
}
