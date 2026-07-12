import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AuroraBackground from './ui/aurora-background'

const panels = [
  {
    title: 'Full Ownership',
    tag: '01',
    desc: 'You own 100% of the code and assets. No lock-in, no hidden licences, no monthly fees for something that should be yours.',
    accent: '#FF6B4A',
  },
  {
    title: 'Ship in Weeks',
    tag: '02',
    desc: 'While traditional agencies take months, our AI-native workflows and lean process deliver production-grade products in 2-4 weeks.',
    accent: '#2B7A78',
  },
  {
    title: 'One Point of Contact',
    tag: '03',
    desc: 'A dedicated project manager handles everything — communication, timelines, feedback, changes. No runaround, no bureaucracy.',
    accent: '#E85D3A',
  },
  {
    title: 'End-to-End Service',
    tag: '04',
    desc: 'From strategy and design to development, deployment, and ongoing support — we handle the entire lifecycle of your digital product.',
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
        className="relative min-h-[320px] md:min-h-[400px] rounded-2xl border p-8 md:p-10 flex flex-col justify-between group"
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
            className="absolute inset-0 z-20 pointer-events-none rounded-2xl"
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
    <section ref={sectionRef} className="relative z-10 py-32 overflow-hidden">
      <AuroraBackground
        className="absolute inset-0"
        colors={[
          [255, 107, 74],
          [232, 93, 58],
          [43, 122, 120],
          [59, 138, 136],
        ]}
        speed={0.8}
        blobCount={4}
      />
      <div className="absolute inset-0" style={{ background: isDay ? 'rgba(26,24,23,0.5)' : 'rgba(10,10,10,0.6)' }} />

      <div className="relative px-6 md:px-12 mb-16">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center"
        >
          <p
            className="text-sm font-medium tracking-widest uppercase mb-3"
            style={{ color: '#FF6B4A' }}
          >
            Why choose us
          </p>
          <h2
            className="text-3xl font-bold sm:text-4xl md:text-5xl"
            style={{ color: '#F2F2F2' }}
          >
            The Edge
          </h2>
        </motion.div>
      </div>

      <div className="relative group/track">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: '#F2F2F2',
              touchAction: 'manipulation',
            }}
          >
            <ChevronLeft className="size-5" />
          </button>
        )}

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              background: 'rgba(0,0,0,0.6)',
              color: '#F2F2F2',
              touchAction: 'manipulation',
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
            scrollbarColor: '#FF6B4A88 transparent',
            msOverflowStyle: '-ms-autohiding-scrollbar',
          }}
        >
          <style>{`
            .WhyUsTrack::-webkit-scrollbar { height: 4px; }
            .WhyUsTrack::-webkit-scrollbar-track { background: transparent; }
            .WhyUsTrack::-webkit-scrollbar-thumb {
              background: #FF6B4A66;
              border-radius: 999px;
            }
            .WhyUsTrack::-webkit-scrollbar-thumb:hover {
              background: #FF6B4A;
            }
          `}</style>
          {panels.map((p, i) => (
            <PanelCard key={p.title} p={p} i={i} isDay={isDay} />
          ))}
        </div>
      </div>

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
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-all duration-300"
            style={{ background: 'transparent', touchAction: 'manipulation' }}
          >
            <span className="size-2.5 rounded-full" style={{ background: p.accent }} />
          </button>
        ))}
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
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
