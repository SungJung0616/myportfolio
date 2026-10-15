// Independently implemented interaction patterns; no gallery source code copied.
import {archive, skills} from './navigation-data.js';
const $ = s => document.querySelector(s);
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('ui-polish');
document.addEventListener('keydown', () => document.documentElement.dataset.input = 'keyboard');
document.addEventListener('pointerdown', () => document.documentElement.dataset.input = 'pointer');
const skip = document.createElement('a');
skip.className = 'skip-work'; skip.href = '#work'; skip.textContent = 'Skip to Work';
document.body.prepend(skip);
const notice = document.createElement('div'); notice.className = 'ui-notice';
notice.setAttribute('role','status'); notice.setAttribute('aria-live','polite'); document.body.append(notice);
let noticeTimer;
function announce(text) { clearTimeout(noticeTimer); notice.textContent=text; notice.classList.add('show'); noticeTimer=setTimeout(()=>notice.classList.remove('show'),3500); }

// Archive categories preserve the original classifications rather than relabeling projects.
const cards = [...document.querySelectorAll('#archive article')];
const filters = [['all','All',()=>true],['independent','Independent',p=>p.type.startsWith('Independent')],['group','Team',p=>p.type.startsWith('Group')],['learning','Learning',p=>!p.type.startsWith('Independent')&&!p.type.startsWith('Group')]];
const toolbar=document.createElement('div'); toolbar.className='archive-filter'; toolbar.setAttribute('role','group'); toolbar.setAttribute('aria-label','Project type');
const count=document.createElement('p'); count.className='archive-count'; count.setAttribute('role','status');
function filter(key,updateUrl=true){const f=filters.find(f=>f[0]===key)||filters[0];let n=0;cards.forEach((c,i)=>{c.hidden=!f[2](archive[i]);if(!c.hidden)n++;});toolbar.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===f[0])));count.textContent=`${n} projects`;if(updateUrl){const url=new URL(location.href);if(f[0]==='all')url.searchParams.delete('archive');else url.searchParams.set('archive',f[0]);history.replaceState(null,'',url);}}
filters.forEach(([key,label])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.filter=key;b.onclick=()=>filter(key);toolbar.append(b);});
$('.archive-list').before(toolbar,count);filter(new URL(location.href).searchParams.get('archive')||'all',false);

// Contextual evidence links, not decorative interactive-looking cards.
document.querySelectorAll('.stack-list article').forEach((card,i)=>{const a=document.createElement('a');a.href='https://sj-personalportfolio.netlify.app'+skills[i].to;a.target='_blank';a.rel='noopener noreferrer';a.textContent='See related work';card.append(a);});
const copy=document.createElement('button');copy.id='copy-email';copy.textContent='Copy email address';
copy.onclick=async()=>{try{await navigator.clipboard.writeText('sungjung0616@gmail.com');copy.textContent='✓ Copied';announce('Email address copied.');setTimeout(()=>copy.textContent='Copy email address',2200);}catch{announce('Copy unavailable. Please use the email link.');}};
$('.contact-links').append(copy);

// Keep existing destinations/camera handlers; only enrich their feedback.
const header=$('#site-header'),menu=$('#menu-toggle');
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&header.classList.contains('menu-open'))menu.focus();},true);
document.addEventListener('pointerdown',e=>{if(!header.contains(e.target)&&header.classList.contains('menu-open'))menu.click();});
const dots=$('#location-dots');
dots.addEventListener('pointerenter',()=>dots.classList.add('rail-warm'));
dots.addEventListener('pointerleave',()=>dots.classList.remove('rail-warm'));
const syncHeader=()=>{$('#site-menu').querySelectorAll('a').forEach(a=>{if(a.hash.slice(1)===window.navigationState?.current)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});};
new MutationObserver(syncHeader).observe(dots,{subtree:true,attributes:true,attributeFilter:['aria-current']});

// Native dialogs retain focus trapping and Escape. Open animation never delays interaction.
const seen=new WeakSet();
function prepareDialogs(){document.querySelectorAll('dialog').forEach(d=>{if(seen.has(d))return;seen.add(d);if(!d.hasAttribute('aria-labelledby')){const h=d.querySelector('h2');if(h){h.id='ui-dialog-'+seenCount++;d.setAttribute('aria-labelledby',h.id);}}
new MutationObserver(()=>{if(d.open&&!reduced()&&document.documentElement.dataset.input!=='keyboard')d.animate([{opacity:0,transform:'translateY(7px) scale(.985)'},{opacity:1,transform:'none'}],{duration:180,easing:'cubic-bezier(.23,1,.32,1)'});}).observe(d,{attributes:true,attributeFilter:['open']});
d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});});}
let seenCount=0;prepareDialogs();new MutationObserver(prepareDialogs).observe(document.body,{childList:true});
