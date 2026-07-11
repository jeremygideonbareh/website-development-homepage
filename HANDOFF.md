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

## Session — 10 Jul 2026 — Sticky Horizontal Scroll Fixed (Real Root Cause)

### Root Cause — `overflow-x: hidden` on `html, body` Breaks `position: sticky`
The previous background/bridge fix was a symptom patch. The **real root cause**: `overflow-x: hidden` on `html, body` (`index.css:5-7`) creates a **CSS scroll container** on the viewport, causing `position: sticky` to anchor to `html` instead of the viewport. In Chrome, this silently breaks ALL sticky behavior — `AnimatedBeamTimeline`'s sticky horizontal track never sticks, so the 500vh section scrolls past like normal content, showing a 500vh gap of empty background before hitting WhyUsSection.

### Fixes
1. **`src/index.css:5-7`** — `overflow-x: hidden` → `overflow-x: clip`. `clip` is visually identical (clips horizontal overflow) but **does not create a scroll container**, preserving sticky behavior. Supported in Chrome 90+, Firefox 81+, Safari 16+, Edge 90+.
2. **`src/App.jsx:365-377`** — Removed bridge element (symptom patch, unnecessary now)

### Files Changed
- `src/index.css` (overflow-x: hidden → clip)
- `src/App.jsx` (removed bridge element)

### Build
✅ `npm run build` passes (1.77s)

### Project URL
- **Rogue Code (main site):** `https://rogue.codes` (Cloudflare Pages, auto-deploys from `main`)

## Session — 10 Jul 2026 — Full Agency Redesign

### Changes
1. **Hero** (`prisma-hero.jsx`) — New headline: "We build websites, AI agents, and mobile apps that grow your business." New subtitle positioning as full-service agency. Removed abstract "digital architecture" language.
2. **Removed logo flash** — Deleted `showLogoFlash` state + JSX block (the "ROGUE CODE" black overlay flash between loader and hero). Transition now goes loader → hero cleanly.
3. **ServicesSection** — Rewritten from 3 services (Web Dev, AI Integration, Design & Brand) to 4 services (Web Development, AI & Automation, Mobile Apps, UI/UX Design). Each card shows a "from $X" pricing pill. Outcome-focused descriptions. Removed Awwwards Inspirations + PreviewModal (replaced with past project tags).
4. **CaseStudiesSection** (NEW) — 6 real projects from GitHub (Paws for Change India, Chelsea Man Spa, Support Ticket Agent, JMJ Events, Crumbs Bakery, Trading Bot). Filterable by category tabs (All, Web Dev, AI/Automation, Mobile Apps). Each card has screenshot, description, result metric, tags, GitHub link.
5. **AnimatedBeamTimeline** — Converted from "30-Day Sprint" (4 weeks) to "Our Process" (5 steps: Discovery, Design, Develop, Deploy, Support). Updated all content to general agency workflow language. Height changed from 500vh to 600vh (5 cards × 100vw = -400vw transform).
6. **WhyUsSection** — Updated panels from "AI-Native Team, 3x Faster Delivery, One Point of Contact, Global Talent" to "Full Ownership, Ship in Weeks, One Point of Contact, End-to-End Service".
7. **PricingSection** (NEW) — 3 package cards (Starter $2.5K+, Growth $5K+, Enterprise $15K+) with feature lists and "Most Popular" highlight. Per-service starting rates table below (Web Dev, AI, Mobile, UI/UX). CTA to book a call.
8. **FAQSection** (NEW) — 7 accordion questions about timeline, process, tech stack, support, satisfaction, and getting started.
9. **Removed abstract content** — Deleted "AI meets infrastructure" heading section and cinematic photo strip (both too abstract for agency positioning).
10. **SEO/JSON-LD** — Updated index.html title, meta descriptions, Open Graph, Twitter cards, and structured data to reflect agency positioning (web dev, AI automation, mobile apps).

### New Section Order (Homepage)
Hero → Brand Story (3 sections) → Stats → Services → Case Studies → Process → Why Us → Pricing → FAQ → Team → CTA → Footer

### New Files
- `src/components/CaseStudiesSection.jsx` (226 lines)
- `src/components/PricingSection.jsx` (219 lines)
- `src/components/FAQSection.jsx` (125 lines)

