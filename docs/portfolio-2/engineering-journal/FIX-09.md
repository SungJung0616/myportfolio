# FIX 09 — Shared project evidence, media readiness, and evolution

Reconstructed on 2026-10-18; this is not an implementation date. See [index](INDEX.md) and [baseline](BASELINE.md).

**Status:** Requested and designed in the available Codex thread; implementation present locally. Historical screenshots reviewed during reconstruction; interaction results are not independently verified. These local additions are uncommitted and absent from the PR baseline at `9b03cb1`. Deployment of this local state is not established.

## Problem

Film Lab and the editorial Work section needed a consistent account of what each project actually implemented, what evidence existed, and what remained planned. The FIX 09B addendum requested optional authentic recordings, static fallbacks, and a project-evolution narrative. It specifically connected the standalone Weather App to the portfolio weather feature without assuming shared code.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Shared catalog](../../../preview/v0304-p2-hero-cta/project-catalog.js), [media policy](../../../preview/v0304-p2-hero-cta/project-media.js), and [Work presentation](../../../preview/v0304-p2-hero-cta/project-showcase.js).
- [Screenshot provenance](../../../preview/v0304-p2-hero-cta/project-images/README.md).
- Historical Work capture (`fix09b-work-desktop.png`), Weather Journey capture (`fix09b-weather-journey.png`), and readiness check definition (`fix09b-readiness-check.cjs`).

These are current files or historical artifacts, not versioned FIX-specific snapshots. The historical Work capture shows an earlier presentation that was subsequently changed.

## Alternatives

The user explicitly allowed real video or static imagery and asked to avoid two unrelated featured Weather cards when an evolution story was clearer. Evidence of other evaluated alternatives is unavailable. No generated demonstration footage was authorized.

## Decision

Use one catalog and shared project IDs for spatial and editorial views. Represent implementation scope, evidence, limitations, and planned work separately. Preserve a useful static experience while reviewed recordings are unavailable. This rationale follows the request and current code; no separate historical decision record survives.

## Implementation

The catalog provides `demoVideo`, `posterImage`, `demoCaption`, `demoDuration`, `evidenceStatus`, and optional `projectJourney`. Film data re-exports the same records. Selection is shared through `portfolio:project-selected`.

The media helper permits video only for `sanitized-user-recording` evidence and local preview asset URLs. Playback is muted, deliberate, and limited to an active visible preview; navigation and document hiding pause it. Missing videos do not create broken players.

Five explicit demo candidates cover QR Helper, Sheets Automation, Label Helper, Return Scan, and Weather integration. Their empty recording slots are intentional. The Weather journey distinguishes separate OpenWeather/React and Open-Meteo/Three.js implementations, user-described learning, and planned recording evidence. It does not claim code migration.

Authentic project screenshots, including the memorial landing page and local portfolio Hero, were added in later unnumbered follow-ups. They are current supporting evidence, not proof of the original FIX 09 state.

## Verification

Static inspection confirms the catalog fields, playback gate, and fallback branches. The inspected Work screenshot visibly identifies a text-led project brief rather than a product screenshot. Historical scripts define navigation, media-readiness, and responsive assertions, but their existence is not a passing result. Several selectors predate the later Work accordion. Current end-to-end execution: **Not independently verified**.

## Limitations

Business outcomes, individual ownership, operational/public-version equivalence, and live API availability have not been revalidated by this journal. Screenshots demonstrate visible UI only. Review asset provenance and public-page imagery before publication; no private operational demonstrations should be introduced. Original FIX 09/09B boundaries cannot be reconstructed exactly from the mixed working tree.

## Lessons Learned

Media readiness and project completion are different states. A shared catalog can preserve that distinction across multiple interfaces. A learning progression can be documented honestly without claiming shared architecture or production deployment.
