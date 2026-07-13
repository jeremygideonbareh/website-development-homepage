import { useState } from 'react'

function getEmbedUrl(url) {
  const patterns = {
    youtube: [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
    ],
    loom: [
      /(?:loom\.com\/share\/|loom\.com\/embed\/)([a-f0-9]+)/,
    ],
    vimeo: [
      /vimeo\.com\/(\d+)/,
    ],
  }

  for (const [platform, regexes] of Object.entries(patterns)) {
    for (const regex of regexes) {
      const match = url.match(regex)
      if (match) {
        const id = match[1]
        switch (platform) {
          case 'youtube': return `https://www.youtube.com/embed/${id}`
          case 'loom': return `https://www.loom.com/embed/${id}`
          case 'vimeo': return `https://player.vimeo.com/video/${id}`
        }
      }
    }
  }
  return null
}

export default function VideoEmbed({ url, title = 'Video' }) {
  const [loading, setLoading] = useState(true)
  if (!url) return null

  const embedUrl = getEmbedUrl(url)
  if (!embedUrl) return null

  return (
    <div className="relative rounded-xl overflow-hidden" style={{ aspectRatio: '16 / 9', background: '#0A0A0A' }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-6 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: '#FF6B4A', borderTopColor: 'transparent' }} />
        </div>
      )}
      <iframe
        src={embedUrl}
        title={title}
        aria-label={title}
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}
