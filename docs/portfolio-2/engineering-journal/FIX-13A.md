# FIX 13A — Five-phase arena environment

Recorded on 2026-10-18. Unlike the reconstructed FIX 01–12 entries, this entry documents a current local implementation session after baseline commit `2fd0304713afba495488b44df646daaccff032c4`. See the [index](INDEX.md) for the historical boundary.

**Status at the local verification session, before delivery:** Requested, designed, implemented locally, and verified within the focused checks below. At that point the work was not staged, committed, included in a PR, or deployed. Existing baseline delivery is separate and was not reverified by those checks.

**Delivery approval (2026-10-19):** The user approved FIX 13A and FIX 13A.1 together as one independent commit on the existing feature branch for Draft PR #1. Git and PR history establish the resulting revision and inclusion. The local verification records below are not evidence of hosted deployment; private QA captures remain excluded.

## Problem

The previous weather controller chose exterior day/night presets and restored a separate base lighting state inside the arena. It did not provide the requested Sunrise, Daytime, Golden Hour, Blue Hour, and Night sequence. Switching at the exterior boundary could reset the atmosphere instead of maintaining one continuous environment.

The requested change was atmospheric, not architectural: retain the arena, camera stops, character performance, destination order, and editorial interfaces while making time-of-day lighting distinct and readable.

## Evidence

- [Weather and environment controller](../../../preview/v0304-p2-hero-cta/weather.js): phase configuration, clock selection, weather compatibility, interpolation, and development preview.
- [Exterior fixtures](../../../preview/v0304-p2-hero-cta/exterior-lighting.js): existing lamp and halo intensity updates.
- [Scene integration](../../../preview/v0304-p2-hero-cta/exterior.js): references to the six existing arena lights and shared diffuser material.
- [Preview entry](../../../preview/v0304-p2-hero-cta/index.html): module version token for the changed environment implementation.
- [Packaging checker](../../../tools/package-portfolio-preview.cjs): existing runtime allowlist; unchanged by this FIX.

The baseline revision and current source diff establish the implementation delta. Current-session browser observations and in-memory test results were recorded in the accessible Codex execution context; no screenshot batch, persistent test runner, or recording was added. These observations are not historical QA results. Supplied reference images informed color and atmosphere only and were not copied into runtime assets or this journal.

## Alternatives

The implementation considered extending the existing weather controller versus introducing a separate environment controller. Reusing the controller avoids competing ownership of the same lights and avoids adding a runtime dependency to the packaging allowlist.

An astronomical solar schedule would need additional calculation or data. This implementation instead uses explicit approximate clock boundaries, reusing the existing Gardena time zone without another API request. It does not claim actual sunrise or sunset accuracy.

## Decision

Keep one environment controller and one existing render loop. Store each phase's palette, natural-light values, direction, fixture strength, and shadow-radius setting together. Transition from the currently rendered values to the next target so an interrupted transition starts from its visible state rather than jumping back to an earlier preset.

Retain readable indoor fill and modestly strengthen the existing arena lights at dusk and night. Fade exterior fixtures across the existing entrance progress instead of abruptly switching the entire scene back to daytime.

## Implementation

### Clock and phase configuration

The controller reads the current clock through `Intl.DateTimeFormat` in `America/Los_Angeles`, matching the existing Gardena weather location. It falls back to the browser's local clock only if that time-zone formatting is unavailable. The environment does not advance from an aging weather-response timestamp.

| Phase | Approximate clock interval | Main lighting intent |
| --- | --- | --- |
| Sunrise | 05:30–08:00 | Peach/pink atmosphere, gentle warm sun, restrained fixture fill |
| Daytime | 08:00–16:30 | Bright neutral daylight and readable architecture |
| Golden Hour | 16:30–18:00 | Amber light from a lower directional-light position |
| Blue Hour | 18:00–19:30 | Cooler twilight with exterior fixtures becoming prominent |
| Night | 19:30–05:30 | Navy atmosphere, minimal sun, readable entrance and arena lighting |

These are fixed clock windows, not seasonally adjusted solar events. A minute interval and returning-tab visibility event refresh the phase without reloading. The existing Open-Meteo endpoint and 15-minute request interval remain unchanged. Weather conditions can still soften the phase lighting; the existing weather preview choices and weather labels remain available.

### Rendering and fixtures

Background, existing fog color, hemisphere sky/ground colors, sunlight color/intensity/position, and fixture strengths interpolate over approximately 2.4 seconds using smoothstep. The initial state is applied immediately. System reduced motion or the existing Reduce motion checkbox applies the target immediately, including when enabled during a transition.

The controller reuses color/vector objects and mutable diagnostic state. It does not update DOM text per frame, recreate the scene, add a render loop, add lights, or introduce a new cloud/rain system. Existing exterior lamps and halos now fade by strength; fully extinguished fixtures are hidden. The six existing court lights and diffuser receive small phase-dependent intensity adjustments.

The lighting controller retains a gradual interior fill floor across entrance progress. Camera positions and navigation logic are unchanged. Module query tokens were updated after a stale local-browser module response was observed during verification.

### Development preview

