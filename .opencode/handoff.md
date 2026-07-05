# Session Handoff — June 21, 2026 (Afternoon)

## Project
Website Development Homepage — **rebranded to Rouge Code**
React + Vite + framer-motion + Tailwind CSS agency landing page
Git repo at `C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\03_Active_Projects\websites\webistedevhompage`
Site URL: `https://jeremygideonbareh.github.io/website-development-homepage/`

## Stack
- React 19, Vite 8, framer-motion 12.40, Tailwind CSS 3
- lucide-react (icons), sonner (toasts)
- Satoshi font (aliased as `fontFamily.aeonik` in tailwind.config.js, fallback Inter → system-ui → sans-serif)
- Vite base: `"/"` (Cloudflare root-level) — GitHub Pages needs manual base override
- No TypeScript, no routing library, no testing framework
- Package name: `rouge-code` (was `client-website`)

## Current Features

### Hero (`MountEverestScene.jsx`)
- Looping fullscreen `<video>` background (`Moving_fog_and_shooting_stars_202606211510.mp4`) with gradient overlay
- Video sharpening: `filter: contrast(1.08) brightness(1.02)` + `will-change: filter` — perceptual sharpening, avoids `translateZ(0)` GPU blur bug on Windows Chrome
- Text overlay: "Rouge Code" / "Sky's the Limit" with accent-colored span
- Fade-out on scroll via framer-motion `useScroll` / `useTransform` (0–500px)
- Animated scroll indicator at bottom
- Day/night palette switching
- Reduced night overlay 12%→6%, day 6%→3%, removed noise grain

### Day/Night Palette System (`App.jsx`)
- **Day:** bg `#F5F0EB`, accent `#E85D3A`, text `#1A1A1A`
- **Night (default):** bg `#1A1817`, accent `#FF6B4A`, text `#F2F2F2`
- Applied throughout all sections via inline styles from `palette[theme]` object

### AboutUs (`AboutUs.jsx`) — Complete Rewrite
- **Hero:** `KineticText` in `spring` mode for the main heading
- **Mission:** `WordReveal` animated paragraph
- **Stats:** 4 animated counters (50+ Projects, 3x Faster, 100% Ownership, 24/7 Support) using `useInView` + `useState` count-up
- **Values:** 4 cards (Custom from scratch, Speed without sacrifice, AI-powered engineering, Total ownership) with lucide icons
- **Team:** 2 cards with initials-avatar circles
- **Blog "Our Story":** Drop cap intro, alternating image+text rows, pull quote with accent styling, closing paragraph with `— Rouge Code` attribution
- **Project Showcase:** Horizontal scroll tracks per category (Websites, Mobile, AI), theme-aware colors, arrow nav
- **CTA:** "Book a Free Call" button

### KineticText (`RevealText.jsx`) — New Component
4 animation modes:
- **`spring`** — Each character scales from 0→1 with a spring and slight rotation
- **`wave`** — Characters drop in from above with staggered delays
- **`scatter`** — Characters fly in from random angles
- **`typewriter`** — Characters reveal left-to-right with a cursor blink
- `SectionEyebrow` now accepts optional `color` prop

### ServicesSection (`ServicesSection.jsx`)
- 3 service cards: Web Development, AI Integration, Design & Brand
- `PreviewModal` with full-screen macOS chrome, 80vh iframe, keyboard Escape + backdrop close
- `BrowserFrame` with 9 Awwwards examples (6 live iframe, 3 favicon fallback for blocked sites)

### AnimatedBeamTimeline (`AnimatedBeamTimeline.jsx`)
- Sticky horizontal scroll — 500vh scroll distance, 4 × 100vw cards slide via `useScroll` + `useTransform`
- Liquid glass effect with progress indicators
- Mobile vertical fallback

### WhyUsSection (`WhyUsSection.jsx`)
- Horizontal snap scroll with arrow nav + custom thin scrollbar
- Three.js `NetworkParticles` background (uses `three` + `@react-three/fiber`)

### Other Components
- `BookingModal` — booking call modal
- `ContactPage` — contact form page (from shadcn/ui)
- `ExamplesPage` — full Awwwards examples gallery
- `Loader` — loading spinner (2s on mount)

## Pipeline

### Dev Workflow
```
npm run dev         # Vite dev server at localhost:5173 with HMR
npm run build       # Production build (vite build — uses rolldown)
npm run preview     # Serve dist/ locally
```

### Deployment
**Primary: Cloudflare Pages** — auto-deploys from `main` branch. Vite base: `"/"`.
**Secondary: GitHub Pages** — manual push to `gh-pages` branch (temp-dir workaround for long Windows paths).

