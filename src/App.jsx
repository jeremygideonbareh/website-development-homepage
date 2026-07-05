import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import {
  ArrowLeft, Sun, Moon,
} from 'lucide-react'
import Loader from './components/Loader'
import PrismaHero from './components/ui/prisma-hero'
import ServicesSection from './components/ServicesSection'
import WhyUsSection from './components/WhyUsSection'
import { ContactPage } from './components/ui/contact-page'
import { BookingModal } from './components/BookingModal'
import AnimatedBeamTimeline from './components/AnimatedBeamTimeline'
import { WordReveal, CharReveal, SectionEyebrow } from './components/RevealText'
import GalleryPhoto, { GalleryFrame } from './components/GalleryPhoto'

import ExamplesPage from './components/ExamplesPage'
import AboutUs from './components/AboutUs'

const palette = {
  day: {
    bg: '#F5F0EB',
    surface: '#FFFFFF',
    surface2: '#EEE8E0',
    text: '#1A1A1A',
    muted: '#5A4A3A',
    dim: '#8A7A6A',
    accent: '#E85D3A',
    border: 'rgba(0,0,0,0.08)',
    border2: 'rgba(0,0,0,0.05)',
    navBg: 'rgba(245,240,235,0.88)',
    cardBg: 'rgba(255,255,255,0.7)',
  },
  night: {
    bg: '#1A1817',
    surface: '#222020',
    surface2: '#101010',
    text: '#F2F2F2',
    muted: '#8A8A8A',
    dim: '#6A6A6A',
    accent: '#FF6B4A',
    border: 'rgba(255,255,255,0.08)',
    border2: 'rgba(255,255,255,0.05)',
    navBg: 'rgba(26,24,23,0.88)',
    cardBg: 'rgba(255,255,255,0.03)',
  },
}

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '3x', label: 'Faster Than In-House' },
  { value: '100%', label: 'Code Ownership' },
]

const cinematicPhotos = [
  'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=85',
]

