# Prepared file manifest

2026-10-15. Proposed changes only; nothing staged. This list covers 49 payload files (11306611 bytes), plus this manifest itself.

| Path | Bytes |
| --- | ---: |
| `.gitignore` | 522 |
| `docs/DESIGN_SYSTEM.md` | 6689 |
| `docs/IMPLEMENTATION_ROADMAP.md` | 8472 |
| `docs/PORTFOLIO_VISION.md` | 7075 |
| `docs/qa/hero/after-1440.png` | 315789 |
| `docs/qa/hero/after-390.png` | 108961 |
| `docs/qa/hero/before-1440.png` | 309488 |
| `docs/qa/hero/before-390.png` | 105081 |
| `docs/qa/hero/README.md` | 1083 |
| `docs/qa/hero/results.json` | 12141 |
| `netlify.toml` | 249 |
| `preview/v0304-p2-hero-cta/_headers` | 320 |
| `preview/v0304-p2-hero-cta/BufferGeometryUtils.js` | 37724 |
| `preview/v0304-p2-hero-cta/career-data.js` | 2447 |
| `preview/v0304-p2-hero-cta/dice-poster.png` | 48881 |
| `preview/v0304-p2-hero-cta/exterior-lighting.js` | 1152 |
| `preview/v0304-p2-hero-cta/exterior.css` | 4205 |
| `preview/v0304-p2-hero-cta/exterior.js` | 26513 |
| `preview/v0304-p2-hero-cta/film-data.js` | 1516 |
| `preview/v0304-p2-hero-cta/film.css` | 4139 |
| `preview/v0304-p2-hero-cta/film.js` | 9477 |
| `preview/v0304-p2-hero-cta/GLTFLoader.js` | 117568 |
| `preview/v0304-p2-hero-cta/hero.css` | 4494 |
| `preview/v0304-p2-hero-cta/hero.js` | 2075 |
| `preview/v0304-p2-hero-cta/index.html` | 2680 |
| `preview/v0304-p2-hero-cta/navigation-data.js` | 6829 |
| `preview/v0304-p2-hero-cta/navigation.css` | 4432 |
| `preview/v0304-p2-hero-cta/navigation.js` | 5999 |
| `preview/v0304-p2-hero-cta/playbook-story.css` | 2975 |
| `preview/v0304-p2-hero-cta/playbook-story.js` | 8159 |
| `preview/v0304-p2-hero-cta/project-data.js` | 1939 |
| `preview/v0304-p2-hero-cta/project-space.js` | 5109 |
| `preview/v0304-p2-hero-cta/review.html` | 672 |
| `preview/v0304-p2-hero-cta/robots.txt` | 26 |
| `preview/v0304-p2-hero-cta/RoundedBoxGeometry.js` | 6482 |
| `preview/v0304-p2-hero-cta/SkeletonUtils.js` | 11547 |
| `preview/v0304-p2-hero-cta/spatial-data.js` | 3072 |
| `preview/v0304-p2-hero-cta/sung-miniature-v1.glb` | 6472464 |
| `preview/v0304-p2-hero-cta/sungflix-demo.webm` | 706101 |
| `preview/v0304-p2-hero-cta/sungflix-poster.png` | 788377 |
| `preview/v0304-p2-hero-cta/THREE-LICENSE.txt` | 1081 |
| `preview/v0304-p2-hero-cta/three.core.js` | 1458113 |
| `preview/v0304-p2-hero-cta/three.module.js` | 662772 |
| `preview/v0304-p2-hero-cta/ui.css` | 6224 |
| `preview/v0304-p2-hero-cta/ui.js` | 5307 |
| `preview/v0304-p2-hero-cta/weather.css` | 854 |
| `preview/v0304-p2-hero-cta/weather.js` | 6052 |
| `tools/preview-qa/check.cjs` | 3136 |
| `tools/preview-qa/package.json` | 148 |

## Validation and limitations

- Portable smoke test passed: standalone static root, both CTAs, 12 rail stops, 9 destinations, 1440/390, no local HTTP errors or JS errors. Weather fallback was tested; live weather success was not.
- All copied runtime files are preserved; review.html is a new minimal review landing page replacing references to excluded historical media.
- Production package.json, lockfile and src match HEAD. netlify.toml contains only context.deploy-preview; existing production command remains CI=false npm run build and publish remains build in Netlify UI.
- Context precedence is checked against official Netlify configuration documentation. No hosted build or Netlify CLI resolved-config run was performed. Git-based Deploy Preview enablement is UNKNOWN: site API returned no explicit enablement flag. Confirm in the Netlify UI before PR creation.
- Environment API returned zero records for the site query. Legacy env metadata contains a DEPRECATED field, not proof of absence of all inherited secrets. Account-wide inheritance and PR secret policy remain unverified. No secret values were printed or copied. A future preview build can execute dependency install scripts and may receive configured secrets; static publishing alone is not a security boundary.
- Credential-pattern and machine-path scans found zero matches in prepared additions. Heuristic scanning is not a guarantee. Company content is limited to existing public-safe summaries; new business claims and private artifacts were not added.
- Three.js MIT license included. Character and film assets reuse the previously approved candidate; no new asset-rights audit was performed.
- Excluded: all historical preview snapshots, avatar experiments, private CareerOS records, local deployment/auth scripts, duplicate screenshots/videos, audit ZIP, production app modifications, and machine-specific tests.
- Original working directory remains on master; all preparation is in the separate feature worktree. No staging, commit, push, PR, deployment, or Netlify mutation performed.

## Test setup

See docs/qa/hero/README.md. The QA package is isolated so production dependencies are unchanged. The pinned Playwright package has not been freshly installed in this worktree; this run used the available runtime through NODE_PATH without storing its path. A clean dependency installation remains a pre-push reproducibility check.

