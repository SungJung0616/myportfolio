# Team identity and arena clock hotfix

## Scope and baseline

Prepared on 2026-11-10 from production commit `e4bc7c3dd521aea100db55c6a62b67b511ef71b0`, separately from the unfinished performance review in PR #4. No career copy, camera paths, statistics, Notion records, or V1 archive configuration are changed.

## Confirmed problem

The public API supplied both Atlanta's correct name and its NBA team ID. The client preferred the ID but its registry covered only eight teams. The unknown-ID fallback used that number as the visible team name. Atlanta and Detroit were missing; this was not a Notion data error.

## Correction

- Cover all 30 current teams by ID, name, abbreviation and existing aliases.
- Keep a provider-supplied name as fallback. Never present an unknown numeric ID as a team name.
- Share local team assets between the HTML Game Center and the Jumbotron canvas. Cache image promises per team, repaint after loading, and preserve abbreviation badges when loading fails.
- Move the existing left-wall clock from `z=-39` to `z=-33`: one six-unit column bay toward the entrance, screen-left from the court reveal. Radius, height, material, time zone and minute-level update cadence remain unchanged.

## Asset provenance and publication boundary

The official [NBA team directory](https://www.nba.com/teams) linked all 30 source SVGs on the inspection date. The owner reported receiving NBA permission and explicitly requested website use. The actual permission email was not independently verified during this work; this record is not a legal conclusion or a claim of unrestricted licensing.

Public GitHub redistribution is not assumed. Original SVGs are excluded from Git and saved in `.netlify/nba-team-assets/`; deployment packaging copies them into `team-logos/`. Only source URLs and reviewed SHA-256 digests are versioned in [the build manifest](../../../tools/nba-team-logo-manifest.cjs). No private correspondence is published.

The build fetches missing originals from the official CDN without credentials or a paid API. It rejects a changed hash rather than silently deploying a different asset. A clean build therefore needs CDN access; cached local builds do not. A CDN change or outage may block a future build while the existing deployment stays available.

## Verification performed before commit

- 105 team identity, original-asset integrity, image cache and failure-fallback checks.
- 13 spatial checks, including the clock's single-bay move and unchanged radius/height.
- 68 release-candidate, 33 content, 35 Game Center, 7 ingestion, 13 Jumbotron geometry and 30 tour checks: 304 checks total.
- Preview and production packages built with the approved resume candidate; all 30 logo originals passed pinned SHA-256 checks.
- Local Chrome rendered the latest Atlanta result with the correct name and both official logos in the HTML panel and Jumbotron. History logos loaded, Playbook opened, and reduced-motion tour next/previous/exit controls worked.
- The local in-app browser rendered the clock in its new left-wall bay at the Court reveal viewpoint; its face remained visible above the left seating. Chrome screenshot capture was unreliable in this session, so that separate visual check used the in-app browser.

Hosted and production results must be verified separately after deployment; local checks are not proof of hosted success. Physical-device, screen-reader, FPS and GPU measurements were not performed for this focused hotfix.
