# Session Handoff — June 16, 2026

## Project
Website Development Homepage — React + Vite + Three.js + GSAP ScrollTrigger particle landing page
Git repo at `C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\03_Active_Projects\websites\webistedevhompage`

## Stack
- React 19, Vite 8, framer-motion, Three.js, GSAP + ScrollTrigger, Tailwind CSS
- Inter / Space Grotesk fonts
- `http://localhost:5173/website-development-homepage/`

## Particle System — Core Architecture

### Constants
- `N = 6000` particles, `AdditiveBlending`, vertex colors
- Brand palette: `#8052ff` (purple), `#ffb829` (amber), `#15846e` (teal), `#ffffff`
- Canvas texture: stroked equilateral triangle, `lineWidth 3`, hollow

### Morph System (10 arrays, 11 PHASES)
```js
morphs: [brain, scatter, brain, brain, rocket, rocket, topScatter, globe, globe, globeLarge]
           0       1       2      3      4       5        6        7      8       9
```

```js
PHASES = [0, 0.15, 0.25, 0.35, 0.48, 0.62, 0.70, 0.78, 0.86, 0.94, 1]
```

| i0 | Progress | Morph | State | Section |
|----|----------|-------|-------|---------|
| 0 | 0→0.15 | brain→scatter | 0 | 1 Results |
| 1 | 0.15→0.25 | scatter→brain | 0 | 1 Results |
| 2 | 0.25→0.35 | brain→brain | 1 | 2 Tiers |
| 3 | 0.35→0.48 | brain→rocket | 1 | 2→3 trans |
| 4 | 0.48→0.62 | rocket→rocket | 2 | 3 Digital Auth |
| 5 | 0.62→0.70 | rocket→topScatter | 2 | 3→4 trans |
| 6 | 0.70→0.78 | topScatter→globe | 3 | 4 Blueprint |
| 7 | 0.78→0.86 | globe→globe | 3 | 4 Blueprint |
| 8 | 0.86→0.94 | globe→globeLarge | 4 | 5 Edge |
| 9 | 0.94→1 | globeLarge→globeLarge | 4 | 5 Edge |

### STATE_OFFSETS (mesh.position per state group)
```js
[0] [16, 1, 0]    // brain RIGHT
[1] [-26, 1, 0]   // brain LEFT
[2] [0, 0, 0]     // rocket CENTER (STATIC — no movement)
[3] [-16, -1, 0]  // globe LEFT
[4] [0, -14, 0]   // globeLarge BOTTOM
```

### applyState() Logic (critical section)
```js
// morph interpolation
pa[i] = a0[i] + (a1[i] - a0[i]) * t

// position interpolation between STATE_OFFSETS
mesh.position.set(lerp(o0, o1, tState))

// rotation gating
isNoRotRef.current = stateIdx === 2  // rotation disabled during rocket phase

// per-state particle sizes
stateIdx === 2 → mat.size = 0.85   // rocket (bright white)
stateIdx === 4 → mat.size = 1.6    // globeLarge
else → mat.size = 0.8              // default

// color swap (brain ↔ rocket)
if entering stateIdx=2 → copy rocketColors to color buffer
if leaving stateIdx=2 → copy brainColors back
tracked via lastStateIdxRef
```

### phaseAt() Helper
- Maps progress (0-1) to `{ index: i0, t: 0-1 }` using PHASES array
- `stateIdx = Math.floor(i0 / 2)` — groups i0 pairs into 5 states
- `newPhase = Math.floor(i0 / 2)` — drives section opacity

## Shape Generation

### Brain (`generateProceduralRocket NOT — actually head.obj`)
- Loads `head.obj` → `parseObjVertices(t, 'brain')` → 3,398 verts → `normalizeVertices()` → `samplePositions(N, 16)` → centered & scaled [-1,1]
- Hemisphere coloring: x≥0 → amber/green tones, x<0 → purple tones
- Fallback: `generateScatter(N, 16, ...)` with random hemisphere split

### Scatter (`generateScatter(N, spread, ...)`)
- Random positions in cube of size spread
- Used for initial state, transition scatter, and as fallback brain

### Top Scatter (`generateTopScatter(N)`)
- Particles at y=15–40, x=±40, z=±20
- Morphs to globe during section 4 (fall-from-top effect)

