---
slug: mobile-heading-clip-fix
status: approved
intent: clear
pending-action: write .omo/plans/mobile-heading-clip-fix.md
approach: Fix CharReveal & KineticText components + add word-breaking to h2s in App.jsx philosophy section to prevent mobile text clipping
---

# Draft: mobile-heading-clip-fix

## Components (topology ledger)
- src/components/RevealText.jsx — CharReveal + KineticText components (character-level animation)
- src/App.jsx — 3 h2 elements in "Our philosophy" section using CharReveal
- src/index.css — html, body has overflow-x: clip

## Findings (cited - path:lines)

### Root cause: `display: inline` on character-level motion spans prevents proper word-breaking on some mobile browsers
- CharReveal (RevealText.jsx:36) uses `className="inline"` on each character's motion.span
- KineticText (RevealText.jsx:111) uses `style={{ display: 'inline' }}` on each character's motion.span
- CSS transforms (`y: 30` in CharReveal, `scale: 0.3` etc. in KineticText) DO NOT work on `display: inline` elements — this is a well-known CSS limitation
- Real-world production examples (motion-primitives, luxe, openagents) ALL use `inline-block` for animated character spans, never `inline`

### Clipping mechanism
- body has `overflow-x: clip` (index.css:8) — any horizontal overflow is silently clipped
- The inline character spans on mobile (360px) form a continuous inline run that some mobile browsers cannot word-break
- The h2 elements themselves have `wordBreak: normal`, `overflowWrap: normal` — no break-word at the h2 level
- Result: heading extends beyond viewport → overflow-x: clip clips both right AND left edges

### User confirmation
- Android ~360px width
- "right and left clipped" — confirms bilateral overflow clipping
- "Only headings clipped, paragraphs render fine" — consistent with CharReveal (headings) vs WordReveal (paragraphs) using different display models

## Decisions (with rationale)
1. **Change CharReveal character spans from `inline` → `inline-block`** — fixes transform support AND enables proper word-breaking on mobile. Production precedent.
2. **Change KineticText character spans from `style={{ display: 'inline' }}` → `style={{ display: 'inline-block' }}`** — same fix for AboutUs page kinetic headings. Prevents future issues.
3. **Add `break-words` class (overflow-wrap: break-word) to all 3 h2 elements in App.jsx philosophy section** — belt-and-suspenders: ensures even if the inner span fails to break, the h2 itself forces breaks.

## Scope IN
- RevealText.jsx: CharReveal character span `inline` → `inline-block`
- RevealText.jsx: KineticText character span `display: inline` → `display: inline-block`  
- App.jsx: Add `break-words` class to 3 h2 elements in philosophy section (lines 287, 311, 333)
- Build and verify: `npm run build` passes

## Scope OUT (Must NOT have)
- No changes to WordReveal component (paragraphs, not affected)
- No changes to SectionEyebrow or SectionHeading
- No changes to ScrambleText
- No redesign or restyling
- No changes to any other sections or pages

## Open questions
None — all factual.

## Approval gate
status: approved
commit: 99fa1ff
