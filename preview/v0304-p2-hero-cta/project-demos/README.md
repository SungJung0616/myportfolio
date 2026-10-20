# Automation recordings — local publication review

These are approved edited excerpts of owner-supplied recordings, not fabricated UI
footage. The RC1 request on 2026-10-20 explicitly preserves the approved video files
and masking. Runtime eligibility is `sanitized-user-recording`. This approval covers
these edited copies only, not private originals or unmasked information. No
deployment or independent privacy certification is implied.

| Asset | Source interval | Runtime |
| --- | --- | --- |
| `packing-review.webm` | Packing recording, 00:04–00:14 | 10 seconds |
| `qr-review.webm` | QR recording, 00:12–00:30 | 18 seconds |

Both are silent 1280 × 720, 15 fps VP8 WebM files. Matching JPG posters are
derived from the redacted output. Edits preserve source speed within each excerpt.
Opaque masks are baked into frames; there is no original audio track.

## Privacy treatment

- Packing: retain only the worksheet, excluding browser chrome, operations lists,
  desktop and personal messenger. Mask identities, dates, batch IDs, SKU values,
  quantities, tracking suffixes and the QR itself. Also mask the adjacent strip
  during SKU-cell editing because text can overflow the cell.
- QR: retain only selection indicators and the helper. Exclude operational row
  contents, customer names and dashboard. Mask entered identifiers, status values
  and activity history. The static example in the helper's instructions is not a
  live identifier.
- All 420 output frames were decoded successfully. One-second contact sheets
  were visually reviewed after correcting an overflow-mask gap. This is not an
  independent privacy certification. RC1 preserves the approved edited files byte-for-byte.

## Evidence boundaries

The short, heavily redacted excerpts illustrate the interface and selection
interaction. They cannot independently establish hidden values, correctness,
physical scanner behavior, full integration or operational speed.

The owner clarified a daily workflow of approximately 150 batches, nearly
50 minutes manually versus approximately 20–30 minutes using the tools. This is
an owner-reported comparison, not an independently measured benchmark. The older
20-to-5-minute claim is superseded. Do not add the reported saving separately to
each tool or imply that the demo duration measures task performance.

The helper selects rows. A person reconciles cover quantities with overall
quantities and explicitly completes work. No autonomous ship-out is demonstrated.
Apps Script box guidance and the date/batch QR handoff are owner-confirmed context;
their full source and end-to-end behavior were not independently reviewed here.
The exact PDF compatibility limitation remains to be clarified.

Reproduction logic is in `../../../tools/sanitize-automation-demos.py`.
Its fixed masks apply only to the verified source dimensions and selected
intervals; a different recording requires a new privacy review.
