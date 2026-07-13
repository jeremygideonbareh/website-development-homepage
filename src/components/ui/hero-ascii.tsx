'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, useAnimationFrame } from 'framer-motion'
import InkReveal from './ink-reveal'
import AuroraBackground from './aurora-background'
import ProjectGallery from './project-gallery'
import Testimonials from './testimonials'
import TechStack from './tech-stack'
import AsciiRain from '../AsciiRain'
import AsciiDecorations from '../AsciiDecorations'


function KineticText({ text, as: Tag = 'h2', className = '' }: { text: string; as?: 'h1' | 'h2' | 'h3' | 'p'; className?: string }) {
  return (
    <Tag className={className} style={{ overflow: 'hidden' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.03, ease: 'easeOut' }}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  )
}

function SectionDivider() {
  return (
    <div className="w-full" style={{ borderBottom: '1px dashed #40372e' }} />
  )
}

function ParallaxSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%'])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.section ref={ref} style={{ opacity }} className={className}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </motion.section>
  )
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0)
  const rounded = useSpring(count, { stiffness: 60, damping: 20 })
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (inView) {
      count.set(value)
    }
  }, [inView, count, value])

  useEffect(() => {
    const unsubscribe = rounded.on('change', (v) => {
      setDisplay(`${Math.round(v)}${suffix}`)
    })
    return unsubscribe
  }, [rounded, suffix])

  return <span ref={ref}>{display}</span>
}

function StatBlock({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  const isNumeric = !isNaN(Number(value.replace('+', '')))
  const num = isNumeric ? Number(value.replace('+', '')) : 0
  const suffix = value.includes('+') ? '+' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center group"
    >
      <motion.div
        className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'rgba(220,80,0,0.1)' }}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(220,80,0,0.2)' }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.div>
      <div className="text-4xl lg:text-5xl font-medium tracking-tight" style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", lineHeight: 0.9 }}>
        {isNumeric ? <AnimatedCounter value={num} suffix={suffix} /> : value}
      </div>
      <div className="mt-3 text-sm" style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
        {label}
      </div>
    </motion.div>
  )
}

