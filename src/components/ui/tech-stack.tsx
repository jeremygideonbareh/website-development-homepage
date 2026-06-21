'use client'
import { motion } from 'framer-motion'

const techs = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Three.js', icon: '◈' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Node.js', icon: '●' },
  { name: 'PostgreSQL', icon: '▚' },
  { name: 'Tailwind', icon: '♢' },
  { name: 'Framer', icon: '⌘' },
  { name: 'GSAP', icon: '▶' },
  { name: 'Docker', icon: '▣' },
  { name: 'GraphQL', icon: '◉' },
  { name: 'WebGL', icon: '◈' },
  { name: 'Python', icon: '▸' },
  { name: 'Supabase', icon: '△' },
  { name: 'Stripe', icon: '▤' },
  { name: 'Vercel', icon: '▽' },
  { name: 'Redis', icon: '⬡' },
  { name: 'AWS', icon: '▥' },
]

export default function TechStack() {
  return (
    <section className="px-6 lg:px-12 py-32 overflow-hidden" style={{ backgroundColor: '#100904' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-widest mb-6"
          style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
        >
          TECHNOLOGY — 07
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-3xl lg:text-5xl font-medium mb-4"
          style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", lineHeight: 0.9 }}
        >
          Our Stack
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="text-sm mb-16 max-w-md"
          style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
        >
          Modern tools for modern problems. We choose technology that prioritizes performance, developer experience, and scalability.
        </motion.p>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-sm cursor-default group"
              style={{ backgroundColor: 'rgba(255,237,215,0.03)' }}
            >
              <span className="text-xl lg:text-2xl" style={{ color: '#dc5000' }}>{tech.icon}</span>
              <span
                className="text-[10px] tracking-wider text-center"
                style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffedd7'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#6c5f51'}
              >
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
