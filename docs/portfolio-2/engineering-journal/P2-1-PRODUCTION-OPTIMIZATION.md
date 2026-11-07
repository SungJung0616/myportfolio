# Portfolio 2.1 — Production optimization candidate

## Baseline and scope

Inspected on 2026-11-06. Production deploy `6aed5aa713f1483844d4d9ca`
was ready at `e4bc7c3dd521aea100db55c6a62b67b511ef71b0`. PR #3 was merged;
feature commit `119b4209568b59b0e9642070234c65881417208e` has the same tree.
The new optimization branch starts at the production merge, not stale local master.
There were 138 pre-existing untracked files; none belongs to this change.
Production and the independent V1 archive are not deployment targets for this task.

## Corrections

- Deploy Preview now explicitly selects the approved Business Systems resume, as
  production already does. Actual default preview output differed; this was not
  inferred from an old report. No resume content changed.
- Game Center requests coalesce by action/game, retain successful responses for
  at most 60 seconds (12 entries), and retry failures. Refresh aborts obsolete
  requests and clears this cache. Existing server approval filters remain intact.
- Jumbotron canvases compare per-face content keys. Camera face changes alone no
  longer repaint all four textures. Font readiness explicitly invalidates them.
- Camera interpolation reuses vectors. Diagnostic arrays/objects are reused.
- Hidden documents skip scene work. Geometry, DPR cap, shadows, camera paths,
  visual design, statistics and publication flags are unchanged.

## Measured local comparison

Same in-app browser, 1280 × 720, no CPU/network throttling. The loopback-only
profiling harness is not packaged. These are single lab samples, not field Core
Web Vitals or proof of an FPS improvement. RAF cadence includes the diagnostic
sampler; GPU time and GPU memory were not measured.

| Metric | Baseline | Candidate |
|---|---:|---:|
| Hero mean RAF interval, 600 samples | 8.012 ms | 8.015 ms |
| Hero p95 RAF interval | 8.1 ms | 8.1 ms |
| Load event | 498.7 ms | 502.2 ms |
| Observed LCP | 60 ms | 72 ms |
| Cumulative non-input layout shifts | 0.3255 | 0.3255 |
| JS encoded bytes, local uncompressed | 2,567,232 | 2,569,182 |
| CSS encoded bytes | 80,338 | 80,338 |
| Initial resource requests | 57 | 58 |
| Hero draw calls / triangles | 757 / 768,464 | 757 / 768,464 |
| Playbook camera draw calls / triangles | 526 / 811,468 | 526 / 811,468 |

The additional JS request is the small isolated cache module. No initial-load or
FPS improvement is claimed. The unchanged elevated layout-shift observation needs
attribution before a broad performance sign-off. Single heap samples are noisy
and do not demonstrate leak prevention. Repeated-navigation memory and INP remain
unverified. Physical mobile and assistive-technology testing remain unverified.

Deterministic request tests: two simultaneous history consumers produce one
fetch; a subsequent fresh cache hit produces zero additional fetches. This is a
unit measurement, not a hosted traffic measurement.

## Validation

Existing content (33), RC1 (68), spatial (13), Game Center (35), ingestion (7),
tour (30), jumbotron (13), and team fallback (34) checks passed. New targeted
checks cover coalescing, expiry, refresh, retry, abort and packaging identity.
Syntax and whitespace checks passed. Legacy React dependencies are not installed;
the old browser QA script also expects an obsolete Hero headline/navigation and
is not treated as a current passing regression suite.

Local real-browser checks: Hero rendered, Playbook opened with the correct three
cases, returning to Arena worked, and an unavailable local API produced a readable
error while the arena continued rendering. Reduced-motion tour entry worked.
Hosted checks are a separate release gate; passing these unit tests is insufficient.

## Deployment and privacy

Production command remains `node tools/package-portfolio-preview.cjs --production --resume-candidate`.
Preview command is `node tools/package-portfolio-preview.cjs --resume-candidate`.
Both packaged PDFs match SHA-256
`AA6BA27CB8D2DC1C9EFCCBAB9892559BFFFC9BE41742772C653605C980E7D8BE`.
Preview noindex and production indexing rules remain separate. Existing function
credentials were inspected by name/context only and were not changed or copied.
Token rotation was explicitly excluded by the user; prior disclosure remains a
security limitation, not a resolved finding. No paid services were introduced.