### Build Gotchas
- **Linux native bindings must be explicit deps.** `npm install` on Windows won't include Linux x64 optionalDependencies in the lockfile. `@rolldown/binding-linux-x64-gnu` + `lightningcss-linux-x64-gnu` are added as explicit deps (installed with `--force` flag).
- `scrollanimation/` directory tracked in .gitignore to prevent accidental commits of 240 JPG frames.

### Bundle
- JS: ~1,371 kB (index-*.js) — exceeds 500 kB chunk warning
- CSS: ~49.89 kB (index-*.css)

## Dependencies (package.json)
| Category | Packages | Status |
|----------|----------|--------|
| Framework | `react`, `react-dom` v19 | Core |
| Build | `vite` v8, `@vitejs/plugin-react` v6 | Active |
| Animation | `framer-motion` v12.40 | Active — scroll, text, entry animations |
| 3D | `three` v0.184, `@react-three/fiber` v9 | Active — NetworkParticles in WhyUsSection |
| UI | `lucide-react`, `sonner` | Active — icons, toasts |
| Styling | `tailwindcss` v3, `postcss`, `autoprefixer`, `tailwind-merge`, `clsx`, `class-variance-authority` | Active |
| shadcn | `@radix-ui/react-slot`, `shadcn` CLI | Slot utility used by contact page |
| Native bindings | `@rolldown/binding-linux-x64-gnu`, `@rolldown/binding-linux-x64-musl`, `lightningcss-linux-x64-gnu` | Required for Cloudflare build |
| Deploy | `gh-pages` v6.3 | Broken on long Windows paths |
| Lint | `eslint` v10, plugins | Not used |

### Dead deps removed this session
- `@react-three/drei` (was for old 3D scenes)
- `@splinetool/react-spline`, `@splinetool/runtime` (was for Spline 3D)
- `gsap` (was for scroll animations, replaced by framer-motion)

## Commit History (latest first)
```
d7f25e9 chore: ignore scrollanimation/ dir in git
51025d3 feat: rebrand Horizon Labs to Rouge Code
175debe fix: add lightningcss-linux-x64-gnu binding for Cloudflare Pages build
e3e5fe6 fix: add @rolldown/binding-linux-x64 deps for Cloudflare Pages build
6cea817 feat: rewrite AboutUs with Awwwards-inspired design and KineticText
990ed43 feat: add KineticText (4 modes), SectionEyebrow color prop; fix ProjectCard colors
ef6c042 feat: delete 19 orphaned components, 5 orphaned ui, 240 frames; rm 4 dead deps
2ddf536 feat: fix blurry hero video with CSS filter + will-change
7f62710 feat: add blog-style Our Story section with drop cap and pull quote
ef032ad feat: add AnimatedBeamTimeline with sticky horizontal scroll; add AboutUs stat counters
2a45260 feat: default night theme, preview modal, blocked sites, preconnect hints
... (earlier history)
```

## Key Decisions Made This Session
1. **Rebranded Horizon Labs → Rouge Code** — 11 references across 4 files. Footer logo, copyright, hero overlay, AboutUs team card (initials: RC), project entry, blog story (4 mentions), section eyebrow, package name
2. **Dead code deleted** — 19 orphaned component files, 5 orphaned ui components, 240 scrollanimation JPGs. Cleaned up old 3D/replaced components
3. **Cloudflare build fixed** — rolldown + lightningcss both use Linux x64 native bindings that don't get included in lockfile when installing on Windows. Explicit deps with `--force` added
4. **Video sharpen fix applied** — `filter: contrast(1.08) brightness(1.02)` + `will-change: filter` forces GPU compositing without the `translateZ(0)` blur bug on Windows Chrome. Reduced overlay opacity, removed grain
5. **AboutUs.jsx completely rewritten** — from simple project showcase to full Awwwards-inspired hero-mission-stats-values-team-blog-cta layout
6. **KineticText component created** — 4 animation modes for character-level reveals. Replaces CharReveal on major headings
7. **scrollanimation/ gitignored** — 240 JPG frames (byproduct of old scroll animation) no longer tracked

## What Hasn't Been Done
- Accessibility / responsive testing
- Bundle splitting / code-splitting (1.37 MB warning)
- SEO audit / meta tags update for rebrand
- GitHub Actions CI for this project
- Using MCP servers (shadcn, threejs, gemini, apify — all configured, unused)
- Code review (code-reviewer agent)
- Security audit (security-reviewer agent)
