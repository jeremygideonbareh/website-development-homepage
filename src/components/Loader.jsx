import { useEffect } from 'react'
import { cardio } from 'ldrs'
cardio.register()

export default function Loader() {
  useEffect(() => {
    const els = document.querySelectorAll('l-cardio')
    els.forEach(el => {
      el.setAttribute('size', '50')
      el.setAttribute('stroke', '4')
      el.setAttribute('speed', '2')
      el.setAttribute('color', '#FF6B4A')
    })
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <l-cardio />

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
