import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NetworkParticles from './NetworkParticles'

const panels = [
  {
    title: 'AI-Native Team',
    tag: '01',
    desc: "We don't bolt AI on. We build with it from day zero — agents, pipelines, and models are core to every project.",
    accent: '#FF6B4A',
  },
  {
    title: '3x Faster Delivery',
    tag: '02',
    desc: 'Our workflows and AI tooling slash dev time without cutting corners. You ship in weeks, not months.',
    accent: '#2B7A78',
  },
  {
    title: 'One Point of Contact',
    tag: '03',
    desc: 'A dedicated project manager handles everything — communication, timelines, changes. No runaround.',
    accent: '#E85D3A',
  },
  {
    title: 'Global Talent',
    tag: '04',
    desc: 'Hand-picked engineers across time zones keep your project moving around the clock.',
    accent: '#3B8A88',
  },
]

function PanelCard({ p, i, isDay }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ x: 300, opacity: 0, scale: 0.96 }}
      whileInView={{ x: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 22, delay: i * 0.12 }}
      onViewportEnter={() => setTimeout(() => setLoaded(true), 300 + i * 80)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="flex-shrink-0 w-[85vw] max-w-lg md:w-[40vw] snap-start"
    >
      <div
        className="relative h-[320px] md:h-[400px] rounded-2xl border p-8 md:p-10 flex flex-col justify-between overflow-hidden group"
        style={{
          borderColor: `${p.accent}33`,
          background: isDay
            ? 'rgba(255,255,255,0.85)'
            : `linear-gradient(135deg, ${p.accent}11, transparent)`,
          backdropFilter: 'blur(12px)',
        }}
      >
        {!loaded && (
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl"
            style={{
              background: isDay
                ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 50%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <motion.div
          className="absolute -inset-40 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
          style={{
            background: `radial-gradient(600px circle at 50% 50%, ${p.accent}, transparent)`,
          }}
        />

        <div className="relative z-10">
          <span
            className="text-7xl md:text-8xl font-black leading-none"
            style={{ color: `${p.accent}18` }}
          >
            {p.tag}
          </span>
          <h3
            className="text-2xl md:text-3xl font-bold mt-2"
            style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
          >
            {p.title}
          </h3>
          <p
            className="mt-4 text-sm leading-relaxed max-w-sm"
            style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}
          >
            {p.desc}
          </p>
        </div>

        <motion.div
          className="relative z-10 w-12 h-0.5 rounded-full"
          style={{ background: p.accent }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
        />
      </div>
    </motion.div>
  )
}

export default function WhyUsSection({ isDay = true }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const revealWidth = useTransform(scrollYProgress, [0, 0.15], ['0%', '100%'])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const check = () => {
      setCanScrollLeft(el.scrollLeft > 10)
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
    }
    el.addEventListener('scroll', check)
    check()
    return () => el.removeEventListener('scroll', check)
  }, [])

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    const amt = el.clientWidth * 0.85
    el.scrollBy({ left: dir === 'left' ? -amt : amt, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative z-10 py-32">
      {/* Background layer that sweeps in from right */}
      <motion.div
        className="absolute inset-0"
        style={{ width: revealWidth, right: 0 }}
      >
        <div className="absolute inset-0" style={{ background: isDay ? '#1A1817' : '#0A0A0A' }}>
          <NetworkParticles color="#FF6B4A" speed={0.1} />
        </div>
      </motion.div>

      <div className="relative px-6 md:px-12 mb-16">
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 22 }}
          className="text-center"
        >
          <p
            className="text-sm font-medium tracking-widest uppercase mb-3"
            style={{ color: isDay ? '#E85D3A' : '#FF6B4A' }}
          >
            Why choose us
          </p>
          <h2
            className="text-3xl font-bold sm:text-4xl md:text-5xl"
            style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
          >
            The Edge
          </h2>
        </motion.div>
      </div>

      {/* Scrollable track with arrows */}
      <div className="relative group/track">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full flex items-center justify-center transition-opacity"
            style={{
              background: isDay ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)',
              color: isDay ? '#1A1A1A' : '#F2F2F2',
            }}
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full flex items-center justify-center transition-opacity"
            style={{
              background: isDay ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)',
              color: isDay ? '#1A1A1A' : '#F2F2F2',
            }}
          >
            <ChevronRight className="size-5" />
          </button>
        )}

        <div
          ref={trackRef}
          className="WhyUsTrack flex gap-6 md:gap-10 px-6 md:px-12 overflow-x-auto snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: isDay ? '#E85D3A88 transparent' : '#FF6B4A88 transparent',
            msOverflowStyle: '-ms-autohiding-scrollbar',
          }}
        >
          <style>{`
            .WhyUsTrack::-webkit-scrollbar { height: 4px; }
            .WhyUsTrack::-webkit-scrollbar-track { background: transparent; }
            .WhyUsTrack::-webkit-scrollbar-thumb {
              background: ${isDay ? '#E85D3A66' : '#FF6B4A66'};
              border-radius: 999px;
            }
            .WhyUsTrack::-webkit-scrollbar-thumb:hover {
              background: ${isDay ? '#E85D3A' : '#FF6B4A'};
            }
          `}</style>
          {panels.map((p, i) => (
            <PanelCard key={p.title} p={p} i={i} isDay={isDay} />
          ))}
        </div>
      </div>

      {/* Scroll indicator dots */}
      <div className="relative z-10 flex justify-center gap-2 mt-8">
        {panels.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              const el = trackRef.current
              if (!el) return
              const card = el.children[i]
              if (card) card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
            }}
            className="size-2 rounded-full transition-all duration-300"
            style={{ background: p.accent }}
          />
        ))}
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ x: 300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100, damping: 22 }}
      >
        <div
          className="inline-block h-1 rounded-full"
          style={{
            width: 'clamp(120px, 20vw, 240px)',
            background: `linear-gradient(to right, #FF6B4A, #2B7A78, #E85D3A, #3B8A88)`,
          }}
        />
      </motion.div>
    </section>
  )
}
