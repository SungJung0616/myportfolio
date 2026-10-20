# FIX 10 — Film selection, editorial Work, and navigation continuity

Reconstructed on 2026-10-18; this is not an implementation date. See [index](INDEX.md) and [baseline](BASELINE.md).

**Status:** Requested and designed in the available Codex thread; current local implementation inspected. Historical interaction checks were not independently rerun during reconstruction. The STEP 03B addendum below records fresh, focused local verification. Changes remain uncommitted and outside the PR baseline at `9b03cb1`; deployment of this state is not established.

## Problem

The FIX 10 family connected Film Lab selection to editorial Work. FIX 10C then reported overlapping selection interfaces and unstable Play/Playlist controls during Film Lab → Work → Film Lab traversal. A later unnumbered request identified a separate usability problem: the long selection list intercepted wheel movement that visitors expected to navigate the portfolio.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Film controller](../../../preview/v0304-p2-hero-cta/film.js), [Film styles](../../../preview/v0304-p2-hero-cta/film.css), and [Work accordion](../../../preview/v0304-p2-hero-cta/project-showcase.js).
- Historical wall-selector capture (`fix10c-film.png`) and later console capture (`film-console-desktop.png`), both visually inspected during reconstruction.
- FIX 10C check definition (`fix10c-check.cjs`) and console check definition (`film-console-check.cjs`).

The captures establish that both designs existed. They do not establish a complete timeline or prove every transition passed.

## Alternatives

The wall-mounted list was an implemented approach, not merely a proposal. After the user reported its wheel conflict, it was replaced by previous/next selection and an optional paged chooser. Evidence of a broader design comparison is unavailable. Adding another simultaneous selector was explicitly prohibited in FIX 10C.

## Decision

Keep one selection interface and preserve the selected project across Film and Work. The latest design gives normal page scrolling priority: selecting a project is an explicit button action, and the chooser does not own an internal scroll region.

## Implementation

Current Film code creates one console beneath the screen with a project title/count, previous/next buttons, `All projects`, `Preview`, and `Explore Project`. A nonmodal popover displays paged project thumbnails, closes after selection or Escape, and restores focus where appropriate. Passive wheel/touch handlers dismiss it without cancelling native scrolling.

Film activity and overlay visibility are separate. Controls disappear when editorial content starts entering the viewport, while the selected project remains retained. Exiting pauses video and closes the picker. Entry uses the shared catalog selection and directs focus only for explicit navigation.

Work uses expandable editorial rows with `aria-expanded`, shared IDs, evidence/details, and a project-specific `Back to Film Lab` action. The current scene no longer builds the old wall-selector anchor or poster selection meshes. These are cumulative local changes; individual historical patches are not recoverable from Git.

## Verification

An accessible assistant continuity summary reports focused console interaction checks, but no preserved execution log corroborates the reported passes. The check script defines project selection, pagination, keyboard/Escape, wheel traversal, Work return, and mobile assertions. These remain test intent, not independently established results. Exact run counts and error totals are therefore omitted.

The older FIX 10C script still expects `.film-wall-selector`, which the later implementation removes. It is historical test intent, not a valid current regression certificate. The newer console script targets the current controls. No scripts were executed in this documentation task.

## Limitations

There is no isolated FIX 10C commit or authoritative before/after state. Current browser compatibility, all media playback, and touch-device behavior require scoped revalidation. Screenshots containing project media require publication review. The unnumbered console follow-up must not be relabeled as a newly invented FIX number.

## Lessons Learned

An active 3D destination does not necessarily mean its controls should remain visible during a 2D handoff. Separating those states and eliminating nested wheel ownership makes navigation intent clearer. Historical tests must evolve when selectors and interaction concepts change.

## STEP 03B — Film viewing interval and Preview packaging

Recorded on 2026-10-18 after the approved STEP 03 verification. This is a new local correction, not a claim that the original FIX 10 or FIX 12 passed these tests. **Implemented locally and verified within the scope below; not committed, included in PR, or deployed.**

### Confirmed problem and code cause

STEP 03 reported that a normal wheel movement could cross the entire Film controls interval. Direct Film navigation worked, but wheel navigation could show the screening room without its console. Before editing in STEP 03B, a wheel traversal from `scrollY 4249` to `4347` reproduced hidden controls at the destination.

At a 1280 × 720 CSS viewport, the existing `#rail` is 5040px high and camera progress reaches 1 at `5040 - 720 = 4320`. Film activation requires progress greater than `.995`; console visibility additionally requires the editorial content's top to remain at or below the bottom of the viewport (`>= innerHeight - 1`). Editorial content previously began immediately after the rail, at document Y 5040. These conditions overlap for approximately 23px at a settled camera pose. This was a layout/activation-boundary mismatch, not evidence of scene loading delay or a nested wheel lock.

### Alternatives considered and decision

- Lowering the activation threshold alone could expose the controls before the approved room camera settles.
- Keeping controls visible over incoming editorial content would reintroduce overlapping interfaces.
- Chosen: reserve one viewport of native document scrolling after the final camera stop, outside the rail's measured height. The existing camera clamps at its final pose while the visitor can use the console or continue scrolling immediately.

No timeout, wheel cancellation, scroll snapping, nested scroller, or new overlay was introduced. The existing entry/exit hysteresis and editorial handoff remain in place.

### Implementation and changed files

