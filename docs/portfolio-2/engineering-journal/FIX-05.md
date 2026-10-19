# FIX 05 — Welcome performance and arrival behavior

Reconstructed on 2026-10-18 from the current working tree and accessible Codex task messages. This is not a dated implementation log.

[Index](INDEX.md) · [Baseline](BASELINE.md)

| State | Evidence status |
| --- | --- |
| Requested | Welcome-only introduction, then FIX 05A-2/05A-3 refinements and later arrival/replay feedback are accessible in this Codex thread. |
| Designed | Silent performance, automatic captions, restrained gestures, and a character-adjacent bubble were requested. |
| Implemented locally | Current modules contain these mechanisms; exact subfix patches are not recoverable. |
| Verified | Historical still images exist; timing, cancellation, and complete motion are **Not independently verified** in this reconstruction. |
| Committed | Not in the audited HEAD `9b03cb1`. |
| Included in PR | Not in the audited PR snapshot; these local changes remain uncommitted. |
| Deployed | Deployment of this local implementation is not established. |

## Problem

The user described the original welcome as passive and slow, then identified a rigid sideways arm pose. Later feedback said scrolling could pass the character before the greeting was noticed and that a replay control at the lower left was easy to miss. These are successive concerns, not proof that every requested behavior passed testing.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Welcome logic](../../../preview/v0304-p2-hero-cta/welcome-intro.js) and [bubble styles](../../../preview/v0304-p2-hero-cta/welcome-intro.css).
- [Arena integration](../../../preview/v0304-p2-hero-cta/exterior.js), which loads the existing GLB, attaches the introduction, and updates it from the render loop.
- Historical captures: initial welcome (`fix05a-welcome.png`), gesture refinement (`fix05a3-welcome.png`), desktop bubble (`welcome-bubble-desktop.png`), and mobile bubble (`welcome-bubble-mobile.png`). Publication review is required before treating these as public assets.

## Alternatives

The accessible requests distinguish a freely skippable introduction from a more noticeable arrival pause, and explicitly suggest moving Replay above the character. Rebuilding the character or adding audio was excluded. Evidence of other evaluated alternatives is unavailable.

## Decision

Reuse existing rigid mesh parts and the existing frame loop. Make the greeting noticeable through motion and placement while retaining Skip, keyboard cancellation, and eventual scroll dismissal. The latest brief arrival hold supersedes the earlier request to honor continued scrolling immediately.

## Implementation

Shoulder, wrist, and neck groups are created around existing meshes. The solid arms have no elbow joints. Greeting motion lifts forward with a small hand wave; the invitation uses a low forward extension and head turn. Mouth scaling is text-timed, without audio or phoneme synchronization.

Captions use 3.0, 2.8, and 2.2-second segments, with a programmed eight-second finish. The implementation briefly absorbs arrival momentum, holds camera progression, and allows later scroll input to dismiss. Seen state lasts for the current page instance; it is not persistent storage. Replay and captions are projected near the character. Reduced motion restores the static pose.

## Verification

The desktop bubble capture was visually inspected during reconstruction and shows the first caption, both controls, and the character together. A still image cannot establish an eight-second duration, gesture quality over time, Skip reliability, or reverse-scroll behavior. No historical execution log for those assertions was located.

## Limitations

No articulated elbows, audio track, or phoneme-accurate lip sync exists here. The scroll-hold rationale is recoverable, but its final usability outcome needs a focused interaction check. A nearby older comment in `exterior.js` says captions never own scroll input; the current implementation now includes a brief hold.

## Lessons Learned

Capture the interaction policy as well as the visual result. A screenshot can verify bubble placement but cannot validate timing or cancellation. Gesture design must reflect the actual rig rather than imply joints that do not exist.
