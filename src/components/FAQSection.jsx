import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How long does it take to build a React website or web application?',
    a: 'Most Rogue Code projects ship in 2-4 weeks from design approval. A standard 5-page React 19 website with TypeScript and Tailwind CSS takes 2-3 weeks. Custom web applications with AI agent integration via LangChain typically take 4-8 weeks depending on the number of API integrations, third-party services, and database complexity. We provide a precise timeline with milestone dates during the free discovery call.',
  },
  {
    q: 'How does your web development process work from concept to Cloudflare deployment?',
    a: 'Rogue Code follows a 5-phase process. Phase 1 — Discovery call to define your business goals, technical requirements, budget, and timeline. Phase 2 — UI/UX design in Figma with wireframes and high-fidelity mockups, including 2 revision rounds. Phase 3 — Development in React 19 with TypeScript, Node.js backend, and PostgreSQL or Firebase database. Phase 4 — Deployment to Cloudflare Workers with automated CI/CD and Plausible analytics monitoring. Phase 5 — Post-launch support, security patches, and ongoing maintenance. You see progress at every stage with structured feedback checkpoints.',
  },
  {
    q: 'Can you work with my existing Figma designs or brand guidelines?',
    a: 'Yes. If you already have brand guidelines, Figma design files, or an existing website, Rogue Code can build within your constraints. We also offer full UI/UX design services using Figma for clients starting from scratch — delivering wireframes, high-fidelity mockups, and interactive prototypes before a single line of React code is written.',
  },
  {
    q: 'What technologies and frameworks does Rogue Code specialize in?',
    a: 'Rogue Code specializes in React 19, Next.js 15, TypeScript, Tailwind CSS, Node.js, and Python. For AI projects we use LangChain, LangGraph, OpenAI GPT-4, and custom ML models. Mobile apps are built with React Native and Firebase Firestore. Deployment targets Cloudflare Workers, Vercel, or AWS via Docker. Databases include PostgreSQL, Firebase, and Supabase.',
  },
  {
    q: 'Does Rogue Code provide ongoing maintenance and post-launch support?',
    a: 'Yes. Every project includes 30 days of post-launch support for bug fixes and minor adjustments. We offer maintenance retainer packages for security patches, dependency updates (npm, pip), content changes via CMS, feature additions, and performance monitoring through Plausible analytics. Enterprise clients receive a dedicated support team with 4-hour response SLAs.',
  },
  {
    q: 'What happens if I am not satisfied with the final delivery?',
    a: 'Rogue Code works iteratively with milestone-based deliverables and revision rounds included in every package. You provide feedback at every stage — wireframes, Figma design mockups, development preview on a staging URL, and final QA. Every package includes revision rounds to ensure the final product matches your vision. We have never had a client reject a final delivery.',
  },
  {
    q: 'How do I start a project with Rogue Code and get a free proposal?',
    a: 'Book a free discovery call through the button on this page. We discuss your project goals, technical requirements, budget range in INR, and delivery timeline. If we determine Rogue Code is the right fit, we deliver a detailed proposal within 48 hours with full scope, milestone breakdown, payment schedule, and delivery timeline. Zero commitment required for the discovery call.',
  },
]

export default function FAQSection({ isDay = true }) {
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState(null)
  const accent = isDay ? '#E85D3A' : '#FF6B4A'
  const text = isDay ? '#1A1A1A' : '#F2F2F2'
  const muted = isDay ? '#5A4A3A' : '#8A8A8A'
  const bg = isDay ? '#F5F0EB' : '#1A1817'
  const border = isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'
  const cardBg = isDay ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)'

  return (
    <section aria-label="Frequently asked questions" className="px-4 sm:px-6 py-28 md:px-12 relative z-10" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: accent }}>
            {t('faq.eyebrow')}
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: text }}>
            {t('faq.heading')}
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 w-20 mx-auto mt-6 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border overflow-hidden transition-all duration-300"
              style={{
                borderColor: openIndex === i ? accent : border,
                background: cardBg,
                backdropFilter: 'blur(12px)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                style={{ color: text, touchAction: 'manipulation', minHeight: '44px' }}
              >
                <span className="text-sm font-medium leading-relaxed">{faq.q}</span>
                <ChevronDown
                  className="size-4 flex-shrink-0 transition-transform duration-300"
                  style={{
                    color: accent,
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    id={`faq-answer-${i}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-6 pb-5 text-sm leading-relaxed"
                      style={{ color: muted }}
                    >
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
