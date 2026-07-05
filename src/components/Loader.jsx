import { useEffect, useRef } from 'react'
import 'ldrs/helix'

export default function Loader() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.setAttribute('size', '65')
    el.setAttribute('color', '#FF6B4A')
    el.setAttribute('speed', '1.75')
    el.setAttribute('stroke', '12')
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <l-helix ref={ref} />

      <div className="w-full text-center">
        <h1
          className="animate-fade-in text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.2em] sm:tracking-[0.35em]"
          style={{ color: '#ffffff' }}
        >
          ROGUE CODE
        </h1>
      </div>

      <div
        className="h-px animate-grow-line"
        style={{
          width: 160,
          background: 'linear-gradient(to right, transparent, rgba(255,107,74,0.6), transparent)',
        }}
      />

      <p
        className="animate-fade-in-delayed text-xs tracking-[0.15em] uppercase"
        style={{ color: 'rgba(255,255,255,0.35)' }}
      >
        Loading&hellip;
      </p>
    </div>
  )
}
