'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO, Nexus Technologies',
    quote: 'They didn\'t just build a website — they engineered a digital experience that fundamentally changed how our customers perceive our brand. The attention to detail is obsessive in the best way.',
    rating: 5,
    initial: 'S',
    color: '#dc5000',
  },
  {
    name: 'Marcus Rivera',
    role: 'Founder, Verdant Market',
    quote: 'Three weeks from concept to launch. The speed was impressive, but the quality was what stunned us. Our conversion rate jumped 40% in the first month.',
    rating: 5,
    initial: 'M',
    color: '#15846e',
  },
  {
    name: 'Elena Kowalski',
    role: 'CTO, Pulse Analytics',
    quote: 'We\'ve worked with dozens of agencies. This was the first time a team delivered exactly what they promised — on time, on budget, and frankly, better than we imagined.',
    rating: 5,
    initial: 'E',
    color: '#8052ff',
  },
  {
    name: 'James Okonkwo',
    role: 'Design Director, Prism Studio',
    quote: 'The 3D webGL work they delivered for our agency site still gets comments from clients months later. It\'s not just code — it\'s craft.',
    rating: 5,
    initial: 'J',
    color: '#ffb829',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent(p => (p + 1) % testimonials.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="px-6 lg:px-12 py-32" style={{ backgroundColor: '#100904' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-widest mb-6"
          style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
        >
          TESTIMONIALS — 06
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-3xl lg:text-5xl font-medium mb-16"
          style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", lineHeight: 0.9 }}
        >
          What Clients Say
        </motion.h2>

        <div className="relative min-h-[280px] lg:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 items-start"
            >
              <div className="flex items-start gap-4 lg:flex-col lg:gap-3">
                <div
                  className="w-12 h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center text-base lg:text-xl font-medium flex-shrink-0"
                  style={{ backgroundColor: testimonials[current].color, color: '#ffedd7' }}
                >
                  {testimonials[current].initial}
                </div>
                <div>
                  <div
                    className="font-medium text-sm"
                    style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                  >
                    {testimonials[current].name}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                  >
                    {testimonials[current].role}
                  </div>
                  <div className="flex gap-0.5 mt-2">
                    {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill={testimonials[current].color}>
                        <path d="M6 0L7.35 4.05H11.5L8.15 6.75L9.5 10.8L6 8.1L2.5 10.8L3.85 6.75L0.5 4.05H4.65L6 0Z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <svg className="mb-4" width="24" height="18" viewBox="0 0 24 18" fill="none" style={{ opacity: 0.3 }}>
                  <path d="M7.5 18H0L4.5 9V0H12V9L7.5 18ZM19.5 18H12L16.5 9V0H24V9L19.5 18Z" fill="#dc5000" />
                </svg>
                <p
                  className="text-lg lg:text-xl leading-relaxed"
                  style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", fontWeight: 400, fontStyle: 'italic', lineHeight: 1.5 }}
                >
                  "{testimonials[current].quote}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-3 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="h-1.5 rounded-full transition-all duration-500"
              style={{
                width: i === current ? '32px' : '8px',
                backgroundColor: i === current ? '#dc5000' : '#40372e',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
