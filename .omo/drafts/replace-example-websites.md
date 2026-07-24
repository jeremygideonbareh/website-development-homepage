---
slug: replace-example-websites
status: awaiting-approval
intent: clear
review_required: false
pending-action: write .omo/plans/replace-example-websites.md
approach: 2-file data replacement with worker-verified iframe compatibility. Candidate pools per category, worker tests each URL via curl -sIL, picks 4 confirmed-OK per category.
---

# Draft: replace-example-websites

## Components (topology ledger)
<!-- Lock the SHAPE before depth. One row per top-level component that can succeed or fail independently. -->
| id | outcome (one line) | status | evidence path |
|---|---|---|---|
| services-section-data | ServicesSection.jsx serviceExamples + services[].projects replaced with real iframe-OK URLs | active | src/components/ServicesSection.jsx:7-101 |
| examples-page-1 | ExamplesPage.jsx categories 1-6 (groomers, coffee, cafes, barbers, studios, portfolios) replaced with real iframe-OK URLs | active | src/components/ExamplesPage.jsx:82-160 |
| examples-page-2 | ExamplesPage.jsx categories 7-11 (tech, wellness, restaurants, fitness, floral) + blockedSites array replaced/updated | active | src/components/ExamplesPage.jsx:161-326 |
| build-lint | npm run build + grep for fake URLs + lsp_diagnostics passes | active | src/components/ServicesSection.jsx, src/components/ExamplesPage.jsx |
| playwright-qa | Dev server iframe-load visual QA on localhost:5173 | active | http://localhost:5173/ |

## Open assumptions (announced defaults)
- assumption: Items per category | adopted default: 4 per category (user-confirmed) | rationale: user explicitly chose "Keep 4 per category" — no expansion, pure replacement of existing 44 entries
- assumption: URL verification approach | adopted default: provide candidate pool of 6-8 URLs per category, worker tests each with curl -sIL for X-Frame-Options/CSP, picks 4 that pass | rationale: cannot verify from planning environment (all 4 real URLs returned transport errors)
- assumption: existing real URLs (pawsforchangeindia.org, kikigarod.com, crumbsbakery.in, chelseamanspa.com) | adopted default: keep as candidates, worker tests; if blocked, add to blockedSites and replace with Awwwards alternatives | rationale: they're the only real client sites, may or may not be iframe-embeddable
- assumption: ServicesSection example context | adopted default: leave as-is, no disclaimer added | rationale: adding disclaimers is UX scope creep; ExamplesPage already has the disclaimer
- assumption: blockedSites array | adopted default: grow to include ALL blocked candidates encountered during testing | rationale: the fallback shows graceful "Preview unavailable" instead of broken iframe

## Findings (cited - path:lines)
- `src/components/ServicesSection.jsx:7-32` — serviceExamples object has 16 entries, 12 are fake (roguecode.ai/*, roguecode.dev/*, roguecode.design/*)
- `src/components/ServicesSection.jsx:53-101` — services[].projects arrays are name-only tags (no URLs), 3 reference fake project names ("Support Ticket Agent", "Booking Platforms", etc.)
- `src/components/ExamplesPage.jsx:82-226` — categories array: 11 categories × 4 items = 44 entries; 35 have fake URLs
- `src/components/ExamplesPage.jsx:323` — blockedSites array: currently ['faunarobotics.com', 'locomotive.ca', 'ponder.ai'] — needs expansion
- `src/components/ExamplesPage.jsx:21-80` — SiteThumbnail, SitePreview, IframeThumbnail, IframeModalPreview components all have error fallback built-in (already graceful)
- Grep results: 47 matches for `roguecode\.(dev|ai|design)` across 2 files
- Awwwards search: 80+ award-winning sites found across all 11 categories

## Decisions (with rationale)
- 4 items per category (user explicit choice): No expansion, replace existing 44 entries
- Worker-verify URLs: Plan environment cannot test iframe headers (all 4 real URLs returned transport errors). Provide candidate pools; worker tests with curl.
- Keep ExamplesPage URL replacement; don't touch component/render logic
- Two-wave parallel structure: Todos 1-3 (data replacement) run parallel, Todo 4 (build) after, Todo 5 (Playwright QA) after build

## Scope IN
- Replace ALL 47 fake URLs in ServicesSection.jsx and ExamplesPage.jsx
- Update services[].projects name tags to match new real business names
- Update blockedSites array with all blocked candidates
- Rewrite item descriptions to match actual businesses
- Keep existing 4 real URLs if they pass iframe compatibility test during execution

## Scope OUT (Must NOT have)
- No layout, styling, JSX structure, or component changes
- No new npm dependencies
- No new categories or removal of existing categories
- No change to filter logic, search, grid/list toggle, modal preview mechanism
- No change to sandbox attribute on any iframe
- No change to SuggestModal or its form
- No expansion beyond 4 items per category
- No disclaimer changes to ServicesSection

## Open questions
(none — user explicitly chose 4 per category; all other forks defaulted)

## Approval gate
status: awaiting-approval
pending-action: write .omo/plans/replace-example-websites.md
approach-given-to-user: 2-file data replacement, 4 items/cat, candidate pools per category, worker tests iframe compatibility, 5 todos (3 parallel waves), final verification F1-F4