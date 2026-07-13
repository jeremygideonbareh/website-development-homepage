import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { CaseStudySeo } from './Seo'
import VideoEmbed from './VideoEmbed'

const projects = [
  { name: 'Paws for Change India', category: 'Web Development', description: 'Animal rescue NGO platform built with React 19, TypeScript, Tailwind CSS, and Firebase — featuring a searchable pet listing database, Stripe donation integration, volunteer management dashboard, and foster application workflow. Helped 50+ pets find forever homes across India.', tags: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'], url: 'https://github.com/jeremygideonbareh/paws-for-change-india', accent: '#E85D3A', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=85', result: '50+ pets adopted through the platform', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Chelsea Man Spa', category: 'Mobile Apps', description: 'Cross-platform React Native mobile booking app for a Dubai Marina men\'s grooming spa with Google One-Tap Authentication, Firestore real-time slot availability, Stripe Connect payments, and Firebase Cloud Messaging push notifications. Dark gold theme with premium marble UI.', tags: ['React Native', 'Firebase', 'Google Auth', 'Stripe'], url: 'https://github.com/jeremygideonbareh/chelsea-man-spa-mobile', accent: '#2B7A78', image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=85', result: '200+ bookings in first month', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Support Ticket Agent', category: 'AI & Automation', description: 'LangChain and LangGraph AI agent processing 500+ daily support tickets — multi-label classification across 12 categories with GPT-4, context-aware draft response generation from knowledge base, Slack webhook escalation, and LangSmith feedback loop for continuous improvement.', tags: ['Python', 'LangChain', 'LangGraph', 'OpenAI'], url: 'https://github.com/jeremygideonbareh/support-ticket-agent', accent: '#FF6B4A', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=85', result: '70% reduction in manual triage time', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'JMJ Events & Interiors', category: 'Web Development', description: 'React 19 and TypeScript portfolio website for luxury event design company — masonry gallery with category filtering by wedding, corporate, and interior categories, Decap CMS-driven content management, multi-field inquiry form with budget range slider, and lazy-loaded WebP images.', tags: ['React', 'TypeScript', 'Responsive', 'CMS'], url: 'https://github.com/jeremygideonbareh/JMJ-Events-Interiors-', accent: '#3B8A88', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85', result: '3x increase in client inquiries', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Crumbs Bakery', category: 'Web Development', description: 'React 19 artisan bakery website with PostgreSQL order management — daily menu with time-based special rotation, dietary filters for gluten-free, vegan, nut-free, and dairy-free items, Stripe payment checkout, and admin dashboard with live order feed and sales analytics.', tags: ['React', 'JavaScript', 'PostgreSQL', 'Responsive'], url: 'https://github.com/jeremygideonbareh/crumbs-bakery-', accent: '#E85D3A', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=85', result: 'Online orders within 2 weeks of launch', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'Trading Bot', category: 'AI & Automation', description: 'Python-based automated trading engine with modular Docker-container strategy architecture — WebSocket feeds from Binance, Coinbase Pro, and Interactive Brokers with automatic failover, 5-year backtesting engine with slippage modeling, Redis real-time market data distribution, and React TypeScript dashboard with 500ms refresh.', tags: ['Python', 'TypeScript', 'Docker', 'APIs'], url: 'https://github.com/jeremygideonbareh/trading-bot-', accent: '#FF6B4A', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=85', result: 'Automated 24/7 trading pipeline', videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  { name: 'E-commerce Store (Next.js + Stripe)', category: 'Web Development', description: 'Next.js 15 e-commerce platform with Stripe Connect multi-currency payments (INR, AED, USD), real-time PostgreSQL inventory management across 3 warehouses, custom checkout flow with saved payment methods, Cloudflare Workers CDN global deployment with sub-second response, and admin dashboard with sales analytics and order management.', tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'], url: 'https://github.com/jeremygideonbareh/ecommerce-nextjs-store', accent: '#E85D3A', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=85', result: '40% increase in conversion rate' },
  { name: 'AI Chatbot (LangChain + GPT-4)', category: 'AI & Automation', description: 'LangChain RAG chatbot with Pinecone vector database embeddings from 500+ support articles, OpenAI GPT-4 contextual response generation with source citations, semantic search for nuanced queries about API integration billing and feature configuration, Slack webhook integration for human handoff, and Docker auto-scaling deployment.', tags: ['Python', 'LangChain', 'OpenAI', 'PostgreSQL', 'Docker'], url: 'https://github.com/jeremygideonbareh/ai-chatbot-langchain', accent: '#FF6B4A', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=85', result: '65% of support queries resolved without human intervention' },
  { name: 'Analytics Dashboard (React + Firebase)', category: 'Web Development', description: 'React 19 real-time analytics dashboard with Firebase Firestore sub-second data sync for 50,000+ daily logistics events, Recharts interactive charts (line, bar, pie), live GPS vehicle tracking for 200+ delivery vehicles, custom date range filters with instant re-render, automated PDF reporting, and mobile-responsive field manager interface.', tags: ['React', 'Firebase', 'TypeScript', 'Recharts', 'Tailwind CSS'], url: 'https://github.com/jeremygideonbareh/analytics-dashboard', accent: '#E85D3A', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=85', result: 'Real-time data processing for 50,000+ events daily' },
  { name: 'AI Invoice Processor', category: 'AI & Automation', description: 'OpenAI GPT-4 Vision multi-format document parsing (PDF, JPG, PNG, TIFF) with LangChain orchestration pipeline for field extraction, validation, and PostgreSQL storage. Custom confidence scoring with 97%+ auto-approval threshold, batch processing via Docker containers processing 500 invoices in 5 minutes, and human review dashboard with full audit trail and one-click corrections.', tags: ['Python', 'OpenAI', 'LangChain', 'PostgreSQL', 'Docker'], url: 'https://github.com/jeremygideonbareh/ai-invoice-processor', accent: '#FF6B4A', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=85', result: '85% faster invoice processing with 97% accuracy' },
]

export default function CaseStudyPage({ slug, onBack }) {
  const { t } = useTranslation()
  const project = projects.find(
    (p) => p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  )

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="text-center">
          <p className="text-lg font-bold mb-2" style={{ color: '#F2F2F2' }}>Project not found</p>
          <button onClick={onBack} className="text-sm underline" style={{ color: '#FF6B4A' }}>{t('caseStudies.back')}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <CaseStudySeo project={project} />
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={project.image} alt={project.name} loading="eager" decoding="async" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-medium mb-8 transition-opacity hover:opacity-70" style={{ color: '#FF6B4A' }}>
            <ArrowLeft className="size-3.5" /> {t('caseStudies.back')}
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${project.accent}dd`, color: '#FFFFFF' }}>
              {project.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ color: '#F2F2F2' }}>{project.name}</h1>
          <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-6" style={{ color: '#8A8A8A' }}>{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#8A8A8A' }}>{tag}</span>
            ))}
          </div>

          {project.videoUrl && (
            <div className="rounded-xl border mb-8 overflow-hidden" style={{ borderColor: `${project.accent}22` }}>
              <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: `${project.accent}15`, color: project.accent }}>
                Walkthrough
              </div>
              <VideoEmbed url={project.videoUrl} title={`${project.name} walkthrough`} />
            </div>
          )}

          <div className="rounded-xl border p-6 mb-8" style={{ borderColor: `${project.accent}22`, background: `${project.accent}08` }}>
            <p className="text-sm font-medium mb-1" style={{ color: project.accent }}>{t('caseStudies.keyResult')}</p>
            <p className="text-lg font-bold" style={{ color: '#F2F2F2' }}>{project.result}</p>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: project.accent, color: '#FFFFFF' }}
          >
            <ExternalLink className="size-4" />
            {t('caseStudies.viewOnGitHub')}
          </a>
        </motion.div>
      </div>
    </div>
  )
}
