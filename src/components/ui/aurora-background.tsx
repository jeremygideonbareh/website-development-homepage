'use client'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AuroraBackgroundProps {
  className?: string
  colors?: Array<[number, number, number]>
  speed?: number
  blobCount?: number
}

export default function AuroraBackground({
  className = '',
  colors = [
    [255, 107, 74],   // #FF6B4A — brand accent orange
    [232, 93, 58],    // #E85D3A — burnt sienna
    [43, 122, 120],   // #2B7A78 — teal
    [59, 138, 136],   // #3B8A88 — teal 2
  ],
  speed = 1,
  blobCount = 4,
}: AuroraBackgroundProps) {
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
      time += 0.002 * speed
      const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2))
      const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2))

      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < blobCount; i++) {
        const cx = w * 0.3 + Math.sin(time * 0.4 + i * 1.8) * w * 0.35
        const cy = h * 0.3 + Math.cos(time * 0.3 + i * 2.4) * h * 0.25
        const rx = w * 0.4 + Math.sin(time * 0.2 + i * 1.4) * w * 0.15
        const ry = h * 0.28 + Math.cos(time * 0.25 + i * 2.0) * h * 0.1

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry))
        const [r, g, b] = colors[i % colors.length]
        const alpha = 0.08 + Math.sin(time * 0.6 + i * 1.1) * 0.03
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`)
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.5})`)
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
  }, [colors, speed, blobCount])

  return (
    <canvas
      ref={canvasRef}
      className={cn('pointer-events-none', className)}
      style={{ zIndex: 0 }}
    />
  )
}
