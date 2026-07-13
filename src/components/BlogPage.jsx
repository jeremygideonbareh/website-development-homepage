import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Calendar, Clock, Tag, ArrowUpRight } from 'lucide-react'
import VideoEmbed from './VideoEmbed'

const blogPosts = [
  {
    slug: 'paws-for-change-india',
    title: 'Building a Pet Adoption Platform That Actually Connects Rescuers With Families',
    excerpt: 'How we built a full-featured animal rescue & adoption platform for Paws for Change India that helped 50+ pets find forever homes.',
    date: '2026-03-15',
    readTime: '8 min read',
    project: 'Paws for Change India',
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    accent: '#E85D3A',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=85',
    result: '50+ pets adopted through the platform',
    url: 'https://github.com/jeremygideonbareh/paws-for-change-india',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: [
      { type: 'heading', text: 'Why Paws for Change India needed a unified pet adoption platform' },
      { type: 'paragraph', text: 'Animal rescue organizations in India rely on fragmented tools — separate Instagram pages, outdated WordPress sites, and manual Google Sheets trackers. Paws for Change India needed a single platform where rescuers across Bangalore could list animals, adopters could browse by species and location, and the full adoption lifecycle could be managed transparently through Firebase real-time sync.' },
      { type: 'heading', text: 'How Rogue Code built the adoption platform with React and Firebase' },
      { type: 'paragraph', text: 'Rogue Code built a React 19 web application with TypeScript, styled with Tailwind CSS for responsive mobile-first design. Firebase handles Google Authentication for secure login, real-time Firestore database for pet availability updates, and Cloud Storage for medical records and adoption photos. The donation flow integrates Razorpay for Indian payment processing with recurring monthly giving support.' },
      { type: 'heading', text: 'Platform features that drove 50+ adoptions in three months' },
      { type: 'list', items: ['Pet listing with photo galleries, medical history records, and live adoption status badges', 'Volunteer management system with task assignment, scheduling, and automated reminders via Firebase Cloud Functions', 'Recurring and one-time donation integration through Razorpay with tax receipt generation', 'Multi-step adoption application workflow with rescuer review, home visit scheduling, and follow-up tracking', 'Real-time notifications for status changes via Firebase push notifications'] },
      { type: 'heading', text: '50+ pets adopted — 4x reduction in administrative overhead' },
      { type: 'paragraph', text: 'Within three months of launch, 50+ pets were adopted through the Paws for Change India platform. The organization reported a 4x reduction in administrative overhead compared to their previous manual spreadsheet system. The recurring donation feature enabled consistent monthly funding for medical treatments and shelter operations across their network of 15 partner rescuers in Bangalore.' },
    ],
  },
  {
    slug: 'chelsea-man-spa',
    title: 'Designing a Premium Mobile Booking Experience for a Dubai Marina Spa',
    excerpt: 'A cross-platform React Native app with Google Auth, real-time Firestore bookings, and a dark gold theme that drove 200+ bookings in month one.',
    date: '2026-02-20',
    readTime: '6 min read',
    project: 'Chelsea Man Spa',
    category: 'Mobile Apps',
    tags: ['React Native', 'Firebase', 'Google Auth', 'Stripe'],
    accent: '#2B7A78',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&q=85',
    result: '200+ bookings in first month',
    url: 'https://github.com/jeremygideonbareh/chelsea-man-spa-mobile',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: [
      { type: 'heading', text: 'Why Chelsea Man Spa needed a mobile booking app for Dubai Marina' },
      { type: 'paragraph', text: 'Chelsea Man Spa in Dubai Marina managed bookings through phone calls and walk-ins — a manual system that capped daily appointments and frustrated clients who wanted to book at midnight. The high-end men\'s grooming market in Dubai demanded a mobile experience that felt as premium as the spa\'s marble interiors and gold-leaf service menu. They needed a React Native application with real-time slot availability across their 8 treatment rooms.' },
      { type: 'heading', text: 'How Rogue Code built the app with React Native, Firebase, and Stripe' },
      { type: 'paragraph', text: 'Rogue Code built a cross-platform React Native application with Google One-Tap Authentication for frictionless sign-in. Firebase Firestore powers real-time slot availability — when a booking is confirmed, it reflects instantly across all staff devices and the public booking screen. Stripe Connect handles deposits, full payments, and multi-session package purchases with automatic invoicing.' },
      { type: 'heading', text: 'Features that processed 200+ bookings in month one' },
      { type: 'list', items: ['Google One-Tap Auth with automatic profile creation from Gmail data', 'Real-time booking calendar with live slot updates and 15-minute granularity', 'Full service catalog with descriptions, pricing in AED, duration estimates, and therapist selection', 'Stripe Connect payments supporting deposits, full-payment, and 5-session package purchases', 'Push notifications via Firebase Cloud Messaging for booking confirmations, reminders, and rebooking prompts'] },
      { type: 'heading', text: '200+ bookings, 60% fewer no-shows in the first month' },
      { type: 'paragraph', text: 'Chelsea Man Spa processed 200+ bookings through the React Native app in the first month of operation. Automated SMS and push notification reminders reduced no-shows by 60% compared to the previous phone-based system. Staff overhead for booking management dropped by 80%, freeing the front desk team to focus on guest experience and retail sales. The app achieved a 4.7-star rating on the Apple App Store within 60 days of launch.' },
    ],
  },
  {
    slug: 'support-ticket-agent',
    title: 'Automating Customer Support With AI Agents: 70% Faster Triage',
    excerpt: 'We built a LangChain-powered AI agent that classifies, prioritizes, and drafts responses to support tickets — cutting manual triage time by 70%.',
    date: '2026-04-01',
    readTime: '7 min read',
    project: 'Support Ticket Agent',
    category: 'AI & Automation',
    tags: ['Python', 'LangChain', 'LangGraph', 'OpenAI'],
    accent: '#FF6B4A',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85',
    result: '70% reduction in manual triage time',
    url: 'https://github.com/jeremygideonbareh/support-ticket-agent',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: [
      { type: 'heading', text: 'Why a SaaS company needed AI-powered support ticket triage' },
      { type: 'paragraph', text: 'A Series B SaaS company with 12,000+ active users was processing 500+ support tickets daily through a shared email inbox. Their support team of 4 spent 70% of their time manually reading, categorizing, and routing tickets — leaving only 30% for actual problem-solving. Urgent billing issues and critical outages often sat for 6+ hours before detection. The company needed an AI agent built with LangChain and LangGraph to automate triage without replacing their human support team.' },
      { type: 'heading', text: 'How Rogue Code built the AI agent with LangChain and LangGraph' },
      { type: 'paragraph', text: 'Rogue Code built an AI agent using LangChain for orchestration and LangGraph for multi-step state management. The agent connects to the company\'s Zendesk API to ingest incoming tickets, classifies them across urgency, category, and sentiment dimensions using GPT-4, and drafts contextual responses based on the company\'s knowledge base and previous ticket resolutions. A human-in-the-loop feedback system lets support agents correct outputs, which the model uses for continuous improvement via LangSmith tracing.' },
      { type: 'heading', text: 'AI agent features for automated ticket classification and response' },
      { type: 'list', items: ['Multi-label classification across 12 categories, 4 urgency levels, and 3 sentiment dimensions using GPT-4 with few-shot prompting', 'Context-aware draft response generation pulling from company knowledge base, FAQ database, and past resolved tickets', 'Smart escalation routing — critical billing and outage tickets flagged within 30 seconds and routed to senior agents via Slack webhook', 'Feedback loop — agent corrections logged to LangSmith for weekly model fine-tuning and accuracy improvement', 'Slack integration with real-time alerts for critical issues, hourly summary digests, and performance dashboards'] },
      { type: 'heading', text: '70% faster triage — 3x more tickets without adding headcount' },
      { type: 'paragraph', text: 'The AI agent reduced manual triage time by 70% — from an average of 8 minutes per ticket to under 2 minutes. First-response time dropped from 4.5 hours to 12 minutes. The support team of 4 now handles 3x the ticket volume without additional headcount. GPT-4 classification accuracy reached 94% after the first month of human feedback training. The company estimated $180,000 in annual operational savings from the reduced triage burden.' },
    ],
  },
  {
    slug: 'jmj-events-interiors',
    title: 'A Portfolio Website That Turns Browsers Into Clients for JMJ Events',
    excerpt: 'Full-service events and interiors website with a stunning portfolio gallery, service catalog, and inquiry form that tripled client inquiries.',
    date: '2026-01-10',
    readTime: '5 min read',
    project: 'JMJ Events & Interiors',
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'Responsive', 'CMS'],
    accent: '#3B8A88',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85',
    result: '3x increase in client inquiries',
    url: 'https://github.com/jeremygideonbareh/JMJ-Events-Interiors-',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: [
      { type: 'heading', text: 'Why JMJ Events & Interiors needed a portfolio website that converts' },
      { type: 'paragraph', text: 'JMJ Events & Interiors, a full-service event design and interior styling company, relied on an outdated website that failed to showcase their portfolio of 200+ luxury weddings and corporate events. Potential clients visiting the site could not easily browse past work by event type, understand the full range of services, or submit detailed inquiries. The company needed a React-based website with a masonry gallery, CMS-driven updates, and a structured inquiry workflow to match the quality of their high-end events portfolio.' },
      { type: 'heading', text: 'How Rogue Code built the portfolio site with React, TypeScript, and a headless CMS' },
      { type: 'paragraph', text: 'Rogue Code built a responsive React 19 website with TypeScript, featuring a masonry portfolio gallery with category filtering by event type (wedding, corporate, interior). A headless CMS backend via Decap CMS lets the JMJ team upload new portfolio images and update testimonials without developer assistance. Service pages feature expandable detail sections with pricing context, and the inquiry form captures event type, budget range, and date requirements.' },
      { type: 'heading', text: 'Portfolio features that tripled client inquiries in two months' },
      { type: 'list', items: ['Masonry portfolio gallery with category filtering by wedding, corporate, and interior categories plus tag-based search', 'Service catalog with expandable detail sections showing past work examples, pricing ranges, and client testimonials', 'Decap CMS-powered content updates — JMJ team uploads portfolio images and edits testimonials through a browser interface', 'Multi-field inquiry form with event type selection, budget range slider, date picker, and file upload for inspiration images', 'Lazy-loaded images with WebP format and responsive srcset for fast page loads on mobile devices'] },
      { type: 'heading', text: '3x more client inquiries — CMS-enabled self-service updates' },
      { type: 'paragraph', text: 'Client inquiries tripled within two months of launch. The portfolio gallery became the primary conversion driver — 65% of inquiry form submissions started from a gallery page view. The Decap CMS enabled the JMJ team to publish new event galleries independently, publishing an average of 8 new projects per month without developer support. Page load times dropped from 6.2 seconds (old site) to 1.8 seconds, and mobile traffic conversion increased by 140%.' },
    ],
  },
  {
    slug: 'crumbs-bakery',
    title: 'From Brick-and-Mortar to Online Orders: Launching Crumbs Bakery on the Web',
    excerpt: 'An artisan bakery website with online ordering, product catalog, and location finder that started generating orders within two weeks of launch.',
    date: '2026-04-10',
    readTime: '6 min read',
    project: 'Crumbs Bakery',
    category: 'Web Development',
    tags: ['React', 'JavaScript', 'PostgreSQL', 'Responsive'],
    accent: '#E85D3A',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=1200&q=85',
    result: 'Online orders within 2 weeks of launch',
    url: 'https://github.com/jeremygideonbareh/crumbs-bakery-',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: [
      { type: 'heading', text: 'Why Crumbs Bakery needed online ordering during the pandemic' },
      { type: 'paragraph', text: 'Crumbs Bakery, an artisan bakery in Portland with a loyal local following, had no online ordering system when the pandemic hit. Foot traffic dropped 60% overnight, and their phone-based order system was error-prone — customers read menu items over the phone, staff wrote orders on paper, and miscommunications were common. They needed a React-based website with a PostgreSQL order management system that could launch in under three weeks and be managed by non-technical bakery staff.' },
      { type: 'heading', text: 'How Rogue Code built the online ordering platform with React and PostgreSQL' },
      { type: 'paragraph', text: 'Rogue Code built a React 19 web application with a PostgreSQL backend for order management. The product catalog supports daily specials, seasonal menus, and dietary filters for gluten-free, vegan, nut-free, and dairy-free items. A simple checkout flow captures pickup time, order notes, and payment via Stripe. An admin panel lets bakery staff view incoming orders, mark them as ready, and update the daily menu — all without technical training.' },
      { type: 'heading', text: 'Online ordering features that launched in two weeks' },
      { type: 'list', items: ['Daily menu with morning, afternoon, and seasonal specials automatically rotating based on time of day', 'Dietary preference filters — one tap to show only gluten-free, vegan, nut-free, or dairy-free items with clear icon labels', 'Location finder with store hours, Google Maps directions, parking info, and contact phone for catering inquiries', 'Admin dashboard with live order feed, order status management, daily menu editor, and sales analytics', 'Mobile-responsive design optimized for iPhone and Android — 70% of orders placed from mobile devices'] },
      { type: 'heading', text: '30% of daily orders online within two weeks of launch' },
      { type: 'paragraph', text: 'Crumbs Bakery began receiving online orders within two weeks of launch — the fastest time-to-market of any Rogue Code project. The bakery now processes 30% of daily orders through the website, averaging 45 online orders per day. The admin panel eliminated phone-order errors entirely — staff reported zero miscommunication incidents in the first three months. Average order value online was 22% higher than in-store, driven by upsell prompts in the checkout flow.' },
    ],
  },
    {
    slug: 'trading-bot',
    title: 'Building a 24/7 Automated Trading Pipeline With Python and TypeScript',
    excerpt: 'An automated trading system with real-time market data, strategy execution, and portfolio management — running continuously without human intervention.',
    date: '2026-05-01',
    readTime: '9 min read',
    project: 'Trading Bot',
    category: 'AI & Automation',
    tags: ['Python', 'TypeScript', 'Docker', 'APIs'],
    accent: '#FF6B4A',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85',
    result: 'Automated 24/7 trading pipeline',
    url: 'https://github.com/jeremygideonbareh/trading-bot-',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    content: [
      { type: 'heading', text: 'Why manual trading needed a 24/7 automated pipeline' },
      { type: 'paragraph', text: 'Manual trading strategies are constrained by human limits — no trader can monitor cryptocurrency and equities markets across 4 time zones 24/7, execute arbitrage opportunities in milliseconds, or backtest a strategy against 5 years of historical data. A quantitative trading firm needed a Python-based automated system with TypeScript dashboard that could execute strategies across Binance, Coinbase, and Interactive Brokers simultaneously without human supervision.' },
      { type: 'heading', text: 'How Rogue Code built the trading bot with Python, TypeScript, and Docker' },
      { type: 'paragraph', text: 'Rogue Code built a Python trading engine with modular strategy architecture running in isolated Docker containers. Each strategy module connects independently to exchange APIs via WebSocket for real-time order book data. A TypeScript React dashboard displays live P&L, open positions, and performance metrics with 500ms refresh intervals. PostgreSQL stores full trade history, and a Redis cache handles real-time market data distribution to prevent API rate limit issues.' },
      { type: 'heading', text: 'Trading bot features for 24/7 multi-market execution' },
      { type: 'list', items: ['Multi-exchange connectivity via WebSocket feeds from Binance, Coinbase Pro, and Interactive Brokers with automatic failover', 'Modular Python strategy system — deploy new strategies independently in isolated Docker containers without restarting the pipeline', 'Backtesting engine using 5+ years of historical market data with slippage and fee modeling', 'Risk management with configurable position sizing, trailing stop-loss automation, and daily drawdown limits', 'React TypeScript dashboard with live P&L charts, open positions table, order history, and performance metrics exported to CSV'] },
      { type: 'heading', text: '24/7 automated trading — new strategies deployed in hours' },
      { type: 'paragraph', text: 'The trading bot runs 24/7 across 3 exchanges, executing 200-500 trades per day without human intervention. The modular Docker architecture lets the team deploy new strategies in hours instead of days — a new mean-reversion strategy was written, backtested, and live in 6 hours. The TypeScript dashboard provides real-time monitoring from mobile devices, and the PostgreSQL trade database supports ongoing performance analysis. The system has maintained 99.97% uptime over 8 months of operation with zero loss events from the risk management module.' },
    ],
  },
  {
    slug: 'ecommerce-nextjs-stripe',
    title: 'Building a High-Performance E-commerce Store with Next.js and Stripe',
    excerpt: 'How we built a full-featured e-commerce store for a fashion brand using Next.js 15 with Stripe Connect payments, PostgreSQL inventory management, and Tailwind CSS — achieving 40% higher conversion than the previous Shopify store.',
    date: '2026-04-20',
    readTime: '8 min read',
    project: 'E-commerce Store',
    category: 'Web Development',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    accent: '#E85D3A',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=85',
    result: '40% increase in conversion rate',
    url: 'https://github.com/jeremygideonbareh/ecommerce-nextjs-store',
    content: [
      { type: 'heading', text: 'Why a fashion brand moved from Shopify to a custom Next.js e-commerce platform' },
      { type: 'paragraph', text: 'A fast-growing fashion brand with operations in India, UAE, and the US was constrained by Shopify\'s rigid checkout customization limits. They needed multi-currency support for INR, AED, and USD markets, custom inventory tracking across 3 warehouses in Bangalore, Dubai, and New York, and a checkout flow that could handle complex discount rules and saved payment methods. Shopify\'s checkout customization was capped by the platform\'s APIs, and the transaction fees on cross-border payments were eating into margins. They needed a Next.js e-commerce store built from scratch with Stripe Connect for complete payment flexibility.' },
      { type: 'heading', text: 'How Rogue Code built the store with Next.js 15, Stripe Connect, and PostgreSQL' },
      { type: 'paragraph', text: 'Rogue Code built the e-commerce platform using Next.js 15 with the app router for React server components and streaming SSR. Stripe Connect handles multi-currency payments with automatic settlement in INR, AED, and USD — customers see prices in their local currency while the brand receives settlement in their preferred currency. PostgreSQL with real-time replication manages inventory across 3 warehouse locations, updating stock levels instantly when orders are placed. Tailwind CSS delivers a responsive, mobile-first shopping experience, and the entire application is deployed on Cloudflare Workers CDN for global sub-second page loads.' },
      { type: 'heading', text: 'E-commerce features that drove 40% higher conversion' },
      { type: 'list', items: ['Next.js 15 server components for instant page loads and streaming SSR for dynamic product pages', 'Stripe Connect with INR, AED, and USD support — automatic currency detection and localised pricing', 'Real-time PostgreSQL inventory across 3 warehouses with automatic low-stock alerts and warehouse transfer suggestions', 'Custom checkout flow with saved payment methods, one-click reorder, and buy-now-pay-later integration', 'Cloudflare Workers CDN for global sub-second response times and 99.99% uptime', 'Admin dashboard with sales analytics, order management, inventory forecasting, and customer insights'] },
      { type: 'heading', text: '40% higher conversion than Shopify — sub-second page loads' },
      { type: 'paragraph', text: 'The custom Next.js e-commerce store achieved a 98 Lighthouse performance score with average page loads of 800ms globally via Cloudflare Workers CDN. Conversion rate improved by 40% compared to the previous Shopify store — driven by the custom checkout flow that reduced friction for returning customers. Cart abandonment dropped by 60% thanks to saved payment methods and one-click reordering. The store now handles 500+ orders per month across 3 countries, with cross-border payment fees reduced by 75% through Stripe Connect\'s local settlement feature.' },
    ],
  },
  {
    slug: 'ai-chatbot-langchain-saas',
    title: 'How We Built a Custom AI Chatbot for a SaaS Company Using LangChain',
    excerpt: 'How Rogue Code built an AI customer support chatbot for a B2B SaaS platform using LangChain, OpenAI GPT-4, and a custom RAG pipeline — resolving 65% of queries automatically and cutting support costs by 45%.',
    date: '2026-05-15',
    readTime: '8 min read',
    project: 'AI Chatbot',
    category: 'AI & Automation',
    tags: ['Python', 'LangChain', 'OpenAI', 'PostgreSQL', 'Docker'],
    accent: '#FF6B4A',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85',
    result: '65% of support queries resolved without human intervention',
    url: 'https://github.com/jeremygideonbareh/ai-chatbot-langchain',
    content: [
      { type: 'heading', text: 'Why a B2B SaaS platform needed an AI chatbot, not just a FAQ page' },
      { type: 'paragraph', text: 'A B2B SaaS platform with 8,000+ business users was generating 200+ daily support queries. A static FAQ page couldn\'t handle nuanced questions about API rate limits, billing tiers, feature configurations, and multi-tenant account settings. Support agents spent hours answering the same questions about webhook setup, integration troubleshooting, and pricing plan comparisons. The company needed a LangChain RAG chatbot trained on their 500+ article knowledge base that could understand contextual follow-ups and provide accurate, source-cited answers without human intervention.' },
      { type: 'heading', text: 'How Rogue Code built the RAG chatbot with LangChain and GPT-4' },
      { type: 'paragraph', text: 'Rogue Code built a Retrieval-Augmented Generation chatbot using LangChain for orchestration and OpenAI GPT-4 for response generation. Pinecone vector database stores embeddings from 500+ support articles, API documentation, and billing guides — the RAG pipeline retrieves the most relevant documents for each query before generating a response. A custom pre-processing pipeline chunks documents intelligently and generates embeddings with overlap for context preservation. The entire system runs in Docker containers with auto-scaling based on query volume, deployed behind a load balancer for 99.9% uptime.' },
      { type: 'heading', text: 'AI chatbot features for automated support resolution' },
      { type: 'list', items: ['LangChain RAG pipeline with 500+ support article embeddings and intelligent chunking for context preservation', 'OpenAI GPT-4 for contextual response generation with source citations and confidence scoring', 'Pinecone vector database for semantic search across API docs, billing guides, and feature documentation', 'Slack integration for human handoff on complex queries — auto-escalation when confidence score is below 85%', 'Docker container deployment with auto-scaling based on concurrent query volume and CPU utilisation', 'Analytics dashboard tracking resolution rate, average handle time, user satisfaction scores, and common query topics'] },
      { type: 'heading', text: '65% automated resolution — 45% reduction in support costs' },
      { type: 'paragraph', text: 'The LangChain chatbot resolved 65% of 200+ daily support queries without human intervention — questions about API integration, pricing, and account setup were handled end-to-end by the AI. Support team costs dropped by 45% as the existing team could focus on complex technical escalations and customer success initiatives. Average response time dropped from 4 hours to 30 seconds for automated queries. User satisfaction reached 94% on AI-generated responses, measured through post-interaction surveys integrated directly into the chatbot widget.' },
    ],
  },
  {
    slug: 'analytics-dashboard-react-firebase',
    title: 'Building a Real-Time Analytics Dashboard with React and Firebase',
    excerpt: 'How Rogue Code built a real-time business analytics dashboard using React 19, Firebase Firestore, and Recharts — processing 50,000+ daily events with sub-second query times and interactive data visualization.',
    date: '2026-06-01',
    readTime: '7 min read',
    project: 'Analytics Dashboard',
    category: 'Web Development',
    tags: ['React', 'Firebase', 'TypeScript', 'Recharts', 'Tailwind CSS'],
    accent: '#E85D3A',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85',
    result: 'Real-time data processing for 50,000+ events daily',
    url: 'https://github.com/jeremygideonbareh/analytics-dashboard',
    content: [
      { type: 'heading', text: 'Why a logistics company needed a real-time analytics dashboard' },
      { type: 'paragraph', text: 'A logistics company with 200+ delivery vehicles across 6 distribution hubs needed a real-time dashboard to monitor delivery times, fuel costs, driver performance, and customer satisfaction scores. Their existing solution relied on batch-processed reports with 15-minute data latency — dispatchers couldn\'t see delayed deliveries until after customers had already complained. During peak holiday periods, the system couldn\'t handle the load of 50,000+ daily events, causing dashboard crashes and data gaps. They needed a React-based analytics platform with Firebase Firestore for real-time sync that could scale to millions of events per month.' },
      { type: 'heading', text: 'How Rogue Code built the dashboard with React 19 and Firebase' },
      { type: 'paragraph', text: 'Rogue Code built the analytics dashboard using React 19 with TypeScript for type-safe component development. Firebase Firestore provides real-time data synchronization — when a delivery is completed or a fuel purchase is logged, the dashboard updates instantly across all connected devices. Recharts powers interactive charts including line graphs for delivery time trends, bar charts for driver performance comparisons, and pie charts for cost breakdown analysis. Firebase Cloud Functions handle data aggregation, generating hourly summaries and daily reports without client-side processing overhead.' },
      { type: 'heading', text: 'Analytics dashboard features for real-time logistics monitoring' },
      { type: 'list', items: ['Firebase Firestore real-time sync with sub-second latency — dashboard updates instantly when new data arrives', 'Recharts interactive line, bar, and pie charts with drill-down for per-driver and per-hub analysis', 'Vehicle tracking map with live GPS coordinates from 200+ delivery vehicles displayed on an interactive map layer', 'Custom date range filters with instant re-render — compare any two time periods side by side', 'Automated PDF report generation for daily operations summaries, weekly performance reviews, and monthly board reporting', 'Mobile-responsive design for field managers — full dashboard functionality on smartphones and tablets'] },
      { type: 'heading', text: '50,000+ events processed daily — sub-second query times' },
      { type: 'paragraph', text: 'The dashboard processes 50,000+ daily events with sub-second Firebase query times, eliminating the 15-minute latency of the previous system. Delivery time tracking now happens in real-time — dispatchers see delays as they happen and can proactively reroute vehicles. Fuel cost monitoring identified 12% in monthly savings by highlighting underperforming routes and vehicles with above-average consumption. The driver performance dashboard improved on-time delivery rate from 82% to 94% within three months, as drivers could see their performance metrics updated in real-time.' },
    ],
  },
  {
    slug: 'ai-invoice-processing',
    title: 'Automating Invoice Processing with AI Document Extraction',
    excerpt: 'How Rogue Code built an AI-powered invoice processing system using OpenAI GPT-4 Vision and LangChain — extracting data from 1,000+ invoices per week with 97% accuracy and reducing manual data entry by 85%.',
    date: '2026-06-15',
    readTime: '9 min read',
    project: 'AI Invoice Processor',
    category: 'AI & Automation',
    tags: ['Python', 'OpenAI', 'LangChain', 'PostgreSQL', 'Docker'],
    accent: '#FF6B4A',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=85',
    result: '85% faster invoice processing with 97% accuracy',
    url: 'https://github.com/jeremygideonbareh/ai-invoice-processor',
    content: [
      { type: 'heading', text: 'Why an accounting firm needed AI-powered invoice processing' },
      { type: 'paragraph', text: 'A mid-sized accounting firm processing 1,000+ invoices per week across 50+ clients relied entirely on manual data entry — a 40-hour-per-week task that was expensive, error-prone, and a bottleneck for month-end closing. Different vendors used wildly different invoice formats: some sent PDFs with embedded tables, others emailed JPG scans, and a few used structured EDI formats. Traditional OCR tools failed on multi-format documents, achieving only 70-75% accuracy on complex layouts with line items, tax calculations, and discount rows. The firm needed a LangChain-based AI system with GPT-4 Vision for intelligent document extraction that could handle any invoice format.' },
      { type: 'heading', text: 'How Rogue Code built the invoice processor with GPT-4 Vision and LangChain' },
      { type: 'paragraph', text: 'Rogue Code built the invoice processing system using OpenAI GPT-4 Vision for multi-format document parsing — the model reads invoices in PDF, JPG, PNG, and TIFF formats, extracting fields including vendor name, invoice number, date, line items, unit prices, quantities, tax amounts, and total due. LangChain orchestrates the end-to-end pipeline: document ingestion, GPT-4 Vision extraction, field-level validation against expected ranges, confidence scoring, and PostgreSQL storage. Each extracted invoice receives a confidence score — invoices scoring 97% or higher are auto-approved, while lower-scoring items are queued for human review through a dedicated dashboard.' },
      { type: 'heading', text: 'AI invoice processing features for 85% faster data entry' },
      { type: 'list', items: ['GPT-4 Vision multi-format document parsing — handles PDF, JPG, PNG, and TIFF with complex table layouts and varied tax structures', 'LangChain orchestration with extraction, validation, and storage pipeline — end-to-end automation from document upload to database write', 'Custom confidence scoring — 97%+ auto-approved for fully automated processing, lower scores routed to human review queue', 'PostgreSQL storage with full audit trail — every extraction, approval, and correction logged with timestamps and user IDs', 'Batch processing via Docker containers — 500 invoices processed in 5 minutes with parallel worker scaling', 'Dashboard for human review queue with side-by-side original document and extracted data comparison, one-click corrections, and processing analytics'] },
      { type: 'heading', text: '85% faster processing — 97% accuracy on 1,000+ weekly invoices' },
      { type: 'paragraph', text: 'The AI invoice processing system reduced manual data entry time from 40 hours to 6 hours per week — an 85% reduction in labour costs. Field extraction accuracy reached 97%, outperforming the 92-95% accuracy of manual entry (which was itself affected by fatigue, transcription errors, and inconsistent handwriting interpretation). Batch processing via Docker handles 500 invoices in 5 minutes, enabling same-day processing for all 50+ clients. The accounting firm estimated $60,000 in annual operational savings, and month-end closing — previously a 5-day bottleneck — now completes in under 24 hours.' },
    ],
  },
]

