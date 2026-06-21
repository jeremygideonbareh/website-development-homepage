import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'

const projects = [
  { name: "God's Creatures Pet Groomers", url: 'https://github.com/jeremygideonbareh/Gods-creatures-pet-groomers', tech: 'TypeScript, Next.js, Supabase', category: 'websites', color: '#E85D3A', img: 'https://picsum.photos/seed/gods-creatures/400/280' },
  { name: 'Pet Grooming Website', url: 'https://github.com/jeremygideonbareh/pet-grooming-website-', tech: 'HTML, JavaScript, TypeScript', category: 'websites', color: '#2B7A78', img: 'https://picsum.photos/seed/pet-grooming/400/280' },
  { name: 'Be Kind Bakery', url: 'https://github.com/jeremygideonbareh/be-kind-bakery', tech: 'TypeScript, JavaScript, React', category: 'websites', color: '#E85D3A', img: 'https://picsum.photos/seed/be-kind-bakery/400/280' },
  { name: 'Crumbs Bakery', url: 'https://github.com/jeremygideonbareh/crumbs-bakery-', tech: 'TypeScript, JavaScript, React', category: 'websites', color: '#3B8A88', img: 'https://picsum.photos/seed/crumbs-bakery/400/280' },
  { name: 'Chelsea Man Spa Mobile', url: 'https://github.com/jeremygideonbareh/chelsea-man-spa-mobile', tech: 'JavaScript, Firebase, Google Auth', category: 'mobile', color: '#FF6B4A', img: 'https://picsum.photos/seed/chelsea-spa/400/280' },
  { name: "Kiki's Portfolio", url: 'https://github.com/jeremygideonbareh/kiki-s-portfolio-website', tech: 'TypeScript, React', category: 'websites', color: '#2B7A78', img: 'https://picsum.photos/seed/kiki-portfolio/400/280' },
  { name: 'Gym Website', url: 'https://github.com/jeremygideonbareh/gym_website', tech: 'TypeScript, React, CSS', category: 'websites', color: '#E85D3A', img: 'https://picsum.photos/seed/gym-website/400/280' },
  { name: 'Apple Clone', url: 'https://github.com/jeremygideonbareh/apple-clone-', tech: 'TypeScript, React', category: 'websites', color: '#3B8A88', img: 'https://picsum.photos/seed/apple-clone/400/280' },
  { name: 'Trading Bot', url: 'https://github.com/jeremygideonbareh/trading-bot-', tech: 'Python, TypeScript, Docker', category: 'ai', color: '#FF6B4A', img: 'https://picsum.photos/seed/trading-bot/400/280' },
  { name: 'Support Ticket Agent', url: 'https://github.com/jeremygideonbareh/support-ticket-agent', tech: 'Python, LangChain, LangGraph', category: 'ai', color: '#2B7A78', img: 'https://picsum.photos/seed/support-agent/400/280' },
  { name: 'Virtual Tapes Acoustics', url: 'https://github.com/jeremygideonbareh/virtual-tapes-acoustics', tech: 'HTML, Audio', category: 'websites', color: '#E85D3A', img: 'https://picsum.photos/seed/virtual-tapes/400/280' },
  { name: 'Horizon Labs (this site)', url: 'https://github.com/jeremygideonbareh/website-development-homepage', tech: 'React, Three.js, Framer Motion', category: 'websites', color: '#3B8A88', img: 'https://picsum.photos/seed/horizon-labs/400/280' },
]

const categoryLabels = {
  websites: 'Websites & Apps',
  mobile: 'Mobile Apps',
  ai: 'AI & Automation',
}

const cinematicBg = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80',
  'https://images.unsplash.com/photo-1518173946687-a36f968f7e1e?w=1600&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
]

const fromRight = {
  hidden: { x: 300, opacity: 0 },
  visible: (i) => ({
    x: 0, opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 22, delay: i * 0.1 },
  }),
}