Raw screenshots/profiling observations are retained locally, outside Git.

## Final QA follow-up — 2026-11-06

This follow-up continues Draft PR #4; it does not repeat the completed renderer
optimization or change geometry, camera paths, visual quality, or content.

### Confirmed layout-shift causes and correction

The local observer now records source elements and standard CLS session windows
(one-second gaps, five-second maximum), rather than only an unbounded sum.
At 1280 x 720, a fresh reproduction measured 0.325929: `header.build-intro`
contributed 0.305556 while its asynchronously inserted stylesheet was pending;
the Atmosphere control's late Hero-state placement contributed 0.019960.
At 390 x 844, late Contact styles also exposed `nav.contact-review` briefly.

Work and Contact styles now load in the document head before their elements are
created. Initial home Hero state is applied before Atmosphere mounting rather
than waiting for the first WebGL frame. Duplicate dynamic stylesheet insertions
were removed. Remaining tiny shifts are font-metric changes, not hidden by the
measurement harness. The harness output is an inert JSON script, not an overlay.

### Repeatable local comparison

Baseline: preserved package from `7a282c8`. Candidate: the scoped changes above.
Same in-app Chromium browser, 390 x 844 viewport, same Hero camera, no CPU/network
throttling, three reloads per version. These are desktop-hosted mobile-viewport
tests, not physical-phone measurements. Cache was not forcibly cleared; timing
variation is expected. Runs with unrelated user input were discarded.

| Metric | Before, runs 1 / 2 / 3 | After, runs 1 / 2 / 3 |
| --- | --- | --- |
| CLS | 0.501039 / 0.102935 / 0.501039 | 0.000215 / 0.000215 / 0.000215 |
| Hero-description LCP, ms | 928 / 796 / 760 | 908 / 972 / 768 |
| Load event, ms | 648.8 / 511.6 / 503.6 | 729.7 / 672.3 / 510.8 |
| Mean RAF interval, ms (last 600 samples) | 7.050 / 7.027 / 7.084 | 7.050 / 7.061 / 7.050 |
| p95 RAF interval, ms | 7.1 / 7.0 / 7.1 | 7.0 / 7.1 / 7.0 |

Desktop spot check after the Work/Hero correction: CLS 0.0000196. No LCP/FPS
improvement is claimed. RAF cadence is not GPU frame completion time. The
render-blocking CSS trade-off removes visible unstyled content; throttled loading
still needs validation before a final performance sign-off.

Actual mobile Jumbotron input observations after the correction: entry event
96–104 ms; next-face event 16 ms; previous-face event 32–40 ms (Event Timing
durations, not a field INP score). Forward/reverse face changes and automatic
rotation worked. Playbook opened with Packing Cover, QR, and Coupang in order.

### Preview-only obstruction

The PR alias injects a `Netlify Drawer` iframe from `app.netlify.com/cdp/`.
Its observed desktop rectangle was x=242.5, y=672, width=780, height=48; its
embedded document was an error page. The same deploy's immutable permalink had
no Drawer iframe. Use the deploy permalink for unobstructed review. No CSP
relaxation, application CSS workaround, or Production setting change was made.
See [Netlify's troubleshooting guidance](https://docs.netlify.com/deploy/review-deploys/netlify-drawer-for-feedback/troubleshoot-the-netlify-drawer/).

### Validation and remaining gate

All 233 existing focused checks, the request/cache checks, 4,002 camera-pose
comparisons, and new initial-style/state assertions passed. Both packages built
twice; the approved resume and indexing checks passed. The first RC1 invocation
omitted `--resume-candidate` and correctly rejected the candidate PDF against the
legacy expectation; rerunning with the actual release option passed all 68 checks.

CPU/network throttling: **NOT VERIFIED**. Native Chrome DevTools access timed out
at the computer-control approval step. Physical mobile, GPU memory/time, field
INP, and screen-reader tests remain **NOT VERIFIED**. This is not unconditional
Production performance approval; the throttled mobile gate remains outstanding.
