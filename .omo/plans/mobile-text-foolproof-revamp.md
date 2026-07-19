# mobile-text-foolproof-revamp - Work Plan

## TL;DR (For humans)
<!-- Fill this LAST, after the detailed plan below is written, so it summarizes the REAL plan. -->
<!-- Plain English for a non-engineer: NO file paths, NO todo numbers, NO wave/agent/tool names. -->

**What you'll get:** <fill last - deliverables in human terms, 1-2 sentences>

**Why this approach:** <fill last - the one or two load-bearing decisions and why>

**What it will NOT do:** <fill last - 1-3 plain lines mirroring Must NOT have>

**Effort:** <Quick | Short | Medium | Large | XL>
**Risk:** <Low | Medium | High> - <one-line driver>
**Decisions to sanity-check:** <fill last - the few choices worth a human glance>

Your next move: <fill - e.g. approve, or run a high-accuracy review>. Full execution detail follows below.

---

> TL;DR (machine): <1 line - effort, risk, deliverables>

## Scope
### Must have
- Refactor CharReveal in src/components/RevealText.jsx:25-43 to use word-wrapper + character-span pattern with `whitespace-pre` and `'\u00A0'` for spaces
- Refactor KineticText in src/components/RevealText.jsx:96-119 to use the same pattern while preserving all 4 mode variants (spring, wave, scatter, typewriter)
- Refactor WordReveal in src/components/RevealText.jsx:3-23 to use `inline-block` word wrappers with `whitespace-pre` (currently uses `inline` wrapper + `&nbsp;` with `w-[0.25em]` hack)
- Preserve all animation timing, delays, viewport, transition props exactly as they are today
- Keep existing `break-words` Tailwind class on 3 h2 elements in App.jsx lines 287, 311, 333 as belt-and-suspenders
- `npm run build` exits 0
- `lsp_diagnostics` on RevealText.jsx: zero errors
- Live rogue.codes displays all 3 philosophy h2s AND all 7 AboutUs kinetic h2s AND all 4 paragraphs with visible inter-word spacing and no horizontal overflow at 360px, 390px, 320px

### Must NOT have (guardrails, anti-slop, scope boundaries)
- Do NOT touch src/components/ui/hero-ascii.tsx local KineticText (deferred — already uses `\u00A0` correctly, not broken)
- Do NOT touch ScrambleText.jsx, Loader.jsx, VariableFontCursorProximity.jsx, ink-reveal.tsx — none are affected by the bug
- Do NOT remove `overflow-x: clip` on html/body in src/index.css:8 (no longer triggered after fix; defends against future regressions)
- Do NOT change animation timings, easings, variants, initial states, viewport margins, or transition durations — only the DOM structure of spans changes
- Do NOT introduce new components, new exports, new props, or new dependencies
- Do NOT change call sites in App.jsx, AboutUs.jsx, prisma-hero.jsx, or anywhere else — the components keep their existing public API
- Do NOT remove the existing `break-words` Tailwind classes on h2 elements in App.jsx lines 287, 311, 333
- Do NOT redo the styling of the h2 / p containers (className, style, color props stay verbatim)
- Do NOT add `text-wrap: balance` (modern CSS) at this time — keep scope tight; consider as a separate enhancement
- Do NOT silently collapse whitespace tokens — every whitespace segment must be rendered with real visual width

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: tests-after + visual (Playwright snapshots). Reason: pure DOM/CSS change to animation components; the bug is a rendering bug, not a logic bug. The proof is visual at multiple mobile widths. No unit test can faithfully capture the CSS whitespace-collapse + inline-block atomic-run interaction.
- Evidence path: `.omo/evidence/mobile-text-foolproof-revamp/`
- Verification surfaces:
  - `npm run build` exits 0 (artifact: build-output.txt)
  - `lsp_diagnostics` on src/components/RevealText.jsx returns zero errors (artifact: lsp-diagnostics.json)
  - Playwright snapshot of `https://rogue.codes` at 360x800 → screenshot + DOM-text dump of all h2 in Our philosophy section (artifact: rogue-codes-360px.png + rogue-codes-360px-dom.txt)
  - Playwright snapshot of `https://rogue.codes/about-us` (or whatever the AboutUs route is) at 360x800 → screenshot + DOM-text dump of all 7 KineticText h2 elements (artifact: rogue-codes-about-360px.png + dom.txt)
  - Playwright snapshots at 390x800 (iPhone 14) and 320x568 (iPhone SE / smallest modern phone) for both home and about pages (4 additional artifacts)
  - Assertion per page: for each h2 and p containing animated text, scrollIntoView and verify `element.getBoundingClientRect().right <= viewportWidth` (no horizontal overflow) and that the visible text equals the expected string (no missing letters, no missing spaces).
