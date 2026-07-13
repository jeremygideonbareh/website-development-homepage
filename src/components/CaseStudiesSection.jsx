import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ExternalLink, ArrowUpRight, Code, Bot, Smartphone, Palette } from 'lucide-react'

const projects = [
  {
    name: 'Paws for Change India',
    category: 'Web Development',
    description: 'Animal rescue & adoption NGO website with donation integration, pet listing, and volunteer management system.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    url: 'https://github.com/jeremygideonbareh/paws-for-change-india',
    icon: Code,
    accent: '#E85D3A',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=85',
    result: '50+ pets adopted through the platform',
  },
  {
    name: 'Chelsea Man Spa',
    category: 'Mobile Apps',
    description: 'Mobile booking app for a Dubai Marina spa. Features Google Auth, Firestore real-time bookings, and dark gold theme.',
    tags: ['React Native', 'Firebase', 'Google Auth', 'Stripe'],
    url: 'https://github.com/jeremygideonbareh/chelsea-man-spa-mobile',
    icon: Smartphone,
    accent: '#2B7A78',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=85',
    result: '200+ bookings in first month',
  },
  {
    name: 'Support Ticket Agent',
    category: 'AI & Automation',
    description: 'AI agent built with LangChain & LangGraph that classifies support tickets and drafts contextual responses automatically.',
    tags: ['Python', 'LangChain', 'LangGraph', 'OpenAI'],
    url: 'https://github.com/jeremygideonbareh/support-ticket-agent',
    icon: Bot,
    accent: '#FF6B4A',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=85',
    result: '70% reduction in manual triage time',
  },
  {
    name: 'JMJ Events & Interiors',
    category: 'Web Development',
    description: 'Full-service events and interiors business website with portfolio gallery, service catalog, and inquiry form.',
    tags: ['React', 'TypeScript', 'Responsive', 'CMS'],
    url: 'https://github.com/jeremygideonbareh/JMJ-Events-Interiors-',
    icon: Code,
    accent: '#3B8A88',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85',
    result: '3x increase in client inquiries',
  },
  {
    name: 'Crumbs Bakery',
    category: 'Web Development',
    description: 'Artisan bakery website with online ordering, product catalog, location finder, and brand story showcase.',
    tags: ['React', 'JavaScript', 'PostgreSQL', 'Responsive'],
    url: 'https://github.com/jeremygideonbareh/crumbs-bakery-',
    icon: Code,
    accent: '#E85D3A',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=85',
    result: 'Online orders within 2 weeks of launch',
  },
  {
    name: 'Trading Bot',
    category: 'AI & Automation',
    description: 'Automated trading system with real-time market data processing, strategy execution, and portfolio management.',
    tags: ['Python', 'TypeScript', 'Docker', 'APIs'],
    url: 'https://github.com/jeremygideonbareh/trading-bot-',
    icon: Bot,
    accent: '#FF6B4A',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=85',
    result: 'Automated 24/7 trading pipeline',
  },
]

const categories = ['All', 'Web Development', 'AI & Automation', 'Mobile Apps']

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function CaseStudiesSection({ isDay = true, onViewProject }) {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('All')
  const accent = isDay ? '#E85D3A' : '#FF6B4A'
  const text = isDay ? '#1A1A1A' : '#F2F2F2'
  const muted = isDay ? '#5A4A3A' : '#8A8A8A'
  const bg = isDay ? '#F5F0EB' : '#1A1817'
  const border = isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'
  const cardBg = isDay ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)'

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section aria-label="Case studies" className="px-4 sm:px-6 py-28 md:px-12 relative z-10" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: accent }}>
            {t('caseStudies.eyebrow')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: text }}>
            {t('caseStudies.heading')}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 w-20 mx-auto mt-6 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </motion.div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all border"
              style={{
                borderColor: activeCategory === cat ? accent : border,
                backgroundColor: activeCategory === cat ? (isDay ? `${accent}15` : `${accent}20`) : 'transparent',
                color: activeCategory === cat ? accent : muted,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.name}
                variants={item}
                onClick={() => {
                  const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                  if (onViewProject) {
                    onViewProject(slug)
                  } else {
                    window.location.href = `/?page=case&slug=${slug}`
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    if (onViewProject) {
                      onViewProject(slug)
                    } else {
                      window.location.href = `/?page=case&slug=${slug}`
                    }
                  }
                }}
                role="button"
                tabIndex={0}
                className="group rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                style={{
                  borderColor: border,
                  background: cardBg,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div
                    className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
                    style={{
                      backgroundColor: `${project.accent}dd`,
                      color: '#FFFFFF',
                    }}
                  >
                    {project.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="size-4" style={{ color: project.accent }} />
                    <h3 className="text-lg font-bold" style={{ color: text }}>
                      {project.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: muted }}>
                    {project.description}
                  </p>
                  <p className="text-sm font-medium mb-3" style={{ color: project.accent }}>
                    {project.result}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-full border"
                        style={{
                          borderColor: border,
                          color: muted,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                    style={{ color: accent }}
                  >
                    <ExternalLink className="size-3" />
                    {t('caseStudies.viewOnGitHub')}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
