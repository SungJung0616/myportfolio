// A camera-only tour. It never changes the scroll rail or rotates the scoreboard.
export const FACE_NAMES=['Game results','Starting five','Bench unit','Next Game Preview'];
export const FACE_DWELL_SECONDS=2.8;
export const TOUR_RADIUS=9.8;
export const FACE_TRANSITION_SECONDS=.65;
export function createTourState(){
 let active=false,playing=false,angle=0,from=0,to=0,elapsed=0,dwell=0,moving=false,paused=false,complete=false;
 const wrap=n=>(n%4+4)%4;
 function go(delta,instant=false){paused=false;from=angle;to=Math.round(angle/(Math.PI/2))*Math.PI/2+delta*Math.PI/2;elapsed=0;dwell=0;moving=!instant;if(instant)angle=to;}
 const position={x:0,y:9,z:-29+TOUR_RADIUS};
 return {
  get complete(){return complete;},get active(){return active;},get playing(){return playing;},get angle(){return angle;},get moving(){return moving;},get face(){return wrap(Math.round(angle/(Math.PI/2)));},
  start(reduced){complete=false;active=true;playing=!reduced;paused=false;angle=from=to=elapsed=dwell=0;moving=false;},
  stop(){active=false;playing=false;moving=false;paused=false;},
  pause(){playing=false;paused=true;},
  toggle(reduced){playing=!reduced&&!playing;paused=!playing;dwell=0;},
  step(delta,instant,reduced=false){playing=!reduced;go(delta,instant);},
  update(dt,reduced){if(!active)return;if(reduced){playing=false;angle=to;moving=false;return;}if(paused)return;if(moving){elapsed+=Math.max(0,dt);const t=Math.min(1,elapsed/FACE_TRANSITION_SECONDS),e=t*t*(3-2*t);angle=from+(to-from)*e;if(t===1){moving=false;dwell=0;}}else if(playing){dwell+=Math.max(0,dt);if(dwell>=FACE_DWELL_SECONDS)go(1);}},
  pose(){position.x=Math.sin(angle)*TOUR_RADIUS;position.z=-29+Math.cos(angle)*TOUR_RADIUS;return position;}
 };
}
