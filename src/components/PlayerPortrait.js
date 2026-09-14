import React from 'react';
import portrait from '../assets/sung-player-cartoon-v2.png';

export default function PlayerPortrait() {
  return <div className="player-stage portrait-stage">
    <img className="player-portrait" src={portrait} alt="Cartoon portrait of Sung wearing a gold number 77 Lakers uniform and purple and white Nike basketball shoes, holding a basketball" width="1024" height="1536" />
    <div className="player-caption"><span>HOME COURT / GARDENA, CA</span><strong>SUNG JUNG</strong><p>Lakers faithful. T1 loyal.</p></div>
  </div>;
}