### Modified Files
- `src/App.jsx` — Section restructure, removed flash, added 3 new imports
- `src/components/ui/prisma-hero.jsx` — New hero copy
- `src/components/ServicesSection.jsx` — 4 services, pricing pills, cleaned up
- `src/components/AnimatedBeamTimeline.jsx` — 5-step process
- `src/components/WhyUsSection.jsx` — New panel copy
- `index.html` — SEO/JSON-LD rewrite

### Build
✅ `npm run build` passes (2.02s)

### Branch
- `main` — Rogue Code site
- `gh-pages` — CPH homepage3.html deploy

## Session — 10 Jul 2026 — Pricing INR Tiers + Services Mobile Fix

### Changes
1. **PricingSection** — Replaced 3 USD packages (Starter $2.5K, Growth $5K, Enterprise $15K) with 4 INR tiers: Basic ₹7K+, Business ₹14K+, Enterprise ₹25K+, Custom Animated ₹3L+. Added example tags per tier. Removed Per-Service table. Added 3D tilt + spotlight hover animation.
2. **ServicesSection mobile** — Fixed `overflow-hidden` on cards (text clipping). Cards now scroll horizontally on mobile (`flex overflow-x-auto snap-x`), stays `md:grid md:grid-cols-3` on desktop. Added `hide-scrollbar` utility.
3. **Hero layout** — Removed 12-column grid → vertical stacked layout. Changed font to **Clash Display** (Fontshare). Removed negative tracking that clipped glyphs. Wired "Start a project" → BookingModal.
4. **TeamSection** — Enhanced with 3D tilt + spotlight hover, image scale animation + social icon overlay on hover, mobile horizontal scroll.
5. **BookingModal** — Upgraded with animated gradient border glow, backdrop blur, Clash Display heading.
6. **Deploy** — Moved from Cloudflare Pages to **Cloudflare Workers** (static assets). Custom domain `rogue.codes` routed via Worker route. `wrangler.toml` added for config.

### Files Changed
- `src/components/PricingSection.jsx` (rewritten)
- `src/components/ServicesSection.jsx` (overflow & scroll fixes)
- `src/components/ui/prisma-hero.jsx` (vertical stack, Clash Display)
- `src/components/TeamSection.jsx` (3D tilt, hover animations)
- `src/components/BookingModal.jsx` (gradient border, glow)
- `src/index.css` (Clash Display import, `overflow-x:clip`→`hidden`, hide-scrollbar, gradientShift keyframes)
- `src/App.jsx` (hero → BookingModal wiring)
- `wrangler.toml` (new)

### Domain
- `https://rogue.codes` — Workers, custom domain route

### Build
✅ `npm run build` passes (2.4s) | `npm run lint` — pre-existing errors only

## Session — 11 Jul 2026 — Security & Code Review Fixes

### Completed
1. **🔐 Token hygiene** — `CLOUDFLARE_API_TOKEN` saved to `.env` (gitignored). Verified no leak in PowerShell history.
2. **♿ BookingModal a11y** — Added `role="dialog"`, `aria-modal="true"`, focus trap on Tab, Escape key handler, close button enlarged to 44×44px.
3. **🔄 LeadForm "Submit Another"** — No longer calls `onClose`/modal-dismiss on reset. Removed unused `onSuccess` prop from both LeadForm and BookingModal.
4. **🌐 API URL** — Hardcoded `http://localhost:3001/api/leads` → `import.meta.env.VITE_API_URL || '/api/leads'`. Added Vite proxy `/api` → `localhost:3001` for dev compat.
5. **🎬 AnimatePresence exit animation** — Moved `<AnimatePresence>` from inside `SitePreviewModal` to parent call site so exit animations fire on close.
6. **⚡ Instant theme toggle** — Removed `key={theme}` from App.jsx main motion.div (was causing full remount/re-animation on each theme switch).
7. **🧹 Dead CSS** — Removed ~260 lines of unused classes (`.hero-container`, `.hero-canvas`, `.parallax*`, `.side-menu`, `.scroll-progress`, `.animate-fade-in*`, `.content-section`, etc.) from `index.css`.
8. **🧹 Dead code** — Removed unused `showAsterisk` prop + conditional from `WordsPullUp`.
9. **♻️ Tilt hook extracted** — Created `src/hooks/useTiltEffect.js` shared hook. Refactored `PricingCard`, `TeamCard`, `ServiceCard` to use it (eliminated triplicated tilt/spotlight logic).
10. **🗑️ Config cleanup** — Removed empty/duplicate `wrangler.toml` (config lives in `wrangler.jsonc`).

