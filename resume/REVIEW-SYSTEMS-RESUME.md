# Business systems resume review

`systems-resume-content.json` is the authoritative content source for the new
review-only `Sung_Jung_Business_Systems_Resume.docx` and matching PDF.
Run `tools/build_systems_resume.py` with the configured document runtime.
The older files and build scripts remain historical and are not overwritten.

The public `public/resume/Sung_Jung_Resume.pdf` remains unchanged. To inspect the
new PDF at the normal download path in a local package only, explicitly run:

```text
node tools/package-portfolio-preview.cjs --resume-candidate
node tools/package-portfolio-preview.cjs --production --resume-candidate
```

Normal builds continue to package the currently approved public PDF. Promoting
the new resume into the canonical public path requires separate approval.

## Evidence boundaries

- Senior Operations Manager is owner-confirmed; no promotion date is inferred.
- Approximately 10,000 orders/day is warehouse-wide volume, not tool capacity.
- 180-200 to about 150 minutes is an operational estimate for broader daily
  documentation and label printing, not a single-tool benchmark.
- The separate 50 to 20-30 minute observation is not published as a tool result;
  its exact preparation/reporting scope still needs clarification.
- The 8-to-4-hour result describes a particular recurring regression workflow
  using developer-provided save states/checkpoints. Identical overall coverage
  is not asserted.
- Existing employers, dates, locations, degree and credentials are retained.

DOCX visual rendering requires a working document renderer. Structural/text
validation does not establish Word pagination or visual fidelity.

## Focused polish and regression follow-up

The resume now integrates warehouse scale into the role description, uses
natural qualifications for estimated savings, and limits the 8-to-4-hour
result to a recurring regression workflow. Customer-led Workpad development
remains distinct from operational requirements and residual transfer work.
LAYRD wording is now “Co-own and help operate.” Project titles are hyperlinks;
there are no separate “Project” labels that can become orphaned.

### Claims review

- Gmail/Apps Script summaries: supported by the earlier resume and its builder,
  but no executable summary implementation or run log was found in this
  portfolio repository. Retained as recorded career experience, without adding
  technical architecture, adoption or efficiency claims.
- Returns: the catalog records a React/Vite/ZXing intake prototype and a staged
  confirmation flow. The older resume describes tracking/lot-to-SKU/expiration
  population, but equivalence to that prototype is not established. The revised
  bullet uses scanner-assisted intake and item review; it does not claim verified
  warehouse adoption, successful end-to-end submission or automatic enrichment.
- Unity Test Framework: supported by the existing Eternights case study and
  career record; no employer test source or execution log is available here.
  Wording remains use of existing features, not framework or CI ownership.
- React is used by the portfolio source and documented projects. Node.js is
  retained at project-experience level from existing project records, not as
  production backend ownership. AWS setup/deployment is supported by the memorial
  case study, with AI-assisted delivery disclosed. Selenium is documented as a
  separate project, not proof of the historical Python/openpyxl workflow.
- PostgreSQL appears in the previous resume, but specific implementation evidence
  was not established in this pass. Omitted from the candidate skills pending
  confirmation; SQL remains basic knowledge.
- Employers, employment dates, locations, education and certification names match
  the prior resume, except the explicitly owner-confirmed Senior Operations
  Manager title. Diplomas, certificates and employer records were not inspected.
- QR Helper and the memorial remain selected projects: the former demonstrates
  operational controls; the latter requirements, access decisions and delivery.
  Packing Cover, Coupang and Eternights are already represented in experience.

### Updated verification

- PDF: two pages rendered and visually inspected; no clipping/overlap or orphaned
  labels observed. All role bullets extract cleanly; five hyperlink annotations
  use the expected targets. DOCX has no tables and uses the same content source.
- DOCX rendering attempted again: unavailable because bundled LibreOffice is
  absent. Word pagination and visual fidelity remain NOT VERIFIED.
- Intro started locally; Replay returned to caption 1/3. Keyboard Skip hid the
  intro and restored focus to Replay. Forward/reverse wheel moved between the
  entrance and approach (403 to 1123 and back) with Reduce Motion enabled;
  ordinary wheel movement was also exercised. No persistent lock observed in
  these focused checks. This is not a complete camera-route regression suite.
- Keyboard Work and Contact navigation placed focus on their section containers.
  The Contact resume link points to the local PDF in a new tab. HTTP returned 200
  and packaged bytes match the candidate PDF. A saved browser-download event was
  not independently confirmed.
- Portfolio, GitHub profile, QR repository and memorial returned HTTP 200.
  LinkedIn rejected HEAD with 405; external LinkedIn reachability remains
  NOT VERIFIED. Hyperlink encoding itself is correct.
- 68 release and 28 content checks passed again, as did preview/production
  package simulations and whitespace checks. Existing module-type and line-ending
  warnings remain. Poppler emitted fallback-font warnings; both rendered pages
  were legible with no missing glyphs observed.
- No physical-device, screen-reader, FPS or GPU claim. Public resume, V1 archive,
  production and Netlify settings remain untouched.

This follow-up changes only the content JSON, resume builder, the two candidate
resume outputs and this review note. Existing Playbook files are preserved.

## Local verification and approval boundary

- Existing 68 release checks and 28 content checks passed; JavaScript syntax and
  `git diff --check` passed. Node reports the existing mixed-module-type warning.
- Preview and production simulations packaged the required runtime files.
  Preview noindex and production indexing/metadata were checked in generated
  files, not on a hosted deployment.
- Desktop/mobile Hero layout, Work details, Playbook stages/actions and QR
  ambiguity handling, Film Lab/Work selection restoration, Stack selection,
  and Career Walk details were exercised locally. No application errors were
  captured in the final browser session.
- PDF: two pages rendered and inspected; selectable text, logical extraction,
  content consistency and link annotations checked. Candidate package PDF is
  byte-identical to the review PDF.
- DOCX: structural/content checks passed; visual pagination NOT VERIFIED
  because LibreOffice/Word rendering is unavailable in this environment.
- Fresh Intro/Skip, comprehensive wheel/reduced-motion regression, physical
  devices, screen readers, FPS/GPU and hosted behavior are NOT VERIFIED in this
  content pass. Prior results are not substituted for new verification.
- Existing 130 excluded files were compared by SHA-256: unchanged. No staging,
  commit, push, production deployment, V1 or Netlify settings change performed.

## Exact changed-file inventory

Includes four pre-existing Playbook reorder edits preserved and extended.
Repository-relative paths below identify 15 modified tracked files and six new
files; generated packages and local screenshots are ignored and not included.

```text
preview/p2-03b-playbook/coupang.js
preview/p2-03b-playbook/index.html
preview/p2-03b-playbook/interaction.js
preview/p2-03b-playbook/prototype.js
preview/v0304-p2-hero-cta/career-data.js
preview/v0304-p2-hero-cta/career-gallery.js
preview/v0304-p2-hero-cta/hero.js
preview/v0304-p2-hero-cta/interactive-playbook.js
preview/v0304-p2-hero-cta/navigation.js
preview/v0304-p2-hero-cta/project-catalog.js
preview/v0304-p2-hero-cta/project-showcase.js
preview/v0304-p2-hero-cta/stack-data.js
preview/v0304-p2-hero-cta/stack-table.js
tools/check-release-candidate.cjs
tools/package-portfolio-preview.cjs
resume/REVIEW-SYSTEMS-RESUME.md
resume/systems-resume-content.json
resume/Sung_Jung_Business_Systems_Resume.docx
resume/Sung_Jung_Business_Systems_Resume.pdf
tools/build_systems_resume.py
tools/check_content_revision.cjs
```
