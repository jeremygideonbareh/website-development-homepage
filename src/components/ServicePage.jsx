import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, ExternalLink } from 'lucide-react'
import { ServiceSeo } from './Seo'

const services = {
  'web-development': {
    name: 'Web Development',
    tagline: 'Custom React websites and web applications engineered for speed, scale, and conversion.',
    hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85',
    description: 'Rogue Code builds custom websites using React 19, Next.js 15, TypeScript, and Tailwind CSS. No WordPress themes, no Squarespace templates, no page builders — just production-grade code deployed to Cloudflare Workers with automated CI/CD via GitHub. Every project targets 95+ Lighthouse scores, sub-2-second load times, and conversion-optimized user flows.',
    technologies: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Framer Motion', 'Three.js', 'Cloudflare Workers'],
    features: [
      'Custom UI/UX design in Figma with 2 revision rounds',
      'Mobile-first responsive design for all screen sizes',
      'JSON-LD SEO entity graph for Google rich results',
      'Cloudflare Workers deployment with CDN caching',
      'Plausible analytics integration for privacy-first tracking',
      'Full source code ownership — zero platform lock-in',
    ],
    deliverables: [
      'Figma design system with component library',
      'React 19 frontend with TypeScript',
      'Node.js API backend (if needed)',
      'Cloudflare Workers deployment',
      'SSL certificate and custom domain setup',
      'Post-launch 30-day support period',
    ],
    caseStudies: ['paws-for-change-india', 'jmj-events-interiors', 'crumbs-bakery'],
    accent: '#FF6B4A',
    cta: 'Book a Web Development Call',
  },
  'ai-automation': {
    name: 'AI & Automation',
    tagline: 'Intelligent AI agents, automated workflows, chatbots, and custom ML pipelines that deliver measurable ROI.',
    hero: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85',
    description: 'Rogue Code builds AI agents and automated workflows using LangChain, LangGraph, OpenAI GPT-4, Anthropic Claude, and custom Python ML pipelines. From support ticket agents that cut triage time by 70% to custom chatbots trained on your business data — AI that actually delivers measurable cost savings and efficiency gains.',
    technologies: ['LangChain', 'LangGraph', 'OpenAI GPT-4', 'Anthropic Claude', 'Python', 'Docker', 'Redis', 'PostgreSQL'],
    features: [
      'Multi-label classification with GPT-4 (12 categories, 4 urgency levels)',
      'Context-aware draft response generation from your knowledge base',
      'Slack, email, and webhook integration for real-time alerts',
      'Human-in-the-loop feedback system with LangSmith tracing',
      'Custom ML models for domain-specific predictions',
      'Automated escalation routing for critical issues',
    ],
    deliverables: [
      'AI agent architecture document',
      'Deployed agent with API endpoints',
      'Slack/email integration setup',
      'Dashboard for monitoring and feedback',
      'Training documentation for your team',
      '30-day performance optimization period',
    ],
    caseStudies: ['support-ticket-agent', 'trading-bot'],
    accent: '#7C5CFC',
    cta: 'Book an AI Automation Call',
  },
  'mobile-apps': {
    name: 'Mobile App Development',
    tagline: 'Cross-platform React Native applications with native performance, real-time sync, and premium UX.',
    hero: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=85',
    description: 'Rogue Code ships cross-platform mobile applications using React Native and Firebase that perform natively on both iOS and Android from a single TypeScript codebase. Features include Google One-Tap Authentication, Firestore real-time syncing, Stripe Connect payments, and Firebase Cloud Messaging push notifications. From spa booking apps to full-featured product platforms.',
    technologies: ['React Native', 'TypeScript', 'Firebase Firestore', 'Google Auth', 'Stripe Connect', 'Firebase Cloud Messaging', 'Expo'],
    features: [
      'Single codebase for iOS and Android with React Native',
      'Google One-Tap Authentication for frictionless sign-in',
      'Firestore real-time data sync across all devices',
      'Stripe Connect payments with deposit and package options',
      'Firebase Cloud Messaging push notifications',
      'Cross-platform deployment to App Store and Google Play',
    ],
    deliverables: [
      'React Native app for iOS and Android',
      'Firebase Firestore database setup',
      'Stripe payment integration',
      'App Store and Google Play deployment',
      'Admin dashboard for content management',
      '30-day post-launch support',
    ],
    caseStudies: ['chelsea-man-spa'],
    accent: '#2B7A78',
    cta: 'Book a Mobile App Call',
  },
}

export default function ServicePage({ slug, onBack, onBook }) {
  const service = services[slug]

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="text-center">
          <p className="text-lg font-bold mb-2" style={{ color: '#F2F2F2' }}>Service not found</p>
          <button onClick={onBack} className="text-sm underline" style={{ color: '#FF6B4A' }}>Back to home</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <ServiceSeo service={service} slug={slug} />
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src={service.hero} alt={service.name} loading="eager" decoding="async" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-24 relative z-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-medium mb-8 transition-opacity hover:opacity-70" style={{ color: service.accent }}>
            <ArrowLeft className="size-3.5" /> Back to home
          </button>

          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${service.accent}dd`, color: '#FFFFFF' }}>
              {service.name}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ color: '#F2F2F2' }}>{service.name}</h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mb-8" style={{ color: '#B0B0B0' }}>{service.tagline}</p>

          <p className="text-base leading-relaxed max-w-3xl mb-12" style={{ color: '#8A8A8A' }}>{service.description}</p>

          {/* Technology Stack */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#F2F2F2' }}>Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full border" style={{ borderColor: `${service.accent}33`, color: service.accent, background: `${service.accent}08` }}>
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6" style={{ color: '#F2F2F2' }}>What's Included</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.features.map((f) => (
                <div key={f} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                  <Check className="size-4 mt-0.5 shrink-0" style={{ color: service.accent }} />
                  <span className="text-sm leading-relaxed" style={{ color: '#B0B0B0' }}>{f}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Deliverables */}
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-6" style={{ color: '#F2F2F2' }}>Deliverables</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.deliverables.map((d) => (
                <div key={d} className="flex items-start gap-3 rounded-xl border p-4" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                  <Check className="size-4 mt-0.5 shrink-0" style={{ color: service.accent }} />
                  <span className="text-sm leading-relaxed" style={{ color: '#B0B0B0' }}>{d}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <button
            onClick={onBook}
            className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold transition-all hover:opacity-90"
            style={{ backgroundColor: service.accent, color: '#FFFFFF' }}
          >
            {service.cta} <ArrowRight className="size-4" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}
