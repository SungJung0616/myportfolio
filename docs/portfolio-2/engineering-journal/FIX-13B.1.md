# FIX 13B.1 — Weather-aware arena lighting and exterior effects

Recorded on 2026-10-19 against `4b7031f4b8e4d68eff699d65e4e535b8b4699118` on `feature/portfolio-2-hybrid-editorial`.

**Status at finalization review, before publication:** Lighting and exterior effects are implemented locally and verified within the scope recorded below. The user approved the current visuals and authorized one FIX 13B commit, a feature-branch push, and verification of the existing Draft PR and automatic Deploy Preview. Hosted verification was still pending when this entry was prepared. FPS, frame times, and GPU memory are **NOT VERIFIED**. Git history and deployment checks establish subsequent publication state; local verification alone does not establish it.

## Historical initial implementation — lighting only

The sections through “Initial changed paths and safety” preserve the initial implementation record. In particular, the 218 checks, 20 lighting combinations, 65-file packaging result, and “no new particle systems” boundary describe that earlier scope. They are not verification results or scope restrictions for the visible-effects extension documented afterward.

## Problem and evidence

[FIX 13A](FIX-13A.md) established five clock-based phases and one lighting controller. Its weather modifier was a single cloudy flag, a fixed gray blend, and a sunlight reduction. Fog and rain had no distinct lighting treatment, and an explicit phase preview suppressed weather modifiers entirely.

Relevant evidence:

