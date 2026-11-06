// Read-only comparison against a privately captured, rendered official NBA DOM.
const fs=require('node:fs');
(async()=>{
 const [file,base]=process.argv.slice(2);if(!file||!base)throw Error('Usage: node tools/audit-game-center-records.cjs official-dom.json https://preview-host');
 const official=JSON.parse(fs.readFileSync(file,'utf8'));
 const api=async q=>{const r=await fetch(base+'/.netlify/functions/game-center?'+q);if(!r.ok)throw Error('API '+r.status);return r.json();};
 const h=await api('action=history'),report=[];
 for(const g of h.games){const b=await api('action=boxscore&game='+g.id),s=official[g.id],issues=[];if(!s){report.push({id:g.id,issues:['source unavailable']});continue;}
 const t=s.tables.find(t=>t.rows.some(r=>r.links.some(l=>l.includes('TeamID=1610612747'))));if(!t)throw Error('No Lakers table '+g.id);
 const headers=t.headers.map(k=>k==='TOV'?'TO':k==='+/-'?'Plus Minus':k),rows=t.rows.filter(r=>r.cells.length&&r.cells[0]!=='TOTALS');
 const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');const key=r=>normalize(r.cells[0].split('\n')[0].trim());let matched=0;
 for(const p of b.players){const r=rows.find(r=>key(r)===normalize(p.name));if(!r){if(p.participation==='Inactive'&&normalize(s.text.match(/LAL:\s*([^\n]+)/)?.[1]||'').split(',').map(x=>x.trim()).includes(normalize(p.name))){matched++;continue;}issues.push(p.name+': missing source row');continue;}
 const status=/DNP/.test(r.cells[1])?'DNP':/Inactive/i.test(r.cells[1])?'Inactive':'Played';
 if(status!==p.participation)issues.push(p.name+': participation');
 if(status==='Played'){if(r.cells[1]!==p.minutes)issues.push(p.name+': MIN');for(const [k,v]of Object.entries(p.stats)){const i=headers.indexOf(k);if(i<0)continue;const raw=r.cells[i]?.trim(),expected=raw&&raw!=='—'?Number(raw):null;if(expected!==v)issues.push(p.name+': '+k);}
 const starter=/\n[FCG]$/.test(r.cells[0]);if((starter?'Starter':'Bench')!==p.lineupRole)issues.push(p.name+': lineup');}
 else if(Object.values(p.stats).some(v=>v!==null))issues.push(p.name+': nonparticipant numeric stats');matched++;}
 for(const r of rows)if(!b.players.some(p=>normalize(p.name)===key(r)))issues.push(key(r)+': missing local row');
 const totals=t.rows.find(r=>r.cells[0]==='TOTALS'),other=s.tables.find(x=>x!==t)?.rows.find(r=>r.cells[0]==='TOTALS');
 if(Number(totals?.cells[headers.indexOf('PTS')])!==g.lakers||Number(other?.cells[headers.indexOf('PTS')])!==g.opponentPoints)issues.push('score mismatch');
 report.push({id:g.id,players:b.players.length,matched,starters:b.players.filter(p=>p.lineupRole==='Starter').length,issues,sourceMinuteAnomalies:b.players.filter(p=>p.sourceWarning).map(p=>({player:p.name,minutes:p.minutes}))});
 }
 console.log(JSON.stringify({games:report.length,players:report.reduce((n,g)=>n+g.players,0),duplicateGames:new Set(h.games.map(g=>g.id)).size!==h.games.length,report},null,2));
 if(report.some(g=>g.issues.length))process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exitCode=1;});
