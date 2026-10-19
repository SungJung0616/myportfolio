# FIX 06 — Editorial Career Gallery and frame-focused navigation

Reconstructed on 2026-10-18. FIX 06, FIX 06B, subsequent frame-placement feedback, and the role-title correction are grouped for context, not represented as isolated Git patches.

[Index](INDEX.md) · [Baseline](BASELINE.md)

| State | Evidence status |
| --- | --- |
| Requested | Editorial typography, one readable frame per stop, clearer interaction, and a title correction appear in accessible Codex messages. |
| Designed | Progressive disclosure, consistent framing, and restrained gold feedback are supported by requests and current source. |
| Implemented locally | Gallery, camera stops, frame spacing, and highlight logic exist. |
| Verified | Historical captures show layouts; full input/lighting behavior is **Not independently verified** here. |
| Committed | These changes are absent from audited HEAD `9b03cb1`. |
| Included in PR | Not in the audited PR snapshot. |
| Deployed | Latest local gallery deployment is not established. |

## Problem

The user wanted a more expressive career presentation and later supplied screenshots where scrolling stopped between frames or cropped later entries. The first readable frame became the reference for consistent second and third stops. The user also corrected the current role to Senior Operations Manager.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Gallery logic](../../../preview/v0304-p2-hero-cta/career-gallery.js) and [editorial styles](../../../preview/v0304-p2-hero-cta/career-gallery.css).
- [Camera/layout data](../../../preview/v0304-p2-hero-cta/spatial-data.js), [scroll settling](../../../preview/v0304-p2-hero-cta/career-walk.js), and [frame interaction](../../../preview/v0304-p2-hero-cta/exterior.js).
- [Career records](../../../preview/v0304-p2-hero-cta/career-data.js).
- Captures: editorial overview (`fix06-career-desktop.png`), mobile (`fix06-career-mobile.png`), third-frame refinement (`career-ux-wheel-3.png`), and hover (`career-ux-hover.png`). Images require publication review.

## Alternatives

The user explicitly suggested relocating frames or distributing them more evenly through the existing corridor, with camera adjustment where needed. Hover outlines and stronger selection lighting were both proposed. No comparative experiment or rejected-option record was located.

## Decision

Keep concise physical exhibits and place detailed responsibilities, tools, outcomes, and related links in the existing modal. Align each career stop with its frame rather than stop midway between exhibits. Preserve the corridor length while distributing entry and exit clearance more evenly.

## Implementation

The gallery uses a large Georgia heading, a restrained timeline, and detailed experience views with back/close controls and focus restoration. Existing content includes attribution and approximate-result qualifications; the journal does not independently authenticate employment claims.

Current frame centers are `3.875`, `-1.86`, and `-7.595` scene units, spaced equally at `5.735`. The three career rail stops share corresponding camera/target heights and field of view. Native scroll progress remains the source of position; a scoped settling routine selects nearby gallery stops. Raycast-based pointer feedback adds a gold outline and hint, while selection increases the dedicated light and opens the matching record. Closing clears selection.

The working-tree diff changes the current role from Operations Manager to Senior Operations Manager. The accessible user correction supports that title; the source comment's date is not treated as an independently verified event timestamp.

## Verification

The third-frame capture was inspected and shows a centered readable frame. It still says Operations Manager, so it predates or differs from the current title text. It is not evidence that the latest title correction was visually checked. Saved screenshots do not establish scroll snapping, Escape, focus return, or highlight reset across devices; no complete execution record was found.

## Limitations

FIX 03 content work and FIX 06 presentation changes share files. Exact milestone deltas and original implementation dates are unavailable. The updated career rail has three stops; old two-stop or twelve-camera checks cannot automatically validate it.

## Lessons Learned

Camera framing, physical placement, and scrolling are one reading experience. Keep historical captures even when copy changes, but label their limitations so an older title or layout is not mistaken for the current baseline.
