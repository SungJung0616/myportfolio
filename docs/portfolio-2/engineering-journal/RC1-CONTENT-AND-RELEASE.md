# RC1 — Content clarity and production readiness

Recorded on 2026-10-20. This is a dated supplement, not a rewritten FIX history.

**State:** implemented and tested locally after `30805a8`. Uncommitted; PR inclusion
and V2 deployment are not established. This task did not change any Netlify site
setting, the V1 archive, master, or the existing production deployment.

## Problem and evidence

The release audit found indirect access to representative work, unclear boundaries
between three operational tools, broader workflow timing shown under QR alone,
unreadable masked video details on mobile, and preview-only publishing configuration.

- [Shared catalog](../../../preview/v0304-p2-hero-cta/project-catalog.js)
- [Work presentation](../../../preview/v0304-p2-hero-cta/project-showcase.js)
- [Media provenance and privacy](../../../preview/v0304-p2-hero-cta/project-demos/README.md)
- [Packaging](../../../tools/package-portfolio-preview.cjs)
- [Focused checks](../../../tools/check-release-candidate.cjs)
- Historical [FIX 09](FIX-09.md) and [FIX 10 / STEP 03B](FIX-10.md#step-03b--film-viewing-interval-and-preview-packaging)

Those portfolio engineering records do not certify warehouse-tool behavior.
Owner clarifications in the available conversation describe the work; they are not
independent measurements or proof of exact code authorship.

## Decision and implementation

Keep the approved arena, camera, Atmosphere and visual language. Prefer concise
copy, existing accordions and text links over a new design or animation system.
The Hero now states the operations/QA positioning, provides one primary Featured
Work CTA, and retains exploration, Playbook and a secondary Resume link.

The existing Sheets, Label and QR IDs lead Work and Film without duplicate records.
Each uses problem, responsibility, previous workflow, technical decisions,
demonstrated workflow, verification, outcome, limitations and human controls.
The text Input → Processing → Output → Human verification explanation is explicitly
not new recording evidence or proof of technical integration.

- Sheets supports cover preparation and owner-described Apps Script box guidance.
  Specific parsing sources and algorithms remain unverified; it is not renamed as
  a verified Data Parser.
- Label uses browser interaction with designated cells, not the Sheets API.
  Final save, printing and automatic rollback are not guaranteed.
- QR validates identifiers and assists row selection. Public-code dry-run and
  recorded operational execution are distinct; version equivalence is unverified.
- People verify batches/SKUs/quantities, correct unknown box sizes, review covers,
  label suffixes and QR, reconcile quantities, and explicitly complete work.

The roughly 150-batch, 50-to-20–30-minute observation is broader daily preparation
context, not QR-only performance. Label's historical 15-to-1–2 error observation
retains uncertainty about period and methodology. Neither is a benchmark.
AI-assisted implementation is disclosed without equating it to independent
authorship. Owner-led requirements, decisions and acceptance checks are separated
from unverified implementation details.

Approved WebM/JPG files and opaque masking were preserved byte-for-byte. Captions
outside the video explain visible behavior and hidden-value limitations. No private
original, identifier, QR payload or messenger screenshot was added or unmasked.

## Packaging decision

`--production` creates `.netlify/portfolio-2-production`; normal packaging retains
`.netlify/portfolio-2-preview`. Production configuration is explicit in the local
Netlify file, but does not activate a deployment by itself.

Both outputs contain the canonical Resume PDF and all five sibling Playbook files.
Generated Hero/Contact links use `/resume/Sung_Jung_Resume.pdf`. Source-folder
development retains its existing working public PDF URL. Production-only generated
HTML, headers and robots permit indexing and use a release title; canonical Preview
noindex and CSP remain intact. Six known legacy case-study routes use reversible
302 redirects to the independent V1 archive. No blanket SPA rewrite masks missing
V2 asset paths.

## Actual local verification

- Six changed JavaScript files passed syntax checks; `git diff --check` passed.
- 68 focused catalog, shared-selection, media-identity, PDF, policy, legacy mapping
  and Playbook checks passed repeatedly.
- Preview and production packaging succeeded repeatedly: 72 runtime/config files,
  approximately 16 MB of canonical assets plus generated redirects.
- A loopback-only production simulation served all 70 public files with byte
  equality. Six legacy redirects returned 302 with the expected target; each archive
  target returned 200. This simulates rules locally, not Netlify's hosted execution.
- Desktop browser: keyboard Featured Work and accordion entry, representative
  order, Journal links, Work ↔ Film Label selection/return and QR playback passed.
- Intro Replay, visible caption and immediate Skip passed. Automatic intro reached
  the normal Replay state. No timing or animation-quality benchmark was made.
- Playbook loaded its packaged iframe; the QR impact view explicitly described
  broader historical workflow context rather than QR-only improvement.
- Atmosphere Night/Rain set a custom scene while the observed weather header stayed
  separate. Reset restored live daytime/cloudy; Escape returned focus to its trigger.
- At a simulated 390 × 844 viewport, Hero actions and Resume were visible, Work had
  no horizontal overflow, external demo explanations were readable, and the packing
  video played muted (10 seconds, readyState 4). QR played muted (18 seconds,
  readyState 4). Keyboard focus was visible.
- No application JavaScript errors were captured. Existing Three.js shadow-map
  fallback warnings and Node module-type warnings remain.
- Both the V1 archive and existing production responded with the V1 entry bundle.
  Archive noindex remained present; existing production had no archive noindex header.

One-second source/output contact-sheet review is historical media evidence, not a
new frame-by-frame privacy certification. Local screenshots are retained privately;
they are not public verification artifacts.

## Limitations and release recommendation

**Conditional GO for RC review, not permission to deploy.** Hosted V2/CSP/redirect
validation remains necessary after separate deployment approval. V1 auto-publishing
was on during the preceding audit and is intentionally not changed here.
Physical devices, screen readers, FPS, GPU and Core Web Vitals are **NOT VERIFIED**.
The character model is approximately 6.47 MB; package bytes and loopback HTTP timings
are not browser rendering-performance results. Broad optimization and visual
redesign were deliberately excluded.

Unresolved content dependencies include exact PDF compatibility limits, full Apps
Script source/algorithms, measurement methodology and public/operational version
equivalence. These limits are disclosed rather than filled with invented details.

## Lesson

Release readiness needs both clear evidence boundaries and deployable routing.
Privacy-safe footage may need accessible external explanations; it must not be
presented as stronger evidence merely because it is visually polished.
