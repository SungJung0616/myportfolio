# Portfolio 2.1 — Game Center integration checkpoint

## Status — 2026-11-02 (America/Los_Angeles)

Implemented locally and uploaded as an unpromoted Netlify Deploy Preview. Not committed, merged, or deployed to Production at this checkpoint. This is not a completed, data-backed Game Center release.

## Problem and decision

The portfolio needs a reviewable game-record workflow, not invented live statistics. Notion remains the editorial record store. A server-only adapter queries two explicitly approved data sources; browser code receives normalized, publication-approved records only. Credentials and private data-source identifiers are not embedded in browser code.

Publication approval and source redistribution permission are separate gates. The current public endpoint returns `pending-rights`, with no scores or player records. NBA source reuse conditions require resolution before a regularly updated statistics database is published. See [NBA terms](https://www.nba.com/termsofuse), section 9. No season backfill was performed at this checkpoint.

## Implementation

- [Server endpoint](../../../netlify/functions/game-center.js): GET actions `history`, `latest`, `boxscore`, `season`, and `next`; input validation and controlled failures.
- [Normalization and cache](../../../netlify/functions/lib/game-center.cjs): missing values remain null, explicit participation states, duplicate-game rejection, five-minute per-instance cache and concurrent-request coalescing.
- [Notion adapter](../../../netlify/functions/lib/notion-store.cjs): paginated server-side queries and approval filters.
- [Arena integration](../../../preview/v0304-p2-hero-cta/game-center.js): two shadowless meshes, one texture, and a native HTML dialog. Candidate board position is left wall `(-17.68, 4.4, -29)`; final framing and direct board-click verification remain outstanding.
- [Assisted importer](../../../tools/ingest-game-center.cjs): dry-run by default; requires separate ingestion authorization for writes, retains unmatched rows and never grants publication approval. Live import/idempotence verification remains outstanding. Do not run concurrent imports.

## Actual connection verification

A short-lived, bearer-protected Preview diagnostic function used the stored Notion credential without returning its value or record contents. Games query: HTTP 200, one row, no further page, zero publication-approved rows. Player query: HTTP 200, 18 rows, no further page. An unauthenticated request returned 403. Counts establish connectivity, not correctness of the recorded basketball data.

The two data-source IDs were configured for Deploy Previews only. No rights-approval environment flag was enabled. Main Production and V1 published deployment IDs were unchanged before and after the operations.

## Verification performed

- 29 Game Center logic checks passed, using synthetic fixtures only.
- 68 existing release-candidate checks and 33 content checks passed.
- Two Preview packaging runs succeeded; `git diff --check` passed.
- Hosted API returned HTTP 200 with `pending-rights` and zero public games; invalid action returned HTTP 400.
- Hosted JS, CSS, Playbook entry and Resume PDF returned HTTP 200; Preview noindex headers were present.
- Real Chrome: Game Center opened by keyboard, Escape closed it, trigger focus returned and body scroll lock cleared. Film Lab to the corresponding Work case navigation was exercised.
- Desktop and 390px mobile dialog inspected. Mobile document width matched viewport width; no horizontal overflow was observed. No captured critical JavaScript errors in this focused session.
- Original 130 excluded files plus the pre-existing service setup document were unchanged by SHA-256 comparison.
- Local QA evidence is retained privately and is not included in Git.

## Limitations and next gate

No current Lakers season record, full-season backfill, box-score correctness, or complete player table in the hosted UI is claimed. Next-game schedule, cumulative player statistics and voting are unavailable. Cache is per function instance, not a globally persistent cache. Full navigation, direct 3D board interaction, physical devices, screen readers, measured FPS and GPU memory are NOT VERIFIED.

The user chose to retain a previously chat-exposed integration credential. Rotation remains recommended; no credential is recorded here. Resolve source rights, independently reconcile records, and finish the remaining rendering/regression checks before presenting this as a complete feature.

## 2026-11-03 — Center-hung Jumbotron revision

The user replaced the left-wall direction with a four-sided center-hung display. The earlier placement notes above are historical, not the current geometry.

- Added [Jumbotron geometry](../../../preview/v0304-p2-hero-cta/jumbotron.js) at `(0, 8.15, -29)`, aligned with the existing court center. Body width is 5.8 scene units; trim width 6.02; complete assembly extends from approximately 6.38 to 11.08, below the 11.375 ceiling. Roof carriers bridge existing ribs at z=-27 and -33. No camera coordinates or memorial geometry changed.
- Four screen planes share one canvas texture and material. There are no new lights, animated geometry, flashing effects, or shadow casters. Pending content uses larger centered typography instead of fabricated scores.
- Moved the keyboard alternative into the existing lower Arena caption area. Removed its fixed top-left placement near Atmosphere. At 390px, the controls had separate bounding boxes and no document overflow.
- Real Chrome desktop screen click opened the dialog. Mobile initially failed: an existing clipped exterior mesh intercepted the ray near `(0, 6.46, -14.08)`. Ray hit filtering now respects material clipping planes as well as visibility. Mobile screen click then opened the dialog successfully. All four face orientations also passed geometry-level ray tests.
- Rapid open/close testing exposed a stale inline overflow value. Removed the redundant JavaScript scroll lock; the site's existing `body:has(dialog[open])` rule owns locking. Three rapid keyboard open/Escape cycles restored focus with no inline lock. Subsequent wheel movement changed document scroll position.
- Actual desktop and mobile captures inspected; Day and Night selections and Reduce Motion exercised. Existing indoor lighting remains intentionally stable across those phases. The intended memorial viewpoint shows the complete 24/08 tribute, unobscured. The main court-reveal view partly overlaps the distant memorial; its dedicated view is clear.
- Tests: 13 Jumbotron geometry checks, 29 Game Center logic checks, 68 release checks and 33 content checks passed. Preview packaging succeeded. Film Lab entry controls were present after navigation. No captured critical JavaScript errors in this focused session.
- Unpromoted Hosted Preview deploy `6ae9f595bad2f10c10f9d35d` reached `ready`. Production and archive published deployment IDs remained unchanged. Notion API, approval filtering and rights gate were not modified. Public API still returns `pending-rights` with zero games.
- Local screenshots are excluded from Git. Physical-device touch, screen readers, measured FPS/GPU usage, and all historical regression scenarios remain NOT VERIFIED. No commit or Production merge was performed in this refinement.
## 2026-11-03 — Data completion and cinematic four-face revision

This section supersedes the earlier single-texture and incomplete-backfill limitations below; earlier sections remain historical evidence.

### Data gate

The [data validation inventory](P2-1-DATA-VALIDATION.md) was completed before the cinematic revision. Eight official regular-season games through November 2 were reconciled to 6–2, with 145 player-game rows in the two existing Notion data sources. Toronto was updated in place. All games remain pending review with publication approval false. Collection, numerical validation, review and publication are separate states. Miami's source minute value `18:60` remains verbatim and flagged, not corrected silently.

### Implementation and decisions

- Four independent static canvas textures: results, five officially designated starters, participating bench with explicit pagination, and schedule/recap. No new lights, particles, rotating geometry or continuous texture updates.
- Kept the suspended court-center geometry and added restrained corner framing. Kobe memorial geometry and camera rail data are unchanged.
- User-initiated camera-only tour: eight-second reading dwell, 2.2-second eased quarter-orbits, Play/Pause, previous/next, Escape and wheel exit. Pause freezes an in-progress orbit. Keyboard steps and reduced-motion transitions are immediate; reduced motion disables autoplay. The reusable camera position object avoids per-frame allocation in the tour state.
- Mobile screenshot inspection exposed horizontal LED clipping. The final tour FOV is derived from panel width, face distance and viewport aspect. Existing captions and location dots are hidden only while touring, avoiding duplicate controls and obstruction.
- Screen raycast starts the tour rather than the detailed modal. Face four has an explicit full-panel action; the footer retains a keyboard-accessible detailed-panel alternative away from Atmosphere.
- The HTML detail view now uses a two-column broadcast-desk hierarchy on desktop and one column on mobile. Native dialog focus/Escape behavior remains.
- Synthetic fixtures are clearly labeled, use fictional names and an illustrative score, and never masquerade as approved NBA data. Public API remains `pending-rights` with zero games. Complete-season record rendering remains conservative: the current API does not assert complete coverage, so it stays withheld in the public panel.

### Checks actually performed

- 21 camera-tour/content checks, 13 geometry/raycast checks, 29 API/normalization checks, 7 mocked ingestion checks, 68 release checks, and 33 content checks passed.
- An initial release-check invocation omitted `--resume-candidate` and failed the resume identity assertion. Re-running with the correct candidate option and matching preview/production simulation packages passed. Production was not deployed.
- Chrome desktop: direct 3D screen click started the tour; all four faces were visited, bench page two showed the remaining three synthetic reserves, and face four opened the pending-approval HTML panel. Escape restored the trigger. A real wheel interaction ended the tour and resumed document scrolling with no inline overflow lock.
- Autoplay was observed advancing from results to starters and later to schedule/recap; Pause was exercised. Full-loop sequencing and mid-orbit pause/resume are also covered by deterministic state tests.
- 390px mobile viewport: final panel fits horizontally and document width does not exceed viewport width. Reduced-motion mode disables Play and allows instant keyboard face selection. Night was selected through Atmosphere; indoor light treatment intentionally remains stable.
- Main court and dedicated Kobe memorial views were captured. The main wide view partly overlaps the distant memorial; its dedicated 24/08 view remains unobstructed.
- Film Lab's selected packing-cover project opened the matching expanded Work item. No critical errors were captured by the browser console during these focused checks. Comprehensive historical UI scenarios, physical touch devices, screen readers, FPS, GPU memory and Core Web Vitals are NOT VERIFIED.
- All 130 historical excluded files and the pre-existing service setup document were unchanged by SHA-256 comparison. Screenshots remain in ignored local QA storage, not the public baseline.

### Daily ingestion boundary

`tools/ingest-game-center-daily.cjs` prevalidates a private JSON batch, rejects duplicate game IDs, processes chronologically, and uses stable-ID upserts. Default is dry-run; writes require separate server-side collection permission and credentials. Repeated mocked imports created one game and five players, not duplicates. Every write revokes publication approval and returns review to pending. Official lineup roles require explicit source confirmation.

This is an assisted daily workflow, not an unattended NBA scraper or scheduled service. Source collection is still a human/browser review step. Invalid minute strings such as Miami's source anomaly are rejected by the CLI and require explicit source-discrepancy handling; the already collected Notion row is preserved. No scheduler, public redistribution permission, automatic publication, or real voting service has been enabled.

### Preview and remaining gate

Final unpromoted Hosted Preview: https://6aea3b436ee0dcd376971e23--sj-personalportfolio.netlify.app/ (`ready`, deploy-preview). Final-bundle four-face keyboard traversal and full-panel opening were rechecked in Chrome; final synthetic stat headings align with their columns. The final mobile Night selection was confirmed pressed, Play was disabled under Reduce Motion, and a new screenshot was inspected. JS/CSS modules, Playbook and Resume returned HTTP 200. Both meta and response headers retain noindex. Main Production and independent V1 published deployment IDs were unchanged before/after deployment.

The cinematic implementation is uncommitted on `feature/portfolio-2-1-lakers-game-center`, based on `70bc5645e4d9157cf138a564df22ae425844145b`. Preview deployment does not imply a Git commit or production release. Publication rights, human record review and the exposed-token rotation recommendation remain unresolved. Do not enable public statistics merely because totals match.

### Follow-up: closer tour and explicit publication approval — 2026-11-03

The user subsequently confirmed redistribution rights and explicitly approved all eight collected games, with Miami's original minute anomaly disclosed. This is a user-provided rights confirmation, not an independent legal assessment. The previous pending-publication state above is historical.

- Updated the eight existing game publication/review flags and 145 related player review flags. No source statistics were changed.
- Enabled the rights flag for Deploy Previews only; Production has no new rights value.
- Reduced the tour radius from 10.5 to 9.8 scene units and added a 1.2-second eased entry from the front court corridor. Keyboard and reduced-motion entry remain immediate. The normal camera rail and Kobe memorial are unchanged.
- Preserve Miami's `18:60` value and expose a specific source-minute warning in the player detail view. Do not silently normalize it to 19:00. Complete-season claims remain withheld; the API reports an approved-record subset.
- Passed 31 API/normalization checks, 21 tour checks, 13 geometry checks, 7 ingestion checks, 33 content checks and 68 release checks. Preview packaging and production simulation passed; no Production deployment occurred.
- Hosted Preview `6aea4e973c94e2b57c28bde5` is ready. Its history endpoint returns eight games; all eight box-score endpoints return ready, totaling 145 player records. Miami returns one explicit source-minute warning. Resume responds HTTP 200 and Preview noindex headers remain present. Main Production and V1 published deployment identities were unchanged.

The previously exposed-token rotation recommendation still applies. No Git commit, push or merge was performed for this follow-up.

Focused Chrome verification on this Preview showed the closer results display and real starting-five data, keyboard traversal across all four faces, and the detailed Miami source-warning paragraph with the original 18:60 cell. At a 390 × 844 viewport the display fit horizontally; Reduce Motion disabled autoplay and keyboard entry remained immediate. No console errors were captured. These are browser viewport checks, not physical-device, FPS or GPU measurements. Screenshots are retained in ignored local QA storage. All 131 pre-existing excluded files (130 historical artifacts plus the service-setup document) remained unchanged by SHA-256 comparison.

### Spatial hierarchy refinement — 2026-11-04

The user approved a smaller, lower memorial, a left-wall gym clock, and a scroll-driven invitation view before the existing Jumbotron tour.

- Grouped the unchanged memorial artwork, scaled it uniformly to 80%, and lowered its center from y=7.8 to y=6.2. Its dedicated rail target follows the new center; the 24/08 tribute and date are unchanged.
- Added one circular, shadowless clock mesh on the left wall. A 512px canvas shows America/Los_Angeles time using the browser clock and Intl timezone conversion. It updates once per minute, with no second hand or extra lights. It is a local device-time display, not an independently synchronized time service.
- Inserted a rail stop at progress .69 between Court Reveal (.64) and Center Court (.74), looking upward toward the display. No modal or tour starts automatically. The invitation remains reversible via normal scrolling.
- Applied aspect-aware framing at that stop. Mobile inspection exposed overlap from the location dots; these are hidden only during the invitation view on narrow screens. Main navigation and explicit actions remain available.
- Passed 9 new spatial/clock checks, 13 geometry checks (updated memorial sightline), 21 tour checks, 31 API checks, 33 content checks and 68 release checks. Preview packaging and a local production-package simulation passed. Git whitespace checks passed.
- Chrome inspection: wide court, dedicated memorial, invitation and Night-selected interior rendered. Real wheel input moved backward to Court Reveal and forward through the invitation to Center Court without a persistent lock. The 390px viewport fit the display without horizontal overflow; reduced motion disabled tour autoplay. The final mobile detail dialog loaded approved records. No critical console errors were captured. Physical-device, screen-reader and measured-performance checks were not performed.
- Final unpromoted Preview: https://6aeb4c1eadedcc9d9f5021d4--sj-personalportfolio.netlify.app/ (ready; eight approved games). Production and V1 published deployments are unchanged. All 131 baseline excluded files are unchanged by SHA-256; nothing was staged or committed.

Evidence is retained privately in ignored local QA storage; no new screenshots are included in Git.

## Release-candidate refinement — 2026-11-04

The new instruction explicitly prefers the original Kobe memorial. Its geometry and artwork were restored byte-for-byte to the Portfolio 2.0 source; the dedicated camera target is again y=7.8. Earlier approval for an 80% memorial is historical, not the current design.

### Implementation

- Raised the Jumbotron center to y=9 and reduced the LED body height, keeping the full assembly below the existing roof. Retained four independent textures, restrained frame detailing and roof carriers, with no new lights or shadow casters. Preserved the clock and all project content.
- Added a stable NBA-ID [team asset registry](../../../preview/v0304-p2-hero-cta/team-assets.js). Official logo permission is unresolved: no third-party logos were downloaded or shipped. Ivory abbreviation badges occupy the logo-ready matchup layout; HTML image-load failure falls back to the abbreviation.
- Results prioritize two badges, team names and large scores. History cards and selected-game details use the same registry. Starter and participating-bench faces use the selected game; the recap face uses the previous approved game and does not invent a next game.
- Autoplay now completes after the fourth face and interpolates back to the saved arena pose instead of looping forever. Explicit navigation, Escape and wheel cancellation remain available; keyboard face steps are immediate and Reduce Motion disables autoplay.
- Added a dated exact-game-set coverage guard after the [official data recheck](P2-1-DATA-VALIDATION.md#independent-recheck--2026-11-04). The 6–2 record is scoped through November 2, not presented as indefinitely current.

### Verification and limits

- Passed 212 current deterministic checks: API/normalization/cache 31, ingestion 7, content 33, geometry 13, tour 21, team registry 30, spatial/clock 9, release packaging 68. Preview and production-package simulations succeeded; production simulation is not deployment.
- Real Chrome screenshots inspected the main court, original memorial viewpoint, all four tour faces, desktop dashboard and 390px mobile view. Keyboard entry/steps, bench pagination, Escape/focus restoration and reduced-motion Play disabling were exercised. Mobile document width did not exceed the viewport. Night was selected; existing indoor illumination intentionally remains stable.
- Film Lab opened the matching expanded Work case. Playbook opened in its existing iframe. No critical JavaScript errors were captured; the existing Three.js PCFSoftShadowMap deprecation warning remains.
- Browser autoplay advanced through results, starters and bench, but ran slowly in the controlled session. The full automatic return was not independently verified at this checkpoint; deterministic completion tests are not a substitute for that visual check.
- Historical browser scripts contain obsolete Hero text and rail-count assertions and were not treated as valid current regression evidence. Physical devices, screen readers, FPS, GPU memory and Core Web Vitals are NOT VERIFIED.
- Five-minute cache is per warm server-function instance with concurrent-request coalescing, not global persistent storage. No diagnostic endpoint is bundled. No paid provider or voting service was introduced.
- The user explicitly declined rotation of the previously chat-exposed Notion credential and requested continued use. No credential value is logged or committed, but this unresolved security risk prevents an unconditional production recommendation.
- All 130 excluded historical artifacts and the pre-existing service-setup document were unchanged by SHA-256 comparison. New screenshots and official DOM captures remain in ignored local QA storage.

The feature remains Preview-only. A successful Preview or test run does not authorize a Production merge or release.
