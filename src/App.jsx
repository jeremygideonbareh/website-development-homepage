import { useState, useEffect, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft, Sun, Moon,
} from 'lucide-react'
import Loader from './components/Loader'
import CursorGlow from './components/CursorGlow'
import NoiseOverlay from './components/NoiseOverlay'
import LanguageSwitcher from './i18n/LanguageSwitcher'
import PrismaHero from './components/ui/prisma-hero'
import ServicesSection from './components/ServicesSection'
import TeamShowcase from './components/TeamShowcase'
import WhyUsSection from './components/WhyUsSection'
import { BookingModal } from './components/BookingModal'
import CookieConsent from './components/CookieConsent'
import ExitIntentPopup from './components/ExitIntentPopup'
import AnimatedBeamTimeline from './components/AnimatedBeamTimeline'
import { WordReveal, CharReveal, SectionEyebrow } from './components/RevealText'
import GalleryPhoto from './components/GalleryPhoto'

import CaseStudiesSection from './components/CaseStudiesSection'
import ScrambleText from './components/ui/ScrambleText'
import PricingSection from './components/PricingSection'
import FAQSection from './components/FAQSection'
import Testimonials from './components/ui/testimonials'
const CaseStudyPage = lazy(() => import('./components/CaseStudyPage'))
const AdminPage = lazy(() => import('./components/AdminPage'))
const SalesPricingPage = lazy(() => import('./components/SalesPricingPage'))
const PrivacyPage = lazy(() => import('./components/PrivacyPage'))
const TermsPage = lazy(() => import('./components/TermsPage'))
const ExamplesPage = lazy(() => import('./components/ExamplesPage'))
const AboutUs = lazy(() => import('./components/AboutUs'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))
const ServicePage = lazy(() => import('./components/ServicePage'))
const BlogListLazy = lazy(() => import('./components/BlogPage').then(m => ({ default: m.BlogList })))
const BlogPage = lazy(() => import('./components/BlogPage'))
const ContactPageLazy = lazy(() => import('./components/ui/contact-page').then(m => ({ default: m.ContactPage })))
import { HomeSeo, PageSeo } from './components/Seo'

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
  const [showContact, setShowContact] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showSalesPricing, setShowSalesPricing] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('page') === 'sales-pricing'
  })
  const [showAdmin, setShowAdmin] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('page') === 'admin'
  })
  const [showBlog, setShowBlog] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('page') === 'blog'
  })
  const [blogSlug, setBlogSlug] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('page') === 'blog' ? params.get('slug') : null
  })
  const [caseStudySlug, setCaseStudySlug] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('page') === 'case' ? params.get('slug') : null
  })
  const [serviceSlug, setServiceSlug] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('page') === 'service' ? params.get('slug') : null
  })
  const knownPages = ['admin', 'sales-pricing', 'privacy', 'terms', 'case', 'blog', 'service']
  const [showNotFound, setShowNotFound] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const page = params.get('page')
    return page && !knownPages.includes(page)
  })
  const [theme, setTheme] = useState(() => localStorage.getItem('rogue_theme') || 'night')
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const p = palette[theme]

  return (
    <div className="min-h-screen" style={{ backgroundColor: p.bg }} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Skip to content link — visible on focus for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold focus:text-white focus:bg-[#FF6B4A] focus:outline-none focus:ring-2 focus:ring-white"
        style={{ position: 'absolute', left: '-9999px' }}
        onFocus={(e) => { e.target.style.position = 'fixed'; e.target.style.left = '16px' }}
        onBlur={(e) => { e.target.style.position = 'absolute'; e.target.style.left = '-9999px' }}
      >
        Skip to main content
      </a>
      <div id="main-content" />
      <CursorGlow />
      <NoiseOverlay />
      {!showExamples && !showAbout && !showContact && !showSalesPricing && !showPrivacy && !showTerms && !showAdmin && !caseStudySlug && !showNotFound && !showBlog && !blogSlug && !serviceSlug && <PrismaHero onStartProject={() => setShowBooking(true)} />}

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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <motion.nav
          aria-label="Main navigation"
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
              onClick={() => setTheme(prev => { const next = prev === 'night' ? 'day' : 'night'; localStorage.setItem('rogue_theme', next); return next; })}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border transition-colors"
              style={{
                borderColor: p.border,
                color: p.text,
                touchAction: 'manipulation',
              }}
              aria-label={t('nav.theme')}
            >
              {theme === 'night' ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <LanguageSwitcher color={p.text} border={p.border} />
            <button
              onClick={() => { setShowAbout(!showAbout); setShowContact(false); }}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full border transition-colors"
              style={{
                borderColor: p.border,
                color: p.text,
                touchAction: 'manipulation',
              }}
              aria-label={showAbout ? t('nav.back') : t('nav.about')}
            >
              {showAbout && <ArrowLeft className="size-4" />}
              {showAbout ? t('nav.back') : t('nav.about')}
            </button>
            <button
              onClick={() => setShowContact(!showContact)}
              className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-colors"
              style={{
                backgroundColor: p.text,
                color: p.bg,
                touchAction: 'manipulation',
              }}
              aria-label={showContact ? t('nav.back') : t('nav.startProject')}
            >
              {showContact && <ArrowLeft className="size-4" />}
              {showContact ? t('nav.back') : t('nav.startProject')}
            </button>
          </div>
        </motion.nav>

        <Suspense fallback={<div style={{ minHeight: '100vh', backgroundColor: '#0A0A0A' }} />}>
        {serviceSlug ? (
          <ServicePage slug={serviceSlug} onBack={() => setServiceSlug(null)} onBook={() => setShowBooking(true)} />
        ) : caseStudySlug ? (
          <CaseStudyPage slug={caseStudySlug} onBack={() => setCaseStudySlug(null)} />
        ) : blogSlug ? (
          <BlogPage slug={blogSlug} onBack={() => setBlogSlug(null)} />
        ) : showBlog ? (
          <>
            <PageSeo title={t('blog.heading')} description={t('blog.description')} path="/?page=blog" />
            <BlogListLazy onViewPost={(s) => setBlogSlug(s)} onBack={() => setShowBlog(false)} />
          </>
        ) : showAdmin ? (
          <>
            <PageSeo title="Admin Dashboard" description="Lead management dashboard for Rogue Code" path="/?page=admin" />
            <AdminPage onBack={() => setShowAdmin(false)} />
          </>
        ) : showSalesPricing ? (
          <SalesPricingPage onBack={() => setShowSalesPricing(false)} />
        ) : showPrivacy ? (
          <PrivacyPage onBack={() => setShowPrivacy(false)} />
        ) : showTerms ? (
          <TermsPage onBack={() => setShowTerms(false)} />
        ) : showExamples ? (
          <>
            <PageSeo title="Our Work" description="Case studies and projects by Rogue Code — web development, AI automation, and mobile apps." path="/?page=examples" />
            <ExamplesPage onBack={() => setShowExamples(false)} />
          </>
        ) : showNotFound ? (
          <NotFoundPage onBack={() => setShowNotFound(false)} />
        ) : showAbout ? (
          <>
            <PageSeo title={t('nav.about')} description={t('about.description')} path="/?page=about" />
            <AboutUs theme={theme} onBack={() => setShowAbout(false)} />
          </>
        ) : (
          <>
            <HomeSeo />
            <div className={showContact ? 'hidden' : ''} style={{ paddingTop: '100dvh' }}>
              {/* Brand Story */}
              <section aria-label="Our philosophy" className="px-4 sm:px-6 py-24 md:px-12 relative z-10" style={{ backgroundColor: p.bg }}>
                <div className="mx-auto max-w-6xl space-y-48">

                  {/* Philosophy — text left, photo right */}
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-120px' }}
                    transition={{ duration: 0.8 }}
                    className="grid md:grid-cols-2 gap-8 md:gap-20 items-center"
                  >
                    <div className="max-w-xl w-full">
                      <SectionEyebrow><ScrambleText text="How We Build" delay={0.3} /></SectionEyebrow>
                      <h2 className="text-3xl sm:text-4xl font-bold mt-6 leading-tight break-words" style={{ color: p.text }}>
                        <CharReveal delay={0.2}>
                          Why does Rogue Code build websites from scratch instead of using templates?
                        </CharReveal>
                      </h2>
                      <p className="mt-8 text-base leading-relaxed" style={{ color: p.muted }}>
                        <WordReveal delay={0.6}>
                          Because every brand deserves a digital presence engineered for its specific goals, audience, and market. Rogue Code builds custom websites using React, Next.js, and TypeScript — no WordPress themes, no page builders, no compromises. Jeremy Gideon Bareh founded the agency in 2024 on the principle that production-grade code outperforms template-based sites in speed, security, and conversion. The result: websites that load in under two seconds, score 95+ on Lighthouse, and rank higher in Google Search results.
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
                    <div className="max-w-xl w-full md:ml-auto md:text-right">
                      <h2 className="text-3xl sm:text-4xl font-bold leading-tight break-words" style={{ color: p.text }}>
                        <CharReveal delay={0.3}>
                          How does Rogue Code ship websites faster than traditional agencies?
                        </CharReveal>
                      </h2>
                      <p className="mt-8 text-base leading-relaxed" style={{ color: p.muted }}>
                        <WordReveal delay={0.7}>
                          Rogue Code combines AI-native engineering workflows with hand-crafted frontend development to ship production-grade websites in 2-4 weeks. Traditional agencies average 3-6 months for the same scope. The stack pairs React 19 with Framer Motion animations, Three.js 3D graphics, and Tailwind CSS for pixel-perfect responsive design. Every project includes Cloudflare deployment, automated CI/CD via GitHub, and Plausible analytics integration — all owned by the client with zero recurring license fees.
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
                    <div className="max-w-xl w-full">
                      <h2 className="text-3xl sm:text-4xl font-bold leading-tight break-words" style={{ color: p.text }}>
                        <CharReveal delay={0.3}>
                          What does Rogue Code handle from concept to launch?
                        </CharReveal>
                      </h2>
                      <p className="mt-8 text-base leading-relaxed" style={{ color: p.muted }}>
                        <WordReveal delay={0.7}>
                          Rogue Code manages every phase of digital product delivery — strategy, UI/UX design in Figma, frontend engineering with React and TypeScript, backend API development with Node.js and Python, AI agent integration via LangChain, custom animation with GSAP and Framer Motion, performance optimization targeting 95+ Lighthouse scores, and Cloudflare Workers deployment with automated CI/CD. One project manager coordinates everything. Clients provide feedback through weekly demos, receive full source code ownership, and launch with zero platform lock-in.
                        </WordReveal>
                      </p>
                    </div>
                    <GalleryPhoto src={cinematicPhotos[2]} alt="" width="w-full" rotate={-4} offsetX={0} offsetY={0} from="right" delay={0.3} />
                  </motion.div>

                </div>
              </section>

              {/* Stats */}
              <section aria-label="Company statistics" className="px-4 sm:px-6 pt-24 md:px-12 relative z-10">
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

              <ServicesSection isDay={theme === 'day'} onShowExamples={() => setShowExamples(true)} onViewService={(slug) => setServiceSlug(slug)} />

              <CaseStudiesSection isDay={theme === 'day'} onViewProject={(slug) => setCaseStudySlug(slug)} />

              <AnimatedBeamTimeline isDay={theme === 'day'} />

              <WhyUsSection isDay={theme === 'day'} />

              <PricingSection isDay={theme === 'day'} onBook={() => setShowBooking(true)} />

              <FAQSection isDay={theme === 'day'} />

              <Testimonials />

              <section style={{ backgroundColor: '#0A0A0A' }}>
                <TeamShowcase isDay={theme === 'day'} />
              </section>

              {/* CTA — Full-bleed photo */}
              <section aria-label="Call to action" className="px-4 sm:px-6 py-32 md:px-12 relative z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="relative rounded-2xl overflow-hidden border"
                  style={{ borderColor: p.border }}
                >
                  <div className="absolute inset-0">
                    <img src={cinematicPhotos[9]} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
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
                      {t('cta.heading')}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 }}
                      className="mt-6 text-lg max-w-xl mx-auto"
                      style={{ color: p.muted }}
                    >
                      {t('cta.subtitle')}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.25 }}
                      className="mt-3 text-sm sm:text-base"
                      style={{ color: p.dim }}
                    >
                      {t('cta.attribution')}
                    </motion.p>
                    <motion.button
                      onClick={() => setShowBooking(true)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.35 }}
                      className="mt-10 px-10 py-4 text-base font-semibold rounded-full transition-colors shadow-lg"
                      style={{ backgroundColor: p.accent, color: '#FFFFFF' }}
                    >
                      {t('cta.button')}
                    </motion.button>
                  </div>
                </motion.div>
              </section>

              {/* Footer */}
              <footer className="border-t px-4 sm:px-6 py-16 md:px-12 relative z-10" style={{ borderColor: p.border }}>
                <div className="mx-auto max-w-6xl">
                  <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <span className="text-lg font-bold tracking-tight" style={{ color: p.text }}>
                      Rogue<span style={{ color: p.accent }}>Code</span>
                    </span>
                    <div className="flex gap-6 text-sm" style={{ color: p.dim }}>
                      <a href="https://twitter.com/roguecodes" className="hover:opacity-70 transition-opacity" aria-label="Twitter">Twitter</a>
                      <a href="https://linkedin.com/company/roguecodes" className="hover:opacity-70 transition-opacity" aria-label="LinkedIn">LinkedIn</a>
                      <a href="https://github.com/jeremygideonbareh" className="hover:opacity-70 transition-opacity" aria-label="GitHub">GitHub</a>
                      <button onClick={() => { window.location.href = '/?page=blog' }} className="hover:opacity-70 transition-opacity bg-transparent border-0 p-0 cursor-pointer text-inherit text-sm">{t('caseStudies.heading')}</button>
                    </div>
                  </div>
                  <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-8 text-sm sm:flex-row"
                    style={{ borderColor: p.border2, color: p.dim }}>
                    <p>{t('footer.rights')}</p>
                    <div className="flex gap-6">
                      <button onClick={() => setShowPrivacy(true)} className="hover:opacity-70 transition-opacity bg-transparent border-0 p-0 cursor-pointer text-inherit text-sm">{t('footer.privacy')}</button>
                      <button onClick={() => setShowTerms(true)} className="hover:opacity-70 transition-opacity bg-transparent border-0 p-0 cursor-pointer text-inherit text-sm">{t('footer.terms')}</button>
                    </div>
                  </div>
                </div>
              </footer>
            </div>

            <div className={showContact ? '' : 'hidden'}>
              <ContactPageLazy />
            </div>
          </>
        )}
        </Suspense>

        <BookingModal open={showBooking} onClose={() => setShowBooking(false)} />
        <Toaster richColors position="bottom-right" />
        <CookieConsent />
        <ExitIntentPopup />
      </motion.div>
    </div>
  )
}

export default App