- [navigation.css](../../../preview/v0304-p2-hero-cta/navigation.css): add `margin-block-end: 100vh` to `#rail`. Its `offsetHeight` remains unchanged, preserving existing progress mapping, camera stops, and direct-navigation targets. The interval becomes approximately 743px at the tested 720px viewport height.
- [index.html](../../../preview/v0304-p2-hero-cta/index.html): version the navigation stylesheet URL. The local server returned the new rule, but the in-app browser still used the previous CSS after reload; the versioned reference made the new rule observable.
- [package-portfolio-preview.cjs](../../../tools/package-portfolio-preview.cjs): create an explicit, zero-dependency runtime package under the already ignored `.netlify/portfolio-2-preview/`. Canonical Hero files are copied to its root, and the five Playbook runtime files to `p2-03b-playbook/`. `_headers` and the Three.js license remain included. QA captures, provenance notes, inactive legacy Playbook files, and the ineligible historical demo recording are excluded from this output, not deleted from source.
- [netlify.toml](../../../netlify.toml): change only the Deploy Preview command and publish directory. Production continues to inherit its existing UI configuration. No production React source, dependency, camera, Film controller, or Playbook content change was needed.

The packaging correction addresses a separate STEP 03 finding: the former Hero-only publish root omitted the sibling Playbook. At the new output root, the unchanged iframe URL resolves to `/p2-03b-playbook/`.

### Actual focused verification

One in-app browser session used native mouse-wheel input, DOM observations, and a focused visual check. The primary CSS viewport was 1280 × 720; the default 1088 × 884 viewport was restored and checked afterward. No historical QA runner was executed or existing evidence overwritten.

| Test action | Expected and observed result | Status |
| --- | --- | --- |
| Wheel from the Film entrance into the room | At Y 4215 controls were hidden; the next normal wheel movement reached Y 4362 with one usable console visible. | PASS |
| Select QR Helper; wheel over the open project chooser | Chooser dismissed, document moved from Y 4362 to 4508, and the console remained visible. No nested wheel lock. | PASS |
| Three forward/reverse wheel cycles through Film, Stack, Work, Film, and arena | Work was reached at Y 6618, 6501, and 6530; Film controls returned at Y 4508, 4391, and 4420. Controls were hidden in Work and after reverse exit to the arena. Selected QR/Portfolio projects were retained. | PASS |
| Rapid wheel reversals across the Film/editorial and entry boundaries | Returned to Y 4935 with one visible console, the same selection, and no persistent scroll lock or open dialog. | PASS |
| Film Portfolio selection → Explore Project → Back to Film Lab | Matching Work accordion opened; return restored Portfolio selection and controls at the original Y 4320 Film target. | PASS |
| Direct WORK navigation → select Coupang → direct Film navigation | Film displayed Coupang, with one console and no orphaned controls in Work. | PASS |
| Restore default viewport and wheel within Film | At 1088 × 884, direct Film remained at Y 5304; wheel to Y 5424 retained the console. No horizontal overflow observed. | PASS |
| Package and serve output as an independent site root | 65 files, 12,743,306 bytes; all 65 local HTTP responses were 200 and byte-matched packaged files. Iframe entry and four script/style dependencies resolved. | PASS |
| Open packaged Playbook under the existing CSP | Coupang loaded; Design the Play and Next action worked; switching to QR Helper worked. | PASS |
| Configuration isolation | Only `[context.deploy-preview]` changed. Production/default settings, React source/dependencies, and `.gitignore` were not modified. | PASS — source/configuration inspection |

No JavaScript errors were captured in this focused session. The existing `PCFSoftShadowMap` deprecation/fallback warning appeared on page loads and remains outside this task. One new local-only screenshot was saved in the ignored verification area; no historical capture was replaced or added to the publication package.

### Remaining limitations and lesson

The actual Netlify build, hosted iframe/CSP behavior, dashboard settings, physical touch devices, and a full regression suite were not verified in STEP 03B. Local packaging is not a deployment. The explicit runtime allowlist must be updated when new dependencies are added. The packager deliberately refuses to overwrite an existing output directory; `--check` can be repeated without writes, while rebuilding requires a fresh build workspace.

The viewport-length viewing interval is not a scroll trap: a sufficiently large intentional scroll can still leave or skip it. The tested normal wheel inputs and repeated reversals are stable. A camera destination needs usable document-scroll space as well as an activation threshold; extending that viewing space outside the camera rail can preserve all existing camera compositions.

## STEP 04A — Public evidence and repeatable packaging

Recorded on 2026-10-18. The STEP 03B record above is preserved as historical evidence; its fresh-workspace-only packaging limitation is superseded by this local follow-up.

Local-only QA links now identify privately retained filenames rather than implying that omitted captures or runners are publicly downloadable. Historical verification results are unchanged.

The packager now validates the designated output path, its parent, and the existing file/directory allowlist before removing and recreating only the generated Preview directory. Unknown entries or redirected paths stop the build for review. Canonical sources and production output are not cleanup targets.

Two consecutive local package builds succeeded, each with 65 files and 12,743,306 bytes; every output file had the same SHA-256 in both builds. In-memory safety checks also stopped before mutation for unknown entries, symlink/junction redirection, and source paths inside the output. Those are simulated control-flow checks, not real filesystem attack tests. No browser regression, Netlify build, staging, commit, push, or deployment was performed in this follow-up. Image publication decisions and the proposed removal of unapproved Notion references remain pending.
