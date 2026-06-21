'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: number
  title: string
  category: string
  tags: string[]
  gradient: string
  height: string
  description: string
}

const projects: Project[] = [
  { id: 1, title: 'Nexus Dashboard', category: 'Web Apps', tags: ['React', 'Three.js', 'Node'], gradient: 'from-indigo-900 via-purple-900 to-slate-900', height: 'h-72', description: 'Real-time analytics dashboard with 3D data visualizations and live streaming metrics for enterprise operations.' },
  { id: 2, title: 'Verdant E-Commerce', category: 'E-Commerce', tags: ['Next.js', 'Stripe', 'Tailwind'], gradient: 'from-emerald-900 via-teal-800 to-cyan-900', height: 'h-96', description: 'Sustainable marketplace platform with carbon footprint tracking, one-click checkout, and AI-powered recommendations.' },
  { id: 3, title: 'Orion Space Agency', category: 'Websites', tags: ['Three.js', 'GSAP', 'Framer'], gradient: 'from-blue-900 via-indigo-800 to-violet-900', height: 'h-80', description: 'Immersive space exploration website with real-time 3D celestial body rendering and scroll-based storytelling.' },
  { id: 4, title: 'Pulse Analytics', category: 'SaaS', tags: ['React', 'D3.js', 'Supabase'], gradient: 'from-rose-900 via-pink-800 to-red-900', height: 'h-64', description: 'Business intelligence platform with interactive charts, custom dashboards, and collaborative reporting tools.' },
  { id: 5, title: 'Craft Portfolio', category: 'Websites', tags: ['Next.js', 'Framer', 'MDX'], gradient: 'from-amber-900 via-orange-800 to-yellow-900', height: 'h-72', description: 'Minimalist portfolio system for creative professionals with dynamic project pages and CMS integration.' },
  { id: 6, title: 'Flow CRM', category: 'Web Apps', tags: ['React', 'Node', 'Postgres'], gradient: 'from-teal-900 via-cyan-800 to-sky-900', height: 'h-96', description: 'Modern customer relationship platform with Kanban boards, pipeline automation, and real-time team collaboration.' },
  { id: 7, title: 'Bloom Beauty', category: 'E-Commerce', tags: ['Shopify', 'React', 'Tailwind'], gradient: 'from-pink-900 via-rose-800 to-fuchsia-900', height: 'h-80', description: 'Luxury beauty storefront with virtual try-on, personalized skincare quizzes, and subscription management.' },
  { id: 8, title: 'Atlas Travel', category: 'Websites', tags: ['Next.js', 'Mapbox', 'GSAP'], gradient: 'from-sky-900 via-blue-800 to-indigo-900', height: 'h-64', description: 'Travel discovery platform with interactive 3D globe, itinerary builder, and curated destination guides.' },
  { id: 9, title: 'Kernel DevOps', category: 'SaaS', tags: ['React', 'Docker', 'Kubernetes'], gradient: 'from-slate-800 via-gray-900 to-zinc-900', height: 'h-72', description: 'Infrastructure management console with container orchestration, CI/CD pipelines, and real-time monitoring.' },
  { id: 10, title: 'Prism Agency', category: 'Websites', tags: ['React', 'Three.js', 'GSAP'], gradient: 'from-violet-900 via-purple-800 to-fuchsia-900', height: 'h-96', description: 'Agency showcase with WebGL interactive backgrounds, case study carousels, and animated typography.' },
  { id: 11, title: 'Harvest Market', category: 'E-Commerce', tags: ['Next.js', 'Stripe', 'Sanity'], gradient: 'from-lime-900 via-green-800 to-emerald-900', height: 'h-80', description: 'Farm-to-table marketplace connecting local producers with consumers through real-time inventory and delivery tracking.' },
  { id: 12, title: 'Sentinel AI', category: 'SaaS', tags: ['React', 'Python', 'TensorFlow'], gradient: 'from-red-900 via-rose-800 to-orange-900', height: 'h-64', description: 'AI-powered threat detection platform with real-time monitoring, automated response, and predictive analytics.' },
]

const categories = ['All', 'Websites', 'Web Apps', 'E-Commerce', 'SaaS']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
}

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <section style={{ backgroundColor: '#100904' }} className="px-6 lg:px-12 py-32">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs tracking-widest mb-6"
          style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
        >
          PORTFOLIO — 05
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-3xl lg:text-5xl font-medium mb-4"
          style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", lineHeight: 0.9 }}
        >
          Our Work
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="text-sm mb-12 max-w-md"
          style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
        >
          Each project is a fusion of art and engineering — crafted with obsessive attention to every detail.
        </motion.p>

        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-5 py-2 text-xs tracking-wider transition-colors duration-300"
              style={{
                color: activeCategory === cat ? '#ffedd7' : '#6c5f51',
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
              }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-2 right-2 h-0.5"
                  style={{ backgroundColor: '#dc5000' }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="columns-2 lg:columns-3 gap-4 lg:gap-6 space-y-4 lg:space-y-6"
        >
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              variants={cardVariants}
              className={`break-inside-avoid cursor-pointer group relative overflow-hidden rounded-sm ${project.height}`}
              style={{ backgroundColor: '#1a1a1a' }}
              onClick={() => setSelected(project)}
            >
              <div className={`w-full h-full bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-105`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                <span
                  className="inline-block px-2 py-0.5 text-[10px] tracking-wider rounded-sm mb-2"
                  style={{ backgroundColor: '#dc5000', color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                >
                  {project.category}
                </span>
                <h3
                  className="text-base lg:text-lg font-medium"
                  style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", lineHeight: 1.1 }}
                >
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[9px] px-1.5 py-0.5 rounded-sm"
                      style={{ backgroundColor: 'rgba(255,237,215,0.1)', color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="#ffedd7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8"
            style={{ backgroundColor: 'rgba(16,9,4,0.95)', backdropFilter: 'blur(24px)' }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              layoutId={`card-${selected.id}`}
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              style={{ backgroundColor: '#100904' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-full h-64 lg:h-80 bg-gradient-to-br ${selected.gradient} relative`}>
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffedd7' }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="p-6 lg:p-8">
                <span
                  className="inline-block px-2 py-0.5 text-[10px] tracking-wider rounded-sm mb-3"
                  style={{ backgroundColor: '#dc5000', color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                >
                  {selected.category}
                </span>
                <h2
                  className="text-2xl lg:text-3xl font-medium mb-4"
                  style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", lineHeight: 1.1 }}
                >
                  {selected.title}
                </h2>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                >
                  {selected.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selected.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-sm"
                      style={{ backgroundColor: 'rgba(220,80,0,0.15)', color: '#dc5000', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 text-sm tracking-wider rounded-sm transition-colors duration-200"
                  style={{ backgroundColor: '#dc5000', color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                  onClick={() => window.open('#', '_blank')}
                >
                  VIEW LIVE PROJECT
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
