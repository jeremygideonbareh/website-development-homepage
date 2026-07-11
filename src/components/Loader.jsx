import { motion } from 'framer-motion'

const letters = 'ROGUE CODE'.split('')

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex items-center justify-center gap-[0.05em]">
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            initial={{
              y: letter === ' ' ? 0 : (Math.random() > 0.5 ? -100 : 100),
              opacity: 0,
              rotate: letter === ' ' ? 0 : (Math.random() > 0.5 ? -40 : 40),
            }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 9,
              mass: 0.8,
              delay: i * 0.07,
            }}
            className="inline-block text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.2em] sm:tracking-[0.35em]"
            style={{ color: '#ffffff' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        className="h-px"
        style={{
          width: 160,
          background: 'linear-gradient(to right, transparent, rgba(255,107,74,0.6), transparent)',
          transformOrigin: 'center',
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        className="text-xs tracking-[0.15em] uppercase"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        Loading&hellip;
      </motion.p>
    </div>
  )
}
