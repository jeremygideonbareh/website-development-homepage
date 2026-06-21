import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, ArrowLeft, ChevronLeft, ChevronRight, Code, Zap, Cpu, Shield } from 'lucide-react'
import { WordReveal, CharReveal, SectionEyebrow, KineticText } from './RevealText'

const projects = [
  { name: "God's Creatures Pet Groomers", url: 'https://github.com/jeremygideonbareh/Gods-creatures-pet-groomers', tech: 'TypeScript, Next.js, Supabase', category: 'websites', color: '#FF6B4A', img: 'https://picsum.photos/seed/gods-creatures/400/280' },
  { name: 'Pet Grooming Website', url: 'https://github.com/jeremygideonbareh/pet-grooming-website-', tech: 'HTML, JavaScript, TypeScript', category: 'websites', color: '#2B7A78', img: 'https://picsum.photos/seed/pet-grooming/400/280' },
  { name: 'Be Kind Bakery', url: 'https://github.com/jeremygideonbareh/be-kind-bakery', tech: 'TypeScript, JavaScript, React', category: 'websites', color: '#FF6B4A', img: 'https://picsum.photos/seed/be-kind-bakery/400/280' },
  { name: 'Crumbs Bakery', url: 'https://github.com/jeremygideonbareh/crumbs-bakery-', tech: 'TypeScript, JavaScript, React', category: 'websites', color: '#3B8A88', img: 'https://picsum.photos/seed/crumbs-bakery/400/280' },
  { name: 'Chelsea Man Spa Mobile', url: 'https://github.com/jeremygideonbareh/chelsea-man-spa-mobile', tech: 'JavaScript, Firebase, Google Auth', category: 'mobile', color: '#FF6B4A', img: 'https://picsum.photos/seed/chelsea-spa/400/280' },
  { name: "Kiki's Portfolio", url: 'https://github.com/jeremygideonbareh/kiki-s-portfolio-website', tech: 'TypeScript, React', category: 'websites', color: '#2B7A78', img: 'https://picsum.photos/seed/kiki-portfolio/400/280' },
  { name: 'Gym Website', url: 'https://github.com/jeremygideonbareh/gym_website', tech: 'TypeScript, React, CSS', category: 'websites', color: '#FF6B4A', img: 'https://picsum.photos/seed/gym-website/400/280' },
  { name: 'Apple Clone', url: 'https://github.com/jeremygideonbareh/apple-clone-', tech: 'TypeScript, React', category: 'websites', color: '#3B8A88', img: 'https://picsum.photos/seed/apple-clone/400/280' },
  { name: 'Trading Bot', url: 'https://github.com/jeremygideonbareh/trading-bot-', tech: 'Python, TypeScript, Docker', category: 'ai', color: '#FF6B4A', img: 'https://picsum.photos/seed/trading-bot/400/280' },
  { name: 'Support Ticket Agent', url: 'https://github.com/jeremygideonbareh/support-ticket-agent', tech: 'Python, LangChain, LangGraph', category: 'ai', color: '#2B7A78', img: 'https://picsum.photos/seed/support-agent/400/280' },
  { name: 'Virtual Tapes Acoustics', url: 'https://github.com/jeremygideonbareh/virtual-tapes-acoustics', tech: 'HTML, Audio', category: 'websites', color: '#FF6B4A', img: 'https://picsum.photos/seed/virtual-tapes/400/280' },
  { name: 'Horizon Labs (this site)', url: 'https://github.com/jeremygideonbareh/website-development-homepage', tech: 'React, Three.js, Framer Motion', category: 'websites', color: '#3B8A88', img: 'https://picsum.photos/seed/horizon-labs/400/280' },
]

const categoryLabels = {
  websites: 'Websites & Apps',
  mobile: 'Mobile Apps',
  ai: 'AI & Automation',
}

const values = [
  { icon: Code, title: 'Custom from scratch', desc: 'Every site is hand-engineered — no themes, no page builders, no compromises. Your brand deserves code written for it, not retrofitted to it.' },
  { icon: Zap, title: 'Speed without sacrifice', desc: 'AI-native workflows let us ship in weeks what takes other agencies months. Production-grade code, delivered fast.' },
  { icon: Cpu, title: 'AI-powered engineering', desc: 'We combine human creativity with AI to build smarter, test faster, and iterate in real time. The result: better quality at half the cost.' },
  { icon: Shield, title: 'Total ownership', desc: 'You get the code. Every line. No lock-in, no black boxes, no recurring license fees. Your digital asset, yours forever.' },
]

