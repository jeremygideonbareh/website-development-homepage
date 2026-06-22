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

## What Hasn't Been Done
- ASCII Creation of Adam hands hero (AdamHands.jsx + HyperstudioHero.jsx)
- Accessibility / responsive testing
- Bundle splitting / code-splitting (1.37 MB warning)
- GitHub Actions CI
- Using MCP servers (shadcn, threejs, gemini, apify — all configured, none used)