function ProjectCard({ proj, i }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      custom={i}
      variants={fromRight}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="flex-shrink-0 w-[85vw] max-w-xs snap-start"
    >
      <motion.a
        href={proj.url}
        target="_blank"
        rel="noopener noreferrer"
        onViewportEnter={() => setTimeout(() => setLoaded(true), 200 + i * 50)}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className="group block rounded-2xl border overflow-hidden transition-shadow duration-300"
        style={{
          borderColor: 'rgba(0,0,0,0.08)',
          background: '#fff',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}
      >
        <div className="relative h-40 overflow-hidden bg-gray-100">
          {!loaded && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <motion.img
            src={proj.img}
            alt={proj.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div
            className="absolute top-3 right-3 size-2.5 rounded-full"
            style={{ backgroundColor: proj.color }}
          />
        </div>

        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-tight" style={{ color: '#1A1A1A' }}>{proj.name}</h3>
            <ExternalLink className="size-3.5 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: '#5A4A3A' }} />
          </div>
          <p className="mt-1.5 text-xs" style={{ color: '#8A7A6A' }}>{proj.tech}</p>
          <motion.div
            className="mt-3 h-0.5 rounded-full"
            style={{ background: `linear-gradient(to right, ${proj.color}, transparent)`, transformOrigin: 'left' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </motion.a>
    </motion.div>
  )
}

function ScrollableCategory({ label, catProjects, catIdx }) {
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
    const amt = el.clientWidth * 0.7
    el.scrollBy({ left: dir === 'left' ? -amt : amt, behavior: 'smooth' })
  }

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 24, delay: catIdx * 0.15 }}
      className="mb-16"
    >
      <motion.h2
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6 flex items-center gap-3"
        style={{ color: '#1A1A1A' }}
      >
        <span className="w-8 h-0.5 rounded-full" style={{ background: '#E85D3A' }} />
        {label}
      </motion.h2>

      <div className="relative group/track">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full flex items-center justify-center shadow-md"
            style={{ background: '#fff', color: '#1A1A1A' }}
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full flex items-center justify-center shadow-md"
            style={{ background: '#fff', color: '#1A1A1A' }}
          >
            <ChevronRight className="size-4" />
          </button>
        )}

        <div
          ref={trackRef}
          className="AboutTrack flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#E85D3A88 transparent',
            msOverflowStyle: '-ms-autohiding-scrollbar',
          }}
        >
          <style>{`
            .AboutTrack::-webkit-scrollbar { height: 3px; }
            .AboutTrack::-webkit-scrollbar-track { background: transparent; }
            .AboutTrack::-webkit-scrollbar-thumb {
              background: #E85D3A66;
              border-radius: 999px;
            }
          `}</style>
          {catProjects.map((proj, i) => (
            <ProjectCard key={proj.name} proj={proj} i={i} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutUs({ onBack }) {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <div ref={sectionRef} className="min-h-screen pt-24 pb-32 overflow-hidden relative">
      {cinematicBg.map((url, i) => (
        <div
          key={i}
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0, opacity: 0.025 }}
        >
          <img
            src={url}
            alt=""
            className="w-full h-full object-cover"
            style={{ filter: 'blur(4px)' }}
          />
        </div>
      ))}

      <div className="relative px-6 md:px-12 mx-auto max-w-6xl" style={{ zIndex: 1 }}>
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm font-medium mb-12 transition-opacity hover:opacity-70"
          style={{ color: '#E85D3A' }}
        >
          <ArrowLeft className="size-4" />
          Back to home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 22 }}
          className="mb-16"
        >
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm font-medium tracking-widest uppercase mb-4"
            style={{ color: '#E85D3A' }}
          >
            Our work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight"
            style={{ color: '#1A1A1A' }}
          >
            Projects we've built
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-base max-w-2xl"
            style={{ color: '#5A4A3A' }}
          >
            From AI agents to full-stack web apps — each project is built with the same
            precision and care we bring to every client engagement.
          </motion.p>
        </motion.div>

        {Object.entries(categoryLabels).map(([cat, label], catIdx) => {
          const catProjects = projects.filter(p => p.category === cat)
          return (
            <ScrollableCategory
              key={cat}
              label={label}
              catProjects={catProjects}
              catIdx={catIdx}
            />
          )
        })}

        <motion.div
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 80, damping: 24 }}
          className="text-center mt-16 pt-16 border-t"
          style={{ borderColor: 'rgba(0,0,0,0.08)' }}
        >
          <p className="text-sm" style={{ color: '#5A4A3A' }}>
            Want to see what we can build for you?{' '}
            <button onClick={onBack} className="font-medium underline underline-offset-4" style={{ color: '#E85D3A' }}>
              Let's talk
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
