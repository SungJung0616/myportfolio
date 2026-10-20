// Focused RC1 source/output checks; not warehouse-tool or hosted-deploy tests.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..');
let checks=0;
function check(value,message){assert.ok(value,message);checks++;}
async function main(){
 const catalog=await import(pathToFileURL(path.join(root,'preview/v0304-p2-hero-cta/project-catalog.js')));
 const ids=['google-sheets-automation','label','qr'];
 check(new Set(catalog.projects.map(p=>p.id)).size===catalog.projects.length,'unique project IDs');
 check(JSON.stringify(catalog.featuredAutomationIds)===JSON.stringify(ids),'featured order');
 check(JSON.stringify(catalog.filmProjects.slice(0,3).map(p=>p.id))===JSON.stringify(ids),'Film uses same representative records');
 check(catalog.getProject('qr').results===null,'no QR-only broader workflow metric');
 check(/150.*50.*20–30/.test(catalog.automationContext),'broader historical metric context');
 for(const id of ids){const p=catalog.getProject(id);
  for(const field of ['previous','demonstrated','human','outcome','flow'])check(!!p.caseStudy[field],id+' case study '+field);
  check(Object.keys(p.caseStudy.flow).length===4,id+' four workflow stages');
  check(p.evidenceRefs.some(r=>r.url?.endsWith('FIX-09.md')),id+' Journal media reference');
  check(p.evidenceRefs.some(r=>r.url?.includes('FIX-10.md#step-03b')),id+' Journal boundary reference');
 }
 const events=[];global.window=new EventTarget();window.addEventListener('portfolio:project-selected',e=>events.push(e.detail));
 catalog.selectProject('qr','film');catalog.selectProject('google-sheets-automation','work');
 check(catalog.getSelectedProject().id==='google-sheets-automation','shared selection');
 check(events.length===2&&events[0].origin==='film'&&events[1].origin==='work','selection events');
 delete global.window;
 for(const mode of ['preview','production']){
  const dir=path.join(root,'.netlify','portfolio-2-'+mode);const read=p=>fs.readFileSync(path.join(dir,p),'utf8');
  const html=read('index.html'),headers=read('_headers'),robots=read('robots.txt');
  check(mode==='production'?!/noindex/i.test(html+headers+robots):/noindex/.test(html)&&/noindex/.test(headers)&&/Disallow: \//.test(robots),mode+' indexing');
  check(mode==='production'?html.includes('Sung Jung — Operations, QA & Automation'):html.includes('UI Preview'),mode+' title');
  check(headers.includes('Content-Security-Policy')&&headers.includes('X-Content-Type-Options'),mode+' security headers retained');
  const pdf=fs.readFileSync(path.join(dir,'resume/Sung_Jung_Resume.pdf'));
  check(pdf.subarray(0,5).toString()==='%PDF-',mode+' actual PDF');
  check(pdf.equals(fs.readFileSync(path.join(root,'public/resume/Sung_Jung_Resume.pdf'))),mode+' canonical resume identity');
  check(read('hero.js').includes('href="/resume/Sung_Jung_Resume.pdf"'),mode+' bundled Hero resume');
  check(read('navigation.js').includes('href="/resume/Sung_Jung_Resume.pdf"'),mode+' bundled Contact resume');
  const redirects=read('_redirects').trim().split('\n');check(redirects.length===6,mode+' six legacy mappings');
  check(redirects.every(l=>/^\/case-studies\/[\w-]+ https:\/\/sungjung-portfolio-v1\.netlify\.app\/case-studies\/[\w-]+ 302$/.test(l)),mode+' explicit archive redirects');
  for(const p of ['index.html','prototype.css','prototype.js','coupang.js','interaction.js'])check(fs.existsSync(path.join(dir,'p2-03b-playbook',p)),mode+' Playbook '+p);
  for(const p of ['packing-review.webm','packing-review.jpg','qr-review.webm','qr-review.jpg'])check(fs.readFileSync(path.join(dir,'project-demos',p)).equals(fs.readFileSync(path.join(root,'preview/v0304-p2-hero-cta/project-demos',p))),mode+' media identity '+p);
 }
 check(fs.readFileSync(path.join(root,'preview/v0304-p2-hero-cta/_headers'),'utf8').includes('noindex'),'canonical preview policy unchanged');
 console.log(`PASS: ${checks} focused RC1 checks. No hosted, physical-device, screen-reader, FPS, GPU or Core Web Vitals claim.`);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
