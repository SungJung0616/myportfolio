import React, { useCallback, useEffect, useState } from 'react';
import CourtCinema from './CourtCinema';

export default function CourtIntro() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const finish = useCallback(() => setPlaying(false), []);
  const showCinema = useCallback(() => setReady(true), []);
  const useFallback = useCallback(() => { setReady(false); setFallback(true); }, []);
  const replay = () => { setReady(false); setFallback(false); setPlaying(true); };
  useEffect(() => {
    if (!window.matchMedia) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    try { if (!motion.matches && !sessionStorage.getItem('court-intro-v3-seen')) setPlaying(true); } catch (_) { if (!motion.matches) setPlaying(true); }
    const stop = () => setPlaying(false);
    motion.addEventListener?.('change', stop);
    return () => motion.removeEventListener?.('change', stop);
  }, []);
  useEffect(() => {
    if (!playing) return;
    try { sessionStorage.setItem('court-intro-v3-seen', '1'); } catch (_) {}
    const timeout = setTimeout(() => setPlaying(false), 10000);
    const escape = event => { if (event.key === 'Escape') setPlaying(false); };
    window.addEventListener('keydown', escape);
    return () => { clearTimeout(timeout); window.removeEventListener('keydown', escape); };
  }, [playing]);
  useEffect(() => {
    if (!playing || !fallback) return;
    const timeout = setTimeout(finish, 4200);
    return () => clearTimeout(timeout);
  }, [playing, fallback, finish]);
  return <>
    <div className="intro-toolbar"><button className="replay-court" onClick={replay}>↻ Replay court intro</button></div>
    {playing && <div className={`court-intro cinematic-intro ${ready ? 'cinema-ready' : ''} ${fallback ? 'cinema-fallback' : ''}`} aria-label="Basketball opening animation">
      <button className="skip-court" onClick={() => setPlaying(false)}>Skip intro →</button>
      {!fallback && <CourtCinema onReady={showCinema} onFinish={finish} onUnavailable={useFallback} />}
      {!ready && !fallback && <div className="court-loading">LIGHTS ON. YOUR COURT.</div>}
      <div className="arena-glow" />
      <svg className="court-scene" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id="floor" x2="0" y2="1"><stop stopColor="#674328"/><stop offset="1" stopColor="#25192e"/></linearGradient></defs>
        <path d="M250 410H750L1150 700H-150Z" fill="url(#floor)"/>
        <g fill="none" stroke="#dcae57" strokeWidth="2" opacity=".55"><path d="M280 430H720L980 680H20Z"/><path d="M435 430L340 610H660L565 430"/><ellipse cx="500" cy="610" rx="160" ry="40"/><path d="M315 443C-80 750 1080 750 685 443"/></g>
        <path d="M500 150V285" stroke="#514761" strokeWidth="12"/>
        <rect x="408" y="185" width="184" height="115" rx="3" fill="#211a30" stroke="#eee4cd" strokeWidth="3"/>
        <path d="M467 298V250H533V298" fill="none" stroke="#ffce62" strokeWidth="3"/>
        <g className="court-net" fill="none" stroke="#e9e1ce" strokeWidth="2"><path d="M460 307L477 358H523L540 307M474 309L487 358M488 309L497 358M502 309L507 358M516 309L517 358M530 309L527 343M467 324H533M472 339H528"/></g>
        <ellipse cx="500" cy="306" rx="43" ry="9" fill="none" stroke="#ef9f38" strokeWidth="6"/>
        <ellipse className="ball-shadow" cx="500" cy="558" rx="40" ry="9" fill="#09060f" opacity=".7"/>
        <g className="shot-ball"><circle r="24" fill="#d97a27" stroke="#f4b84e" strokeWidth="2"/><g fill="none" stroke="#462333" strokeWidth="2"><path d="M-24 0H24M0-24V24M-17-17Q15 0-17 17M17-17Q-15 0 17 17"/></g></g>
      </svg>
      <div className="intro-caption" key={ready ? 'ready' : 'waiting'}><span>SUNG JUNG / HOME COURT</span><strong>Every play has a purpose.</strong></div>
    </div>}
  </>;
}
