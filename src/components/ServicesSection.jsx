import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Code, Bot, Smartphone, Palette, ExternalLink } from 'lucide-react'

const services = [
  {
    title: 'Web Development',
    subtitle: 'React, Next.js, TypeScript',
    desc: 'Custom websites and web applications engineered for speed, scalability, and conversion. No page builders, no templates — just production-grade code with pixel-perfect design.',
    icon: Code,
    from: '$2,500',
    accent: '#E85D3A',
    decor: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80',
    projects: [
      'Paws for Change India',
      'JMJ Events & Interiors',
      'Crumbs Bakery',
      'Kiki\'s Portfolio',
    ],
  },
  {
    title: 'AI & Automation',
    subtitle: 'LangChain, LLMs, Agents',
    desc: 'Intelligent AI agents, automated workflows, chatbots, and custom ML pipelines. We make AI work for your business — not the other way around.',
    icon: Bot,
    from: '$5,000',
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
    subtitle: 'React Native, Firebase',
    desc: 'Cross-platform mobile applications with native performance. From booking systems to full-featured product apps — we ship on iOS and Android.',
    icon: Smartphone,
    from: '$8,000',
    accent: '#2B7A78',
    decor: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80',
    projects: [
      'Chelsea Man Spa',
      'Booking Platforms',
    ],
  },
  {
    title: 'UI/UX Design',
    subtitle: 'Interfaces, Prototypes, Systems',
    desc: 'Research-driven interface design that balances beauty with usability. Wireframes, high-fidelity mockups, interactive prototypes, and design systems.',
    icon: Palette,
    from: '$2,000',
    accent: '#3B8A88',
    decor: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&q=80',
    projects: [
      'Brand Identity Design',
      'Design Systems',
      'UX Audits',
    ],
  },
]

export default function ServicesSection({ isDay = true }) {
  const sectionRef = useRef(null)
  const [hoveredService, setHoveredService] = useState(null)

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

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="group rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 relative"
                  style={{
                    borderColor: isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
                    background: isDay ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-[0.015] overflow-hidden">
                    <img src={s.decor} alt="" className="w-full h-full object-cover" style={{ filter: 'blur(8px)' }} />
                  </div>

                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <motion.div
                        className="flex-shrink-0 size-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, ${s.accent}, ${s.accent}cc)`,
                        }}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon className="size-5 text-white" />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold" style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}>
                            {s.title}
                          </h3>
                          <span
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                            style={{
                              backgroundColor: `${s.accent}18`,
                              color: s.accent,
                            }}
                          >
                            from {s.from}
                          </span>
                        </div>
                        <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: s.accent }}>
                          {s.subtitle}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}>
                          {s.desc}
                        </p>

                        <div className="mt-4">
                          <p className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: isDay ? '#8A7A6A' : '#6A6A6A' }}>
                            Past Projects
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {s.projects.map((proj) => (
                              <span
                                key={proj}
                                className="text-[11px] px-2.5 py-1 rounded-full border"
                                style={{
                                  borderColor: isDay ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
                                  color: isDay ? '#5A4A3A' : '#8A8A8A',
                                }}
                              >
                                {proj}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    className="h-0.5"
                    style={{
                      background: `linear-gradient(to right, ${s.accent}, transparent)`,
                      scaleX: hoveredService === i ? 1 : 0,
                      transformOrigin: 'left',
                    }}
                    animate={{ scaleX: hoveredService === i ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
