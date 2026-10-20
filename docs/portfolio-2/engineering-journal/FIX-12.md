# FIX 12 — Glass entrance and reversible scroll continuity

Reconstructed on 2026-10-18; this is not an implementation date. See [index](INDEX.md) and [baseline](BASELINE.md).

**Status:** Requested; local implementation inspected. Historical browser results are reported in the accessible Codex continuity summary, not independently rerun. Uncommitted and outside the PR baseline at `9b03cb1`; deployment of this local state is not established.

## Problem

FIX 12 concerned the Film Lab glass entrance and reverse-scroll navigation. The later available discussion identified a wheel conflict in the project selector. The entrance needed to remain traversable in either direction, while normal scrolling continued through Film Lab, Stack, and Work. These were related navigation concerns, not a request for a new camera rail.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Glass-door implementation](../../../preview/v0304-p2-hero-cta/film-entrance.js), [scene assembly](../../../preview/v0304-p2-hero-cta/project-space.js), and [render-loop integration](../../../preview/v0304-p2-hero-cta/exterior.js).
- [Stack scroll styles](../../../preview/v0304-p2-hero-cta/stack-table.css) and historical check definition (`fix12-check.cjs`).
- Entrance capture (`fix12-glass-entrance.png`) and open-door capture (`fix12-glass-open.png`).
- Later unnumbered follow-up: plaque capture script (`capture-film-plaque.cjs`), desktop plaque capture (`film-plaque-desktop.png`), and mobile plaque capture (`film-plaque-mobile.png`).

Open-door and desktop plaque captures were visually inspected during reconstruction. Captures represent specific frames, not complete traversal tests.

## Alternatives

The available implementation record contrasts progress-driven door poses with an independent animation clock. No documented trial of a timer-driven candidate survives. The later selector redesign is recorded under [FIX 10](FIX-10.md) as an unnumbered follow-up, not retroactively assigned to FIX 12.

## Decision

Derive both door-leaf angles from the same camera-rail progress used by the scene. Reversing progress therefore retraces the door pose without delayed callbacks. Keep reduced-motion doors open. Let scrollable editorial regions hand wheel input back to the page at their boundaries.

## Implementation

The door helper adds thin trim, two transparent glass leaves, restrained reflection strips, and handles within the existing opening. Smoothstep intervals open the leaves before passage and close them after the inward swing clears the camera. There is no separate animation loop. `exterior.js` updates the doors during its existing tick and exposes the opening fraction for inspection.

Stack detail uses `overscroll-behavior-y: auto`. The old Film list was subsequently removed in the console follow-up, so its original CSS fix is no longer directly inspectable in the current file.

An unnumbered follow-up replaces the entrance title with a dimensional purple/ivory plaque reading “The Film Lab,” with a small “STUDY THE PLAY” subtitle. Current entry/import query tokens identify the revised scene module; the accessible summary attributes that versioning to a stale-module mismatch encountered in the in-app browser.

## Verification

An accessible assistant continuity summary reports focused traversal checks, but no preserved raw execution log corroborates those results. The script defines round trips, reversals, selection retention, Work navigation, browser Back, mobile chaining, and reduced-motion assertions. Test completion, observed frame counts, and error totals are **Not independently verified** and are not presented as established results.

The historical script still targets removed `.film-wall-*` selectors and must not be presented as a passing test of the latest console. Later plaque captures are supported by a capture script, not a complete regression certificate.

## Limitations

The original detailed FIX 12 attachment was not independently recovered for this entry. Exact historical patch boundaries and browser-version coverage remain unknown. Screenshots with embedded project imagery need publication review. No benchmark or performance improvement is claimed.

## Lessons Learned

Navigation-linked geometry is easier to reverse reliably when its state derives from navigation progress. Scroll chaining and camera motion are separate concerns. A later UI replacement can preserve the fix's intent while invalidating its original test selectors.
