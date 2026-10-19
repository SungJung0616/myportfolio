# Hosted Hero visual review — 2026-10-15

Target: https://deploy-preview-1--sj-personalportfolio.netlify.app/
PR #1, commit ea64c0fff2a3dc868f88bf97793dfb782d4c6c7c. Chrome 155.0.8059.40 via Playwright. No application/design/hosting configuration changes. Artifacts are local and uncommitted.

## Evidence availability

Local QA evidence — retained privately; not included in the public repository. This public record includes this README and `results.json`; captures and the runner named below remain in the local archive. Their filenames document historical evidence, not downloadable files or a current verification result.

## Captures

- desktop.png: 1440 × 960
- mobile.png: 390 × 844, touch emulation
- tablet.png: 768 × 1024, touch emulation
- *-focus.png: primary CTA keyboard focus
- *-playbook.png: primary CTA destination
- desktop-interaction.webm: recorded browser interaction, including navigation and reduced-motion reload. The page@*.webm file is Playwright's identical raw recording.
- results.json: console/network/geometry measurements and interaction results
- review.cjs: historical capture runner retained locally, not included in the public repository. It required Playwright and installed Chrome; it cannot be run from this public checkout. No dependencies were installed during the original review.

## Visual assessment

Approved identity, supporting copy and philosophy are present. Purple/ivory palette and desktop text-left/arena-right composition match the intended direction. Entrance and Sung are visible in all three sizes. Desktop cropping of the building is consistent with the prior accepted framing; not a new defect. Mobile headline and both CTAs fit without clipping. Character details are small on mobile/tablet, although the figure is visible.

### P1 — Hosted Preview footer obstruction

preview/v0304-p2-hero-cta/_headers:5 — CSP blocks Netlify's injected review iframe and an inline style. A broken gray frame is visible at the bottom of all initial captures. DOM verification identifies https://app.netlify.com/cdp/ as the iframe source; desktop rectangle x=330, y=912, width=780, height=48. This is not an arena rendering failure. Prefer disabling the optional Netlify review toolbar for this Preview if it is unnecessary, or approving a narrowly scoped CSP integration after reviewing toolbar requirements. Do not broadly allow unsafe-inline or all frames. No setting was changed.

### P2 — Tablet editorial/arena separation

preview/v0304-p2-hero-cta/hero.css:9,17 — 768px uses the full-width mobile arrangement. Copy occupies the top-left while the arena begins much lower; approximately 180px separates the CTA bottom from the visible roof. The empty right portion of the copy panel amplifies the separation. Propose a tablet-specific content width/padding treatment first, preserving camera/geometry; any camera change requires separate approval.

### P2 — Mixed-language public chrome

preview/v0304-p2-hero-cta/navigation.js:4 and weather.js:7,12 — English Hero is surrounded by Korean menu/weather/review labels. The page root is lang=ko while the Hero correctly declares lang=en. Propose a scoped English UI pass; no translation performed in this review.

### P3 — Secondary UI polish

preview/v0304-p2-hero-cta/hero.css:17 — mobile/tablet CTAs use 13px labels with 44px height. Usable in these captures, but 14px is a reasonable comparison candidate if both buttons still fit or deliberately stack. Right-hand dots overlay part of the arena on mobile; no CTA overlap observed. Do not enlarge or reposition the character as part of a typography-only refinement.

## Interaction results

All three viewports: WebGL scene and character ready; primary CTA keyboard Enter reaches Playbook; secondary CTA desktop Space / mobile-tablet tap reaches Gate 01 at p=.14. All nine navigation destinations reached; no horizontal overflow at the initial Hero or tested destinations. Focus ring is clearly visible in focus captures. First Tab reaches the existing skip-to-Work link. Reduced-motion reload and navigation pass; separate manual-scroll check at 10% snaps to the .14 rail stop with the reduced-motion checkbox enabled, rather than continuously interpolating. No context loss observed.

This run checks destinations, not frame-by-frame equality with all historical 12 camera poses. Mobile/tablet browser dimensions and touch are emulated, not physical devices.

## Console and network

- Uncaught page JavaScript errors: 0 in all runs.
- HTTP 4xx/5xx responses: 0 in all runs.
- Console errors are NOT zero: CSP inline-style and Netlify iframe violations on initial load/reload.
- Warning: THREE.WebGLShadowMap PCFSoftShadowMap removed, falling back to PCFShadowMap. Existing runtime compatibility warning; no render failure observed.
- sungflix-demo.webm requests were aborted during navigation/reload (ERR_ABORTED). Not an HTTP failure; full playback was not tested, so do not claim video playback passed.
- Live weather connected in this run; this is not a long-term reliability guarantee.
- The previous report's zero JavaScript errors meant pageerror events; it did not establish a clean browser console. This review adds console and failed-request monitoring.

## Proposed order / remaining limitations

1. Resolve optional Netlify toolbar/CSP conflict without changing arena design.
2. Compare a tablet-only editorial spacing candidate.
3. Scoped English chrome cleanup; optionally compare 14px mobile CTA type.
4. Re-test before any approval to commit/push.

Not tested: real iOS/Android/Safari/Firefox, screen reader, 200% zoom, full WCAG audit, nighttime contrast, sustained performance, full Film Room playback. Video was recorded but not independently reviewed frame-by-frame. The review used the Web Interface Guidelines skill for focus, responsive layout and reduced-motion checks: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md . Findings are not an accessibility certification.
