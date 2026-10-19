# FIX 01 — Connect the interactive Playbook entry

[Index](INDEX.md) · [Baseline](BASELINE.md)

Reconstructed on 2026-10-18. This is an evidence review date, not an implementation date. FIX 01 follows the P2-03F integration request; it is not another name for P2-03F.

| State | Evidence status |
| --- | --- |
| Requested | The accessible task conversation reports the old Korean automation panel opening from Playbook. |
| Designed | Reuse the three-case prototype and existing camera destination. |
| Implemented locally | Current entry adapter and its callers are present. |
| Verified | A historical embedded mobile frame exists; end-to-end entry, switching and return are **Not independently verified** in this reconstruction. |
| Committed | No FIX-specific commit; adapter files are untracked and callers have accumulated edits. |
| Included in PR | Not in the recorded PR baseline at `9b03cb1`. |
| Deployed | Deployment evidence for this local integration is unavailable. |

## Problem

Creating the new prototype did not by itself replace the live arena entry. The user reported that selecting Playbook still opened the earlier automation explanation. The requested repair was to trace the actual handler, preserve camera travel, and open the existing three-project experience.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Entry adapter](../../../preview/v0304-p2-hero-cta/interactive-playbook.js) and [scoped dialog styles](../../../preview/v0304-p2-hero-cta/interactive-playbook.css).
- [Navigation event dispatch](../../../preview/v0304-p2-hero-cta/navigation.js) and [physical board integration](../../../preview/v0304-p2-hero-cta/project-space.js).
- [Three-case entry document](../../../preview/p2-03b-playbook/index.html) and [interaction implementation](../../../preview/p2-03b-playbook/interaction.js).
- Historical P2-03F mobile capture (`p2-03f-mobile.png`), visually inspected during reconstruction. It shows the embedded panel, three case buttons, and Back to Arena. It is not a FIX 01 execution log. Publication review remains pending.

## Alternatives

The request explicitly chose reuse of P2-03E/P2-03F over rebuilding the Playbook. No record of an evaluated alternative implementation was found. The earlier planning [integration notes](../IMPLEMENTATION_ROADMAP.md) identified the old board/score handlers and dialog-open contract as conflicts to resolve.

## Decision

Use a narrow adapter between existing arena navigation and the independent HTML/SVG prototype. Keep the same modal-open contract used to pause camera progression while reading.

## Implementation

`createInteractivePlaybook()` creates a dialog, loads the sibling prototype lazily, and replaces the old project-control buttons with one launcher. A `portfolio:navigate` event for Playbook waits for camera progress near `.83` before opening. Other navigation cancels the pending arrival callback. The board's hit handler calls the same opener. Close restores focus; same-origin messages pause the embedded animation or request closure.

## Verification

Static inspection confirms the entry routes share the new opener and that the existing prototype supplies three cases. The historical screenshot confirms a rendered embedded state. No dedicated persisted FIX 01 pass/fail result was found; browser behavior was not rerun for this documentation task.

## Limitations

The exact FIX 01 patch cannot be separated from later changes using Git history. Hosting the Hero directory alone excludes the sibling iframe target; see [Baseline](BASELINE.md). A screenshot cannot prove the triggering click or restored camera state.

## Lessons Learned

Integration must be traced from the user action through the caller, destination event, and displayed content. An existing prototype and a successful isolated render do not establish that the production-facing entry point reaches it.
