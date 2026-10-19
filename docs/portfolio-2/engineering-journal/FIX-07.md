# FIX 07 — Court geometry, display polish, and scoreboard interaction

Reconstructed on 2026-10-18. FIX 07 visual work and FIX 07B interaction cleanup are distinct requests sharing the current source snapshot.

[Index](INDEX.md) · [Baseline](BASELINE.md)

| State | Evidence status |
| --- | --- |
| Requested | Court accuracy, portable goals, board/display polish, then scoreboard interaction removal. |
| Designed | A consistent NBA-inspired scale, procedural goals, and a noninteractive game display were specified. |
| Implemented locally | Current source contains these structures and excludes the display from the project hit handler. |
| Verified | Historical views exist; geometry compliance and full interaction regression are **Not independently verified** here. |
| Committed | Not in audited HEAD `9b03cb1`. |
| Included in PR | Not in the audited PR snapshot. |
| Deployed | Deployment of the latest local version is not established. |

## Problem

The FIX 07 request identified inconsistent court-line relationships and simplified pole-style hoops. It also asked for a physical coaching-board appearance and legible scoreboard. FIX 07B subsequently clarified that the scoreboard should be an architectural element, without popup or hover affordances. HOME/AWAY restoration and tribute values originated in earlier fixes and are not new FIX 07 outcomes.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Procedural court and goal module](../../../preview/v0304-p2-hero-cta/arena-court.js).
- [Board and scoreboard construction](../../../preview/v0304-p2-hero-cta/project-space.js) and [arena caller](../../../preview/v0304-p2-hero-cta/exterior.js).
- Captures: earlier court (`fix07-before-court.png`), court (`fix07-court.png`), goal detail (`fix07-goal-detail.png`), coaching board (`fix07-board.png`), and scoreboard (`fix07-scoreboard.png`). Images require publication review.

## Alternatives

The request explicitly preferred one internally consistent court specification and lightweight procedural goals, avoiding individual line adjustments by eye or heavy imported assets. No evidence of competing prototypes or measured alternatives was located.

## Decision

Define shared court dimensions and generate mirrored markings and goal assemblies from them. Use canvas textures for fine court/display graphics and instancing for net segments. Keep interactive project exploration on the coaching board; the physical scoreboard presents illustrative game values only.

## Implementation

`courtSpec` describes a 94-by-50-foot NBA-inspired layout scaled by `0.24` into the existing 24-by-13 scene floor. Lane, circle, arc, rim, and backboard coordinates share that scale. The code cites an official court specification, but this reconstruction did not independently verify full rules compliance.

Mirrored goals include transparent backboards, target rectangles, rims, instanced nets, padded supports, and grounded bases. Goal meshes disable shadow casting. The board has a dimensional frame and an explicitly illustrative Input/System/Review graphic.

The scoreboard draws seven-segment figures on a canvas and uses an unlit material to retain contrast. It displays HOME 24, AWAY 08, 01:26, QTR 2, and 01.26.2020, with an illustrative-game label. The current project hit handler opens only the board face; associated project controls are shown at the bench stop. The rail's scoreboard viewing stop still exists.

## Verification

The saved scoreboard image was inspected and confirms the displayed values and digital treatment in that capture. It also contains the older Korean result CTA, so it does **not** prove FIX 07B cleanup. Current source supports the cleanup, but no saved execution log independently demonstrates the final pointer/keyboard behavior. No performance improvement is claimed from geometry choices alone.

## Limitations

The request included broad lighting and architectural polish. The inspected cumulative diff does not reliably attribute every arena adjustment to FIX 07, so completion of that broader list is not asserted. Historical screenshots do not establish present camera or Playbook regression results.

## Lessons Learned

Use one coordinate model for related geometry, and distinguish visual correctness from formal compliance. A screenshot can verify a display while simultaneously revealing that it predates a later interaction fix.
