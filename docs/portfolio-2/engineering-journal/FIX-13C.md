# FIX 13C — Arena Atmosphere

Recorded on 2026-10-19 against `a9fb68ff8105562be99cede497d8cd4e162e5a13` on `feature/portfolio-2-hybrid-editorial`.

**Status at finalization review, before publication:** Locally implemented and verified within the scope below. The user approved one FIX 13C commit, feature-branch push, and verification of the existing Draft PR and automatic Deploy Preview. This entry records prepublication evidence; subsequent Git history and deployment checks establish publication state. Physical-device touch, screen-reader behavior, FPS, frame times, and GPU memory remain **NOT VERIFIED**. Hosted verification was pending when this entry was prepared.

## Problem and UX decision

[FIX 13B.1](FIX-13B.1.md) supplied time/weather lighting and exterior effects, but the public Weather preview mixed time and weather into a few legacy presets. The fuller controls were development-only. Visitors needed an understandable way to explore the existing scene without presenting a simulation as current LA weather.

The approved direction was a compact ivory popover with purple text, restrained gold selection accents, and the existing sans-serif paired with a small Georgia display title. A persistent sidebar or modal would occupy too much of the arena. The chosen button opens “Set the Scene,” with separate Time of day and Weather groups, a custom/live status, an actual-weather note, and Reset to Live.

The former public selector is replaced rather than duplicated. The panel uses existing palette/typography and native buttons; no dependency, media, or decorative scene asset is added. It hides during the introduction, Film Lab, editorial reading, and native dialogs. On the Hero it anchors upward from its bottom-positioned trigger; at Gate 01 it opens below the top-left trigger.

## State architecture

- [weather.js](../../../preview/v0304-p2-hero-cta/weather.js) remains the sole environment owner. Its existing phase/weather override variables now receive visitor button selections and opt-in development shortcuts. There is no parallel environment store.
- `resolveEnvironment` independently resolves a valid time override or current LA phase, and a valid weather override or classified observation. A null override means Live for that dimension. Snow retains Cloudy lighting with Snow precipitation.
- Selecting a time never forces weather to Clear; selecting weather never forces a time phase. Live Time + Fog, Sunrise + Live Weather, Night + Rain, and Golden Hour + Snow are supported. The historical localhost phase-only query still initializes a Clear comparison; normal public initialization is Live/Live.
- The existing target calculation and 2.4-second interpolation apply the effective state. Wind continues to use the validated existing observation, except for the retained development-only wind preset. [weather-effects.js](../../../preview/v0304-p2-hero-cta/weather-effects.js) and [exterior-lighting.js](../../../preview/v0304-p2-hero-cta/exterior-lighting.js) are unchanged.
- The header always labels the actual observation and provider day/night flag. A selected Night or Snow does not rewrite that observation. The panel marks a Custom scene and retains an actual-LA-weather note, including on mobile where the header weather is hidden.
- Reset clears both overrides and the development wind preset. Nothing is stored in localStorage, sessionStorage, cookies, or the URL; a normal reload starts Live/Live.
- Option changes call `refresh`, not `load`/fetch. The same Open-Meteo service, 15-minute refresh, request guard, timeout, stale-data handling, and neutral fallback remain. Retry is only offered when the live request fails.

## Interaction and accessibility

The trigger is a button with `aria-haspopup="dialog"`, `aria-expanded`, and `aria-controls`. The nonmodal panel has an accessible title/description, a close button, fieldset/legend groups, and native toggle buttons with `aria-pressed`. Exactly one selection is active per group. A polite status announces the effective custom/live scene without per-frame DOM updates.

Escape and the close button restore focus to the trigger. Closing while a panel control owns focus also restores it; moving focus elsewhere does not steal it back. Tab follows native document order without a focus trap. Outside pointer input dismisses the panel. Wheel/touchmove dismiss it through passive handlers without canceling navigation input; there is no nested scroll region or body scroll lock.

The existing OS/checkbox Reduce Motion path remains responsible for environment interpolation and precipitation/tree motion. Panel entry uses a short opacity/transform animation; OS reduced motion, the checkbox, and keyboard input suppress that entry motion. Touch targets remain at least 44px for scene controls. Small-height layouts reduce spacing, and landscape places time/weather groups side by side.

