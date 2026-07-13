import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="fixed bottom-6 left-6 right-6 z-[300] mx-auto max-w-md"
        >
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950/95 backdrop-blur-xl p-5 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="size-10 rounded-xl bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <Cookie className="size-5 text-zinc-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white mb-1">We use cookies</p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  We use Plausible Analytics — a privacy-friendly tool — to understand how visitors use our site. No personal data is collected.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={accept}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-white text-black hover:bg-white/90 transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
