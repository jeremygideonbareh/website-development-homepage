import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTiltEffect } from '../hooks/useTiltEffect'
import { Code, Bot, Smartphone, Palette, ExternalLink, Star, Globe, X } from 'lucide-react'

const serviceExamples = {
  'Web Development': [
    { name: 'Paws for Change India', url: 'https://pawsforchangeindia.org', rating: 5.0, type: 'Animal Welfare' },
    { name: "Kiki Garod's Portfolio", url: 'https://kikigarod.com', rating: 5.0, type: 'Filmmaker' },
    { name: 'Crumbs Bakery', url: 'https://crumbsbakery.in', rating: 5.0, type: 'Bakery' },
    { name: 'Chelsea Man Spa', url: 'https://chelseamanspa.com', rating: 5.0, type: 'Spa & Wellness' },
  ],
  'AI & Automation': [
    { name: 'Support Ticket Agent', url: 'https://roguecode.ai/support-agent', rating: 4.9 },
    { name: 'Custom Chatbot Platform', url: 'https://roguecode.ai/chatbots', rating: 4.8 },
    { name: 'Trading Bot System', url: 'https://roguecode.ai/trading', rating: 4.7 },
    { name: 'Data Pipeline Automation', url: 'https://roguecode.ai/pipelines', rating: 4.8 },
  ],
  'Mobile Apps': [
    { name: 'Chelsea Man Spa App', url: 'https://chelseamanspa.com/app', rating: 4.9 },
    { name: 'Booking Platform', url: 'https://roguecode.dev/booking', rating: 4.8 },
    { name: 'Fitness Tracker App', url: 'https://roguecode.dev/fitness', rating: 4.6 },
    { name: 'Delivery Tracker', url: 'https://roguecode.dev/delivery', rating: 4.7 },
  ],
  'UI/UX Design': [
    { name: 'Brand Identity Suite', url: 'https://roguecode.design/brand', rating: 4.9 },
    { name: 'Design System Library', url: 'https://roguecode.design/systems', rating: 4.8 },
    { name: 'UX Audit & Redesign', url: 'https://roguecode.design/audit', rating: 4.9 },
    { name: 'Mobile App Redesign', url: 'https://roguecode.design/mobile', rating: 4.7 },
  ],
}

function getDomain(url) {
  try { return new URL(url).hostname.replace('www.', '') } catch { return url }
}