- Manual QA channel: Playwright `browser_resize + browser_snapshot + browser_take_screenshot` for each of 3 mobile widths × 2 pages = 6 screenshot artifacts. Use `browser_evaluate` to assert no horizontal overflow per text element.

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave. Fewer than 3 (except the final) means under-splitting.

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1. Refactor CharReveal | (none) | 4, 5 | 2, 3 |
| 2. Refactor KineticText-exported | (none) | 4, 5 | 1, 3 |
| 3. Refactor WordReveal | (none) | 4, 5 | 1, 2 |
| 4. Build verification + lsp_diagnostics | 1, 2, 3 | 5 | (none) |
| 5. Mobile visual QA - 3 widths × 2 pages | 4 | 6 | (none) |
| 6. Deploy to rogue.codes + final live verification | 5 | (none) | (none) |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->
- [x] 1. Refactor CharReveal using production TextEffect word-wrapper pattern
  What to do / Must NOT do:
    - Refactor CharReveal in src/components/RevealText.jsx:25-43 to split `children` via `children.split(/(\s+)/)` (segments include standalone whitespace tokens)
    - For each segment: if whitespace, render an `inline-block whitespace-pre` span containing `{'\u00A0'}` (NO motion.span animation needed for whitespace tokens; or optionally animate the space char identically — preserve current behavior if current code animates the space too, which it does)
    - For each word segment: wrap in an outer `inline-block whitespace-pre` span; inside it render each character as a `motion.span` with `display: inline-block` and `whitespace-pre`
    - The outer container gets `style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word' }}` (matches current CharReveal container at line 28)
    - Preserve the existing flat index-based delay sequence: each character (including whitespace tokens, if you choose to animate them) gets `delay + (flatCharIndex * 0.015)` and `duration: 0.4`, `ease: [0.25, 0.4, 0.25, 1]` exactly as today
    - Preserve `initial={{ opacity: 0, y: 30 }}` and `whileInView={{ opacity: 1, y: 0 }}` per character
    - Preserve `viewport={{ once: true, margin: '-80px' }}` per character
    - MUST NOT change the public signature `({ children, className, delay = 0 })`
    - MUST NOT remove the `className` prop from the outer container (still applied via `<span className={className} style={...}>`)
  Parallelization: Wave 1 | Blocked by: (none) | Blocks: 4, 5
  References (executor has NO interview context - be exhaustive):
    - src/components/RevealText.jsx:25-43 (current CharReveal definition)
    - src/components/RevealText.jsx:18 (WordReveal's existing space pattern - reference for `&nbsp;` precedent; we replace with `\u00A0`)
    - src/App.jsx:286-291, 310-315, 332-337 (call sites — DO NOT CHANGE)
    - Production pattern: https://github.com/Mail-0/Zero/blob/staging/apps/mail/components/motion-primitives/text-effect.tsx lines 122-132
    - Production pattern: https://github.com/DavidHDev/react-bits ScrollFloat.tsx line 34 (uses `\u00A0` substitution)
  Acceptance criteria (agent-executable):
    - Read src/components/RevealText.jsx lines 25-50; assert the new CharReveal uses `split(/(\s+)/)` (or equivalent that produces standalone whitespace tokens) and renders each word wrapped in an `inline-block` outer span with `whiteSpace: 'pre'` (or `whitespace-pre` className), each character span has `display: 'inline-block'` and is animated via `motion.span`
    - Assert at least one `\u00A0` literal OR `String.fromCharCode(160)` exists in the new CharReveal body
    - Assert the public signature `({ children, className, delay = 0 })` is unchanged
    - Assert `transition={{ duration: 0.4, delay: ..., ease: [0.25, 0.4, 0.25, 1] }}` is preserved per character
  QA scenarios (name the exact tool + invocation):
    - happy path: `lsp_diagnostics` on src/components/RevealText.jsx → 0 errors
    - failure path: if refactor introduces a `split('')` (old behavior), grep should match zero occurrences of `split('')` in the new CharReveal body
    - Evidence: `.omo/evidence/mobile-text-foolproof-revamp/task-1-charreveal-refactor.txt`
  Commit: Y | `fix(CharReveal): use motion-primitives word-wrapper pattern to prevent mobile text clipping`

- [x] 2. Refactor KineticText-exported using same pattern, preserve 4 mode variants
  What to do / Must NOT do:
    - Refactor KineticText in src/components/RevealText.jsx:96-119 to split `children` via `children.split(/(\s+)/)`
    - Wrap each WORD segment in `inline-block whitespace-pre` outer span; render each character inside as `motion.span` with `display: 'inline-block'` and `whiteSpace: 'pre'`
    - Render each WHITESPACE segment as `inline-block whitespace-pre` wrapper with `{'\u00A0'}` content — apply the SAME mode's variant to the space char so it animates in identically to other chars
    - The outer container keeps its existing style at line 101: `display: 'inline', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word'`
    - Preserve all four mode factories in `kineticVariants` (spring, wave, scatter, typewriter) — do NOT change `kineticVariants` at all
    - Preserve `delay = 0`, `className` props
    - The flat delay sequence counting chars AND whitespace tokens one slot each is preserved: `delay + (flatIndex * <perModeStep>)` where `<perModeStep>` is taken from the existing `transition.delay` expression (e.g., `i * 0.025` for spring, `i * 0.03` for wave, etc.)
    - MUST NOT change `kineticVariants` (lines 68-94)
    - MUST NOT change the public signature `({ children, mode = 'spring', delay = 0, className })`
  Parallelization: Wave 1 | Blocked by: (none) | Blocks: 4, 5
  References (executor has NO interview context - be exhaustive):
    - src/components/RevealText.jsx:68-94 (kineticVariants — DO NOT CHANGE)
    - src/components/RevealText.jsx:96-119 (current KineticText definition)
    - src/components/AboutUs.jsx:355,405,438,466,481,516,541 (call sites — DO NOT CHANGE)
    - Production pattern: same TextEffect reference as task 1
  Acceptance criteria (agent-executable):
    - Read src/components/RevealText.jsx lines 96-120; assert the new KineticText uses `split(/(\s+)/)` and word-wrapper pattern
    - Assert `kineticVariants` object is byte-identical to before (no changes to the four factories)
    - Assert at least one `\u00A0` in the new KineticText body
    - Assert public signature unchanged
  QA scenarios: lsp_diagnostics 0 errors; grep for `kineticVariants` returns the same 4 keys in same order; Evidence `.omo/evidence/mobile-text-foolproof-revamp/task-2-kinetictext-refactor.txt`
  Commit: Y | `fix(KineticText): use motion-primitives word-wrapper pattern, preserve all 4 mode variants`

- [x] 3. Refactor WordReveal using same word-wrapper pattern (drop w-[0.25em] hack)
  What to do / Must NOT do:
    - Refactor WordReveal in src/components/RevealText.jsx:3-23 to use the same word-wrapper pattern: `children.split(/(\s+)/)`, each WORD segment wrapped in `inline-block whitespace-pre` outer span, each WHITESPACE segment rendered as `inline-block whitespace-pre` with `{'\u00A0'}`
    - Inside each word wrapper: render the entire WORD as a single `motion.span` with `display: 'inline-block'` (NOT per-character — WordReveal animates per WORD not per CHARACTER, preserve this behavior)
    - Preserve `initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}`, `whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}`, `viewport={{ once: true, margin: '-80px' }}`, `transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.25, 0.4, 0.25, 1] }}` exactly as today (where `i` is the WORD index)
    - Drop the existing `inline-block w-[0.25em]` span (line 18) — replacing with the proper `inline-block whitespace-pre` + `\u00A0` approach
    - Drop the existing outer `<span className="inline">` wrapper (line 8) — the new word-wrapper IS the `inline-block`
    - Preserve the outer container `<span className={className} style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>` — ADD `whiteSpace: 'pre-wrap'` to the style
    - MUST NOT change the public signature `({ children, className, delay = 0 })`
    - MUST NOT change WordReveal from per-WORD animation to per-CHARACTER — keep it word-level
  Parallelization: Wave 1 | Blocked by: (none) | Blocks: 4, 5
  References (executor has NO interview context - be exhaustive):
    - src/components/RevealText.jsx:3-23 (current WordReveal definition)
    - src/App.jsx:292-296, 316-320, 338-342 (call sites, paragraphs in philosophy section — DO NOT CHANGE)
    - src/components/AboutUs.jsx:518-520 (call site — DO NOT CHANGE)
    - Production pattern: same TextEffect reference as task 1
  Acceptance criteria (agent-executable):
    - Read src/components/RevealText.jsx lines 3-25; assert WordReveal uses `split(/(\s+)/)` with word-wrapper `inline-block` spans
    - Assert `w-[0.25em]` no longer appears in WordReveal body (it can still appear elsewhere in the project, just not in WordReveal)
    - Assert each WORD is rendered as a single `motion.span` (not per-character motion.span) — preserves word-level animation
    - Assert at least one `\u00A0` in the new WordReveal body
    - Assert public signature unchanged
  QA scenarios: lsp_diagnostics 0 errors; grep for `w-\[0.25em\]` in WordReveal body returns 0; Evidence `.omo/evidence/mobile-text-foolproof-revamp/task-3-wordreveal-refactor.txt`
  Commit: Y | `fix(WordReveal): drop w-[0.25em] hack, use unified whitespace-pre + \u00A0 pattern`

- [x] 4. Build + lsp verification (no deployment yet)
  What to do / Must NOT do:
    - Run `npm run build` in `C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\clients website\webistedevhompage`; assert exit code 0
    - Run `lsp_diagnostics` on `src/components/RevealText.jsx`; assert zero errors
    - Capture both outputs as artifacts
    - MUST NOT commit; MUST NOT deploy; this gate is local-only verification
  Parallelization: Wave 2 | Blocked by: 1, 2, 3 | Blocks: 5
  References: src/components/RevealText.jsx (full file after refactor)
  Acceptance criteria (agent-executable):
    - `npm run build` exits 0
    - `lsp_diagnostics src/components/RevealText.jsx` returns zero errors
    - Both outputs captured to `.omo/evidence/mobile-text-foolproof-revamp/task-4-build-and-lsp.txt`
  QA scenarios: build success; lsp clean; Evidence `.omo/evidence/mobile-text-foolproof-revamp/task-4-build-and-lsp.txt`
  Commit: N

- [x] 5. Mobile visual QA — Playwright snapshots at 360px, 390px, 320px on local dev server
  What to do / Must NOT do:
    - Start the local dev server if not running (e.g., `npm run dev`); ensure it serves on localhost
    - Use `playwright-mcp_browser_navigate` to load `http://localhost:5173/` (or whichever port the dev server reports)
    - Use `playwright-mcp_browser_resize` to set viewport to 360x800
    - Use `playwright-mcp_browser_snapshot` targeting `[aria-label="Our philosophy"]` to dump DOM-text of all 3 philosophy h2s — assert no `getBoundingClientRect().right > 360` on any h2 or its child spans; assert visible text equals expected (e.g., "Why does Rogue Code build websites from scratch instead of using templates?")
    - Navigate to `/about` (or route for AboutUs page)
    - Snapshot and assert all 7 KineticText h2s render with no horizontal overflow; assert each visible text matches its expected text
    - For both pages: snapshot and assert all `p` elements containing WordReveal render with no clipped letters and visible word spacing
    - Take `playwright-mcp_browser_take_screenshot` of full page at each width for visual evidence (skip if it fails — snapshots suffice)
    - Repeat at 390x800 (iPhone 14) and 320x568 (iPhone SE / smallest modern Android)
    - MUST NOT use `--dry-run` as completion evidence
    - MUST NOT skip any of the 3 widths × 2 pages = 6 scenarios
    - MUST capture at least the DOM-text assertion artifact per scenario
  Parallelization: Wave 3 | Blocked by: 4 | Blocks: 6
  References:
    - src/App.jsx:286-345 (philosophy section — all 3 h2s and 3 paragraphs)
    - src/components/AboutUs.jsx:354-541 (7 KineticText h2s + 1 WordReveal paragraph at line 518)
  Acceptance criteria (agent-executable):
    - All 6 scenarios captured (3 mobile widths × 2 pages)
    - For each h2 (10 total: 3 home + 7 about): `element.getBoundingClientRect().right <= viewportWidth` is true
    - For each p containing WordReveal (4 total: 3 home + 1 about): same assertion
    - For each h2 and p visible text: equals the expected string at that viewport (no missing chars)
  QA scenarios:
    - happy: rogue.codes home + about at 360x800, all text present, no clipping
    - failure: prior commit had clipping on same page — confirm fix
    - Evidence: `.omo/evidence/mobile-text-foolproof-revamp/task-5-mobile-visual-qa/{home,about}-{360,390,320}.{png,dom.txt}`
  Commit: N

- [x] 6. Deploy to rogue.codes and final live verification
  What to do / Must NOT do:
    - Commit the refactored RevealText.jsx with a single commit message: `fix: revamp animated text components to prevent mobile clipping (motion-primitives word-wrapper pattern)`
    - Push to `origin/main` (auto-deploys on rogue.codes via Vercel)
    - Wait ~60s for Vercel deployment to settle, then load `https://rogue.codes/` at 360x800 and `https://rogue.codes/about` (or actual About route) at 360x800
    - Use `playwright-mcp_browser_snapshot` on the philosophy section to confirm visible text + no horizontal overflow
    - Take a screenshot of deployed page for evidence
    - MUST NOT consider deploy "done" until Playwright live verification passes
    - MUST capture commit SHA + Vercel deployment URL
  Parallelization: Wave 4 | Blocked by: 5 | Blocks: (none)
  References: All prior tasks
  Acceptance criteria (agent-executable):
    - `git log -1 --format="%H %s"` shows the new commit
    - `git push origin main` returns success
    - Live Playwright snapshot at 360x800 of `https://rogue.codes/` `[aria-label="Our philosophy"]` shows all 3 h2s with visible inter-word spacing, no horizontal overflow, no missing letters
    - Same for `/about` page with all 7 KineticText h2s
  QA scenarios: happy path deploy + live verify at 360px; Evidence `.omo/evidence/mobile-text-foolproof-revamp/task-6-live-deploy/{commit-sha,rogue-codes-360px.png,dom-text.txt}`
  Commit: Y | `fix: revamp animated text components to prevent mobile clipping`

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [x] F1. Plan compliance audit — ✅ ALL components match spec
- [x] F2. Code quality review — ✅ Clean, no stubs, consistent pattern
- [x] F3. Real manual QA — ✅ Playwright 6 scenarios pass, live site verified
- [x] F4. Scope fidelity — ✅ Only RevealText.jsx touched, no scope creep

## Commit strategy

Single atomic commit on `main` (or feature branch if preferred; the user did not specify, default is main per prior fix flow):
- Commit message: `fix: revamp animated text components to prevent mobile clipping (motion-primitives word-wrapper pattern)`
- Files in commit: `src/components/RevealText.jsx` only
- Push to `origin/main` → triggers Vercel auto-deploy on rogue.codes

## Success criteria
- `npm run build` exits 0
- `lsp_diagnostics src/components/RevealText.jsx` returns zero errors
- At viewport widths 360px, 390px, 320px:
  - All 3 philosophy section h2s on `https://rogue.codes/`:
    - Render every word with visible inter-word spacing
    - Render every character (no missing letters)
    - Have no horizontal overflow (`getBoundingClientRect().right <= viewportWidth`)
  - All 7 KineticText h2s on `https://rogue.codes/about` (or actual about route):
    - Same three assertions
  - All 4 WordReveal paragraphs (3 home, 1 about):
    - Render every word with visible inter-word spacing
    - Have no horizontal overflow
- Live on rogue.codes confirmed via Playwright snapshot at 360px after push
- Commit pushed to `origin/main` and deployment succeeds on Vercel