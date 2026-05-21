import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { LeadForm } from '@/components/LeadForm'

export function BookingModal({ open, onClose, defaultTier = '' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg mx-auto rounded-2xl border border-white/10 bg-zinc-900 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="size-4" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-1">Book a Free Call</h2>
            <p className="text-sm text-zinc-400 mb-6">
              Tell us about your project and we'll find a time that works.
            </p>

            <LeadForm defaultTier={defaultTier} onSuccess={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
