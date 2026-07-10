import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Calendar, FileText, Code, Rocket } from 'lucide-react'

const icons = [Calendar, FileText, Code, Rocket]

const weeks = [
  {
    id: 1,
    title: 'Architecture & UI Mapping',
    days: 'Days 1–7',
    desc: 'We translate your business goals into a technical roadmap and wireframe the user journey — 60% faster than traditional agencies.',
    accent: '#E85D3A',
  },
  {
    id: 2,
    title: 'Core Engineering',
    days: 'Days 8–14',
    desc: 'Our team builds the React/Next.js foundation with millisecond load times, state management, and a deployable build by day 14.',
    accent: '#2B7A78',
  },
  {
    id: 3,
    title: 'Interactive & 3D Integration',
    days: 'Days 15–21',
    desc: 'We weave in Three.js environments, GSAP animations, and custom features to establish the Rogue Code vibe.',
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

const phaseLabels = [
  'Phase 1/4: Blueprint',
  'Phase 2/4: Engineering',
  'Phase 3/4: Interactive',
  'Phase 4/4: Launch',
]

function HorizontalWeekCard({ week, index, isDay }) {
  const Icon = icons[index]
  return (
    <div className="flex-shrink-0 w-screen h-full flex items-center justify-center px-6 md:px-16 lg:px-24">
      <div
        className="w-full max-w-5xl rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
        style={{
          background: isDay
            ? 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))'
            : 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.015))',
          backdropFilter: 'blur(24px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
          border: isDay ? '1px solid rgba(255,255,255,0.85)' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: isDay
            ? '0 8px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)'
            : '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        {/* Shine highlight */}
        <div
          className="absolute top-0 left-1/4 right-1/4 h-px pointer-events-none"
          style={{
            background: isDay
              ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)'
              : 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)',
          }}
        />
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-20">
        {/* Left: Giant number + icon */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-[clamp(5rem,12vw,10rem)] font-black leading-none select-none"
            style={{ color: `${week.accent}18` }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.15 }}
            className="size-14 md:size-20 rounded-2xl flex items-center justify-center -mt-2 md:-mt-4"
            style={{ background: `${week.accent}20`, color: week.accent }}
          >
            <Icon className="size-6 md:size-9" />
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ color: week.accent }}
          >
            {week.days}
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
            style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
          >
            {week.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0"
            style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}
          >
            {week.desc}
          </motion.p>

          {/* Animated accent bar */}
          <motion.div
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-1 rounded-full mt-6"
            style={{
              width: 'clamp(80px, 20vw, 160px)',
              background: `linear-gradient(to right, ${week.accent}, transparent)`,
            }}
          />
        </div>
      </div>
    </div>
  </div>
  )
}

function VerticalWeekCard({ week, index, isDay }) {
  const Icon = icons[index]
  return (
    <motion.div
      initial={{ x: 300, opacity: 0, scale: 0.96 }}
      whileInView={{ x: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
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
      <motion.div
        className="h-1"
        style={{ background: week.accent }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      />
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="size-10 rounded-xl flex items-center justify-center"
            style={{ background: `${week.accent}18`, color: week.accent }}
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
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [activeWeek, setActiveWeek] = useState(0)
  const [phaseText, setPhaseText] = useState(phaseLabels[0])
  const sectionRef = useRef(null)
  const bgColor = isDay ? '#F5F0EB' : '#1A1817'

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw'])
  const percentText = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const week = Math.min(Math.floor(latest * 4), 3)
    setActiveWeek(week)
    setPhaseText(phaseLabels[week])
  })

  return (
    <section ref={sectionRef} className="relative" style={{ backgroundColor: bgColor }}>
      {/* Desktop: sticky horizontal scroll */}
      {!isMobile && (
        <div className="relative" style={{ height: '500vh' }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Floating particles background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute size-1.5 rounded-full"
                  style={{
                    background: isDay ? weeks[i % 4].accent : weeks[i % 4].accent,
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 30}%`,
                    opacity: 0.15,
                  }}
                  animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                />
              ))}
            </div>

            {/* Phase label at top */}
            <div className="absolute top-0 left-0 right-0 z-10 text-center pt-8 md:pt-12">
              <motion.p
                key={phaseText}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-2"
                style={{ color: isDay ? '#E85D3A' : '#FF6B4A' }}
              >
                How We Work
              </motion.p>
              <motion.h2
                key={`title-${activeWeek}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold px-4"
                style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
              >
                The 30-Day Sprint
              </motion.h2>
            </div>

            {/* Horizontal track */}
            <div className="absolute inset-0 top-20 md:top-28 bottom-16">
              <motion.div style={{ x }} className="flex h-full">
                {weeks.map((week, i) => (
                  <HorizontalWeekCard key={week.id} week={week} index={i} isDay={isDay} />
                ))}
              </motion.div>
            </div>

            {/* Progress bar at bottom */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                {weeks.map((w, i) => (
                  <motion.div
                    key={w.id}
                    animate={{
                      width: i === activeWeek ? 28 : 8,
                      background: i <= activeWeek
                        ? weeks[activeWeek].accent
                        : (isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'),
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-1.5 rounded-full"
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="text-[10px] md:text-xs font-medium tracking-wider"
                  style={{ color: isDay ? '#8A7A6A' : '#6A6A6A' }}
                >
                  {phaseText}
                </span>
                <motion.span
                  className="text-[10px] md:text-xs font-mono"
                  style={{ color: isDay ? '#8A7A6A' : '#6A6A6A' }}
                >
                  {percentText}
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile: vertical stack */}
      {isMobile && (
        <div className="mx-auto max-w-lg px-6">
          <div className="text-center mb-12">
            <p
              className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-2"
              style={{ color: isDay ? '#E85D3A' : '#FF6B4A' }}
            >
              How We Work
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
            >
              The 30-Day Sprint
            </h2>
          </div>
          <div className="grid gap-6">
            {weeks.map((week, i) => (
              <div key={week.id} className="relative">
                {i < weeks.length - 1 && (
                  <div
                    className="absolute left-6 top-16 w-0.5 h-8"
                    style={{
                      background: `linear-gradient(to bottom, ${week.accent}, ${weeks[i + 1].accent})`,
                    }}
                  />
                )}
                <VerticalWeekCard week={week} index={i} isDay={isDay} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer gradient bar */}
      {isMobile && (
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
      )}
    </section>
  )
}
