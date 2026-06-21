import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import {
  ArrowLeft, Calendar, FileText, Code,
} from 'lucide-react'
import Loader from './components/Loader'
import MountEverestScene from './components/MountEverestScene'
import Services from './components/ui/services'
import StarryBackground from './components/StarryBackground'
import { ContactPage } from './components/ui/contact-page'
import { BookingModal } from './components/BookingModal'
import RadialOrbitalTimeline from './components/ui/radial-orbital-timeline'
import { WordReveal, CharReveal, SectionEyebrow, SectionHeading } from './components/RevealText'

import ExamplesPage from './components/ExamplesPage'
import Home from './components/ui/hero-ascii'
import { InteractiveRobotSpline } from './components/ui/interactive-3d-robot'

const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

const navVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '3x', label: 'Faster Than In-House' },
  { value: '100%', label: 'Code Ownership' },
]

const whyUs = [
  {
    title: 'AI-Native Team',
    desc: 'We don\'t bolt AI on. We build with it from day zero — agents, pipelines, and models are core to every project.',
  },
  {
    title: '3x Faster Delivery',
    desc: 'Our workflows and AI tooling slash dev time without cutting corners. You ship in weeks, not months.',
  },
  {
    title: 'One Point of Contact',
    desc: 'A dedicated project manager handles everything — communication, timelines, changes. No runaround.',
  },
  {
    title: 'Global Talent',
    desc: 'Hand-picked engineers across time zones keep your project moving around the clock.',
  },
]