### Rocket (`generateProceduralRocket(N, spread=16, density=0.75)`)
- **75%** particles for rocket shape (4500), **25%** for exhaust plume (1500)
- 22° Z-axis tilt (baked into positions)
- Body (55%): bulge cylinder, radius 0.35×spread, slight barrel shape via `1 - 0.15*sin(yNorm*π)`
  - Particles distributed radially using `Math.pow(Math.random(), 0.5)` for even fill
- Nose (20%): cone tapering from 0.35×spread to 0
- Fins (13%): 3 fins at 120°, extending from 0.35→0.65×spread
- Base band (12%): solid disc at bottom of body
- Plume: cone yOff:-0.5→-5.5×spread, radius factor 0.4→4.4, `Math.pow(Math.random(), 0.3)` distribution
  - Covers ~80 units vertically, ~50 units diameter
- **Rocket Colors** (`generateRocketColors`): separate color array swapped into buffer during rocket phase
  - Body/nose: bright white `rgb(0.85-1.0, 0.82-0.97, 0.85-1.0)`
  - Plume: warm amber/orange `rgb(1.0, 0.55-0.75, 0.1-0.25)`
  - Brain colors restored when leaving rocket phase

### Globe (`generateEarthGlobe(N, radius, density=1.0)`)
- `isLand(lng, lat)` based on rough continent polygons
- Particles displaced on sphere surface with jitter
- density=0.7 → 30% stacked at origin (invisible)
- Section 4: radius=16, Section 5: radius=30
- No equator ring

## Kinetic Text

### KineticLines Component
```jsx
<KineticLines key={phase} as="h1" lines={['...', '...', '...']} style={...} />
```
- Uses `motion(as)` — without this, plain `<Tag>` ignored framer-motion props
- `key={phase}` forces re-mount on every section entry → animation replays
- Spring stagger: stiffness 120, damping 18, stagger 0.2s

### Section Content
1. **Results** — "50+ Projects Delivered / 3x Faster Than In-House / 100% Code Ownership" + CTAs
2. **Tiers** — "Every tier solves a specific problem. Pick the one that fits."
3. **Digital Authority** — Cycling build cards (see below)
4. **Blueprint** — "AI meets infrastructure. Built in 30 days. Shipped with confidence." + weekly breakdown
5. **Edge** — "AI-Native Team / 3x Faster Delivery / One Point of Contact / Global Talent" + email CTA

## Section 3 — Build Card Cycling (NEW)

### Current Implementation
```jsx
const [buildIdx, setBuildIdx] = useState(0)
useEffect(() => {
  const timer = setInterval(() => setBuildIdx(p => (p + 1) % 3), 2500)
  return () => clearInterval(timer)
}, [])
```

