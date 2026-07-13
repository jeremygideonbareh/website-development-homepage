const SITE = 'https://rogue.codes'
const ORG_ID = `${SITE}#org`
const PERSON_ID = `${SITE}#person`
const WEBSITE_ID = `${SITE}#website`

const testimonials = [
  { name: 'Sarah Chen', role: 'CEO, Nexus Technologies', quote: 'They didn\'t just build a website — they engineered a digital experience that fundamentally changed how our customers perceive our brand.', rating: 5 },
  { name: 'Marcus Rivera', role: 'Founder, Verdant Market', quote: 'Three weeks from concept to launch. Our conversion rate jumped 40% in the first month.', rating: 5 },
  { name: 'Elena Kowalski', role: 'CTO, Pulse Analytics', quote: 'The first time a team delivered exactly what they promised — on time, on budget, and better than we imagined.', rating: 5 },
  { name: 'James Okonkwo', role: 'Design Director, Prism Studio', quote: 'The 3D WebGL work still gets comments months later. It\'s not just code — it\'s craft.', rating: 5 },
]

const faqData = [
  { q: 'How long does it take to build a website?', a: 'Most Rogue Code projects ship in 2-4 weeks. A standard 5-page React website takes 2-3 weeks from design approval to Cloudflare deployment. Custom web applications with AI agent integration typically take 4-8 weeks depending on the number of features, API integrations, and third-party service dependencies.' },
  { q: 'How does Rogue Code\'s development process work from start to finish?', a: 'Rogue Code follows a 5-phase process: Phase 1 — Discovery call to define goals, budget, and technical requirements. Phase 2 — UI/UX design in Figma with 2 revision rounds. Phase 3 — React 19 development with TypeScript and Tailwind CSS. Phase 4 — Cloudflare Workers deployment with automated CI/CD via GitHub. Phase 5 — Post-launch support, analytics monitoring via Plausible, and ongoing maintenance.' },
  { q: 'Can Rogue Code work with my existing brand guidelines or design files?', a: 'Yes. If you have brand guidelines, Figma design files, or an existing website that needs a redesign, Rogue Code can work within your constraints. We also offer full UI/UX design services using Figma for clients starting from scratch — delivering wireframes, high-fidelity mockups, and interactive prototypes before any code is written.' },
  { q: 'What technologies and frameworks does Rogue Code specialize in?', a: 'Rogue Code specializes in React 19, Next.js 15, TypeScript, Tailwind CSS, Node.js, and Python. For AI and automation projects we use LangChain, LangGraph, OpenAI GPT-4, Anthropic Claude, and custom ML models. Mobile apps are built with React Native and Firebase. Deployment targets Cloudflare Workers, Vercel, or AWS via Docker containers.' },
  { q: 'Does Rogue Code provide ongoing maintenance and post-launch support?', a: 'Yes. Every Rogue Code project includes 30 days of post-launch support for bug fixes and minor adjustments. We offer ongoing maintenance retainer packages for security patches, dependency updates, content changes, feature additions, and performance monitoring through Plausible analytics. Enterprise clients receive a dedicated support team with 4-hour response SLAs.' },
  { q: 'What happens if I am not satisfied with the final product?', a: 'Rogue Code works iteratively with milestone-based deliverables and revision rounds included in every package. You see progress at every stage — wireframes, design mockups, development preview, and final QA — with structured feedback checkpoints. We are not satisfied until you are, and we have never had a client reject a final delivery.' },
  { q: 'How do I start a project with Rogue Code?', a: 'Book a free discovery call through the Rogue Code website. We will discuss your project goals, technical requirements, budget range, and timeline. If we determine we are the right fit for your needs, we will deliver a detailed proposal within 48 hours with scope, milestones, pricing in INR, and delivery timeline. There is zero commitment required for the discovery call.' },
]