const teamData = [
  { initials: 'JG', name: 'Jeremy Gideon Bareh', role: 'Founder & Lead Developer', bio: 'Architects the technical vision. Full-stack engineer with a passion for motion, performance, and pixel-perfect execution.' },
  { initials: 'HL', name: 'Horizon Labs', role: 'Design & Engineering', bio: 'A collective of designers, developers, and AI specialists who ship products that push the boundaries of what the web can do.' },
]

const cinematicBg = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600&q=80',
  'https://images.unsplash.com/photo-1518173946687-a36f968f7e1e?w=1600&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
]

const blogDecoImages = [
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
]

const themes = {
  night: {
    bg: '#1A1817',
    surface: '#222020',
    surface2: '#101010',
    text: '#F2F2F2',
    muted: '#B0B0B0',
    dim: '#8A8A8A',
    accent: '#FF6B4A',
    border: 'rgba(255,255,255,0.08)',
    cardBg: 'rgba(255,255,255,0.04)',
    cardHover: 'rgba(255,255,255,0.07)',
    glassBg: 'rgba(255,255,255,0.03)',
    glassBorder: 'rgba(255,255,255,0.06)',
    heroOverlay: 'rgba(26,24,23,0.3)',
    eyebrow: '#FF6B4A',
  },
  day: {
    bg: '#F5F0EB',
    surface: '#FFFFFF',
    surface2: '#EEE8E0',
    text: '#1A1A1A',
    muted: '#5A4A3A',
    dim: '#8A7A6A',
    accent: '#E85D3A',
    border: 'rgba(0,0,0,0.08)',
    cardBg: 'rgba(255,255,255,0.7)',
    cardHover: 'rgba(255,255,255,0.85)',
    glassBg: 'rgba(255,255,255,0.5)',
    glassBorder: 'rgba(0,0,0,0.06)',
    heroOverlay: 'rgba(245,240,235,0.2)',
    eyebrow: '#E85D3A',
  },
}

function Counter({ from = 0, to, suffix = '', label, p }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const steps = 30
    let current = 0
    const increment = (to - from) / steps
    const interval = setInterval(() => {
      current += increment
      if (current >= to) {
        setDisplay(String(to))
        clearInterval(interval)
      } else {
        setDisplay(String(Math.floor(current)))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [isInView, from, to])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: p.text }}>
        {display}{suffix}
      </div>
      <div className="mt-2 text-sm tracking-wide" style={{ color: p.dim }}>{label}</div>
    </div>
  )
}

