import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Code, Cpu, Palette, ArrowUpRight } from 'lucide-react'
import BrowserFrame from './BrowserFrame'

const services = [
  {
    title: 'Web Development',
    subtitle: 'React, Next.js, Three.js',
    desc: 'Custom-built frontends with pixel-perfect design, smooth animations, and sub-second load times. No page builders, no templates — just crafted code.',
    icon: Code,
    decor: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80',
    examples: [
      { name: 'Cuberto', url: 'https://cuberto.com', award: 'Awwwards Featured', img: 'https://picsum.photos/seed/cuberto/320/200' },
      { name: 'Apechain', url: 'https://apechain.com', award: 'SOTD Jun 2026', img: 'https://picsum.photos/seed/apechain/320/200' },
      { name: 'Monogrid', url: 'https://monogrid.com', award: 'SOTD Feb 2026', img: 'https://picsum.photos/seed/monogrid/320/200' },
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
      { name: 'Playfight', url: 'http://www.letsplayfight.com', award: 'Awwwards Featured', img: 'https://picsum.photos/seed/playfight/320/200' },
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
    <section ref={sectionRef} className="relative z-10 overflow-hidden">
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
                        background: isDay
                          ? 'linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.45))'
                          : 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
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
                            <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}>
                              {s.title}
                            </h3>
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
                                  <BrowserFrame key={ex.name} ex={ex} isDay={isDay} />
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
    </section>
  )
}
