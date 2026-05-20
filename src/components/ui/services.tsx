import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { IconHover3D } from './icon-3d-hover'

interface ServiceItem {
  title: string
  image: string
  overlayImage: string
  heading: string
  text: string
}

const services: ServiceItem[] = [
  {
    title: "Web Development",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=512&h=512&fit=crop&q=80",
    overlayImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=512&h=512&fit=crop&q=80",
    heading: "Web Development",
    text: "Full-stack web development using modern frameworks like React, Next.js, and Node.js. We build responsive, performant websites and complex web applications tailored to your business needs.\n\nFrom landing pages to SaaS platforms, we deliver clean, maintainable code with seamless user experiences and rapid deployment.",
  },
  {
    title: "Creative Design",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=512&h=512&fit=crop&q=80",
    overlayImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=512&h=512&fit=crop&q=80",
    heading: "Creative Design",
    text: "From concept to pixel-perfect execution. Our design team crafts stunning visual experiences that capture your brand's essence and engage your audience.\n\nWe handle UI/UX design, wireframing, prototyping, and comprehensive design systems. Every pixel is intentional, every interaction delightful.",
  },
  {
    title: "Branding",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=512&h=512&fit=crop&q=80",
    overlayImage: "https://images.unsplash.com/photo-1620288627223-53302f4e8c74?w=512&h=512&fit=crop&q=80",
    heading: "Branding",
    text: "Comprehensive branding services including logo design, brand guidelines, visual identity systems, and messaging strategy. We help you build a brand that stands out.\n\nYour brand is more than a logo — it's the entire experience. We craft cohesive identities that resonate with your audience and scale across every touchpoint.",
  },
  {
    title: "Product Design",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=512&h=512&fit=crop&q=80",
    overlayImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=512&h=512&fit=crop&q=80",
    heading: "Product Design",
    text: "End-to-end product design from user research and wireframing to high-fidelity prototypes and usability testing. Our process ensures every product decision is data-driven and user-centered.\n\nWe create experiences that users love and businesses thrive on — combining aesthetics with function to deliver products that make a real impact.",
  },
]

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [closing, setClosing] = useState(false)

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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
              How Can I Help?
            </h2>
            <p className="text-lg sm:text-xl text-zinc-400 font-light">
              Let&apos;s turn your vision into something amazing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service) => (
              <button
                key={service.title}
                onClick={() => openService(service.title)}
                className="group bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col h-[320px] transition-all duration-300 hover:bg-white/[0.06] text-left cursor-pointer"
              >
                <div className="relative flex-grow flex items-center justify-center mb-4">
                  <img
                    src={service.image}
                    alt={`${service.title} showcase`}
                    className="absolute w-44 h-auto rounded-lg shadow-md transform -rotate-6 transition-all duration-500 ease-out will-change-transform group-hover:rotate-[-10deg] group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = "https://placehold.co/512x512/e2e8f0/4a5568?text=Image+1"
                    }}
                  />
                  <img
                    src={service.overlayImage}
                    alt={`${service.title} example`}
                    className="absolute w-44 h-auto rounded-lg shadow-lg transform rotate-3 transition-all duration-500 ease-out will-change-transform group-hover:rotate-[5deg] group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src = "https://placehold.co/512x512/cbd5e0/2d3748?text=Image+2"
                    }}
                  />
                </div>

                <h3 className="text-left text-lg font-medium text-zinc-100 mt-auto">
                  {service.title}
                </h3>
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
    </>
  )
}
