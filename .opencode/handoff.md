# Session Handoff — June 21, 2026

## Project
Website Development Homepage — React + Vite + framer-motion + Tailwind CSS agency landing page
Git repo at `C:\Users\cloud\OneDrive\Desktop\Hybrid_Second_Brain\03_Active_Projects\websites\webistedevhompage`
Site URL: `https://jeremygideonbareh.github.io/website-development-homepage/`

## Stack
- React 19, Vite 8, framer-motion 12.40, Tailwind CSS 3
- lucide-react (icons), sonner (toasts)
- Satoshi font (aliased as `fontFamily.aeonik` in tailwind.config.js, fallback Inter → system-ui → sans-serif)
- Vite base: `"/website-development-homepage/"` (GitHub Pages subpath)
- No TypeScript, no routing library, no testing framework

## Current Features

### Hero (`MountEverestScene.jsx`)
- Looping fullscreen `<video>` background (`Moving_fog_and_shooting_stars_202606211510.mp4`) with gradient overlay
- Video URL uses `import.meta.env.BASE_URL` prefix for GitHub Pages subpath
- Text overlay: "Horizon Labs" / "Sky's the Limit" with accent-colored span
- Fade-out on scroll via framer-motion `useScroll` / `useTransform` (0–500px)
- Animated scroll indicator at bottom
- Day/night palette switching

### Day/Night Palette System (`App.jsx`)
- **Day:** bg `#F5F0EB`, accent `#E85D3A`, text `#1A1A1A`
- **Night:** bg `#1A1817`, accent `#FF6B4A`, text `#F2F2F2`
- Applied throughout all sections via inline styles from `palette[theme]` object
- Toggle button in fixed navbar (Sun/Moon icon)

### Brand Story Section (inline in `App.jsx`)
- 3 motion cards: "Our Philosophy", "Our Approach", "Our Promise"
- `whileInView` with `viewport={{ once: true, margin: '-120px' }}`
- `SectionEyebrow`, `CharReveal`, `WordReveal` text animations

### Stats Banner (inline in `App.jsx`)
- 3-column grid: "50+ Projects Delivered", "3x Faster Than In-House", "100% Code Ownership"
- `whileInView` fade-in with surface-colored card background

### ServicesSection (`ServicesSection.jsx`)
- 3 service cards: Web Development, AI Integration, Design & Brand
- Each card has: `BrowserFrame` Awwwards preview grid (3 per card), tilt hover effect, floating dots, progress bar, related project list
- `PreviewModal` component: full-screen overlay (z-50) with macOS browser chrome, 80vh iframe, keyboard Escape to close, backdrop click to close, spring scale animation via `AnimatePresence`
- Clicking any `BrowserFrame` sets `selectedExample` state → renders `PreviewModal`
- Handles blocked sites inside modal (favicon + "Open in new tab" button)

### BrowserFrame (`BrowserFrame.jsx`)
- macOS-style browser chrome (traffic lights, URL bar)
- 9 Awwwards example links rendered inside:
  - **6 sites:** live `<iframe>` (no `X-Frame-Options` restriction)
  - **3 blocked sites** (faunarobotics.com, locomotive.ca, ponder.ai): favicon-based fallback via `https://www.google.com/s2/favicons?domain=X&sz=64` + domain name + "Visit site" button
- Clicking a card opens a full-screen `PreviewModal` with 80vh iframe
- Preview height increased from 360px → 480px (+33%)
- `cursor-pointer` with stronger hover lift (`y: -4` → `y: -6`)
- `onSelect` prop notifies parent; links within card use `stopPropagation`

### AnimatedBeamTimeline (`AnimatedBeamTimeline.jsx`)
- Self-contained 4-week execution blueprint
- Desktop: 2×2 grid with SVG bezier paths connecting weeks 1→2→3→4
- Animated gradient dash-offset beams + glowing particles
- Mobile: vertical stack with gradient connecting lines
- Each card: week number badge, icon, day range, description, accent top bar, right-side spring entry

### WhyUsSection (`WhyUsSection.jsx`)
- Horizontal scroll with native `overflow-x-auto` + `snap-x snap-mandatory`
- Left/right arrow navigation buttons
- Custom thin scrollbar (accent-colored thumb)
- Scroll indicator dots
- Dark background sweep-in animation

