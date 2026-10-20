# P2 Milestones Before the FIX Series

Reconstructed on 2026-10-18 from Git, repository records, current source, and accessible Codex requests. Dates below are used only where the original Git or document supplies them. Individual P2-03 implementation dates are not inferred from filenames.

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

## Hero foundation

Git commit [ea64c0f](https://github.com/SungJung0616/myportfolio/commit/ea64c0fff2a3dc868f88bf97793dfb782d4c6c7c), dated 2026-10-15, adds the isolated static Hero candidate, required assets, design documents, and QA. [Hero evidence](../../qa/hero/README.md) records the narrative/CTA candidate and historical before/after scope.

The [hosted review](../../qa/hosted-hero-2026-10-15/README.md) identifies this revision and records desktop/tablet/mobile rendering, CTA/destination checks, and a Netlify Drawer/CSP conflict. Its [results](../../qa/hosted-hero-2026-10-15/results.json) are historical observations. The hosted URL can change; rerunning the script does not reproduce this revision automatically.

## P2-02 — Hero stabilization

**Problem:** the hosted review reported a tablet gap between copy and arena, mixed-language chrome, and the optional review toolbar conflicting with CSP.

**Evidence:** [local QA and decision record](../../qa/p2-02-stabilization/README.md), [recorded results](../../qa/p2-02-stabilization/results.json), and commit [9b03cb1](https://github.com/SungJung0616/myportfolio/commit/9b03cb171c97f2024ed03d9cf505cf5182e2db99), dated 2026-10-15.

**Documented alternatives and decision:** compare 13px and 14px mobile CTA text; the record retains 13px because the secondary 14px button wrapped and lost the equal-height composition. Adjust tablet CSS rather than the camera. Prefer disabling the optional Preview Drawer through its supported setting rather than broadly weakening CSP.

**Implementation:** the commit changes Hero CSS and surrounding English UI labels, with QA artifacts. The record explicitly leaves permanent Drawer removal pending; do not upgrade that recommendation into an implemented fix.

**Verification:** the stored report states all three viewport checks passed for CTA/navigation/focus/reduced-motion/overflow, with no unexpected local JS/HTTP/CSP errors. Weather was deliberately aborted. These are recorded historical results, not tests rerun for this journal or for later FIX work.

**Delivery:** committed and included in the inspected Draft PR. The earlier report's “no commit/push” statement describes its writing time and is superseded for Git status by the commit. The exact post-push hosted result and final Drawer setting are **Not independently verified** here.

**Lesson:** UI layout evidence, Git publication, and hosting-service behavior need separate status records.

## P2-03A through P2-03F

| Identifier | Evidence-backed scope | Status and limits |
| --- | --- | --- |
| A | Six [planning documents](../IMPLEMENTATION_ROADMAP.md), including [claims](../CLAIMS_AND_EVIDENCE.md), [content](../PLAYBOOK_CONTENT_BLUEPRINT.md), [interaction](../PLAYBOOK_INTERACTION_SPEC.md), [storyboard](../TACTICS_BOARD_STORYBOARD.md), and [catalog draft](../PROJECT_CATALOG_DRAFT.md) | Design/documentation exists locally. No implementation follows merely from the plans. |
| B | [Static QA record](../../qa/p2-03b-playbook/README.md) and [results](../../qa/p2-03b-playbook/results.json) for Label/QR, three stages, three viewports | Historical 18-scene results recorded. The original static source is no longer independently snapshotted; the same directory now contains later work. |
| C | [interaction.js](../../../preview/p2-03b-playbook/interaction.js) and desktop (`p2-03c-desktop.png`)/mobile (`p2-03c-mobile.png`) captures | Current source supports manual substeps, moving markers/ball, route drawing, validation stops, and reduced motion. Separate persisted execution result for C: **Evidence unavailable**. |
| D | [Coupang data](../../../preview/p2-03b-playbook/coupang.js), current numbering/route logic in interaction.js, desktop (`p2-03d-desktop.png`)/mobile (`p2-03d-mobile.png`) captures | Accessible requests changed the scope to three cases and then chronological numbering. Current source reflects that direction; exact pre/post-D boundaries are not recoverable from Git. |
| E | [prototype.css](../../../preview/p2-03b-playbook/prototype.css), current story-stage/action controls, desktop (`p2-03e-desktop.png`)/mobile (`p2-03e-mobile.png`) captures | Editorial emphasis and separate “Previous/Next Stage” versus “Follow the Play” actions exist locally. Dynamic behavior is **Not independently verified** in this reconstruction. |
| F | [iframe adapter](../../../preview/v0304-p2-hero-cta/interactive-playbook.js) and mobile capture (`p2-03f-mobile.png`) | Integration is present in accumulated source. The subsequent FIX 01 request reports that the old panel still intercepted entry; integration existence alone was insufficient proof of successful navigation. |

P2-03A–F changes are uncommitted and absent from the inspected PR head. Deployment of this accumulated implementation is not established.

## Naming and evidence caveats

The original roadmap proposed C as interaction plus integration, D as Work entries, and E as integration QA. Later requests used C for a lean standalone animation, D for three-case/numbering work, E for UX polish, and F for integration. Both records are preserved; neither is silently renamed to match the other.

The current source contains successive render wrappers and later overrides. A string in an earlier wrapper does not necessarily describe the final UI. Source review must follow execution order, and current code cannot assign each line to an exact historical request.

The static B runner is not a current regression suite: its file allowlist omits later scripts and its zero-animation assertion conflicts with the later design. Screenshot filenames associate artifacts with requests but do not prove test outcomes or exact development dates.

The retained principle is evidence-first explanation: synthetic workflow illustrations, human review, dry-run, and ambiguity stops are distinct from live business operations. No new business outcome is inferred from the animations.

[Journal index](INDEX.md) · [Current baseline](BASELINE.md)
