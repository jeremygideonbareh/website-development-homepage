'use client'
import { useEffect, useRef } from 'react'

interface AuroraBackgroundProps {
  className?: string
}

export default function AuroraBackground({ className = '' }: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let time = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      time += 0.003
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2))
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2))

      ctx.clearRect(0, 0, w, h)

      const colors = [
        [16, 9, 4],     // #100904 — base
        [220, 80, 0],   // #dc5000 — burnt sienna
        [108, 95, 81],  // #6c5f51 — muted
        [255, 237, 215],// #ffedd7 — warm cream
      ]

      for (let i = 0; i < 4; i++) {
        const cx = w * 0.3 + Math.sin(time * 0.7 + i * 1.5) * w * 0.35
        const cy = h * 0.3 + Math.cos(time * 0.5 + i * 2.1) * h * 0.25
        const rx = w * 0.35 + Math.sin(time * 0.3 + i * 1.2) * w * 0.12
        const ry = h * 0.25 + Math.cos(time * 0.4 + i * 1.8) * h * 0.08

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry))
        const [r, g, b] = colors[i]
        grad.addColorStop(0, `rgba(${r},${g},${b},${0.06 + Math.sin(time + i) * 0.02})`)
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${0.03 + Math.sin(time * 0.8 + i * 1.3) * 0.015})`)
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`)

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
