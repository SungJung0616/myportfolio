import React from 'react';
import portrait from '../assets/sung-player-six-head-v4.png';

export default function PlayerPortrait() {
  return <div className="player-stage portrait-stage">
    <img className="player-portrait" src={portrait} alt="Illustrated Sung in a gold number 77 Lakers jersey, black baggy cargo pants and purple and white Nike shoes, holding a basketball" width="1024" height="1536" />
    <div className="player-caption"><span>HOME COURT / GARDENA, CA</span><strong>SUNG JUNG</strong><p>Lakers faithful. T1 loyal.</p></div>
  </div>;
}
