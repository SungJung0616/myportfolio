# P2-02 Hero stabilization — local candidate

2026-10-15. Branch feature/portfolio-2-hybrid-editorial, base ea64c0f. No commit, push, deployment, merge or Netlify settings change.

## Status

Layout and surrounding-English UI changes implemented and locally tested. Permanent Netlify Drawer removal is **pending Preview-only collaboration setting confirmation/change**; it is not fixed on the existing PR URL. CSP is unchanged.

Safest fix: disable the optional Drawer for Deploy Previews under Project configuration → Developer settings → Continuous deployment → Collaboration tools. Leave Deploy Previews themselves enabled. Do not modify production build/publish settings. The documented configuration is dashboard-based; no unsupported netlify.toml flag or DOM-removal workaround was added.

Official references:
- https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/overview/
- https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/troubleshoot-the-netlify-drawer/

Read-only hosted checks: `?ntl-drawer-state=hidden` removes the iframe but still produces the injected inline-style CSP error. It is not a complete fix. The existing deploy permalink https://6ad11a4837186b7504e5cd9a--sj-personalportfolio.netlify.app/ has zero iframes and zero console errors in the check; it is a safe temporary review link for the OLD deployed version, not this local P2-02 candidate.

## Exact application changes

- preview/v0304-p2-hero-cta/hero.css: tablet-only padding (600–799px), touch-action on CTAs. Existing mobile 13px retained after comparing 14px.
- preview/v0304-p2-hero-cta/index.html: English document language and surrounding loading/accessibility/review labels. Project-stage content left as-is.
- preview/v0304-p2-hero-cta/navigation.js: English menu, weather placeholder, navigation aria labels and link labels; no navigation logic changes.
- preview/v0304-p2-hero-cta/ui.js: English skip link, project-type filters, count and copy feedback; project descriptions/classifications unchanged.
- preview/v0304-p2-hero-cta/weather.js: English conditions, preview selectors, retry and fallback text; locale en-US; API/effect logic unchanged.

New local QA files: this README, check.cjs, results.json, desktop/tablet/mobile before and after PNGs, three focus PNGs, mobile-14px-candidate.png. Prior hosted-hero-2026-10-15 folder is preserved and remains uncommitted.

## Visual decisions

Approved palette, font family, Hero wording and geometry retained. Tablet CTA top moves from 339.12px to 428.64px, reducing the gap to the unchanged arena by 89.52px. The ivory panel stays continuous below the header. Desktop CTA top remains 731.45px; mobile remains 338.72px. Initial cameras match before/after exactly: desktop [23,18,31], tablet/mobile [20,32,76].

14px candidate had no text clipping, but Explore the Arena wrapped to two lines and became about 60px high versus the primary 44px button. Kept 13px and equal 44px heights to preserve the mobile layout. See mobile-14px-candidate.png versus mobile-after.png. CTA touch targets remain at least 44px tall.

## Browser QA

check.cjs serves the pinned baseline ea64c0f as /before/ and the working files as /after/, applies the exact current _headers including CSP, and runs installed Chrome via Playwright. The baseline was pinned during publication review so future commits do not change the comparison. Captures are real browser renders at 1440×960, 768×1024 and 390×844. The Netlify-injected Drawer is not emulated locally; local CSP success does not prove its removal on the hosted PR URL.

All three sizes passed both CTAs (keyboard Enter/Space or touch), nine navigation destinations, focus screenshot checks, reduced-motion checkbox and scroll snapping to .14, and horizontal-overflow checks. Uncaught JS errors: zero. HTTP 4xx/5xx: zero. No local CSP errors. Weather is deliberately aborted for deterministic fallback comparison, producing expected ERR_FAILED and corresponding console error entries; do not count those as unplanned regressions. Existing PCFSoftShadowMap fallback warning remains. Live weather success and full Film Room playback are not covered by this run.

git diff --check passed. Protected source files (hero.js, exterior.js, spatial-data.js, project-space.js, film.js, GLB), CSP, netlify.toml, production src/package/lockfile match HEAD. No camera/geometry/character/Film Room behavior changed.

## Remaining verification

After approval: disable the Preview-only Drawer, commit/push only the reviewed changes, and verify the resulting hosted CSP/toolbar behavior. None of these external actions were taken. Real iOS/Android, Safari/Firefox, screen readers, 200% zoom, full media playback and sustained performance remain unverified. Project content and Film Room labels outside this Hero-surrounding scope may still contain Korean.

The frontend-design skill informed a scoped tablet editorial adjustment instead of a camera change. Web Interface Guidelines informed focus/touch/reduced-motion checks; this is not an accessibility certification.
