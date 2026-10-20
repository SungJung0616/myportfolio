import * as T from './three.module.js';
const hero=document.createElement('section');hero.id='intro-hero';hero.setAttribute('aria-labelledby','hero-title');hero.lang='en';hero.innerHTML='<p class="hero-name">Sung Jung</p><h1 id="hero-title">I Make Complex Work Feel Simple.</h1><p class="hero-description">Operations and QA experience, translated into practical software tools.</p><p class="hero-philosophy">Make the Next Play Easier.</p><p class="hero-specialty">Operations · QA · Automation</p>';document.body.append(hero);
const actions=document.createElement('div');actions.className='hero-actions';
actions.innerHTML='<a class="hero-primary" href="#work">View Featured Work</a><button class="hero-explore" type="button">Explore the Arena</button><div class="hero-utility"><a href="#playbook">Interactive Playbook</a><a href="https://sj-personalportfolio.netlify.app/resume/Sung_Jung_Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume PDF (opens in a new tab)">Resume ↗</a></div>';
hero.append(actions);
actions.querySelector('.hero-explore').addEventListener('click',()=>{
 document.querySelector('[data-stop="0.14"]')?.click();
 document.querySelector('[data-destination="home"]')?.focus({preventScroll:true});
});
actions.querySelector('.hero-primary').addEventListener('click',()=>{
 document.querySelector('[data-destination="work"]')?.focus({preventScroll:true});
});
let heroVisible;
export function applyHero(camera,p){const mobile=innerWidth<800,weight=1-Math.min(1,p/.14),w=weight*weight*(3-2*weight),fade=Math.max(0,1-p/.065);if(heroVisible!==(fade>0)){heroVisible=fade>0;document.querySelector('#headline')?.setAttribute('aria-hidden',String(heroVisible));}hero.style.opacity=String(fade);hero.style.visibility=fade>0?'visible':'hidden';hero.style.transform=`translateY(${-24*(1-fade)}px)`;document.body.classList.toggle('hero-active',p<.065&&!document.body.classList.contains('reading-mode'));if(w<=0)return;
 const position=mobile?new T.Vector3(20,32,76):new T.Vector3(23,18,31),target=mobile?new T.Vector3(0,2,3):new T.Vector3(-8,3,7);const quaternion=camera.quaternion.clone();camera.position.lerp(position,w);camera.lookAt(target);camera.quaternion.slerp(quaternion,1-w);camera.fov=T.MathUtils.lerp(camera.fov,mobile?43:40,w);camera.updateProjectionMatrix();camera.setViewOffset(innerWidth,innerHeight,mobile?0:-innerWidth*.13*w,mobile?-innerHeight*.20*w:0,innerWidth,innerHeight);
}
