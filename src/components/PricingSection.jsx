import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { useTiltEffect } from '../hooks/useTiltEffect'

const packages = [
  {
    name: 'Basic',
    monthlyPrice: '₹7,000',
    yearlyPrice: '₹70,000',
    priceLabel: 'starting from',
    desc: 'A responsive React 19 website with TypeScript and Tailwind CSS — optimized for mobile, with basic JSON-LD SEO and Cloudflare deployment.',
    features: [
      '5-page React 19 website with Tailwind CSS',
      'Mobile-first responsive design',
      'Basic SEO with meta tags and JSON-LD schema',
      'Contact form with Cloudflare Workers backend',
      '1 revision round',
      '1 month hosting support on Cloudflare',
    ],
    examples: ['Portfolio', 'Landing Page', 'Small Business Site'],
    accent: '#E85D3A',
  },
  {
    name: 'Business',
    monthlyPrice: '₹14,000',
    yearlyPrice: '₹1,40,000',
    priceLabel: 'starting from',
    desc: 'Custom full-stack React app or AI automation with CMS, analytics, and API integrations — built to scale your operations.',
    features: [
      'Custom React 19 web app or AI automation',
      'Custom CMS integration (Decap or Strapi)',
      'Advanced JSON-LD SEO & Plausible analytics',
      '3 revision rounds',
      '30-day post-launch support',
      'Performance optimization (95+ Lighthouse)',
      'API integrations (Stripe, Firebase, AWS)',
    ],
    examples: ['E-commerce Store', 'SaaS Dashboard', 'Membership Portal'],
    accent: '#FF6B4A',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: '₹25,000',
    yearlyPrice: '₹2,50,000',
    priceLabel: 'starting from',
    desc: 'Full-stack product with React 19, Node.js, AI agent integration, and React Native mobile app — dedicated PM and unlimited revisions.',
    features: [
      'Full-stack product with React 19 + Node.js',
      'AI agent integration with LangChain',
      'React Native mobile app (iOS + Android)',
      'Dedicated project manager',
      'Unlimited revision rounds',
      'Ongoing maintenance & support',
      'Priority response SLA (4 hours)',
      'Full source code ownership',
    ],
    examples: ['Multi-tenant Platform', 'Marketplace', 'ERP System'],
    accent: '#3B8A88',
  },
    {
    name: 'Custom Animated',
    monthlyPrice: '₹3,00,000',
    yearlyPrice: '₹30,00,000',
    priceLabel: 'onwards',
    desc: 'Award-caliber 3D WebGL experiences using Three.js and React Three Fiber with cinematic GSAP ScrollTrigger motion design.',
    features: [
      'Custom 3D / WebGL with React Three Fiber',
      'Cinematic GSAP ScrollTrigger animations',
      'Interactive brand storytelling',
      'Dedicated creative director',
      'Unlimited revision rounds',
      'Priority support & maintenance',
      '60fps performance optimization',
      'Full source code ownership',
    ],
    examples: ['3D / WebGL Experience', 'Cinematic Brand Showcase', 'Interactive Product Launch'],
    accent: '#7C5CFC',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

function BillingToggle({ isYearly, onToggle }) {
  const { t } = useTranslation()
  return (
    <div className="flex justify-center mb-12">
      <div className="relative flex w-fit items-center rounded-full p-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="absolute top-0 h-full rounded-full"
          layoutId="billing-pill"
          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
          style={{
            width: '50%',
            background: 'rgba(255,255,255,0.1)',
            left: isYearly ? '50%' : '0%',
          }}
        />
        <button
          onClick={() => onToggle(false)}
          className="relative z-10 rounded-full px-6 py-2.5 text-sm font-medium transition-colors w-32 min-h-[44px]"
          style={{ color: isYearly ? '#8A8A8A' : '#F2F2F2', touchAction: 'manipulation' }}
        >
          {t('pricing.monthly')}
        </button>
        <button
          onClick={() => onToggle(true)}
          className="relative z-10 rounded-full px-6 py-2.5 text-sm font-medium transition-colors w-32 min-h-[44px]"
          style={{ color: isYearly ? '#F2F2F2' : '#8A8A8A', touchAction: 'manipulation' }}
        >
          {t('pricing.yearly')}
          <span className="ml-1.5 text-[10px]" style={{ color: '#FF6B4A' }}>-17%</span>
        </button>
      </div>
    </div>
  )
}

function PricingCard({ pkg, isDay, text, muted, dim, border, cardBg, onBook, isYearly }) {
  const { t } = useTranslation()
  const {
    cardRef,
    isHovered,
    tiltStyle,
    spotlightBg,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useTiltEffect({ tiltRange: 3, spotlightColor: `${pkg.accent}18` })

  return (
    <motion.div
      variants={item}
      className="relative group"
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-2xl border overflow-visible transition-all duration-500 hover:-translate-y-1 flex flex-col"
        style={{
          ...tiltStyle,
          borderColor: pkg.highlighted ? pkg.accent : border,
          background: cardBg,
          backdropFilter: 'blur(12px)',
        }}
      >
        {pkg.highlighted && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <span
              className="text-[11px] font-semibold px-4 py-1.5 rounded-full shadow-lg"
              style={{ backgroundColor: pkg.accent, color: '#FFFFFF' }}
            >
              Most Popular
            </span>
          </div>
        )}

        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: spotlightBg, opacity: isHovered ? 1 : 0 }}
        />

          <div className="p-6 md:p-8 flex flex-col h-full relative break-words" style={{ transformStyle: 'preserve-3d' }}>
          <div className="mb-6 max-w-full overflow-hidden" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xl font-bold" style={{ color: text }}>{pkg.name}</h3>
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              <span className="text-4xl font-black tracking-tight" style={{ color: text }}>
                {isYearly ? pkg.yearlyPrice : pkg.monthlyPrice}
              </span>
              <span className="text-sm" style={{ color: dim }}>{pkg.priceLabel}</span>
            </div>
            <p className="text-sm mt-3 leading-relaxed" style={{ color: muted }}>{pkg.desc}</p>
          </div>

          <ul className="space-y-2.5 mb-8 flex-1 max-w-full" style={{ transform: 'translateZ(20px)' }}>
            {pkg.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm leading-snug break-words" style={{ color: muted }}>
                <Check className="size-4 mt-0.5 flex-shrink-0" style={{ color: pkg.accent }} />
                <span className="min-w-0">{f}</span>
              </li>
            ))}
          </ul>

          <div className="mb-6" style={{ transform: 'translateZ(25px)' }}>
            <p className="text-xs font-semibold tracking-wider uppercase mb-2.5" style={{ color: dim }}>
              {t('pricing.bestFor')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {pkg.examples.map((ex) => (
                <span
                  key={ex}
                  className="text-[11px] px-2.5 py-1 rounded-full border"
                  style={{ borderColor: border, color: muted }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onBook}
            className="w-full py-3.5 rounded-full text-sm font-semibold transition-all relative overflow-hidden hover:opacity-90"
            style={{
              backgroundColor: pkg.highlighted ? pkg.accent : (isDay ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.08)'),
              color: pkg.highlighted ? '#FFFFFF' : text,
            }}
          >
            {t('pricing.bookCall')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PricingSection({ isDay = true, onBook }) {
  const { t } = useTranslation()
  const [isYearly, setIsYearly] = useState(false)

  const accent = isDay ? '#E85D3A' : '#FF6B4A'
  const text = isDay ? '#1A1A1A' : '#F2F2F2'
  const muted = isDay ? '#5A4A3A' : '#8A8A8A'
  const dim = isDay ? '#8A7A6A' : '#6A6A6A'
  const bg = isDay ? '#F5F0EB' : '#1A1817'
  const border = isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'
  const cardBg = isDay ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)'

  return (
    <section aria-label="Pricing" className="px-4 sm:px-6 py-28 md:px-12 relative z-10" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: accent }}>
            {t('pricing.eyebrow')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: text }}>
            {t('pricing.heading')}
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: muted }}>
            {t('pricing.subtitle')}
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

        <BillingToggle isYearly={isYearly} onToggle={setIsYearly} />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-12"
        >
          {packages.map((pkg) => (
            <PricingCard
              key={pkg.name}
              pkg={pkg}
              isDay={isDay}
              text={text}
              muted={muted}
              dim={dim}
              border={border}
              cardBg={cardBg}
              onBook={onBook}
              isYearly={isYearly}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs"
          style={{ color: dim }}
        >
          {t('pricing.disclaimer')}
        </motion.p>
      </div>
    </section>
  )
}