### AboutUs (`AboutUs.jsx`)
- Category rows as horizontal scrollable tracks with snap, arrow nav, custom thin scrollbar
- 3 categories: Websites & Apps, Mobile Apps, AI & Automation
- Extracted `ScrollableCategory` component with scroll-state tracking

### Other Components
- `BookingModal` — booking call modal
- `ContactPage` — contact form page (from shadcn/ui)
- `ExamplesPage` — full Awwwards examples page
- `RevealText` — `WordReveal`, `CharReveal`, `SectionEyebrow` text animation helpers
- `Loader` — loading spinner (2s on mount)

### Loading Flow
1. App mounts → `isLoading=true`
2. `Loader` shows for 2s (fixed position, z-50)
3. After 2s → `isLoading=false`, content revealed with fade-in transition
4. Hero + navbar visible, user can scroll through sections

## Pipeline

### Dev Workflow
```
npm run dev         # Vite dev server at localhost:5173 with HMR
npm run build       # Production build to dist/ (vite build)
npm run preview     # Serve dist/ locally
```

### Deployment (GitHub Pages)
`gh-pages` npm package fails on long Windows paths. Workaround:
1. `npm run build` → produces `dist/`
2. Copy `dist/` contents to a temp directory (short path like `C:\Users\cloud\AppData\Local\Temp\`)
3. `git init`, `git add -A`, `git commit -m "deploy"`
4. `git remote add origin <repo-url>`
5. `git push --force origin main:gh-pages`
6. Clean up temp directory

GitHub Pages source set to `gh-pages` branch (configured via API).

### Build & Bundle
- JS bundle: ~1,357 kB (index-*.js)
- CSS: ~58 kB (index-*.css)
- No code-splitting configured
- No chunk size optimization

## Resources Available

### Agents (Everything Claude Code)
| Agent | Used? | Purpose |
|-------|-------|---------|
| **explore** | Yes | Traced scroll animation timing — calculated frame mapping vs `whileInView` trigger positions |
| **planner** | Yes | Debugged why 240-frame scroll animation finished before content appeared |
| code-reviewer | No | Code quality review before commits |
| architect | No | System design decisions |
| tdd-guide | No | Test-driven development |
| security-reviewer | No | Security audit |
| build-error-resolver | No | Build failure diagnosis |
| refactor-cleaner | No | Dead code cleanup |
| doc-updater | No | Documentation |
| code-writer | No | Production code writing |
| e2e-runner | No | End-to-end testing |
| database-reviewer | No | Database/schema optimization |
| rust-reviewer | No | Rust code review |
| python-reviewer | No | Python code review |
| java-reviewer | No | Java code review |
| typescript-reviewer | No | TypeScript/JavaScript review |

### MCP Servers (`.opencode/mcp.json`)
| Server | Used? | What it does |
|--------|-------|-------------|
| **shadcn** | No | CLI for shadcn/ui component registry (`npx shadcn@latest mcp`) |
| **magicuidesign-mcp** | No | `@magicuidesign/mcp@latest` — UI component generation |
| **threejs** | No | `@modelcontextprotocol/server-threejs` — Three.js scene building |
| **gemini** | No | Google Gemini models (API key embedded, script at `.opencode/scripts/gemini-mcp.mjs`) |
| **apify** | No | `apify-mcp-server` — web scraping / Awwwards research research (APIFY_TOKEN configured, intended but never used) |

### Agent Skills (`.agents/skills/`)
| Skill | Used? | Purpose |
|-------|-------|---------|
| **21st.dev component builder** | Yes | Generated `BrowserFrame.jsx`, `AnimatedBeamTimeline.jsx`, and several UI components |
| **21st.dev logo search** | No | Company logo search in JSX/TSX/SVG format |
| **frontend-design** | No | Visual design guidance for distinctive, intentional UI |
| **web-design-guidelines** | No | UI accessibility and UX audit |
| **vercel-react-best-practices** | No | React/Next.js performance optimization guidelines |
| **agent-browser** | No | Browser automation (Playwright, web testing, QA) |
| **remotion-best-practices** | No | Video creation with Remotion |
| **find-skills** | No | Skill discovery |
| **customize-opencode** | No | Editing opencode's own configuration |

### Third-Party Tools Used
| Tool | Used in | Purpose |
|------|---------|---------|
| **21st.dev magic component builder** | Yes | Generated `BrowserFrame.jsx`, `AnimatedBeamTimeline.jsx` |
| **Cursor AI (cursor-pro)** | Yes | Delegated complex component implementation |
| **Web Search / Web Fetch** | Yes | Finding Unsplash images, researching Awwwards sites, favicon API patterns |

### Dependencies (package.json)
| Category | Packages | Used? |
|----------|----------|-------|
| **Framework** | `react`, `react-dom` v19 | Yes — core |
| **Build** | `vite` v8, `@vitejs/plugin-react` v6 | Yes |
| **Animation** | `framer-motion` v12.40 | Yes — scroll, text, entry animations |
| **3D (unused)** | `three` v0.184, `@react-three/fiber` v9, `@react-three/drei` v10, `@splinetool/react-spline` v4 | No — 3D scene removed |
| **Animation (unused)** | `gsap` v3.15 | No |
| **UI** | `lucide-react`, `sonner` | Yes — icons, toasts |
| **Styling** | `tailwindcss` v3, `postcss`, `autoprefixer`, `tailwind-merge`, `clsx`, `class-variance-authority` | Yes |
| **shadcn/ui** | `@radix-ui/react-slot`, `shadcn` CLI | Partially — slot utility used by contact page |
| **Deploy** | `gh-pages` v6.3 | No (broken on long Windows paths) |
| **Lint** | `eslint` v10, plugins | No |

## Commit History (latest first)
```
2a45260 feat: default night theme, preview modal, blocked sites, preconnect hints
9d0dae1 fix: commit BrowserFrame and NetworkParticles for CI build
95ac736 fix: commit untracked component files for CI build
2cfc1fd feat: replace static mountain photo with looping video background
54efb37 feat: replace scroll animation with high-res mountain photo hero
ce816d6 fix: revert vite base to /website-development-homepage/ for GitHub Pages subpath
7eb27e7 fix: set Vite base to / for root-level Cloudflare Workers deployment
cc2d8d3 feat: deeper scroll-to-zoom (15→0.5) and day/night theme toggle with warm/sunrise palette
61a7176 feat: add interactive Mount Everest 3D hero with procedural terrain, fog, and scroll-to-zoom
d89f6f9 chore: gitignore .opencode/mcp.json to protect API keys
d8d2af3 fix: remove _redirects conflicting with wrangler SPA config, add wrangler.jsonc
c82ecc4 feat: ASCII art hero with Hyperstudio branding, kinetic typography, and scroll narrative
405df2b fix: update vite base for Cloudflare and add _redirects for SPA routing
76a155a Add FastAPI backend, SEO, security layers, and premium UI components
ba58a7a feat: overhaul services to 3-tier model, update process to 30-day blueprint
80f3cce chore: update contact info, remove nav brand, enhance loader
d52a0be chore: setup github actions deployment for pages
88aef5a feat: complete pivot to B2B web development agency with updated services and UI
```

## Key Decisions Made This Session (June 21)
1. **240-frame scroll animation removed.** Replaced with static mountain photo, then swapped for looping video background. Video lives at `public/videos/`, URL constructed with `import.meta.env.BASE_URL`.
2. **`whileInView` timing fix attempted and reverted.** Animation was completing at frame ~66 (27%) when content appeared due to `margin: '-120px'` on `viewport`. Fix stretched animation across 2 viewport heights + `paddingTop: 300vh`. User reverted entirely ("nvm undo").
3. **No npm deploy script** — `gh-pages` npm package broken on long Windows paths. Manual temp-directory git push workaround used instead.
4. **CI build failed twice** — `BrowserFrame.jsx`, `NetworkParticles.jsx`, `ServicesSection.jsx`, `WhyUsSection.jsx`, `AnimatedBeamTimeline.jsx`, `AboutUs.jsx` were all untracked files. CI had no reference of them. Fixed by committing all 6 files across two commits.
5. **Created cross-project learning infrastructure.** Global `~/.config/opencode/AGENTS.md` updated with pipeline section. Global `opencode.jsonc` updated with knowledge base instruction, `web-designer` agent, and `/design` command. Knowledge directory created at `~/.config/opencode/knowledge/` with first entry.
6. **Created shareable `opencode-skill-web-designer` repo** at `https://github.com/jeremygideonbareh/opencode-skill-web-designer` with SKILL.md, README.md, and knowledge/starter.md.
7. **Upgraded GitHub profile** at `jeremygideonbareh/jeremygideonbareh` — replaced simple 16-line README with animated typing header, GitHub stats cards, trophy showcase, activity graph, contribution snake animation, tech stack badges, featured projects, and contact links.
8. **Default theme changed to `'night'`** — `App.jsx:66` `useState(() => 'day')` → `useState(() => 'night')`. Site loads in dark mode by default; toggle still available.
9. **Added 3 blocked Awwwards sites** to `blockedSites` array in `BrowserFrame.jsx` — `faunarobotics.com`, `locomotive.ca`, `ponder.ai` now use favicon fallback instead of broken iframes.
10. **Full-screen PreviewModal added** — clicking any `BrowserFrame` opens a macOS-chromed modal (80vh iframe, Escape/backdrop to close, spring animation via AnimatePresence). Works for both iframeable and blocked sites.
11. **Preview height +33%** — inline iframe height 360px → 480px.
12. **Preconnect hints added** — `index.html` preconnects to `images.unsplash.com`, `picsum.photos`, `www.google.com` for faster resource loading.

## Orphaned / Dead Files (no longer imported, safe to remove)
- `src/components/ScrollAnimation.jsx` — 240-frame scroll animation component
- `src/components/FogLayer.jsx` — R3F fog effect
- `src/components/ui/radial-orbital-timeline.jsx` — Old orbital timeline component
- `public/scrollanimation/` — 240 JPG frames (~12 MB)
- `photos/` — Original video location (moved to `public/videos/`)

**Note:** `BrowserFrame.jsx` and `NetworkParticles.jsx` are active imports but safe to review for dead code removal.

## Dead Dependencies (safe to uninstall)
- `three`, `@react-three/fiber`, `@react-three/drei`, `@splinetool/react-spline`, `@splinetool/runtime`
- `gsap`

## Global Learning Infrastructure (outside this project)

### Files Created/Modified
| File | Purpose |
|------|---------|
| `~/.config/opencode/AGENTS.md` | Appended Cross-Project Pipeline & Learning System section — enforces knowledge base read before every project, knowledge write after every session |
| `~/.config/opencode/opencode.jsonc` | Added `"Read knowledge base"` to instructions, added `web-designer` agent, added `/design` command |
| `~/.config/opencode/knowledge/website-development-homepage.md` | First knowledge entry — design patterns, build gotchas, reusable components, agent performance notes, mistakes to avoid |
| `https://github.com/jeremygideonbareh/opencode-skill-web-designer` | Public skill repo with SKILL.md, README.md, knowledge/starter.md — anyone can install |

### Learning Loop
1. Before any project → AI reads `~/.config/opencode/knowledge/`
2. During session → AI uses past patterns, avoids past mistakes
3. After session → AI writes learnings back to knowledge/
4. Over time → patterns compound, designs improve

## External Repositories (outside this project)
| Repo | What | Purpose |
|------|------|---------|
| `jeremygideonbareh/jeremygideonbareh` | GitHub Profile README | Animated profile with stats, trophies, activity graph, snake animation, tech stack badges |
| `jeremygideonbareh/opencode-skill-web-designer` | opencode Skill | Shareable web-designer agent with knowledge base learning loop |

## What Hasn't Been Done
- Accessibility audit (web-design-guidelines skill available)
- Visual design polish (frontend-design skill available)
- Performance optimization / bundle splitting (1.36 MB JS, chunk size warning)
- Code review (code-reviewer agent available)
- Security audit (security-reviewer agent available)
- Dead code cleanup (refactor-cleaner agent — orphaned files still in repo: ScrollAnimation.jsx, FogLayer.jsx, radial-orbital-timeline.jsx, scrollanimation/ frames)
- Any testing
- Responsive testing on real devices
- Using Apify MCP for Awwwards research
- Using Gemini MCP for AI-powered development
- Using 21st.dev logo search for company logos
- GitHub Actions / CI pipeline for this project
