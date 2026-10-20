// Only reviewed, sanitized user recordings are eligible for public playback.
// A source/demo proves visible behavior, not adoption or a business metric.
export const APPROVED_DEMO = 'sanitized-user-recording';
const players = new Map();
const base = new URL('.', import.meta.url);
function localAsset(path) {
  if (typeof path !== 'string' || !path.trim()) return null;
  try {
    const url = new URL(path, base);
    return url.origin === base.origin && url.pathname.startsWith(base.pathname) ? url.href : null;
  } catch { return null; }
}
export function projectMedia(project) {
  const video = project.evidenceStatus === APPROVED_DEMO ? localAsset(project.demoVideo) : null;
  return {
    video,
    poster: localAsset(project.posterImage),
    caption: project.demoCaption || 'A project recording has not been provided.',
    duration: Number.isFinite(project.demoDuration) && project.demoDuration > 0 ? project.demoDuration : null,
    evidenceStatus: project.evidenceStatus,
  };
}
export function pauseProjectMedia(except = null) {
  for (const video of players.keys()) if (video !== except) video.pause();
}
export function releaseProjectVideo(video) {
  const cleanup = players.get(video);
  video.pause(); players.delete(video); cleanup?.();
  video.removeAttribute('src'); video.load();
}
export function releaseMediaWithin(container) {
  container.querySelectorAll('video[data-project-demo]').forEach(releaseProjectVideo);
}
export function createProjectVideo(media, {isActive = () => true, observeVisibility = true, onError} = {}) {
  const video = document.createElement('video');
  video.dataset.projectDemo = 'true';
  video.muted = true; video.defaultMuted = true; video.volume = 0;
  video.playsInline = true; video.preload = 'none';
  video.controls = true; video.disablePictureInPicture = true;
  video.setAttribute('controlslist', 'nodownload noremoteplayback');
  if (media.poster) video.poster = media.poster;
  video.setAttribute('aria-label', 'Silent project demonstration');
  const onPlay = () => {
    const r=video.getBoundingClientRect();
    const visible=!observeVisibility||(video.isConnected&&r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth);
    if (document.hidden || !isActive() || !visible) { video.pause(); return; }
    pauseProjectMedia(video);
  };
  const onVolume = () => { if (!video.muted) video.muted=true; if(video.volume!==0)video.volume=0; };
  video.addEventListener('play', onPlay);
  video.addEventListener('volumechange', onVolume);
  if (onError) video.addEventListener('error', onError);
  const observer = observeVisibility ? new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) video.pause();
  }, {threshold:0}) : null;
  observer?.observe(video);
  players.set(video, () => {
    observer?.disconnect(); video.removeEventListener('play',onPlay);
    video.removeEventListener('volumechange',onVolume);
    if(onError)video.removeEventListener('error',onError);
  });
  // preload=none and no autoplay: bytes are requested only for deliberate playback.
  video.src = media.video;
  return video;
}

export function createProjectMediaFigure(project, {className='', owner='work'} = {}) {
  const media=projectMedia(project);
  if (!media.video && !media.poster) return null;
  const figure=document.createElement('figure'); figure.className=className;
  const caption=document.createElement('figcaption');
  caption.textContent=media.caption+(media.video&&media.duration?' · '+media.duration+' seconds · muted':'');
  const fallback=message=>{
    figure.querySelectorAll('video').forEach(releaseProjectVideo);
    figure.querySelectorAll('video,img').forEach(node=>node.remove());
    const note=document.createElement('p');note.className='build-media-fallback';
    note.textContent=message;figure.prepend(note);
  };
  let content;
  if(media.video){
    content=createProjectVideo(media,{
      isActive:()=>figure.isConnected && (owner==='detail' ? !!figure.closest('dialog[open]') : !document.querySelector('dialog[open]') && !!figure.getClientRects().length),
      onError:()=>fallback('The recording is unavailable. The project description and evidence remain available below.'),
    });
  }else{
    content=document.createElement('img');content.src=media.poster;
    content.alt=project.title+' — existing project screenshot';content.loading='lazy';
    content.onerror=()=>fallback('The project image is unavailable. Read the documented scope below.');
  }
  figure.append(content,caption);
  if(project.caseStudy){
    const description=document.createElement('p');description.className='build-media-description';
    description.textContent=project.caseStudy.demonstrated;figure.append(description);
  }
  return figure;
}
if(typeof document!=='undefined'){
  document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseProjectMedia();});
  window.addEventListener('portfolio:navigate',()=>pauseProjectMedia());
  // Opening any existing dialog makes an underlying preview inactive.
  const openObserver=new MutationObserver(records=>{
    if(records.some(r=>r.target instanceof HTMLDialogElement&&r.target.open))pauseProjectMedia();
  });
  openObserver.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
}
