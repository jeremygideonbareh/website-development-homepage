# Handoff — 22 Jun 2026

## Status
Build ✅ | Site rebranded from Horizon Labs → **Rogue Code** | Meta tags rebranded from ApexAI → Rogue Code | Cloudflare Pages deploys from `main`

## Current Implementation
- **Hero** (`MountEverestScene.jsx`) — Looping fullscreen `<video>` (fog + shooting stars, 1080p, H.264, 24fps, 9.2 Mbps) with gradient overlay, day/night palette. Video sharpening: `filter: contrast(1.08) brightness(1.02)` + `willChange: 'filter'` (avoids Windows Chrome GPU blur bug from `translateZ(0)`)
- **AboutUs.jsx** — Art-gallery layout: hero photo cluster (5 GalleryPhoto components at staggered rotations/positions), split-screen story with left/right entrance, animated stat counters (50+, 3x, 100%, 24/7), 4 value cards alternating left/right entrance, team cards with alternating entrance, story section with drop cap + photo strip + pull quote + alternating text/image, horizontal scroll process (4-step via HorizontalScrollSection), scrollable project showcase by category with arrow nav, full-bleed photo CTA
- **GalleryPhoto.jsx** — Abstract-positioned photo with configurable rotate, offsetX/Y, width, from-side entrance animation, hover scale
- **HorizontalScrollSection.jsx** — Sticky container + horizontal track using framer-motion `useScroll` + `useTransform`
- **KineticText** (`RevealText.jsx`) — WordReveal, CharReveal, SectionEyebrow, KineticText (4 modes: spring/wave/scatter/typewriter)
- **ServicesSection** — 3 cards with BrowserFrame Awwwards preview grid, PreviewModal (full-screen iframe with macOS chrome)
- **AnimatedBeamTimeline** — Sticky horizontal scroll (4×100vw cards), mobile vertical fallback
- **WhyUsSection** — Horizontal snap scroll with arrow nav + NetworkParticles Three.js background
- **Day/Night toggle** — Night default (#1A1817 bg, #FF6B4A accent, #F2F2F2 text), Day (#F5F0EB, #E85D3A, #1A1A1A)
- **Font** — Satoshi (via Fontshare CDN, aliased `aeonik` in tailwind.config.js, fallback Inter → system-ui → sans-serif), JetBrains Mono for monospace/ASCII
- **Color palette** — Obsidian `#101010`, frost `#f3f3f3`, amber `#e7c59a`, smoke `#949494`
- **Dead code cleanup** — Deleted HorizonHeroSection.jsx, AsciiRevealBox.jsx, removed AsciiDecorations from App.jsx CTA area, removed AsciiRain from StarryBackground.jsx (starry bg not in use)

## What Was NOT Saved (previous session)
- AdamHands.jsx (2D canvas ASCII Creation of Adam) and HyperstudioHero.jsx were described but never written to disk
- Hero is still MountEverestScene, not the planned ASCII hands hero

## Latest Changes (22 Jun 2026)
- **Brand Story** — Converted from 3 stacked text blocks to split-screen text+photo layouts alternating left/right, using cinematic Unsplash photos (GalleryPhoto with rotate/entrance animations)
- **Photo interlude** — Added horizontal scrollable cinematic photo strip between "AI meets infrastructure" heading and AnimatedBeamTimeline (5 photos with staggered rotations)
- **CTA** — Replaced plain text CTA with full-bleed cinematic photo background CTA (gradient overlay, accent button, matching About Us style)
- **Eyebrows** — Reduced from 3 to 1 (only "Our Philosophy" kept) per max-1-per-3-sections design rule

## Pipeline
- `npm run dev` — Vite 8 dev server + HMR on port 5173
- `npm run build` — production build to `dist/`
- Cloudflare Pages auto-deploys from `main`. Vite base: `"/"` for root-level serving
- **Build gotcha:** `npm install` on Windows won't include Linux x64 native bindings in lockfile. `@rolldown/binding-linux-x64-gnu` + `lightningcss-linux-x64-gnu` must be explicit dependencies

## Bundle
- JS: ~1,375 kB (index-*.js) — warning threshold exceeded
- CSS: ~50.87 kB (index-*.css)

## Key Decisions
1. **Rebrand: Horizon Labs → Rogue Code** — App.jsx footer, AboutUs.jsx (7 places), MountEverestScene.jsx
2. **Rebrand: ApexAI → Rogue Code** — All index.html meta tags, OG tags, Twitter cards, JSON-LD structured data, offer names
3. **About Us as art gallery** — Photos at abstract tilts/positions, alternating left/right section entrance, horizontal scroll process track
4. **No Three.js for hands** — 2D canvas approach using Wikimedia painting reference (not implemented yet)
5. **Dead code cleanup** — Deleted HorizonHeroSection.jsx, AsciiRevealBox.jsx, removed ASCII rain/decorations from main page

## Latest Changes (05 Jul 2026) — Orchestrated Fixes
1. **🔧 Websites Not Loading FIXED** — Replaced all iframe-based previews with screenshot thumbnails via `api.miniature.io`:
   - `BrowserFrame.jsx`: iframe → `<img>` screenshot with favicon/domain fallback
   - `ServicesSection.jsx` PreviewModal: iframe → screenshot with "Open in new tab" fallback
   - `ExamplesPage.jsx` `IframePreview`/`IframeModalPreview`: renamed to `ScreenshotThumbnail`/`ScreenshotModalPreview`, iframes replaced with screenshots
   - Removed `blockedSites`/`isBlocked` dead code
   - Multi-layer fallback: screenshot → favicon + domain → "Visit site" button

2. **🎨 Brand Consistency FIXED** — All remaining Horizon Labs → Rogue Code artifacts:
   - `App.jsx` line 132: Logo flash "HORIZON" → "ROGUE CODE"
   - `Loader.jsx` line 35: "HORIZON" → "ROGUE CODE"
   - `AnimatedBeamTimeline.jsx`: "ApexAI vibe" → "Rogue Code vibe"
   - `package.json`: `"rouge-code"` → `"rogue-code"`

3. **⚡ Interactivity ADDED**:
   - `CursorGlow.jsx` — Custom cursor follower with mix-blend-mode dot + glow ring, expands on hoverable elements
   - `NoiseOverlay.jsx` — Canvas-based animated grain texture (~4fps) for visual depth
   - `useMouseParallax.js` — Custom hook for parallax mouse tracking on elements
   - Integrated into `App.jsx` root layout

4. **📦 Build Config FIXED**:
   - `vite.config.js`: Removed dead `optimizeDeps.include` for splinetool packages
   - `vite.config.js`: Added code chunk splitting (vendor-react, vendor-motion, vendor-three, vendor-icons)
   - `package.json`: `framer-motion` moved from devDependencies → dependencies
   - **Bundle now split**: vendor-three (879 kB), vendor-react (182 kB), vendor-motion (136 kB), index (194 kB), vendor-icons (20 kB)
   - Build time improved: 3.90s → 2.52s

5. **🧹 Dead Code Removed**:
   - `ExamplesPage.jsx`: Removed unused `isBlocked()` function, removed unused `Loader2` import

## What Hasn't Been Done
- ASCII Creation of Adam hands hero (AdamHands.jsx + HyperstudioHero.jsx)
- GitHub Actions CI
- Using MCP servers (shadcn, threejs, gemini, apify — all configured, none used)
- Lazy-loading Three.js/WhyUsSection for further bundle reduction

## Session — 06 Jul 2026 — Hero Mobile Fix

### Done
- **Switched active hero** from `MountEverestScene` to `PrismaHero` (`src/components/ui/prisma-hero.jsx`) — fullscreen video background with noise overlay
- **Fixed content positioning** (`prisma-hero.jsx:109`): `absolute bottom-[10%]` → `absolute inset-0 flex flex-col justify-end lg:justify-center pb-[15%] sm:pb-[10%] lg:pb-[5%]` — prevents content cramming at bottom on mobile
- **Touch targets** (`prisma-hero.jsx:143`): icon container `h-9 w-9` → `h-11 w-11` (44px minimum, Apple HIG compliant)
- **Description text** (`prisma-hero.jsx:128`): `text-xs` → `text-sm` (12px → 14px minimum)
- **Video poster** (`prisma-hero.jsx:97`): added dark SVG data URI `poster` attribute for mobile browsers that block autoplay
- **Reduced motion** (`prisma-hero.jsx:9,13-14,43,52-54`): wired `useReducedMotion()` into `WordsPullUp` and `WordsPullUpMultiStyle` — skips animations when `prefers-reduced-motion: reduce`
- **Heading tracking** (`prisma-hero.jsx:115`): `tracking-[-0.05em]` → `tracking-[-0.05em] sm:tracking-[-0.03em]` — looser on mobile for readability
- **CPH site** (`homepage3.html` hackathon): fixed section width inconsistencies (duplicated CSS, missing `w-full` on hero, missing `max-w-6xl mx-auto` on team grid, added `fade-in-section` to hero)
- **CPH deployed** to GitHub Pages `gh-pages` branch: `https://jeremygideonbareh.github.io/website-development-homepage/`
- **Rogue Code committed** `3825027` to `main`, auto-deploys via Cloudflare Pages

### Fixed (07 Jul 2026)
- **Hero text overflow** — Removed `overflow-hidden rounded-2xl` from inner hero div (clipped text at rounded corners). Reduced `pb-[15%]`→`pb-[10%]`, changed heading `leading-[0.9]`→`leading-[1.1]` (descender overlap), `text-[clamp(2rem,5vw,4rem)]`→`text-[clamp(1.5rem,4vw,4rem)]` (smaller min size)
- **Philosophy section alignment** — Added `overflowX: 'hidden'` to scrollable wrapper, `py-32`→`py-24` for tighter mobile padding, `w-full` to all `max-w-xl` text containers, `gap-12`→`gap-8` on grids
- **WordReveal overflow** — Added `overflowWrap: 'break-word', wordBreak: 'break-word'` to `WordReveal` component
- All pushed in `29db136`

### Unresolved
- Verify on physical mobile devices
  - `PrismaHero` uses `position: fixed` + `overflow: hidden` — may clip content on mobile Safari during address bar hide/show
  - `WordsPullUp` animation may cause layout shift during initial load
  - Video background may have wrong aspect ratio or z-index stacking issue with loader/logo-flash transition
  - The `pb-[15%]` may still be too low on very short viewports (<600px height)
  - Loader (`Loader.jsx`) → logo flash (`App.jsx` lines 115-136) → hero transition may have timing/opacity overlap that hides hero content initially
  - Check if `showLogoFlash` state is blocking hero visibility during the 800ms flash

## Session — 07 Jul 2026 — Stacking Context Fix + Team Section

### Fixed
- **ServicesSection invisible on mobile** — `motion.div` wrapper at `App.jsx:138` had `will-change: transform` injected by framer-motion, creating a CSS stacking context that trapped `z-index: 10` inside it. PrismaHero (`position: fixed; z-index: 0`) painted at step 6 of the root context — above the section. **Fix:** added `style={{ position: 'relative', zIndex: 1 }}` to the `motion.div` to bring it to the same stacking step as PrismaHero.
- **ServicesSection no background** — Added `style={{ backgroundColor: isDay ? '#F5F0EB' : '#1A1817' }}` to section element so hero doesn't show through transparent section.
- **Card backgrounds near-transparent on night mode** — Replaced `rgba(255,255,255,0.06)` gradients with solid `#2A2827` fallback. `backdrop-filter: blur(12px)` still layered on top for supporting browsers.
- **overflow-x:hidden moved from wrapper to html/body** — Previously on wrapper div (broke sticky sections like AnimatedBeamTimeline). Moved to `html, body { overflow-x: hidden }` which prevents horizontal scrollbar without creating scroll containers.
- Commits: `d9aebbd`, `2bdb8ba`

### Added
- **TeamSection** (`src/components/TeamSection.jsx`) — New section on main page after WhyUsSection, before CTA. Glass-morphism cards with photo, role, bio, social icons. Stagger-reveal animations.
  - Jeremy Gideon Bareh — Lead Developer
  - Aaron Jaison — Co-Developer
  - Ashba Merim Francis — Sales
- Commit: `a362264`

### Project URL
- **Rogue Code (main site):** `https://rogue.codes` (Cloudflare Pages, auto-deploys from `main`)

### Branch
- `main` — Rogue Code site
- `gh-pages` — CPH homepage3.html deploy