During visual iteration, the existing right-side location dots overlapped the mobile panel. Raising only the expanded panel's stacking context corrected this. The 320 × 568 layout initially exceeded the viewport; reducing spacing and attribution height fitted the panel without reducing scene-button hit targets or introducing internal scrolling.

## Implementation paths

- [weather.js](../../../preview/v0304-p2-hero-cta/weather.js): public UI, shared override resolution, observation labels, and interaction lifecycle.
- [weather.css](../../../preview/v0304-p2-hero-cta/weather.css): scoped popover, responsive layout, focus/selected states, and reduced motion.
- [exterior.js](../../../preview/v0304-p2-hero-cta/exterior.js) and [index.html](../../../preview/v0304-p2-hero-cta/index.html): cache-version updates only.
- This entry and [INDEX.md](INDEX.md): local evidence and limitations.

## Verification

187 current in-memory assertions passed against the actual module exports. They cover five observed weather codes across all 36 time/weather selections, precipitation effects, independent Live behavior, phase boundaries, and invalid-selection fallback. A further 39 controller-integration scenarios used the actual factory with DOM/canvas/network stubs: a simulated Cloudy observation remained Live weather under time overrides, all 36 button combinations retained one initial API request and the actual header text, each group had one pressed button, and Reset restored Live. These are deterministic logic checks, not visual or FPS measurements.

All six time buttons and all six weather buttons were activated in the local browser. DOM selected states, effective phase/category/precipitation, and an unchanged actual-weather header were checked after each action. Golden Hour + Snow was visually reviewed. Reload restored Live/Live with the panel closed.

At 320 × 568 the final panel bounds were x=12–292, y=130–556.44. Its scrollHeight equaled clientHeight, and scene controls retained at least 44px height. This is viewport-based desktop-browser testing, not a physical-device touch or screen-reader certification.

Focused local browser results:

- Golden Hour + Snow and Night + Rain were visibly applied. Live Time + Fog and Sunrise + Live Weather retained the other dimension's selection. Reset selected Live in both groups and cleared the Custom indication.
- The actual header remained Clear, 27°C, Day while simulated conditions changed. The mobile panel retained that actual observation when the header weather was hidden.
- Escape closed the panel, set expanded=false, and restored focus to the trigger with a visible outline. Enter reopened it, Tab reached the close button, and keyboard entry animation was disabled. Outside click closed it without navigation.
- A real wheel movement over the open panel closed it and advanced scrollY from 709 to 1098; reverse wheel input returned to Gate 01. No persistent scroll lock was observed. Physical touch scrolling was not tested.
- Reduce Motion removed visible rain and disabled the panel animation. Replay showed the first intro caption, hid Arena Atmosphere during `welcome-active`, and immediate Skip restored normal controls.
- Film Lab selected QR Helper, opened its Work accordion, and returned with the same selection and a single Film control set. Actual wheel input crossed into reading mode and reversed. Arena Atmosphere stayed hidden in Film/reading mode with its panel closed.
- Final 390 × 844 portrait and 844 × 390 landscape layouts were reviewed. The landscape panel ended at y=381.33 with no nested scrolling. These checks supplement the 320 × 568 fit described above; no physical-device or screen-reader certification is claimed.
- Without opt-in, the development Snow shortcut left the current visitor selection unchanged and no development note was mounted. In a separate localhost opt-in tab, Alt+Shift+5 selected Snow, Alt+1 selected Sunrise, Alt+Shift+0 restored Live weather while retaining Sunrise, and Alt+0 restored Live/Live. The temporary test tab was closed.
- No critical JavaScript errors were observed. The pre-existing PCFSoftShadowMap fallback warning remains.

Representative local-only QA evidence: `desktop-golden-hour-snow.jpg` and `mobile-night-rain.jpg`. Both are new captures in Git-ignored storage and do not replace historical evidence. Syntax and preview packaging checks passed; no new runtime path or packaging configuration was required.

## Limitations

The weather service is a model estimate. Clock windows remain fixed LA phases rather than astronomical events. Existing rain/snow density, cloud shapes, linear fog, whole-tree sway, and lack of accumulation/wet surfaces are unchanged. Simulation controls do not make the weather physically calibrated.

No performance benchmark or GPU profile is claimed. Local captures are private, Git-ignored evidence and are not publicly verifiable. Public deployment behavior is not tested in this local implementation task. Development shortcuts still require localhost plus explicit opt-in; actual user simulations are intentionally available through the public-facing UI.
