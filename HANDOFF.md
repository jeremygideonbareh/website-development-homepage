# Handoff — 19 Jun 2026

## Status
Build ✅ | Dev server at http://localhost:5173/website-development-homepage/

## Current Implementation
- **HyperstudioHero.jsx** — Badge ("2/5 spots left for april"), 63px Satoshi display headline, Start Now / View Work CTAs
- **AdamHands.jsx** — 2D canvas ASCII blocks (█▓▒░) sampled from Wikimedia Creation of Adam painting. Two hands reaching toward each other, amber glow at gap, breathing animation, fade-in
- **RevealText.jsx** — Kinetic typography (WordReveal, CharReveal, SectionEyebrow)
- **App.jsx** — Scroll narrative (Philosophy / Approach / Promise) between hero and stats
- **Font** — Satoshi (Fontshare CDN) as Aeonik sub, JetBrains Mono for monospace
- **Tailwind** — Hyperstudio tokens: obsidian #101010, frost #f3f3f3, smoke #949494, amber #e7c59a, type scale caption→display, radii badge/card/pill/button
- **21st.dev MCP** — Configured in opencode.jsonc with user API key

## What Failed / Reverted
- 3D model download from Printables/Sketchfab/Remeshy — all require auth
- Procedural Three.js hand geometry — too crude
- HorizonHeroSection scroll animation — React 19 StrictMode broke GSAP ScrollTrigger

## Known Issues
- AdamHands loads from Wikimedia CDN (requires internet). Fallback procedural code exists.
- Main bundle ~522 KB (Spline + Three.js deps for robot on other pages)
- Not mobile-tested
