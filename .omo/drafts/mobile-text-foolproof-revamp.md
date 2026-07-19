---
slug: mobile-text-foolproof-revamp
status: awaiting-approval
intent: clear
pending-action: write .omo/plans/mobile-text-foolproof-revamp.md
approach: Apply production-grade motion-primitives TextEffect pattern (word-wrapper + whitespace-pre + \u00A0) to CharReveal, KineticText, and WordReveal so headings and paragraphs cannot lose spaces or letters on any viewport
---

# Draft: mobile-text-foolproof-revamp

## Components (topology ledger)
<!-- Lock the SHAPE before depth. One row per top-level component that can succeed or fail independently. -->
- CharReveal | CharReveal renders all 18+ chars of philosophy headings with visible word spacing, intact animation timing, no clipping on 360-320px | active | references: src/components/RevealText.jsx:25-43; use sites: src/App.jsx:288,312,334
- KineticText-exported | AboutUs kinetic headings render all words with visible spaces, intact per-mode animation, no clipping on 360-320px | active | references: src/components/RevealText.jsx:96-119; use sites: src/components/AboutUs.jsx:355,405,438,466,481,516,541
- WordReveal | Paragraphs render with real inter-word spacing, no clipped words, animation timing unchanged | active | references: src/components/RevealText.jsx:3-23; use sites: src/App.jsx:293,317,339; src/components/AboutUs.jsx:519
- KineticText-local-hero-ascii | DEFERRED - already uses \u00A0 correctly, not broken; revisit only if user reports a hero-section bug | deferred | references: src/components/ui/hero-ascii.tsx:14-31

## Open assumptions (announced defaults)
<!-- Record any default you adopt instead of asking, so the user can veto it at the gate. -->
- Animation timing preserved verbatim | Adopted: keep exact same delay sequences (CharReveal `delay + i * 0.015`, KineticText per-mode transition factories, WordReveal `delay + i * 0.04`), only the DOM structure changes | Why: user asked to "totally revamp the way text is wrote", meaning fix the rendering bug — not redesign the animation UX | Reversible? Yes - delays live in the same `transition` prop
- Local KineticText in hero-ascii.tsx is OUT of scope | Adopted: leave src/components/hero-ascii.tsx:14-31 unchanged | Why: it already uses `{char === ' ' ? '\u00A0' : char}` with `display: 'inline-block'` and works correctly. Minimal-change principle. | Reversible? Yes - if any hero regression surfaces, just apply the same unified pattern.
- Use `whitespace-pre` (CSS) AND `'\u00A0'` substitution as BOTH defense layers | Adopted: apply both `style={{ whiteSpace: 'pre' }}` on word/char spans AND replace space content with `\u00A0` when present | Why: belt-and-suspenders against any one method failing on a quirky engine; matches Mail-0/Zero production pattern. | Reversible? Yes.

## Findings (cited - path:lines)

### User-reported failure on mobile after my prior fix
- User reported: "no spaces between words" and "words still missing letters" on mobile (after I changed CharReveal line 36 from `className="inline"` to `className="inline-block"` and KineticText line 111 from `inline` to `inline-block`, plus added `break-words` to 3 h2 elements in App.jsx).
- File changed: src/components/RevealText.jsx:36,111 (still in HEAD as `inline-block`)
- File changed: src/App.jsx:287,311,333 (still has `break-words` in className)

### Root cause #1 — collapsed space spans (cited CSS behavior)
- Point of failure: a `<span>` containing only the literal `' '` character with `display: inline-block` (or `display: inline` with `whiteSpace: normal` default) collapses visually to zero width per CSS spec — the whitespace is treated as collapsible inter-token whitespace.
- Proof pattern in codebase: WordReveal already uses `<span className="inline-block w-[0.25em]">&nbsp;</span>` (src/components/RevealText.jsx:18) for explicit-width spaces. Loader.jsx:28 and hero-ascii.tsx:26 both substitute `'\u00A0'`. Only CharReveal lets space sit alone in an `inline-block` motion.span — that is why only headings show "no spaces between words".

### Root cause #2 — unbreakable atomic run (cited CSS behavior)
- Adjacent `inline-block` siblings with NO whitespace text node between them form one atomic inline-level run that cannot break. Each CharReveal `motion.span` is `inline-block` and they are direct siblings inside a parent that has no `whiteSpace: pre-wrap` inter-element text nodes.
- Result: the entire h2 heading becomes one atomic line that overflows horizontally on mobile; body's `overflow-x: clip` (src/index.css:8) silently clips both edges → the user's "words still missing letters".

