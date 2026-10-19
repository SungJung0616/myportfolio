# FIX 02 — Restore a basketball scoreboard

[Index](INDEX.md) · [Baseline](BASELINE.md)

Reconstructed on 2026-10-18; implementation dates are not established. This entry separates the first HOME/AWAY restoration from the later tribute values requested alongside FIX 03 and the subsequent FIX 07/07B refinements.

| State | Evidence status |
| --- | --- |
| Requested | Accessible task requests distinguish the arena scoreboard from project outcomes. |
| Designed | HOME/AWAY, illustrative scores, clock and quarter; later minimal tribute values. |
| Implemented locally | Current canvas texture contains the basketball presentation and tribute. |
| Verified | Historical captures visibly confirm both value sets; runtime interactions are **Not independently verified** here. |
| Committed | No FIX-specific commit; changes are mixed in `project-space.js`. |
| Included in PR | Not in the recorded PR baseline at `9b03cb1`. |
| Deployed | Evidence unavailable for these local changes. |

## Problem

The physical arena scoreboard displayed the Coupang preparation-time result as its default content. The user wanted it to read as a believable basketball scoreboard, with business results remaining inside the interactive Playbook.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Current board and scoreboard builder](../../../preview/v0304-p2-hero-cta/project-space.js).
- First restoration capture (`fix-02-scoreboard.png`): HOME 24, AWAY 18, clock 08:24, QTR 2, and an illustrative-game label.
- Later tribute capture (`fix-03-scoreboard.png`): HOME 24, AWAY 08, clock 01:26 and date 01.26.2020.
- [Coupang prototype content](../../../preview/p2-03b-playbook/coupang.js), where the approximate preparation-time outcome remains part of the case.

Both captures were visually inspected during reconstruction. Publication review remains pending. Their filenames do not establish implementation dates.

## Alternatives

The request ruled out new animations, geometry, and a separate memorial screen. It allowed a small tribute date only if the existing display supported it. Evidence of other evaluated designs is unavailable.

## Decision

Separate environmental storytelling from professional evidence: the physical display carries an illustrative game, while project impact belongs to the Playbook. The later tribute uses requested values without presenting them as an actual match result.

## Implementation

The scoreboard canvas now renders HOME/AWAY, 24/08, a 01:26 clock, QTR 2 and the date. Its current seven-segment drawing and unlit face material retain contrast under court lighting. Those presentation details reflect later cumulative work and are not attributed entirely to FIX 02. The current physical hit handler opens only the Playbook board, not the scoreboard.

## Verification

The two preserved frames demonstrate the restoration and subsequent tribute values. They also show that the old Korean preparation-time CTA was still present underneath at that historical point. This prevents treating FIX 02 as completion of the later scoreboard-interaction cleanup. No dedicated historical runtime test result was found.

## Limitations

The current source is a combined endpoint after later arena polish. Exact per-FIX geometry, type, and hit-target changes cannot be recovered reliably from the available commits. Current legibility at all camera positions was not independently retested.

## Lessons Learned

Changing a display texture and changing its interaction are separate responsibilities. Historical captures can expose remaining UI coupling even when the visual acceptance criterion has been met.
