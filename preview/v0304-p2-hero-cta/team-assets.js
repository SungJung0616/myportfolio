// NBA identifiers are data, not a license to redistribute team marks.
// No official logo is bundled until a public-use permission basis is recorded.
const rows=[
 ['1610612747','Los Angeles Lakers','LAL',['Lakers']],
 ['1610612748','Miami Heat','MIA',['Heat']],
 ['1610612761','Toronto Raptors','TOR',['Raptors']],
 ['1610612744','Golden State Warriors','GSW',['Warriors']],
 ['1610612746','Los Angeles Clippers','LAC',['LA Clippers','Clippers']],
 ['1610612757','Portland Trail Blazers','POR',['Trail Blazers','Blazers']],
 ['1610612758','Sacramento Kings','SAC',['Kings']],
 ['1610612762','Utah Jazz','UTA',['Jazz']]
];
export const TEAM_ASSETS=Object.freeze(Object.fromEntries(rows.map(([id,name,abbreviation,aliases])=>[id,Object.freeze({id,name,abbreviation,aliases,assetPath:null,assetSource:null,licenseStatus:'Permission unresolved — abbreviation badge only'})])));
export function resolveTeam(value){const key=String(value||'');return TEAM_ASSETS[key]||Object.values(TEAM_ASSETS).find(t=>t.name===key||t.abbreviation===key||t.aliases.includes(key))||{id:null,name:key||'Opponent',abbreviation:'OPP',assetPath:null,licenseStatus:'No licensed asset'};}
export function teamBadge(value){const team=resolveTeam(value),badge=document.createElement('span');badge.className='gc-team-badge';badge.textContent=team.abbreviation;badge.setAttribute('aria-hidden','true');if(team.assetPath){const image=document.createElement('img');image.alt='';image.src=new URL(team.assetPath,import.meta.url).href;image.addEventListener('load',()=>badge.replaceChildren(image));image.addEventListener('error',()=>{badge.textContent=team.abbreviation;});}return badge;}
export function drawTeamBadge(context,value,x,y,size){const team=resolveTeam(value);context.fillStyle='#f2eddf';context.fillRect(x-size/2,y-size/2,size,size);context.strokeStyle='#d2a657';context.lineWidth=3;context.strokeRect(x-size/2,y-size/2,size,size);context.textAlign='center';context.fillStyle='#342c43';context.font=`800 ${size*.3}px Manrope, sans-serif`;context.fillText(team.abbreviation,x,y+size*.11);}
