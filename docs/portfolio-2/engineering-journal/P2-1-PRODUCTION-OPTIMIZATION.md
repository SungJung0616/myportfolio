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