function TiltCard({ title, desc, index, icon }: { title: string; desc: string; index: number; icon: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setRotate({ x: -y * 12, y: x * 12 })
  }

  const resetTilt = () => setRotate({ x: 0, y: 0 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      ref={cardRef}
      className="group perspective-[1000px]"
    >
      <motion.div
        animate={{ rotateX: rotate.x, rotateY: rotate.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative border-t p-6 lg:p-8 rounded-sm transition-colors duration-300"
        style={{
          borderColor: '#40372e',
          transformStyle: 'preserve-3d',
          backgroundColor: 'rgba(255,237,215,0.02)',
        }}
        whileHover={{ borderColor: '#dc5000', backgroundColor: 'rgba(220,80,0,0.05)', transition: { duration: 0.3 } }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
          style={{ backgroundColor: 'rgba(220,80,0,0.1)' }}
        >
          {icon}
        </div>
        <div
          className="text-xs tracking-widest mb-3"
          style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", transform: 'translateZ(20px)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3 className="text-xl lg:text-2xl mb-3" style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", fontWeight: 500, lineHeight: 1.1, transform: 'translateZ(30px)' }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed max-w-md" style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", transform: 'translateZ(15px)' }}>
          {desc}
        </p>
      </motion.div>
    </motion.div>
  )
}

function GlassCTA() {
  return (
    <section className="relative min-h-screen flex items-center px-6 lg:px-12 py-32 overflow-hidden" style={{ backgroundColor: '#100904' }}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #dc5000 0%, transparent 70%)', top: '20%', left: '50%', transform: 'translateX(-50%)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #ffedd7 0%, transparent 70%)', bottom: '10%', right: '10%' }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="w-full max-w-4xl mx-auto relative z-10">
        <div
          className="relative p-8 lg:p-16 rounded-sm"
          style={{
            backgroundColor: 'rgba(255,237,215,0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,237,215,0.08)',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-widest mb-6 text-center"
            style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
          >
            CONTACT — 08
          </motion.div>

          <KineticText
            text="Start building."
            as="h2"
            className="text-4xl lg:text-6xl font-medium mb-6 text-center"
            style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", lineHeight: 0.9 }}
          />

          <motion.p
            className="text-sm mb-12 max-w-md mx-auto text-center"
            style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Stop burning time on agencies that over-promise and under-deliver. Let's ship something real.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="relative w-full sm:w-auto flex-1 max-w-sm">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email for newsletter"
                className="w-full px-5 py-3.5 text-sm outline-none transition-all duration-300"
                style={{
                  color: '#ffedd7',
                  backgroundColor: 'rgba(255,237,215,0.05)',
                  border: '1px solid rgba(255,237,215,0.15)',
                  borderRadius: '36px',
                  fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                }}
                onFocus={(e) => { e.target.style.borderColor = '#dc5000' }}
                onBlur={(e) => { e.target.style.borderColor = 'rgba(255,237,215,0.15)' }}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 text-sm tracking-wider whitespace-nowrap transition-all duration-300"
              style={{
                backgroundColor: '#dc5000',
                color: '#ffedd7',
                borderRadius: '36px',
                fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                border: 'none',
              }}
              onClick={() => window.open('mailto:hello@uimix.studio')}
            >
              START BUILDING
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function AnimatedProcessStep({ week, title, desc, index, isLast }: { week: string; title: string; desc: string; index: number; isLast: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <div ref={ref} className="relative flex gap-6 lg:gap-8 lg:flex-col lg:gap-4">
      {!isLast && (
        <motion.div
          className="hidden lg:block absolute left-[15px] top-10 w-0.5"
          style={{ backgroundColor: '#40372e', height: 'calc(100% + 2rem)' }}
        >
          <motion.div
            className="w-full"
            style={{ backgroundColor: '#dc5000', height: '100%' }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ transformOrigin: 'top', backgroundColor: '#dc5000' }}
          />
        </motion.div>
      )}

      <div className="flex-shrink-0 relative z-10">
        <motion.div
          className="w-[30px] h-[30px] rounded-full flex items-center justify-center border-2 text-xs font-medium"
          style={{ borderColor: '#dc5000', color: '#ffedd7', backgroundColor: '#100904' }}
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2, type: 'spring', stiffness: 200 }}
        >
          {index + 1}
        </motion.div>
      </div>

      <div className="flex-1 pb-8 lg:pb-0 lg:pt-4 lg:pl-8">
        <motion.div
          className="text-xs tracking-widest mb-2"
          style={{ color: '#dc5000', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.1 }}
        >
          {week}
        </motion.div>
        <motion.h3
          className="text-xl mb-2"
          style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", fontWeight: 500, lineHeight: 1.2 }}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.15 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="text-sm leading-relaxed"
          style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
        >
          {desc}
        </motion.p>
      </div>
    </div>
  )
}

export default function Home() {
  useEffect(() => {
    const embedScript = document.createElement('script')
    embedScript.type = 'text/javascript'
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `
    document.head.appendChild(embedScript)

    const style = document.createElement('style')
    style.textContent = `
      [data-us-project] { position: relative !important; overflow: hidden !important; }
      [data-us-project] canvas { clip-path: inset(0 0 10% 0) !important; }
      [data-us-project] * { pointer-events: none !important; }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `
    document.head.appendChild(style)

    const hideBranding = () => {
      const projectDiv = document.querySelector('[data-us-project]')
      if (projectDiv) {
        projectDiv.querySelectorAll('*').forEach(el => {
          const text = (el.textContent || '').toLowerCase()
          if (text.includes('made with') || text.includes('unicorn')) el.remove()
        })
      }
    }
    hideBranding()
    const interval = setInterval(hideBranding, 100)
    setTimeout(hideBranding, 1000)
    setTimeout(hideBranding, 3000)
    setTimeout(hideBranding, 5000)

    return () => {
      clearInterval(interval)
      document.head.removeChild(embedScript)
      document.head.removeChild(style)
    }
  }, [])

  const processRef = useRef(null)

  return (
    <div style={{ backgroundColor: '#100904' }}>
      <AuroraBackground className="fixed inset-0" />
      <AsciiRain
        density={0.06}
        speed={0.2}
        color="#2a1a3e"
        fontSize={11}
        fadeOpacity={0.04}
        className="!fixed"
      />

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#0a0a0a', zIndex: 1 }}>
        <div className="absolute inset-0 w-full h-full hidden lg:block">
          <div data-us-project="whwOGlfJ5Rz2rHaEUgHl" style={{ width: '100%', height: '100%', minHeight: '100vh' }} />
        </div>

        <div className="absolute inset-0 w-full h-full lg:hidden" style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, #595855, transparent),
            radial-gradient(1px 1px at 60% 70%, #595855, transparent),
            radial-gradient(1px 1px at 50% 50%, #595855, transparent),
            radial-gradient(1px 1px at 80% 10%, #595855, transparent)
          `,
          opacity: 0.3
        }} />

        <div className="absolute top-0 left-0 right-0 z-20 border-b border-white/10">
          <div className="flex items-center justify-between px-6 lg:px-12 py-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xl lg:text-2xl font-bold italic -skew-x-12 tracking-widest text-white">UIMIX</span>
              <div className="w-px h-4 bg-white/30" />
              <span className="font-mono text-[10px] text-white/50">EST. 2025</span>
            </div>
            <div className="hidden lg:flex items-center gap-3 font-mono text-[10px] text-white/50">
              <span>LAT: 37.7749°</span>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <span>LONG: 122.4194°</span>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-10 h-10 lg:w-14 lg:h-14 border-t-2 border-l-2 z-20" style={{ borderColor: '#333' }} />
        <div className="absolute top-0 right-0 w-10 h-10 lg:w-14 lg:h-14 border-t-2 border-r-2 z-20" style={{ borderColor: '#333' }} />
        <div className="absolute bottom-[5vh] left-0 w-10 h-10 lg:w-14 lg:h-14 border-b-2 border-l-2 z-20" style={{ borderColor: '#333' }} />
        <div className="absolute bottom-[5vh] right-0 w-10 h-10 lg:w-14 lg:h-14 border-b-2 border-r-2 z-20" style={{ borderColor: '#333' }} />

        <div className="relative z-10 flex min-h-screen items-center pt-16 lg:pt-0" style={{ marginTop: '5vh' }}>
          <div className="px-6 lg:px-16 lg:ml-[10%]">
            <div className="max-w-lg">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="flex items-center gap-2 mb-4 opacity-60"
              >
                <div className="w-8 h-px bg-white/30" />
                <span className="font-mono text-[10px] tracking-wider text-white/70">001</span>
                <div className="flex-1 h-px bg-white/30" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
                className="text-3xl lg:text-6xl font-bold tracking-wider leading-tight text-white"
                style={{ letterSpacing: '0.1em' }}
              >
                PERFECT
                <span className="block mt-1 opacity-70">PROPORTIONS</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                className="mt-6 font-mono text-sm leading-relaxed text-[#888] max-w-md"
              >
                Where geometry meets humanity — Da Vinci's vision of ideal form
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
                className="flex gap-4 mt-8"
              >
                <button
                  onClick={() => window.open('https://calendly.com', '_blank')}
                  className="px-6 py-3 bg-white text-black font-mono text-xs tracking-wider border border-white hover:bg-transparent hover:text-white transition-all duration-300"
                >
                  GET STARTED
                </button>
                <button
                  onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 py-3 bg-transparent text-white font-mono text-xs tracking-wider border border-white/40 hover:bg-white hover:text-black transition-all duration-300"
                >
                  LEARN MORE
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-[5vh] left-0 right-0 z-20 border-t border-white/10 bg-[#0a0a0a]/80 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-6 lg:px-12 py-3">
            <div className="flex items-center gap-4 font-mono text-[9px] text-white/50">
              <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
              <span>V1.0.0</span>
            </div>
            <div className="flex items-center gap-3 font-mono text-[9px] text-white/50">
              <span className="hidden lg:inline">◐ RENDERING</span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── OUR STORY ─── */}
      <ParallaxSection id="story" className="relative min-h-screen flex items-center px-6 lg:px-12 py-32" style={{ backgroundColor: '#100904', zIndex: 1 }}>
        <div className="absolute top-20 right-20 text-[200px] lg:text-[300px] font-bold leading-none select-none pointer-events-none" style={{ color: 'rgba(255,237,215,0.02)', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
          01
        </div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none">
          <motion.div
            className="w-full h-full rounded-full"
            style={{ background: 'radial-gradient(circle, #dc5000 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="w-full max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-xs tracking-widest mb-6"
            style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ABOUT
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
            <div>
              <KineticText
                text="Design, engineered with precision."
                as="h2"
                className="text-3xl lg:text-5xl font-medium leading-none tracking-tight"
                style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", lineHeight: 0.9 }}
              />
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-base lg:text-lg leading-relaxed" style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
                We build digital experiences that feel physical. Every pixel is placed with intent, every animation serves a purpose.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
                From the Vitruvian proportions of the human form to the golden ratios found in nature — our work is rooted in timeless principles of balance and harmony. We don't follow trends; we set standards.
              </p>
              <motion.button
                whileHover={{ borderColor: '#dc5000', backgroundColor: 'rgba(220,80,0,0.1)' }}
                transition={{ ease: 'easeOut', duration: 0.3 }}
                className="self-start border px-8 py-3 text-sm tracking-wider transition-all duration-300"
                style={{ borderColor: '#ffedd7', color: '#ffedd7', borderRadius: '22.5px', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
              >
                READ OUR MANIFESTO
              </motion.button>
            </div>
          </div>
        </div>
      </ParallaxSection>

      {/* Divider */}
      <div className="px-6 lg:px-12 py-8" style={{ backgroundColor: '#100904' }}>
        <SectionDivider />
      </div>

      {/* ─── STATS ─── */}
      <section className="px-6 lg:px-12 py-24 lg:py-32" style={{ backgroundColor: '#100904' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
            <StatBlock
              value="50+"
              label="Projects Delivered"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>}
            />
            <StatBlock
              value="3x"
              label="Faster Delivery"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
            />
            <StatBlock
              value="100%"
              label="Code Ownership"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>}
            />
            <StatBlock
              value="30"
              label="Day Execution"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>}
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 lg:px-12 py-8" style={{ backgroundColor: '#100904' }}>
        <SectionDivider />
      </div>

      {/* ─── WHAT WE BUILD ─── */}
      <ParallaxSection className="min-h-screen flex items-center px-6 lg:px-12 py-32" style={{ backgroundColor: '#100904' }}>
        <div className="w-full max-w-7xl mx-auto">
          <motion.div
            className="text-xs tracking-widest mb-6"
            style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            CAPABILITIES
          </motion.div>

          <KineticText
            text="What We Build"
            as="h2"
            className="text-3xl lg:text-5xl font-medium mb-16 lg:mb-24"
            style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", lineHeight: 0.9 }}
          />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            <TiltCard
              index={0}
              title="Interactive 3D Environments"
              desc="Three.js experiences that bring products to life — rotating, reactive, and rendered in real-time."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>}
            />
            <TiltCard
              index={1}
              title="Cinematic Web Animation"
              desc="GSAP and framer-motion driven narratives that guide users through scroll-based storytelling."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>}
            />
            <TiltCard
              index={2}
              title="AI-Native Infrastructure"
              desc="Built with AI from day zero — agents, pipelines, and models are core to every project."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
            />
            <TiltCard
              index={3}
              title="Performance Architecture"
              desc="Millisecond load times, edge-rendered, and optimized for every device and network condition."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>}
            />
            <TiltCard
              index={4}
              title="Design Systems & Tokens"
              desc="Scalable, consistent design languages engineered for multi-platform deployment."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>}
            />
            <TiltCard
              index={5}
              title="Full-Stack Delivery"
              desc="From concept to deployment — we own the entire pipeline and hand over complete source code."
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc5000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>}
            />
          </div>
        </div>
      </ParallaxSection>

      {/* Divider */}
      <div className="px-6 lg:px-12 py-8" style={{ backgroundColor: '#100904' }}>
        <SectionDivider />
      </div>

      {/* ─── OUR PROCESS ─── */}
      <section ref={processRef} className="relative min-h-screen flex items-center px-6 lg:px-12 py-32" style={{ backgroundColor: '#100904' }}>
        <AsciiDecorations showTerminal />
        <div className="w-full max-w-6xl mx-auto">
          <motion.div
            className="text-xs tracking-widest mb-6"
            style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            PROCESS
          </motion.div>

          <KineticText
            text="The 30-Day Blueprint"
            as="h2"
            className="text-3xl lg:text-5xl font-medium mb-16"
            style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif", lineHeight: 0.9 }}
          />

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {[
              { week: 'Week 1', title: 'Architecture & UI Mapping', desc: 'Business goals become a technical roadmap. Wireframes, component trees, and data flow diagrams.' },
              { week: 'Week 2', title: 'Core Engineering', desc: 'React/Next.js foundation with millisecond load times and comprehensive state management.' },
              { week: 'Week 3', title: 'Interactive & 3D Integration', desc: 'Three.js environments, GSAP animations, and custom features that establish the brand vibe.' },
              { week: 'Week 4', title: 'QA & Deployment', desc: 'Cross-device stress testing, live launch, and complete source-code handoff with documentation.' },
            ].map((item, i) => (
              <AnimatedProcessStep
                key={item.week}
                week={item.week}
                title={item.title}
                desc={item.desc}
                index={i}
                isLast={i === 3}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <ProjectGallery />

      {/* ─── TESTIMONIALS ─── */}
      <Testimonials />

      {/* ─── TECH STACK ─── */}
      <TechStack />

      {/* ─── CTA ─── */}
      <GlassCTA />

      {/* ─── FOOTER ─── */}
      <footer className="px-6 lg:px-12 py-16" style={{ backgroundColor: '#100904' }}>
        <div className="w-full max-w-6xl mx-auto">
          <SectionDivider />
          <div className="grid lg:grid-cols-3 gap-12 mt-12">
            <div>
              <span className="text-lg font-medium tracking-tight" style={{ color: '#ffedd7', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
                UIMIX
              </span>
              <div className="mt-3 text-sm leading-relaxed" style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
                Design, engineered with precision.<br />
                San Francisco, CA
              </div>
              <div className="flex gap-4 mt-6">
                {['Twitter', 'LinkedIn', 'GitHub', 'Dribbble'].map(social => (
                  <a
                    key={social}
                    href="#"
                    className="text-xs hover:text-[#ffedd7] transition-colors duration-200"
                    style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs tracking-widest mb-4" style={{ color: '#dc5000', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
                NAVIGATION
              </div>
              <div className="flex flex-col gap-3">
                {['Home', 'About', 'Work', 'Process', 'Contact'].map(link => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm hover:text-[#ffedd7] transition-colors duration-200"
                    style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs tracking-widest mb-4" style={{ color: '#dc5000', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
                NEWSLETTER
              </div>
              <p className="text-xs mb-4" style={{ color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
                Get insights on web development, design, and AI — delivered monthly.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Email for newsletter"
                  className="flex-1 px-4 py-2.5 text-xs outline-none transition-colors duration-200"
                  style={{
                    color: '#ffedd7',
                    backgroundColor: 'rgba(255,237,215,0.05)',
                    border: '1px solid rgba(255,237,215,0.1)',
                    borderRadius: '4px',
                    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#dc5000' }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(255,237,215,0.1)' }}
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2.5 text-xs font-medium transition-all duration-200"
                  style={{ backgroundColor: '#dc5000', color: '#ffedd7', borderRadius: '4px', border: 'none', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 text-xs flex flex-col lg:flex-row justify-between gap-4" style={{ borderTop: '1px dashed #40372e', color: '#6c5f51', fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
            <span>&copy; 2026 UIMIX. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:underline" style={{ color: '#6c5f51' }}>Privacy</a>
              <a href="#" className="hover:underline" style={{ color: '#6c5f51' }}>Terms</a>
              <a href="#" className="hover:underline" style={{ color: '#6c5f51' }}>Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