The phase override requires both a localhost hostname and the explicit `environmentPreview` query parameter. For example, append `?environmentPreview=sunrise` to the local preview entry. Valid phase values are `sunrise`, `daytime`, `golden-hour`, `blue-hour`, and `night`.

In that development mode only, `Alt+1` through `Alt+5` select the five phases and `Alt+0` clears the phase override. With the existing weather selector on Live, clearing the override returns to clock-based lighting. No new public panel or wheel handler was introduced. The override isolates lighting from cloud/rain effects without fabricating the weather readout.

### Changed implementation paths

- [weather.js](../../../preview/v0304-p2-hero-cta/weather.js)
- [exterior-lighting.js](../../../preview/v0304-p2-hero-cta/exterior-lighting.js)
- [exterior.js](../../../preview/v0304-p2-hero-cta/exterior.js)
- [index.html](../../../preview/v0304-p2-hero-cta/index.html)

This journal entry and [INDEX.md](INDEX.md) are the accompanying documentation changes. Netlify configuration and the packaging script were not changed.

## Verification

Focused local browser checks used a 1280 × 720 viewport. These are current observations, not a complete regression certificate.

| Check | Observed result |
| --- | --- |
| Five development phase selections | All five were visibly distinct: peach dawn, bright day, amber golden hour, cool blue hour, and navy night. |
| Phase transition | Development logs recorded approximately 2.402 seconds for Daytime and 2.400 seconds for Golden Hour from start to settled. Early and settled views at the same Gate camera showed gradual palette/shadow change. These measure transition duration, not frame rate. |
| Reduced motion | With the existing Reduce motion checkbox enabled, selecting Daytime reported a zero-second transition. Disabling it restored the Golden Hour interpolation. |
| Night entrance | Character remained readable. Replay showed captions; Skip returned the control to Replay. |
| Playbook | Opened and closed through the existing interface. |
| Film Lab → Work | Wheel navigation reached Film Lab with controls visible; selecting QR and opening its project showed the QR Work accordion with Film controls hidden. |
| Work → Film Lab and repeat | Wheel return restored Film controls and the QR selection. A further forward/reverse round trip passed without a persistent scroll lock. |
| Logic checks | The final code passed 31 in-memory Node assertions using the actual Three.js types with stubbed DOM/network dependencies: the original 27 checks plus four existing-checkbox checks. Coverage included 12 phase-boundary assertions, initial cloudy-response ordering, interrupted transitions, reduced-motion toggling, rejecting the debug override on a public hostname, time-zone fallback, and minute-based phase refresh. |
| Interrupted preview / normal mode | Rapid Blue Hour then Sunrise selection settled at Sunrise. Removing the development opt-in left the phase shortcut inactive; the real weather readout still reported Clear, 20°C, Night. |
| Runtime packaging | Existing `package-portfolio-preview.cjs --check` passed for all 65 allowlisted runtime files, including the Playbook. Check mode generated no output files. |
| Browser errors | No critical JavaScript error was observed in the focused session. The pre-existing `PCFSoftShadowMap` fallback warning remains. |

No FPS or before/after frame-time benchmark was recorded. Smoothness was assessed visually in this environment only; no quantitative performance improvement is claimed.

Final Git checks found five modified tracked files, this one new journal file, and zero staged files. The 130 pre-existing excluded files retained their SHA-256 identities. HEAD and local branch refs stayed unchanged. No source geometry, camera, navigation, catalog, or packaging configuration was changed.

## Limitations

- Fixed Gardena clock windows can differ from actual seasonal daylight. Browser-local fallback uses the visitor's clock, not Gardena time.
- The system clock must be reasonably accurate. This implementation adds no clock synchronization service.
- Full device/browser coverage, a complete intro animation review, and a broad feature regression suite were not performed.
- The existing shadow-map warning limits claims about the requested softness settings; no independent shadow-quality benchmark was performed.
- Local verification does not establish hosted behavior or delivery of FIX 13A. No commit, push, PR update, or deployment was performed for this change.

## Lessons Learned

Environmental continuity benefits from a single owner of light and color state across camera boundaries. Clock-driven presentation and weather observations should have explicit, separate sources so a stale weather response cannot freeze the phase schedule. Local-only phase controls make every atmosphere inspectable without adding production UI or disturbing scroll navigation. Verification should distinguish transition timing, visual observations, deterministic logic checks, and measured rendering performance.

## FIX 13A.1 — Focused visual refinement

Recorded on 2026-10-19. This is a local refinement of FIX 13A, not a separate historical commit. At the refinement verification session, it was uncommitted, outside the PR, and undeployed; see the delivery approval above.

### Problem and evidence

The five-phase Gate 01 review found repeated diagonal stripes on the Golden Hour right facade, weak Night face/roof readability, and slightly washed-out Daytime architecture. The comparison used the same Gate 01 camera and 1326 × 884 viewport; browser captures are 1311 × 874 pixels. The original screenshots were retained unchanged.

Local QA evidence — retained privately; not included in the public repository. The final refinement set contains `01-sunrise.jpg`, `02-daytime.jpg`, `03-golden-hour.jpg`, `04-blue-hour.jpg`, `05-night.jpg`, plus two Center Court captures for Blue Hour and Night. Preliminary captures are diagnostic evidence, not the final lighting comparison.