export function BlogList({ onViewPost, onBack }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-medium mb-8 transition-opacity hover:opacity-70" style={{ color: '#FF6B4A' }}>
          <ArrowLeft className="size-3.5" /> Back to home
        </button>
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: '#F2F2F2' }}>Case Studies</h1>
        <p className="text-sm mb-10" style={{ color: '#8A8A8A' }}>Deep dives into the projects we have shipped.</p>

        <div className="space-y-6">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => onViewPost(post.slug)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onViewPost(post.slug)
                }
              }}
              role="button"
              tabIndex={0}
              className="group rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              style={{ borderColor: 'rgba(255,255,255,0.06)', background: '#1A1817' }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-72 h-48 md:h-auto shrink-0 overflow-hidden">
                  <img src={post.image} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex-1 p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{ backgroundColor: `${post.accent}22`, color: post.accent }}>{post.category}</span>
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: '#6A6A6A' }}>
                      <Calendar className="size-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]" style={{ color: '#6A6A6A' }}>
                      <Clock className="size-3" /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-2 leading-snug group-hover:opacity-80 transition-opacity" style={{ color: '#F2F2F2' }}>{post.title}</h2>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: '#8A8A8A' }}>{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#6A6A6A' }}>{t}</span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: post.accent }}>
                    Read more <ArrowUpRight className="size-3" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BlogPage({ slug, onBack }) {
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return <BlogList onViewPost={(s) => window.location.href = `/?page=blog&slug=${s}`} onBack={onBack} />
  }

  return (
    <article className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/30 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-20 relative z-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-medium mb-6 transition-opacity hover:opacity-70" style={{ color: '#FF6B4A' }}>
            <ArrowLeft className="size-3.5" /> Back to blog
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${post.accent}22`, color: post.accent }}>{post.category}</span>
            <span className="flex items-center gap-1 text-xs" style={{ color: '#6A6A6A' }}>
              <Calendar className="size-3.5" /> {post.date}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: '#6A6A6A' }}>
              <Clock className="size-3.5" /> {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-4" style={{ color: '#F2F2F2' }}>{post.title}</h1>
          <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: '#8A8A8A' }}>{post.excerpt}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(t => (
              <span key={t} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#8A8A8A' }}>
                <Tag className="size-3" /> {t}
              </span>
            ))}
          </div>

          <div className="rounded-xl border p-5 mb-10" style={{ borderColor: `${post.accent}22`, background: `${post.accent}08` }}>
            <p className="text-xs font-medium mb-1" style={{ color: post.accent }}>Key Result</p>
            <p className="text-base font-bold" style={{ color: '#F2F2F2' }}>{post.result}</p>
          </div>

          {post.videoUrl && (
            <div className="rounded-xl border mb-10 overflow-hidden" style={{ borderColor: `${post.accent}22` }}>
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: `${post.accent}15`, color: post.accent }}>
                Walkthrough
              </div>
              <VideoEmbed url={post.videoUrl} title={`${post.title} walkthrough`} />
            </div>
          )}

          <div className="space-y-6">
            {post.content.map((block, i) => {
              if (block.type === 'heading') {
                return <h2 key={i} className="text-xl font-bold pt-2" style={{ color: '#F2F2F2' }}>{block.text}</h2>
              }
              if (block.type === 'paragraph') {
                return <p key={i} className="text-sm leading-relaxed" style={{ color: '#B0B0B0' }}>{block.text}</p>
              }
              if (block.type === 'list') {
                return (
                  <ul key={i} className="space-y-2">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: '#B0B0B0' }}>
                        <span className="mt-1.5 size-1.5 rounded-full shrink-0" style={{ backgroundColor: post.accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )
              }
              return null
            })}
          </div>

          <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
              style={{ backgroundColor: post.accent, color: '#FFFFFF' }}
            >
              <ExternalLink className="size-4" />
              View on GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </article>
  )
}
