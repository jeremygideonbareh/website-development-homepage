import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ExternalLink, ArrowLeft, ChevronLeft, ChevronRight, Code, Zap, Cpu, Shield, Sparkles } from 'lucide-react'
import { WordReveal, CharReveal, SectionEyebrow, KineticText } from './RevealText'
import GalleryPhoto, { GalleryFrame } from './GalleryPhoto'
import HorizontalScrollSection from './HorizontalScrollSection'

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
  { name: 'Rogue Code (this site)', url: 'https://github.com/jeremygideonbareh/website-development-homepage', tech: 'React, Three.js, Framer Motion', category: 'websites', color: '#3B8A88', img: 'https://picsum.photos/seed/rogue-code/400/280' },
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
  { initials: 'JG', name: 'Jeremy Gideon Bareh', role: 'Founder & Lead Developer', bio: 'Full-stack engineer and spatial design specialist. Builds premium web experiences with React, Three.js, and AI-native workflows. Every line of code is crafted — never templated.' },
  { initials: 'RC', name: 'Rogue Code', role: 'Design & Engineering', bio: 'A lean, AI-augmented studio that ships production-grade websites and applications for clients around the world. Custom code, full ownership, zero compromise.' },
]

const galleryPhotos = [
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=85',
  'https://images.unsplash.com/photo-1518173946687-a36f968f7e1e?w=800&q=85',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=85',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=85',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=85',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=85',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=85',
]

const themes = {
  night: {
    bg: '#101010', surface: '#1A1A1A', surface2: '#0A0A0A',
    text: '#f3f3f3', muted: '#949494', dim: '#5a5a5a',
    accent: '#e7c59a', border: 'rgba(255,255,255,0.06)',
    cardBg: 'rgba(255,255,255,0.03)', glassBorder: 'rgba(255,255,255,0.06)',
    glassBg: 'rgba(255,255,255,0.02)', eyebrow: '#e7c59a',
  },
  day: {
    bg: '#F5F0EB', surface: '#FFFFFF', surface2: '#EEE8E0',
    text: '#1A1A1A', muted: '#5A4A3A', dim: '#8A7A6A',
    accent: '#E85D3A', border: 'rgba(0,0,0,0.08)',
    cardBg: 'rgba(255,255,255,0.7)', glassBorder: 'rgba(0,0,0,0.06)',
    glassBg: 'rgba(255,255,255,0.5)', eyebrow: '#E85D3A',
  },
}

function Counter({ from = 0, to, suffix = '', label, p }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!isInView) return
    const steps = 30
    let current = 0
    const increment = (to - from) / steps
    const interval = setInterval(() => {
      current += increment
      if (current >= to) {
        setDisplay(String(to))
        clearInterval(interval)
      } else setDisplay(String(Math.floor(current)))
    }, 1500 / steps)
    return () => clearInterval(interval)
  }, [isInView, from, to])
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: p.text }}>{display}{suffix}</div>
      <div className="mt-2 text-sm tracking-wide" style={{ color: p.dim }}>{label}</div>
    </div>
  )
}

