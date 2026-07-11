import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScrambleText({ text, className, delay = 0, speed = 0.03 }) {
  const [displayed, setDisplayed] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    if (!isRevealed) return
    let frame = 0
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/'
    const timer = setInterval(() => {
      frame++
      setDisplayed(
        text.split('').map((char, i) =>
          frame > i ? text[i] : chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      )
      if (frame >= text.length) clearInterval(timer)
    }, 60 + speed * 1000)
    return () => clearInterval(timer)
  }, [isRevealed, text, speed])

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      onViewportEnter={() => setTimeout(() => setIsRevealed(true), delay * 1000)}
    >
      {displayed || '\u00A0'}
    </motion.span>
  )
}
