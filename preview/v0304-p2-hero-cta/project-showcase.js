import {projects, featuredWorkIds, automationContext, selectProject} from './project-catalog.js';
import {createProjectMediaFigure, projectMedia, pauseProjectMedia, releaseMediaWithin} from './project-media.js';

const style = document.createElement('link');
style.rel = 'stylesheet';
style.href = new URL('./project-showcase.css', import.meta.url).href;
document.head.append(style);

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
const status = p => element('span', 'build-status', p.status);
const tags = p => element('p', 'build-tools', p.technologies.join(' · '));
function link(label, url) {
  const a = element('a', '', label); a.href = url;
  if (!url.startsWith('#')) { a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  return a;
}
function metric(project) {
  const result = element('div', 'build-result');
  result.append(element('p', '', project.results.label));
  const values = element('p', 'build-result-values');
  values.append(element('span', '', project.results.before), element('span', 'build-result-arrow', '→'), element('strong', '', project.results.after));
  result.append(values, element('small', '', project.results.note));
  return result;
}
function list(items) {
  const ul = element('ul');
  (items || []).forEach(text => ul.append(element('li', '', text)));
  return ul;
}
function paragraph(parent, title, text) {
  if (text) parent.append(element('h3', '', title), element('p', '', text));
}
function bullets(parent, title, items) {
  if (items?.length) parent.append(element('h3', '', title), list(items));
}
function evidenceSection(project) {
  const section = element('div', 'build-detail-evidence');
  if (project.caseStudy) paragraph(section,'Outcome',project.caseStudy.outcome);
  if (project.results) section.append(element('h3', '', project.caseStudy?'Historical reported outcome':'Reported outcome'), metric(project));
  paragraph(section, 'Evidence', project.evidence);
  paragraph(section, project.caseStudy?'Verification':'Validation & use', project.validation || project.statusNote);
  const scope = element('details', 'build-scope');
  scope.append(element('summary', '', 'Scope & limitations'), element('p', '', project.limitations));
  if (project.evidenceRefs?.length) {
    const refs = element('ul', 'build-evidence-refs');
    project.evidenceRefs.forEach(ref => {
      const item = element('li');
      item.append(ref.url ? link(ref.label, ref.url) : element('span', '', ref.label));
      refs.append(item);
    });
    scope.append(refs);
  }
  section.append(scope); return section;
}

function projectContent(project) {
  const detailBody=element('div','build-project-content');detailBody.dataset.kind=project.group||project.category;
  const meta = element('div', 'build-meta'); meta.append(element('span', '', project.type), status(project));
  detailBody.append(meta, element('p', 'build-detail-lead', project.description), tags(project));
  if (project.statusNote) detailBody.append(element('p', 'build-status-note', project.statusNote));
  const mediaFigure=createProjectMediaFigure(project,{className:'build-detail-media',owner:'work'});
  if(mediaFigure)detailBody.append(mediaFigure);
  else if(project.demoCandidate)detailBody.append(element('p','build-demo-pending','Demo recording pending. No video has been supplied and cleared for public use.'));
  const story = element('div', 'build-detail-story'), narrative = element('div');
  const learning = project.group === 'learning', building = project.group === 'building';
  if (project.caseStudy) {
    paragraph(narrative,'Problem',project.problem);
    paragraph(narrative,'My responsibility',project.role);
    paragraph(narrative,'Previous workflow',project.caseStudy.previous);
    bullets(narrative,'Solution & technical decisions',project.approach);
    paragraph(narrative,'Demonstrated workflow',project.caseStudy.demonstrated);
    narrative.append(element('p','build-workflow-note','Workflow explanation — not additional recording evidence or proof of technical integration.'));
    const flow=element('dl','build-workflow');
    for(const [label,value]of Object.entries(project.caseStudy.flow))flow.append(element('dt','',label),element('dd','',value));
    narrative.append(flow);
    paragraph(narrative,'Human controls',project.caseStudy.human);
  } else if (learning) {
    paragraph(narrative, 'The experiment', project.problem);
    bullets(narrative, 'What exists', project.implementedScope);
    paragraph(narrative, 'Next step', project.nextMilestone);
  } else if (building) {
    paragraph(narrative, 'The idea', project.problem);
    bullets(narrative, 'What exists', project.implementedScope);
    bullets(narrative, "What I'm exploring", project.approach);
    paragraph(narrative, 'Next milestone', project.nextMilestone);
    paragraph(narrative, 'My role', project.role);
  } else {
    paragraph(narrative, 'The problem', project.problem);
    paragraph(narrative, 'My role', project.role);
    bullets(narrative, 'What I built', project.implementedScope);
    bullets(narrative, 'The approach', project.approach);
  }
  story.append(narrative,evidenceSection(project)); detailBody.append(story);
  if(project.projectJourney?.length){
    const journey=element('div','build-journey');journey.append(element('h3','','Project Journey'));
    const steps=element('ol');
    const labels={'verified-implementation':'Source-verified implementation','user-described-learning':'User-described learning','owner-reported':'Owner-reported context','recording-observed':'Observed in private source recording','planned-evidence':'Planned evidence','future-plan':'Future plan'};
    project.projectJourney.forEach(step=>{
      const item=element('li');item.dataset.state=step.state;
      item.append(element('span','build-journey-state',labels[step.state]||'Not yet verified'),element('h4','',step.title),element('p','',step.description));steps.append(item);
    });
    journey.append(steps);detailBody.append(journey);
  }
  const links = element('div', 'build-links');
  project.links.forEach(item => links.append(link(item.label, item.url)));
  if (links.childElementCount) detailBody.append(links);
  return detailBody;
}

let activeId=null,filmReturn=null,announcement;
const rows=new Map();
function clearReturn(){filmReturn=null;document.querySelectorAll('.build-film-return').forEach(node=>node.remove());}
function addReturn(row){
 row.panel.querySelector('.build-film-return')?.remove();
 if(filmReturn?.id!==row.project.id)return;
 const back=element('button','build-film-return','Back to Film Lab');back.type='button';
 back.onclick=()=>{const restore=filmReturn?.restore;clearReturn();pauseProjectMedia();restore?.();};row.panel.prepend(back);
}
function collapse(row){if(!row)return;releaseMediaWithin(row.panel);row.panel.replaceChildren();row.panel.hidden=true;row.button.setAttribute('aria-expanded','false');}
function expand(id,{align=true}={}){
 const row=rows.get(id);if(!row)return null;pauseProjectMedia();
 if(activeId!==id){collapse(rows.get(activeId));row.panel.append(projectContent(row.project));activeId=id;}
 row.panel.hidden=false;row.button.setAttribute('aria-expanded','true');addReturn(row);selectProject(id,'work');announcement.textContent=row.project.title+' expanded.';
 if(align){const header=document.getElementById('site-header')?.getBoundingClientRect().height||72;scrollTo({top:scrollY+row.article.getBoundingClientRect().top-header-20,behavior:'instant'});row.button.focus({preventScroll:true});}
 return row.panel;
}
export function openWorkProject(id,{origin='work',returnToFilm}={}){
 if(!rows.has(id))return null;clearReturn();if(origin==='film'&&typeof returnToFilm==='function')filmReturn={id,restore:returnToFilm};
 window.navigatePortfolio?.('work');return expand(id);
}
export const openProjectDetail=openWorkProject;
export function createProjectShowcase(section){
 const intro=element('header','build-intro');intro.append(element('h2','',"Selected Work."),element('p','','Business systems and operations improvements—focused on the problem, my contribution, stakeholder coordination, and the checks that matter.'));
 const featured=element('nav','build-featured');featured.setAttribute('aria-label','Featured work');
 featuredWorkIds.forEach(id=>{const p=projects.find(p=>p.id===id);const a=element('a','',p.title);a.href='#work-'+id;featured.append(a);});
 const context=element('details','build-workflow-context');context.append(element('summary','','Daily documentation & label printing — estimated context'),element('p','',automationContext));
 intro.append(featured,context);
 const index=element('div','build-project-index');announcement=element('p','build-selection-announcement');announcement.setAttribute('role','status');
 const ordered=[...featuredWorkIds.map(id=>projects.find(p=>p.id===id)),...projects.filter(p=>!featuredWorkIds.includes(p.id)&&p.group!=='learning'),...projects.filter(p=>!featuredWorkIds.includes(p.id)&&p.group==='learning')];
 ordered.forEach((project,i)=>{
  if(project.group==='learning'&&ordered.find(p=>p.group==='learning')===project)index.append(element('h2','','Learning & Experiments'));
   const article=element('article','build-project-row');article.id='work-'+project.id;
  const heading=element('h3','build-row-heading'),button=element('button','build-row-toggle');button.type='button';button.id='project-toggle-'+project.id;button.dataset.project=project.id;
  button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','project-panel-'+project.id);
  const title=element('span','build-row-title'),preview=projectMedia(project).poster;
  if(preview){
   const thumbnail=element('img','build-row-thumbnail');thumbnail.src=preview;thumbnail.alt='';thumbnail.loading='lazy';thumbnail.decoding='async';thumbnail.width=88;thumbnail.height=60;
   thumbnail.onerror=()=>thumbnail.remove();title.append(thumbnail);
  }
  title.append(element('span','build-row-name',project.title));
  button.append(element('span','build-row-number',String(i+1).padStart(2,'0')),title,status(project));
  const chevron=element('span','build-chevron');chevron.setAttribute('aria-hidden','true');chevron.innerHTML='<svg viewBox="0 0 24 24" fill="none"><path d="m5 9 7 7 7-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';button.append(chevron);heading.append(button);
  const panel=element('div','build-project-panel');panel.id='project-panel-'+project.id;panel.hidden=true;panel.setAttribute('role','region');panel.setAttribute('aria-labelledby',button.id);
  const row={project,article,button,panel};rows.set(project.id,row);article.append(heading,panel);index.append(article);
  button.onclick=()=>{if(activeId===project.id){const top=button.getBoundingClientRect().top;collapse(row);activeId=null;announcement.textContent=project.title+' collapsed.';scrollBy({top:button.getBoundingClientRect().top-top,behavior:'instant'});}else{if(filmReturn?.id!==project.id)clearReturn();expand(project.id);}};
  button.onkeydown=event=>{if(!['ArrowDown','ArrowUp','Home','End'].includes(event.key))return;event.preventDefault();const order=[...rows.values()],target=event.key==='Home'?0:event.key==='End'?order.length-1:(i+(event.key==='ArrowDown'?1:-1)+order.length)%order.length;order[target].button.focus();};
 });
 section.replaceChildren(intro,index,announcement);
 window.addEventListener('portfolio:navigate',event=>{if(event.detail.id!=='work')clearReturn();});
}
