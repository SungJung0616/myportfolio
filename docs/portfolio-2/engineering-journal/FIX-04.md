# FIX 04 family — Film and editorial transition continuity

[Index](INDEX.md) · [Baseline](BASELINE.md)

Reconstructed on 2026-10-18. This entry covers the documented FIX 04 background request, 04B destination continuity, 04C reverse scroll, 04D performance investigation, and the later 04E editorial-background request. It does not certify each subtask as independently completed.

| State | Evidence status |
| --- | --- |
| Requested | Accessible conversation records blue/empty frames, skipped Film visits and slow-looking reverse transitions. |
| Designed | Correct scroll/visibility ownership and preserve scene reuse; avoid masking defects with delays or loading screens. |
| Implemented locally | Relevant cumulative CSS, navigation and render-loop changes are present. |
| Verified | Two historical endpoint captures exist. Continuous transitions and performance gains are **Not independently verified** here. |
| Committed | No FIX-specific commit; changes are mixed with later Film and navigation work. |
| Included in PR | Not in the recorded PR baseline at `9b03cb1`. |
| Deployed | Evidence unavailable for these local revisions. |

## Problem

The failure crossed Film Room, the camera rail, editorial content and overlay visibility. Subsequent requests clarified that changing the blue background did not resolve skipped destinations or near-empty ivory intervals. The user requested measured diagnosis rather than blaming hardware.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Navigation and reading boundary](../../../preview/v0304-p2-hero-cta/navigation.js), [visibility rules](../../../preview/v0304-p2-hero-cta/navigation.css), and [document background override](../../../preview/v0304-p2-hero-cta/exterior.css).
- [Renderer/camera loop](../../../preview/v0304-p2-hero-cta/exterior.js) and [Film lifecycle](../../../preview/v0304-p2-hero-cta/film.js).
- Historical Film frame (`fix04-inspect-film.png`) and editorial exit frame (`fix04-inspect-exit.png`), visually inspected during reconstruction. Publication review remains pending.
- Git comparison against `9b03cb1` establishes the earlier and current implementations, but not intermediate subfixes.

## Alternatives

The requests distinguished layout/threshold defects from asset loading, scene recreation and rendering delay. Arbitrary delays, permanent overlays and indiscriminate quality reduction were rejected constraints. No persisted comparison of alternative fixes or benchmark report was found.

## Decision

Tie the 2D/3D handoff to editorial content entering the viewport, keep Film lifecycle updates running during the handoff, and reuse the existing scene. This is the approach supported by current code, not a reconstructed account of every debugging session.

## Implementation

The older reading-mode threshold was `rail height - viewport height + 40`; it could hide the canvas while editorial content was still near the viewport bottom. Current navigation uses the content top relative to the header. The document receives a warm ivory fallback instead of the earlier sky-blue HTML background.

Navigation cleanup now exits Film without also requesting a court jump. Camera progress clamps at the rail end, and Film's camera contribution blends near the final rail segment. The current loop reconciles Film state before skipping repeated rendering under fully covering editorial content. It caches UI references and avoids repeated stop-label writes. Scene and renderer initialization remain outside re-entry; they were already created once in the committed baseline. The existing pixel-ratio cap is not a new FIX 04 improvement.

## Verification

The captures show Film and Work endpoints with coherent surfaces. They cannot prove an uninterrupted round trip. No retained before/after FPS, frame-time result or original FIX 04 runtime log was found. No browser test was run for this documentation task.

## Limitations

Later FIX 10/12 and console work also changed these files. Current thresholds and overlays cannot be attributed exclusively to FIX 04. The current editorial order starts with Stack rather than the historical Work-first order. The render loop still schedules animation frames; it skips expensive work rather than stopping the scheduler.

## Lessons Learned

A blank frame can result from visibility being switched before content covers the viewport. Diagnose layout ownership and state transitions separately from GPU cost, and preserve transition recordings and measurements before claiming a performance improvement.
