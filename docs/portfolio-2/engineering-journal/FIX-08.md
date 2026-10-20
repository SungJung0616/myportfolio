# FIX 08 — The Periodic Table of My Stack

Reconstructed on 2026-10-18. FIX 08 introduced the section; FIX 08A and FIX 08B refined its composition and selection model. Later scroll-boundary changes must not be attributed to these earlier requests.

[Index](INDEX.md) · [Baseline](BASELINE.md)

| State | Evidence status |
| --- | --- |
| Requested | Periodic-table concept, integrated details, then twelve-element typography/layout refinement. |
| Designed | Muted categories, editorial type, and evidence-qualified technology context are documented in accessible requests. |
| Implemented locally | Data, renderer, styles, and existing Stack integration are present. |
| Verified | Historical responsive captures exist; complete interaction/accessibility behavior is **Not independently verified** here. |
| Committed | Not in audited HEAD `9b03cb1`. |
| Included in PR | Not in the audited PR snapshot. |
| Deployed | Deployment of this local implementation is not established. |

## Problem

The Stack section needed to explain why tools were used rather than present a generic logo grid. Subsequent feedback identified disconnected empty space, small supporting labels, and a detail interaction that should remain integrated with the table. FIX 08B explicitly reduced the display to twelve technologies by removing standalone HTML and CSS tiles.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Technology records](../../../preview/v0304-p2-hero-cta/stack-data.js), [section renderer](../../../preview/v0304-p2-hero-cta/stack-table.js), [responsive styles](../../../preview/v0304-p2-hero-cta/stack-table.css), and [existing navigation integration](../../../preview/v0304-p2-hero-cta/navigation.js).
- Captures: initial desktop (`fix08-stack-desktop.png`), 08A desktop (`fix08a-stack-desktop.png`), 08B desktop (`fix08b-stack-desktop.png`), and 08B mobile (`fix08b-stack-mobile.png`). These are historical artifacts pending publication review.

## Alternatives

The initial request allowed either a detail panel or an adjacent editorial area. FIX 08A explicitly chose an integrated central area and rejected ordinary-selection modals. FIX 08B mentioned alternative fonts only if needed; the current implementation keeps existing system/Georgia fonts. Evidence of font trials is unavailable.

## Decision

Use intentional tile groups surrounding one reusable detail region. Separate category, technology name, and documented experience context. Treat element numbers as organizational labels, not proficiency scores. Keep unsupported ownership, years, and skill percentages out of the model.

## Implementation

Twelve records cover programming, frontend, automation, testing, data/systems, and workflow tools. Each can supply usage, related experience, scope limitations, links, and an outcome when documented. Current records explicitly distinguish professional, project, AI-assisted, learning-project, and basic-knowledge contexts. They retain boundaries around employer platform ownership and historical reported outcomes; those claims were not independently re-audited for this journal.

The desktop CSS uses a seven-column composition with tile pairs flanking the central detail region. Tablet/mobile layouts place details below the tiles. Selection updates the existing region, `aria-pressed`, and a polite announcement while retaining focus and page position. Muted category colors, visible focus treatment, and reduced-motion rules are scoped to Stack.

The current detail area's `overscroll-behavior-y:auto` is a later Film Lab/native-scroll continuity change, associated with FIX 12, not evidence of the original FIX 08 implementation.

## Verification

The 08B desktop capture was inspected: it shows the twelve-tile arrangement, JavaScript selection, central explanation, and visible focus outline. Responsive capture files exist, but screenshots alone do not prove keyboard sequencing, touch behavior, scroll preservation, overflow across all widths, or external-link availability. No dedicated execution-result record for FIX 08A/08B was located; these behaviors are **Not independently verified**.

## Limitations

The three versions share current files and no independent Git checkpoints. Exact before/after code for each subfix cannot be reconstructed reliably. The source preserves claim qualifiers, but publication still requires owner review of career/project descriptions and evidence references.

## Lessons Learned

A visual metaphor works best when selection reveals useful context without moving the visitor elsewhere. Retain both experience qualifiers and provenance: a tool's presence does not establish proficiency, and a historical result belongs to its documented workflow rather than every project using that tool.