const pricingData = [
  { name: 'Basic', price: '₹7,000/mo', desc: '5-page React 19 responsive website with mobile-first Tailwind CSS design, basic SEO meta tags and schema, contact form integration, 1 revision round, and 1 month Cloudflare hosting support. Best for portfolios, landing pages, and small business sites.' },
  { name: 'Business', price: '₹14,000/mo', desc: 'Custom full-stack web application or AI automation with React 19 and Node.js, custom CMS integration (Decap or Strapi), advanced JSON-LD SEO and Plausible analytics, 3 revision rounds, 30-day post-launch support, and API integrations. Best for e-commerce stores, SaaS dashboards, and membership portals.' },
  { name: 'Enterprise', price: '₹25,000/mo', desc: 'Full-stack product development with React 19, TypeScript, Node.js, AI agent integration via LangChain, mobile app development with React Native, dedicated project manager, unlimited revision rounds, ongoing maintenance, and 24-hour priority response SLA. Best for multi-tenant platforms, marketplaces, and ERP systems.' },
  { name: 'Custom Animated', price: '₹3,00,000', desc: 'Award-caliber 3D WebGL experiences using Three.js and React Three Fiber with cinematic GSAP ScrollTrigger animations, dedicated creative director, unlimited revision rounds, priority support, and performance optimization for 60fps. Best for 3D brand showcases, interactive product launches, and cinematic storytelling.' },
]

const servicesList = [
  'Custom Web Development', 'AI Agents & Automation', 'Mobile App Development',
  'UI/UX Design', 'API Development & Integration', 'AI Chatbots & Assistants',
  'Landing Pages & Portfolios', 'Full-Stack Product Development',
]

