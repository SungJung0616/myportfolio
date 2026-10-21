import {createStackTable} from './stack-table.js';
import {createProjectShowcase,openWorkProject} from './project-showcase.js';
const contactStyle=document.createElement('link');contactStyle.rel='stylesheet';contactStyle.href=new URL('./contact.css',import.meta.url).href;document.head.append(contactStyle);
const destinations=[['home','Home Court',0],['career','Career Walk',.38],['playbook','Playbook',.83],['film','The Film Lab',1],['stack','Stack'],['work','Work'],['contact','Contact']];
const header=document.createElement('div');header.id='site-header';header.setAttribute('role','banner');header.innerHTML='<a class="site-name" href="#home">SUNG JUNG</a><div class="local-info">Gardena, CA <span class="local-clock"></span><span class="weather"> · Weather unavailable · —</span></div><span class="specialty">Business Systems · Process Improvement · Automation</span><button id="menu-toggle" aria-expanded="false" aria-controls="site-menu">Menu</button><nav id="site-menu" aria-label="Main navigation"><a href="#stack">STACK</a><a href="#work">WORK</a><a href="#contact">CONTACT</a></nav>';
const dots=document.createElement('nav');dots.id='location-dots';dots.setAttribute('aria-label','Current location and section navigation');for(const [id,label]of destinations){const a=document.createElement('a');a.href='#'+id;a.dataset.destination=id;a.setAttribute('aria-label',label);a.innerHTML='<i aria-hidden="true"></i><span>'+label+'</span>';dots.append(a);}
const content=document.createElement('div');content.id='reading-content';content.innerHTML=`<section id="stack" tabindex="-1"><p class="section-label">Stack</p><h2>Tools in context.</h2><div class="stack-list"></div></section><section id="work" tabindex="-1" aria-label="Things I have built"></section>
<section id="contact" tabindex="-1" aria-labelledby="contact-title">
  <p class="contact-label">Contact</p>
  <div class="contact-composition">
    <div class="contact-message">
      <h2 id="contact-title">Let’s make the next play easier.</h2>
      <p>Good work starts with a conversation. Let’s find a practical next step.</p>
    </div>
    <div class="contact-connect">
      <p class="contact-invitation">Open to full-time opportunities in business systems, operations systems, and process improvement.</p>
      <div class="contact-links"><a class="contact-email" href="mailto:sungjung0616@gmail.com">sungjung0616@gmail.com</a></div>
      <nav class="contact-profiles" aria-label="Professional profiles and resume">
        <a href="https://www.linkedin.com/in/sungjung0616/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">LinkedIn <span aria-hidden="true">↗</span></a>
        <a href="https://github.com/SungJung0616" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">GitHub <span aria-hidden="true">↗</span></a>
        <a href="https://sj-personalportfolio.netlify.app/resume/Sung_Jung_Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume PDF (opens in a new tab)">Resume <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </div>
  <div class="contact-closing">
    <a class="contact-home" href="#home"><span aria-hidden="true">↑</span> Back to Home Court</a>
    <nav class="contact-review" aria-label="Preview review resources"><a href="?inspect=1">Review mode</a><a href="review.html">Review notes</a></nav>
  </div>
</section>`;
// Archive records are retained in the shared catalog and rendered once in Work.
document.body.append(header,dots,content);createProjectShowcase(content.querySelector('#work'));createStackTable(content.querySelector('#stack'));
const inspect=new URLSearchParams(location.search).get('inspect')==='1';document.body.classList.toggle('inspection-mode',inspect);
const menu=header.querySelector('#menu-toggle');menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));header.classList.toggle('menu-open',open);};document.addEventListener('keydown',e=>{if(e.key==='Escape'){header.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');}});
function time(){header.querySelector('.local-clock').textContent=' · '+new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());}time();setInterval(time,1000);
function go(id){if(id==='archive')id='work';const d=destinations.find(d=>d[0]===id);if(!d)return;window.leaveFilmRoom?.();header.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');if(d.length===3){document.body.classList.remove('reading-mode');const b=[...document.querySelectorAll('[data-stop]')].find(b=>Number(b.dataset.stop)===d[2]);b?.click();}else{document.body.classList.add('reading-mode');document.getElementById(id).scrollIntoView({behavior:'instant',block:'start'});document.getElementById(id).focus({preventScroll:true});}history.replaceState(null,'','#'+id);sync();window.dispatchEvent(new CustomEvent('portfolio:navigate',{detail:{id}}));}
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a)return;const id=a.hash.slice(1);if(id.startsWith('work-')){e.preventDefault();openWorkProject(id.slice(5));}else if(id==='archive'||destinations.some(d=>d[0]===id)){e.preventDefault();go(id);}});
function sync(){const reading=document.querySelector('#reading-content').getBoundingClientRect().top<=header.getBoundingClientRect().bottom+.5;document.body.classList.toggle('reading-mode',reading);let id='home';if(reading){id='stack';for(const [key]of destinations.filter(d=>d.length===2))if(document.getElementById(key).getBoundingClientRect().top<=innerHeight*.4)id=key;}else{const p=window.arenaDiagnostics?.progress||0;id=p>=.93?'film':p>=.785?'playbook':p>=.26?'career':'home';}dots.querySelectorAll('a').forEach(a=>{if(a.dataset.destination===id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});header.classList.toggle('dark',!reading&&(window.arenaDiagnostics?.progress||0)>.24);window.navigationState={current:id,reading,weather:'unconnected'};}
setInterval(sync,120);window.addEventListener('scroll',sync,{passive:true});window.navigatePortfolio=go;
function restoreEditorialAnchor(){const id=location.hash.slice(1);if(id.startsWith('work-'))openWorkProject(id.slice(5));else if(id==='archive'||['work','stack','contact'].includes(id))go(id);else if(!id&&new URL(location.href).searchParams.has('archive'))go('work');}
window.addEventListener('load',restoreEditorialAnchor,{once:true});window.addEventListener('hashchange',restoreEditorialAnchor);
