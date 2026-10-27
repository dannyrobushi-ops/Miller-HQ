# Miller HQ — Stamford 2029

Growing the city that works, together.

Public preview: https://miller-hq-2029.danny-robushi.chatgpt.site
Source repository: https://github.com/dannyrobushi-ops/Miller-HQ

## Candidate research

The Candidate research desk contains 878 named House/Senate candidates from the October 25 market roster, 334 matched Voteview records, and an October 27 research sample of 16 profiles / 95 policy statements. Source types distinguish platforms, written Q&A, interviews and appearance excerpts. These are partial research and market-derived candidate labels, not a certified ballot or complete appearance archive.

Issue positions use a transparent, versioned policy rubric. Reviewed statements retain source URLs, dates, attribution, rationale and context; missing or conflicting evidence is never converted into a center score. Voteview's DW-NOMINATE score is displayed separately. The browser-local transcript lab performs experimental phrase matching, speaker filtering and context flagging; it is not a trained or validated language model. It does not crawl sites, transcribe audio/video or send transcripts to an external service. Every proposed item needs source review. Imported Excel/CSV/JSON records stay draft until reviewed. Local evidence is stored in workspace datasets and included in backup; Excel exports include the directory, evidence, policy scores and rubric. The included research source notes document transcript limitations, unknown publication dates and attribution. See CANDIDATE_RESEARCH_SOURCES.txt.

## Polling / prediction-market switch

A top-level switch changes the atlas, race panels and continuous history cards to reported polling. The initial filtered dataset has 1,290 survey records across 110 House districts, 27 Senate races and 32 governor races. The map uses the latest qualifying poll, not a forecast or win probability. Missing districts stay gray; older polls are labeled. Date filters, source metadata and Excel exports are included. Explicit primaries, supplemental hypothetical questions, incomplete candidate buckets and duplicate surveys are excluded. Where current candidate names are available, the leading pair must match. VoteHub data is CC BY 4.0; supplemental Polling Forecast records retain their row licenses, including Wikipedia CC BY-SA 4.0. Browser refresh retains separate collection timestamps for each source; VoteHub currently blocks cross-origin browser access, so its dated snapshot is preserved while the compatible supplemental feed updates.

## National election atlas

The Election markets desk includes a 50-state / 435-district map, Senate and House toggles, leader shading, hover odds, tap/click details, zoom/pan and state search. The 2026 Census geometry uses corrected Missouri boundaries from the prior Congress. Missing markets remain unpriced. State-level markets refresh from Polymarket separately from congressional data. A sourced, CC BY-SA ballot-measure reference index includes prior and upcoming 2026 measures. It is not a certified ballot or a complete local-election roster. Official election-office links are supplied for every state. Team additions import from Excel/CSV/JSON into browser-local workspace datasets and can be exported/backed up.

## October 25 update
The marble-style welcome page is present in the initial HTML, so the terminal does not flash before it. One Enter the HQ button opens the workspace. iPhone layouts include a collapsible menu, stacked panels, touch-sized controls, fitted charts and locally scrolling data tables. The market desk starts with All markets / All regions and shows every matching event in one continuous scroll. Daily CLOB price histories are bundled for all 957 outcomes (247,365 observations) and refresh when visible charts need new data. Charts default to May 1, 2026, with January 1, 30/90/180-day and All available alternatives. Wider, taller charts use stronger lines, endpoint values and hover/keyboard tooltips. The Inspect date slider and permanent readout are removed. Historical CSV export remains available. Gaps over seven days stay disconnected. Data before a contract began is never fabricated.

The election archive adds historical finance, period reconciliation and ballot-line coverage. The fiscal desk adds adopted city/education comparisons, proposed request changes, final reduction detail and outside-funding references.

## Workspace
Twelve desks: overview, team workboard, calendar, notebook, city map, city budget, election archive, election markets, expense ledger, source library, data desk and brand room.

Open index.html or serve this folder with a static web server. There is no build step. The GitHub copy keeps all browser assets in the repository root; the downloadable package keeps third-party assets under vendor/.

This public preview has no shared database or campaign login. Notes, tasks, imports and expenses stay in each visitor's browser. Excel/CSV exports and JSON backups support sharing and transfer. Publishing the site does not upload browser-local notes. A future shared team version needs server-side storage and access controls.

## Election and budget reference
Historical results and fiscal summaries are from supplied June 2026 documents. The 2021 dossier and cached result rows disagree; both source bases are retained and labeled. FY24/25 historical operating figures are derived in the source. Proposed category amounts must not be treated as adopted allocations. Capital authorization is separate from annual operating spending.

## Election markets
Polymarket public Gamma API supplies active 2026 US House/Senate winner events and chamber control. Candidate labels and underlying settlement questions are preserved. Snapshot: 474 events, 957 priced outcomes (35 Senate, 437 House events, 2 chamber-control events), October 25, 2026. Event counts are not seat counts. The page refreshes on opening and every five minutes while visible, with a one-minute manual cooldown, timestamps and a clearly labeled fallback. Search discovery is paginated and deduplicated. Incomplete refreshes preserve the last complete snapshot.

Prices are market-implied probabilities, not polls, AI predictions or official results. The page does not trade, connect wallets or use private API keys. Kalshi is linked as a reference; its direct browser request returned HTTP 403 and live pricing is not connected.

## Maps and dependencies
MapLibre GL JS 5.6.1 and OpenFreeMap streets; provider attribution is displayed. SheetJS CE 0.20.3 supports Excel files. Third-party license files are included. Internet access is required for maps, fonts and refreshed market data.

## Files
app.js: core browser-local workspace. enhancements.js: maps and Excel. analytics.js/report-data.js: fiscal and historical election views. markets.js/market-data.js: live market adapter and fallback. seed.js: original factual records. market-history.js/market-charts.js: daily time-series cache and charts. research-details.js: expanded sourced research. welcome.js: landing page. CSS files: design.

No credentials are stored in this repository. Public deployment is managed separately with Sites. Repository pushes do not automatically redeploy the Sites URL.
