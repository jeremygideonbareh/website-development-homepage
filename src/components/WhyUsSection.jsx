import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Code, Zap, MessageSquare, Layers, ArrowUpRight } from 'lucide-react'
import { FlickeringGrid } from './ui/flickering-grid'

const panels = [
  {
    title: 'Full Ownership',
    tag: '01',
    desc: 'You own 100% of the code and assets. No lock-in, no hidden licences, no monthly fees for something that should be yours.',
    stat: '100%',
    statLabel: 'IP Ownership',
    icon: Code,
    accent: '#FF6B4A',
    highlights: ['Full source code access', 'No platform lock-in', 'Commercial license included'],
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    title: 'Ship in Weeks',
    tag: '02',
    desc: 'While traditional agencies take months, our AI-native workflows deliver production-grade products in 2–4 weeks.',
    stat: '2-4',
    statLabel: 'Weeks to ship',
    icon: Zap,
    accent: '#2B7A78',
    highlights: ['AI-accelerated workflow', 'Lean agile process', 'Weekly progress demos'],
    span: 'md:col-span-1',
  },
  {
    title: 'One Point of Contact',
    tag: '03',
    desc: 'A dedicated project manager handles everything — communication, timelines, feedback, changes. No runaround.',
    stat: '1',
    statLabel: 'Dedicated PM',
    icon: MessageSquare,
    accent: '#E85D3A',
    highlights: ['Single point of contact', 'Direct communication', 'No bureaucracy'],
    span: 'md:col-span-1',
  },
  {
    title: 'End-to-End Service',
    tag: '04',
    desc: 'From strategy and design to development, deployment, and ongoing support — we handle the entire lifecycle of your digital product.',
    stat: 'Full',
    statLabel: 'Lifecycle coverage',
    icon: Layers,
    accent: '#3B8A88',
    highlights: ['Strategy & consulting', 'Design & development', 'Deploy & maintain'],
    span: 'md:col-span-3',
  },
]

function StatBadge({ stat, label, accent }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-3xl font-bold tabular-nums" style={{ color: accent }}>
        {stat}
      </span>
      <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
        {label}
      </span>
    </div>
  )
}

function WhyCard({ p, i, isDay }) {
  const Icon = p.icon

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
      className={`group relative overflow-hidden rounded-2xl border ${p.span} col-span-3`}
      style={{
        borderColor: `${p.accent}22`,
        background: isDay
          ? 'rgba(255,255,255,0.85)'
          : `linear-gradient(145deg, ${p.accent}08, transparent 70%)`,
      }}
    >
      <div
        className="absolute -top-24 -right-24 h-48 w-48 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-3xl"
        style={{ background: `radial-gradient(circle, ${p.accent}, transparent)` }}
      />

      <div className="relative p-6 md:p-8 flex flex-col h-full min-h-[160px] md:min-h-[200px]">
        <div className="flex items-start justify-between mb-4">
          <div
            className="flex items-center justify-center h-10 w-10 rounded-xl"
            style={{ background: `${p.accent}18` }}
          >
            <Icon className="size-5" style={{ color: p.accent }} />
          </div>
          <span
            className="text-5xl md:text-6xl font-black leading-none select-none"
            style={{ color: `${p.accent}10` }}
          >
            {p.tag}
          </span>
        </div>

        <div className="flex-1">
          <StatBadge stat={p.stat} label={p.statLabel} accent={p.accent} />
          <h3
            className="text-xl md:text-2xl font-bold mt-2"
            style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
          >
            {p.title}
          </h3>
          <p
            className="mt-2 text-sm leading-relaxed max-w-md break-words"
            style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}
          >
            {p.desc}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {p.highlights.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
              style={{
                background: `${p.accent}12`,
                color: isDay ? p.accent : `${p.accent}cc`,
                border: `1px solid ${p.accent}22`,
              }}
            >
              <span className="size-1 rounded-full" style={{ background: p.accent }} />
              {h}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function WhyUsSection({ isDay = true }) {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  return (
    <section aria-label="Why choose us" ref={sectionRef} className="relative z-10 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0">
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color={isDay ? '#FF6B4A' : '#FF6B4A'}
          maxOpacity={isDay ? 0.08 : 0.05}
          className="absolute inset-0"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: isDay
            ? 'linear-gradient(180deg, rgba(245,240,235,0.97) 0%, rgba(245,240,235,0.92) 100%)'
            : 'linear-gradient(180deg, rgba(10,8,7,0.97) 0%, rgba(10,8,7,0.92) 100%)',
        }}
      />

      <div className="relative px-6 md:px-12 mb-14">
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
            {t('whyUs.eyebrow')}
          </p>
          <h2
            className="text-3xl font-bold sm:text-4xl md:text-5xl"
            style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
          >
            {t('whyUs.heading')}
          </h2>
        </motion.div>
      </div>

      <div className="relative px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 auto-rows-auto">
          {panels.map((p, i) => (
            <WhyCard key={p.title} p={p} i={i} isDay={isDay} />
          ))}
        </div>
      </div>

      <motion.div
        className="mt-14 text-center relative"
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
