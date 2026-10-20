# FIX 11 — LAYRD flag and decorative packaging

Reconstructed on 2026-10-18; this is not an implementation date. See [index](INDEX.md) and [baseline](BASELINE.md).

**Status:** Explicitly requested; local implementation and screenshot evidence inspected. Historical interaction-test definitions exist, but a durable passing run log is unavailable. Uncommitted; not included in the PR baseline at `9b03cb1`. Deployment of these additions is not established.

## Problem

The user requested a restrained LAYRD brand Easter egg beside the existing exterior ticket booth: a burgundy/ivory banner, smaller branded packages, and a direct shop link. The request constrained the implementation to preserve the booth, entrance, walking path, camera stops, and existing atmosphere. The supplied composition was a visual guide, not permission to rebuild the arena.

## Evidence

Local QA evidence — retained privately; not included in the public repository. Filename-only references below identify historical captures or check definitions, not downloadable evidence or proof of current verification.

- [Scene module](../../../preview/v0304-p2-hero-cta/layrd-easter-egg.js), [accessible link styles](../../../preview/v0304-p2-hero-cta/layrd-easter-egg.css), and [exterior integration](../../../preview/v0304-p2-hero-cta/exterior.js).
- [Stored wordmark](../../../preview/v0304-p2-hero-cta/layrd-wordmark.jpg), whose source URL is recorded in the module comment.
- Exterior screenshot (`fix11-exterior.png`), mobile screenshot (`fix11-mobile.png`), and interaction-check definition (`fix11-check.cjs`).

The exterior screenshot was visually inspected during reconstruction and shows the banner and small box group beside the ticket booth. It is evidence of a rendered composition, not a comprehensive collision or accessibility audit.

## Alternatives

The user requested simple Three.js geometry, one interactive flag, and decorative boxes. Promotional dialogs, ticket scanning, heavy textures, and new confirmation flows were expressly excluded. No recorded comparison of multiple candidate implementations is available.

## Decision

Use a small isolated scene helper, canvas-backed branding, and ordinary box geometry. Retain an HTML link as a keyboard/touch fallback for the 3D flag target. The current code implements these choices consistently with the request; a separate contemporaneous rationale document is unavailable.

## Implementation

`createLayrdEasterEgg` builds a left-side banner using the existing pole/cloth dimensions and four packages: three grounded and one stacked. Comments specify approximately 65% of the reference's booth-relative packaging scale. This is a design estimate, not an independently measured reference comparison.

The locally stored wordmark paints the banner and selected package labels. No shop/CDN request is needed to draw the branding. Packages have no click handlers.

Raycasting limits flag clicks to a visible, unoccluded target. Pointer movement applies a small material highlight. Pointer movement and scroll thresholds guard against treating a drag as a click. The shop anchor uses a new tab with `noopener noreferrer`; it exposes focus styling and a touch-visible fallback. Visibility is tied to the exterior portion of the existing progress value. The module shares the existing render loop.

## Verification

Static inspection confirms the expected external URL, four package definitions, hover behavior, keyboard link, and exterior lifecycle hooks. The historical check script defines optional hover, mouse/new-tab, keyboard, navigation, and mobile assertions under `CHECK_LAYRD`. **Evidence unavailable** for a preserved execution log establishing that this optional branch ran successfully. No interaction check was rerun in reconstruction.

## Limitations

No isolated FIX 11 commit proves all unrelated geometry remained byte-identical at that moment. Full collision-free placement, every camera/viewport, and current external-site availability are **Not independently verified**. The wordmark is third-party branding used at the user's request; public-repository redistribution/provenance review remains necessary. No private shop or customer data is part of this journal.

The right-side `77 / HOME COURT` flag is a separate later request and is not part of this milestone's implementation claim.

## Lessons Learned

A small spatial link benefits from an ordinary accessible HTML alternative. Decorative objects and interactive targets should remain distinct, and a rendered screenshot should not be treated as proof of all interaction or geometry constraints.
