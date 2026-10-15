# Hero CTA evidence

Historical before/after Chrome captures at 1440×960 and 390×960 are included alongside results.json. These are actual renders, not generated concept images. The results compare the preserved pre-CTA candidate with the CTA candidate; they are not newly measured deployment results.

Runtime: preview/v0304-p2-hero-cta. Only hero.js/css changed in that historical comparison. Camera function and other runtime assets were preserved. The full historical baseline is intentionally not duplicated in this public preparation.

Portable smoke test:

```sh
cd tools/preview-qa
npm install
npx playwright install chromium
npm test
```

Optionally set PLAYWRIGHT_CHANNEL=chrome for an installed Chrome. No machine-specific dependency path is stored in the test. Weather requests are blocked to test deterministic fallback, not live API success. Touch is emulated, not physical-device verification.

The minimal review.html is a packaging-only replacement for a stale review page whose historical media were excluded. Scene files and character/film assets are unchanged.
