import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'sonner'
import {
  ArrowLeft, Calendar, FileText, Code,
} from 'lucide-react'
import Loader from './components/Loader'
import HorizonHeroSection from './components/HorizonHeroSection'
import Services from './components/ui/services'
import StarryBackground from './components/StarryBackground'
import { ContactPage } from './components/ui/contact-page'
import RadialOrbitalTimeline from './components/ui/radial-orbital-timeline'
import { PortfolioGallery } from './components/ui/portfolio-gallery'
import ExamplesPage from './components/ExamplesPage'
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
    title: 'Discovery & Architecture',
    date: 'Step 1',
    content: 'Tell us your vision, and we map out the tech stack.',
    category: 'Discovery',
    icon: Calendar,
    relatedIds: [2],
    status: 'completed',
    energy: 100,
  },
  {
    id: 2,
    title: 'Engineering & Design',
    date: 'Step 2',
    content: 'Our team writes the code and builds the interface.',
    category: 'Engineering',
    icon: FileText,
    relatedIds: [1, 3],
    status: 'in-progress',
    energy: 60,
  },
  {
    id: 3,
    title: 'Deployment & Handoff',
    date: 'Step 3',
    content: 'Go live with full source code ownership.',
    category: 'Delivery',
    icon: Code,
    relatedIds: [2],
    status: 'pending',
    energy: 25,
  },
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContact, setShowContact] = useState(false)
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [showExamples, setShowExamples] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white dark">
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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/60 border-b border-white/5 md:px-12"
      >
        <span className="text-xl font-bold tracking-tight">
              Apex<span className="text-white">AI</span>
        </span>
        <button
          onClick={() => setShowContact(!showContact)}
          className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors"
        >
          {showContact && <ArrowLeft className="size-4" />}
          {showContact ? 'Back' : 'Start a Project'}
        </button>
      </motion.nav>

      {showExamples ? (
        <ExamplesPage onBack={() => setShowExamples(false)} />
      ) : (
        <>

      <div className={showContact ? 'hidden' : ''}>
          <HorizonHeroSection />

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
                  Three steps to start
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
      <section className="px-6 py-32 md:px-12 text-center">
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
            <button className="px-10 py-4 text-base font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-colors shadow-lg">
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

      <Toaster richColors position="bottom-right" />

      {showPortfolio && <PortfolioGallery onClose={() => setShowPortfolio(false)} onViewGallery={() => { setShowPortfolio(false); setShowExamples(true) }} />}
      </motion.div>
    </div>
  )
}

export default App
