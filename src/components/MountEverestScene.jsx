import { motion, useScroll, useTransform } from 'framer-motion'

const themes = {
  night: {
    bg: '#1A1817',
    overlay: 'rgba(0,0,0,0.5)',
    title: '#F2F2F2',
    accent: '#FF6B4A',
    subtitle: '#B0B0B0',
  },
  day: {
    bg: '#F5F0EB',
    overlay: 'rgba(0,0,0,0.35)',
    title: '#FFFFFF',
    accent: '#E85D3A',
    subtitle: '#DDDDDD',
  },
}

const MOUNTAIN_IMG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80'

export default function MountEverestScene({ theme = 'day' }) {
  const palette = themes[theme] ?? themes.day
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const textY = useTransform(scrollY, [0, 400], [0, -60])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden',
        background: palette.bg,
      }}
    >
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <img
          src={MOUNTAIN_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{ imageRendering: 'auto' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${palette.overlay}, ${palette.bg})`,
          }}
        />
      </div>

      <motion.div
        style={{ y: textY, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: '800px' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: '14px',
              letterSpacing: '4px',
              color: palette.accent,
              fontWeight: 500,
              marginBottom: '20px',
              textTransform: 'uppercase',
            }}
          >
            Horizon Labs
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 900,
              color: palette.title,
              lineHeight: 1,
              letterSpacing: '0.02em',
              margin: 0,
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            Sky's the<br />
            <span style={{ color: palette.accent }}>Limit</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              marginTop: '28px',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
              color: palette.subtitle,
              maxWidth: '480px',
              lineHeight: 1.6,
              marginLeft: 'auto',
              marginRight: 'auto',
              textShadow: '0 1px 12px rgba(0,0,0,0.2)',
            }}
          >
            Scroll to explore the peaks of what's possible
          </motion.p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{
          fontSize: '11px',
          letterSpacing: '3px',
          color: palette.subtitle,
          fontWeight: 500,
        }}>
          SCROLL TO EXPLORE
        </span>
        <motion.div
          animate={{ height: ['60px', '20px', '60px'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px',
            background: `linear-gradient(to bottom, ${palette.accent}, transparent)`,
          }}
        />
      </motion.div>
    </div>
  )
}
