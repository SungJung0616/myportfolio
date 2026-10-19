import * as T from './three.module.js';
import {filmProjects} from './film-data.js';
import {getSelectedProject,selectProject} from './project-catalog.js';
import {openWorkProject} from './project-showcase.js';
import {projectMedia,createProjectVideo,releaseProjectVideo} from './project-media.js';

export function createFilmArchive({screen,room,camera,renderer,onExit}){
 let active=false,selected=filmProjects[0],playing=false,chosen=false,blend=0;
 let selectedMedia=projectMedia(selected);
 let dirty=true,showMedia=false,poster=null,video=null,mediaToken=0,lastVideoTime=-1;
 let focusOnEntry=false,chromeVisible=false,pickerPage=0;
 const lamps=room.children.filter(o=>o.isPointLight);
 const canvas=document.createElement('canvas');canvas.width=1440;canvas.height=620;
 const c=canvas.getContext('2d'),map=new T.CanvasTexture(canvas);map.colorSpace=T.SRGBColorSpace;
 screen.material=new T.MeshBasicMaterial({map,toneMapped:false});
 const bar=document.createElement('div');bar.className='film-bar';bar.hidden=true;
 bar.innerHTML='<strong>The Film Lab</strong><button id="film-exit" type="button">← Back to court</button>';
 const controls=document.createElement('div');controls.className='film-controls';controls.hidden=true;
 controls.innerHTML='<p id="film-status" role="status" hidden></p><div class="film-console"><div class="film-project-navigation"><button id="film-previous" type="button" aria-label="Previous project">←</button><div class="film-current-project" aria-live="polite"><strong id="film-current-title"></strong><span id="film-current-count"></span></div><button id="film-next" type="button" aria-label="Next project">→</button></div><div class="film-console-actions"><button id="film-all-projects" type="button" aria-expanded="false" aria-controls="film-project-picker">All projects</button><div class="film-control-row"><button id="film-play" type="button">Preview</button><button id="film-about" type="button">Explore Project</button></div></div></div><div id="film-ended" hidden><button id="film-replay" type="button">Replay</button></div>';
 const picker=document.createElement('section');picker.id='film-project-picker';picker.className='film-project-picker';picker.hidden=true;
 picker.setAttribute('popover','auto');picker.setAttribute('role','dialog');picker.setAttribute('aria-labelledby','film-picker-title');
 picker.innerHTML='<div class="film-picker-heading"><div><h2 id="film-picker-title">Choose a project.</h2><p>Put something new on the screen.</p></div><button id="film-picker-close" type="button" aria-label="Close project selection">×</button></div><div class="film-project-grid" role="group" aria-label="Film Lab projects"></div><div class="film-picker-pages"><button id="film-page-previous" type="button">← Previous</button><span id="film-page-count" aria-live="polite"></span><button id="film-page-next" type="button">Next →</button></div>';
 document.body.append(bar,controls,picker);
 const q=s=>controls.querySelector(s);
 q('#film-all-projects').setAttribute('aria-haspopup','dialog');
 const pickerOpen=()=>!picker.hidden;
 const pageSize=()=>innerHeight<560?2:innerWidth<700?4:6;
 function closePicker({focus=false}={}){
  if(!pickerOpen())return;
  if(picker.hidePopover&&picker.matches(':popover-open'))picker.hidePopover();
  picker.hidden=true;q('#film-all-projects').setAttribute('aria-expanded','false');
  if(focus&&chromeVisible)q('#film-all-projects').focus({preventScroll:true});
 }
 function renderPicker(){
  const size=pageSize(),pages=Math.ceil(filmProjects.length/size);pickerPage=Math.max(0,Math.min(pages-1,pickerPage));
  const grid=picker.querySelector('.film-project-grid');grid.replaceChildren();grid.dataset.columns=size===6?'3':'2';
  filmProjects.slice(pickerPage*size,(pickerPage+1)*size).forEach(project=>{
   const button=document.createElement('button');button.type='button';button.dataset.film=project.id;button.setAttribute('aria-pressed',String(selected.id===project.id));
   const preview=projectMedia(project).poster;
   if(preview){const image=document.createElement('img');image.src=preview;image.alt='';image.decoding='async';image.onerror=()=>image.remove();button.append(image);}
   else{const fallback=document.createElement('span');fallback.className='film-picker-placeholder';fallback.textContent='Project overview';button.append(fallback);}
   const title=document.createElement('strong');title.textContent=project.title;
   const type=document.createElement('span');type.className='film-picker-type';type.textContent=project.type.split(' · ')[0];
   button.append(title,type);button.onclick=()=>{select(project);closePicker({focus:true});};grid.append(button);
  });
  picker.querySelector('#film-page-count').textContent=`${pickerPage+1} / ${pages}`;
  picker.querySelector('#film-page-previous').disabled=pickerPage===0;picker.querySelector('#film-page-next').disabled=pickerPage===pages-1;
 }
 function openPicker(){
  if(!chromeVisible)return;video?.pause();pickerPage=Math.floor(filmProjects.indexOf(selected)/pageSize());renderPicker();picker.hidden=false;
  if(picker.showPopover)picker.showPopover();
  q('#film-all-projects').setAttribute('aria-expanded','true');picker.querySelector('[aria-pressed="true"]')?.focus({preventScroll:true});
 }
 q('#film-all-projects').onclick=()=>pickerOpen()?closePicker({focus:true}):openPicker();
 picker.querySelector('#film-picker-close').onclick=()=>closePicker({focus:true});
 for(const [id,delta]of [['film-page-previous',-1],['film-page-next',1]])picker.querySelector('#'+id).onclick=()=>{pickerPage+=delta;renderPicker();picker.querySelector('[data-film]')?.focus({preventScroll:true});};
 picker.addEventListener('toggle',event=>{if(event.newState==='closed'){picker.hidden=true;q('#film-all-projects').setAttribute('aria-expanded','false');}});
 // Selection never owns the wheel. Dismiss the chooser and let the native event
 // continue to the document; no synthetic scrolling or preventDefault is needed.
 addEventListener('wheel',()=>closePicker(),{passive:true});
 addEventListener('touchmove',()=>closePicker(),{passive:true});
 addEventListener('resize',()=>{if(pickerOpen())renderPicker();});
 document.addEventListener('pointerdown',event=>{if(pickerOpen()&&!picker.contains(event.target)&&event.target!==q('#film-all-projects'))closePicker();});
 function stepProject(delta){select(filmProjects[(filmProjects.indexOf(selected)+delta+filmProjects.length)%filmProjects.length]);}
 q('#film-previous').onclick=()=>stepProject(-1);q('#film-next').onclick=()=>stepProject(1);
 // Direct navigation may move keyboard focus; wheel re-entry must not steal it.
 window.addEventListener('portfolio:navigate',event=>{closePicker();focusOnEntry=event.detail.id==='film';});

 function notify(message){q('#film-status').textContent=message;q('#film-status').hidden=!message;}
 function updateControls(){
  const play=q('#film-play'),label=!chosen?'Choose a project':playing?'Pause':selectedMedia.video?'Play demo':'Preview';
  play.textContent=label;play.dataset.playing=String(playing);play.dataset.image=String(!selectedMedia.video);
  play.hidden=chosen&&!selectedMedia.video&&!selectedMedia.poster;
  play.setAttribute('aria-label',label+(chosen?' — '+selected.title:''));
  q('#film-about').setAttribute('aria-label','Explore '+selected.title);
  q('#film-about').hidden=!chosen;
  q('#film-current-title').textContent=selected.title;
  q('#film-current-count').textContent=`${filmProjects.indexOf(selected)+1} / ${filmProjects.length}`;
 }
 function lines(text,x,y,width,size=26,lineHeight=34,maxLines=3){
  c.font=size+'px "Segoe UI", Arial, sans-serif';
  const words=String(text||'').split(/\s+/);let line='',row=0;
  for(let i=0;i<words.length;i++){
   const word=words[i];
   const next=line?line+' '+word:word;
   if(c.measureText(next).width>width&&line){
    if(row===maxLines-1){c.fillText(line+'…',x,y+row*lineHeight);return;}
    c.fillText(line,x,y+row*lineHeight);row++;line=word;
   }else line=next;
  }
  if(row<maxLines)c.fillText(line,x,y+row*lineHeight);
 }
 function menu(){
  c.textAlign='center';c.fillStyle='#e6c88f';c.font='600 42px "Segoe UI", Arial';c.fillText('THE FILM LAB',720,70);
  c.fillStyle='#f4eddf';c.font='27px "Segoe UI", Arial';c.fillText('Study the play. See what I’ve built.',720,116);
  c.fillStyle='#c9bacf';c.font='30px "Segoe UI", Arial';c.fillText('Choose a project from the screening console.',720,350);
 }
 function draw(){
  c.fillStyle='#261d31';c.fillRect(0,0,1440,620);
  if(!chosen){menu();}
  else{
   c.textAlign='left';c.fillStyle='#dec18d';c.font='600 23px "Segoe UI", Arial';c.fillText('THE FILM LAB',50,44);
   c.fillStyle='#f7efdf';c.font='600 36px "Segoe UI", Arial';c.fillText(selected.title,50,95);
   const source=showMedia&&selectedMedia.video&&video?.readyState>=2?video:showMedia&&poster?.complete&&poster.naturalWidth?poster:null;
   if(source){
    const w=source.videoWidth||source.naturalWidth,h=source.videoHeight||source.naturalHeight,k=Math.min(1320/w,402/h);
    c.drawImage(source,(1440-w*k)/2,120+(402-h*k)/2,w*k,h*k);
   }else{
    c.fillStyle='#e7ddec';lines(selected.description,72,208,1260,34,48,3);
    c.fillStyle='#d4bd90';c.font='600 24px "Segoe UI", Arial';
    c.fillText(selectedMedia.video?'Sanitized user recording — press Play demo.':selectedMedia.poster?'Project image available — press Preview.':'Sanitized user recording not yet provided.',72,410);
    c.fillStyle='#c9bacf';c.font='26px "Segoe UI", Arial';c.fillText('Explore Project for the documented approach and evidence.',72,461);
   }
   c.fillStyle='#201827';c.fillRect(0,548,1440,72);c.fillStyle='#e0d5e5';c.font='22px "Segoe UI", Arial';
   const note=selectedMedia.video?'Muted user demo'+(selectedMedia.duration?' · '+selectedMedia.duration+' seconds':'')+' · Shows behavior, not operational impact':selectedMedia.poster?'Actual project screenshot · Not a video demonstration':'Documented project · recording pending';
   lines(note,50,586,1340,21,25,1);
  }
  map.needsUpdate=true;dirty=false;
 }
 function releaseMedia(){
  mediaToken++;playing=false;lastVideoTime=-1;
  if(video){releaseProjectVideo(video);video=null;}
  poster=null;
 }
 function loadMedia(){
  releaseMedia();const token=mediaToken;
  if(selectedMedia.poster){const next=new Image();poster=next;next.onload=()=>{if(token===mediaToken)dirty=true;};next.onerror=()=>{if(token===mediaToken){poster=null;selectedMedia.poster=null;dirty=true;updateControls();notify('The project image could not load. Explore Project for available details.');}};next.src=selectedMedia.poster;}
  if(selectedMedia.video){
   const next=createProjectVideo(selectedMedia,{isActive:()=>active&&chosen&&!modalOpen(),observeVisibility:false});video=next;
   const current=()=>token===mediaToken&&video===next;
   next.addEventListener('playing',()=>{if(!current())return;playing=true;dirty=true;q('#film-ended').hidden=true;notify(selectedMedia.caption+' · Muted');updateControls();});
   next.addEventListener('pause',()=>{if(!current())return;playing=false;dirty=true;updateControls();});
   next.addEventListener('ended',()=>{if(!current())return;playing=false;dirty=true;q('#film-ended').hidden=false;updateControls();});
   next.addEventListener('loadeddata',()=>{if(current())dirty=true;});
   next.addEventListener('error',()=>{if(current()){selectedMedia.video=null;playing=false;dirty=true;updateControls();notify('The recording is unavailable. Static project information remains available.');}});
  }
 }
 function select(project){
  selected=project;selectedMedia=projectMedia(project);chosen=true;showMedia=!!selectedMedia.poster;loadMedia();notify('');q('#film-ended').hidden=true;
  selectProject(project.id,'film');
  updateControls();dirty=true;
 }
 window.addEventListener('portfolio:project-selected',event=>{
  if(event.detail.origin==='film'||!chosen)return;
  const project=filmProjects.find(p=>p.id===event.detail.id);
  if(project&&project.id!==selected.id)select(project);
 });
 const modalOpen=()=>!!document.querySelector('dialog[open]');
 q('#film-about').onclick=()=>{
  video?.pause();const returnProject=selected,returnBlend=blend;
  openWorkProject(selected.id,{origin:'film',returnToFilm:()=>{
   select(returnProject);blend=returnBlend;window.navigatePortfolio?.('film');
   requestAnimationFrame(()=>q('#film-about').focus({preventScroll:true}));
  }});
 };
 q('#film-play').onclick=async()=>{
  if(!chosen){openPicker();return;}showMedia=true;notify('');dirty=true;
  if(!selectedMedia.video){if(!selectedMedia.poster)notify('No eligible user recording is available. Explore Project to see the documented work.');return;}
  if(playing){video?.pause();return;}
  const current=video,token=mediaToken;
  try{await current.play();if(token!==mediaToken||!active)current.pause();}
  catch{if(token===mediaToken&&active)notify('Playback is unavailable. Explore Project for the live site and other links.');}
 };
 q('#film-replay').onclick=()=>{if(video){video.currentTime=0;q('#film-play').click();}};
 function exit({returnToCourt=true}={}){
  if(!active)return;active=false;video?.pause();playing=false;
  closePicker();chromeVisible=false;bar.hidden=controls.hidden=true;
  document.body.classList.remove('film-mode');renderer.domElement.style.cursor='';dirty=true;
  if(window.filmState)window.filmState={...window.filmState,active:false,playing:false};
  if(returnToCourt)onExit();
 }
 bar.querySelector('button').onclick=()=>exit();
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&pickerOpen()){e.preventDefault();closePicker({focus:true});return;}if(e.key==='Escape'&&!e.defaultPrevented&&active&&!modalOpen()&&!e.target.closest?.('dialog'))exit();});
 const screenAnchor=new T.Vector3();let interfacePosition='';
 function placeInterface(){
  if(!active||innerWidth<=650){if(interfacePosition){controls.style.removeProperty('left');controls.style.removeProperty('top');interfacePosition='';}return;}
  screen.localToWorld(screenAnchor.set(0,-1.55,0));screenAnchor.project(camera);
  const screenX=T.MathUtils.clamp((screenAnchor.x+1)*innerWidth/2,340,innerWidth-340);
  const screenY=T.MathUtils.clamp((1-screenAnchor.y)*innerHeight/2+18,innerHeight*.48,innerHeight-190);
  const next=[screenX,screenY].map(Math.round).join(',');if(next===interfacePosition)return;interfacePosition=next;
  controls.style.left=Math.round(screenX)+'px';controls.style.top=Math.round(screenY)+'px';
 }
 // Preserve the approved room camera and its transition from the existing rail.
 function applyCamera(weight=1){
  const railPosition=camera.position.clone(),railRotation=camera.quaternion.clone(),railFov=camera.fov;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches||document.querySelector('#reduce')?.checked;
  blend+=(Number(chosen)-blend)*(reduce?1:.075);const mobile=innerWidth<650;
  camera.position.set(-12,3.6,-49.8);camera.lookAt(new T.Vector3(-14+blend*2,3.55,-55.8));camera.fov=mobile?110:76;
  if(weight<1){camera.position.lerpVectors(railPosition,camera.position.clone(),weight);camera.quaternion.slerpQuaternions(railRotation,camera.quaternion.clone(),weight);camera.fov=T.MathUtils.lerp(railFov,camera.fov,weight);}
  camera.updateProjectionMatrix();camera.updateMatrixWorld(true);room.updateMatrixWorld(true);
  placeInterface();
 }
 function update(p,{allowEntry=true}={}){
  // Small positional hysteresis prevents threshold jitter, without timers or scroll locks.
  if(active&&(!allowEntry||p<=.99))exit({returnToCourt:false});
  if(!active&&allowEntry&&p>.995){active=true;const shared=getSelectedProject();if(!chosen||shared&&filmProjects.includes(shared)&&shared.id!==selected.id)select(shared&&filmProjects.includes(shared)?shared:selected);updateControls();document.body.classList.add('film-mode');dirty=true;}
  const fullRoom=active&&document.querySelector('#reading-content').getBoundingClientRect().top>=innerHeight-1;
  if(fullRoom!==chromeVisible){chromeVisible=fullRoom;bar.hidden=controls.hidden=!fullRoom;if(!fullRoom){closePicker();video?.pause();}else if(focusOnEntry){bar.querySelector('button').focus({preventScroll:true});focusOnEntry=false;}}
  if(active&&playing&&video?.readyState>=2&&video.currentTime!==lastVideoTime){lastVideoTime=video.currentTime;dirty=true;}
  if(dirty)draw();
  lamps.forEach(l=>l.intensity+=((playing?8.5:15)-l.intensity)*.12);
  window.filmState={active,uiVisible:chromeVisible,phase:!allowEntry?'editorial':active?'inside':p>.95?'entering':'outside',selected:selected.id,playing,chosen,time:video?.currentTime||0,light:lamps[0]?.intensity,blend,view:chosen?'project':'menu'};
 }
 updateControls();draw();
 return{get active(){return active;},update,applyCamera,exit};
}