### Still Blocked
- **Gemini API key + Apify token** in `.opencode/mcp.json` — CRITICAL, needs rotation with new credentials
- **CSRF/CSP/Redis rate limiting** — deferred, requires backend coordination

### Build
✅ `npm run build` passes (2.53s) | `npm run lint` — pre-existing errors unchanged

### Deploy Fix (11 Jul 2026)
- `rogue.codes` was NXDOMAIN — no A/AAAA/CNAME records despite zone being active on Cloudflare
- **Root cause:** Worker was deployed but no custom domain route was configured; `wrangler.jsonc` had no `routes` array
- **Fix:** Added `routes: [{ pattern: "rogue.codes", custom_domain: true }, { pattern: "www.rogue.codes", custom_domain: true }]` to `wrangler.jsonc`
- Old `www.rogue.codes` CNAME → `rogue-codes.pages.dev` was blocking www domain creation — deleted and re-deployed
- Both domains now return HTTP 200. Committed as `b4edccd`, deployed to Workers version `7e1c3a30`
- DNS records auto-created by Cloudflare: `rogue.codes` AAAA → `100::`, A → Cloudflare proxy IPs

## Session — 11 Jul 2026 — Mobile Bugfixes: Hero Black Screen, Timeline Path, PreviewModal

### Done
- **Hero video black screen** (`prisma-hero.jsx`): added `preload="auto"`, `onError` handler + `videoFailed` state, animated gradient fallback when video fails to load
- **AnimatedBeamTimeline mobile path** (`AnimatedBeamTimeline.jsx`): fixed mobile detection (`useState(null)` + `useEffect` guard instead of `useState(() => window.innerWidth < 768)`); connector line changed from `h-8` to full-span via `top:68; bottom:0`
- **SitePreviewModal** (`ServicesSection.jsx`): wired `onSelectSite` to all 3 non-hero service cards; converted `ExampleRow` from `<a target="_blank">` to `<button onClick={...}>` opening modal; enlarged from `max-w-6xl` to `max-width: min(90vw, 1400px)`, `maxHeight: 800` → `85dvh`; added iframe loading spinner state
- Vercel CLI installed (`v55.0.0`)

### Build
✅ `npm run build` passes (3.09s)

### Fixes (11 Jul 2026, batch 2)
- **React error #310** (`AnimatedBeamTimeline.jsx`): early return `if (isMobile === null) return null` before 4 framer-motion hooks caused hooks-count mismatch on re-render. Replaced `useState(null)` → `useState(() => window.innerWidth < 768)` lazy initializer, removed guard.

### Done (11 Jul 2026, batch 3)
- **ScrambleText** (`ScrambleText.jsx`): added `duration` prop (default 1000ms) — reveals full text after 1s regardless of scramble progress
- **Hero previews** (`ServicesSection.jsx`): hero card changed from side-by-side to stacked layout; 4 previews → 2 featured previews at full width; aspect ratio `4/3` → `16/10`; added hover lift + "Click to preview" affordance
- **TeamShowcase** (NEW `TeamShowcase.jsx`): replaced old `TeamSection.jsx` with bento photo grid + name list. Converted from TSX to JSX. Uses `react-icons/fa` for social icons. Added touch/tap support for mobile hover states. Day/night mode via `.dark` CSS variable wrapper.
- **Dependencies**: added `react-icons` (`--force` due to platform-specific lockfile packages)

### Build
✅ `npm run build` passes (1.52s)
✅ deployed to Workers `973bdc7d` | committed `a6b1821`, `0b50d03`

## Session — 11 Jul 2026 — TeamMemberCard, Variable Font Hero, Marquee Removal, CTA Polish, Team Bg

### Done

