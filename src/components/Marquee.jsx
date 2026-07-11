import { useMotionValue, animate, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

const techStack = [
  'React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'Next.js',
  'Tailwind CSS', 'Three.js', 'Framer Motion', 'OpenAI', 'LangChain',
  'Docker', 'Supabase', 'Cloudflare',
]

export default function Marquee({ speed = 40, className }) {
  const x = useMotionValue(0)
  const ref = useRef(null)

  useEffect(() => {
    const controls = animate(x, [0, -ref.current.scrollWidth / 2], {
      ease: 'linear',
      duration: speed,
      repeat: Infinity,
    })
    return controls.stop
  }, [x, speed])

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div ref={ref} style={{ x }} className="flex gap-8 w-max">
        {[...techStack, ...techStack].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-sm font-medium tracking-wide uppercase"
            style={{ color: 'rgba(225, 224, 204, 0.4)' }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
