import {stackCategories,stackElements} from './stack-data.js';

export function createStackTable(section){
 const style=document.createElement('link');style.rel='stylesheet';style.href='stack-table.css';document.head.append(style);
 section.classList.add('periodic-stack');section.setAttribute('aria-labelledby','stack-heading');
 const el=(tag,text,className)=>{const node=document.createElement(tag);if(text)node.textContent=text;if(className)node.className=className;return node;};
 const header=el('div',null,'stack-intro'),heading=el('div');
 heading.append(el('p','Tools, systems & technologies','stack-eyebrow'));
 const title=el('h2','The Periodic Table of My Stack');title.id='stack-heading';heading.append(title);
 const lede=el('div',null,'stack-intro-copy');lede.append(el('p','A collection of tools I use to build, test, automate, and improve real-world workflows.'),el('p','Professional work, project experience and foundational knowledge — each in context.','stack-context-note'));
 header.append(heading,lede);
 const legend=el('ul',null,'stack-legend');legend.setAttribute('aria-label','Technology categories');
 for(const [key,label] of stackCategories){const li=el('li',label);li.dataset.category=key;legend.append(li);}
 const table=el('div',null,'stack-table');table.setAttribute('role','group');table.setAttribute('aria-label','Technology elements');
 const detail=el('section',null,'stack-integrated-detail');detail.id='stack-selected-detail';detail.setAttribute('aria-labelledby','stack-detail-title');
 const body=el('div',null,'stack-detail-body');detail.append(body);
 const invitation=el('h3','Every tool has a story.');invitation.id='stack-detail-title';
 body.append(invitation,el('p','Select an element to explore how I use it.'));
 detail.dataset.state='empty';
 const selection=el('p','Select an element. Its story appears below the table on smaller screens.','stack-selection-note');
 const announcement=el('p',null,'stack-sr-only');announcement.setAttribute('role','status');announcement.setAttribute('aria-live','polite');
 const categoryName=key=>stackCategories.find(([id])=>id===key)[1];
 const order=['wms','excel','apps-script','python','unity-test','javascript','git','selenium','typescript','react','api','sql'];
 for(const [index,id] of order.entries()){
  const item=stackElements.find(item=>item.id===id);
  const button=el('button',null,'stack-element');button.type='button';button.dataset.element=item.id;button.dataset.category=item.category;
  button.setAttribute('aria-pressed','false');button.setAttribute('aria-controls',detail.id);button.setAttribute('aria-label',item.name+' — '+item.context);
  const number=el('span',String(index+1).padStart(2,'0'),'stack-element-index');number.setAttribute('aria-hidden','true');
  button.append(number,el('strong',item.symbol,'stack-symbol'),el('span',item.name,'stack-element-name'),el('span',categoryName(item.category),'stack-element-category'));
  button.onclick=()=>select(item,button);table.append(button);
 }
 table.append(detail);
 const note=el('p','Element numbers organize this collection. Experience context describes documented use, not a proficiency score.','stack-footnote');
 section.replaceChildren(header,legend,selection,table,note,announcement);

 function select(item,button){
  const savedY=scrollY;
  table.querySelectorAll('.stack-element').forEach(tile=>tile.setAttribute('aria-pressed',String(tile===button)));
  body.replaceChildren();detail.dataset.category=item.category;detail.dataset.state='selected';
  const top=el('div',null,'stack-detail-top'),symbol=el('span',item.symbol,'stack-detail-symbol'),names=el('div');
  const h=el('h3',item.name);h.id='stack-detail-title';names.append(h,el('p',categoryName(item.category),'stack-detail-category'),el('p',item.context,'stack-detail-context'));top.append(symbol,names);body.append(top);
  const usage=el('p',item.use,'stack-detail-use');usage.id='stack-detail-use';body.append(usage);
  const facts=el('dl',null,'stack-detail-facts');
  for(const [label,text] of [['Related experience',item.experience],['Related work',item.example]])if(text){const row=el('div');row.append(el('dt',label),el('dd',text));facts.append(row);}
  if(facts.children.length)body.append(facts);
  if(item.outcome){const outcome=el('div',null,'stack-detail-outcome');outcome.append(el('h4','Reported outcome'),el('p',item.outcome));body.append(outcome);}
  if(item.boundary){const scope=el('details',null,'stack-detail-scope');scope.append(el('summary','Context & scope'),el('p',item.boundary));body.append(scope);}
  if(item.links.length){const links=el('div',null,'stack-detail-links');for(const [label,href]of item.links){const a=el('a',label);a.href=href;if(!href.startsWith('#')){a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label',label+' (opens in a new tab)');}links.append(a);}body.append(links);}
  detail.scrollTop=0;
  selection.textContent=item.name+' selected. Details are below the table on smaller screens.';
  announcement.textContent=item.name+' selected. '+item.context+'. Details updated.';
  // Selection updates the existing region, retaining focus and page position.
  if(scrollY!==savedY)scrollTo({top:savedY,behavior:'instant'});
 }
}
