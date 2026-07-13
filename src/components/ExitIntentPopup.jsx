import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { X, ArrowRight } from 'lucide-react'
import { LeadForm } from '@/components/LeadForm'

const STORAGE_KEY = 'rogue_exit_shown'
const TRIGGER_THRESHOLD = 50

export default function ExitIntentPopup() {
  const { t } = useTranslation()
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true' } catch { return false }
  })
  const armed = useRef(false)

  useEffect(() => {
    if (dismissed) return
    const timer = setTimeout(() => { armed.current = true }, 3000)
    function handleMouseLeave(e) {
      if (!armed.current) return
      if (e.clientY > TRIGGER_THRESHOLD) return
      setShow(true)
      armed.current = false
    }
    document.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      clearTimeout(timer)
    }
  }, [dismissed])

  function handleDismiss() {
    setShow(false)
    setDismissed(true)
    try { localStorage.setItem(STORAGE_KEY, 'true') } catch {}
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Don't leave yet — book a free call"
            className="relative w-full max-w-md mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-60"
              style={{
                background: 'linear-gradient(135deg, #FF6B4A, #7C5CFC, #2B7A78, #FF6B4A)',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 4s ease infinite',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1px',
              }}
            />
            <div className="relative rounded-2xl border border-white/10 bg-zinc-950/90 backdrop-blur-xl p-8 shadow-2xl">
              <button
                onClick={handleDismiss}
                aria-label="Close"
                className="absolute top-4 right-4 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <X className="size-4" />
              </button>

              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold mb-2" style={{ color: '#F2F2F2' }}>
                  {t('exitPopup.heading')}
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: '#8A8A8A' }}>
                  {t('exitPopup.subtitle')}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {['2-4 week delivery', '100% code ownership', 'No page builders'].map((badge) => (
                  <span key={badge} className="text-[11px] px-2.5 py-1 rounded-full border" style={{ borderColor: 'rgba(255,107,74,0.3)', color: '#FF6B4A', background: 'rgba(255,107,74,0.08)' }}>
                    {badge}
                  </span>
                ))}
              </div>

              <LeadForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
