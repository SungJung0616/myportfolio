import * as T from './three.module.js';
// Rigid-part gestures reuse the existing GLB; no replacement mesh or skeletal rig.
const captions = [
  ["Hey, I'm Sung. I connect operations, QA, and automation.", 3000],
  ['I build practical tools that make complex work simpler.', 2800],
  ['Welcome to my arena. Take a look around!', 2200],
];

export function createWelcomeIntro() {
  const css = document.createElement('link');
  css.rel = 'stylesheet'; css.href = new URL('./welcome-intro.css', import.meta.url).href;
  document.head.append(css);
  const panel = document.createElement('aside');
  panel.id = 'welcome-intro'; panel.hidden = true;
  panel.setAttribute('aria-label', 'A welcome from Sung');
  panel.innerHTML = `<div class="welcome-heading"><span>MEET SUNG</span><span class="welcome-count"></span></div>
    <p class="welcome-caption" aria-live="polite" aria-atomic="true"></p>
    <div class="welcome-actions"><button type="button" class="welcome-explore">Explore the Arena</button><button type="button" class="welcome-skip">Skip Intro</button></div>`;
  const replay = document.createElement('button');
  replay.id = 'welcome-replay'; replay.type = 'button'; replay.textContent = 'Replay Intro'; replay.hidden = true;
  document.body.append(panel, replay);
  const caption = panel.querySelector('.welcome-caption'), count = panel.querySelector('.welcome-count');
  let model, parts = [], baseYaw = 0, seen = false, active = false, near = false;
  let index = 0, elapsed = 0, settled = 0, previousProgress = -1, startedAt = 0, startScroll = 0;
  let head, greetingArm, presentingArm, greetingHand, presentingHand;
  let arriving = false, lastManualInput = -Infinity, previousScroll = scrollY;
  let bubbleNode = null, bubbleWidth = 0, bubbleHeight = 0, bubbleDirty = true, lastBubbleX = -1, lastBubbleY = -1;
  const anchor = new T.Vector3();
  const entranceY = () => .14 * (document.querySelector('#rail').offsetHeight - innerHeight);
  const bubbleObserver = new ResizeObserver(() => { bubbleDirty = true; });
  bubbleObserver.observe(panel); bubbleObserver.observe(replay);
  addEventListener('resize', () => { bubbleDirty = true; });

  function attach(character) {
    model = character; baseYaw = model.rotation.y;
    const meshes = [];
    character.traverse(mesh => { if (mesh.isMesh) meshes.push(mesh); });
    function pivot(name, position, members) {
      const group = new T.Group(); group.name = name; group.position.set(...position);
      character.add(group); character.updateMatrixWorld(true);
      members.forEach(mesh => group.attach(mesh));
      return group;
    }
    const arms = meshes.filter(mesh => /^(tee sleeve|bare arm|relaxed palm|wrist|individual relaxed finger|thumb)/.test(mesh.name.replaceAll('_', ' ')));
    const side = mesh => { mesh.geometry.computeBoundingBox(); return mesh.geometry.boundingBox.getCenter(new T.Vector3()).applyMatrix4(mesh.matrix).x; };
    const right = arms.filter(mesh => side(mesh) > 0), left = arms.filter(mesh => side(mesh) < 0);
    greetingArm = pivot('welcome-shoulder-right', [.43, 1.76, 0], right);
    presentingArm = pivot('welcome-shoulder-left', [-.43, 1.76, 0], left);
    // Hands are separate existing meshes. Keep each solid arm intact: it has no elbow joint.
    const handParts = members => members.filter(mesh => /^(relaxed palm|individual relaxed finger|thumb)/.test(mesh.name.replaceAll('_', ' ')));
    greetingHand = pivot('welcome-wrist-right', [.62, 1.245, .06], handParts(right));
    presentingHand = pivot('welcome-wrist-left', [-.62, 1.245, .06], handParts(left));
    greetingArm.attach(greetingHand); presentingArm.attach(presentingHand);
    head = pivot('welcome-neck', [0, 1.98, 0], meshes.filter(mesh => /^(head topology|ear|inner ear|eye almond|iris|pupil|catchlight|upper eyelid|brow|smile opening|teeth|lower lip|side hair|cap |curved cap)/.test(mesh.name.replaceAll('_', ' '))));
    character.traverse(mesh => {
      const name = mesh.name.replaceAll('_', ' ');
      if (!mesh.isMesh || !['smile opening', 'teeth', 'lower lip'].includes(name)) return;
      mesh.geometry.computeBoundingBox();
      parts.push({mesh, name, scale: mesh.scale.clone(), position: mesh.position.clone(),
        centerY: (mesh.geometry.boundingBox.min.y + mesh.geometry.boundingBox.max.y) / 2});
    });
  }
  function restore() {
    for (const part of parts) { part.mesh.scale.copy(part.scale); part.mesh.position.copy(part.position); }
    if (model) model.rotation.y = baseYaw;
    for (const joint of [head, greetingArm, presentingArm, greetingHand, presentingHand]) joint?.rotation.set(0, 0, 0);
  }
  function showCaption() {
    caption.textContent = captions[index][0]; count.textContent = `${index + 1} / ${captions.length}`;
  }
  function start() {
    if (!near || !model) return;
    seen = active = true; arriving = false; index = elapsed = 0; startedAt = performance.now(); startScroll = scrollY;
    showCaption(); panel.hidden = false; replay.hidden = true;
    document.body.classList.add('welcome-active');
  }
  function close() {
    const hadFocus = panel.contains(document.activeElement);
    active = arriving = false; panel.hidden = true; restore();
    document.body.classList.remove('welcome-active');
    replay.hidden = !near || !seen;
    if (hadFocus) {
      (near ? replay : document.querySelector('[data-destination="home"]'))?.focus({preventScroll:true});
    }
  }
  panel.querySelector('.welcome-explore').onclick = close;
  panel.querySelector('.welcome-skip').onclick = close;
  replay.onclick = start;
  addEventListener('portfolio:navigate', () => { lastManualInput = -Infinity; if (active || arriving) close(); });
  document.addEventListener('click', event => {
    if (event.target.closest('[data-stop]')) { lastManualInput = -Infinity; if (active || arriving) close(); }
  }, true);
  addEventListener('keydown', event => {
    if (event.key === 'Escape' && (active || arriving)) { close(); return; }
    if (!['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(event.key) || event.target.closest('button,input,a')) return;
    lastManualInput = performance.now(); if (active || arriving) close();
  });
  function manualScroll(event) {
    lastManualInput = performance.now();
    // Absorb arrival momentum briefly, then let a continuing scroll dismiss the welcome.
    if (arriving || (active && performance.now() - startedAt < 900)) { event.preventDefault(); return; }
    if (active) close();
  }
  addEventListener('wheel', manualScroll, {passive:false});
  addEventListener('touchmove', manualScroll, {passive:false});
  addEventListener('scroll', () => {
    const y = scrollY, target = entranceY(), downAcross = previousScroll < target && y >= target;
    previousScroll = y;
    if (!seen && model && downAcross && performance.now() - lastManualInput < 1200 && !document.querySelector('dialog[open]')) {
      seen = arriving = true; startScroll = target; settled = 0;
      scrollTo({top:target,behavior:'instant'}); previousScroll = target; return;
    }
    if ((active || arriving) && Math.abs(y - startScroll) > 1) {
      if (arriving || performance.now() - startedAt < 900) scrollTo({top:startScroll,behavior:'instant'});
      else close();
    }
  }, {passive:true});
  document.addEventListener('visibilitychange', () => { if (document.hidden && (active || arriving)) close(); });

  function update(progress, goal, dt, reducedMotion) {
    near = progress >= .125 && progress <= .175 && goal >= .125 && goal <= .175
      && !document.body.classList.contains('reading-mode') && !document.querySelector('dialog[open]');
    if (active && !near) close();
    replay.hidden = !near || !seen || active || arriving;
    const still = near && Math.abs(progress - goal) < .001 && Math.abs(progress - previousProgress) < .00015;
    previousProgress = progress;
    settled = still ? settled + dt : 0;
    if ((!seen || arriving) && model && settled >= .35) start();
    if (!active || document.hidden) return;
    const total = performance.now() - startedAt;
    if (total >= 8000) { close(); return; }
    const nextIndex = total < 3000 ? 0 : total < 5800 ? 1 : 2;
    if (nextIndex !== index) { index = nextIndex; showCaption(); }
    elapsed = total - [0, 3000, 5800][index];
    if (reducedMotion) { restore(); return; }
    // A small text-timed speaking gesture, not audio or phoneme lip sync.
    const envelope = Math.min(1, elapsed / 250, Math.max(0, (captions[index][1] - elapsed) / 350));
    const opening = (.5 + .5 * Math.sin(elapsed / 105)) * envelope;
    for (const part of parts) {
      if (part.name === 'lower lip') part.mesh.position.y = part.position.y - opening * .008;
      else {
        const factor = part.name === 'teeth' ? .8 + opening * .2 : .72 + opening * .5;
        part.mesh.scale.y = part.scale.y * factor;
        part.mesh.position.y = part.position.y + part.centerY * part.scale.y * (1 - factor);
      }
    }
    const ease = value => { const v = Math.max(0, Math.min(1, value)); return v*v*v*(v*(v*6-15)+10); };
    const greeting = ease(total / 650) * (1 - ease((total - 1650) / 950));
    const wave = ease((total - 650) / 200) * (1 - ease((total - 1550) / 250));
    const speaking = ease((total - 3400) / 550) * (1 - ease((total - 4400) / 650));
    const present = ease((total - 5800) / 700) * (1 - ease((total - 7100) / 900));
    const life = ease(total / 300) * (1 - ease((total - 7600) / 400));
    // Lift forward, with only modest lateral opening; the small wave belongs to the hand.
    greetingArm.rotation.z = .38 * greeting + .035 * speaking;
    greetingArm.rotation.x = -1.32 * greeting - .12 * speaking;
    greetingHand.rotation.x = .12 * greeting - .06 * speaking;
    greetingHand.rotation.y = -.12 * greeting;
    greetingHand.rotation.z = .16 * Math.sin((total - 650) / 150) * wave;
    // A low, forward invitation instead of a straight horizontal arm extension.
    presentingArm.rotation.z = -.24 * present;
    presentingArm.rotation.x = -.60 * present;
    presentingHand.rotation.x = -.16 * present;
    presentingHand.rotation.y = -.42 * present;
    presentingHand.rotation.z = -.10 * present;
    head.rotation.x = .035 * Math.sin(total / 310) * life;
    head.rotation.y = (.045 * Math.sin(total / 650) - .18 * present) * life;
    model.rotation.y = baseYaw + .035 * envelope;
  }
  function positionBubble(camera) {
    const node = !panel.hidden ? panel : !replay.hidden ? replay : null;
    if (!node || !model) return;
    if (node !== bubbleNode || bubbleDirty) {
      bubbleNode = node; bubbleWidth = node.offsetWidth; bubbleHeight = node.offsetHeight;
      bubbleDirty = false; lastBubbleX = lastBubbleY = -1;
    }
    model.updateWorldMatrix(true, false); camera.updateMatrixWorld();
    anchor.set(0, 3.12, 0).applyMatrix4(model.matrixWorld).project(camera);
    const headX = (anchor.x + 1) * innerWidth / 2, headY = (1 - anchor.y) * innerHeight / 2;
    const x = Math.max(16, Math.min(innerWidth - bubbleWidth - 44, headX - bubbleWidth / 2));
    const y = Math.max(innerWidth < 800 ? 78 : 86, headY - bubbleHeight - 16);
    if (Math.abs(x - lastBubbleX) > 1 || Math.abs(y - lastBubbleY) > 1) {
      node.style.transform = `translate(${Math.round(x)}px,${Math.round(y)}px)`;
      node.style.setProperty('--welcome-tail', `${Math.max(22, Math.min(bubbleWidth - 22, headX - x))}px`);
      lastBubbleX = x; lastBubbleY = y;
    }
  }
  return {attach, update, positionBubble, get arrivalTarget() { return arriving ? .14 : null; }, get holdingCamera() { return active && Math.abs(scrollY - startScroll) <= 1; }};
}