const blogPosts = [
  { slug: 'paws-for-change-india', title: 'Building a Pet Adoption Platform That Actually Connects Rescuers With Families', excerpt: 'How we built a full-featured animal rescue & adoption platform for Paws for Change India that helped 50+ pets find forever homes.', date: '2026-03-15', category: 'Web Development', tags: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'], image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=85', result: '50+ pets adopted through the platform', url: 'https://github.com/jeremygideonbareh/paws-for-change-india', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { slug: 'chelsea-man-spa', title: 'Designing a Premium Mobile Booking Experience for a Dubai Marina Spa', excerpt: 'A cross-platform React Native app with Google Auth, real-time Firestore bookings, and a dark gold theme that drove 200+ bookings in month one.', date: '2026-02-20', category: 'Mobile Apps', tags: ['React Native', 'Firebase', 'Google Auth', 'Stripe'], image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&q=85', result: '200+ bookings in first month', url: 'https://github.com/jeremygideonbareh/chelsea-man-spa-mobile', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { slug: 'support-ticket-agent', title: 'Automating Customer Support With AI Agents: 70% Faster Triage', excerpt: 'We built a LangChain-powered AI agent that classifies, prioritizes, and drafts responses to support tickets.', date: '2026-04-01', category: 'AI & Automation', tags: ['Python', 'LangChain', 'LangGraph', 'OpenAI'], image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85', result: '70% reduction in manual triage time', url: 'https://github.com/jeremygideonbareh/support-ticket-agent', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { slug: 'jmj-events-interiors', title: 'A Portfolio Website That Turns Browsers Into Clients for JMJ Events', excerpt: 'Full-service events and interiors website with portfolio gallery, service catalog, and inquiry form.', date: '2026-01-10', category: 'Web Development', tags: ['React', 'TypeScript', 'Responsive', 'CMS'], image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85', result: '3x increase in client inquiries', url: 'https://github.com/jeremygideonbareh/JMJ-Events-Interiors-', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { slug: 'crumbs-bakery', title: 'From Brick-and-Mortar to Online Orders: Launching Crumbs Bakery on the Web', excerpt: 'An artisan bakery website with online ordering, product catalog, and location finder.', date: '2026-04-10', category: 'Web Development', tags: ['React', 'JavaScript', 'PostgreSQL', 'Responsive'], image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=1200&q=85', result: 'Online orders within 2 weeks of launch', url: 'https://github.com/jeremygideonbareh/crumbs-bakery-', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { slug: 'trading-bot', title: 'Building a 24/7 Automated Trading Pipeline With Python and TypeScript', excerpt: 'An automated trading system with real-time market data, strategy execution, and portfolio management.', date: '2026-05-01', category: 'AI & Automation', tags: ['Python', 'TypeScript', 'Docker', 'APIs'], image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85', result: 'Automated 24/7 trading pipeline', url: 'https://github.com/jeremygideonbareh/trading-bot-', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { slug: 'ecommerce-nextjs-stripe', title: 'Building a High-Performance E-commerce Store with Next.js and Stripe', excerpt: 'How we built a full-featured e-commerce store for a fashion brand using Next.js 15 with Stripe Connect payments, PostgreSQL inventory management, and Tailwind CSS — achieving 40% higher conversion than the previous Shopify store.', date: '2026-04-20', category: 'Web Development', tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85', result: '40% increase in conversion rate', url: 'https://github.com/jeremygideonbareh/ecommerce-nextjs-store', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { slug: 'ai-chatbot-langchain-saas', title: 'How We Built a Custom AI Chatbot for a SaaS Company Using LangChain', excerpt: 'How Rogue Code built an AI customer support chatbot for a B2B SaaS platform using LangChain, OpenAI GPT-4, and a custom RAG pipeline — resolving 65% of queries automatically and cutting support costs by 45%.', date: '2026-05-15', category: 'AI & Automation', tags: ['Python', 'LangChain', 'OpenAI', 'PostgreSQL', 'Docker'], image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85', result: '65% of support queries resolved without human intervention', url: 'https://github.com/jeremygideonbareh/ai-chatbot-langchain', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { slug: 'analytics-dashboard-react-firebase', title: 'Building a Real-Time Analytics Dashboard with React and Firebase', excerpt: 'How Rogue Code built a real-time business analytics dashboard using React 19, Firebase Firestore, and Recharts — processing 50,000+ daily events with sub-second query times and interactive data visualization.', date: '2026-06-01', category: 'Web Development', tags: ['React', 'Firebase', 'TypeScript', 'Recharts', 'Tailwind CSS'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85', result: 'Real-time data processing for 50,000+ events daily', url: 'https://github.com/jeremygideonbareh/analytics-dashboard', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { slug: 'ai-invoice-processing', title: 'Automating Invoice Processing with AI Document Extraction', excerpt: 'How Rogue Code built an AI-powered invoice processing system using OpenAI GPT-4 Vision and LangChain — extracting data from 1,000+ invoices per week with 97% accuracy and reducing manual data entry by 85%.', date: '2026-06-15', category: 'AI & Automation', tags: ['Python', 'OpenAI', 'LangChain', 'PostgreSQL', 'Docker'], image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=85', result: '85% faster invoice processing with 97% accuracy', url: 'https://github.com/jeremygideonbareh/ai-invoice-processor', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
]

const caseStudies = [
  { name: 'Paws for Change India', cat: 'Web Development', desc: 'Animal rescue NGO platform built with React 19, TypeScript, Tailwind CSS, and Firebase — featuring a searchable pet listing database, Stripe donation integration, volunteer management dashboard, and foster application workflow.', tags: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'], url: 'https://github.com/jeremygideonbareh/paws-for-change-india', result: '50+ pets adopted through the platform', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=85', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Chelsea Man Spa', cat: 'Mobile Apps', desc: 'Cross-platform React Native mobile booking app for a Dubai Marina men\'s grooming spa with Google One-Tap Authentication, Firestore real-time slot availability, Stripe Connect payments, and Firebase Cloud Messaging push notifications.', tags: ['React Native', 'Firebase', 'Google Auth', 'Stripe'], url: 'https://github.com/jeremygideonbareh/chelsea-man-spa-mobile', result: '200+ bookings in first month', image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=85', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Support Ticket Agent', cat: 'AI & Automation', desc: 'LangChain and LangGraph AI agent processing 500+ daily support tickets — multi-label classification across 12 categories with GPT-4, context-aware draft response generation, Slack webhook escalation, and LangSmith feedback loop.', tags: ['Python', 'LangChain', 'LangGraph', 'OpenAI'], url: 'https://github.com/jeremygideonbareh/support-ticket-agent', result: '70% reduction in manual triage time', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=85', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'JMJ Events & Interiors', cat: 'Web Development', desc: 'React 19 and TypeScript portfolio website for luxury event design company — masonry gallery with category filtering, Decap CMS content management, multi-field inquiry form with budget range slider, and lazy-loaded WebP images.', tags: ['React', 'TypeScript', 'Responsive', 'CMS'], url: 'https://github.com/jeremygideonbareh/JMJ-Events-Interiors-', result: '3x increase in client inquiries', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Crumbs Bakery', cat: 'Web Development', desc: 'React 19 artisan bakery website with PostgreSQL order management — daily menu with time-based special rotation, dietary filters for gluten-free/vegan/nut-free/dairy-free, Stripe payment checkout, and admin dashboard with live order feed.', tags: ['React', 'JavaScript', 'PostgreSQL', 'Responsive'], url: 'https://github.com/jeremygideonbareh/crumbs-bakery-', result: 'Online orders within 2 weeks of launch', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=85', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Trading Bot', cat: 'AI & Automation', desc: 'Python-based automated trading engine with modular Docker-container strategy architecture — WebSocket feeds from Binance, Coinbase Pro, and Interactive Brokers, 5-year backtesting engine, Redis market data distribution, and React TypeScript dashboard.', tags: ['Python', 'TypeScript', 'Docker', 'APIs'], url: 'https://github.com/jeremygideonbareh/trading-bot-', result: 'Automated 24/7 trading pipeline', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=85', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'E-commerce Store (Next.js + Stripe)', cat: 'Web Development', desc: 'Next.js 15 e-commerce platform with Stripe Connect multi-currency payments (INR, AED, USD), real-time PostgreSQL inventory management across 3 warehouses, custom checkout flow with saved payment methods, Cloudflare Workers CDN global deployment, and admin dashboard with sales analytics and order management.', tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'], url: 'https://github.com/jeremygideonbareh/ecommerce-nextjs-store', result: '40% increase in conversion rate', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=85' },
  { name: 'AI Chatbot (LangChain + GPT-4)', cat: 'AI & Automation', desc: 'LangChain RAG chatbot with Pinecone vector database embeddings from 500+ support articles, OpenAI GPT-4 contextual response generation, semantic search for nuanced queries about API integration and billing tiers, Slack integration for human handoff on complex queries, Docker container deployment with auto-scaling, and analytics dashboard tracking resolution rate and user satisfaction.', tags: ['Python', 'LangChain', 'OpenAI', 'PostgreSQL', 'Docker'], url: 'https://github.com/jeremygideonbareh/ai-chatbot-langchain', result: '65% of support queries resolved without human intervention', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=85' },
  { name: 'Analytics Dashboard (React + Firebase)', cat: 'Web Development', desc: 'React 19 real-time analytics dashboard with Firebase Firestore sub-second data sync, Recharts interactive line, bar, and pie charts, live GPS vehicle tracking map for 200+ delivery vehicles, custom date range filters with instant re-render, automated PDF report generation, and mobile-responsive design for field managers.', tags: ['React', 'Firebase', 'TypeScript', 'Recharts', 'Tailwind CSS'], url: 'https://github.com/jeremygideonbareh/analytics-dashboard', result: 'Real-time data processing for 50,000+ events daily', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=85' },
  { name: 'AI Invoice Processor', cat: 'AI & Automation', desc: 'OpenAI GPT-4 Vision multi-format document parsing (PDF, JPG, PNG, TIFF) with LangChain orchestration pipeline for extraction, validation, and PostgreSQL storage — custom confidence scoring with 97%+ auto-approved for automated processing, batch processing via Docker containers handling 500 invoices in 5 minutes, and human review queue dashboard with full audit trail.', tags: ['Python', 'OpenAI', 'LangChain', 'PostgreSQL', 'Docker'], url: 'https://github.com/jeremygideonbareh/ai-invoice-processor', result: '85% faster invoice processing with 97% accuracy', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=85' },
]

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;')
}

function makeHomeContent() {
  return `<div id="root"><main style="padding:2rem;font-family:system-ui;color:#F2F2F2;background:#1A1817;max-width:1200px;margin:0 auto">
<h1 style="font-size:2.5rem;font-weight:700;margin-bottom:0.5rem">Rogue Code</h1>
<p style="font-size:1.2rem;color:#FF6B4A;margin-bottom:2rem">Web Development &amp; AI Automation Agency</p>
<p style="font-size:1rem;color:#8A8A8A;margin-bottom:2rem">We build custom websites, AI agents, mobile apps, and UI/UX design for businesses worldwide. From concept to launch — we ship production-grade digital products.</p>
<section style="margin-bottom:2rem"><h2 style="font-size:1.5rem;margin-bottom:0.75rem">Services</h2><ul style="color:#8A8A8A">${servicesList.map(s => `<li>${s}</li>`).join('')}</ul></section>
<section style="margin-bottom:2rem"><h2 style="font-size:1.5rem;margin-bottom:0.75rem">Case Studies</h2>${caseStudies.map(p => `<div style="margin-bottom:1rem;padding:1rem;border:1px solid rgba(255,255,255,0.1);border-radius:8px"><h3 style="font-size:1.1rem;margin-bottom:0.25rem">${escapeHtml(p.name)}</h3><p style="color:#8A8A8A;font-size:0.9rem">${escapeHtml(p.desc)}</p><p style="color:#FF6B4A;font-size:0.85rem;margin-top:0.25rem">Key Result: ${escapeHtml(p.result)}</p></div>`).join('')}</section>
<section style="margin-bottom:2rem"><h2 style="font-size:1.5rem;margin-bottom:0.75rem">Pricing</h2>${pricingData.map(p => `<div style="margin-bottom:0.75rem"><strong>${p.name}</strong> — ${p.price}<br><span style="color:#8A8A8A;font-size:0.9rem">${p.desc}</span></div>`).join('')}</section>
<section style="margin-bottom:2rem"><h2 style="font-size:1.5rem;margin-bottom:0.75rem">Frequently Asked Questions</h2>${faqData.map(f => `<div style="margin-bottom:0.75rem"><strong>${escapeHtml(f.q)}</strong><br><span style="color:#8A8A8A;font-size:0.9rem">${escapeHtml(f.a)}</span></div>`).join('')}</section>
<p style="color:#8A8A8A;font-size:0.85rem;margin-top:2rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,0.1)">&copy; 2026 Rogue Code. Contact: cloudlyconfusing@gmail.com | GitHub: github.com/jeremygideonbareh</p>
</main></div>`
}

function makeBlogContent(post, accent) {
  return `<div id="root"><main style="padding:2rem;font-family:system-ui;color:#F2F2F2;background:#0A0A0A;max-width:800px;margin:0 auto">
<span style="color:${accent};font-size:0.85rem;font-weight:600">${escapeHtml(post.category)}</span>
<h1 style="font-size:2rem;font-weight:700;margin:0.5rem 0">${escapeHtml(post.title)}</h1>
<p style="font-size:0.9rem;color:#8A8A8A;margin-bottom:1rem">${escapeHtml(post.excerpt)}</p>
<p style="color:#6A6A6A;font-size:0.85rem">${escapeHtml(post.date)}</p>
<div style="margin:1rem 0;gap:0.5rem;display:flex;flex-wrap:wrap">${post.tags.map(t => `<span style="font-size:0.8rem;padding:0.2rem 0.6rem;border:1px solid rgba(255,255,255,0.1);border-radius:999px;color:#8A8A8A">${escapeHtml(t)}</span>`).join('')}</div>
<div style="padding:1rem;border:1px solid ${accent}33;border-radius:8px;margin:1rem 0;background:${accent}08"><strong style="color:${accent}">Key Result:</strong> <span>${escapeHtml(post.result)}</span></div>
<p style="color:#8A8A8A;font-size:0.85rem;margin-top:2rem"><a href="${escapeHtml(post.url)}" style="color:#FF6B4A">View on GitHub</a></p>
</main></div>`
}

function makeCaseContent(project, accent) {
  return `<div id="root"><main style="padding:2rem;font-family:system-ui;color:#F2F2F2;background:#0A0A0A;max-width:800px;margin:0 auto">
<span style="color:${accent};font-size:0.85rem;font-weight:600">${escapeHtml(project.cat)}</span>
<h1 style="font-size:2rem;font-weight:700;margin:0.5rem 0">${escapeHtml(project.name)}</h1>
<p style="font-size:0.9rem;color:#8A8A8A;margin-bottom:1rem">${escapeHtml(project.desc)}</p>
<div style="margin:1rem 0;gap:0.5rem;display:flex;flex-wrap:wrap">${project.tags.map(t => `<span style="font-size:0.8rem;padding:0.2rem 0.6rem;border:1px solid rgba(255,255,255,0.1);border-radius:999px;color:#8A8A8A">${escapeHtml(t)}</span>`).join('')}</div>
<div style="padding:1rem;border:1px solid ${accent}33;border-radius:8px;margin:1rem 0;background:${accent}08"><strong style="color:${accent}">Key Result:</strong> <span>${escapeHtml(project.result)}</span></div>
<p style="color:#8A8A8A;font-size:0.85rem;margin-top:2rem"><a href="${escapeHtml(project.url)}" style="color:#FF6B4A">View on GitHub</a></p>
</main></div>`
}

function makeGenericContent(title, text) {
  return `<div id="root"><main style="padding:2rem;font-family:system-ui;color:#F2F2F2;background:#1A1817;max-width:800px;margin:0 auto"><h1 style="font-size:2rem;font-weight:700">${escapeHtml(title)}</h1><p style="font-size:0.95rem;color:#8A8A8A">${escapeHtml(text)}</p></main></div>`
}

function siteGraph(pageEntities, pageBreadcrumb) {
  const graph = [
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      name: 'Rogue Code',
      url: SITE,
      description: 'Web development & AI automation agency building custom websites, AI agents, mobile apps, and UI/UX design.',
      publisher: { '@id': ORG_ID },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Rogue Code',
      alternateName: 'Rogue Code Agency',
      description: 'A full-service web development and AI automation agency. We build custom websites, AI agents, mobile apps, and UI/UX design for businesses worldwide.',
      url: SITE,
      logo: `${SITE}/favicon.svg`,
      image: `${SITE}/og-image.jpg`,
      foundingDate: '2024',
      founder: { '@id': PERSON_ID },
      email: 'cloudlyconfusing@gmail.com',
      sameAs: [
        'https://github.com/jeremygideonbareh',
        'https://twitter.com/roguecodes',
        'https://linkedin.com/company/roguecodes',
        'https://www.youtube.com/@roguecodes',
        'https://www.producthunt.com/@roguecodes',
      ],
      knowsAbout: ['Web Development', 'React Development', 'AI Automation', 'AI Agents', 'Mobile App Development', 'UI/UX Design', 'Custom Software Development'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Rogue Code Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Web Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Agents & Automation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile App Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'API Development & Integration' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AI Chatbots & Assistants' } },
        ],
      },
      review: testimonials.map(t => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: t.name },
        reviewBody: t.quote,
        reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 },
      })),
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Jeremy Gideon Bareh',
      givenName: 'Jeremy',
      familyName: 'Bareh',
      jobTitle: 'Founder & Lead Developer',
      worksFor: { '@id': ORG_ID },
      url: SITE,
      sameAs: [
        'https://github.com/jeremygideonbareh',
        'https://twitter.com/roguecodes',
        'https://linkedin.com/company/roguecodes',
        'https://www.youtube.com/@roguecodes',
      ],
      knowsAbout: ['React', 'Next.js', 'TypeScript', 'Python', 'AI Agents', 'LangChain', 'Web Development'],
    },
  ]

  if (pageEntities) graph.push(...pageEntities)
  if (pageBreadcrumb) graph.push(pageBreadcrumb)

  return graph
}

