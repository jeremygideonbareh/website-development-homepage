import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { submitLead } from '@/lib/api'

const TIERS = [
  { value: '', label: 'Select a tier...' },
  { value: 'The Velocity Build', label: 'The Velocity Build' },
  { value: 'The Growth Stack', label: 'The Growth Stack' },
  { value: 'The Apex Architecture', label: 'The Apex Architecture' },
]

const FIELDS = ['name', 'email', 'company', 'project_tier', 'message']

const FIELD_ERROR_CLEAR_DELAY = 4000

function useCountdown() {
  const [remaining, setRemaining] = useState(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (remaining <= 0) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = null
      return
    }
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [remaining])

  return { remaining, start: (s) => setRemaining(s), isActive: remaining > 0 }
}

function parseFieldErrors(details) {
  const errors = {}
  if (!Array.isArray(details)) return errors
  for (const d of details) {
    const loc = d.loc ?? []
    const field = loc.length >= 2 ? loc[loc.length - 1] : null
    if (field && FIELDS.includes(field)) {
      if (!errors[field]) errors[field] = []
      errors[field].push(d.msg)
    }
  }
  return errors
}

function CooldownRing({ remaining, total }) {
  const radius = 14
  const circumference = 2 * Math.PI * radius
  const progress = remaining / total
  const dashOffset = circumference * (1 - progress)

  return (
    <svg className="size-6 -rotate-90" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
      <motion.circle
        cx="16"
        cy="16"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        animate={{ strokeDashoffset: dashOffset }}
        transition={{ duration: 0.3, ease: 'linear' }}
      />
    </svg>
  )
}