3 cards cycle via `AnimatePresence mode="wait"`:
1. **THE VELOCITY BUILD** (#9d7aff) — "Digital authority established in weeks, not months."
2. **THE GROWTH STACK** (#ffb829) — "High-performance infrastructure built for scale."
3. **THE APEX ARCHITECTURE** (#15846e) — "Bespoke experiences pushing the limits of the browser."

Entry animation: `{ opacity: 0, y: 30, scale: 0.92 } → { opacity: 1, y: 0, scale: 1 }`
Exit animation: `{ opacity: 0, y: -30, scale: 0.92 }`
Transition: spring, stiffness 280, damping 22

Note: To prevent absolute positioned child elements from collapsing the parent's width (which was causing text squishing into a narrow vertical column of single words), the parent container is explicitly styled with `width: '100%'`, `maxWidth: '600px'`, and padding.

Note: Timer runs regardless of scroll position — may need to gate with `phase === 2` check.

## Canvas & Rendering
- `WebGLRenderer` with `alpha: true`, `antialias: true`, pixel ratio capped at 2
- `z-index` removed (was hiding particles behind container black bg)
- `pointer-events: none` on canvas prevents click interference
- Resize handler updates camera aspect, renderer size, camera distance (z=35→60 based on aspect)
- Animate loop: `requestAnimationFrame`, rotation += 0.002 (when not gated)

## Loaded Assets
- `public/models/head.obj` — drummyfish CC0 MRI head, brain only (3,398 verts)
- blub.obj and fish.obj removed (no longer used)
- OBJ files loaded via `import.meta.env.BASE_URL` prefix

## Session Notes

### Changes Made This Session
1. Extended rocket phase scroll range (0.48→0.64 → 0.48→0.70) → reverted to balanced 0.48→0.62
2. Rocket density: 0.25→0.50→0.32→0.25→0.55 (settled on 55% for denser shape)
3. Plume widened and lengthened (radius 0.4→4.4, yOff -0.5→-5.5)
4. Rocket movement removed: was y:-30→+10 rising + z:-30→+30 zoom → now static at origin
5. STATE_OFFSETS[2] changed from [0,-1,0] to [0,-31,0] (for rising) → back to [0,0,0] (static)
6. Particle size for rocket: 0.2→0.4, then 0.08→0.12, then 0.15, then 0.35, settled at 0.55
7. Section 3 build cards converted from static stacked list to cycling AnimatePresence carousel
8. Rocket colors fixed — added `generateRocketColors` function with bright white body + amber plume, swaps into color buffer during rocket phase via `lastStateIdxRef` tracking

### Rolling TODO (still relevant)
- Consider gating the build card cycling timer with `phase === 2` so it only runs during section 3
- Rocket particle size (0.55) may need further tuning vs brain/globe (0.8)
- Build card cycle interval (2.5s) may need adjusting
- Font: Inter / Space Grotesk via Google Fonts (verify loading)

### Build Commands
```powershell
npm run dev         # dev server at :5173
npm run build       # production build to dist/
```

### Dev Server Restart
```powershell
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Process cmd -ArgumentList "/c npm run dev" -WindowStyle Hidden
# Wait ~10s for startup
```

## Files
| File | Purpose |
|------|---------|
| `src/components/CosmicParticlePage.jsx` | Main particle landing page (~675 lines) |
| `public/models/head.obj` | Brain mesh (3,398 verts) |
| `.opencode/handoff.md` | This file — session handoff |

## Relevant Code Locations
- `generateRocketColors` — line 175
- `generateProceduralRocket` — line 197
- `generateEarthGlobe` — line 274
- `loadMorphData` / morph array assembly — lines 379-404
- `applyState` — lines 467-519
- PHASES constant — line 292
- STATE_OFFSETS — lines 293-298
- Section 3 build card cycling — lines 353-356 (state), 597-625 (JSX)

---

# Session Handoff — June 18, 2026

## About Us Page — `src/components/ui/hero-ascii.tsx`

### Overview
- Exported as `Home` (default), routed from `App.jsx` when `showAbout=true`
- 8 sections: Hero, Our Story, Stats, What We Build, Process, CTA/Contact, Footer
- Full ORYZO design system applied: `#100904` dark canvas, `#ffedd7` warm cream text, `#dc5000` burnt sienna accents
- Font: `Plus Jakarta Sans` via `font-family` on section containers
- Animated via framer-motion `whileInView` with `viewport: { once: true }`

### Sub-Components (inline in hero-ascii.tsx)

**KineticText (lines 7-24):**
- Function component: wraps each character in a `<span>` and applies staggered `whileInView` animation
- Props: `children`, `delay`, `className`, `style`
- Animation: `{ y: 40, opacity: 0 }` → `{ y: 0, opacity: 1 }`, transition `{ duration: 0.5, delay: delay + i * 0.03 }`
- Used for: "PERFECT PROPORTIONS", "Design, engineered with precision.", "What We Build" section title

**SectionDivider (line 26-30):**
- Dashed line: `<div style={{ borderTop: '1px dashed rgba(220, 80, 0, 0.3)' }} className="w-full my-8 lg:my-12" />`
- Color: `#dc5000` (burnt sienna) at 30% opacity

**ParallaxSection (lines 32-45):**
- Uses `useScroll`, `useTransform` from framer-motion
- Parallax offset range: `[0, 1]` → `[0, -60]` (scrolls up slower than page)
- Combined with opacity fade: `useTransform(scrollYProgress, [0, 1], [1, 0.4])`
- Renders as `<motion.section>` wrapped around children

**StatBlock (lines 47-62):**
- Animated counter: `useMotionValue` + `useTransform` to round number
- `whileInView` transitions the `motionValue` from 0 to target
- Formatting: `<motion.span>` inside a `<div>` with `font-bold font-mono`

**FeatureCard (lines 64-83):**
- Alternating `x` offset based on `index % 2`: left cards slide from `-80px`, right from `80px`
- Combined with opacity `[0, 1]` transition
- `viewport: { once: true }` with `margin: "-100px"` for early trigger

### Hero Section Structure (lines 157-283)

**Desktop — Unicorn Studio Embed:**
```
<iframe src="https://unicorn.studio/embed/..." />
```
- Full-height, full-width iframe with `allow="autoplay"` + pointer-events: none
- Displays Vitruvian man animated figure
- Hidden on mobile via `hidden lg:block`

**Mobile fallback (lines 193-195):**
- Starfield: repeated CSS `radial-gradient` dots on dark background
- Shown only on `lg:hidden`

**Text Overlay (lines 198-274):**
- "PERFECT PROPORTIONS" — `KineticText`, 80px font, `tracking-tighter`, `font-light`
- Subtitle: "Design, engineered with precision." in 15px
- Two CTA buttons: "VIEW OUR WORK" (outlined) + "GET STARTED" (filled `#dc5000` bg)
- Corner accents: four `div` elements with thin borders (top-left, top-right, bottom-left, bottom-right)
- System status bar: "SYSTEM.ACTIVE V1.0.0" with pulsing dots

**InkReveal Overlay (lines 276-282):**
```tsx
<InkReveal
  maskColor={[196, 195, 182]}
  brushSize={140}
  lifetime={600}
  stampStep={10}
  style={{ zIndex: 30, cursor: 'crosshair' }}
/>
```
- Overlays entire hero section at z-index 30
- Section background `#c4c3b6` (putty) matches mask color — painting reveals content without visible color shift
- Cursor: crosshair

### Section Content

**Our Story (lines 286-326):**
- Tag: "ABOUT — 01"
- 2-column grid: left has "Design, engineered with precision." kinetic text, right has paragraph about precision approach
- Parallax fade on scroll

**Stats (lines 334-343):**
- 4-column grid of `StatBlock`s:
  - "50+" Projects Delivered
  - "3x" Faster Than In-House
  - "100%" Code Ownership
  - "30" Day Execution

**What We Build (lines 351-403):**
- 3×2 grid of `FeatureCard`s
- Cards alternate slide direction based on row
- Topics: Websites, Web Apps, E-Commerce, SaaS Platforms, APIs & Backend, Design Systems

**Process (lines 411-459):**
- 4 steps: Discovery, Design, Development, Launch
- Dashed dividers between steps
- Each step has: heading, description, "0X" number

**CTA/Contact (lines 467-532):**
- Background: `#dc5000` (burnt sienna)
- "Ready to build? Let's talk."
- Email input with "SEND" button
- Footer links: UIMIX branding, year

**Footer (lines 535-561):**
- Two-column: UIMIX branding left, "About / Work / Contact" links right
- Bottom bar: copyright + "Built with precision."

---

## InkReveal Component — `src/components/ui/ink-reveal.tsx`

### Architecture

Canvas-based paintbrush reveal effect:
1. Fill canvas with `maskColor` using `source-over`
2. User moves mouse → stamps added along path with radial gradient
3. Stamps drawn using `destination-out` compositing (carves through the mask)
4. Wobble distortion makes stamps look organic (not perfect circles)

### Props

| Prop | Default | Description |
|------|---------|-------------|
| `maskColor` | `[252, 250, 248]` | RGB color of the mask overlay |
| `brushSize` | `128` | Radius of each ink stamp in px |
| `lifetime` | `600` | How long each stamp lives before expiring (ms) |
| `rStart` | `10` | Initial radius before stamp expands (ease-out cubic) |
| `rVary` | `0.45` | Random variation factor for stamp radius (0–1) |
| `stampStep` | `10` | Min pixel distance between stamps along a stroke |
| `maxStamps` | `200` | Max stamps alive at once (oldest shifted out) |
| `segments` | `36` | Number of segments on the wobble circle |
| `wobble` | `[0.14, 0.08, 0.05]` | Wobble amplitude weights [primary, secondary, tertiary] |
| `gradientInnerRadius` | `0.2` | Gradient inner-radius factor (0–1, relative to stamp radius) |
| `gradientStops` | `[0.95, 0.88, 0]` | Gradient opacity stops [center, mid, edge] |
| `permanent` | `true` | If true, carved areas stay revealed (no mask redraw) |
| `autoRevealThreshold` | `0.3` | 0–1 fraction of cleared area to trigger auto-reveal (0 disables) |
| `autoRevealStaggerMs` | `4` | ms stagger between each grid stamp during auto-reveal |

### Permanent Mode (`permanent = true`)

When permanent:
- `loop` **skips** the `source-over` mask fill (`ctx.fillRect`)
- Stamp alpha = `1.0` (no fade — one-shot clear)
- The initial mask is drawn once in `resize()` and never redrawn
- Stamps carve permanently into the canvas

When permanent = false (legacy mode):
- Every frame: redraw the mask via `source-over` `fillRect`, then draw stamps with `destination-out`
- Stamp alpha = `1 - t²` (fades over lifetime)
- Mask fills back in as stamps expire — ephemeral reveal

### Coverage Check (`checkCoverage`)

Samples canvas alpha channel to determine what fraction is cleared:
- Calls `ctx.getImageData(0, 0, w, h)` for the full canvas
- Samples every 40px in both x and y directions
- Counts pixel as "cleared" if alpha channel < 128
- Returns `cleared / total` ratio (0–1)
- Runs every frame inside `loop` while user stamps are active
- Gated: only runs when `!autoRevealingRef.current && autoRevealThreshold > 0`

### Auto-Reveal Mechanism (`triggerAutoReveal`)

When coverage ratio >= `autoRevealThreshold`:

1. Sets `autoRevealingRef.current = true` and `revealedRef.current = true`
2. Generates a rectangular grid of stamps across the full canvas:
   - Spacing: `brushSize * 0.55` (ensures overlapping stamps for full coverage)
   - Each stamp's `born = performance.now() + i * autoRevealStaggerMs`
   - Seed: random per stamp
   - Rmax: `brushSize` (no variation — full clear)
3. Pushes all grid stamps into `stampsRef.current`
4. Starts RAF loop if not already running

During auto-reveal animation:
- Loop skips stamps with `t < 0` (future-born) via `if (t < 0) continue`
- Each stamp renders at full alpha (permanent) with ease-out cubic radius growth
- Total animation time: ~gridCount × staggerMs (e.g., 350 stamps × 4ms = 1.4s)
- Mouse input disabled via `revealedRef` check in `onMouseEnter`/`onMouseMove`
- `autoRevealingRef` prevents recursive coverage checks during animation

### Wobble Rendering (`carveInk`)

Each stamp draws a radial gradient with wobble-distorted path:
- Radial gradient: center at `gradientInnerRadius * r`, edge at `r`
- 3 gradient stops: center opacity, mid opacity, edge opacity (× overall alpha)
- Path: 36 segments (`segments`), each point displaced:
  ```
  wobble = 0.78
    + wobble[0] * sin(a * 3 + seed)
    + wobble[1] * sin(a * 5 + seed * 2.1)
    + wobble[2] * sin(a * 7 + seed * 0.7)
  ```
- The 0.78 base factor shrinks slightly below unit circle for natural brush feel

### Stamp Lifecycle

- Added via `addStamp` (single) or `stampAlong` (interpolated along mouse path)
- Max 200 stamps (`maxStamps`); oldest shifted out when limit reached
- Each stamp: `born`, `x`, `y`, `seed`, `rmax`
- In loop: stamps with `t >= 1` are spliced out; stamps with `t < 0` are skipped (future-born)
- When stamp queue empties, `runningRef.current = false` and RAF stops

### Resize Handling

- `resize()` called on mount and window resize
- Captures `parent.getBoundingClientRect()` for dimensions
- Applies `dpr` (device pixel ratio, capped at 2)
- Fills canvas with mask color on every resize (important for permanent mode)
- Sets `ctx.setTransform(dpr, 0, 0, dpr, 0, 0)` for proper HiDPI rendering

## InkReveal Component Evolution

### Version History

**V1 (early session):** First implementation with `permanent`, `autoReveal`, `revealThreshold`, `checkCoverage` props. Auto-reveal used staggered grid but had bugs — stale stamps, `t < 0` not handled, loop RAF chaining issues.

**V2 (clean replacement):** User provided a clean source version. Removed ALL auto-reveal and permanent logic. Simple ephemeral reveal: redraw mask every frame, stamps always fade. Props removed: `permanent`, `revealThreshold`, `autoReveal`, `checkCoverage`.

**V3 (current — June 18):** Re-added permanent mode + auto-reveal with correct implementation:
- `permanent` prop (default `true`): conditional mask redraw, alpha = 1 when permanent
- `autoRevealThreshold` (default `0.3`): coverage check every 40px grid
- `autoRevealStaggerMs` (default `4`): staggered stamp birth for brush animation effect
- `revealedRef` / `autoRevealingRef`: prevent double-triggering and recursive checks
- `loopRef` pattern: avoids circular dependency between `loop` and `triggerAutoReveal`
- Mouse gating: mouse handlers return early if `revealedRef.current` is true

### Key Decisions

1. `permanent=true` as default — user explicitly requested revealed areas stay revealed
2. Grid spacing = `brushSize * 0.55` — tighter than the typical brush interval to ensure full coverage with overlap
3. No `rVary` during auto-reveal — `rmax = brushSize` (fixed) for uniform clear
4. Coverage sample every 40px — balances performance vs accuracy for a 1920×1080 canvas (~1296 samples)
5. `loopRef` pattern over direct `loop` dependency — avoids React hook circular dependency warning
6. `revealedRef` + `autoRevealingRef` are separate guards — revealedRef gates mouse input, autoRevealingRef gates coverage checks (prevents re-trigger during animation)
7. `stampsRef.current` uses `push(...stamps)` for auto-reveal rather than replace — preserves any in-flight user stamps (though they're effectively irrelevant once revealed)
8. `getImageData` on full canvas — called every frame during user painting. Could be optimized to sample less frequently, but acceptable for brief painting sessions before auto-reveal triggers

### Known Footguns / Edge Cases

1. `getImageData` is called every frame while user stamps are active — on a 4K display this could be ~8MB per frame. The 40px stride mitigates this to ~1296 pixels checked per frame, but the full `getImageData` call still reads from GPU memory.
2. If `permanent=false` and `autoRevealThreshold > 0`, the auto-reveal will trigger but the mask will immediately fill back in — nonsensical configuration. Not guarded.
3. Resize while auto-reveal is animating: `resize` redraws the mask (filling entire canvas), which would undo the auto-reveal progress. Stamps continue animating and re-carve, but there's a visible flash.
4. Auto-reveal grid count grows with canvas size: for `brushSize=140`, a 3840×2160 canvas would generate ~1400 stamps at 4ms = 5.6s animation. For very large canvases this could feel slow.
5. The `loopRef` is set after `loop` is defined (`loopRef.current = loop`). On very first render, if `triggerAutoReveal` somehow fires before the first RAF, `loopRef.current` would be the no-op initial value. In practice this can't happen because auto-reveal requires user interaction first.
6. `stampAlong` interpolates stamps along the mouse path using `stampStep` — with `stampStep=10`, a fast mouse swipe across 1920px generates ~192 stamps, immediately hitting `maxStamps=200` limit.
7. Canvas `getContext('2d')` calls are not cached in a ref — each function that needs the context calls `canvas.getContext('2d')` again. This is safe but slightly wasteful. Not a perf concern in practice.

## Files

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/ui/ink-reveal.tsx` | 299 | Canvas ink reveal component with permanent + auto-reveal |
| `src/components/ui/hero-ascii.tsx` | 564 | About Us page (exported as `Home`) |
| `src/components/ui/demo.tsx` | 29 | Standalone InkReveal demo with Unsplash image |
| `src/App.jsx` | 354 | Conditional routing: showAbout → `<Home />` |
| `src/components/AboutPage.jsx` | 5 | Orphaned wrapper (not wired in App) |
| `src/components/CosmicParticlePage.jsx` | 815 | Orphaned particle experience |
| `src/index.css` | 275 | Tailwind + shadcn tokens + hero CSS classes |

## ORYZO Design System Tokens (applied in hero-ascii.tsx)

```
Dark canvas:    #100904    (bg sections)
Warm cream:     #ffedd7    (body text, headings)
Burnt sienna:   #dc5000    (accents, CTAs, dividers, links)
Putty:          #c4c3b6    (hero bg, matches InkReveal mask)
Charcoal:       #1a1a1a    (secondary bg)
Graphite:       #595855    (muted text)
Paper:          #ffffff    (hero text in ink layer)
Ink:            #000000    (hero UI chrome — status bar, corner accents)
Bone:           #e7e5e4    (light accents)
Chalk:          #ebebeb    (alternate light accents)
Vellum:         #dfdcd5    (mid-tone accents)
```

## Build & Dev Commands

```powershell
npm run dev                  # Vite dev server at :5173
npm run build                # Production build to dist/
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force; Start-Process cmd -ArgumentList "/c npm run dev" -WindowStyle Hidden   # Dev restart
```
