import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const blockedSites = ['faunarobotics.com', 'locomotive.ca', 'ponder.ai']

function isBlocked(url) {
  return blockedSites.some(s => url.includes(s))
}

function getDomain(url) {
  return url.replace(/https?:\/\//, '').replace(/\/.*/, '')
}

function getFaviconUrl(url) {
  const domain = getDomain(url)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

export default function BrowserFrame({ ex, isDay = true, onSelect }) {
  const blocked = isBlocked(ex.url)
  const [iframeError, setIframeError] = useState(false)
  const ref = useRef(null)
  const domain = getDomain(ex.url)

  return (
    <motion.div
      initial={{ x: 300, opacity: 0, scale: 0.96 }}
      whileInView={{ x: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 100, damping: 22 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={() => onSelect?.(ex)}
      className="rounded-xl overflow-hidden border group cursor-pointer"
      style={{
        borderColor: isDay ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
        background: isDay ? '#fff' : '#1A1817',
        boxShadow: isDay ? '0 2px 12px rgba(0,0,0,0.06)' : '0 2px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 border-b"
        style={{
          background: isDay ? '#F5F0EB' : '#222020',
          borderColor: isDay ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="size-2.5 rounded-full" style={{ background: '#FFBD2E' }} />
          <span className="size-2.5 rounded-full" style={{ background: '#28C840' }} />
        </div>
        <div
          className="flex-1 mx-2 px-2 py-1 rounded text-[10px] truncate text-center"
          style={{
            background: isDay ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
            color: isDay ? '#5A4A3A' : '#8A8A8A',
          }}
        >
          <span className="opacity-60">https://</span>
          {domain}
        </div>
        <div className="flex items-center gap-1 opacity-30">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
        </div>
      </div>

      {/* Browser body — iframe (live site, can't interact) or fallback */}
      <div ref={ref} className="relative overflow-hidden" style={{ height: 'clamp(160px, 40vw, 480px)' }}>
        {blocked || iframeError ? (
          /* Fallback: favicon + domain card */
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-2 px-4"
            style={{ background: isDay ? '#F9F6F2' : '#1A1817' }}
          >
            <img
              src={getFaviconUrl(ex.url)}
              alt=""
              className="size-8 rounded-lg"
              style={{ background: isDay ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)' }}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <span
              className="text-sm font-semibold text-center leading-tight"
              style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
            >
              {domain}
            </span>
            {blocked && (
              <span className="text-[10px] opacity-50" style={{ color: isDay ? '#5A4A3A' : '#8A8A8A' }}>
                Preview blocked — click to expand
              </span>
            )}
            <motion.a
              href={ex.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-medium px-3 py-1 rounded-full transition-all"
              style={{
                background: isDay ? '#E85D3A' : '#FF6B4A',
                color: '#fff',
              }}
              whileHover={{ scale: 1.05 }}
            >
              Visit site
            </motion.a>
          </div>
        ) : (
          <>
            <iframe
              src={ex.url}
              title={ex.name}
              className="w-full h-full border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              style={{ background: '#fff' }}
              onError={() => setIframeError(true)}
            />
            {/* Invisible overlay — site renders live but can't be interacted with */}
            <div className="absolute inset-0 cursor-pointer" style={{ pointerEvents: 'none', touchAction: 'none' }} />
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.15))',
              }}
            />
          </>
        )}
      </div>

      <div
        className="px-3 py-2 flex items-center justify-between gap-2 border-t"
        style={{
          borderColor: isDay ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)',
        }}
      >
        <a
          href={ex.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-medium truncate hover:opacity-70 transition-opacity"
          style={{ color: isDay ? '#1A1A1A' : '#F2F2F2' }}
        >
          {ex.name}
        </a>
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
          style={{ background: isDay ? '#E85D3A15' : '#FF6B4A20', color: isDay ? '#E85D3A' : '#FF6B4A' }}
        >
          {ex.award}
        </span>
      </div>
    </motion.div>
  )
}
