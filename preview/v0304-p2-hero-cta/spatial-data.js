export const layout={unit:'Three.js scene units (not surveyed metres)',before:{tunnel:{start:8.535,end:-2.7025,length:11.2375,width:5.72},court:{width:19.8,depth:7.6,center:[0,-6.7]},ceilingMax:8.54,board:[3.1,-10.5],score:[-2.25,-12.43],film:[7.8,.4]},tunnel:{start:8.535,end:-12.254375,length:20.789375,width:5.72,usableWidth:5.54,frameCenters:[1.2,-3.3,-7.8],clearBeforeFirst:6.26,clearAfterLast:3.38},court:{width:24,depth:13,center:[0,-29],hallWidth:35.6,hallStart:-12.254375,hallEnd:-46.8,ceiling:11.375},bench:[14,-29],board:[14,-36],score:[0,7.8,-46.43],film:[-12,-51.8]};
export const rail=[
 {p:[25,21,36],t:[0,2.3,1],s:0,fov:43,title:'Home court',headline:'A small world. Room to explore.',hint:'공간 비율 검수 · 기존 캐릭터와 콘텐츠 유지'},
 {p:[2.4,5.2,23],t:[.4,2.2,7.5],s:.14,fov:48,title:'Gate 01',headline:'Come on in.',hint:'앞으로 길어진 실제 복도로 들어갑니다.'},
 {p:[.3,2.4,6.8],t:[0,2.4,-8],s:.26,fov:65,title:'Entry walk',headline:'A longer approach.',hint:'경력 전시 전의 비어 있는 진입 구간'},
 {p:[1.6,2.55,3.1],t:[-2.78,2.55,1.2],s:.38,fov:58,title:'Career Walk',headline:'Experience, in perspective.',hint:'첫 번째 경력 패널 · 전체 액자를 정면에 가깝게 확인'},
 {p:[1.1,2.5,-5.3],t:[-2.5,2.5,-7.6],s:.46,fov:68,title:'Career Walk',headline:'From experience to practice.',hint:'전시 뒤에도 코트까지 걸어가는 구간이 남아 있습니다.'},
 {p:[0,2.5,-10.8],t:[0,3,-26],s:.55,fov:72,title:'Exit approach',headline:'The space opens up.',hint:'프로젝트가 아니라 경기장 전체를 먼저 발견합니다.'},
 {p:[0,4.6,-15.2],t:[0,3.4,-29],s:.64,fov:82,title:'Court reveal',headline:'Room to see the whole court.',hint:'전체 코트 · 양쪽 골대 · 높은 천장 · 주변 빈 바닥'},
 {p:[0,3,-29],t:[12,2.8,-32],s:.74,fov:78,title:'Center court',headline:'At the center of the work.',hint:'코트 중앙에서 공간을 둘러본 뒤 작전판으로 접근'},
 {p:[7.6,3.3,-36],via:[4,3.8,-39],t:[14,3.1,-36],s:.83,fov:68,title:'Team bench',headline:'From problem to proof.',hint:'공간을 둘러본 뒤 작전판의 프로젝트를 읽습니다.'},
 {p:[0,4.4,-37.8],via:[-12,3.2,-40],t:[0,7.8,-46.43],s:.88,fov:64,title:'The Scoreboard',headline:'Practical work. Measurable change.',hint:'검증된 프로젝트 전체 결과 · 사람의 최종 검수 유지'},
 {p:[-12,3.2,-42],t:[-12,3,-47],s:.95,fov:68,title:'Film Room entrance',headline:'A separate room.',hint:'코트 주변 통로를 거친 독립된 문'},
 {p:[-12,3.6,-48],t:[-12,2.7,-55.7],s:1,fov:78,title:'Film Room',headline:'Space first. Stories next.',hint:'두 프로젝트 검수 · 클릭으로 데모 재생 · 코트로 돌아가기'}
];
const nav=document.querySelector('#stops');if(nav)rail.forEach((r,i)=>{const b=document.createElement('button');b.dataset.stop=r.s;b.textContent=['외관','입구','복도 진입','경력 1','경력 2','출구 접근','코트 전체','센터코트','작전판','성과 전광판','필름룸 문','필름룸'][i];nav.append(b);});