function ProjectCard({ proj, i, p }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <motion.div
      initial={{ x: 200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 22, delay: i * 0.08 }}
      className="flex-shrink-0 w-[85vw] max-w-xs snap-start"
    >
      <motion.a
        href={proj.url} target="_blank" rel="noopener noreferrer"
        onViewportEnter={() => setTimeout(() => setLoaded(true), 200 + i * 50)}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className="group block rounded-2xl border overflow-hidden transition-shadow duration-300"
        style={{ borderColor: p.glassBorder, background: p.cardBg, backdropFilter: 'blur(8px)' }}
      >
        <div className="relative h-40 overflow-hidden" style={{ background: p.surface2 }}>
          {!loaded && (
            <motion.div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent 0%, ${p.text}08 50%, transparent 100%)` }}
              animate={{ x: ['-100%', '100%'] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }} />
          )}
          <motion.img src={proj.img} alt={proj.name} className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }} animate={loaded ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6 }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 right-3 size-2.5 rounded-full" style={{ backgroundColor: proj.color }} />
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-tight" style={{ color: p.text }}>{proj.name}</h3>
            <ExternalLink className="size-3.5 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: p.dim }} />
          </div>
          <p className="mt-1.5 text-xs" style={{ color: p.dim }}>{proj.tech}</p>
          <motion.div className="mt-3 h-0.5 rounded-full" style={{ background: `linear-gradient(to right, ${proj.color}, transparent)`, transformOrigin: 'left' }}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} />
        </div>
      </motion.a>
    </motion.div>
  )
}

function ScrollableCategory({ label, catProjects, catIdx, p }) {
  const trackRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
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
    el.scrollBy({ left: dir === 'left' ? -el.clientWidth * 0.7 : el.clientWidth * 0.7, behavior: 'smooth' })
  }
  return (
    <motion.div initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay: catIdx * 0.15 }} className="mb-16">
      <motion.h2 initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: p.text }}>
        <span className="w-8 h-0.5 rounded-full" style={{ background: p.accent }} />{label}
      </motion.h2>
      <div className="relative group/track">
        {canScrollLeft && (
          <button onClick={() => scroll('left')} className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: p.surface, color: p.text, border: `1px solid ${p.border}` }}><ChevronLeft className="size-4" /></button>
        )}
        {canScrollRight && (
          <button onClick={() => scroll('right')} className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 size-9 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: p.surface, color: p.text, border: `1px solid ${p.border}` }}><ChevronRight className="size-4" /></button>
        )}
        <div ref={trackRef} className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
          style={{ scrollbarWidth: 'thin', scrollbarColor: `${p.accent}66 transparent` }}>
          {catProjects.map((proj, i) => (<ProjectCard key={proj.name} proj={proj} i={i} p={p} />))}
        </div>
      </div>
    </motion.div>
  )
}

function ProcessStep({ step, i, p }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: i * 0.12, ease: [0.25, 0.4, 0.25, 1] }}
      className="flex items-start gap-6 w-full max-w-2xl"
    >
      <div className="flex-shrink-0 size-14 rounded-full flex items-center justify-center text-lg font-bold"
        style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}66)`, color: '#fff' }}>
        {i + 1}
      </div>
      <div>
        <h3 className="text-xl font-bold" style={{ color: p.text }}>{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: p.muted }}>{step.desc}</p>
      </div>
    </motion.div>
  )
}