const timelineData = [
  {
    id: 1,
    title: 'Week 1: Architecture & UI Mapping',
    date: 'Days 1–7',
    content: 'We translate your business goals into a technical roadmap and wireframe the user journey.',
    category: 'Architecture',
    icon: Calendar,
    relatedIds: [2],
    status: 'completed',
    energy: 100,
  },
  {
    id: 2,
    title: 'Week 2: Core Engineering',
    date: 'Days 8–14',
    content: 'Our team builds the React/Next.js foundation, focusing on millisecond load times and state management.',
    category: 'Engineering',
    icon: FileText,
    relatedIds: [1, 3],
    status: 'in-progress',
    energy: 60,
  },
  {
    id: 3,
    title: 'Week 3: Interactive & 3D Integration',
    date: 'Days 15–21',
    content: 'We weave in Three.js environments, GSAP animations, and custom features to establish the ApexAI vibe.',
    category: 'Integration',
    icon: Code,
    relatedIds: [2, 4],
    status: 'pending',
    energy: 40,
  },
  {
    id: 4,
    title: 'Week 4: QA & Deployment',
    date: 'Days 22–30',
    content: 'Rigorous stress-testing across devices, followed by a live launch and complete source-code handoff.',
    category: 'Delivery',
    icon: Code,
    relatedIds: [3],
    status: 'pending',
    energy: 20,
  },
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContact, setShowContact] = useState(false)
  const [showBooking, setShowBooking] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [showExamples, setShowExamples] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen text-frost" style={{ backgroundColor: '#101010' }}>
      {!showExamples && !showAbout && !showContact && <MountEverestScene />}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
      >
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-6 py-4 md:px-12" style={{ backgroundColor: 'rgba(16,16,16,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(33,33,33,0.8)' }}
      >

        <div className="flex items-center gap-3">
          <button
            onClick={() => { setShowAbout(!showAbout); setShowContact(false); }}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
          >
            {showAbout && <ArrowLeft className="size-4" />}
            {showAbout ? 'Back' : 'About Us'}
          </button>
          <button
            onClick={() => setShowContact(!showContact)}
            className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors"
          >
            {showContact && <ArrowLeft className="size-4" />}
            {showContact ? 'Back' : 'Start a Project'}
          </button>
        </div>
      </motion.nav>

      {showExamples ? (
        <ExamplesPage onBack={() => setShowExamples(false)} />
      ) : showAbout ? (
        <Home />
      ) : (
        <>

      <div className={showContact ? 'hidden' : ''} style={{ paddingTop: '100vh' }}>
          {/* ─── Scroll Narrative: Brand Story ─── */}
          <section className="px-6 py-32 md:px-12 relative z-10" style={{ backgroundColor: '#101010' }}>
            <div className="mx-auto max-w-5xl space-y-48">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <SectionEyebrow>Our Philosophy</SectionEyebrow>
                <h2 className="font-aeonik font-normal text-heading-lg text-frost mt-6 leading-[1.05] tracking-[-0.48px]">
                  <CharReveal delay={0.2}>
                    We believe the web deserves better than templates.
                  </CharReveal>
                </h2>
                <p className="font-aeonik font-normal text-body text-smoke mt-8 leading-[1.7] max-w-2xl">
                  <WordReveal delay={0.6}>
                    Every brand is unique. Your website should be too. We engineer custom digital experiences from the ground up — no themes, no page builders, no compromises.
                  </WordReveal>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl ml-auto text-right"
              >
                <SectionEyebrow delay={0.1}>Our Approach</SectionEyebrow>
                <h2 className="font-aeonik font-normal text-heading-lg text-frost mt-6 leading-[1.05] tracking-[-0.48px]">
                  <CharReveal delay={0.3}>
                    Speed without sacrifice.
                  </CharReveal>
                </h2>
                <p className="font-aeonik font-normal text-body text-smoke mt-8 leading-[1.7] max-w-2xl ml-auto">
                  <WordReveal delay={0.7}>
                    We combine AI-native workflows with hand-crafted engineering to ship in weeks what takes other agencies months. The result: production-grade code that you own, forever.
                  </WordReveal>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <SectionEyebrow delay={0.1}>Our Promise</SectionEyebrow>
                <h2 className="font-aeonik font-normal text-heading-lg text-frost mt-6 leading-[1.05] tracking-[-0.48px]">
                  <CharReveal delay={0.3}>
                    You focus on your business. We build the digital architecture.
                  </CharReveal>
                </h2>
                <p className="font-aeonik font-normal text-body text-smoke mt-8 leading-[1.7] max-w-2xl">
                  <WordReveal delay={0.7}>
                    From concept to deployment, we handle everything — design, engineering, animation, optimization, and launch. One point of contact. Zero overhead.
                  </WordReveal>
                </p>
              </motion.div>
            </div>
          </section>

          <StarryBackground>
            {/* ─── Stats Banner ─── */}
      <section className="px-6 pt-24 md:px-12 relative z-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-sm text-zinc-400 tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Services />

      {/* ─── Robot Background with Overlaid Content ─── */}
      <section className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <InteractiveRobotSpline
            scene={ROBOT_SCENE_URL}
            className="w-full h-full"
          />
        </div>
        <div className="relative z-10 -mt-screen">
          {/* ─── Robot tagline ─── */}
          <section className="px-6 py-24 md:px-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
            >
              AI meets infrastructure
            </motion.h2>
          </section>

          {/* ─── Process Section ─── */}
          <section className="px-6 py-24 md:px-12">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase">
                  How we work
                </p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                  The 30-Day Execution Blueprint
                </h2>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                className="mt-12"
              >
                <RadialOrbitalTimeline timelineData={timelineData} />
              </motion.div>
            </div>
          </section>

          {/* ─── Why Us ─── */}
          <section className="px-6 py-24 md:px-12">
            <div className="mx-auto max-w-6xl">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <p className="text-sm font-medium tracking-widest text-zinc-400 uppercase">
                  Why choose us
                </p>
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl">The Edge</h2>
              </motion.div>
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {whyUs.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/30"
                  >
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="px-6 py-32 md:px-12 text-center relative">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Ready to build something{' '}
            <span className="text-white">that actually works?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg text-zinc-400 max-w-xl mx-auto"
          >
            Stop burning time on agencies that over-promise and under-deliver.
            Let&apos;s ship something real.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <button
              onClick={() => setShowBooking(true)}
              className="px-10 py-4 text-base font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-colors shadow-lg"
            >
              Book a Free Call
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-zinc-800 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <span className="text-lg font-bold tracking-tight">
          Apex<span className="text-white">AI</span>
            </span>
            <div className="flex gap-6 text-sm text-zinc-500">
              <a href="#" className="hover:text-zinc-300 transition-colors">Twitter</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-zinc-300 transition-colors">GitHub</a>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/60 pt-8 text-sm text-zinc-600 sm:flex-row">
            <p>&copy; 2026 ApexAI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-zinc-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>
        </footer>
      </StarryBackground>
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
