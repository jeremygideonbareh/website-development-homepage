const StarryBackground = ({ children }) => {
  return (
    <div className="relative z-10 min-h-screen" style={{ backgroundColor: '#101010' }}>
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 25% 55%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 40% 10%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 55% 70%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 70% 30%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1.5px 1.5px at 85% 80%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 50% 45%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 65% 15%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 90% 50%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 5% 40%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1.5px 1.5px at 35% 90%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 75% 60%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 20% 10%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1.5px 1.5px at 60% 35%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 45% 80%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 95% 15%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 30% 5%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 80% 45%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 50% 95%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 12% 68%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 68% 88%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 8% 48%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 92% 72%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 48% 28%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1px 1px at 78% 5%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1.5px 1.5px at 22% 78%, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 42% 62%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 88% 38%, rgba(255,255,255,0.4), transparent),
            radial-gradient(1.5px 1.5px at 32% 32%, rgba(255,255,255,0.5), transparent)
          `,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default StarryBackground
