// Local content/packaging checks, not hosted or operational tool certification.
const fs=require('node:fs'),assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');const path=require('node:path');
let count=0;const check=(ok,label)=>{assert.ok(ok,label);count++};
(async()=>{
 const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
 const c=await import(pathToFileURL(path.join(root,'preview/v0304-p2-hero-cta/project-catalog.js')));
 check(c.projects.length===26,'all projects retained');
 check(new Set(c.projects.map(p=>p.id)).size===26,'unique stable IDs');
 check(JSON.stringify(c.featuredWorkIds)===JSON.stringify(['google-sheets-automation','qr','eternights','coupang']),'featured order');
 check(JSON.stringify(c.filmProjects.slice(0,3).map(p=>p.id))===JSON.stringify(['google-sheets-automation','label','qr']),'Film media order independent of Work');
 check(c.getProject('qr').results===null,'no metric B or metric A on QR');
 check(/180–200.*150.*30–50/.test(c.automationContext),'qualified metric A');
 check(!/20–30/.test(c.automationContext),'metric B withheld');
 for(const id of ['google-sheets-automation','label','qr']){
  check(c.getProject(id).evidenceRefs.length>=2,id+' evidence retained');
  check(/AI-assisted/.test(c.getProject(id).role),id+' assistance clear');
 }
 for(const id of ['google-sheets-automation','qr'])check(c.getProject(id).demoVideo.endsWith('.webm'),id+' approved demo retained');
 check(c.getProject('eternights').results.note.includes('particular recurring workflow'),'QA scope');
 const hero=read('preview/v0304-p2-hero-cta/hero.js');
 check(hero.includes('I Make Complex Work Feel Simple.'),'headline preserved');
 check(hero.includes('I turn operational challenges into clearer workflows, smarter tools, and more reliable systems.'),'approved positioning');
 check(hero.includes('<span>Business Systems</span> <span>&amp; Operations Improvement</span>'),'professional identity intentional wrapping');
 check(hero.includes('<h1 id="hero-title">Sung Jung</h1>'),'name is primary headline');
 check(!hero.includes('Senior Operations Manager'),'no seniority branding');
 const html=read('preview/p2-03b-playbook/index.html');
 check(html.indexOf('data-case="label"')<html.indexOf('data-case="qr"')&&html.indexOf('data-case="qr"')<html.indexOf('data-case="coupang"'),'Playbook order retained');
 check(read('preview/v0304-p2-hero-cta/interactive-playbook.js').includes('?case=label&stage=0&embed=1'),'initial case');
 check(read('preview/p2-03b-playbook/interaction.js').includes("id=\"ambiguity\""),'QR safeguard retained');
 for(const mode of ['preview','production']){
  const p='.netlify/portfolio-2-'+mode+'/';const h=read(p+'index.html');
  check(mode==='preview'?h.includes('noindex'):!h.includes('noindex'),mode+' index policy');
  if(mode==='production')for(const marker of ['name="description"','property="og:title"','rel="canonical"','name="twitter:card"'])check(h.includes(marker),'SEO '+marker);
 }
 console.log('PASS: '+count+' content revision checks. Browser and document rendering are separate checks.');
})().catch(e=>{console.error(e);process.exitCode=1});
