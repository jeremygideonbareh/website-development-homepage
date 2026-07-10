import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const packages = [
  {
    name: 'Starter',
    price: '$2,500',
    priceLabel: 'starting from',
    desc: 'Perfect for small businesses ready to establish a strong online presence.',
    features: [
      '5-page responsive website',
      'Mobile-first design',
      'Basic SEO setup',
      'Contact form integration',
      '1 revision round',
      '1 month hosting support',
    ],
    accent: '#E85D3A',
  },
  {
    name: 'Growth',
    price: '$5,000',
    priceLabel: 'starting from',
    desc: 'For growing businesses needing custom functionality and AI automation.',
    features: [
      'Custom web app or AI automation',
      'Custom CMS integration',
      'Advanced SEO & analytics',
      '3 revision rounds',
      '30-day post-launch support',
      'Performance optimization',
      'API integrations',
    ],
    accent: '#FF6B4A',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$15,000',
    priceLabel: 'starting from',
    desc: 'Full-stack products with dedicated team and ongoing partnership.',
    features: [
      'Full-stack product development',
      'AI agent integration',
      'Mobile app development',
      'Dedicated project manager',
      'Unlimited revision rounds',
      'Ongoing maintenance & support',
      'Priority response (24h)',
      'Source code ownership',
    ],
    accent: '#3B8A88',
  },
]

const serviceRanges = [
  { service: 'Web Development', from: '$2,500' },
  { service: 'AI & Automation', from: '$5,000' },
  { service: 'Mobile Apps', from: '$8,000' },
  { service: 'UI/UX Design', from: '$2,000' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function PricingSection({ isDay = true, onBook }) {
  const accent = isDay ? '#E85D3A' : '#FF6B4A'
  const text = isDay ? '#1A1A1A' : '#F2F2F2'
  const muted = isDay ? '#5A4A3A' : '#8A8A8A'
  const dim = isDay ? '#8A7A6A' : '#6A6A6A'
  const bg = isDay ? '#F5F0EB' : '#1A1817'
  const border = isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'
  const cardBg = isDay ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)'

  return (
    <section className="px-4 sm:px-6 py-28 md:px-12 relative z-10" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: accent }}>
            Investment
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: text }}>
            Transparent Pricing
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: muted }}>
            No hidden fees. No surprise charges. Every project starts with a free discovery call.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 w-20 mx-auto mt-6 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </motion.div>

        {/* Package cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={item}
              className="relative rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1 flex flex-col"
              style={{
                borderColor: pkg.highlighted ? pkg.accent : border,
                background: cardBg,
                backdropFilter: 'blur(12px)',
              }}
            >
              {pkg.highlighted && (
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: pkg.accent }} />
              )}
              <div className="p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold" style={{ color: text }}>{pkg.name}</h3>
                    {pkg.highlighted && (
                      <span
                        className="text-[11px] font-semibold px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: `${pkg.accent}20`,
                          color: pkg.accent,
                        }}
                      >
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline gap-1 mt-3">
                    <span className="text-4xl font-black" style={{ color: text }}>{pkg.price}</span>
                    <span className="text-sm" style={{ color: dim }}>{pkg.priceLabel}</span>
                  </div>
                  <p className="text-sm mt-3" style={{ color: muted }}>{pkg.desc}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm" style={{ color: muted }}>
                      <Check className="size-4 mt-0.5 flex-shrink-0" style={{ color: pkg.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onBook}
                  className="w-full py-3 rounded-full text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: pkg.highlighted ? pkg.accent : (isDay ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)'),
                    color: pkg.highlighted ? '#FFFFFF' : text,
                  }}
                >
                  Book a Free Call
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Starting-from per service */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-center mb-8" style={{ color: text }}>
            Per-Service Starting Rates
          </h3>
          <div
            className="rounded-2xl border divide-y overflow-hidden"
            style={{
              borderColor: border,
              borderWidth: '1px',
            }}
          >
            {serviceRanges.map((s, i) => (
              <div
                key={s.service}
                className="flex items-center justify-between px-6 py-4"
                style={{
                  borderColor: border,
                  backgroundColor: i % 2 === 0 ? (isDay ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)') : 'transparent',
                }}
              >
                <span className="text-sm font-medium" style={{ color: text }}>{s.service}</span>
                <span className="text-sm font-semibold" style={{ color: accent }}>from {s.from}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xs mt-4" style={{ color: dim }}>
            Every project is unique. Final pricing depends on scope, complexity, and timeline.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
