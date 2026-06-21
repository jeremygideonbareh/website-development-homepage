import { useEffect, useRef } from 'react'

const IMAGE_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/800px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg'

const CHARS = ['█', '▓', '▒', '░']

export default function AdamHands({ className }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let animId = null
    let time = 0
    let gridData = []
    let ready = false

    const CELL = 8
    const COLS = 100
    const ROWS = Math.round(COLS * 0.625)

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      w = rect.width
      h = rect.height || 500
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (ready) draw()
    }

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = IMAGE_URL

    img.onload = () => {
      const off = document.createElement('canvas')
      const offCtx = off.getContext('2d')
      off.width = COLS
      off.height = ROWS
      offCtx.drawImage(img, 0, 0, COLS, ROWS)

      const imageData = offCtx.getImageData(0, 0, COLS, ROWS)
      const data = imageData.data

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const i = (y * COLS + x) * 4
          const r = data[i], g = data[i + 1], b = data[i + 2]
          const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255
          if (brightness > 0.35) {
            const threshold = 0.35 + (1 - brightness) * 0.25
            if (Math.random() > threshold) {
              const ci = Math.min(3, Math.floor((1 - brightness) * 4))
              gridData.push({ x, y, char: CHARS[ci], b: brightness })
            }
          }
        }
      }
      ready = true
      resize()
    }

    img.onerror = () => {
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const nx = x / COLS
          const ny = y / ROWS
          const inGod = godShape(nx, ny)
          const inAdam = adamShape(nx, ny)
          if (inGod || inAdam) {
            const ci = Math.floor(Math.random() * 4)
            gridData.push({ x, y, char: CHARS[ci], b: 0.5 + Math.random() * 0.4 })
          }
        }
      }
      ready = true
      resize()
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      time += 0.004
      const fadeIn = Math.min(time * 1.5, 1)
      const breath = Math.sin(time) * 2

      const gapX = w * 0.505

      const glow = ctx.createRadialGradient(gapX, h * 0.39, 0, gapX, h * 0.39, 60)
      glow.addColorStop(0, `rgba(231, 197, 154, ${0.08 * fadeIn})`)
      glow.addColorStop(0.5, `rgba(231, 197, 154, ${0.03 * fadeIn})`)
      glow.addColorStop(1, `rgba(231, 197, 154, 0)`)
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      const scaleX = w / COLS
      const scaleY = h / ROWS
      const s = Math.min(scaleX, scaleY)
      const marginX = (w - COLS * s) / 2
      const marginY = (h - ROWS * s) / 2

      ctx.font = `${Math.ceil(s)}px "JetBrains Mono", "Consolas", "Courier New", monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (const cell of gridData) {
        const px = marginX + cell.x * s + s / 2
        const py = marginY + cell.y * s + s / 2 + breath
        const distFromGap = Math.abs(px - gapX)
        const nearTouch = Math.max(0, 1 - distFromGap / 30)
        const baseAlpha = 0.35 + cell.b * 0.5
        ctx.globalAlpha = baseAlpha * fadeIn * (nearTouch > 0.3 ? 1 + nearTouch * 0.4 : 1)
        ctx.fillStyle = '#f3f3f3'
        ctx.fillText(cell.char, px, py)
        if (nearTouch > 0.4) {
          ctx.globalAlpha = 0.06 * nearTouch * fadeIn
          ctx.fillStyle = '#e7c59a'
          ctx.fillText('░', px, py)
        }
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className={`w-full overflow-hidden ${className || ''}`} style={{ height: '500px' }}>
      <canvas ref={canvasRef} className="mx-auto w-full h-full" />
    </div>
  )
}

function godShape(nx, ny) {
  const inPalm = Math.hypot((nx - 0.18) / 0.12, (ny - 0.55) / 0.14) < 1
  const inIndex = nx > 0.28 && nx < 0.48 && ny > 0.21 && ny < 0.28
  return inPalm || inIndex
}

function adamShape(nx, ny) {
  const inPalm = Math.hypot((nx - 0.82) / 0.12, (ny - 0.55) / 0.14) < 1
  const inIndex = nx > 0.52 && nx < 0.72 && ny > 0.21 && ny < 0.28
  return inPalm || inIndex
}
