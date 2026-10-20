# Portfolio 2.0 Engineering Journal

Reconstructed on 2026-10-18. This is the date of documentation, not an inferred implementation date.

FIX 01–12 and the baseline document retain the original reconstruction snapshot at `9b03cb1`. The accumulated implementation was subsequently preserved in baseline commit `2fd0304713afba495488b44df646daaccff032c4`. The new [FIX 13A entry](FIX-13A.md) records local work after that baseline; it is not part of that commit. This documentation update does not independently recheck PR or deployment status.

This journal records the evolution of the isolated Portfolio 2.0 preview from repository evidence. It does not reconstruct missing commits or certify every historical FIX as complete. Read the [baseline](BASELINE.md), [P2 milestone history](P2-HISTORY.md), and [evidence gaps](EVIDENCE-GAPS.md) before interpreting individual entries.

## How to read status

- **Requested:** a requirement appears in an accessible Codex task or repository plan.
- **Designed:** a documented specification or explicit design choice exists.
- **Implemented locally:** the current working source contains the described behavior. This is a source inspection, not a browser pass.
- **Verified:** an entry identifies the scope and source of an actual recorded check. A test script alone proves only that a check was authored.
- **Committed:** the change exists in an identifiable Git commit.
- **Included in PR:** the identified commit is part of the inspected PR head.
- **Deployed:** a deployment observation supports that exact revision. A push or a PR does not prove deployment.

Screenshots establish captured appearance, not interaction correctness, privacy approval, or a complete regression pass. “Not independently verified” means the journal did not reproduce the claim. “Evidence unavailable” means a supporting result or record was not found.

## Evidence boundaries

Sources are existing repository files, Git history, stored QA artifacts, and requests visible in this Codex conversation. No unavailable ChatGPT conversation was consulted. Conversation requests explain intent; they are not execution logs. Inherited assistant continuity summaries are secondary leads, not corroborated test results. Implementation descriptions refer to the accumulated working tree unless a commit is named.

