# Lakers data collection checkpoint — 2026-11-03

## Phase 1 gate

Completed before the four-face visual redesign. Official NBA schedule and rendered traditional box-score tables were inspected in a real browser. Eight completed regular-season games through November 2 were identified; preseason was excluded. The derived record is **6–2**, not the previously suggested 4–2.

| Date (PT) | NBA game ID | Opponent | Venue | LAL–opponent | Cumulative | Played / DNP / inactive |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-10-21 | 0022600005 | Golden State | Home | 127–105 | 1–0 | 12 / 1 / 5 |
| 2026-10-23 | 0022600102 | LA Clippers | Home | 125–117 | 2–0 | 9 / 5 / 4 |
| 2026-10-25 | 0022600112 | Utah | Away | 132–123 | 3–0 | 10 / 5 / 3 |
| 2026-10-27 | 0022600131 | Portland | Home | 129–136 | 3–1 | 10 / 4 / 4 |
| 2026-10-28 | 0022600143 | LA Clippers | Away | 103–87 | 4–1 | 9 / 4 / 6 |
| 2026-10-30 | 0022600023 | Golden State | Away | 95–112 | 4–2 | 12 / 1 / 5 |
| 2026-11-01 | 0022600157 | Toronto | Home | 131–125 | 5–2 | 12 / 1 / 5 |
| 2026-11-02 | 0022600172 | Miami | Home | 138–117 | 6–2 | 14 / 1 / 3 |

Sources: [official Lakers schedule](https://www.nba.com/lakers/schedule), individual official box-score URLs retained on every Notion game/player record. [Toronto](https://www.nba.com/game/tor-vs-lal-0022600157/box-score), [Miami](https://www.nba.com/game/mia-vs-lal-0022600172/box-score).

## Reconciliation and readback

- Games: 8; player-game records: 145. Toronto's existing 18 rows were updated in place, not duplicated. Seven game rows and 127 player-game rows were added.
- Stable NBA player IDs were populated, including identities cross-referenced from other inspected official player links for inactive names. Each game's row count equals its distinct player-ID count.
- Five official starting-position labels (F/F/C/G/G) were present for each game. These labels, not minutes, scoring, or row order alone, determine Starter. Other participants are Bench; DNP and inactive records remain separate and have null statistics.
- Notion readback confirms all 15 additive sums match each displayed official team total: FGM, FGA, 3PM, 3PA, FTM, FTA, OREB, DREB, REB, AST, STL, BLK, TO, PF, PTS. No team-only adjustment was needed for these displayed totals. Separate hidden team-only accounting was not independently verified.
- Added non-destructive collection, validation, lineup-role, timestamp, and cumulative-record properties. Existing review and publication fields remain separate. All records remain pending human review; all eight Publication Approved flags remain false.

## Discrepancies and limitations

- Miami: the official rendered Matisse Thybulle minutes value is `18:60`. It is retained verbatim and marked Source discrepancy, not silently changed to `19:00`. Numeric totals still match. This record must not pass strict minute-format validation until corrected or independently resolved.
- October 28: the source lists 19 total Lakers names (9 played, 4 DNP, 6 inactive). All are retained without forcing an assumed 18-player roster.
- Inactive lists sometimes lack reasons; only the source's generic inactive status is recorded in those cases. IDs are identified from observed official player links, not generated from names.
- The next schedule inspected is November 4 at Sacramento, 7 PM PST, game 0022600185. It is not a completed-game record and has not been publication-approved.
- Collection and numeric checks do not establish public redistribution permission. Real records remain blocked by the server rights gate and publication filter. Preview visual tests must use explicitly labeled synthetic examples or pending states.
- This checkpoint is a manual assisted import, not proof of an unattended daily ingestion service. Automated scheduling and future source availability are not verified.

## Gate result

Inventory and Notion entry/readback complete for all eight available box scores, with the source discrepancy explicitly retained. Visual implementation may now proceed using restricted real data and labeled synthetic fixtures; public data approval remains blocked independently.

## Independent recheck — 2026-11-04

This dated section supersedes the historical pending-publication statements above. The user subsequently confirmed redistribution permission and approved all eight games, including disclosure of the Miami source anomaly. Notion readback showed eight approved, reviewed games with source URLs and a November 3 check date. This audit does not alter those historical timestamps.

- Reopened all eight official NBA box scores in Chrome. Compared all 145 player-game records, including five starter labels per game, participating bench rows, DNP and official inactive lists, minutes and every exported statistic. All comparisons passed; accent variants were normalized only for matching, not rewritten in source records.
- NBA team-site tables sometimes omit inactive lists; the corresponding main NBA box-score pages supplied them. The October 28 source has 19 Lakers names; no roster-size assumption was imposed.
- Miami still displays Matisse Thybulle's invalid duration `18:60`. Preserve it and its warning; this is a source discrepancy, not a valid duration.
- The official Lakers schedule's Past / Regular Season list matched all eight dates, opponents, venues, scores and six wins/two losses through November 2. Preseason was excluded. The API's exact-game-set audit guard labels coverage through that date only; any changed set returns to partial coverage.
- Added and populated `LAL Team ID` and `Opponent Team ID` on those eight existing Notion rows. Readback confirmed IDs while publication/review flags remained unchanged. No logo attachments or duplicate games were created.
- Reproducible comparator: [audit-game-center-records.cjs](../../../tools/audit-game-center-records.cjs). Rendered official DOM captures and schedule text are local QA evidence — retained privately; not included in the public repository.

The November 4 Sacramento schedule was visible on the official site, but was not imported or publication-approved. The public next-game section therefore remains unavailable. Numerical verification is not legal permission; the redistribution decision remains the user's stated confirmation.
