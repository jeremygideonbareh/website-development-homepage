import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  ExternalLink, ArrowLeft, ChevronRight, Code, Zap, Cpu, Shield,
  Sparkles, Star, Quote, MapPin, Calendar, Award, Layers, Globe,
  Smartphone, Palette, Braces, Bot, Database, Coins
} from 'lucide-react'
import { WordReveal, CharReveal, SectionEyebrow, KineticText } from './RevealText'
import GalleryPhoto, { GalleryFrame } from './GalleryPhoto'

function getDomain(url) {
  try { return new URL(url).hostname.replace('www.', '') } catch { return url }
}

function getFaviconUrl(url) {
  const domain = getDomain(url)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

const projects = [
  { name: "God's Creatures Pet Groomers", url: 'https://github.com/jeremygideonbareh/Gods-creatures-pet-groomers', tech: 'TypeScript, Next.js, Supabase', category: 'websites', color: '#FF6B4A', result: 'Full-stack booking & e-commerce platform' },
  { name: 'Pet Grooming Website', url: 'https://github.com/jeremygideonbareh/pet-grooming-website-', tech: 'HTML, JavaScript, TypeScript', category: 'websites', color: '#2B7A78', result: 'Responsive service showcase site' },
  { name: 'Be Kind Bakery', url: 'https://github.com/jeremygideonbareh/be-kind-bakery', tech: 'TypeScript, JavaScript, React', category: 'websites', color: '#FF6B4A', result: 'Digital storefront with online ordering' },
  { name: 'Crumbs Bakery', url: 'https://github.com/jeremygideonbareh/crumbs-bakery-', tech: 'TypeScript, JavaScript, React', category: 'websites', color: '#3B8A88', result: 'Menu-driven bakery website' },
  { name: 'Chelsea Man Spa Mobile', url: 'https://github.com/jeremygideonbareh/chelsea-man-spa-mobile', tech: 'JavaScript, Firebase, Google Auth', category: 'mobile', color: '#FF6B4A', result: 'Cross-platform booking app' },
  { name: "Kiki's Portfolio", url: 'https://github.com/jeremygideonbareh/kiki-s-portfolio-website', tech: 'TypeScript, React', category: 'websites', color: '#2B7A78', result: 'Personal brand showcase' },
  { name: 'Trading Bot', url: 'https://github.com/jeremygideonbareh/trading-bot-', tech: 'Python, TypeScript, Docker', category: 'ai', color: '#FF6B4A', result: 'Automated trading pipeline' },
  { name: 'Support Ticket Agent', url: 'https://github.com/jeremygideonbareh/support-ticket-agent', tech: 'Python, LangChain, LangGraph', category: 'ai', color: '#2B7A78', result: 'AI-powered customer support' },
  { name: 'Rogue Code (this site)', url: 'https://github.com/jeremygideonbareh/website-development-homepage', tech: 'React, Three.js, Framer Motion', category: 'websites', color: '#3B8A88', result: 'Interactive agency showcase' },
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

const timeline = [
  { year: '2023', title: 'The first line of code', desc: 'Jeremy started building websites from a single laptop. No clients. No portfolio. Just a conviction that templates were a compromise.', icon: Code },
  { year: '2024', title: 'First client projects', desc: 'Word spread. Pet groomers, bakeries, spas — each project built from scratch. The portfolio grew. So did the reputation.', icon: Award },
  { year: '2025', title: 'AI-native workflow', desc: 'Integrated AI tooling to ship faster without sacrificing quality. Support ticket agents, trading bots — the stack expanded into machine learning.', icon: Bot },
  { year: '2026', title: 'Rogue Code studio', desc: 'What started as one developer became a lean, AI-augmented studio shipping production-grade web experiences for clients worldwide.', icon: Layers },
]

const testimonials = [
  { quote: 'Jeremy built our bakery site from the ground up. No templates. Every detail was intentional. Our online orders went up 40% in the first month.', author: 'Be Kind Bakery', role: 'Client Project' },
  { quote: 'The support ticket agent transformed our customer service. AI-powered responses cut resolution time by 60%. Jeremy understood our needs immediately.', author: 'Support Team Lead', role: 'Automation Project' },
  { quote: 'Working with Rogue Code is different. They actually listen, then build something better than what you imagined. Full ownership, no strings attached.', author: 'Portfolio Client', role: 'Web Development' },
]

const skillCategories = [
  { title: 'Frontend', icon: Palette, skills: [
    { name: 'React / Next.js', level: 95 }, { name: 'TypeScript', level: 90 }, { name: 'Three.js / 3D', level: 85 }, { name: 'Framer Motion', level: 92 }, { name: 'Tailwind CSS', level: 90 }
  ]},
  { title: 'AI & Automation', icon: Bot, skills: [
    { name: 'LangChain / LangGraph', level: 80 }, { name: 'Python / ML', level: 85 }, { name: 'AI Agents', level: 78 }, { name: 'API Integration', level: 88 }
  ]},
  { title: 'Backend & Data', icon: Database, skills: [
    { name: 'Node.js', level: 88 }, { name: 'Supabase / Firebase', level: 85 }, { name: 'SQL / NoSQL', level: 80 }, { name: 'Docker', level: 75 }
  ]},
  { title: 'Design & Motion', icon: Sparkles, skills: [
    { name: 'UI/UX Design', level: 85 }, { name: 'GSAP', level: 80 }, { name: 'Responsive Design', level: 92 }, { name: 'Brand Identity', level: 78 }
  ]},
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

function SkillBar({ name, level, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span style={{ color: '#c0c0c0' }}>{name}</span>
        <span style={{ color: '#888' }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(to right, #e7c59a, #e7c59a88)' }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.8, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
        />
      </div>
    </div>
  )
}

function ProjectCard({ proj, i, p }) {
  const [iframeError, setIframeError] = useState(false)
  const domain = getDomain(proj.url)
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
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className="group block rounded-2xl border overflow-hidden transition-shadow duration-300"
        style={{ borderColor: p.glassBorder, background: p.cardBg, backdropFilter: 'blur(8px)' }}
      >
        <div className="relative overflow-hidden" style={{ height: 160, background: p.surface2 }}>
          {iframeError ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1">
              <img src={getFaviconUrl(proj.url)} alt="" className="size-6 rounded"
                onError={(e) => { e.target.style.display = 'none' }} />
              <span className="text-[10px] font-medium" style={{ color: p.dim, opacity: 0.5 }}>{domain}</span>
            </div>
          ) : (
            <>
              <iframe
                src={proj.url}
                title={proj.name}
                className="w-full h-full border-0"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups"
                style={{ background: '#fff', pointerEvents: 'none' }}
                onError={() => setIframeError(true)}
              />
              <div className="absolute inset-0" style={{ pointerEvents: 'none', touchAction: 'none' }} />
            </>
          )}
          <div className="absolute top-3 right-3 size-2.5 rounded-full" style={{ backgroundColor: proj.color }} />
        </div>
        <div className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold leading-tight" style={{ color: p.text }}>{proj.name}</h3>
            <ExternalLink className="size-3.5 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-60 transition-opacity" style={{ color: p.dim }} />
          </div>
          <p className="mt-1 text-xs" style={{ color: p.muted }}>{proj.result}</p>
          <p className="mt-0.5 text-[10px]" style={{ color: p.dim }}>{proj.tech}</p>
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
            style={{ background: p.surface, color: p.text, border: `1px solid ${p.border}` }}><ChevronRight className="size-4 rotate-180" /></button>
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

function TestimonialCard({ t, i, p }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: i * 0.12 }}
      className="rounded-xl border p-6 md:p-8 relative"
      style={{ borderColor: p.glassBorder, background: p.cardBg }}
    >
      <Quote className="size-8 mb-4" style={{ color: `${p.accent}44` }} />
      <p className="text-sm md:text-base leading-relaxed italic" style={{ color: p.muted }}>&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3 pt-4 border-t" style={{ borderColor: p.glassBorder }}>
        <div className="size-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: `${p.accent}22`, color: p.accent }}>
          {t.author.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: p.text }}>{t.author}</p>
          <p className="text-xs" style={{ color: p.dim }}>{t.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutUs({ onBack, theme = 'night' }) {
  const p = themes[theme] ?? themes.night
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const processSteps = [
    { title: 'Discovery', desc: 'We learn your business, audience, and goals. Then map a roadmap tailored to your vision.' },
    { title: 'Design', desc: 'Wireframes, design systems, and component architecture. Every pixel is intentional.' },
    { title: 'Engineer', desc: 'React, Three.js, and AI come together. We build, animate, and optimize in parallel.' },
    { title: 'Launch', desc: 'Deployment, performance tuning, and full source-code delivery. You own everything.' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-32 overflow-x-hidden" style={{ backgroundColor: p.bg }}>
      <div className="relative px-6 md:px-12 mx-auto max-w-6xl">

        {/* ─── HERO — Full personal intro ─── */}
        <motion.div ref={heroRef} style={{ opacity: heroOpacity }} className="relative mb-40">
          <motion.button onClick={onBack}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-sm font-medium mb-20 transition-opacity hover:opacity-70"
            style={{ color: p.accent }}>
            <ArrowLeft className="size-4" /> Back to home
          </motion.button>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div style={{ y: heroY }} className="relative">
              <div className="relative inline-block">
                <GalleryFrame width="w-64 md:w-80" rotate={-2} from="left" delay={0}>
                  <img src={galleryPhotos[4]} alt="Jeremy Gideon Bareh"
                    className="w-full h-64 md:h-80 object-cover" />
                </GalleryFrame>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="absolute -bottom-4 -right-4 rounded-xl border px-4 py-3"
                  style={{ borderColor: p.glassBorder, background: p.glassBg, backdropFilter: 'blur(12px)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-green-400" />
                    <span className="text-xs font-semibold" style={{ color: p.text }}>Available for work</span>
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: p.dim }}>React · Three.js · AI</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <SectionEyebrow delay={0.1} color={p.eyebrow}>Founder & Lead Developer</SectionEyebrow>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mt-4" style={{ color: p.text }}>
                Jeremy <br />Gideon <br /><span style={{ color: p.accent }}>Bareh</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg max-w-md leading-relaxed" style={{ color: p.muted }}>
                <WordReveal delay={0.4}>Full-stack engineer building premium digital experiences from scratch. No templates. No compromises. Just code that works.</WordReveal>
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {['React', 'Three.js', 'TypeScript', 'AI/ML'].map((skill) => (
                  <span key={skill} className="px-4 py-1.5 text-xs font-medium rounded-full border"
                    style={{ borderColor: p.glassBorder, color: p.accent, background: `${p.accent}08` }}>
                    {skill}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* ─── STATS ─── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.7 }}
          className="mb-32 rounded-2xl border p-10 md:p-14" style={{ borderColor: p.glassBorder, background: p.glassBg, backdropFilter: 'blur(12px)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[[0, 50, '+' , 'Projects Delivered', -80], [0, 3, 'x', 'Faster Than In-House', -40], [0, 100, '%', 'Code Ownership', 40], [0, 12, '', 'Clients Served', 80]].map(([from, to, suffix, label, x], i) => (
              <motion.div key={label} initial={{ opacity: 0, x }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <Counter from={from} to={to} suffix={suffix} label={label} p={p} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── NARRATIVE TIMELINE ─── */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
            <SectionEyebrow color={p.eyebrow}>The journey</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 leading-tight" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>From a laptop to a studio.</KineticText>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: `linear-gradient(to bottom, transparent, ${p.accent}44, transparent)` }} />
            <div className="space-y-20">
              {timeline.map((t, i) => (
                <motion.div key={t.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] }}
                  className={`relative flex items-start gap-8 md:gap-0 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} md:flex-row`}
                >
                  <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? 'md:pl-12 md:text-right' : 'md:pr-12'}`}>
                    <div className="rounded-xl border p-5" style={{ borderColor: p.glassBorder, background: p.cardBg }}>
                      <div className="flex items-center gap-2 mb-2" style={{ justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                        <t.icon className="size-4" style={{ color: p.accent }} />
                        <h3 className="text-lg font-semibold" style={{ color: p.text }}>{t.title}</h3>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: p.muted }}>{t.desc}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 relative z-10">
                    <div className="size-14 md:size-16 rounded-full flex items-center justify-center border-2" style={{ borderColor: p.accent, background: p.bg }}>
                      <span className="text-sm font-bold" style={{ color: p.accent }}>{t.year}</span>
                    </div>
                  </div>
                  <div className="md:hidden flex-1">
                    <div className="rounded-xl border p-4" style={{ borderColor: p.glassBorder, background: p.cardBg }}>
                      <div className="flex items-center gap-2 mb-2">
                        <t.icon className="size-4" style={{ color: p.accent }} />
                        <h3 className="text-base font-semibold" style={{ color: p.text }}>{t.title}</h3>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: p.muted }}>{t.desc}</p>
                    </div>
                  </div>
                  <div className={`hidden md:block w-1/2 ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SKILLS MATRIX ─── */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <SectionEyebrow color={p.eyebrow}>Expertise</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="wave" delay={0.1}>Skills & proficiency</KineticText>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {skillCategories.map((cat, ci) => (
              <motion.div key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: ci * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border p-6" style={{ borderColor: p.glassBorder, background: p.cardBg }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="size-10 rounded-lg flex items-center justify-center" style={{ background: `${p.accent}15` }}>
                    <cat.icon className="size-5" style={{ color: p.accent }} />
                  </div>
                  <h3 className="text-lg font-semibold" style={{ color: p.text }}>{cat.title}</h3>
                </div>
                {cat.skills.map((skill, si) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} index={si} />
                ))}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── VALUES — Alternating ─── */}
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

        {/* ─── TESTIMONIALS ─── */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <SectionEyebrow color={p.eyebrow}>Client feedback</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>What clients say</KineticText>
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={i} t={t} i={i} p={p} />
            ))}
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <SectionEyebrow color={p.eyebrow}>Our process</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>How we bring your vision to life</KineticText>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-4 gap-4">
            {processSteps.map((step, i) => (
              <motion.div key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative rounded-xl border p-6 text-center"
                style={{ borderColor: p.glassBorder, background: p.cardBg }}
              >
                <div className="size-14 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-5"
                  style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}44)`, color: '#fff' }}>
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ color: p.text }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: p.muted }}>{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="size-5" style={{ color: `${p.accent}44` }} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── PROJECT SHOWCASE ─── */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
            <SectionEyebrow color={p.eyebrow}>Our work</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>Projects we've built</KineticText>
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

        {/* ─── CTA — Personal note ─── */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden border" style={{ borderColor: p.glassBorder }}>
          <div className="absolute inset-0">
            <img src={galleryPhotos[8]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${p.bg}ee, ${p.bg}99)` }} />
          </div>
          <div className="relative px-10 py-16 md:py-24 text-center max-w-2xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: p.accent }}>
              Let's build something
            </motion.p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight" style={{ color: p.text }}>
              <KineticText mode="spring" delay={0.1}>Ready to build something that actually works?</KineticText>
            </h2>
            <p className="mt-4 text-base leading-relaxed" style={{ color: p.muted }}>
              Stop burning time on agencies that over-promise and under-deliver. Let's build something real — together.
            </p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="mt-6 text-sm italic" style={{ color: p.dim }}>
              — Jeremy Gideon Bareh
            </motion.p>
            <motion.button onClick={onBack} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="mt-8 px-8 py-3.5 text-base font-semibold rounded-full transition-colors inline-flex items-center gap-2"
              style={{ backgroundColor: p.accent, color: '#FFFFFF' }}>
              Start your project <ArrowLeft className="size-4 rotate-180" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}