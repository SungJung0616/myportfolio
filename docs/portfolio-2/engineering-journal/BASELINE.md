# Current Development Baseline

Reconstruction reference: 2026-10-18. This document records a local audit baseline; it does not create a Git commit or deployable release.

## Repository and delivery boundary

- Repository: [SungJung0616/myportfolio](https://github.com/SungJung0616/myportfolio).
- Worktree name: `myportfolio-p2-collab`; no machine-specific path is published.
- Branch: `feature/portfolio-2-hybrid-editorial`.
- HEAD: `9b03cb171c97f2024ed03d9cf505cf5182e2db99`.
- Earlier feature commit: `ea64c0fff2a3dc868f88bf97793dfb782d4c6c7c`.
- Local master/base: `b2e8338dbc446649e39f259e4ab242915c479f85`. This is not a fresh remote-master assertion.
- [Draft PR #1](https://github.com/SungJung0616/myportfolio/pull/1) was read during STEP 01: open/draft, head `9b03cb1`, two feature commits. The FIX work below was absent from that PR.
- No post-P2-02 FIX commit was found. There is no reliable per-FIX Git snapshot to recover.

## Pre-journal working state

STEP 01 found 13 modified tracked files, 174 untracked files, zero staged files, and zero existing ignored files returned by Git. Total changed/untracked content was 25,894,207 bytes. These counts intentionally exclude this newly created journal.

| Category | Count | Interpretation |
| --- | ---: | --- |
| A — Preview source/configuration | 37 | 13 modified tracked files plus 24 new runtime files |
| B — Required runtime assets | 9 | LAYRD logo and eight project images |
| C — Project documentation | 7 | Six P2-03A documents and image provenance |
| D — QA evidence | 129 | Historical images, recording, results, and useful scripts |
| E — Temporary/redundant candidates | 4 | Three inspection/extraction artifacts and one exact duplicate video |
| F — Publication purpose unresolved | 1 | External UI reference collage, deliberately not linked here |

E/F classification authorizes no deletion. The STEP 01 inventory was retained in the accessible audit conversation; no inventory report file was created during that read-only step.

## Required runtime

The active static entry is [preview index](../../../preview/v0304-p2-hero-cta/index.html), separate from the production React application.

- [exterior.js](../../../preview/v0304-p2-hero-cta/exterior.js) composes arena geometry, career, welcome, weather, LAYRD, and Film integration.
- [project-space.js](../../../preview/v0304-p2-hero-cta/project-space.js) connects the physical board, scoreboard, Film room, and glass entrance.
- [navigation.js](../../../preview/v0304-p2-hero-cta/navigation.js) connects editorial sections to existing destinations.
- [project-catalog.js](../../../preview/v0304-p2-hero-cta/project-catalog.js), [project-media.js](../../../preview/v0304-p2-hero-cta/project-media.js), and [project-showcase.js](../../../preview/v0304-p2-hero-cta/project-showcase.js) are shared Film/Work dependencies.
- The [Playbook iframe adapter](../../../preview/v0304-p2-hero-cta/interactive-playbook.js) loads the sibling [Playbook entry](../../../preview/p2-03b-playbook/index.html), which requires [prototype.js](../../../preview/p2-03b-playbook/prototype.js), [coupang.js](../../../preview/p2-03b-playbook/coupang.js), [interaction.js](../../../preview/p2-03b-playbook/interaction.js), and [prototype.css](../../../preview/p2-03b-playbook/prototype.css).

The current Preview's 29 new files comprise 19 runtime modules/styles, nine images, and one provenance document. The 18 files in the older-named Playbook directory comprise five active runtime files and 13 historical screenshots. Neither directory is disposable.

STEP 01 resolved 45 actual relative ES import references to existing local files. Referenced images existed; the tracked GLB contained no external buffer/image URI. This is a dependency-presence check, not a browser execution pass. Existing tracked Three.js files, model, styles, and media remain part of the baseline.

## Packaging: original finding and STEP 03B correction

[netlify.toml](../../../netlify.toml) originally published only `preview/v0304-p2-hero-cta` for Deploy Previews. The iframe URL `../p2-03b-playbook/` needed a sibling folder outside that published directory. The local parent-directory server could resolve it; the original static publish output could not include it.

No Netlify configuration was changed during STEP 02 reconstruction. In the separately approved [STEP 03B correction](FIX-10.md#step-03b--film-viewing-interval-and-preview-packaging), a build-time runtime allowlist now packages both canonical source folders under one ignored output root. Only the Deploy Preview command/publish setting changed; production configuration remains inherited. Local HTTP and packaged iframe interaction checks passed. Actual Netlify execution and deployment remain unverified and unapproved.

## Historical evidence and current limitations

[Hero QA](../../qa/hero/README.md), [hosted review](../../qa/hosted-hero-2026-10-15/README.md), [P2-02 QA](../../qa/p2-02-stabilization/README.md), and [P2-03B QA](../../qa/p2-03b-playbook/README.md) describe their original scopes. They do not certify the accumulated FIX candidate.

Some QA runners overwrite their own captures/results. The P2-03B runner serves only its original three files and assumes two static cases; current HTML additionally loads two scripts and supports animation/three cases. Several later scratch runners reference removed Film or Work selectors. Preserve them as history until deliberately updated.

The current source includes later changes to career camera stops and court geometry. Therefore the earlier Hero preservation results must not be generalized into “all geometry/camera data remain identical to P2-02.”

[weather.js](../../../preview/v0304-p2-hero-cta/weather.js) and [exterior-lighting.js](../../../preview/v0304-p2-hero-cta/exterior-lighting.js) retain the earlier weather/day-night system. Five interpolated time-of-day phases requested for FIX 13A were not found.

New demo slots intentionally have no approved recording. A null media slot is not a missing required file. The existing SungFlix recording is retained, but its current catalog eligibility does not establish it as user-provided sanitized footage.

## Preservation and publication plan

Preserve A/B together, retain C as historical design/provenance, and select D evidence with its original context. Review scripts for portability and overwrite behavior; review media for publication rights/privacy. Do not publish the external reference collage or its machine-specific extraction script as portfolio evidence.

Business metrics, technical ownership, and external link availability were not independently re-audited. See [evidence gaps](EVIDENCE-GAPS.md). There was no new browser test, installation, application edit, commit, push, merge, or deployment in this documentation task.

## Reconstruction validation

The journal adds 16 Markdown files. All 194 internal Markdown links resolve to existing files or headings; all 12 FIX entries contain the eight required sections. A targeted scan of the new documents found no machine-local absolute paths or common credential patterns. This is not a security audit of every linked artifact.

SHA-256 checks across all 316 pre-existing tracked/untracked files produced the same aggregate fingerprint before and after documentation. HEAD and local refs are unchanged; nothing is staged. The resulting status is 13 modified tracked files and 190 untracked files, including the 16 new journal documents. The original 13 modifications and 174 untracked files remain untouched.

[Journal index](INDEX.md)
