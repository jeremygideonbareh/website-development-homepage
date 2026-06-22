import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HorizontalScrollSection({ children, className }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(children.length - 1) * 100}%`])

  return (
    <section ref={ref} className={`relative ${className || ''}`} style={{ height: `${children.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex will-change-transform">
          {children.map((child, i) => (
            <div key={i} className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12">
              {child}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