#### 1. TeamMemberCard — `src/components/ui/team-member-card.tsx`
- **Source:** Emerald UI v2.0.0 (MIT) — editorial-style team member card
- **Dependencies:** All already installed (`clsx`, `tailwind-merge`, `lucide-react`, `framer-motion`)
- **Structure:** Overlapping portrait image (left) + info block (right) via negative margin (`-left-8`), with staggered entrance animations
- **Props:** `position` ('left'|'right'), `jobPosition`, `firstName`, `lastName`, `imageUrl`, `description`, `className`
- **Animations:** 4 staggered framer-motion blocks — outer container (opacity 0→1, 0.6s), jobPosition label (x: -20→0, 0.5s, delay 0.1s), portrait (opacity 0→1, scale 0.95→1, y: 30→0, 0.7s, delay 0.15s), info block (x: 40→0, 0.6s, delay 0.3s)
- **CTA:** Circular button (h-20 w-20) with `ArrowRight` icon, hover rotates -45deg, group pulse scale 1.1
- **Grain overlay:** `bg-linear-to-t from-black/20 via-transparent to-transparent` over portrait for texture
- **Responsive:** Fixed image width h-125 w-90, info block width `calc(100%-350px)`. Bio copy constrained to `w-[40%]`. On small viewports, `flex-col` stack would be needed — currently unchanged from source
- **Custom `cn` utility:** Defined inline using `clsx` + `tailwind-merge` (15 lines), avoids importing from `src/lib/utils.js`
- **TypeScript:** Full interface typing with optional props + defaults

#### 2. About Us — Hero Section Rewrite
- **Replaced:** Old hero block (lines ~301-356) consisting of:
  - `GalleryFrame`-wrapped photo with "Available for work" badge overlay
  - Right column: `SectionEyebrow`, 3-line name headline, `WordReveal` description, 4 skill pills (React, Three.js, TypeScript, AI/ML)
- **Replaced with:** Single `<TeamMemberCard position="left" jobPosition="Founder & Lead Developer" firstName="Jeremy" lastName="Gideon Bareh" imageUrl={galleryPhotos[4]} description="Full-stack engineer building premium digital experiences..." />`
- **Cleanup:**
  - Removed unused `GalleryFrame` import (was only used in this section)
  - Removed unused `heroY` TransformMotion value (was used by old photo column scrolling animation)
  - Kept `heroRef` + `heroOpacity` scroll transform on outer wrapper (fades entire hero on scroll)
  - Kept "Back to home" button with ArrowLeft icon
  - `SectionEyewbrow`, `WordReveal`, `KineticText` imports still used elsewhere in AboutUs
- **Image placeholder:** Still uses `galleryPhotos[4]` Unsplash URL. When user adds photo to `public/images/team/`, change `imageUrl` to `/images/team/filename.jpg`

#### 3. Variable Font Cursor Proximity — `src/components/ui/VariableFontCursorProximity.jsx`
- **Purpose:** Text whose individual letters morph `wght` (font-variation-settings) based on cursor proximity — interpolates between `fromWeight` (resting) and `toWeight` (at cursor center)
- **TSX→JSX conversion:** Removed TypeScript annotations, removed `useIsStaticRenderer` (no SSR in this Vite project), removed `motion.span` → plain `<span>` (rAF loop handles all DOM mutations directly, framer-motion span added nothing)
- **Bundled font:** Injects `@font-face` for Inter Variable from `rsms.me` (normal + italic) with unique family name "InterVariableFramer" to avoid conflicts with user-installed Inter
- **Default props:** label="Variable Font Proximity", fontSize=48, color="#FFFFFF", fromWeight=400, toWeight=900, strength=25, transition={duration:0.3, ease:"easeOut"}
- **Reach mapping:** strength (1-100) maps linearly to 1-800px proximity radius
- **Per-frame loop:** `useAnimationFrame` computes distance from each letter center to cursor → linear proximity target → exponential smoothing toward target (tau from transition.duration) → stamps `fontVariationSettings: 'wght' <interpolated>` directly on DOM nodes (60fps, bypasses React reconciliation)
- **Accessibility:** Visually hidden `<span>` with full text (sr-only styles) covers all letters + proper aria-hidden on individual spans
- **Hero integration:**
  - Replaced `<h1>` with `<WordsPullUp>` at `prisma-hero.jsx:65-74`
  - Uses original tagline, fontSize="clamp(1.75rem,5vw,4.5rem)", color="#E1E0CC", fromWeight=400 → toWeight=900
  - style={textAlign:"center", width:"100%"} for alignment
  - Removed Clash Display font-family from this element (bundled Inter Variable used instead)

#### 4. WordsPullUp/WordsPullUpMultiStyle Removed
- Both functions (60 lines combined) and their `export` statement deleted from `prisma-hero.jsx`
- Framer-motion imports cleaned up: removed `useInView`, `useReducedMotion` (no longer needed)
- `useRef` import also removed (was only used by WordsPullUp functions)
- `useState` kept for `videoFailed` state
- **No other file imports WordsPullUp** — confirmed via grep, safe removal

