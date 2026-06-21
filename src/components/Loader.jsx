import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <div className="relative size-20">
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: 'transparent', borderTopColor: '#ffffff', borderRightColor: '#ffffff' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border"
          style={{ borderColor: 'transparent', borderBottomColor: 'rgba(255,255,255,0.4)', borderLeftColor: 'rgba(255,255,255,0.4)' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="size-2 rounded-full bg-white" />
        </motion.div>
      </div>

      <div className="overflow-hidden">
        <motion.h1
          className="text-4xl sm:text-5xl font-bold tracking-[0.35em] text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          HORIZON
        </motion.h1>
      </div>

      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
        style={{ width: 160 }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
      />
    </div>
  )
}