### KineticText-exported still broken (cited)
- Although KineticText has `whiteSpace: 'pre-wrap'` on the outer wrapper (src/components/RevealText.jsx:101), each character is rendered as `style={{ display: 'inline-block' }}` (line 111) with `{char === ' ' ? ' ' : char}` (line 113). The space char sits alone inside an `inline-block` span, collapses to zero width regardless of the parent's `pre-wrap` (parent preserves white space in TEXT NODES, not in inline-block children). Same dual failure as CharReveal.

### Production pattern (verified external evidence)
- Mail-0/Zero motion-primitives `text-effect.tsx` (https://github.com/Mail-0/Zero/blob/staging/apps/mail/components/motion-primitives/text-effect.tsx:122-132): wraps each segment in `<motion.span className="inline-block whitespace-pre">` AND each character in `<motion.span className="inline-block whitespace-pre">`. Uses `whitespace-pre` (CSS `white-space: pre`) on BOTH levels.
- erxes/erxes `frontend/libs/erxes-ui/src/modules/motion/components/TextEffect.tsx:128-138`: identical pattern.
- DavidHDev/react-bits `ScrollFloat.tsx:34`: per-char span with `{char === ' ' ? '\u00A0' : char}` and `className="inline-block word"`.
- waooAI/waoowaoo `TypewriterHero.tsx:80-90`: per-char `display: inline-block` + `{char === ' ' ? '\u00A0' : char}`.
- instantdb/instant `RollingNumber.tsx:68`: only digits get `inline-block w-[1ch] text-center`; non-digit chars use default display (because they don't need to transform).

### Pattern summary (the foolproof shape)
1. Split text into segments by `text.split(/(\s+)/)` (zero-width match keeps whitespace as standalone tokens)
2. Render each WORD segment as an `inline-block whitespace-pre` outer wrapper containing character-level motion spans
3. Render each WHITESPACE segment as an `inline-block whitespace-pre` wrapper containing a single `\u00A0` (non-breaking space) — this guarantees real width even if `white-space` is interpreted loosely
4. The container has `whiteSpace: pre-wrap` + `overflow-wrap: break-word` + `word-break: break-word` so the browser can break lines at whitespace boundaries and, as a last resort, inside a word

### Reasoning about delay sequencing (preserved behavior)
- Each character still gets its own `delay` based on its flat position in the original string, so animation stagger is identical to today.
- Whitespace tokens consume one position in the delay sequence (matches today: CharReveal animates space chars too; KineticText animates its `' '` substituted chars too).

### Use-site scale
- CharReveal: 3 sites, all in `<h2>` in App.jsx philosophy section (the user's symptom)
- KineticText-exported: 7 sites, all in `<h2>` in AboutUs.jsx (same class of bug)
- WordReveal: 4 sites, all in `<p>` (App.jsx x3, AboutUs.jsx x1). User reports paragraph text also suspect ("the way those header text and the paragraph text is wrote").
- KineticText-local (hero-ascii): 4 sites in hero-ascii.tsx — NOT broken (already uses `\u00A0`), DEFERRED.

## Decisions (with rationale)

1. **Adopt production motion-primitives TextEffect pattern as the single source of truth** for all three text animations in RevealText.jsx. Rationale: externally battle-tested; identical approach in 4 production repos; resolves both root causes by construction.

2. **Use word-wrapper approach (split by `/(\s+)/`)** — not raw `split('')`. Each word is one `inline-block` outer span; each whitespace is one `inline-block` outer span. Rationale: browser can wrap at whitespace-boundary atomic units; words stay internally atomic (the correct behavior); space width is guaranteed via `\u00A0` + `whitespace-pre`.

3. **Apply `whiteSpace: 'pre'` to inner spans AND `whiteSpace: 'pre-wrap'` to outer container**. The container allows wrapping; the inner spans prevent space-collapse. Belt-and-suspenders; matches Mail-0/Zero exactly.

4. **Preserve exact animation delay sequencing** — flat char index across the full string OR per-token index counting spaces as one delay slot each. Rationale: zero UX behavior change, only DOM structure changes — fulfills "totally revamp the way text is wrote" without altering the feel.

5. **Maintain current `break-words` Tailwind classes on the 3 h2 in App.jsx** as additional defense-in-depthbelt-and-suspenders protection against overflow.

6. **DEFER the local KineticText in hero-ascii.tsx** unless user reports issue. Rationale: already correct pattern; minimal change principle; not a reported bug site.

7. **Visual verification** at THREE mobile widths — 360px (Android), 390px (iPhone 14), 320px (smallest modern phone). Screenshots stored in `.omo/evidence/webistentevhompage/mobile-text-foolproof-revamp/`.

## Scope IN

### Files to modify (exhaustive list)
- `src/components/RevealText.jsx` lines 3-23 (WordReveal): refactor inner structure
- `src/components/RevealText.jsx` lines 25-43 (CharReveal): refactor inner structure
- `src/components/RevealText.jsx` lines 96-119 (KineticText): refactor inner structure
- No new files created. No new dependencies. No CSS file changes (`break-words` on App.jsx h2s stays; `overflow-x: clip` on body stays — no longer triggered because nothing overflows once word-wrappers allow natural breaking).

### Behavior to keep identical
- All framer-motion `initial` / `whileInView` / `viewport` / `transition` props on each character span (per-component per-variant)
- The 4 KineticText mode variants (`spring`, `wave`, `scatter`, `typewriter`) — same initial/whileInView/transition factories
- WordReveal `&nbsp;` separator pattern stays but inside a word-wrapper structure
- All call-site usages (`<CharReveal delay={0.2}>...</CharReveal>`, etc.) — zero changes needed at call sites

### Deliverables
- Refactored CharReveal, KineticText, WordReveal in RevealText.jsx
- At 360px, 390px, 320px: all 3 philosophy h2s AND all 7 AboutUs kinetic h2s AND all 4 paragraphs render every word, every word renders every letter, every inter-word space has visible width, NOTHING overflows horizontally.
- `npm run build` exits 0
- `lsp_diagnostics` zero errors on RevealText.jsx
- Live on rogue.codes after commit + push

## Scope OUT (Must NOT have)

- No changes to `src/components/ui/hero-ascii.tsx` local `KineticText` (deferred; works correctly)
- No changes to `src/components/ui/ScrambleText.jsx` (not a per-span splitter; not affected)
- No changes to `Loader.jsx` (one-off; uses `\u00A0` correctly)
- No changes to `VariableFontCursorProximity.jsx` (uses `&nbsp;`, `whiteSpace: 'nowrap'`; not affected)
- No removal of the `break-words` Tailwind class on App.jsx h2 lines 287, 311, 333 (keep as defense)
- No removal of `overflow-x: clip` on `html, body` in src/index.css:8 (no longer triggered after fix; defends against future regressions)
- No changes to h1, h3, p, span content text outside the animation components
- No redesign of animation timing, easing, variant definitions, or initial state — only the DOM structure of the spans
- No new components, exports, props, or dependencies
- No changes to `SectionEyebrow` or `SectionHeading` wrappers (they are not splitters)
- No reformat of RevealText.jsx beyond the necessary refactor of the three components
- No removal of the prior `break-words` class from App.jsx h2s
- No changes to App.jsx paragraphs call sites (`<p className="mt-8 text-base leading-relaxed">`)
- No changes to AboutUs.jsx call sites (h2 className attributes leaving as-is)
- No removal or addition of explicit `p.text` / `p.muted` color styles at any call site

## Open questions
None — all root causes confirmed via external production evidence; all defaults adopted and announced; user wants foolproof fix, defaults align with production pattern; no owner-decision forks survive because the fix preserves the existing animation UX verbatim and only changes internal DOM structure.

## Approval gate
status: awaiting-approval
intent: clear
review_required: true (user said "full proof plan")
approach: Refactor three text-animation components (CharReveal, KineticText, WordReveal) in src/components/RevealText.jsx using the production motion-primitives TextEffect pattern: split into word+whitespace segments, wrap each in `inline-block whitespace-pre` outer span, render each character inside word wrappers as `inline-block` motion.span, render whitespace segments as `{'\u00A0'}` with `whitespace-pre`. Preserve all existing animation timings, viewport, transition props. Keep existing `break-words` classes on App.jsx h2s as belt-and-suspenders. Defer the local KineticText in hero-ascii.tsx (already correct pattern).
 topology: 3 active components (all in RevealText.jsx) + 1 deferred (hero-ascii local, not broken)
 scope: src/components/RevealText.jsx only (modified). No call site changes. No CSS changes. No new files.
 verification: npm run build (exit 0); lsp_diagnostics (RevealText.jsx zero errors); Playwright snapshots at 360/390/320px on rogue.codes confirming all headings + paragraphs render with real spaces and no clipping.
 risk: Low - DOM-structure change only, animation behavior identical, production pattern is battle-tested.
<!-- When exploration is exhausted and unknowns are answered, set status: awaiting-approval. -->
<!-- That durable record is the loop guard: on a later turn read it and resume at the gate instead of re-running exploration. -->