export function LeadForm({ defaultTier = '', onSuccess }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    project_tier: defaultTier,
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const { remaining: cooldown, start: startCooldown, isActive: onCooldown } = useCountdown()
  const errorTimers = useRef({})

  const clearFieldError = useCallback((field) => {
    setFieldErrors((prev) => {
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const setFieldError = useCallback((field, msgs) => {
    setFieldErrors((prev) => ({ ...prev, [field]: msgs }))
    if (errorTimers.current[field]) clearTimeout(errorTimers.current[field])
    errorTimers.current[field] = setTimeout(() => clearFieldError(field), FIELD_ERROR_CLEAR_DELAY)
  }, [clearFieldError])

  useEffect(() => {
    return () => {
      for (const t of Object.values(errorTimers.current)) clearTimeout(t)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) clearFieldError(name)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)

    try {
      const result = await submitLead(form)

      if (result.status === 'success') {
        setSuccess(true)
      }
    } catch (err) {
      if (err.status === 429) {
        startCooldown(10)
      } else if (err.status === 400 && err.details) {
        const parsed = parseFieldErrors(err.details)
        setFieldErrors(parsed)
        for (const [field, msgs] of Object.entries(parsed)) {
          setFieldError(field, msgs)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const inputBase =
    'w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 bg-white/5 backdrop-blur-sm'

  const renderField = (field, opts = {}) => {
    const hasError = !!fieldErrors[field]
    const isTextarea = field === 'message'
    const Tag = isTextarea ? 'textarea' : 'input'

    return (
      <div className="relative">
        <motion.div
          animate={hasError ? { x: [0, -6, 6, -6, 6, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Tag
            id={field}
            name={field}
            type={opts.type ?? 'text'}
            required={opts.required ?? false}
            placeholder={opts.placeholder ?? ''}
            rows={isTextarea ? 5 : undefined}
            value={form[field]}
            onChange={handleChange}
            className={cn(
              inputBase,
              hasError
                ? 'border-red-500/60 shadow-[0_0_12px_rgba(220,38,38,0.35)] bg-red-500/5'
                : 'border-zinc-800/60 focus:border-zinc-500/60 focus:bg-white/[0.08] focus:shadow-[0_0_12px_rgba(255,255,255,0.05)]',
              isTextarea && 'resize-y min-h-[100px]',
            )}
          />
        </motion.div>
        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="absolute -top-10 left-0 flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-1.5 text-xs text-red-400 whitespace-nowrap"
            >
              <AlertCircle className="size-3 shrink-0" />
              <span>{fieldErrors[field]?.[0] ?? 'Invalid input'}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <motion.div
      layout
      className="w-full rounded-2xl border border-zinc-800/60 bg-zinc-950/50 backdrop-blur-md p-6 sm:p-8 shadow-2xl"
    >
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
            >
              <CheckCircle className="size-14 text-emerald-400 mb-4" strokeWidth={1.5} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-lg font-semibold text-white"
            >
              Architecture Request Received
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="mt-2 text-sm text-zinc-400 max-w-xs"
            >
              We will initialize contact shortly.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              onClick={() => {
                setSuccess(false)
                setForm({ name: '', email: '', company: '', project_tier: '', message: '' })
                onSuccess?.()
              }}
              className="mt-8 flex items-center gap-2 rounded-full border border-zinc-700/60 px-5 py-2 text-sm text-zinc-300 hover:bg-white/5 transition-colors"
            >
              Submit Another Request
              <ArrowRight className="size-3.5" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                  Name <span className="text-red-400">*</span>
                </label>
                {renderField('name', { required: true, placeholder: 'Your name' })}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300">
                  Email <span className="text-red-400">*</span>
                </label>
                {renderField('email', { type: 'email', required: true, placeholder: 'you@example.com' })}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="company" className="block text-sm font-medium text-zinc-300">
                  Company
                </label>
                {renderField('company', { placeholder: 'Your company (optional)' })}
              </div>
              <div className="space-y-1.5">
                <label htmlFor="project_tier" className="block text-sm font-medium text-zinc-300">
                  Project Tier
                </label>
                <div className="relative">
                  <motion.div
                    animate={fieldErrors.project_tier ? { x: [0, -6, 6, -6, 6, -4, 4, 0] } : { x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    <select
                      id="project_tier"
                      name="project_tier"
                      value={form.project_tier}
                      onChange={handleChange}
                      className={cn(
                        inputBase,
                        'appearance-none',
                        fieldErrors.project_tier
                          ? 'border-red-500/60 shadow-[0_0_12px_rgba(220,38,38,0.35)] bg-red-500/5'
                          : 'border-zinc-800/60 focus:border-zinc-500/60 focus:bg-white/[0.08] focus:shadow-[0_0_12px_rgba(255,255,255,0.05)]',
                      )}
                    >
                      {TIERS.map((t) => (
                        <option key={t.value} value={t.value} className="bg-zinc-900">
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                  <AnimatePresence>
                    {fieldErrors.project_tier && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute -top-10 left-0 flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-1.5 text-xs text-red-400 whitespace-nowrap"
                      >
                        <AlertCircle className="size-3 shrink-0" />
                        <span>{fieldErrors.project_tier[0]}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="message" className="block text-sm font-medium text-zinc-300">
                Message <span className="text-red-400">*</span>
              </label>
              {renderField('message', { required: true, placeholder: 'Tell us about your project...' })}
            </div>

            <motion.button
              type="submit"
              disabled={loading || onCooldown}
              whileHover={!loading && !onCooldown ? { scale: 1.01 } : {}}
              whileTap={!loading && !onCooldown ? { scale: 0.99 } : {}}
              className={cn(
                'relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-3.5 text-sm font-semibold transition-all duration-300',
                onCooldown
                  ? 'bg-zinc-800/80 text-zinc-400 cursor-not-allowed'
                  : loading
                    ? 'bg-white/10 text-white cursor-wait'
                    : 'bg-white text-black hover:bg-white/90 cursor-pointer',
              )}
            >
              <AnimatePresence mode="popLayout">
                {onCooldown ? (
                  <motion.span
                    key="cooldown"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <CooldownRing remaining={cooldown} total={10} />
                    <span className="tabular-nums">{cooldown}s</span>
                  </motion.span>
                ) : loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="size-4 animate-spin" />
                    Sending...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2"
                  >
                    <Send className="size-4" />
                    Send Message
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
