import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X } from 'lucide-react'
import { LeadForm } from '@/components/LeadForm'

export function BookingModal({ open, onClose, defaultTier = '' }) {
  const { t } = useTranslation()
  const closeRef = useRef(null)

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => closeRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key !== 'Tab') return
      const modal = closeRef.current?.closest('[role="dialog"]')
      if (!modal) return
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          {/* Decorative glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, #E85D3A, transparent 70%)' }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Book a free call"
            className="relative w-full max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated border glow */}
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-60"
              style={{
                background: 'linear-gradient(135deg, #E85D3A, #FF6B4A, #7C5CFC, #E85D3A)',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 4s ease infinite',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1px',
              }}
            />

            <div className="relative rounded-2xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close booking modal"
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <X className="size-4" />
              </button>

              <div className="mb-6">
                  <h2
                    className="text-2xl sm:text-3xl font-bold mb-1"
                    style={{ fontFamily: "'Clash Display', sans-serif", color: '#E1E0CC' }}
                  >
                    {t('booking.title')}
                  </h2>
                  <p className="text-sm text-zinc-400 max-w-sm">
                    {t('booking.subtitle')}
                  </p>
              </div>

              <LeadForm defaultTier={defaultTier} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
