import { useEffect } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export function useMouseParallax({ factor = 0.05 } = {}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })
  
  const x = useTransform(springX, (v) => v * factor)
  const y = useTransform(springY, (v) => v * factor)
  
  useEffect(() => {
    function handleMouseMove(e) {
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])
  
  return { style: { x, y } }
}
