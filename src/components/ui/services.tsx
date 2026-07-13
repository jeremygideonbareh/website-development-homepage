import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play } from 'lucide-react'
import { IconHover3D } from './icon-3d-hover'

interface ServiceItem {
  title: string
  tagline: string
  image: string
  overlayImage: string
  heading: string
  text: string
  demoUrl: string
}

const services: ServiceItem[] = [
  {
    title: "The Velocity Build",
    tagline: "Digital authority established in weeks, not months.",
    image: "https://images.unsplash.com/photo-1551434678-e0768f8e6d4c?w=512&h=512&fit=crop&q=80",
    overlayImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=512&h=512&fit=crop&q=80",
    heading: "The Velocity Build",
    text: "Zero page-reloads. Your customers experience a blazing-fast, app-like interface that prevents cart abandonment. Perfect for early-stage startups.\n\nWe strip away complexity and ship a production-grade website in record time — optimized for conversion from day one.",
    demoUrl: "https://example.com",
  },
  {
    title: "The Growth Stack",
    tagline: "High-performance infrastructure built for scale.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=512&h=512&fit=crop&q=80",
    overlayImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=512&h=512&fit=crop&q=80",
    heading: "The Growth Stack",
    text: "Your traffic is scaling, and your current site is too slow. We build custom web apps with seamless state management to handle the load.\n\nRobust architecture, headless CMS integration, and performance engineering that keeps your experience fast even under peak demand.",
    demoUrl: "https://example.com",
  },
  {
    title: "The Apex Architecture",
    tagline: "Bespoke experiences pushing the limits of the browser.",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=512&h=512&fit=crop&q=80",
    overlayImage: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?w=512&h=512&fit=crop&q=80",
    heading: "The Apex Architecture",
    text: "Immersive 3D product showcases and custom WebGL environments that make your competitors' static websites look outdated.\n\nWe push the boundaries of what's possible in the browser — real-time interactivity, WebGL shaders, and cinematic storytelling that leaves a lasting impression.",
    demoUrl: "https://example.com",
  },
]

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [closing, setClosing] = useState(false)
  const [activeDemo, setActiveDemo] = useState<ServiceItem | null>(null)

  const openService = (title: string) => {
    setClosing(false)
    setSelectedService(title)
  }

  const closeService = () => {
    setClosing(true)
    setTimeout(() => {
      setSelectedService(null)
      setClosing(false)
    }, 800)
  }

  const active = selectedService ? services.find((s) => s.title === selectedService) : null

  return (
    <>
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 w-full">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
              Choose Your Tier
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 font-light">
              Every tier solves a specific problem. Pick the one that fits your stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <button
                key={service.title}
                onClick={() => openService(service.title)}
                className="group bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col h-[380px] transition-all duration-300 hover:bg-white/[0.06] text-left cursor-pointer"
              >
                <div className="relative flex-grow flex items-center justify-center mb-4">
                  <img
                    src={service.image}
                    alt={`${service.title} showcase`}
                    loading="lazy"
                    decoding="async"
                    className="absolute w-44 h-auto rounded-lg shadow-md transform -rotate-6 transition-all duration-500 ease-out will-change-transform group-hover:rotate-[-10deg] group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = "https://placehold.co/512x512/e2e8f0/4a5568?text=Image+1"
                    }}
                  />
                  <img
                    src={service.overlayImage}
                    alt={`${service.title} example`}
                    loading="lazy"
                    decoding="async"
                    className="absolute w-44 h-auto rounded-lg shadow-lg transform rotate-3 transition-all duration-500 ease-out will-change-transform group-hover:rotate-[5deg] group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = "https://placehold.co/512x512/cbd5e0/2d3748?text=Image+2"
                    }}
                  />
                </div>

                <h3 className="text-lg font-medium text-zinc-100">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                  {service.tagline}
                </p>

                <div className="mt-auto pt-3">
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveDemo(service)
                    }}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    <Play className="size-3.5 fill-blue-400" />
                    View Live Demo
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Info Modal */}
      <AnimatePresence>
        {!closing && selectedService && active && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={closeService}
          >
            <motion.div
              key="modal-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[700px] mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeService}
                className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="size-4" />
              </button>
              <IconHover3D heading={active.heading} text={active.text} active={!closing} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Iframe Modal */}
      <AnimatePresence>
        {activeDemo && (
          <motion.div
            key="demo-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setActiveDemo(null)}
          >
            <motion.div
              key="demo-content"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[90vw] max-w-6xl h-[85vh] bg-zinc-900/90 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                <h3 className="text-sm font-medium text-zinc-300 truncate">
                  {activeDemo.heading} — Live Demo
                </h3>
                <button
                  onClick={() => setActiveDemo(null)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-zinc-400 hover:bg-white/20 hover:text-white transition-colors shrink-0"
                >
                  <X className="size-3.5" />
                </button>
              </div>

              <iframe
                src={activeDemo.demoUrl}
                title={`${activeDemo.heading} live demo`}
                className="w-full flex-1 border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
