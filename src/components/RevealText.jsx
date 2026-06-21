import { motion } from 'framer-motion'

export function WordReveal({ children, className, delay = 0 }) {
  const words = children.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.25, 0.4, 0.25, 1] }}
          className="inline-block"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  )
}

export function CharReveal({ children, className, delay = 0 }) {
  const chars = children.split('')
  return (
    <span className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: delay + i * 0.015, ease: [0.25, 0.4, 0.25, 1] }}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

export function SectionEyebrow({ children, delay = 0 }) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="font-input text-caption uppercase tracking-[0.15em] text-smoke"
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