function App() {
  const [isLoading, setIsLoading] = useState(() => true)
  const [showLogoFlash, setShowLogoFlash] = useState(() => false)
  const [showContact, setShowContact] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [theme, setTheme] = useState(() => 'night')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setShowLogoFlash(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showLogoFlash) return
    const timer = setTimeout(() => setShowLogoFlash(false), 800)
    return () => clearTimeout(timer)
  }, [showLogoFlash])

  const p = palette[theme]

  return (
    <div className="min-h-screen" style={{ backgroundColor: p.bg }}>
      {!showExamples && !showAbout && !showContact && <PrismaHero />}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: p.bg }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogoFlash && (
          <motion.div
            key="logo-flash"
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ backgroundColor: '#000000' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
          >
            <motion.h1
              className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-[0.3em]"
              style={{ color: '#ffffff' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              HORIZON
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        key={theme}
      >
        <motion.nav
          variants={navVariants}
          initial="hidden"
          animate="visible"
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-4 md:px-12"
          style={{
            backgroundColor: p.navBg,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${p.border}`,
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(prev => prev === 'night' ? 'day' : 'night')}
              className="flex items-center justify-center size-9 rounded-full border transition-colors"
              style={{
                borderColor: p.border,
                color: p.text,
              }}
              aria-label="Toggle theme"
            >
              {theme === 'night' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              onClick={() => { setShowAbout(!showAbout); setShowContact(false); }}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full border transition-colors"
              style={{
                borderColor: p.border,
                color: p.text,
              }}
            >
              {showAbout && <ArrowLeft className="size-4" />}
              {showAbout ? 'Back' : 'About Us'}
            </button>
            <button
              onClick={() => setShowContact(!showContact)}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-colors"
              style={{
                backgroundColor: p.text,
                color: p.bg,
              }}
            >
              {showContact && <ArrowLeft className="size-4" />}
              {showContact ? 'Back' : 'Start a Project'}
            </button>
          </div>
        </motion.nav>

        {showExamples ? (
          <ExamplesPage onBack={() => setShowExamples(false)} />
        ) : showAbout ? (
          <AboutUs theme={theme} onBack={() => setShowAbout(false)} />
        ) : (
          <>
            <div className={showContact ? 'hidden' : ''} style={{ paddingTop: '100vh' }}>
              {/* Brand Story */}
              <section className="px-6 py-32 md:px-12 relative z-10" style={{ backgroundColor: p.bg }}>
                <div className="mx-auto max-w-6xl space-y-48">

                  {/* Philosophy — text left, photo right */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
                  >
                    <div className="max-w-xl">
                      <SectionEyebrow>Our Philosophy</SectionEyebrow>
                      <h2 className="text-3xl sm:text-4xl font-bold mt-6 leading-tight" style={{ color: p.text }}>
                        <CharReveal delay={0.2}>
                          We believe the web deserves better than templates.
                        </CharReveal>
                      </h2>
                      <p className="mt-8 text-base leading-relaxed" style={{ color: p.muted }}>
                        <WordReveal delay={0.6}>
                          Every brand is unique. Your website should be too. We engineer custom digital experiences from the ground up — no themes, no page builders, no compromises.
                        </WordReveal>
                      </p>
                    </div>
                    <GalleryPhoto src={cinematicPhotos[0]} alt="" width="w-full" rotate={-2} offsetX={0} offsetY={0} from="right" delay={0.3} />
                  </motion.div>

                  {/* Approach — photo left, text right */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
                  >
                    <GalleryPhoto src={cinematicPhotos[1]} alt="" width="w-full" rotate={3} offsetX={0} offsetY={0} from="left" delay={0.3} />
                    <div className="max-w-xl md:ml-auto md:text-right">
                      <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: p.text }}>
                        <CharReveal delay={0.3}>
                          Speed without sacrifice.
                        </CharReveal>
                      </h2>
                      <p className="mt-8 text-base leading-relaxed" style={{ color: p.muted }}>
                        <WordReveal delay={0.7}>
                          We combine AI-native workflows with hand-crafted engineering to ship in weeks what takes other agencies months. The result: production-grade code that you own, forever.
                        </WordReveal>
                      </p>
                    </div>
                  </motion.div>

                  {/* Promise — text left, photo right */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
                  >
                    <div className="max-w-xl">
                      <h2 className="text-3xl sm:text-4xl font-bold leading-tight" style={{ color: p.text }}>
                        <CharReveal delay={0.3}>
                          You focus on your business. We build the digital architecture.
                        </CharReveal>
                      </h2>
                      <p className="mt-8 text-base leading-relaxed" style={{ color: p.muted }}>
                        <WordReveal delay={0.7}>
                          From concept to deployment, we handle everything — design, engineering, animation, optimization, and launch. One point of contact. Zero overhead.
                        </WordReveal>
                      </p>
                    </div>
                    <GalleryPhoto src={cinematicPhotos[2]} alt="" width="w-full" rotate={-4} offsetX={0} offsetY={0} from="right" delay={0.3} />
                  </motion.div>

                </div>
              </section>

              {/* Stats */}
              <section className="px-6 pt-24 md:px-12 relative z-10">
                <div className="mx-auto max-w-5xl">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-2xl border p-8 shadow-lg"
                    style={{
                      borderColor: p.border,
                      backgroundColor: p.surface,
                    }}
                  >
                    {stats.map((s) => (
                      <div key={s.label} className="text-center">
                        <div className="text-3xl sm:text-4xl font-bold" style={{ color: p.text }}>{s.value}</div>
                        <div className="mt-1 text-sm tracking-wide" style={{ color: p.dim }}>{s.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </section>

              <ServicesSection isDay={theme === 'day'} onShowExamples={() => setShowExamples(true)} />

              {/* Process + Why Us */}
              <section className="relative">
                <div className="relative z-10">
                  <section className="px-6 py-32 md:px-12 text-center relative">
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl md:text-4xl lg:text-5xl font-bold"
                      style={{ color: p.text }}
                    >
                      AI meets infrastructure
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mt-4 text-base"
                      style={{ color: p.muted }}
                    >
                      Intelligent agents. Real-time pipelines. Production-ready.
                    </motion.p>
                  </section>

                  {/* Photo interlude — cinematic strip */}
                  <section className="px-6 md:px-12 py-24 relative">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7 }}
                      className="flex gap-5 overflow-x-auto pb-4 -mx-6 md:-mx-12 px-6 md:px-12"
                      style={{ scrollbarWidth: 'none' }}
                    >
                      {cinematicPhotos.slice(4, 9).map((src, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08 }}
                          className="flex-shrink-0 overflow-hidden rounded-sm"
                          style={{
                            rotate: i % 2 === 0 ? `${i - 1}deg` : `${i + 1}deg`,
                            width: i === 2 ? '300px' : '240px',
                            height: i === 2 ? '220px' : '180px',
                          }}
                        >
                          <img src={src} alt="" className="w-full h-full object-cover" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </section>

                  <AnimatedBeamTimeline isDay={theme === 'day'} />

                  <WhyUsSection isDay={theme === 'day'} />
                </div>
              </section>

              {/* CTA — Full-bleed photo */}
              <section className="px-6 py-32 md:px-12 relative z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative rounded-2xl overflow-hidden border"
                  style={{ borderColor: p.border }}
                >
                  <div className="absolute inset-0">
                    <img src={cinematicPhotos[9]} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${p.bg}ee, ${p.bg}99)` }} />
                  </div>
                  <div className="relative px-10 py-20 md:py-28 text-center">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
                      style={{ color: p.text }}
                    >
                      Ready to build something{' '}
                      <span style={{ color: p.accent }}>that actually works?</span>
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                      className="mt-6 text-lg max-w-xl mx-auto"
                      style={{ color: p.muted }}
                    >
                      Stop burning time on agencies that over-promise and under-deliver. Let&apos;s ship something real.
                    </motion.p>
                    <motion.button
                      onClick={() => setShowBooking(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="mt-10 px-10 py-4 text-base font-semibold rounded-full transition-colors shadow-lg"
                      style={{ backgroundColor: p.accent, color: '#FFFFFF' }}
                    >
                      Book a Free Call
                    </motion.button>
                  </div>
                </motion.div>
              </section>

              {/* Footer */}
              <footer className="border-t px-6 py-16 md:px-12 relative z-10" style={{ borderColor: p.border }}>
                <div className="mx-auto max-w-6xl">
                  <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <span className="text-lg font-bold tracking-tight" style={{ color: p.text }}>
                      Rogue<span style={{ color: p.accent }}>Code</span>
                    </span>
                    <div className="flex gap-6 text-sm" style={{ color: p.dim }}>
                      <a href="#" className="hover:opacity-70 transition-opacity">Twitter</a>
                      <a href="#" className="hover:opacity-70 transition-opacity">LinkedIn</a>
                      <a href="#" className="hover:opacity-70 transition-opacity">GitHub</a>
                    </div>
                  </div>
                  <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm sm:flex-row"
                    style={{ borderColor: p.border2, color: p.dim }}>
                    <p>&copy; 2026 Rogue Code. All rights reserved.</p>
                    <div className="flex gap-6">
                      <a href="#" className="hover:opacity-70 transition-opacity">Privacy</a>
                      <a href="#" className="hover:opacity-70 transition-opacity">Terms</a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>

            <div className={showContact ? '' : 'hidden'}>
              <ContactPage />
            </div>
          </>
        )}

        <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
        <Toaster richColors position="bottom-right" />
      </motion.div>
    </div>
  )
}

export default App