function getFaviconUrl(url) {
  const domain = getDomain(url)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

const services = [
  {
    title: 'Web Development',
    slug: 'web-development',
    from: '₹9,000',
    subtitle: 'React, Next.js, TypeScript',
    desc: 'Rogue Code builds custom websites and web applications using React 19, Next.js, TypeScript, and Tailwind CSS. No WordPress themes, no page builders, no Squarespace templates — just production-grade code engineered for 95+ Lighthouse scores, sub-2-second load times, and conversion-optimized user flows.',
    icon: Code,
    accent: '#E85D3A',
    decor: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80',
    projects: [
      'Paws for Change India',
      'Kiki Garod\'s Portfolio',
      'Crumbs Bakery',
      'Support Ticket Agent',
    ],
  },
  {
    title: 'AI & Automation',
    slug: 'ai-automation',
    from: '₹30,000',
    subtitle: 'LangChain, LLMs, Agents',
    desc: 'Rogue Code builds intelligent AI agents and automated workflows using LangChain, LangGraph, OpenAI GPT-4, and custom Python ML pipelines. From support ticket automation that cuts triage time by 70% to custom chatbots trained on your business data — AI that actually delivers measurable ROI.',
    icon: Bot,
    accent: '#FF6B4A',
    decor: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80',
    projects: [
      'Support Ticket Agent',
      'Trading Bot',
      'Custom Chatbots',
    ],
  },
  {
    title: 'Mobile Apps',
    slug: 'mobile-apps',
    from: '₹30,000',
    subtitle: 'React Native, Firebase',
    desc: 'Rogue Code ships cross-platform mobile applications using React Native and Firebase that perform natively on both iOS and Android from a single codebase. From spa booking apps that processed 200+ bookings in month one to full-featured product platforms with real-time sync, Stripe payments, and push notifications.',
    icon: Smartphone,
    accent: '#2B7A78',
    decor: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80',
    projects: [
      'Chelsea Man Spa',
      'Booking Platforms',
    ],
  },
  {
    title: 'UI/UX Design',
    from: '₹9,000',
    subtitle: 'Interfaces, Prototypes, Systems',
    desc: 'Research-driven interface design that balances beauty with usability. Wireframes, high-fidelity mockups, interactive prototypes, and design systems.',
    icon: Palette,
    accent: '#3B8A88',
    decor: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80',
    projects: [
      'Brand Identity Design',
      'Design Systems',
      'UX Audits',
    ],
  },
]

function ExampleRow({ examples, isDay, onSelectSite }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: isDay ? '#8A7A6A' : 'rgba(255,255,255,0.35)' }}>
        Example Websites
      </p>
      <div className="grid grid-cols-2 gap-1.5">
        {examples.map((ex) => (
          <button
            key={ex.url}
            onClick={() => onSelectSite?.(ex)}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all hover:bg-black/5 group/link w-full text-left"
            style={{ background: isDay ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.03)' }}
          >
            <img
              src={getFaviconUrl(ex.url)}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-4 rounded shrink-0"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <span className="text-[11px] truncate flex-1" style={{ color: isDay ? '#5A4A3A' : 'rgba(255,255,255,0.5)' }}>
              {ex.name}
            </span>
            <span className="flex items-center gap-0.5 text-[10px] shrink-0" style={{ color: '#FFD700' }}>
              <Star className="size-2.5" /> {ex.rating}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function SitePreviewThumbnail({ url, name }) {
  const [error, setError] = useState(false)
  const domain = getDomain(url)

  if (error) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden flex flex-col items-center justify-center gap-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <Globe className="size-6" style={{ color: 'rgba(255,255,255,0.15)' }} />
        <span className="text-xs text-center px-3 leading-tight" style={{ color: 'rgba(255,255,255,0.25)' }}>{domain}</span>
      </div>
    )
  }

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl group/preview-img" style={{ background: '#fff' }}>
      <iframe
        src={url}
        title={name}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        onError={() => setError(true)}
      />
      <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover/preview-img:opacity-100" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.85) 100%)', pointerEvents: 'none' }} />
    </div>
  )
}

function SitePreviewModal({ site, onClose }) {
  const [iframeLoading, setIframeLoading] = useState(true)

  useEffect(() => {
    function onKeyDown(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 lg:p-8"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={e => e.stopPropagation()}
        className="w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxWidth: 'min(90vw, 1400px)', background: '#1A1817' }}
      >
        {/* Browser chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#222020' }}>
          <div className="flex items-center gap-2">
            <button onClick={onClose} aria-label="Close preview" className="min-w-[44px] min-h-[44px] flex items-center justify-center" style={{ touchAction: 'manipulation' }}>
              <span className="size-3 rounded-full bg-[#FF5F57]" />
            </button>
            <span className="size-3 rounded-full bg-[#FFBD2E]" />
            <span className="size-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 mx-4 px-3 py-1.5 rounded-lg text-xs truncate text-center" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A8A8A' }}>
            <span className="opacity-60">https://</span>
            {getDomain(site.url)}
          </div>
          <div className="flex items-center gap-2">
            <a href={site.url} target="_blank" rel="noopener noreferrer" aria-label="Open in new tab" className="size-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/10" style={{ color: '#F2F2F2' }}>
              <ExternalLink className="size-4" />
            </a>
            <button onClick={onClose} aria-label="Close preview" className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors hover:bg-white/10" style={{ color: '#F2F2F2', touchAction: 'manipulation' }}>
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden" style={{ height: '85dvh', maxHeight: '90vh' }}>
          {iframeLoading && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: '#fff' }}>
              <div className="flex flex-col items-center gap-3">
                <div className="size-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#E85D3A', borderTopColor: 'transparent' }} />
                <span className="text-xs text-zinc-500">Loading preview...</span>
              </div>
            </div>
          )}
          <iframe
            src={site.url}
            title={site.name}
            className="absolute inset-0 w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            style={{ background: '#fff' }}
            onLoad={() => setIframeLoading(false)}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

function ServiceCard({ service, index, isDay, hoveredService, setHoveredService, onShowExamples, hero = false, onSelectSite, onViewService }) {
  const { t } = useTranslation()
  const tiltRange = hero ? 2 : 4
  const stiffness = hero ? 150 : 250
  const damping = hero ? 30 : 25

  const {
    cardRef,
    isHovered,
    tiltStyle,
    spotlightBg,
    handleMouseMove,
    handleMouseEnter: tiltEnter,
    handleMouseLeave: tiltLeave,
  } = useTiltEffect({ tiltRange, stiffness, damping, spotlightColor: `${service.accent}18` })

  function handleMouseEnter() {
    tiltEnter()
    setHoveredService(index)
  }

  function handleMouseLeave() {
    tiltLeave()
    setHoveredService(null)
  }

  const Icon = service.icon
  const examples = serviceExamples[service.title]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative ${hero ? 'min-h-screen' : 'min-w-[80vw] md:min-w-0 flex-shrink-0 snap-center'}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="rounded-2xl border overflow-visible transition-all duration-500 relative"
        style={{
          ...tiltStyle,
          borderColor: isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
          background: isDay ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.015] overflow-hidden">
          <img src={service.decor} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" style={{ filter: 'blur(8px)' }} />
        </div>

        {/* Spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: spotlightBg,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        <div className="relative p-6 md:p-8" style={{ transformStyle: 'preserve-3d' }}>
          {hero ? (
            /* Hero layout: stacked - text above, wider previews below */
            <div className="space-y-8 md:space-y-10">
              {/* Top: Content */}
              <div className="space-y-5">
                <motion.div
                  className="size-14 md:size-16 rounded-xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${service.accent}, ${service.accent}cc)`,
                    transformStyle: 'preserve-3d',
                    transform: 'translateZ(40px)',
                  }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon className="size-6 md:size-7 text-white" />
                </motion.div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}>
                      {service.title}
                    </h3>
                    <span className="px-3 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: `${service.accent}18`, color: service.accent }}>
                      from {service.from}
                    </span>
                  </div>
                  <p className="text-sm md:text-base font-medium tracking-widest uppercase mt-2" style={{ color: service.accent }}>
                    {service.subtitle}
                  </p>
                </div>
                <p className="text-base md:text-lg leading-relaxed max-w-2xl break-words" style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}>
                  {service.desc}
                </p>
                <div>
                  <p className="text-sm font-semibold tracking-wider uppercase mb-3" style={{ color: isDay ? '#8A7A6A' : '#6A6A6A' }}>
                    Past Projects
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.projects.map((proj) => (
                      <span key={proj} className="text-xs px-3 py-1 rounded-full border" style={{ borderColor: isDay ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)', color: isDay ? '#5A4A3A' : '#8A8A8A' }}>
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
                {onShowExamples && (
                  <button onClick={onShowExamples} className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide transition-colors hover:opacity-70" style={{ color: service.accent }}>
                    {t('services.browseExamples')}
                  </button>
                )}
              </div>

              {/* Bottom: 2 wide previews */}
              <div>
                <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: isDay ? '#8A7A6A' : 'rgba(255,255,255,0.35)' }}>
                  Example Websites
                </p>
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {examples.slice(0, 2).map((ex) => (
                    <button key={ex.url} onClick={() => onSelectSite?.(ex)} className="group/preview block text-left w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                      <div className="relative rounded-xl overflow-hidden cursor-pointer" style={{ background: '#fff' }}>
                        <SitePreviewThumbnail url={ex.url} name={ex.name} />
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4" style={{ pointerEvents: 'none' }}>
                          <p className="text-sm md:text-base font-bold text-white truncate">{ex.name}</p>
                          <p className="text-[11px] md:text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{ex.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2 px-1">
                        <Star className="size-3.5" style={{ color: '#FFD700' }} />
                        <span className="text-xs" style={{ color: '#FFD700' }}>{ex.rating}</span>
                        <span className="text-[11px] ml-auto opacity-0 group-hover/preview:opacity-100 transition-opacity" style={{ color: service.accent }}>
                          Click to preview →
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Default layout: compact row */
            <div className="flex items-start gap-4 max-w-full">
              <motion.div
                className="flex-shrink-0 size-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${service.accent}, ${service.accent}cc)`,
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(30px)',
                }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon className="size-5 text-white" />
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-bold" style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}>
                    {service.title}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{ backgroundColor: `${service.accent}18`, color: service.accent }}>
                    from {service.from}
                  </span>
                </div>
                <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: service.accent }}>
                  {service.subtitle}
                </p>
                <p className="text-sm leading-relaxed break-words" style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}>
                  {service.desc}
                </p>

                <div className="mt-4">
                  <p className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: isDay ? '#8A7A6A' : '#6A6A6A' }}>
                    Past Projects
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.projects.map((proj) => (
                      <span key={proj} className="text-[11px] px-2.5 py-1 rounded-full border" style={{ borderColor: isDay ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)', color: isDay ? '#5A4A3A' : '#8A8A8A' }}>
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>

                {examples && service.title !== 'Web Development' && (
                  <div className="mt-4">
                    <ExampleRow examples={examples} isDay={isDay} onSelectSite={onSelectSite} />
                  </div>
                )}

                {service.title === 'Web Development' && onShowExamples && (
                  <button onClick={onShowExamples} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors hover:opacity-70" style={{ color: service.accent }}>
                    {t('services.browseExamples')}
                  </button>
                )}
                {service.slug && onViewService && (
                  <button onClick={() => onViewService(service.slug)} className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors hover:opacity-70" style={{ color: service.accent }}>
                    {t('services.learnMore', { name: service.title })}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        <motion.div
          className="h-0.5"
          style={{
            background: `linear-gradient(to right, ${service.accent}, transparent)`,
            scaleX: hoveredService === index ? 1 : 0,
            transformOrigin: 'left',
          }}
          animate={{ scaleX: hoveredService === index ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function ServicesSection({ isDay = true, onShowExamples, onViewService }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [hoveredService, setHoveredService] = useState(null)
  const [selectedSite, setSelectedSite] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section aria-label="Services" ref={sectionRef} className="relative z-10 overflow-x-hidden" style={{ backgroundColor: isDay ? '#F5F0EB' : '#1A1817' }}>
      <motion.div
        className="fixed top-0 left-0 h-0.5 z-[60]"
        style={{
          width: progressWidth,
          background: isDay
            ? 'linear-gradient(to right, #E85D3A, #2B7A78)'
            : 'linear-gradient(to right, #FF6B4A, #3B8A88)',
        }}
      />

      <motion.div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.04]"
          style={{ background: isDay ? '#E85D3A' : '#FF6B4A' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-[0.03]"
          style={{ background: isDay ? '#2B7A78' : '#3B8A88' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </motion.div>

      <div className="relative px-6 md:px-12 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ type: 'spring', stiffness: 100, damping: 22 }}
            className="text-center mb-24"
          >
            <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: isDay ? '#E85D3A' : '#FF6B4A' }}>
              {t('services.eyebrow')}
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight" style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}>
              {t('services.heading')}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-1 w-20 mx-auto mt-6 rounded-full"
              style={{ background: isDay ? '#E85D3A' : '#FF6B4A' }}
            />
          </motion.div>

          {/* Hero: Full-screen Web Development */}
          <ServiceCard
            service={services[0]}
            index={0}
            hero
            isDay={isDay}
            hoveredService={hoveredService}
            setHoveredService={setHoveredService}
            onShowExamples={onShowExamples}
            onSelectSite={setSelectedSite}
            onViewService={onViewService}
          />

          {/* Remaining services */}
          <div className="mt-12 md:mt-24">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 hide-scrollbar" style={{ touchAction: 'pan-x' }}>
                {services.slice(1).map((s, i) => (
                <ServiceCard
                  key={s.title}
                  service={s}
                  index={i + 1}
                  isDay={isDay}
                  hoveredService={hoveredService}
                  setHoveredService={setHoveredService}
                  onShowExamples={onShowExamples}
                  onSelectSite={setSelectedSite}
                  onViewService={onViewService}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedSite && <SitePreviewModal site={selectedSite} onClose={() => setSelectedSite(null)} />}
      </AnimatePresence>
    </section>
  )
}
