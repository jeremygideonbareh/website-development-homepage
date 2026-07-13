import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Home, ArrowLeft } from 'lucide-react'

const knownPages = ['admin', 'sales-pricing', 'privacy', 'terms', 'case']

export default function NotFoundPage({ onBack }) {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#0A0A0A' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-md"
      >
        <div className="text-8xl font-black leading-none mb-4" style={{ color: '#FF6B4A' }}>
          404
        </div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: '#F2F2F2' }}>
          Page not found
        </h1>
        <p className="text-sm leading-relaxed mb-8" style={{ color: '#8A8A8A' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: '#FF6B4A', color: '#FFFFFF' }}
        >
          <Home className="size-4" />
          {t('caseStudies.back')}
        </button>
      </motion.div>
    </div>
  )
}

export function isKnownPage(page) {
  return knownPages.includes(page)
}
