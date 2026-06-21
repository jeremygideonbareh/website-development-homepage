import { motion } from 'framer-motion'
import AdamHands from './AdamHands'

function AvailabilityBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center gap-2 font-aeonik font-normal text-caption text-frost"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400/75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
      </span>
      2/5 spots left for april
    </motion.div>
  )
}

export default function HyperstudioHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-0"
      style={{ backgroundColor: '#101010' }}
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-[900px] mx-auto">
        <AvailabilityBadge />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          className="font-aeonik font-normal text-display text-frost text-center max-w-[900px] mx-auto leading-[0.95] tracking-[-0.69px]"
        >
          Premium Web Engineering &amp; Spatial Design
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="font-aeonik font-normal text-body text-smoke text-center max-w-[600px] leading-[1.5]"
        >
          Production-grade React, WebGL, and AI-native websites shipped in 30 days — not months.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
        >
          <button
            onClick={() => window.open('https://calendly.com', '_blank')}
            className="font-aeonik font-bold text-caption uppercase text-obsidian bg-white px-5 py-2.5 rounded-button hover:bg-white/90 transition-all duration-200 tracking-[-0.011em]"
          >
            Start Now
          </button>
          <button
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
            className="font-aeonik font-bold text-caption uppercase text-frost bg-transparent border border-silver px-5 py-2.5 rounded-button hover:bg-white/5 transition-all duration-200 tracking-[-0.011em]"
          >
            View Work
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="w-full mt-12"
      >
        <AdamHands />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="font-input text-caption text-graphite tracking-[0.2em] uppercase pb-8 text-center"
      >
        scroll to explore
      </motion.p>
    </section>
  )
}
