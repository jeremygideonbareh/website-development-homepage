import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorGlow() {
  const isTouchDevice = useRef(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 })
  
  const glowX = useMotionValue(-100)
  const glowY = useMotionValue(-100)
  const glowSpringX = useSpring(glowX, { stiffness: 100, damping: 15 })
  const glowSpringY = useSpring(glowY, { stiffness: 100, damping: 15 })
  
  useEffect(() => {
    if ('ontouchstart' in window) {
      isTouchDevice.current = true
      return
    }
    
    function handleMouseMove(e) {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      glowX.set(e.clientX)
      glowY.set(e.clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY, glowX, glowY])
  
  if (isTouchDevice.current) return null
  
  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{
          width: 6, height: 6,
          borderRadius: '50%',
          backgroundColor: '#FF6B4A',
          x: springX, y: springY,
          translateX: '-50%', translateY: '-50%',
        }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{
          width: 40, height: 40,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,74,0.3), transparent 70%)',
          x: glowSpringX, y: glowSpringY,
          translateX: '-50%', translateY: '-50%',
        }}
      />
    </>
  )
}
