import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How long does it take to build a website?',
    a: 'Most projects ship within 2-4 weeks. A standard 5-page website takes 2-3 weeks, while custom web apps or AI integrations typically take 4-8 weeks depending on complexity. We\'ll give you a precise timeline during the discovery call.',
  },
  {
    q: 'What does the process look like from start to finish?',
    a: 'We follow a proven 5-step process: Discovery (understanding your goals), Design (wireframes and mockups), Development (building your product), Deployment (launch and testing), and Support (post-launch maintenance). You\'re involved at every stage.',
  },
  {
    q: 'Do you work with existing designs or brands?',
    a: 'Absolutely. If you already have brand guidelines, design files, or an existing site, we can work within those constraints. We also offer full UI/UX design services if you\'re starting from scratch.',
  },
  {
    q: 'What technologies do you use?',
    a: 'We specialize in React, Next.js, TypeScript, Tailwind CSS, Node.js, and Python. For AI projects we use LangChain, LangGraph, OpenAI, and custom ML models. For mobile apps we use React Native and Firebase. We choose the best tech stack for each project.',
  },
  {
    q: 'Do you provide ongoing maintenance and support?',
    a: 'Yes. All plans include post-launch support. We offer maintenance retainer packages for ongoing updates, security patches, content changes, and feature additions. Enterprise clients get a dedicated team for continuous support.',
  },
  {
    q: 'What if I\'m not satisfied with the result?',
    a: 'We work iteratively — you see progress at every stage and provide feedback. Our packages include revision rounds to ensure the final product matches your vision. We\'re not happy until you\'re happy.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a free discovery call using the button on this page. We\'ll discuss your project, goals, budget, and timeline. If we\'re a good fit, we\'ll put together a proposal within 48 hours. No commitment required.',
  },
]

export default function FAQSection({ isDay = true }) {
  const [openIndex, setOpenIndex] = useState(null)
  const accent = isDay ? '#E85D3A' : '#FF6B4A'
  const text = isDay ? '#1A1A1A' : '#F2F2F2'
  const muted = isDay ? '#5A4A3A' : '#8A8A8A'
  const bg = isDay ? '#F5F0EB' : '#1A1817'
  const border = isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'
  const cardBg = isDay ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)'

  return (
    <section className="px-4 sm:px-6 py-28 md:px-12 relative z-10" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: accent }}>
            Questions?
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: text }}>
            Frequently Asked Questions
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
