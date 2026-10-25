# Miller HQ — Stamford 2029

Growing the city that works, together.

Public preview: https://miller-hq-2029.danny-robushi.chatgpt.site
Source repository: https://github.com/dannyrobushi-ops/Miller-HQ

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

