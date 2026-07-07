import { motion } from 'framer-motion'

const team = [
  {
    name: 'Jeremy Gideon Bareh',
    role: 'Lead Developer',
    bio: 'Full-stack engineer building premium digital experiences from scratch. React, Three.js, TypeScript, AI/ML.',
    photo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=85',
    social: { github: '#', linkedin: '#' },
  },
  {
    name: 'Alex Morgan',
    role: 'Sales Lead',
    bio: 'Helping businesses find the right digital solution. From first contact to project kickoff — seamless and transparent.',
    photo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=85',
    social: { linkedin: '#', twitter: '#' },
  },
  {
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    bio: 'Crafting intuitive interfaces and cohesive brand systems. Every pixel intentional, every interaction delightful.',
    photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=85',
    social: { twitter: '#', linkedin: '#' },
  },
]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] } },
}

export default function TeamSection({ isDay = true }) {
  const accent = isDay ? '#E85D3A' : '#FF6B4A'
  const bg = isDay ? '#F5F0EB' : '#1A1817'
  const text = isDay ? '#1A1A1A' : '#F2F2F2'
  const muted = isDay ? '#5A4A3A' : '#8A8A8A'
  const dim = isDay ? '#8A7A6A' : '#6A6A6A'
  const border = isDay ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)'
  const cardBg = isDay ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.02)'

  return (
    <section className="px-4 sm:px-6 py-28 md:px-12 relative z-10" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-4" style={{ color: accent }}>
            Who we are
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: text }}>
            The Team
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-1 w-20 mx-auto mt-6 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={item}
              className="group rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1"
              style={{
                borderColor: border,
                background: cardBg,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: accent }}
                >
                  {member.role}
                </span>
                <h3 className="text-xl font-bold mt-1" style={{ color: text }}>
                  {member.name}
                </h3>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: muted }}>
                  {member.bio}
                </p>
                <div className="flex gap-3 mt-5" style={{ color: dim }}>
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="transition-colors hover:opacity-70"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0Z"/>
                      </svg>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="transition-colors hover:opacity-70"
                      aria-label={`${member.name}'s Twitter`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="transition-colors hover:opacity-70"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
