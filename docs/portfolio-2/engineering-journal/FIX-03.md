# FIX 03 — Add context to the Career Gallery

[Index](INDEX.md) · [Baseline](BASELINE.md)

Reconstructed on 2026-10-18. The task paired Career improvements with the scoreboard tribute; the latter is recorded under [FIX 02](FIX-02.md). Later FIX 06 work changed this gallery's typography and spatial presentation.

| State | Evidence status |
| --- | --- |
| Requested | Accessible task request calls for a scannable overview and expandable experience details. |
| Designed | Editorial list, progressive disclosure, existing arena entry and clear return control. |
| Implemented locally | Gallery module, styles and call sites are present. |
| Verified | Historical desktop overview and mobile detail captures exist; full interaction and factual review are **Not independently verified** here. |
| Committed | No FIX-specific commit; new gallery files remain untracked. |
| Included in PR | Not in the recorded PR baseline at `9b03cb1`. |
| Deployed | Evidence unavailable for the local gallery changes. |

## Problem

The existing Career panel was too condensed to explain professional scope, responsibilities, tools and contributions. The user requested more depth without turning the arena into a collection of dense resume cards or requiring visitors to leave the experience.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Gallery behavior and content](../../../preview/v0304-p2-hero-cta/career-gallery.js), [styles](../../../preview/v0304-p2-hero-cta/career-gallery.css), and [public career summaries](../../../preview/v0304-p2-hero-cta/career-data.js).
- [Arena call sites](../../../preview/v0304-p2-hero-cta/exterior.js).
- Historical desktop overview (`fix-03-career-desktop.png`) and mobile detail (`fix-03-career-mobile.png`), visually inspected during reconstruction. Publication review remains pending.

The historical overview says “What shaped my thinking.” and uses the earlier Operations Manager label. The current source uses “Where I've Worked.” and Senior Operations Manager. These differences are later revisions, not missing parts of FIX 03.

## Alternatives

The user proposed a vertical timeline or editorial list with progressive disclosure. No retained comparative prototype or record of a separately evaluated alternative was found.

## Decision

Reuse the existing Career dialog. Present a concise overview first, with one experience opened into readable responsibilities, contributions, tools, outcomes and related links. Keep reported results qualified rather than presenting them as independently audited measurements.

## Implementation

`createCareerGallery()` supplies overview/detail rendering, Back to all experiences, focus return and related case links. Current records include the two GPS Logix roles, Studio Sai and part-time LAYRD experience. Selected details can navigate to Playbook through the existing navigation function. The current module explicitly limits technical ownership and qualifies operational outcomes; this reconstruction does not independently authenticate those career facts.

## Verification

The desktop capture shows a four-entry overview inside the arena modal. The mobile capture shows the Database Manager detail with responsibilities and contributions at readable width. These are captured states, not proof of a complete keyboard/touch test. No dedicated persisted FIX 03 result file was found; no browser or resume verification was rerun for the journal.

## Limitations

The current gallery includes later FIX 06 typography and interaction refinements. Its exact original implementation cannot be isolated from Git history. Source comments cite a representative resume and existing case studies, but private source documents are deliberately not reproduced here. External case links and factual claims require their own validation before publication.

## Lessons Learned

Progressive disclosure can increase professional detail while keeping the first view scannable. Career content needs separate controls for visual quality, source provenance and ownership wording; a polished gallery is not evidence that an outcome was independently measured.
