import { motion } from 'framer-motion'

export function WordReveal({ children, className, delay = 0 }) {
  const segments = children.split(/(\s+)/)
  let wordIndex = 0
  return (
    <span className={className} style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
      {segments.map((seg, i) => {
        if (seg.match(/^\s+$/)) {
          return <span key={i} className="inline-block whitespace-pre">{'\u00A0'}</span>
        }
        const currentWordIndex = wordIndex++
        return (
          <span key={i} className="inline-block whitespace-pre">
            <motion.span
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: delay + currentWordIndex * 0.04, ease: [0.25, 0.4, 0.25, 1] }}
              className="inline-block"
            >
              {seg}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}

export function CharReveal({ children, className, delay = 0 }) {
  const segments = children.split(/(\s+)/)
  let flatIndex = 0
  return (
    <span className={className} style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
      {segments.map((seg, i) => {
        if (seg.match(/^\s+$/)) {
          flatIndex++ // whitespace token takes one index slot
          return <span key={i} className="inline-block whitespace-pre">{'\u00A0'}</span>
        }
        return (
          <span key={i} className="inline-block whitespace-pre">
            {seg.split('').map((char, j) => {
              const charIndex = flatIndex++
              return (
                <motion.span
                  key={j}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, delay: delay + charIndex * 0.015, ease: [0.25, 0.4, 0.25, 1] }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}

export function SectionEyebrow({ children, delay = 0, color }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="font-input text-caption uppercase tracking-[0.15em]"
      style={color ? { color } : {}}
    >
      {children}
    </motion.p>
  )
}

export function SectionHeading({ children, className, delay = 0 }) {
  return (
    <h2 className={`font-aeonik font-normal ${className || ''}`}>
      <CharReveal delay={delay}>{children}</CharReveal>
    </h2>
  )
}

const kineticVariants = {
  spring: (i) => ({
    initial: { opacity: 0, scale: 0.3, rotate: -8, y: 20 },
    whileInView: { opacity: 1, scale: 1, rotate: 0, y: 0 },
    transition: { type: 'spring', stiffness: 200, damping: 12, delay: i * 0.025 },
  }),
  wave: (i) => ({
    initial: { opacity: 0, y: -40, scale: 0.8 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, delay: i * 0.03, ease: [0.25, 0.4, 0.25, 1] },
  }),
  scatter: (i) => {
    const angle = (i * 27) % 360
    const rad = (angle * Math.PI) / 180
    const dist = 60
    return {
      initial: { opacity: 0, x: Math.cos(rad) * dist, y: Math.sin(rad) * dist, scale: 0 },
      whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
      transition: { type: 'spring', stiffness: 150, damping: 14, delay: i * 0.02 },
    }
  },
  typewriter: (i) => ({
    initial: { opacity: 0, x: -10 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.15, delay: i * 0.04, ease: 'easeOut' },
  }),
}

export function KineticText({ children, mode = 'spring', delay = 0, className }) {
  const segments = children.split(/(\s+)/)
  const v = kineticVariants[mode] || kineticVariants.spring
  let flatIndex = 0

  return (
    <span className={className} style={{ display: 'inline', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word' }}>
      {segments.map((seg, i) => {
        if (seg.match(/^\s+$/)) {
          const anim = v(flatIndex++)
          return (
            <motion.span
              key={i}
              initial={anim.initial}
              whileInView={anim.whileInView}
              viewport={{ once: true, margin: '-60px' }}
              transition={anim.transition ? { ...anim.transition, delay: (anim.transition.delay || 0) + delay } : undefined}
              style={{ display: 'inline-block' }}
            >
              {'\u00A0'}
            </motion.span>
          )
        }
        return (
          <span key={i} className="inline-block whitespace-pre">
            {seg.split('').map((char, j) => {
              const anim = v(flatIndex++)
              return (
                <motion.span
                  key={j}
                  initial={anim.initial}
                  whileInView={anim.whileInView}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={anim.transition ? { ...anim.transition, delay: (anim.transition.delay || 0) + delay } : undefined}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </span>
  )
}
