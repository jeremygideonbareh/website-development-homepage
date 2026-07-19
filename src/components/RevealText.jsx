import { motion } from 'framer-motion'

const wordVariant = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
}

export function WordReveal({ children, className, delay = 0 }) {
  const segments = children.split(/(\s+)/)
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: delay } },
  }
  return (
    <motion.span
      className={className}
      style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      {segments.map((seg, i) => {
        if (seg.match(/^\s+$/)) {
          return <span key={i} className="inline-block whitespace-pre">{'\u00A0'}</span>
        }
        return (
          <span key={i} className="inline-block whitespace-pre">
            <motion.span variants={wordVariant} className="inline-block">
              {seg}
            </motion.span>
          </span>
        )
      })}
    </motion.span>
  )
}

const charVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] } },
}

export function CharReveal({ children, className, delay = 0 }) {
  const segments = children.split(/(\s+)/)
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.015, delayChildren: delay } },
  }
  return (
    <motion.span
      className={className}
      style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
    >
      {segments.map((seg, i) => {
        if (seg.match(/^\s+$/)) {
          return <span key={i} className="inline-block whitespace-pre">{'\u00A0'}</span>
        }
        return (
          <span key={i} className="inline-block whitespace-pre">
            {seg.split('').map((char, j) => (
              <motion.span key={j} variants={charVariant} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
        )
      })}
    </motion.span>
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

function buildChildVariant(anim) {
  if (!anim || !anim.transition) {
    return {
      hidden: anim?.initial || {},
      visible: { ...(anim?.whileInView || {}), transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
    }
  }
  const { delay: _delay, ...restTransition } = anim.transition
  return {
    hidden: anim.initial,
    visible: { ...anim.whileInView, transition: restTransition },
  }
}

const containerConfigs = {
  spring: { staggerChildren: 0.025 },
  wave: { staggerChildren: 0.03 },
  scatter: { staggerChildren: 0.02 },
  typewriter: { staggerChildren: 0.04 },
}

export function KineticText({ children, mode = 'spring', delay = 0, className }) {
  const segments = children.split(/(\s+)/)
  const v = kineticVariants[mode] || kineticVariants.spring
  const cfg = containerConfigs[mode] || containerConfigs.spring
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: cfg.staggerChildren, delayChildren: delay } },
  }
  let flatIndex = 0

  return (
    <motion.span
      className={className}
      style={{ display: 'inline', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={container}
    >
      {segments.map((seg, i) => {
        if (seg.match(/^\s+$/)) {
          const childVariant = buildChildVariant(v(flatIndex++))
          return (
            <motion.span key={i} variants={childVariant} style={{ display: 'inline-block' }}>
              {'\u00A0'}
            </motion.span>
          )
        }
        return (
          <span key={i} className="inline-block whitespace-pre">
            {seg.split('').map((char, j) => {
              const childVariant = buildChildVariant(v(flatIndex++))
              return (
                <motion.span key={j} variants={childVariant} style={{ display: 'inline-block' }}>
                  {char}
                </motion.span>
              )
            })}
          </span>
        )
      })}
    </motion.span>
  )
}
