import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Compass,
  Rocket,
  ShieldCheck,
  Globe,
} from 'lucide-react'

const steps = [
  {
    title: 'Architecture Mapping',
    description: 'Blueprint and technical scoping.',
    icon: Compass,
  },
  {
    title: 'Velocity Build',
    description: '30-day locked-focus engineering sprint.',
    icon: Rocket,
  },
  {
    title: 'Quality Assurance',
    description: 'Performance auditing and stress testing.',
    icon: ShieldCheck,
  },
  {
    title: 'Deployment',
    description: 'Edge network launch and handoff.',
    icon: Globe,
  },
]

export default function EngineeringPipeline() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.6, 1])

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-zinc-950 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-medium tracking-widest text-zinc-500 uppercase">
            How we work
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            The Engineering Pipeline
          </h2>
        </motion.div>

        <div className="relative">
          {/* Background track line */}
          <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 rounded-full bg-zinc-800" />

          {/* Glowing fill line */}
          <motion.div
            style={{ scaleY }}
            className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-blue-500 via-violet-500 to-blue-500"
          />

          {/* Glow overlay */}
          <motion.div
            style={{ opacity: glowOpacity, scaleY }}
            className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 origin-top rounded-full bg-blue-500/20 blur-xl"
          />

          {/* Steps */}
          <div className="relative flex flex-col gap-16 md:gap-24">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              const progressThreshold = (i + 1) / steps.length

              return (
                <StepNode
                  key={step.title}
                  step={step}
                  index={i}
                  isLeft={isLeft}
                  progressThreshold={progressThreshold}
                  scrollYProgress={scrollYProgress}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function StepNode({ step, index, isLeft, progressThreshold, scrollYProgress }) {
  const nodeOpacity = useTransform(
    scrollYProgress,
    [progressThreshold - 0.15, progressThreshold],
    [0.3, 1]
  )

  const nodeScale = useTransform(
    scrollYProgress,
    [progressThreshold - 0.15, progressThreshold],
    [0.8, 1]
  )

  const textOpacity = useTransform(
    scrollYProgress,
    [progressThreshold - 0.1, progressThreshold],
    [0, 1]
  )

  const textY = useTransform(
    scrollYProgress,
    [progressThreshold - 0.1, progressThreshold],
    [20, 0]
  )

  const Icon = step.icon

  return (
    <div
      className={`flex items-center md:gap-12 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col gap-6 md:gap-0`}
    >
      {/* Content */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-center`}
      >
        <p className="text-xs font-semibold tracking-widest text-blue-400 uppercase">
          Step {index + 1}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {step.description}
        </p>
      </motion.div>

      {/* Node */}
      <motion.div
        style={{ opacity: nodeOpacity, scale: nodeScale }}
        className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-900 shadow-lg transition-colors md:h-16 md:w-16"
      >
        <motion.div
          style={{ opacity: nodeOpacity }}
          className="absolute inset-0 rounded-full bg-blue-500/10 blur-md"
        />
        <Icon className="relative z-10 size-6 text-zinc-300" strokeWidth={1.5} />
      </motion.div>

      {/* Spacer for alignment */}
      <div className="hidden flex-1 md:block" />
    </div>
  )
}