export default function AboutUs({ onBack, theme = 'night' }) {
  const p = themes[theme] ?? themes.night
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const processSteps = [
    { title: 'Discovery & Strategy', desc: 'We learn your business, audience, and goals. Then map a technical roadmap tailored to your vision.' },
    { title: 'Design & Architecture', desc: 'Wireframes, design systems, and component architecture. Every pixel is intentional.' },
    { title: 'Engineering & Animation', desc: 'React, Three.js, and GSAP come together. We build, animate, and optimize in parallel.' },
    { title: 'Launch & Handoff', desc: 'Deployment, performance tuning, and full source-code delivery. You own everything.' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-32 overflow-hidden" style={{ backgroundColor: p.bg }}>
      <div className="relative px-6 md:px-12 mx-auto max-w-6xl">

        {/* Back button */}
        <motion.button onClick={onBack}
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm font-medium mb-16 transition-opacity hover:opacity-70"
          style={{ color: p.accent }}>
          <ArrowLeft className="size-4" /> Back to home
        </motion.button>

        {/* ─── HERO — Art gallery intro ─── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="mb-32 relative">
          <SectionEyebrow delay={0.1} color={p.eyebrow}>About Rogue Code</SectionEyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mt-6 max-w-4xl" style={{ color: p.text }}>
            <CharReveal delay={0.2}>We build the web that templates can't.</CharReveal>
          </h1>
          <p className="mt-6 text-base sm:text-lg max-w-2xl leading-relaxed" style={{ color: p.muted }}>
            <WordReveal delay={0.6}>Every brand is unique. Your website should be too. We engineer custom digital experiences from the ground up — no themes, no page builders, no compromises.</WordReveal>
          </p>

          {/* Gallery photo cluster — abstract positioned */}
          <div className="mt-16 relative h-[400px] md:h-[500px]">
            <GalleryPhoto src={galleryPhotos[0]} alt="" width="w-56 md:w-72" rotate={-3} offsetX={0} offsetY={0} from="left" delay={0.3} className="absolute top-0 left-0 z-10" />
            <GalleryPhoto src={galleryPhotos[1]} alt="" width="w-48 md:w-60" rotate={4} offsetX={60} offsetY={40} from="right" delay={0.5} className="absolute top-10 left-1/3 z-20" />
            <GalleryPhoto src={galleryPhotos[2]} alt="" width="w-52 md:w-64" rotate={-2} offsetX={-20} offsetY={-10} from="left" delay={0.7} className="absolute top-0 right-0 z-10" />
            <GalleryPhoto src={galleryPhotos[3]} alt="" width="w-40 md:w-48" rotate={6} offsetX={80} offsetY={60} from="right" delay={0.9} className="absolute bottom-0 left-1/4 z-0" />
            <GalleryPhoto src={galleryPhotos[4]} alt="" width="w-44 md:w-56" rotate={-5} offsetX={-40} offsetY={30} from="left" delay={1.1} className="absolute bottom-10 right-1/4 z-0" />
          </div>
        </motion.div>

        {/* ─── STORY — Split screen with left-right entrance ─── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}
          className="mb-32 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}>
            <SectionEyebrow delay={0.1} color={p.eyebrow}>Our Philosophy</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-6 leading-tight" style={{ color: p.text }}>
              <KineticText mode="wave" delay={0.2}>Speed without sacrifice.</KineticText>
            </h2>
            <p className="mt-6 text-base leading-relaxed" style={{ color: p.muted }}>
              <WordReveal delay={0.4}>We combine AI-native workflows with hand-crafted engineering to ship in weeks what takes other agencies months. The result: production-grade code that you own, forever.</WordReveal>
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: p.muted }}>
              <WordReveal delay={0.6}>From concept to deployment, we handle everything — design, engineering, animation, optimization, and launch. One point of contact. Zero overhead.</WordReveal>
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative h-[300px] md:h-[400px]">
            <GalleryFrame width="w-56 md:w-72" rotate={2} from="right" delay={0}>
              <img src={galleryPhotos[5]} alt="Workspace" className="w-full h-48 md:h-64 object-cover" />
            </GalleryFrame>
            <GalleryFrame width="w-40 md:w-52" rotate={-4} from="right" delay={0.2} className="absolute -bottom-6 -left-8">
              <img src={galleryPhotos[6]} alt="Team" className="w-full h-32 md:h-40 object-cover" />
            </GalleryFrame>
          </motion.div>
        </motion.div>

        {/* ─── STATS ─── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
          className="mb-32 rounded-2xl border p-10 md:p-14" style={{ borderColor: p.glassBorder, background: p.glassBg, backdropFilter: 'blur(12px)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[[0, 50, '+' , 'Projects Delivered', -80], [0, 3, 'x', 'Faster Than In-House', -40], [0, 100, '%', 'Code Ownership', 40], [0, 24, '/7', 'Support & Monitoring', 80]].map(([from, to, suffix, label, x], i) => (
              <motion.div key={label} initial={{ opacity: 0, x }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Counter from={from} to={to} suffix={suffix} label={label} p={p} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── VALUES — Alternating left/right ─── */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <SectionEyebrow color={p.eyebrow}>How we build</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="wave" delay={0.1}>Our principles</KineticText>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                whileHover={{ y: -4 }}
                className="rounded-xl border p-6 transition-colors"
                style={{ borderColor: p.glassBorder, background: p.cardBg }}>
                <div className="size-10 rounded-lg flex items-center justify-center mb-4" style={{ background: `${p.accent}15` }}>
                  <v.icon className="size-5" style={{ color: p.accent }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: p.text }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: p.muted }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── TEAM ─── */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <SectionEyebrow color={p.eyebrow}>Who we are</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="wave" delay={0.1}>Meet the team</KineticText>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-6">
            {teamData.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, x: i === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border p-6 flex gap-5 items-start"
                style={{ borderColor: p.glassBorder, background: p.cardBg }}>
                <div className="size-14 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold tracking-wider"
                  style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}88)`, color: '#FFFFFF' }}>
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

        {/* ─── FOUNDER — About Jeremy Gideon Bareh ─── */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <SectionEyebrow color={p.eyebrow}>The founder</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="wave" delay={0.1}>Jeremy Gideon Bareh</KineticText>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="relative">
                <GalleryFrame width="w-full max-w-sm" rotate={-2} from="left" delay={0}>
                  <img
                    src={galleryPhotos[4]}
                    alt="Jeremy Gideon Bareh"
                    className="w-full h-56 md:h-72 object-cover"
                  />
                </GalleryFrame>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="absolute -bottom-3 -right-3 rounded-xl border px-4 py-3"
                  style={{ borderColor: p.glassBorder, background: p.glassBg, backdropFilter: 'blur(12px)' }}
                >
                  <div className="text-xs font-semibold" style={{ color: p.text }}>Full-Stack</div>
                  <div className="text-[10px]" style={{ color: p.dim }}>React · Three.js · AI</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <p className="text-base leading-relaxed" style={{ color: p.muted }}>
                <span className="float-left text-6xl font-bold leading-none mr-3 mt-1" style={{ color: p.accent }}>A</span>
                <WordReveal delay={0.2}> full-stack engineer and spatial design enthusiast who believes the web deserves better than templates. Jeremy engineers premium digital experiences from scratch — React, Three.js, Framer Motion, and AI-native workflows are his tools of choice. Every project is built with obsessive attention to performance, motion, and craft.</WordReveal>
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: p.muted }}>
                <WordReveal delay={0.4}>From AI agents and trading bots to full-stack web apps and interactive 3D websites — Jeremy has shipped across the stack. His portfolio includes pet grooming platforms, bakery sites, mobile apps, and the Rogue Code studio site you&apos;re browsing right now.</WordReveal>
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {['React', 'Three.js', 'TypeScript', 'Framer Motion', 'Next.js', 'Node.js', 'AI/ML', 'Python'].map((skill) => (
                  <span key={skill} className="px-3 py-1 text-[11px] font-medium rounded-full border"
                    style={{ borderColor: p.glassBorder, color: p.accent, background: `${p.accent}08` }}>
                    {skill}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ─── STORY CONTINUED — Gallery photo interlude ─── */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <SectionEyebrow color={p.eyebrow}>The story</SectionEyebrow>
            <p className="text-xs tracking-widest uppercase mt-4" style={{ color: p.dim }}>Rogue Code &mdash; Founded 2024</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 leading-tight" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>Starting from a single laptop.</KineticText>
            </h2>
          </motion.div>

          <div className="space-y-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
              className="text-base md:text-lg leading-relaxed" style={{ color: p.muted }}>
              <span className="float-left text-6xl md:text-7xl font-bold leading-none mr-4 mt-1" style={{ color: p.accent }}>E</span>
              <WordReveal delay={0.2}>very pixel we ship is guided by a single principle: your brand deserves code that is written for it, not retrofitted to it. No themes. No page builders. No compromises. What started as a belief that the web could offer more than cookie-cutter templates became the founding ethos of Rogue Code.</WordReveal>
            </motion.div>

            {/* Gallery photo strip */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="flex gap-4 overflow-x-auto pb-4 -mx-6 md:-mx-12 px-6 md:px-12"
              style={{ scrollbarWidth: 'none' }}>
              {galleryPhotos.slice(0, 5).map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex-shrink-0 overflow-hidden rounded-sm"
                  style={{ rotate: i % 2 === 0 ? `${i - 2}deg` : `${i - 1}deg`, width: i === 2 ? '280px' : '220px', height: i === 2 ? '200px' : '160px' }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
              className="text-base md:text-lg leading-relaxed max-w-3xl" style={{ color: p.muted }}>
              <WordReveal delay={0.2}>
                One laptop. A conviction that templates were a compromise. And a decision to prove that custom engineering could be faster, more affordable, and undeniably better. That first project led to another, and another. Word spread. The stack grew. But the principle never changed.
              </WordReveal>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
              className="py-10 md:py-14 px-4 text-center border-y" style={{ borderColor: p.glassBorder }}>
              <p className="text-xl md:text-2xl lg:text-3xl font-bold italic leading-snug max-w-3xl mx-auto" style={{ color: p.text }}>
                &ldquo;We believe the web deserves better than templates.&rdquo;
              </p>
              <p className="mt-4 text-sm" style={{ color: p.dim }}>&mdash; Jeremy Gideon Bareh</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <h3 className="text-xl font-bold mb-4" style={{ color: p.text }}>
                  <KineticText mode="wave" delay={0.1}>From freelance to full studio.</KineticText>
                </h3>
                <p className="text-base leading-relaxed" style={{ color: p.muted }}>
                  <WordReveal delay={0.2}>Today Rogue Code is a lean, AI-augmented studio that ships production-grade web experiences for clients around the world. We still own every line of code we write. We still reject shortcuts that sacrifice quality. And we still believe that the best digital experiences are the ones that feel unmistakably human.</WordReveal>
                </p>
              </div>
              <motion.div initial={{ opacity: 0, x: 80 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
                className="relative h-[250px]">
                <GalleryFrame width="w-full max-w-sm" rotate={-3} from="right" delay={0}>
                  <img src={galleryPhotos[7]} alt="Studio" className="w-full h-48 md:h-56 object-cover" />
                </GalleryFrame>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }} className="pt-6">
              <p className="text-base md:text-lg leading-relaxed" style={{ color: p.muted }}>
                <WordReveal delay={0.2}>The web is still evolving. And as long as there are brands that refuse to settle for &ldquo;good enough,&rdquo; we will be here building what comes next.</WordReveal>
              </p>
              <motion.p initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 font-semibold" style={{ color: p.text }}>&mdash; Rogue Code</motion.p>
            </motion.div>
          </div>
        </section>

        {/* ─── PROCESS — Horizontal scroll ─── */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <SectionEyebrow color={p.eyebrow}>Our process</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>How we bring your vision to life</KineticText>
            </h2>
          </motion.div>
          <HorizontalScrollSection>
            {processSteps.map((step, i) => (
              <div key={i} className="max-w-lg mx-auto text-center">
                <div className="size-20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-8"
                  style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}44)`, color: '#fff' }}>
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: p.text }}>{step.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: p.muted }}>{step.desc}</p>
              </div>
            ))}
          </HorizontalScrollSection>
        </section>

        {/* ─── PROJECT SHOWCASE ─── */}
        <section className="mb-20">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <SectionEyebrow color={p.eyebrow}>Our work</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>Projects we&apos;ve built</KineticText>
            </h2>
            <p className="mt-4 text-base max-w-2xl" style={{ color: p.muted }}>
              <WordReveal delay={0.3}>From AI agents to full-stack web apps — each project is built with the same precision and care we bring to every client engagement.</WordReveal>
            </p>
          </motion.div>
          {Object.entries(categoryLabels).map(([cat, label], catIdx) => {
            const catProjects = projects.filter(p => p.category === cat)
            return <ScrollableCategory key={cat} label={label} catProjects={catProjects} catIdx={catIdx} p={p} />
          })}
        </section>

        {/* ─── CTA — Full-bleed photo ─── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden border" style={{ borderColor: p.glassBorder }}>
          <div className="absolute inset-0">
            <img src={galleryPhotos[8]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${p.bg}ee, ${p.bg}99)` }} />
          </div>
          <div className="relative px-10 py-16 md:py-24 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>Ready to build something that actually works?</KineticText>
            </h2>
            <p className="mt-4 text-base" style={{ color: p.muted }}>Stop burning time on agencies that over-promise and under-deliver.</p>
            <motion.button onClick={onBack} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="mt-8 px-8 py-3.5 text-base font-semibold rounded-full transition-colors inline-flex items-center gap-2"
              style={{ backgroundColor: p.accent, color: '#FFFFFF' }}>
              Let&apos;s talk <ArrowLeft className="size-4 rotate-180" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
