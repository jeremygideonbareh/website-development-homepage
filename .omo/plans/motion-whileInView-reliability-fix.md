# motion-whileInView-reliability-fix - Work Plan (Amendment)

## TL;DR (For humans)

**What you'll get:** Every animated letter on rogue.codes will become visible when you scroll to it. No more words showing as "hy" when they should be "Why". Affects every CharReveal / KineticText / WordReveal on the home and About pages.

**Why this approach:** The previous fix fixed the right edge of text but missed the actual user-visible bug: Framer Motion's "whileInView" animation was firing unreliably per-character. When ~80 chars per heading each register their own scroll observer, many observers miss the trigger during fast scroll, and `once: true` means they stay invisible forever. The fix collapses ~80 observers into 1 per element by moving `whileInView` to the parent container and using Framer Motion `variants` with `staggerChildren` to cascade the animation to child char/word motion.span elements.

**What it will NOT do:**
- Will not change visible animation timing/duration/easing
- Will not change the word-wrapper + `\u00A0` structure (already shipped and working)
- Will not touch `kineticVariants`, `SectionEyebrow`, `SectionHeading`, or `ScrambleText`
- Will not change any component public signatures
- Will not touch any call site in App.jsx / AboutUs.jsx

**Effort:** Short (one file, same pattern in 3 components)
**Risk:** Low — surgical swap of animation trigger mechanism; preserves all visible animation properties
**Decisions to sanity-check:** The choice to convert from individual `whileInView` to parent-level `variants` propagation (Framer Motion's idiomatic pattern for this exact problem)

Your next move: approve this amendment, then I run a single-pass refactor + visual-opacity QA + live verify.

> TL;DR (machine): Short effort, low risk, 3-component animation-trigger refactor in one file.

## Scope

### Must have
- Replace per-character `whileInView` with parent-level `whileInView` + Framer Motion `variants`/`staggerChildren` pattern in:
  - `WordReveal` in `src/components/RevealText.jsx:3-29`
  - `CharReveal` in `src/components/RevealText.jsx:31-63`
  - `KineticText` in `src/components/RevealText.jsx:116-161`
- Define container variants `{ hidden: {}, visible: { transition: { staggerChildren: <step> } } }` per component (the step matches the existing per-char delay step):
  - WordReveal: `staggerChildren: 0.04` (matches current `delay + wordIndex * 0.04`)
  - CharReveal: `staggerChildren: 0.015` (matches current `delay + charIndex * 0.015`)
  - KineticText: `staggerChildren: 0.025` for spring, 0.03 for wave, 0.02 for scatter, 0.04 for typewriter (matches the per-mode `i * <step>` expression in each `kineticVariants[i]` factory's `transition.delay`)
- Define child variants `{ hidden: { ...initial }, visible: { ...whileInView, transition: { duration: ..., ease: ... } } }` per component
- Parent `motion.span` (the word-wrapper outer for CharReveal/KineticText, or container for WordReveal) carries `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, margin: '-80px' }}` (or `-60px` for KineticText — preserve current)
- Child `motion.span` chars/words inherit variants, NO `whileInView` / `initial` / `viewport` of their own
- Preserve the existing base `delay` prop by adding it as `delayChildren: delay` on the parent's `visible.transition`
- Preserve all visible animation properties (opacity, y, filter, ease, duration, scale, rotate, x, etc.) exactly
- For `KineticText`: the four mode-specific `initial` / `whileInView` / `transition` are still applied — via the child variant object the modes produce. Compute the child variant per mode (e.g. `spring` produces `{ hidden: {opacity:0, scale:0.3, rotate:-8, y:20}, visible: {opacity:1, scale:1, rotate:0, y:0, transition: {type:'spring', stiffness:200, damping:12}} }`)
- `lsp_diagnostics` zero errors
- `npm run build` exits 0
- Live rogue.codes Playwright check at 360x800: for each of the 3 philosophy h2s AND all kinetic h2s on About UNUS page, hover-scroll each into view and assert `getComputedStyle(span).opacity === '1'` for **every** char motion.span — zero invisible chars (currently we have 17–26 invisible per heading). Capture before/after opacity screenshots as evidence.

### Must NOT have (guardrails)
- Do NOT touch `kineticVariants` object's mode factory output structure — but promote its output into a Framer Motion `variants` object shape (which means the test "byte-identical" is no longer realistic; preserve SEMANTIC equivalence instead)
- Do NOT change `SectionEyebrow` or `SectionHeading`
- Do NOT touch any call site in `App.jsx` or `AboutUs.jsx` or others
- Do NOT change component signatures
- Do NOT touch the outer word-wrapper structure from `mobile-text-foolproof-revamp` (inline-block whitespace-pre + `\u00A0`)
- Do NOT remove `overflow-x: clip`, `break-words`, or `\u00A0` semantics
- Do NOT silently swap per-char animation timing — the visible durations/eases/steps must remain identical
- Do NOT add new dependencies or new exports
- Do NOT silently collapse whitespace in the variants object
- Do NOT introduce `whileInView` on child motion.span

## Verification strategy
> Zero human intervention - agent-executed. The proof is per-char opacity at every position in the heading.
- Test decision: tests-after + visual (Playwright opacity assertion).
- Evidence path: `.omo/evidence/motion-whileInView-reliability-fix/`
- Verification surfaces:
  - `npm run build` exits 0 (artifact: build-output.txt)
  - `lsp_diagnostics` on `src/components/RevealText.jsx` returns zero errors (artifact: lsp-diagnostics.json)
  - Playwright navigate to `http://localhost:5173/` at 360x800
  - For each of the 3 philosophy h2s:
    - `h2.scrollIntoView({ block: 'center' })`
    - Wait 2s for animation to settle
    - For every `span` inside the h2 assert `window.getComputedStyle(span).opacity === '1'`
    - Capture ruler screenshots + per-char opacity dump
  - Repeat for the 7 KineticText h2s on `/about` (after clicking About Us button)
  - Repeat at 390x800 and 320x568
  - Live rogucodes equivalent at 360x800 after deploy

## Execution strategy
### Parallel execution waves

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1. Refactor CharReveal to parent-whileInView + variants/staggerChildren | (none) | 4, 5 | 2, 3 |
| 2. Refactor KineticText to parent-whileInView + variants/staggerChildren, preserve 4 modes | (none) | 4, 5 | 1, 3 |
| 3. Refactor WordReveal to parent-whileInView + variants/staggerChildren | (none) | 4, 5 | 1, 2 |
| 4. Build + lsp verification | 1, 2, 3 | 5 | (none) |
| 5. Mobile visual opacity QA — 3 widths × 2 pages + live verify | 4 | 6 | (none) |
| 6. Deploy to rogue.codes + final live opacity verification | 5 | (none) | (none) |

## Todos
- [ ] 1. Refactor CharReveal: parent-level whileInView + variants/staggerChildren=0.015 + delayChildren=delay
  - Replace per-char `<motion.span initial whileInView viewport>` with `<motion.span variants={charVariant}>`
  - Parent outer container is the `motion.span` carrying `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, margin: '-80px' }}`, `variants={container}` where `container = { hidden: {}, visible: { transition: { staggerChildren: 0.015, delayChildren: delay } } }`
  - The inner word-wrapper `<span className="inline-block whitespace-pre">` stays as plain span (or wrapped inside the parent motion span).
  - Char variant: `{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } } }`
  - Whitespace `inline-block whitespace-pre` `\u00A0` span stays as static non-motion span (no change from prior shipped code)
  - MUST preserve existing `delay` prop integration → `delayChildren` in container variant's visible transition
  - MUST NOT add `whileInView` to any child motion.span
  - Acceptance: read RefactorText.jsx, assert exactly ONE `whileInView` per CharReveal (on parent), zero on children
  - References: src/components/RevealText.jsx:31-63 (current CharReveal), App.jsx:286-345 (philosophy call sites — UNCHANGED)
  - QA: lsp_diagnostics 0 errors; Playwright per-char opacity === '1' after scrollIntoView
  - Evidence: `.omo/evidence/motion-whileInView-reliability-fix/task-1-charreveal.txt`
  - Commit: Y | `fix(CharReveal): parent-level whileInView + staggerChildren to fix unreliable per-char animation`

- [ ] 2. Refactor KineticText: same pattern, preserve 4 modes
  - Compute per-mode container child variant object:
    - `spring`: hidden `{opacity:0, scale:0.3, rotate:-8, y:20}`, visible `{opacity:1, scale:1, rotate:0, y:0, transition: {type:'spring', stiffness:200, damping:12}}`
    - `wave`: hidden `{opacity:0, y:-40, scale:0.8}`, visible `{opacity:1, y:0, scale:1, transition: {duration:0.5, ease:[0.25,0.4,0.25,1]}}`
    - `scatter`: hidden `{opacity:0, x:cos*60, y:sin*60, scale:0}` (computed per char via function → convert to variant getter or inline), visible `{opacity:1, x:0, y:0, scale:1, transition: {type:'spring', stiffness:150, damping:14}}`
    - `typewriter`: hidden `{opacity:0, x:-10}`, visible `{opacity:1, x:0, transition: {duration:0.15, ease:'easeOut'}}`
  - Per-mode container variant: `{ hidden: {}, visible: { transition: { staggerChildren: <modeStep>, delayChildren: delay } } }`
    - spring stagger: 0.025, wave stagger: 0.03, scatter stagger: 0.02, typewriter stagger: 0.04
  - For the `scatter` mode, the per-char initial scatter angle must be preserved — this can be encoded by computing the variant dynamically per `flatIndex` element. Either:
    - Option a: Keep `kineticVariants[mode]` as a function returning the variant pair, call it per char to generate variants, but use those variants ONLY for initial+animate state (no whileInView) — the parent container's `whileInView="visible"` triggers propagation, and each child's `variants` object is computed per char inline.
  - Parent outer container = `motion.span` with `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, margin: '-60px' }}`, `variants={container}`.
  - Each child char motion.span uses `variants={childVariant(currentFlatIndex)}` — same delay semantics.
  - Whitespace `\u00A0` motion.span: also receive variants so they animate too (preserving current behavior).
  - MUST NOT change `kineticVariants` semantic output, only its CONSUMER structure
  - Acceptance: parent has the whileInView, children do not; per-char opacity === '1' after scrollIntoView for all 4 modes
  - References: src/components/RevealText.jsx:88-114 (kineticVariants — modify caller structure, not factories themselves)
  - Evidence: `.omo/evidence/motion-whileInView-reliability-fix/task-2-kinetictext.txt`
  - Commit: Y | `fix(KineticText): parent-level whileInView staggerChildren preserves all 4 modes — fixes animation reliability`

- [ ] 3. Refactor WordReveal: same pattern
  - Parent motion.span carries `initial="hidden"`, `whileInView="visible"`, `viewport={{ once: true, margin: '-80px' }}`, `variants={container}` where `container = { hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: delay } } }`
  - Word variant: `{ hidden: { opacity: 0, y: 20, filter: 'blur(4px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } } }`
  - Each WORD motion.span uses `variants={wordVariant}` (no per-word whileInView)
  - Whitespace `\u00A0` static span stays as is (no motion)
  - MUST preserve all existing animation properties (blur, y, opacity)
  - Acceptance: parent has the only whileInView in WordReveal; per-word motion.span has variants only
  - Evidence: `.omo/evidence/motion-whileInView-reliability-fix/task-3-wordreveal.txt`
  - Commit: Y | `fix(WordReveal): parent-level whileInView + staggerChildren — fixes animation reliability`

- [ ] 4. Build + lsp verification (no deployment)
  - Run `npm run build`; assert exit 0
  - Run `lsp_diagnostics` on src/components/RevealText.jsx; assert zero errors
  - Capture artifacts to `.omo/evidence/motion-whileInView-reliability-fix/task-4-build-and-lsp.txt`
  - Commit: N

- [ ] 5. Mobile visual opacity QA — Playwright at 360px/390px/320px on home + about
  - For each h2 with KineticCharReveal/CharReveal/KineticText on home + About:
    - Scroll into view
    - Wait 2s for animations to settle
    - For every motion.span inside the h2: assert `getComputedStyle(span).opacity === '1'`
    - Also assert `getBoundingClientRect().right <= viewportWidth` (no clipping — preserve prior fix)
  - At each of 3 widths (360, 390, 320):
    - Home page: 3 philosophy h2s + 3 philosophy paragraphs
    - About page: 7 KineticText h2s + 1 WordReveal paragraph
  - Record before/after opacity dump as evidence JSON
  - Take viewport screenshots at each width for record
  - Commit: N

- [ ] 6. Deploy to rogue.codes + final live opacity verification
  - Commit message: `fix: parent-level whileInView + staggerChildren for animated text — fixes unreliable char reveal`
  - Push to origin/main → Vercel auto-deploys
  - Wait ~60s, then Playwright live at 360x800:
    - Navigate to https://rogue.codes/
    - Scroll each philosophy h2 into view
    - Assert ALL char motion.span opacity === '1' (currently 17/88 invisible)
    - Navigate About, assert ALL kinetic char spans opacity === '1' (currently 26/33 etc. invisible)
  - Capture live evidence + commit SHA
  - Commit: Y | `fix: parent-level whileInView + staggerChildren for animated text`

## Final verification wave
> All must APPROVE.
- [ ] F1. Plan compliance audit — variants-pattered, single whileInView per component, all 4 KineticText modes preserved
- [ ] F2. Code quality review — clean variants objects, no per-char whileInView anywhere
- [ ] F3. Real manual QA — Playwright per-CHAR opacity assertion === 1 for every animated span (NEW metric, not just geometry)
- [ ] F4. Scope fidelity — only RevealText.jsx touched; no call sites changed; no signatures changed

## Commit strategy
Single atomic commit on `main`:
- Message: `fix: parent-level whileInView + staggerChildren for animated text — fixes unreliable char reveal`
- Files: `src/components/RevealText.jsx`
- Push → Vercel auto-deploys

## Success criteria
- `npm run build` exits 0
- `lsp_diagnostics` zero errors
- At viewport 360/390/320px for home and About pages:
  - For every motion.span inside every animated h2 or p on the page (after scrollIntoView + 2s wait):
    - `getComputedStyle(span).opacity === '1'` (zero invisible chars)
    - `getBoundingClientRect().right <= window.innerWidth` (no clipping — preserves prior fix)
- Live on rogue.codes confirmed via Playwright at 360px after push: zero invisible animated chars
- Commit pushed to `origin/main` and Vercel deployment succeeds