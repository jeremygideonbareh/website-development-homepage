import { useRef, useState } from 'react'
import { useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion'

export function useTiltEffect({ tiltRange = 3, stiffness = 250, damping = 25, spotlightColor, spotlightSize = '350px' } = {}) {
  const cardRef = useRef(null)
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useTransform(mouseY, [0, 1], [tiltRange, -tiltRange])
  const rotateY = useTransform(mouseX, [0, 1], [-tiltRange, tiltRange])
  const springX = useSpring(rotateX, { stiffness, damping })
  const springY = useSpring(rotateY, { stiffness, damping })

  const sx = useTransform(mouseX, [0, 1], [0, 100])
  const sy = useTransform(mouseY, [0, 1], [0, 100])
  const spotlightBg = useMotionTemplate`radial-gradient(${spotlightSize} circle at ${sx}% ${sy}%, ${spotlightColor || 'transparent'}, transparent 60%)`

  function handleMouseMove(e) {
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }

  function handleMouseEnter() {
    setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return {
    cardRef,
    isHovered,
    tiltStyle: {
      rotateX: springX,
      rotateY: springY,
      transformStyle: 'preserve-3d',
    },
    spotlightBg,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  }
}