function ProjectCard({ proj, i, p }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      custom={i}
      initial={{ x: 200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 22, delay: i * 0.08 }}
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
          borderColor: p.glassBorder,
          background: p.cardBg,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="relative h-40 overflow-hidden" style={{ background: p.surface2 }}>
          {!loaded && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${p.text}08 50%, transparent 100%)`,
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div
            className="absolute top-3 right-3 size-2.5 rounded-full"
            style={{ backgroundColor: proj.color }}
          />
        </div>

        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-tight" style={{ color: p.text }}>{proj.name}</h3>
            <ExternalLink className="size-3.5 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: p.dim }} />
          </div>
          <p className="mt-1.5 text-xs" style={{ color: p.dim }}>{proj.tech}</p>
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

function ScrollableCategory({ label, catProjects, catIdx, p }) {
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
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: catIdx * 0.15 }}
      className="mb-16"
    >
      <motion.h2
        initial={{ x: -20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6 flex items-center gap-3"
        style={{ color: p.text }}
      >
        <span className="w-8 h-0.5 rounded-full" style={{ background: p.accent }} />
        {label}
      </motion.h2>

      <div className="relative group/track">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: p.surface, color: p.text, border: `1px solid ${p.border}` }}
          >
            <ChevronLeft className="size-4" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: p.surface, color: p.text, border: `1px solid ${p.border}` }}
          >
            <ChevronRight className="size-4" />
          </button>
        )}

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: `${p.accent}66 transparent`,
            msOverflowStyle: '-ms-autohiding-scrollbar',
          }}
        >
          <style>{`
            .AboutTrack::-webkit-scrollbar { height: 3px; }
            .AboutTrack::-webkit-scrollbar-track { background: transparent; }
            .AboutTrack::-webkit-scrollbar-thumb {
              background: ${p.accent}66;
              border-radius: 999px;
            }
          `}</style>
          {catProjects.map((proj, i) => (
            <ProjectCard key={proj.name} proj={proj} i={i} p={p} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutUs({ onBack, theme = 'night' }) {
  const p = themes[theme] ?? themes.night
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const statsRef = useRef(null)

  return (
    <div ref={sectionRef} className="min-h-screen pt-24 pb-32 overflow-hidden relative" style={{ backgroundColor: p.bg }}>
      {cinematicBg.map((url, i) => (
        <motion.div
          key={i}
          className="fixed inset-0 pointer-events-none"
          style={{ y: bgY, zIndex: 0, opacity: theme === 'night' ? 0.03 : 0.025 }}
        >
          <img src={url} alt="" className="w-full h-full object-cover" style={{ filter: 'blur(6px)' }} />
        </motion.div>
      ))}

      <div className="relative px-6 md:px-12 mx-auto max-w-6xl" style={{ zIndex: 1 }}>

        {/* Back button */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm font-medium mb-16 transition-opacity hover:opacity-70"
          style={{ color: p.accent }}
        >
          <ArrowLeft className="size-4" />
          Back to home
        </motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-24 max-w-4xl"
        >
          <SectionEyebrow delay={0.1} color={p.eyebrow}>About Horizon Labs</SectionEyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mt-6" style={{ color: p.text }}>
            <KineticText mode="spring" delay={0.2}>
              We build the web that templates can't.
            </KineticText>
          </h1>
          <p className="mt-6 text-base sm:text-lg max-w-2xl leading-relaxed" style={{ color: p.muted }}>
            <KineticText mode="wave" delay={0.6}>
              Every brand is unique. Your website should be too. We engineer custom digital experiences from the ground up — no themes, no page builders, no compromises.
            </KineticText>
          </p>
        </motion.div>

        {/* Mission & Story */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="mb-28"
        >
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <SectionEyebrow delay={0.1} color={p.eyebrow}>Our Philosophy</SectionEyebrow>
              <h2 className="text-3xl sm:text-4xl font-bold mt-6 leading-tight" style={{ color: p.text }}>
                <KineticText mode="wave" delay={0.2}>
                  Speed without sacrifice.
                </KineticText>
              </h2>
            </div>
            <div className="space-y-6 pt-2">
              <p className="text-base leading-relaxed" style={{ color: p.muted }}>
                <WordReveal delay={0.4}>
                  We combine AI-native workflows with hand-crafted engineering to ship in weeks what takes other agencies months. 
                  The result: production-grade code that you own, forever.
                </WordReveal>
              </p>
              <p className="text-base leading-relaxed" style={{ color: p.muted }}>
                <WordReveal delay={0.6}>
                  From concept to deployment, we handle everything — design, engineering, animation, optimization, and launch. 
                  One point of contact. Zero overhead.
                </WordReveal>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-28 rounded-2xl border p-10 md:p-14"
          style={{
            borderColor: p.glassBorder,
            background: p.glassBg,
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <Counter from={0} to={50} suffix="+" label="Projects Delivered" p={p} />
            <Counter from={0} to={3} suffix="x" label="Faster Than In-House" p={p} />
            <Counter from={0} to={100} suffix="%" label="Code Ownership" p={p} />
            <Counter from={0} to={24} suffix="/7" label="Support & Monitoring" p={p} />
          </div>
        </motion.div>

        {/* Values */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <SectionEyebrow color={p.eyebrow}>How we build</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="wave" delay={0.1}>Our principles</KineticText>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border p-6 transition-colors"
                style={{
                  borderColor: p.glassBorder,
                  background: p.cardBg,
                }}
              >
                <div
                  className="size-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${p.accent}15` }}
                >
                  <v.icon className="size-5" style={{ color: p.accent }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: p.text }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: p.muted }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <SectionEyebrow color={p.eyebrow}>Who we are</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="wave" delay={0.1}>Meet the team</KineticText>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {teamData.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border p-6 flex gap-5 items-start"
                style={{
                  borderColor: p.glassBorder,
                  background: p.cardBg,
                }}
              >
                <div
                  className="size-14 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold tracking-wider"
                  style={{
                    background: `linear-gradient(135deg, ${p.accent}, ${p.accent}88)`,
                    color: '#FFFFFF',
                  }}
                >
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-lg font-semibold" style={{ color: p.text }}>{member.name}</h3>
                  <p className="text-sm mt-0.5" style={{ color: p.accent }}>{member.role}</p>
                  <p className="text-sm mt-2 leading-relaxed" style={{ color: p.muted }}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Blog: Our Story */}
        <section className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <SectionEyebrow color={p.eyebrow}>The story</SectionEyebrow>
            <p className="text-xs tracking-widest uppercase mt-4" style={{ color: p.dim }}>
              Horizon Labs &mdash; Founded 2024
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 leading-tight" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>
                Starting from a single laptop.
              </KineticText>
            </h2>
          </motion.div>

          <div className="max-w-none space-y-10">
            {/* Paragraph 1 with drop cap */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="text-base md:text-lg leading-relaxed"
              style={{ color: p.muted }}
            >
              <span
                className="float-left text-6xl md:text-7xl font-bold leading-none mr-4 mt-1"
                style={{ color: p.accent }}
              >
                E
              </span>
              <WordReveal delay={0.2}>
                very pixel we ship is guided by a single principle: your brand deserves code that is written for it, not retrofitted to it. No themes. No page builders. No compromises. What started as a belief that the web could offer more than cookie-cutter templates became the founding ethos of Horizon Labs.
              </WordReveal>
            </motion.div>

            {/* Image + Text row 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="grid md:grid-cols-2 gap-8 md:gap-14 items-center"
            >
              <div className="rounded-xl overflow-hidden">
                <img
                  src={blogDecoImages[0]}
                  alt="Workspace setup"
                  className="w-full h-64 md:h-80 object-cover"
                  style={{ filter: theme === 'night' ? 'brightness(0.8)' : 'none' }}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: p.text }}>
                  <KineticText mode="wave" delay={0.1}>It started with a choice.</KineticText>
                </h3>
                <p className="text-base leading-relaxed" style={{ color: p.muted }}>
                  <WordReveal delay={0.2}>
                    One laptop. A conviction that templates were a compromise. And a decision to prove that custom engineering could be faster, more affordable, and undeniably better. That first project led to another, and another. Word spread. The stack grew. But the principle never changed.
                  </WordReveal>
                </p>
              </div>
            </motion.div>

            {/* Pull quote */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="py-10 md:py-14 px-4 text-center border-y"
              style={{ borderColor: p.glassBorder }}
            >
              <p className="text-xl md:text-2xl lg:text-3xl font-bold italic leading-snug max-w-3xl mx-auto" style={{ color: p.text }}>
                &ldquo;We believe the web deserves better than templates.&rdquo;
              </p>
              <p className="mt-4 text-sm" style={{ color: p.dim }}>&mdash; Jeremy Gideon Bareh</p>
            </motion.div>

            {/* Image + Text row 2 (reversed) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="grid md:grid-cols-2 gap-8 md:gap-14 items-center"
            >
              <div className="order-2 md:order-1">
                <h3 className="text-xl font-bold mb-4" style={{ color: p.text }}>
                  <KineticText mode="wave" delay={0.1}>From freelance to full studio.</KineticText>
                </h3>
                <p className="text-base leading-relaxed" style={{ color: p.muted }}>
                  <WordReveal delay={0.2}>
                    Today Horizon Labs is a lean, AI-augmented studio that ships production-grade web experiences for clients around the world. We still own every line of code we write. We still reject shortcuts that sacrifice quality. And we still believe that the best digital experiences are the ones that feel unmistakably human.
                  </WordReveal>
                </p>
              </div>
              <div className="rounded-xl overflow-hidden order-1 md:order-2">
                <img
                  src={blogDecoImages[1]}
                  alt="Team collaboration"
                  className="w-full h-64 md:h-80 object-cover"
                  style={{ filter: theme === 'night' ? 'brightness(0.8)' : 'none' }}
                />
              </div>
            </motion.div>

            {/* Closing paragraph */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
              className="pt-6"
            >
              <p className="text-base md:text-lg leading-relaxed" style={{ color: p.muted }}>
                <WordReveal delay={0.2}>
                  The web is still evolving. And as long as there are brands that refuse to settle for &ldquo;good enough,&rdquo; we will be here building what comes next.
                </WordReveal>
              </p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 font-semibold"
                style={{ color: p.text }}
              >
                — Horizon Labs
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Project Showcase */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <SectionEyebrow color={p.eyebrow}>Our work</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>Projects we&apos;ve built</KineticText>
            </h2>
            <p className="mt-4 text-base max-w-2xl" style={{ color: p.muted }}>
              <WordReveal delay={0.3}>
                From AI agents to full-stack web apps — each project is built with the same precision and care we bring to every client engagement.
              </WordReveal>
            </p>
          </motion.div>

          {Object.entries(categoryLabels).map(([cat, label], catIdx) => {
            const catProjects = projects.filter(p => p.category === cat)
            return (
              <ScrollableCategory
                key={cat}
                label={label}
                catProjects={catProjects}
                catIdx={catIdx}
                p={p}
              />
            )
          })}
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center pt-16 border-t"
          style={{ borderColor: p.glassBorder }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: p.text }}>
            <KineticText mode="spring" delay={0.1}>
              Ready to build something that actually works?
            </KineticText>
          </h2>
          <p className="mt-4 text-base" style={{ color: p.muted }}>
            Stop burning time on agencies that over-promise and under-deliver.
          </p>
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8 px-8 py-3.5 text-base font-semibold rounded-full transition-colors inline-flex items-center gap-2"
            style={{
              backgroundColor: p.accent,
              color: '#FFFFFF',
            }}
          >
            Let&apos;s talk
            <ArrowLeft className="size-4 rotate-180" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