### Confirmed cause and decision

The four curved shells produced by `ringWall()` had inward triangle winding. Checks using the actual source and bundled Three.js found normal/outward dot products near −0.999. `DoubleSide` makes the surface visible from outside, but the shadow receiver's normal-bias offset uses the vertex normal before the fragment-side backface correction. The positive normal bias therefore displaced exterior shadow samples into the shell.

An isolated browser A/B reversed only the shell triangle winding. The repeated stripes disappeared while ground, column, and window-detail shadows remained. This supports inward-normal-driven self-shadowing as the cause. The bands have distinct radii; no exact coplanar duplicate was found in this investigation.

Changing shadow bias, shadow resolution, or disabling shadows was considered but not selected: the winding correction resolved the observed defect without those changes. Vertex positions, dimensions, silhouettes, triangle counts, materials, camera positions, and navigation remain unchanged. Shadow bias −0.00012, normalBias 0.04, the 2048² map, and the shadow-camera bounds remain unchanged.

### Lighting adjustments

| Phase | Before | After | Intent |
| --- | --- | --- | --- |
| Daytime | Sun 3.6; hemisphere 2.2 | Sun 3.4; hemisphere 1.85 | Slightly reduce bright-surface washout while retaining directional depth. |
| Blue Hour | Hemisphere 0.88 | Hemisphere 0.98 | A restrained lift without changing the twilight palette. |
| Night | Hemisphere 0.72; ground fill `#746782` | Hemisphere 0.92; ground fill `#8c7c98` | Lift face and purple-wall detail while preserving the navy sky and warm walkway fixtures. |

Sunrise and Golden Hour lighting values are unchanged. No light objects were added; exterior fixture strengths and all arena-light multipliers are unchanged.

Reload initially reused the old weather-module dependency: unchanged comparison pixels and the old module URL in development logs exposed the stale result. The entry and weather import version tokens were updated to `fix13a1-lighting-1`. Final captures were taken only after logs showed that module and the intended settled phase.

### Actual verification

| Check | Result and limits |
| --- | --- |
| Five-phase Gate 01 comparison | All five final captures retain the same camera, viewport, and scroll position. Sunrise atmosphere is preserved; Golden Hour stripes are absent. Daytime and Blue Hour changes are deliberately small. |
| Night exterior | Face, ivory structure, and purple-wall detail improved modestly. The roof and sign background still have deep, partly merged shadows; this is not a claim of complete dark-area recovery. Navy sky and warm walkway contrast remain. |
| Blue Hour and Night interior | Inspected and captured the same existing Center Court camera. Court markings, hoop, seating, roof structure, and Playbook board remained readable. No new major artifact was observed in these views. |
| Intro and Skip | Replay displayed the first caption. A completed replay returned to idle; a separate explicit Skip click immediately restored Replay. Full gesture/timing regression was not repeated. |
| Film Lab / Work | Selected AcrossB Flow QR Helper, opened its Work accordion, and used Back to Film Lab. The selected project and one control set were restored. Actual wheel input crossed the Film/2D boundary and reversed; controls hid and reappeared without a persistent lock. Back to court reached Center Court. |
| Logic | 49 named in-memory checks passed against the current weather source with actual bundled Three.js types and stubbed DOM/network/fixture update. The prior 31-check runner was not persisted, so this harness reconstructed its documented coverage rather than claiming to rerun identical historical code. Coverage includes phase boundaries, interpolation/interruption, reduced motion, preview restrictions, clock fallback/refresh, cloudy-response ordering, and indoor/fixture continuity. |
| Geometry invariants | 42 checks passed across four shells: 648 vertices and 640 triangles total, unchanged position bytes, topology counts and bounds; normals reversed within 1e−6. No shape or camera changes. |
| Packaging | `node tools/package-portfolio-preview.cjs --check` passed for 65 runtime files, including Playbook dependencies, after the cache-token update. Check mode generated no deployment output; production configuration was not modified. |
| Browser diagnostics | No critical JavaScript error observed. The existing PCFSoftShadowMap-to-PCFShadowMap warning remains; shadow settings were not changed to suppress it. |

No FPS benchmark, broad regression suite, hosted verification, commit, push, PR update, or deployment was performed. Blue Hour and Night still have similar building tones despite clearly different skies. This refinement preserves nighttime contrast rather than making the exterior daylight-bright.

### Changed paths and lesson

This refinement changes only [exterior.js](../../../preview/v0304-p2-hero-cta/exterior.js), [weather.js](../../../preview/v0304-p2-hero-cta/weather.js), [index.html](../../../preview/v0304-p2-hero-cta/index.html), and this journal entry. Other pre-existing uncommitted work and excluded historical QA evidence are preserved.

Inspect surface winding before tuning global shadow settings: a two-sided material can hide a normal-direction defect in ordinary lighting while still biasing shadow sampling incorrectly. Same-frame comparisons must also verify the loaded module version; a successful reload alone does not establish that nested dependencies changed.