Artifact links are repository-relative and are not embedded. Local QA media are preservation candidates, subject to [publication review](EVIDENCE-GAPS.md#publication-review). No external reference collage or private source recording is included.

## Milestone overview

| Milestone | Evidence-backed state | Verification and delivery boundary |
| --- | --- | --- |
| Hero foundation | Commit `ea64c0f`; see [P2 history](P2-HISTORY.md) | Historical Hero QA and hosted review exist; included in Draft PR #1. |
| P2-02 | Commit `9b03cb1`; see [P2 history](P2-HISTORY.md#p2-02--hero-stabilization) | Historical local QA recorded; included in PR. Exact post-push deployment and Drawer resolution not established here. |
| P2-03A | Six design documents; [P2 history](P2-HISTORY.md#p2-03a-through-p2-03f) | Design record exists locally, uncommitted. |
| P2-03B | Static prototype evidence; [P2 history](P2-HISTORY.md#p2-03a-through-p2-03f) | Stored 18-scene QA concerns the former two-case static prototype, not today's runtime. |
| P2-03C / D / E / F | Current animation, sequence, controls, and integration code; [P2 history](P2-HISTORY.md#p2-03a-through-p2-03f) | Individual boundaries are not isolated in Git; current behavior is not newly tested. |
| [FIX 01](FIX-01.md) | Interactive Playbook entry | Current adapter exists; no isolated FIX commit. |
| [FIX 02](FIX-02.md) | Physical HOME/AWAY scoreboard and requested tribute values | Current code and captures; later styling overlaps FIX 07. |
| [FIX 03](FIX-03.md) | Career detail structure | Initial gallery evidence; later editorial work overlaps FIX 06. |
| [FIX 04](FIX-04.md) | Film/editorial boundary, visibility, and rendering changes | Multiple 04 subrequests share accumulated code; no per-subfix pass or performance benchmark established. |
| [FIX 05](FIX-05.md) | Welcome performance and interaction refinements | Rig/intro code and captures; silent mouth motion is not phoneme-accurate lip sync. |
| [FIX 06](FIX-06.md) | Editorial Career Gallery and frame-focused navigation | Source and historical captures; exact substep deltas unavailable. |
| [FIX 07](FIX-07.md) | Court geometry, scoreboard presentation, and interaction cleanup | Current geometry and captures; no claim of independently certified court compliance. |
| [FIX 08](FIX-08.md) | Periodic Table of My Stack | Current modules and responsive captures; later Work relationships share catalog state. |
| [FIX 09](FIX-09.md) | Shared project catalog, media eligibility, and project journeys | Source and QA artifacts; business claims retain their original evidence limits. |
| [FIX 10](FIX-10.md) | Film/Work selection and control-state iterations | Earlier wall selector was superseded by a console/paged picker; not all historical scripts remain runnable. |
| [FIX 11](FIX-11.md) | LAYRD flag, decorative boxes, and external-link interaction | Source and captures; public media/branding review remains separate. |
| [FIX 12](FIX-12.md) | Film glass entrance and reverse-scroll work | Current door/scroll implementation; later entrance plaque is an unnumbered follow-up. |
| [STEP 03B](FIX-10.md#step-03b--film-viewing-interval-and-preview-packaging) | Film viewing interval and isolated Deploy Preview packaging | New focused local wheel/selection and packaged iframe checks passed; not committed or deployed. Does not retroactively certify historical FIX tests. |
| [FIX 13A](FIX-13A.md) | Five clock-based, interpolated environment phases and the FIX 13A.1 visual refinement after `2fd0304` | Focused local browser, in-memory logic, and packaging checks recorded in the entry. Approved for one independent delivery commit; Git/PR history establishes inclusion, not deployment. |
| [FIX 13B.1](FIX-13B.1.md) | Weather-aware lighting, followed by user-authorized outdoor rain/snow, tree wind, and fog effects in the existing controller after `4b7031f` | Initial scope: 218 checks recorded. Extension: 251 integrated checks covering 20 lighting combinations, 28 helper checks, browser regression/7-view visual review, and 66-file packaging check passed. Current visuals approved for finalization. FPS/frame times/GPU memory NOT VERIFIED. Publication state must be established from Git and deployment checks; hosted verification was pending when this entry was prepared. |
| [FIX 13C](FIX-13C.md) | Visitor-facing Arena Atmosphere popover using independent time/weather overrides in the existing controller after `a9fb68f` | Locally verified; 187 resolution/effect checks, 39 controller scenarios, scene buttons, keyboard/mobile/Reduce Motion checks, and Film/Work wheel regression passed. Approved for one delivery commit; Git/PR/deployment checks establish publication state. Physical-device/screen-reader/FPS/GPU tests NOT VERIFIED. |

At the original reconstruction snapshot, all FIX 01–12 entries described local changes beyond `9b03cb1`: they were **not committed and not included in the then-inspected PR head**, and deployment was not established. Those historical statements are not a claim about today's delivery state. The later baseline commit preserves the accumulated work without inventing separate FIX-by-FIX commits; FIX 13A is a separate development milestone.

## Historical naming

P2-03 letters and later FIX numbers are different workstreams, not equivalent version numbers. The original [P2-03 roadmap](../IMPLEMENTATION_ROADMAP.md) calls D “Work” and E “integration QA”; later accessible requests use D for three-case/sequence work and E for prototype UX. F is absent from that original table. Preserve those plans as dated evidence rather than silently correcting their past wording.

## Next use

### RC1 supplement

[RC1 — Content clarity and production readiness](RC1-CONTENT-AND-RELEASE.md), recorded
2026-10-20, documents the locally implemented content and isolated production
packaging after `30805a8`. It preserves the historical entries above. Local checks
are not automation-tool certification, PR inclusion, or a hosted V2 deployment.

The approved accumulated baseline is now identifiable as `2fd0304`. Keep future entries small: problem, decision, changed paths, verification result, limitations, and exact commit/PR/deployment references when independently checked. Do not convert the reconstructed entries into invented historical commits.
