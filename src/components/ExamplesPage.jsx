import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, GitBranch, MessageCircle, Briefcase, Camera } from 'lucide-react'
import { MinimalistHero } from '@/components/ui/minimalist-hero'

const projects = [
  {
    title: 'Nova Bank',
    desc: 'Modern digital banking platform with AI-powered financial insights.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80',
    tags: ['React', 'Node.js', 'AI'],
  },
  {
    title: 'Velo E-Commerce',
    desc: 'High-performance storefront with real-time inventory and smart recommendations.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
    tags: ['Next.js', 'Stripe', 'AI Search'],
  },
  {
    title: 'Pulse Dashboard',
    desc: 'Real-time analytics dashboard serving 10K+ concurrent users.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80',
    tags: ['Vue.js', 'D3.js', 'WebSocket'],
  },
  {
    title: 'Orion SaaS',
    desc: 'B2B platform for team collaboration with AI workflow automation.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80',
    tags: ['React', 'Python', 'ML'],
  },
  {
    title: 'Zen Health',
    desc: 'Telemedicine platform connecting patients with healthcare providers.',
    image: 'https://images.unsplash.com/photo-1613909207039-6b173b75525c?w=800&h=600&fit=crop&q=80',
    tags: ['Flutter', 'Firebase', 'AI'],
  },
  {
    title: 'CryptoVault',
    desc: 'Secure cryptocurrency wallet with real-time market tracking.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80',
    tags: ['React Native', 'Solidity', 'Web3'],
  },
]

export default function ExamplesPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navLinks = [
    { label: 'PROJECTS', href: '#projects' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'CONTACT', href: '#' },
  ]

  const socialLinks = [
    { icon: GitBranch, href: '#' },
    { icon: MessageCircle, href: '#' },
    { icon: Briefcase, href: '#' },
    { icon: Camera, href: '#' },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-24 left-6 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back
        </button>
      </div>

      <MinimalistHero
        logoText="APEX."
        navLinks={navLinks}
        mainText="Every project is built from scratch with modern frameworks, AI-powered features, and a relentless focus on performance."
        readMoreLink="#projects"
        overlayText={{ part1: 'our', part2: 'work.' }}
        socialLinks={socialLinks}
        locationText="Built with AI · 2026"
      />

      <div id="projects" className="px-6 pb-32 max-w-7xl mx-auto -mt-32 relative z-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-xl overflow-hidden border border-white/10 bg-zinc-900/50 hover:border-white/30 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">{project.title}</h3>
                  <ExternalLink className="size-4 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{project.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-zinc-300 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
