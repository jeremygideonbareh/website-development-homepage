import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import { Search, PenTool, Code, Rocket, HeartHandshake } from 'lucide-react'

const icons = [Search, PenTool, Code, Rocket, HeartHandshake]

const steps = [
  {
    id: 1,
    title: 'Discovery',
    subtitle: 'Understand',
    desc: 'We learn about your business, goals, audience, and competition. By the end of this phase, we have a clear roadmap with timelines, milestones, and deliverables.',
    accent: '#E85D3A',
  },
  {
    id: 2,
    title: 'Design',
    subtitle: 'Blueprint',
    desc: 'Wireframes become high-fidelity mockups. We iterate on the look and feel until every pixel tells your story. You approve the design before any code is written.',
    accent: '#2B7A78',
  },
  {
    id: 3,
    title: 'Develop',
    subtitle: 'Build',
    desc: 'Our engineers build your product using modern frameworks — React, Next.js, Node.js, Python. You get weekly progress updates and a live staging environment.',
    accent: '#FF6B4A',
  },
  {
    id: 4,
    title: 'Deploy',
    subtitle: 'Launch',
    desc: 'We handle hosting, domain setup, SSL, and performance optimization. Your site goes live with CI/CD, monitoring, and a rollback plan in place.',
    accent: '#3B8A88',
  },
  {
    id: 5,
    title: 'Support',
    subtitle: 'Grow',
    desc: 'Post-launch support, maintenance, and iterations. We stay on as your technical partner — adding features, optimizing performance, and scaling as you grow.',
    accent: '#E85D3A',
  },
]

const phaseLabels = [
  'Step 1/5: Discovery',
  'Step 2/5: Design',
  'Step 3/5: Development',
  'Step 4/5: Deploy',
  'Step 5/5: Support',
]

function HorizontalStepCard({ step, index, isDay }) {
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
          border: isDay ? '1px solid rgba(255,255,255,0.85)' : '1px solid rgba(255,255,255,0.06)',
          boxShadow: isDay
            ? '0 8px 32px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.7)'
            : '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}
      >
        <div
          className="absolute top-0 left-1/4 right-1/4 h-px pointer-events-none"
          style={{
            background: isDay
              ? 'linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)'
              : 'linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)',
          }}
        />
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 lg:gap-20">
          <div className="flex-shrink-0 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-[clamp(5rem,12vw,10rem)] font-black leading-none select-none"
              style={{ color: `${step.accent}18` }}
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.15 }}
              className="size-14 md:size-20 rounded-2xl flex items-center justify-center -mt-2 md:-mt-4"
              style={{ background: `${step.accent}20`, color: step.accent }}
            >
              <Icon className="size-6 md:size-9" />
            </motion.div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm font-semibold tracking-widest uppercase mb-2"
              style={{ color: step.accent }}
            >
              {step.subtitle}
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
            >
              {step.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0"
              style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}
            >
              {step.desc}
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="h-1 rounded-full mt-6"
              style={{
                width: 'clamp(80px, 20vw, 160px)',
                background: `linear-gradient(to right, ${step.accent}, transparent)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function VerticalStepCard({ step, index, isDay }) {
  const Icon = icons[index]
  return (
    <motion.div
      initial={{ x: 300, opacity: 0, scale: 0.96 }}
      whileInView={{ x: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="relative rounded-2xl border overflow-hidden"
      style={{
        borderColor: `${step.accent}33`,
        background: isDay
          ? 'rgba(255,255,255,0.8)'
          : `linear-gradient(135deg, ${step.accent}11, transparent)`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <motion.div
        className="h-1"
        style={{ background: step.accent }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      />
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className="size-10 rounded-xl flex items-center justify-center"
            style={{ background: `${step.accent}18`, color: step.accent }}
          >
            <Icon className="size-5" />
          </div>
          <span
            className="text-4xl font-black leading-none"
            style={{ color: `${step.accent}12` }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3
          className="text-lg font-bold mb-1"
          style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
        >
          {step.title}
        </h3>
        <p
          className="text-xs font-medium tracking-wide mb-3"
          style={{ color: step.accent }}
        >
          {step.subtitle}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}
        >
          {step.desc}
        </p>
        <motion.div
          className="mt-4 h-0.5 rounded-full"
          style={{
            background: `linear-gradient(to right, ${step.accent}, transparent)`,
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
  const [isMobile, setIsMobile] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [phaseText, setPhaseText] = useState(phaseLabels[0])
  const sectionRef = useRef(null)
  const bgColor = isDay ? '#F5F0EB' : '#1A1817'

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile === null) return null

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-400vw'])
  const percentText = useTransform(scrollYProgress, (v) => `${Math.round(v * 100)}%`)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = Math.min(Math.floor(latest * 5), 4)
    setActiveStep(step)
    setPhaseText(phaseLabels[step])
  })

  return (
    <section ref={sectionRef} className="relative" style={{ backgroundColor: bgColor }}>
      {/* Desktop: sticky horizontal scroll */}
      {!isMobile && (
        <div className="relative" style={{ height: '600vh' }}>
          <div className="sticky top-0 h-screen overflow-hidden">
            {/* Floating particles background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute size-1.5 rounded-full"
                  style={{
                    background: steps[i % 5].accent,
                    left: `${10 + i * 12}%`,
                    top: `${15 + (i % 4) * 25}%`,
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
                key={`title-${activeStep}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-2xl md:text-4xl lg:text-5xl font-bold px-4"
                style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
              >
                Our Process
              </motion.h2>
            </div>

            {/* Horizontal track */}
            <div className="absolute inset-0 top-20 md:top-28 bottom-16">
              <motion.div style={{ x }} className="flex h-full">
                {steps.map((step, i) => (
                  <HorizontalStepCard key={step.id} step={step} index={i} isDay={isDay} />
                ))}
              </motion.div>
            </div>

            {/* Progress bar at bottom */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                {steps.map((s, i) => (
                  <motion.div
                    key={s.id}
                    animate={{
                      width: i === activeStep ? 28 : 8,
                      background: i <= activeStep
                        ? steps[activeStep].accent
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
              Our Process
            </h2>
          </div>
          <div className="grid gap-6">
            {steps.map((step, i) => (
              <div key={step.id} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="absolute left-6 w-0.5"
                    style={{
                      top: 68,
                      bottom: 0,
                      background: `linear-gradient(to bottom, ${step.accent}, ${steps[i + 1].accent})`,
                    }}
                  />
                )}
                <VerticalStepCard step={step} index={i} isDay={isDay} />
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
              background: 'linear-gradient(to right, #E85D3A, #2B7A78, #FF6B4A, #3B8A88, #E85D3A)',
            }}
          />
        </motion.div>
      )}
    </section>
  )
}
