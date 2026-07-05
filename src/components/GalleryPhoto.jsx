import { motion } from 'framer-motion'

export default function GalleryPhoto({ src, alt, className, rotate = 0, offsetX = 0, offsetY = 0, width = 'w-64 sm:w-72', aspect = 'aspect-[4/3]', from = 'left', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === 'left' ? -60 : 60, y: 40, rotate: -rotate }}
      whileInView={{ opacity: 1, x: offsetX, y: offsetY, rotate }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={`relative overflow-hidden rounded-sm ${width} ${className || ''}`}
      style={{ transform: `translate(${offsetX}px, ${offsetY}px)` }}
    >
      <div className={`${aspect} overflow-hidden`}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 border border-white/5 rounded-sm pointer-events-none" />
    </motion.div>
  )
}

export function GalleryFrame({ children, className, rotate = 0, width = 'w-72', delay = 0, from = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from === 'left' ? -60 : 60, rotate: -rotate }}
      whileInView={{ opacity: 1, x: 0, rotate }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={`relative ${width} ${className || ''}`}
    >
      <div className="relative overflow-hidden rounded-sm border border-white/10 bg-obsidian p-2 shadow-xl">
        {children}
      </div>
    </motion.div>
  )
}
