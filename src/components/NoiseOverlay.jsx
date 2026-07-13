import { useEffect, useRef } from 'react'

export default function NoiseOverlay() {
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    let animating = true
    let frameId = null
    
    function reduceMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    
    const ctx = canvas.getContext('2d')
    let w, h
    
    function resize() {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * 0.5
      canvas.height = h * 0.5
    }
    
    resize()
    
    function drawNoise() {
      if (!animating) return
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
      if (!reduceMotion()) {
        frameId = setTimeout(() => requestAnimationFrame(drawNoise), 250)
      }
    }
    
    drawNoise()
    
    const observer = new IntersectionObserver(([entry]) => {
      animating = entry.isIntersecting
      if (animating) drawNoise()
    })
    observer.observe(canvas)
    
    window.addEventListener('resize', resize)
    
    return () => {
      animating = false
      clearTimeout(frameId)
      observer.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9997]"
      style={{ opacity: 0.03, width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  )
}
