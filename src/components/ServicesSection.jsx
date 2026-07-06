import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Code, Cpu, Palette, ArrowUpRight, X, ExternalLink } from 'lucide-react'
import BrowserFrame from './BrowserFrame'

function getDomain(url) {
  return url.replace(/https?:\/\//, '').replace(/\/.*/, '')
}

function getFaviconUrl(url) {
  const domain = getDomain(url)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

function getScreenshotUrl(url) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=800`
}

function PreviewModal({ example, isDay, onClose }) {
  const [screenshotError, setScreenshotError] = useState(false)

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const domain = getDomain(example.url)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-8"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: isDay ? '#fff' : '#1A1817',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Browser chrome */}
        <div
          className="flex items-center justify-between px-4 py-3 border-b"
          style={{
            borderColor: isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
            background: isDay ? '#F5F0EB' : '#222020',
          }}
        >
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="size-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all" />
            <span className="size-3 rounded-full bg-[#FFBD2E]" />
            <span className="size-3 rounded-full bg-[#28C840]" />
          </div>
          <div
            className="flex-1 mx-4 px-3 py-1.5 rounded-lg text-xs truncate text-center"
            style={{
              background: isDay ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
              color: isDay ? '#5A4A3A' : '#8A8A8A',
            }}
          >
            <span className="opacity-60">https://</span>
            {domain}
          </div>
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors hover:bg-black/10"
            style={{ color: isDay ? '#1A1A1A' : '#F2F2F2', touchAction: 'manipulation' }}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content — screenshot, falls back to favicon + open in new tab */}
        <div className="relative overflow-hidden" style={{ height: '80dvh', maxHeight: 800 }}>
          {screenshotError ? (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-4"
              style={{ background: isDay ? '#F9F6F2' : '#1A1817' }}
            >
              <img
                src={getFaviconUrl(example.url)}
                alt=""
                className="size-16 rounded-xl"
                style={{ background: isDay ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)' }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <p className="text-lg font-semibold" style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}>
                {domain}
              </p>
              <p className="text-sm opacity-60" style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}>
                Preview unavailable — open in new tab
              </p>
              <div className="flex items-center gap-3 mt-2">
                <motion.a
                  href={example.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white"
                  style={{ background: isDay ? '#E85D3A' : '#FF6B4A' }}
                  whileHover={{ scale: 1.05 }}
                >
                  <ExternalLink className="size-4" />
                  Open in new tab
                </motion.a>
                <span className="text-xs font-medium" style={{ color: isDay ? '#E85D3A' : '#FF6B4A' }}>
                  {example.award}
                </span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <img
                src={getScreenshotUrl(example.url)}
                alt={`Preview of ${example.name}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
                onError={() => setScreenshotError(true)}
                style={{ background: isDay ? '#f0eeeb' : '#222020' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                style={{
                  background: isDay
                    ? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.9))'
                    : 'linear-gradient(to bottom, transparent, rgba(26,24,23,0.9))',
                }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const services = [
  {
    title: 'Web Development',
    subtitle: 'React, Next.js, Three.js',
    desc: 'Custom-built frontends with pixel-perfect design, smooth animations, and sub-second load times. No page builders, no templates — just crafted code.',
    icon: Code,
    decor: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80',
    examples: [
      { name: 'Indaba Coffee', url: 'https://www.indabacoffee.com/', award: 'Simple Coffee Shop', img: 'https://picsum.photos/seed/indaba-coffee/320/200' },
      { name: 'TOAD Bakery', url: 'https://www.toadbakery.com/', award: 'Simple Product Site', img: 'https://picsum.photos/seed/toad-bakery/320/200' },
      { name: 'John Kail', url: 'https://www.johnkail.com/', award: 'Personal Portfolio', img: 'https://picsum.photos/seed/john-kail/320/200' },
    ],
    projects: [
      { name: "God's Creatures Pet Groomers", url: 'https://github.com/jeremygideonbareh/Gods-creatures-pet-groomers' },
      { name: "Kiki's Portfolio", url: 'https://github.com/jeremygideonbareh/kiki-s-portfolio-website' },
      { name: 'Gym Website', url: 'https://github.com/jeremygideonbareh/gym_website' },
    ],
  },
  {
    title: 'AI Integration',
    subtitle: 'LLMs, Agents, Pipelines',
    desc: 'We embed AI into your product — chatbots, automated workflows, content generation, and intelligent search — using the latest models and MCP tooling.',
    icon: Cpu,
    decor: 'https://images.unsplash.com/photo-1518173946687-a36f968f7e1e?w=1600&q=80',
    examples: [
      { name: 'We Are Impossible', url: 'https://www.weareimpossible.com', award: 'Awwwards Featured', img: 'https://picsum.photos/seed/we-are-impossible/320/200' },
      { name: 'Acova AI', url: 'https://acova.ai', award: 'Awwwards Featured', img: 'https://picsum.photos/seed/acova/320/200' },
      { name: 'Armory AI', url: 'https://www.armory.in', award: 'Awwwards Featured', img: 'https://picsum.photos/seed/armory/320/200' },
    ],
    projects: [
      { name: 'Trading Bot', url: 'https://github.com/jeremygideonbareh/trading-bot-' },
      { name: 'Support Ticket Agent', url: 'https://github.com/jeremygideonbareh/support-ticket-agent' },
    ],
  },
  {
    title: 'Design & Brand',
    subtitle: 'UI/UX, Identity, Motion',
    desc: 'From brand systems to micro-interactions, we create cohesive visual identities that communicate your story and delight your users at every touchpoint.',
    icon: Palette,
    decor: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
    examples: [
      { name: 'Studio Simms', url: 'https://studio-simms.com', award: 'Awwwards Nominee', img: 'https://picsum.photos/seed/studio-simms/320/200' },
      { name: 'Playfight', url: 'https://www.letsplayfight.com', award: 'Awwwards Featured', img: 'https://picsum.photos/seed/playfight/320/200' },
      { name: 'Noomo Agency', url: 'https://noomoagency.com', award: 'SOTY 2023', img: 'https://picsum.photos/seed/noomo/320/200' },
    ],
    projects: [
      { name: 'Be Kind Bakery', url: 'https://github.com/jeremygideonbareh/be-kind-bakery' },
      { name: 'Crumbs Bakery', url: 'https://github.com/jeremygideonbareh/crumbs-bakery-' },
      { name: 'Apple Clone', url: 'https://github.com/jeremygideonbareh/apple-clone-' },
    ],
  },
]

const fromRight = {
  hidden: { x: 300, opacity: 0, scale: 0.97 },
  visible: {
    x: 0, opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 22 },
  },
}

function TiltCard({ children }) {
  const ref = useRef(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotate({ x: -y * 6, y: x * 6 })
  }

  const resetTilt = () => setRotate({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  )
}



export default function ServicesSection({ isDay = true, onShowExamples }) {
  const sectionRef = useRef(null)
  const [hoveredService, setHoveredService] = useState(null)
  const [selectedExample, setSelectedExample] = useState(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section ref={sectionRef} className="relative z-10 overflow-hidden" style={{ backgroundColor: isDay ? '#F5F0EB' : '#1A1817' }}>
      <motion.div
        className="fixed top-0 left-0 h-0.5 z-[60]"
        style={{
          width: progressWidth,
          background: isDay
            ? 'linear-gradient(to right, #E85D3A, #2B7A78)'
            : 'linear-gradient(to right, #FF6B4A, #3B8A88)',
        }}
      />

      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
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

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-1.5 rounded-full"
            style={{
              background: isDay ? '#E85D3A' : '#FF6B4A',
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative px-6 md:px-12 py-28 md:py-36">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center mb-24"
          >
            <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: isDay ? '#E85D3A' : '#FF6B4A' }}>
              What we do
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight" style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}>
              Services
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

          <div className="grid gap-16">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={s.title}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <TiltCard>
                    <motion.div
                      variants={fromRight}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ delay: i * 0.12 }}
                      whileHover={{ y: -6, transition: { duration: 0.3 } }}
                      className="group rounded-2xl border overflow-hidden transition-shadow duration-500 relative"
                      style={{
                        borderColor: isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
                        background: isDay ? '#F5F0EB' : '#2A2827',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        boxShadow: isDay ? '0 4px 24px rgba(0,0,0,0.04)' : '0 4px 24px rgba(0,0,0,0.2)',
                      }}
                    >
                      {/* Cinematic decor image */}
                      <div className="absolute inset-0 pointer-events-none opacity-[0.015] overflow-hidden">
                        <img src={s.decor} alt="" className="w-full h-full object-cover" style={{ filter: 'blur(8px)' }} />
                      </div>

                      <div className="relative p-8 md:p-10">
                        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
                          <motion.div
                            className="flex-shrink-0 size-14 md:size-16 rounded-xl flex items-center justify-center"
                            style={{
                              background: isDay
                                ? 'linear-gradient(135deg, #E85D3A, #D04A2A)'
                                : 'linear-gradient(135deg, #FF6B4A, #E05030)',
                            }}
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                          >
                            <Icon className="size-6 md:size-7 text-white" />
                          </motion.div>

                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium tracking-widest uppercase mb-1" style={{ color: isDay ? '#E85D3A' : '#FF6B4A' }}>
                              {s.subtitle}
                            </p>
                            <div className="flex items-center gap-3 mb-4">
                              <h3 className="text-2xl md:text-3xl font-bold" style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}>
                                {s.title}
                              </h3>
                              {onShowExamples && (
                                <motion.button
                                  onClick={(e) => { e.stopPropagation(); onShowExamples() }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border transition-all"
                                  style={{
                                    borderColor: isDay ? '#E85D3A' : '#FF6B4A',
                                    color: isDay ? '#E85D3A' : '#FF6B4A',
                                    background: isDay ? 'rgba(232,93,58,0.08)' : 'rgba(255,107,74,0.1)',
                                  }}
                                >
                                  <ExternalLink className="size-3" />
                                  Browse Examples
                                </motion.button>
                              )}
                            </div>
                            <p className="text-sm leading-relaxed max-w-2xl mb-6" style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}>
                              {s.desc}
                            </p>

                            {/* Awwwards previews */}
                            <div className="mb-6">
                              <p className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: isDay ? '#8A7A6A' : '#6A6A6A' }}>
                                Awwwards Inspirations
                              </p>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {s.examples.map((ex) => (
                                  <BrowserFrame key={ex.name} ex={ex} isDay={isDay} onSelect={(ex) => setSelectedExample(ex)} />
                                ))}
                              </div>
                            </div>

                            {/* Past projects */}
                            <div>
                              <p className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: isDay ? '#8A7A6A' : '#6A6A6A' }}>
                                Related Projects
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {s.projects.map((proj) => (
                                  <motion.a
                                    key={proj.name}
                                    href={proj.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-all"
                                    style={{
                                      borderColor: isDay ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
                                      background: isDay ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)',
                                      color: isDay ? '#5A4A3A' : '#8A8A8A',
                                    }}
                                    whileHover={{ y: -2, borderColor: isDay ? '#2B7A78' : '#3B8A88' }}
                                  >
                                    <ArrowUpRight className="size-3" />
                                    {proj.name}
                                  </motion.a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        className="h-0.5"
                        style={{
                          background: `linear-gradient(to right, ${isDay ? '#E85D3A' : '#FF6B4A'}, ${isDay ? '#2B7A78' : '#3B8A88'})`,
                          scaleX: hoveredService === i ? 1 : 0,
                          transformOrigin: 'left',
                        }}
                        animate={{ scaleX: hoveredService === i ? 1 : 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.div>
                  </TiltCard>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedExample && (
          <PreviewModal example={selectedExample} isDay={isDay} onClose={() => setSelectedExample(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