function breadcrumb(itemList) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE}#breadcrumb`,
    itemListElement: itemList.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

const blogPostMap = {}
for (const p of blogPosts) blogPostMap[p.slug] = p

const caseStudyMap = {}
for (const p of caseStudies) {
  const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  caseStudyMap[slug] = { ...p, accent: p.name === 'Chelsea Man Spa' ? '#2B7A78' : p.name === 'JMJ Events & Interiors' ? '#3B8A88' : '#FF6B4A' }
}

function articleSchema(url, headline, desc, image, datePublished, tags) {
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline,
    description: desc,
    image,
    datePublished,
    dateModified: datePublished,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: url,
    keywords: (tags || []).join(', '),
  }
}

export function getRouteData(url) {
  const params = new URLSearchParams(url.search)
  const page = params.get('page')
  const slug = params.get('slug')

  if (!page) {
    return {
      title: 'Rogue Code — Web Development & AI Automation Agency',
      description: 'Rogue Code is a full-service web development and AI automation agency. We build custom websites, AI agents, mobile apps, and UI/UX design for businesses worldwide.',
      canonical: SITE + '/',
      schema: siteGraph([
        {
          '@type': 'ProfessionalService',
          '@id': `${SITE}#service`,
          name: 'Rogue Code',
          url: SITE,
          description: 'Full-service web development and AI automation agency.',
          priceRange: '₹7,000 - ₹3,00,000',
          areaServed: 'Worldwide',
          serviceArea: { '@type': 'Place', name: 'Global' },
          telephone: '+92-334-8585873',
          parentOrganization: { '@id': ORG_ID },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            bestRating: '5',
            ratingCount: testimonials.length.toString(),
            reviewCount: testimonials.length.toString(),
          },
        },
        {
          '@type': 'FAQPage',
          '@id': `${SITE}#faq`,
          mainEntity: faqData.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        },
      ]),
      rootContent: makeHomeContent(),
    }
  }

  if (page === 'case' && slug && caseStudyMap[slug]) {
    const p = caseStudyMap[slug]
    const pageUrl = `${SITE}/?page=case&slug=${slug}`
    const articleType = p.cat === 'Mobile Apps' ? 'MobileApplication' : 'SoftwareApplication'
    return {
      title: `${p.name} — Rogue Code Case Study`,
      description: p.desc,
      canonical: pageUrl,
      schema: siteGraph([
        articleSchema(pageUrl, `${p.name}: ${p.desc}`, p.desc, p.image, null, p.tags),
        {
          '@type': articleType,
          name: p.name,
          description: p.desc,
          url: p.url,
          applicationCategory: p.cat === 'Mobile Apps' ? 'Lifestyle' : 'BusinessApplication',
          operatingSystem: 'Cross-platform',
          author: { '@id': ORG_ID },
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      ], breadcrumb([
        { name: 'Home', url: SITE },
        { name: 'Case Studies', url: `${SITE}/?page=blog` },
        { name: p.name, url: pageUrl },
      ])),
      rootContent: makeCaseContent(p, p.accent),
    }
  }

  if (page === 'blog') {
    if (slug && blogPostMap[slug]) {
      const p = blogPostMap[slug]
      const pageUrl = `${SITE}/?page=blog&slug=${slug}`
      return {
        title: `${p.title} — Rogue Code Case Study`,
        description: p.excerpt,
        canonical: pageUrl,
        schema: siteGraph([
          articleSchema(pageUrl, p.title, p.excerpt, p.image, p.date, p.tags),
        ], breadcrumb([
          { name: 'Home', url: SITE },
          { name: 'Case Studies', url: `${SITE}/?page=blog` },
          { name: p.title, url: pageUrl },
        ])),
        rootContent: makeBlogContent(p, '#E85D3A'),
      }
    }
    return {
      title: 'Case Studies — Rogue Code',
      description: 'Deep dives into projects shipped by Rogue Code — web development, AI automation, and mobile apps.',
      canonical: `${SITE}/?page=blog`,
      schema: siteGraph([
        {
          '@type': 'CollectionPage',
          '@id': `${SITE}/?page=blog#page`,
          name: 'Rogue Code Case Studies',
          description: 'Project case studies and technical deep dives.',
          publisher: { '@id': ORG_ID },
        },
      ], breadcrumb([
        { name: 'Home', url: SITE },
        { name: 'Case Studies', url: `${SITE}/?page=blog` },
      ])),
      rootContent: makeGenericContent('Case Studies', 'Deep dives into projects shipped by Rogue Code — web development, AI automation, and mobile apps.'),
    }
  }

  if (page === 'sales-pricing') {
    return {
      title: 'Pricing — Rogue Code Agency',
      description: 'Rogue Code pricing: Basic (₹7,000), Business (₹14,000), Enterprise (₹25,000), Custom Animated (₹3,00,000). Web development, AI automation, and mobile app services.',
      canonical: `${SITE}/?page=sales-pricing`,
      schema: siteGraph([
        {
          '@type': 'AboutPage',
          '@id': `${SITE}/?page=sales-pricing#page`,
          name: 'Pricing',
          description: 'Service pricing for Rogue Code agency.',
          publisher: { '@id': ORG_ID },
        },
      ], breadcrumb([
        { name: 'Home', url: SITE },
        { name: 'Pricing', url: `${SITE}/?page=sales-pricing` },
      ])),
      rootContent: makeGenericContent('Rogue Code Pricing', 'Basic: ₹7,000/mo — Business: ₹14,000/mo — Enterprise: ₹25,000/mo — Custom Animated: ₹3,00,000'),
    }
  }

  if (page === 'admin') {
    return {
      title: 'Admin Dashboard — Rogue Code',
      description: 'Lead management dashboard for Rogue Code.',
      canonical: `${SITE}/?page=admin`,
      schema: siteGraph(),
      rootContent: makeGenericContent('Admin Dashboard', 'Lead management dashboard for Rogue Code.'),
    }
  }

  if (page === 'about') {
    return {
      title: 'About Us — Rogue Code Agency',
      description: 'Rogue Code is a full-service web development and AI automation agency building custom digital products. We ship production-grade code that you own.',
      canonical: `${SITE}/?page=about`,
      schema: siteGraph([
        {
          '@type': 'AboutPage',
          '@id': `${SITE}/?page=about#page`,
          name: 'About Rogue Code',
          description: 'Rogue Code agency background and philosophy.',
          publisher: { '@id': ORG_ID },
        },
      ], breadcrumb([
        { name: 'Home', url: SITE },
        { name: 'About', url: `${SITE}/?page=about` },
      ])),
      rootContent: makeGenericContent('About Rogue Code', 'We engineer custom digital experiences — no themes, no page builders, no compromises. We combine AI-native workflows with hand-crafted engineering.'),
    }
  }

  if (page === 'privacy') {
    return {
      title: 'Privacy Policy — Rogue Code',
      description: 'Privacy policy for Rogue Code website and services.',
      canonical: `${SITE}/?page=privacy`,
      schema: siteGraph(),
      rootContent: makeGenericContent('Privacy Policy', 'Rogue Code privacy policy.'),
    }
  }

  if (page === 'terms') {
    return {
      title: 'Terms of Service — Rogue Code',
      description: 'Terms of service for Rogue Code website and services.',
      canonical: `${SITE}/?page=terms`,
      schema: siteGraph(),
      rootContent: makeGenericContent('Terms of Service', 'Rogue Code terms of service.'),
    }
  }

  if (page === 'service' && slug) {
    const serviceMeta = {
      'web-development': { title: 'Custom Web Development — React, Next.js, TypeScript | Rogue Code', desc: 'Rogue Code builds custom React 19 and Next.js 15 websites with TypeScript and Tailwind CSS. No page builders, no templates — production-grade code deployed to Cloudflare Workers.' },
      'ai-automation': { title: 'AI Agents & Automation — LangChain, GPT-4, Custom ML | Rogue Code', desc: 'Rogue Code builds AI agents with LangChain, LangGraph, and OpenAI GPT-4. Automate customer support, ticket triage, and business workflows with measurable ROI.' },
      'mobile-apps': { title: 'React Native Mobile App Development — iOS & Android | Rogue Code', desc: 'Rogue Code ships cross-platform React Native apps with Firebase, Google Auth, Stripe payments, and push notifications. Single codebase for iOS and Android.' },
    }
    const meta = serviceMeta[slug]
    if (!meta) return null
    const pageUrl = `${SITE}/?page=service&slug=${slug}`
    return {
      title: meta.title,
      description: meta.desc,
      canonical: pageUrl,
      schema: siteGraph([
        {
          '@type': 'AboutPage',
          '@id': `${pageUrl}#page`,
          name: meta.title,
          description: meta.desc,
          publisher: { '@id': ORG_ID },
        },
      ], breadcrumb([
        { name: 'Home', url: SITE },
        { name: 'Services', url: `${SITE}/?page=services` },
        { name: meta.title, url: pageUrl },
      ])),
      rootContent: makeGenericContent(meta.title, meta.desc),
    }
  }

  return null
}
