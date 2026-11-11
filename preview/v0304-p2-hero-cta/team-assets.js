// Official team identifiers; logo originals are fetched into ignored build storage.
// Website use was confirmed by the owner. Public Git redistribution is not assumed.
const rows=[
 ['1610612737','Atlanta Hawks','ATL',['Hawks']],
 ['1610612738','Boston Celtics','BOS',['Celtics']],
 ['1610612739','Cleveland Cavaliers','CLE',['Cavaliers','Cavs']],
 ['1610612740','New Orleans Pelicans','NOP',['Pelicans']],
 ['1610612741','Chicago Bulls','CHI',['Bulls']],
 ['1610612742','Dallas Mavericks','DAL',['Mavericks','Mavs']],
 ['1610612743','Denver Nuggets','DEN',['Nuggets']],
 ['1610612744','Golden State Warriors','GSW',['Warriors']],
 ['1610612745','Houston Rockets','HOU',['Rockets']],
 ['1610612746','LA Clippers','LAC',['Los Angeles Clippers','Clippers']],
 ['1610612747','Los Angeles Lakers','LAL',['Lakers']],
 ['1610612748','Miami Heat','MIA',['Heat']],
 ['1610612749','Milwaukee Bucks','MIL',['Bucks']],
 ['1610612750','Minnesota Timberwolves','MIN',['Timberwolves','Wolves']],
 ['1610612751','Brooklyn Nets','BKN',['Nets']],
 ['1610612752','New York Knicks','NYK',['Knicks']],
 ['1610612753','Orlando Magic','ORL',['Magic']],
 ['1610612754','Indiana Pacers','IND',['Pacers']],
 ['1610612755','Philadelphia 76ers','PHI',['76ers','Sixers']],
 ['1610612756','Phoenix Suns','PHX',['Suns']],
 ['1610612757','Portland Trail Blazers','POR',['Trail Blazers','Blazers']],
 ['1610612758','Sacramento Kings','SAC',['Kings']],
 ['1610612759','San Antonio Spurs','SAS',['Spurs']],
 ['1610612760','Oklahoma City Thunder','OKC',['Thunder']],
 ['1610612761','Toronto Raptors','TOR',['Raptors']],
 ['1610612762','Utah Jazz','UTA',['Jazz']],
 ['1610612763','Memphis Grizzlies','MEM',['Grizzlies']],
 ['1610612764','Washington Wizards','WAS',['Wizards']],
 ['1610612765','Detroit Pistons','DET',['Pistons']],
 ['1610612766','Charlotte Hornets','CHA',['Hornets']]
];
export const TEAM_ASSETS=Object.freeze(Object.fromEntries(rows.map(([id,name,abbreviation,aliases])=>[id,Object.freeze({
 id,name,abbreviation,aliases:Object.freeze(aliases),assetPath:`./team-logos/${id}.svg`,
 assetSource:`https://cdn.nba.com/logos/nba/${id}/primary/L/logo.svg`,
 licenseStatus:'Owner-confirmed website use; logo originals excluded from Git'
})])));
const lookup=new Map();
for(const team of Object.values(TEAM_ASSETS))for(const key of [team.id,team.name,team.abbreviation,...team.aliases])lookup.set(key.toLowerCase(),team);
const keyOf=value=>String(value??'').trim();
const readableName=value=>{const name=keyOf(value);return name&&!/^\d+$/.test(name)?name:null;};
export function resolveTeam(value,fallbackName){
 const key=keyOf(value),fallback=keyOf(fallbackName);
 return lookup.get(key.toLowerCase())||lookup.get(fallback.toLowerCase())||{
  id:null,name:readableName(fallback)||readableName(key)||'Opponent',abbreviation:'OPP',assetPath:null,licenseStatus:'No matching team asset'
 };
}

// Load each required logo once, not on every animation frame or tour face change.
const logoCache=new Map();
function loadLogo(team){
 if(!team.assetPath||typeof Image==='undefined')return Promise.resolve(null);
 if(logoCache.has(team.id))return logoCache.get(team.id).promise;
 const image=new Image(),entry={image:null,promise:null};
 entry.promise=new Promise(resolve=>{
  image.onload=()=>{entry.image=image;resolve(image);};
  image.onerror=()=>resolve(null);
 });
 logoCache.set(team.id,entry);image.decoding='async';image.src=new URL(team.assetPath,import.meta.url).href;
 return entry.promise;
}
export function preloadTeamLogos(values){return Promise.all(values.map(value=>loadLogo(resolveTeam(value))));}
export function teamBadge(value,fallbackName){
 const team=resolveTeam(value,fallbackName),badge=document.createElement('span');
 badge.className='gc-team-badge';badge.textContent=team.abbreviation;badge.setAttribute('aria-hidden','true');
 loadLogo(team).then(logo=>{if(logo){const image=logo.cloneNode();image.alt='';badge.replaceChildren(image);}});
 return badge;
}
export function drawTeamBadge(context,value,x,y,size,fallbackName){
 const team=resolveTeam(value,fallbackName),logo=logoCache.get(team.id)?.image;
 context.fillStyle='#f2eddf';context.fillRect(x-size/2,y-size/2,size,size);
 context.strokeStyle='#d2a657';context.lineWidth=3;context.strokeRect(x-size/2,y-size/2,size,size);
 if(logo){
  const scale=(size-12)/Math.max(logo.naturalWidth,logo.naturalHeight),w=logo.naturalWidth*scale,h=logo.naturalHeight*scale;
  context.drawImage(logo,x-w/2,y-h/2,w,h);
 }else{
  context.textAlign='center';context.fillStyle='#342c43';context.font=`800 ${size*.3}px Manrope, sans-serif`;context.fillText(team.abbreviation,x,y+size*.11);
 }
}
