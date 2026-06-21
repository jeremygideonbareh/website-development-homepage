import { useEffect, useRef } from 'react'

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/[]{}|&!?#$%'

export default function AsciiRain({
  className = '',
  density = 0.15,
  speed = 0.5,
  color = '#00ff41',
  fontSize = 14,
  fadeOpacity = 0.08,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId
    let columns = []
    let drops = []
    let frameCount = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      columns = []
      drops = []
      const colCount = Math.floor(w / (fontSize * 0.8))
      for (let i = 0; i < colCount; i++) {
        const col = {
          x: i * (fontSize * 0.8),
          speed: (0.5 + Math.random() * 1.5) * speed,
          chars: [],
        }
        const dropCount = Math.floor((h / fontSize) * density * 2)
        for (let j = 0; j < dropCount; j++) {
          col.chars.push({
            y: -Math.random() * h,
            char: CHARS[Math.floor(Math.random() * CHARS.length)],
            brightness: 0.3 + Math.random() * 0.7,
          })
        }
        columns.push(col)
        drops.push(Math.random() * h)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      frameCount++
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2))
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2))

      ctx.fillStyle = `rgba(10, 10, 10, ${fadeOpacity})`
      ctx.fillRect(0, 0, w, h)

      ctx.font = `${fontSize}px "Courier New", "Consolas", monospace`
      ctx.textAlign = 'center'

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i]
        for (let j = 0; j < col.chars.length; j++) {
          const c = col.chars[j]
          c.y += col.speed
          if (c.y > h + fontSize) {
            c.y = -fontSize * 2
            c.char = CHARS[Math.floor(Math.random() * CHARS.length)]
          }

          if (frameCount % Math.floor(4 + Math.random() * 8) === 0) {
            c.char = CHARS[Math.floor(Math.random() * CHARS.length)]
          }

          const alpha = c.brightness * (1 - (c.y / h))
          if (alpha > 0.02) {
            ctx.fillStyle = `rgba(${parseInt(color.slice(1,3), 16)}, ${parseInt(color.slice(3,5), 16)}, ${parseInt(color.slice(5,7), 16)}, ${alpha * 0.3})`
            ctx.fillText(c.char, col.x, c.y)
          }

          if (j === col.chars.length - 1 && alpha > 0.1) {
            ctx.fillStyle = `rgba(${parseInt(color.slice(1,3), 16)}, ${parseInt(color.slice(3,5), 16)}, ${parseInt(color.slice(5,7), 16)}, ${alpha * 0.8})`
            ctx.fillText(c.char, col.x, c.y)
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [density, speed, color, fontSize, fadeOpacity])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