- [weather.js](../../../preview/v0304-p2-hero-cta/weather.js): provider response, classification, phase/modifier targets, interpolation, and local preview.
- [exterior.js](../../../preview/v0304-p2-hero-cta/exterior.js): existing controller integration and render loop; only its import version changes in this task.
- [exterior-lighting.js](../../../preview/v0304-p2-hero-cta/exterior-lighting.js): unchanged existing fixtures.
- [index.html](../../../preview/v0304-p2-hero-cta/index.html): updated entry-module version.
- [Packaging checker](../../../tools/package-portfolio-preview.cjs): unchanged runtime allowlist.
- [Open-Meteo documentation](https://open-meteo.com/en/docs): provider's current-response fields and WMO code meanings, inspected during this session. The grouping and visual treatment below are application decisions, not a claim of meteorological simulation.

Local QA evidence — retained privately; not included in the public repository. Final representative captures are named `final-daytime-cloudy.jpg`, `final-golden-hour-rainy.jpg`, `final-blue-hour-foggy.jpg`, `final-night-rainy.jpg`, `final-sunrise-cloudy.jpg`, and `final-night-rainy-court.jpg`. Earlier diagnostic captures are not the final color-normalized version. Clear lighting was also viewed; deterministic checks confirm it preserves the approved baseline.

## Alternatives and decision

Adding another controller or weather API was rejected: it would duplicate data fetching and light ownership. A fixed daytime-gray target was also avoided because blending it into Night could brighten the sky unintentionally. Instead, weather tint is normalized to the selected phase's luminance before blending. Final color normalization keeps channels within 0–1 while preserving hue.

Time remains primary in Live mode. Weather modifies the existing phase target, then the same 2.4-second smoothstep interpolation applies it. An interrupted transition starts from its current rendered values. Initial state and reduced motion remain immediate.

No new lights, geometry, particle systems, clouds, wet surfaces, volumetric fog, or postprocessing were added. Existing legacy cloud/rain effects are retained, with numeric validation tightened; explicit lighting previews suppress them. Foggy lighting changes the existing atmosphere's colors, not fog density or visibility range.

## Existing infrastructure and fallback

The existing Open-Meteo forecast endpoint for Gardena is unchanged. Its `current` object supplies `temperature_2m`, `is_day`, `precipitation`, `weather_code`, `cloud_cover`, and Unix `time`. The existing 15-minute refresh and 8-second request timeout remain. A minute timer and tab-visibility refresh keep clock phases current; observations older than two hours are rejected, and cached data expires after 30 minutes without a successful refresh.

Invalid core temperature/day/time fields, HTTP errors, timeouts, and failed responses clear the observation and smoothly return lighting to the clock phase's neutral modifier. The readout says weather is unavailable, rather than presenting neutral lighting as observed clear weather. Missing optional weather fields are normalized safely. A request-generation guard prevents an older Retry response or failure from replacing a newer result.

## Classification

Known codes take precedence over optional precipitation/cloud-cover fallbacks.

| Provider code or fallback | Lighting category | Readout / qualification |
| --- | --- | --- |
| 0, 1 | Clear | Clear |
| 2, 3 | Cloudy | Cloudy |
| 45, 48 | Foggy | Fog |
| 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82 | Rainy | Rain; includes drizzle/freezing variants for lighting only |
| 95, 96, 97, 99 | Rainy | Thunderstorm; no lightning simulation |
| 71, 73, 75, 77, 85, 86 | Cloudy | Snow remains explicitly labeled; no snow simulation |
| Unknown/missing code with finite precipitation > 0 | Rainy | Precipitation, not a claim that it is rain rather than snow |
| Otherwise, finite cloud cover from 45 through 100 | Cloudy | Cloud-cover fallback |
| Otherwise unknown/missing/failed data | Clear's neutral modifier | Conditions unavailable / Weather unavailable, not a clear-weather observation |

Precipitation must be finite and positive to activate its fallback; no upper bound is imposed. Cloud cover must be finite and within 45–100 to activate its fallback. Negative, string, and non-finite values activate neither fallback. The existing weather data source is a model estimate, not an on-site sensor.

## Unified lighting calculation

The unchanged phase palette, direction, and base intensities are copied into reusable target objects. Weather adjusts sky/fog color, sunlight color/intensity, hemisphere sky color/intensity, and existing fixture strengths. Purple ground fill, shadow bias/map settings, camera, and geometry are unchanged.

| Weather | Sun multiplier | Hemisphere multiplier | Sky luminance multiplier | Arena-light multiplier |
| --- | --- | --- | --- | --- |
| Clear | 1.00 | 1.00 | 1.00 | 1.00 |
| Cloudy | 0.68 | 1.04 | 0.92 | 1.02 |
| Rainy | 0.48 | 1.02 | 0.80 | 1.04 |
| Foggy | 0.56 | 1.07 | 1.00 | 1.02 |

Less directional light relative to fill reduces shadow contrast; this is not a new shadow-blur algorithm. Sky tint weights remain restrained, from 0.18 to 0.28 for non-clear conditions. Existing exterior strengths are multiplied by at most 1.08 and capped at 1; daytime fixtures remain off. The existing indoor fill floor is retained.

Classification and target calculation run on refresh, not per frame. Two reusable color scratch objects are initialized once. The existing update loop interpolates existing colors/vectors/numbers; it introduces no per-frame object creation, DOM writes, new animation loop, or renderer initialization.

## Development preview

Both localhost and the explicit `environmentPreview` query parameter are required. Example query: `?environmentPreview=golden-hour&weatherPreview=rainy`.

- Phase values: `sunrise`, `daytime`, `golden-hour`, `blue-hour`, `night`; `live` leaves phase selection clock-driven.
- Weather values: `clear`, `cloudy`, `rainy`, `foggy`, `live`.
- `Alt+1–5`: select time phase, preserving the selected weather.
- `Alt+Shift+1–4`: select Clear, Cloudy, Rainy, Foggy.
- `Alt+Shift+0`: keep the chosen phase and use live weather.
- `Alt+0`: clear both overrides and restore the existing weather selector to Live.

Phase-only URLs retain FIX 13A's clear-lighting preview. Invalid override values are ignored. Input/select/textarea/editable focus, repeated keys, and Control/Meta combinations are ignored. A local-only note inside the existing Weather preview disclosure identifies the active combination and source. No new public controls are mounted. The existing legacy public weather selector remains separate; its explicitly manual day/night demonstrations are not the Live clock behavior.

## Historical verification — initial lighting-only implementation

### Deterministic checks

218 named in-memory checks passed using the actual bundled Three.js types and existing exterior-lighting factory, with DOM/canvas/network stubs. No persistent test runner was added. These checks do not establish WebGL appearance or real-network reliability.

| Phase | Clear | Cloudy | Rainy | Foggy |
| --- | --- | --- | --- | --- |
| Sunrise | PASS | PASS | PASS | PASS |
| Daytime | PASS | PASS | PASS | PASS |
| Golden Hour | PASS | PASS | PASS | PASS |
| Blue Hour | PASS | PASS | PASS | PASS |
| Night | PASS | PASS | PASS | PASS |

The 20 combinations passed finite/bounded colors, correct phase direction, clear-baseline identity, fixture multipliers, indoor fill, and object/light reuse checks. Other checks covered code mapping, invalid/missing/stale/failed responses, request-order races, transitions/interruption, reduced motion, clock fallback, localhost restrictions, and shortcuts.

Initial checks caught two slightly over-range blue color channels in daytime hemisphere tinting; hue-preserving scalar normalization corrected them. A separate malformed-field check found string cloud cover could activate legacy cloud meshes despite neutral classification; explicit numeric/range guards corrected this. All final checks include these regressions.

### Actual local browser checks

Gate 01 comparisons used the same 1326 × 884 viewport (1311 × 874 captured pixels) and scroll position 743.

- Clear Daytime retained the approved bright appearance. Cloudy Daytime softened contrast without washing out the ivory/purple structure.
- Rainy Golden Hour retained muted amber light; the corrected exterior wall did not regain diagonal stripes.
- Foggy Blue Hour remained cool and readable. Rainy Night retained the navy sky, warm walkway lights, and readable character/entrance; roof/sign shadows remain intentionally deep.
- Cloudy Sunrise preserved its pink/warm atmosphere. Rainy Night at Center Court retained readable court markings, hoop, seating, roof, and Playbook board.
- Rapid time/weather changes settled on the final selected combination. Reduced motion logged a zero-duration transition; shortcuts were correctly ignored while an input had focus.
- `Alt+Shift+0` restored the current API-derived Clear condition without changing Golden Hour. `Alt+0` restored clock-driven Daytime and live weather. Without the opt-in query, development notes/attributes were absent and shortcuts did not activate them.
- Replay displayed the intro caption; a separate immediate Skip returned to Replay. The first attempted Skip occurred after completion and was not counted as a successful Skip test.
- Film Lab selected AcrossB Flow QR Helper, opened its Work accordion, and returned with the same project and one control set. Actual wheel input crossed into 2D content and reversed, hiding/restoring Film controls without a persistent lock. Back to court reached Center Court.
- The live readout obtained Clear, 23°C, Day during the session. Forced lighting combinations did not falsify that readout.
- No critical JavaScript errors were observed. The pre-existing PCFSoftShadowMap fallback warning remains.

`node --check weather.js` and the unchanged packaging checker passed: 65 runtime files, including Playbook dependencies. No deployment output was generated by check mode.

## Limitations and lessons

No FPS benchmark or GPU allocation profile was measured. No obvious new stall was observed in this focused session; this is not a quantitative performance guarantee. Only representative combinations received visual review, while all 20 received deterministic checks. Full device/browser coverage and a broad feature regression suite were not performed.

Weather is approximate, phase windows remain fixed Gardena clock windows rather than astronomical events, and Night roof details remain dark. Shadow softness is limited by the existing renderer behavior. Failure/race scenarios were simulated in the harness, not induced against the provider.

Preserve one owner of environment state and distinguish observed weather from neutral fallback and development overrides. Matching tint luminance to the time phase prevents daytime gray from bleaching Night. Optional API fields need consistent validation across lighting and retained legacy effects, not just the main classifier.

## Initial changed paths and safety

Runtime changes: [weather.js](../../../preview/v0304-p2-hero-cta/weather.js), plus version-token-only edits in [exterior.js](../../../preview/v0304-p2-hero-cta/exterior.js) and [index.html](../../../preview/v0304-p2-hero-cta/index.html). Documentation: this entry and [INDEX.md](INDEX.md).

No geometry, navigation, catalog, Netlify configuration, dependency, or other feature code was changed. Local QA captures remain Git-ignored. The 130 excluded historical/QA files are preservation-only and are not part of this change. No stage, commit, push, PR modification, merge, or deployment is authorized by this task.

## Follow-up — visible rain, snow, wind, and fog

The user subsequently authorized visible heavy rain and snowfall, wind movement in the existing plaza trees, and stronger outdoor fog. This explicitly extends the original lighting-only scope and supersedes its prohibition on new precipitation particles. The existing five-phase lighting controller remains the environment owner; the extension does not create a second weather service or render loop.

### Source mapping and data contract

| File | Extension responsibility |
| --- | --- |
| [weather.js](../../../preview/v0304-p2-hero-cta/weather.js) | Extend the same Open-Meteo request, normalize weather/effect targets, interpolate lighting and effect strength together, mount opt-in development controls, and call the effects helper from the existing update function. |
| [weather-effects.js](../../../preview/v0304-p2-hero-cta/weather-effects.js) | New reusable rain/snow pools, outdoor fog range, and tree wind motion. It owns no fetch, timer, or requestAnimationFrame loop. |
| [exterior.js](../../../preview/v0304-p2-hero-cta/exterior.js) | Group the four existing trunk/crown assemblies around planted root pivots, pass those groups to the weather controller, and update the module version. Mesh dimensions, materials, and resting world positions are preserved; planter meshes remain stationary. |
| [index.html](../../../preview/v0304-p2-hero-cta/index.html) | Update the entry-module version so the browser loads the matching helper and controller. |
| [Packaging checker](../../../tools/package-portfolio-preview.cjs) | Add `weather-effects.js` to the explicit runtime allowlist; check mode passed with 66 runtime files, including Playbook dependencies. |

The provider and Gardena coordinates are unchanged. The `current` query adds `snowfall`, `wind_speed_10m`, `wind_direction_10m`, and `wind_gusts_10m`; `wind_speed_unit=ms` explicitly requests meters per second. Existing refresh, timeout, stale-data handling, request-generation guard, and actual-observation readout remain in the controller.

Lighting still has four categories: Clear, Cloudy, Rainy, and Foggy. Known snow codes retain the **Snow** readout and use Cloudy lighting; positive finite snowfall is also a fallback when no recognized code decides the condition. Rain and snow are separate effect targets, not a fifth lighting palette. Missing/invalid wind fields normalize safely; bounded wind drives artistic drift and tree motion, not a physically calibrated weather simulation. Particle density is intentionally stylized and is not derived as a measured precipitation rate.

### Effects and lifecycle

- One fixed pool of **4,200 rain segments** and one of **3,200 snow points** are allocated once, with reusable typed position arrays and materials. Snow uses a small procedurally drawn canvas texture rather than a downloaded asset. Inactive precipitation does not update its position buffer.
- Precipitation occupies the outdoor plaza volume beyond the canopy front edge. Wind changes rain slant and snow drift while positions wrap within that bounded volume. The decorative LineSegments/Points use no-op raycasting so they do not intercept existing scene clicks.
- The four existing trees rotate gently around their root groups. Wind direction, bounded strength, and restrained gust variation drive the motion. The helper restores each recorded resting rotation when motion is disabled or the exterior is inactive; it does not move the planters or add trees.
- Fog reuses `scene.fog`. Outdoor fog strength interpolates the existing linear range toward near `10` / far `65`; rain and snow use smaller amounts. The controller fades the outdoor effect weight through the entrance and restores the original fog range inside or in the editorial reading section. This is linear distance fog, not volumetric fog.
- Rain, snow, cloud visibility/opacity, fog strength, wind, and gust targets share the existing 2.4-second phase transition. The existing animation loop calls the helper; it introduces no independent loop or per-frame DOM writes.
- Reduced motion suppresses rain/snow rendering and tree motion, restores tree rest poses, and retains static lighting and fog. Exterior effects fade out before the interior experience; camera positions, destination order, and indoor content are unchanged by this extension.

### Extended development preview

The controls still require localhost plus the explicit `environmentPreview` query. Example: `?environmentPreview=golden-hour&weatherPreview=rainy&windPreview=strong`.

- `weatherPreview`: `clear`, `cloudy`, `rainy`, `foggy`, `snow`, or `live`.
- `windPreview`: `live`, `calm`, `breezy`, or `strong`. The three demonstration strengths are 0, 6, and 14 m/s before the visual helper's bounded drift; these are test settings, not observed conditions.
- The existing Weather preview disclosure gains **Dev condition** and **Dev wind** selects only in the opt-in local mode. The note identifies overridden effects while the header continues to show the actual observation.
- `Alt+Shift+1–4` retains Clear/Cloudy/Rainy/Foggy; `Alt+Shift+5` adds Snow. `Alt+Shift+0` restores live weather while retaining the chosen phase/wind. `Alt+0` resets phase, weather, wind, and the legacy selector to Live.
- Phase-only URLs retain the clear-weather comparison. Optional malformed values do not become observed weather. Existing editable-focus and modifier-key safeguards remain.

### Current extension verification

The final extension passed **251 integrated deterministic checks** and **28 effects-helper checks** using the actual bundled Three.js types with DOM/canvas/network stubs. The integrated checks cover all 20 time/category combinations, five snow-phase combinations, wind presets, malformed fields, known-code precedence, fallback/race behavior, transitions, shortcuts, and indoor/reduced-motion behavior. The helper checks include 1,200 simulated frames, fixed pool reuse, bounded precipitation positions, a maximum tree bend of 0.06 radians, no-op raycasting, and fog/rest-pose restoration. These checks do not establish real WebGL appearance or measured FPS.

Focused checks in the local in-app browser confirmed:

- Daytime rain produced clearly visible slanted streaks; Daytime snow produced distinct soft flakes while the entrance, character, and architecture remained readable.
- Night rain with Strong wind retained the dark navy sky, purple walls, character visibility, and warm walkway lighting. Blue Hour fog softened distant structures without hiding the nearby entrance or character.
- Calm/Strong comparisons showed modest directional tree movement with stationary planters. This is whole-tree sway, not articulated leaf animation.
- Replay started the intro caption and an immediate Skip ended it. Reduced motion removed visible snowfall; entrance wheel navigation reached the interior without outdoor precipitation.
- Film Lab selected AcrossB Flow QR Helper, opened its Work accordion, and returned with the same project and one control set. Actual wheel input crossed the 2D reading boundary and reversed with the selection restored; Back to court reached Center Court. No persistent scroll lock was observed.
- `Alt+0` restored clock-driven Daytime and live Clear weather, including a live wind readout of 3.1 m/s during the session. The actual header showed Clear, 28°C, Day. The browser was then returned to the normal URL without preview query parameters.
- No critical JavaScript errors were observed. The pre-existing PCFSoftShadowMap fallback warning remains.

Syntax checks passed for `weather.js`, `weather-effects.js`, and `exterior.js`; the packaging check passed with **66 files / 12,764,661 bytes**. Check mode did not generate deployment output. Local QA evidence — retained privately; not included in the public repository: `daytime-rain.jpg`, `daytime-snow.jpg`, `blue-hour-fog.jpg`, `wind-calm.jpg`, `wind-strong.jpg`, and `night-rain.jpg`. These new captures did not overwrite historical evidence.

Only representative combinations received browser visual review; all 20 lighting combinations received deterministic checks. No FPS or frame-time benchmark was measured, and no significant new stall was noticed in this focused session. This is not a quantitative performance guarantee or a full device/browser regression result. Failure scenarios were simulated rather than induced against the live provider.

### Final visual and regression review

Seven new local-only captures compare Clear, Cloudy, Rainy, Foggy, and Snowy at Daytime, plus Rainy Night and Snowy Night. All use Gate 01 at scroll position 743 and a 1326 × 884 browser viewport; saved images are uniformly 1311 × 874 pixels. Evidence is retained privately as `01-day-clear.jpg` through `07-night-snowy.jpg`; it is excluded from Git and is not publicly verifiable.

The architecture and character remained identifiable in all seven views. The review noted P2 visual polish concerns with flattened clouds clustered immediately above the roof and remaining relatively bright at Night. P3 observations concerned long straight rain streaks and soft round foreground snow points. The user subsequently approved these current visuals and explicitly requested no further refinement; these observations are retained rather than represented as corrected defects.

Actual browser checks passed for Replay/Skip Intro, Reduce Motion hiding snowfall, indoor precipitation removal, forward/reverse wheel movement, and Film Lab → Work → Film Lab with the QR Helper selection preserved and a single control set. Wheel input crossed into the 2D reading state with Film controls hidden and restored the same selection on return. No persistent scroll lock or critical JavaScript error was observed. The existing shadow-map fallback warning remains.

Live mode showed Clear, 28°C in the header and Clear/no precipitation in the environment, sourced from the same classified observation. Normal mode had no development condition/wind controls or preview note; the development Snow shortcut did not activate effects there. Code inspection confirms the development override requires localhost plus explicit opt-in. This local test does not substitute for hosted verification.

**Performance: NOT VERIFIED.** Actual FPS/frame-time comparisons for Clear, Rainy, Snowy, and Strong wind were not collected: the available in-app browser interface did not expose timing instrumentation, and no browser diagnostic port was available. GPU memory was not measured. Visual particle removal was verified, while quantitative allocation/cleanup behavior was not profiled; the implementation intentionally retains its two fixed pools for reuse.

Finalization reran 63 in-memory checks against the current module exports and effects helper: the 20 phase/category cases, weather-code and fallback mappings, phase boundaries, wind presets, fixed-pool reuse, reduced motion, indoor restoration, and inactive-buffer behavior passed. Each rain/snow/fog helper case ran 1,200 simulated frames. This smaller rerun does not relabel the earlier 251/28 historical checks as newly executed. Syntax checks and the 66-file packaging check passed again, as did `git diff --check`.

### Extension changed paths and limits

Runtime: `preview/v0304-p2-hero-cta/weather.js`, new `weather-effects.js`, `exterior.js`, and `index.html`. Packaging: `tools/package-portfolio-preview.cjs`. Documentation: this entry and `INDEX.md`.

No new library, external media asset, API provider, navigation system, or postprocessing pipeline is introduced. The tree grouping is an explicit local hierarchy change to existing meshes, not a stadium redesign. Snow accumulation, wet surfaces, lightning, physical leaf simulation, and measured precipitation density are not implemented. Public production settings and unrelated portfolio sections are outside this extension. Local QA media remain private and Git-ignored; this entry contains only repository-relative code links. Finalization authorizes only the seven intended files, one feature commit and push, and verification of the existing Draft PR/automatic Deploy Preview. Merge, Ready status, and production deployment remain outside authorization.
