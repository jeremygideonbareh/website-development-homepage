import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, FileText, Code, Rocket } from 'lucide-react'

const icons = [Calendar, FileText, Code, Rocket]

const weeks = [
  {
    id: 1,
    title: 'Architecture & UI Mapping',
    days: 'Days 1–7',
    desc: 'We translate your business goals into a technical roadmap and wireframe the user journey.',
    accent: '#E85D3A',
  },
  {
    id: 2,
    title: 'Core Engineering',
    days: 'Days 8–14',
    desc: 'Our team builds the React/Next.js foundation, focusing on millisecond load times and state management.',
    accent: '#2B7A78',
  },
  {
    id: 3,
    title: 'Interactive & 3D Integration',
    days: 'Days 15–21',
    desc: 'We weave in Three.js environments, GSAP animations, and custom features to establish the ApexAI vibe.',
    accent: '#FF6B4A',
  },
  {
    id: 4,
    title: 'QA & Deployment',
    days: 'Days 22–30',
    desc: 'Rigorous stress-testing across devices, followed by a live launch and complete source-code handoff.',
    accent: '#3B8A88',
  },
]

const fromRight = {
  hidden: { x: 300, opacity: 0, scale: 0.96 },
  visible: {
    x: 0, opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 22 },
  },
}

function AnimatedBeam({ start, end, accent, delay = 0, isDay = true }) {
  const [dashOffset, setDashOffset] = useState(0)

  const pathRef = useRef(null)
  const isVisible = useInView(pathRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setDashOffset(prev => (prev - 1) % 200)
    }, 30)
    return () => clearInterval(interval)
  }, [isVisible])

  if (typeof window === 'undefined') return null

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <defs>
        <linearGradient id={`beam-grad-${start.x}-${start.y}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.1" />
          <stop offset="50%" stopColor={accent} stopOpacity="0.6" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.1" />
        </linearGradient>
        <filter id={`glow-${start.x}-${start.y}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Background track */}
      <motion.path
        d={`M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${(start.y + end.y) / 2} ${end.x} ${end.y}`}
        fill="none"
        stroke={isDay ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'}
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={isVisible ? { pathLength: 1 } : {}}
        transition={{ duration: 0.8, delay }}
      />
      {/* Flowing beam */}
      <motion.path
        d={`M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${(start.y + end.y) / 2} ${end.x} ${end.y}`}
        fill="none"
        stroke={`url(#beam-grad-${start.x}-${start.y})`}
        strokeWidth="2.5"
        strokeDasharray="8 12"
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
        filter={`url(#glow-${start.x}-${start.y})`}
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      />
    </svg>
  )
}

function WeekCard({ week, index, isDay = true }) {
  const Icon = icons[index]
  const cardRef = useRef(null)
  const isVisible = useInView(cardRef, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={cardRef}
      variants={fromRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      custom={index}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative rounded-2xl border overflow-hidden"
      style={{
        borderColor: `${week.accent}33`,
        background: isDay
          ? 'rgba(255,255,255,0.8)'
          : `linear-gradient(135deg, ${week.accent}11, transparent)`,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: isDay ? '0 4px 24px rgba(0,0,0,0.04)' : '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      {/* Accent top bar */}
      <motion.div
        className="h-1"
        style={{ background: week.accent }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      />

      <div className="p-5 md:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="size-10 rounded-xl flex items-center justify-center"
            style={{
              background: `${week.accent}18`,
              color: week.accent,
            }}
          >
            <Icon className="size-5" />
          </div>
          <span
            className="text-4xl font-black leading-none"
            style={{ color: `${week.accent}12` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Content */}
        <h3
          className="text-lg font-bold mb-1"
          style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
        >
          {week.title}
        </h3>
        <p
          className="text-xs font-medium tracking-wide mb-3"
          style={{ color: week.accent }}
        >
          {week.days}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}
        >
          {week.desc}
        </p>

        {/* Animated accent line */}
        <motion.div
          className="mt-4 h-0.5 rounded-full"
          style={{
            background: `linear-gradient(to right, ${week.accent}, transparent)`,
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
        />
      </div>
    </motion.div>
  )
}

export default function AnimatedBeamTimeline({ isDay = true }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const sectionRef = useRef(null)

  /* Desktop bezier control points */
  const d = {
    w1: { x: '25%', y: '25%' },
    w2: { x: '75%', y: '25%' },
    w3: { x: '75%', y: '75%' },
    w4: { x: '25%', y: '75%' },
  }

  const beamConfigs = [
    { start: d.w1, end: d.w2, accent: '#E85D3A', delay: 0.4 },
    { start: d.w2, end: d.w3, accent: '#2B7A78', delay: 0.7 },
    { start: d.w3, end: d.w4, accent: '#FF6B4A', delay: 1.0 },
  ]

  return (
    <section ref={sectionRef} className="py-20 md:py-28 overflow-hidden">
      {/* Desktop: 2×2 grid with animated beams */}
      {!isMobile && (
        <div className="relative mx-auto max-w-4xl">
          {/* SVG beams layer */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            {beamConfigs.map((bc, i) => (
              <AnimatedBeam key={i} {...bc} isDay={isDay} />
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-6 md:gap-8 relative">
            {/* Week 1 */}
            <div className="relative" style={{ zIndex: 1 }}>
              <WeekCard week={weeks[0]} index={0} isDay={isDay} />
            </div>
            {/* Week 2 */}
            <div className="relative" style={{ zIndex: 1 }}>
              <WeekCard week={weeks[1]} index={1} isDay={isDay} />
            </div>
            {/* Week 3 */}
            <div className="relative" style={{ zIndex: 1 }}>
              <WeekCard week={weeks[2]} index={2} isDay={isDay} />
            </div>
            {/* Week 4 */}
            <div className="relative" style={{ zIndex: 1 }}>
              <WeekCard week={weeks[3]} index={3} isDay={isDay} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile: Vertical stack */}
      {isMobile && (
        <div className="mx-auto max-w-lg px-6">
          <div className="grid gap-6">
            {weeks.map((week, i) => (
              <div key={week.id} className="relative">
                {/* Connecting line */}
                {i < weeks.length - 1 && (
                  <div
                    className="absolute left-6 top-16 w-0.5 h-8"
                    style={{
                      background: `linear-gradient(to bottom, ${week.accent}, ${weeks[i + 1].accent})`,
                    }}
                  />
                )}
                <WeekCard week={week} index={i} isDay={isDay} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer gradient bar */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div
          className="inline-block h-1 rounded-full"
          style={{
            width: 'clamp(120px, 20vw, 240px)',
            background: 'linear-gradient(to right, #E85D3A, #2B7A78, #FF6B4A, #3B8A88)',
          }}
        />
      </motion.div>
    </section>
  )
}