#### 5. Marquee Tech Stack Carousel Removed
- **Deleted:** `src/components/Marquee.jsx` (38 lines, imported framer-motion `useMotionValue`, `animate`, `motion`)
- **App.jsx cleanup:**
  - Removed `import Marquee from './components/Marquee'` (line 20)
  - Removed Tech Stack Marquee JSX block (lines 343-346):
    ```jsx
    {/* Tech Stack Marquee */}
    <div className="py-12 relative z-10 overflow-hidden" style={{ backgroundColor: p.bg }}>
      <Marquee speed={45} />
    </div>
    ```
  - Footer now directly follows CTA section

#### 6. TeamShowcase Black Background
- **App.jsx line 287-289:** Wrapped `<TeamShowcase>` in `<section style={{ backgroundColor: '#0A0A0A' }}>`
- This replaces the previous design where team section used same background as rest of page (night: #1A1817, day: #F5F0EB)
- The `.dark` class within TeamShowcase handles day/night text color variables independently of the black wrapper

#### 7. CTA Section — Copy Update
- **Paragraph text:** `Let&apos;s ship something real.` → `Let&apos;s build something real — together.`
- **Attribution added:** New `<motion.p>` block after paragraph: `— Jeremy Gideon Bareh` (staggered entrance: delay 0.25s, opacity 0→1, y:20→0)
- **Button text:** `Book a Free Call` → `Start your project` (delay adjusted from 0.3s → 0.35s to accommodate attribution line)
- **Section structure:** Still uses full-bleed cinematic photo background (`cinematicPhotos[9]`) with gradient overlay

#### 8. Team Photos Folder
- Created `public/images/team/` — static assets directory (same pattern as `public/videos/`, `public/models/`)
- Placeholder Unsplash URLs in TeamShowcase and AboutUs should be replaced with `/images/team/filename.jpg` once photos are pasted

#### 9. demo.tsx
- `src/components/ui/demo.tsx` — Standalone preview page rendering `<TeamMemberCard />` with defaults
- For local testing: swap `App.jsx` `<PrismaHero />` with `<Demo />` to preview component

### New Files
- `src/components/ui/VariableFontCursorProximity.jsx` (226 lines — rAF-driven variable font proximity effect)
- `src/components/ui/team-member-card.tsx` (142 lines — editorial-style team card with TypeScript interface)
- `src/components/ui/demo.tsx` (8 lines — TeamMemberCard standalone preview)

### Deleted Files
- `src/components/Marquee.jsx` (38 lines — tech stack infinite scroll carousel)

### Modified Files
- `src/App.jsx` — Removed Marquee import + JSX block, wrapped TeamShowcase in `#0A0A0A` section, updated CTA copy (paragraph, attribution line, button text)
- `src/components/ui/prisma-hero.jsx` — Replaced WordsPullUp/export with VariableFontCursorProximity import + usage, removed 60 lines of deprecated word-animation functions
- `src/components/AboutUs.jsx` — Replaced old hero section with TeamMemberCard, removed unused GalleryFrame import, removed unused heroY transform, added TeamMemberCard import

### Cleanup Details
- Removed `useInView`, `useReducedMotion`, `useRef` from prisma-hero.jsx imports
- Removed `GalleryFrame` from AboutUs.jsx import (GalleryPhoto still imported for elsewhere)
- Removed `heroY` TransformMotion (heroOpacity kept for scroll fade)
- All dependency-originated imports (clsx, twMerge, ArrowRight, etc.) were pre-installed — zero new npm packages

### Deployed Commits
- `a720b1d` — feat: VariableFontCursorProximity hero heading, rm Marquee, TeamShowcase black bg
- `cfe8138` — fix: CTA copy — paragraph, attribution, button text
- `9bc2ecb` — feat: TeamMemberCard editorial component for About Us hero

### Build
✅ `npm run build` passes (1.87s)
✅ Deployed to Workers `26f3a923` → `rogue.codes`, `www.rogue.codes`

### Next Steps
- User needs to paste team photos into `public/images/team/`
- Update `imageUrl` in TeamShowcase.jsx and AboutUs.jsx to local paths
- Consider responsive layout of TeamMemberCard on mobile (currently uses fixed image widths that may overflow on small screens)
