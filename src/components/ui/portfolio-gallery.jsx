import { ArrowRight, X } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function PortfolioGallery({
  title = "Browse my library",
  archiveButton = {
    text: "View gallery",
    href: "#",
  },
  images: customImages,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  onImageClick,
  pauseOnHover = true,
  marqueeRepeat = 4,
  onClose,
  onViewGallery,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const defaultImages = [
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
      alt: "Modern UI UX Design Mockup",
    },
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80",
      alt: "Dark Mode Code Editor",
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
      alt: "Premium Tech Workspace",
    },
    {
      src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
      alt: "Sleek Mobile App Interface",
    },
    {
      src: "https://images.unsplash.com/photo-1613909207039-6b173b75525c?w=800&h=600&fit=crop&q=80",
      alt: "Modern UI UX Design Mockup",
    },
    {
      src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop&q=80",
      alt: "Dark Mode Code Editor",
    },
    {
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80",
      alt: "Premium Tech Workspace",
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80",
      alt: "Sleek Mobile App Interface",
    },
    {
      src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&q=80",
      alt: "Modern UI UX Design Mockup",
    },
    {
      src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop&q=80",
      alt: "Premium Tech Workspace",
    },
  ]

  const images = customImages || defaultImages

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-7xl mx-auto bg-zinc-950/90 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <X className="size-5" />
        </button>

        <div
          aria-label={title}
          className={`py-12 px-4 ${className}`}
          id="archives"
        >
          <div className="max-w-7xl mx-auto bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 overflow-hidden">
            <div className="relative z-10 text-center pt-12 pb-6 px-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-balance">{title}</h2>
              <button
                onClick={onViewGallery}
                className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors group mb-16"
              >
                <span>{archiveButton.text}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="hidden md:block relative overflow-hidden h-[400px] -mb-[200px]">
              <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
                {images.map((image, index) => {
                  const totalImages = images.length
                  const middle = Math.floor(totalImages / 2)
                  const distanceFromMiddle = Math.abs(index - middle)
                  const staggerOffset = maxHeight - distanceFromMiddle * 20
                  const zIndex = totalImages - index
                  const isHovered = hoveredIndex === index
                  const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index
                  const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset

                  return (
                    <motion.div
                      key={index}
                      className="group cursor-pointer flex-shrink-0"
                      style={{ zIndex }}
                      initial={{
                        transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                        opacity: 0,
                      }}
                      animate={{
                        transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      onHoverStart={() => setHoveredIndex(index)}
                      onHoverEnd={() => setHoveredIndex(null)}
                      onClick={() => onImageClick?.(index)}
                    >
                      <div
                        className="relative aspect-video w-64 md:w-80 lg:w-96 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                        style={{
                          boxShadow: `
                            rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                            rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                            rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                            rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
                          `,
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover object-left-top"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="block md:hidden relative pb-8">
              <div
                className={cn(
                  "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
                  "flex-row"
                )}
              >
                {Array(marqueeRepeat).fill(0).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex shrink-0 justify-around [gap:var(--gap)]",
                      "animate-marquee flex-row",
                      { "group-hover:[animation-play-state:paused]": pauseOnHover }
                    )}
                  >
                    {images.map((image, index) => (
                      <div
                        key={`${i}-${index}`}
                        className="group cursor-pointer flex-shrink-0"
                        onClick={() => onImageClick?.(index)}
                      >
                        <div
                          className="relative aspect-video w-64 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-105"
                          style={{
                            boxShadow: `
                              rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                              rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                              rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                              rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
                            `,
                          }}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover object-left-top"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
