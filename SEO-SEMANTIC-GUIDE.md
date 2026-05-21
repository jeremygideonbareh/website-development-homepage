# Semantic HTML Structure Guide for AI Crawlers

AI search engines (Perplexity, ChatGPT Search, Gemini) parse semantic HTML
to extract structured summaries. Follow this exact hierarchy on every page.

## Rule: One <h1> per page, descending <h2> → <h3> → <h4>

```jsx
// ─── CORRECT: Semantic landing page structure ──────────────────────────────

function LandingPage() {
  return (
    <main>
      {/* ─── Hero Section ───────────────────────────────────────────────── */}
      <section aria-labelledby="hero-heading">
        <h1 id="hero-heading">
          Premium Web Engineering &amp; Spatial Design
        </h1>
        <p>
          We ship production-grade React, WebGL, and AI-native websites
          in 30 days — not months.
        </p>
        <a href="#contact">Start a Project</a>
      </section>

      {/* ─── Services / Tiers ───────────────────────────────────────────── */}
      <section aria-labelledby="services-heading">
        <h2 id="services-heading">Choose Your Tier</h2>
        <p>Every tier solves a specific problem.</p>

        <article aria-labelledby="tier-velocity">
          <h3 id="tier-velocity">The Velocity Build</h3>
          <p>Production-grade website shipped in record time.</p>
          <button>View Live Demo</button>
        </article>

        <article aria-labelledby="tier-growth">
          <h3 id="tier-growth">The Growth Stack</h3>
          <p>Custom web apps with scalable architecture.</p>
          <button>View Live Demo</button>
        </article>

        <article aria-labelledby="tier-apex">
          <h3 id="tier-apex">The Apex Architecture</h3>
          <p>Immersive 3D experiences and WebGL environments.</p>
          <button>View Live Demo</button>
        </article>
      </section>

      {/* ─── Process / Timeline ─────────────────────────────────────────── */}
      <section aria-labelledby="process-heading">
        <h2 id="process-heading">The 30-Day Execution Blueprint</h2>

        <article>
          <h3>Week 1: Architecture &amp; UI Mapping</h3>
          <p>Technical roadmap and user journey wireframes.</p>
        </article>

        <article>
          <h3>Week 2: Core Engineering</h3>
          <p>React foundation with millisecond load times.</p>
        </article>

        <article>
          <h3>Week 3: Interactive &amp; 3D Integration</h3>
          <p>Three.js, GSAP animations, custom features.</p>
        </article>

        <article>
          <h3>Week 4: QA &amp; Deployment</h3>
          <p>Stress-testing, live launch, source-code handoff.</p>
        </article>
      </section>

      {/* ─── Social Proof / Stats ───────────────────────────────────────── */}
      <aside aria-label="Company statistics">
        <h2>Why Choose ApexAI</h2>
        <dl>
          <dt>Projects Delivered</dt>
          <dd>50+</dd>
          <dt>Faster Than In-House</dt>
          <dd>3x</dd>
          <dt>Code Ownership</dt>
          <dd>100%</dd>
        </dl>
      </aside>

      {/* ─── Contact / CTA ──────────────────────────────────────────────── */}
      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">Ready to Build?</h2>
        <form aria-label="Contact form">
          {/* form fields */}
        </form>
      </section>
    </main>
  )
}
```

## Key Rules for AI Crawlers

| Rule | Why |
|------|-----|
| Use `<main>` once per page | Tells AI "this is the primary content" |
| Use `<section>` with `aria-labelledby` | AI extracts section summaries from heading + paragraph |
| Use `<article>` for self-contained items (tiers, process steps) | AI treats each article as a distinct entity |
| Use `<aside>` for tangential content (stats, testimonials) | AI separates core content from supplementary info |
| Use `<dl>/<dt>/<dd>` for definition lists | AI parses key-value pairs cleanly |
| Never skip heading levels (h1 → h3) | AI uses heading hierarchy to build content outlines |
| Add `aria-label` to forms and navs | AI understands interactive element purpose |
