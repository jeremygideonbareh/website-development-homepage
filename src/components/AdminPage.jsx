import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Lock, Mail, User, Calendar, MessageSquare, Building, Briefcase, RefreshCw, LogOut, AlertTriangle, Download, Search, SlidersHorizontal, Check, Eye, EyeOff, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react'

function computePriority(lead) {
  let score = 0
  if (lead.message && lead.message.length > 20) score += 30
  if (lead.message && lead.message.length > 100) score += 20
  if (lead.company) score += 25
  if (lead.project_tier === 'The Apex Architecture' || lead.project_tier === 'The Custom Animated Experience') score += 25
  if (lead.project_tier === 'The Growth Stack') score += 15
  if (lead.project_tier === 'The Velocity Build') score += 5
  return score
}

function priorityLabel(score) {
  if (score >= 60) return { label: 'Hot', color: '#FF6B4A' }
  if (score >= 30) return { label: 'Warm', color: '#E8A838' }
  return { label: 'New', color: '#6A9FB5' }
}

const AUTH_TOKEN_KEY = 'rogue_auth_token'

function csvEscape(val) {
  const s = String(val ?? '')
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`
  }
  return s
}

function generateCsv(leads) {
  const headers = ['ID', 'Name', 'Email', 'Company', 'Project Tier', 'Message', 'Timestamp']
  const rows = leads.map(l => [
    l.id,
    csvEscape(l.name),
    csvEscape(l.email),
    csvEscape(l.company),
    csvEscape(l.project_tier),
    csvEscape(l.message),
    csvEscape(l.timestamp),
  ].join(','))
  return [headers.join(','), ...rows].join('\n')
}

function AuthGate({ onAuth }) {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: input }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        sessionStorage.setItem(AUTH_TOKEN_KEY, data.token)
        onAuth()
      } else {
        setError(true)
        setTimeout(() => setError(false), 2000)
      }
    } catch {
      setError(true)
      setTimeout(() => setError(false), 2000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A0A0A' }}>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm mx-auto p-8"
      >
        <div className="flex items-center justify-center size-16 rounded-2xl mx-auto mb-6" style={{ background: '#FF6B4A18' }}>
          <Lock className="size-7" style={{ color: '#FF6B4A' }} />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2" style={{ color: '#F2F2F2' }}>{t('admin.title')}</h1>
        <p className="text-sm text-center mb-8" style={{ color: '#8A8A8A' }}>Enter admin password to continue</p>
        <input
          type="password"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(false) }}
          placeholder={t('admin.password')}
          autoFocus
          aria-label={t('admin.password')}
          className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] transition-colors mb-4"
          style={{
            backgroundColor: '#1A1817',
            borderColor: error ? '#FF6B4A' : 'rgba(255,255,255,0.1)',
            color: '#F2F2F2',
          }}
        />
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs flex items-center gap-1.5 mb-4" style={{ color: '#FF6B4A' }}>
            <AlertTriangle className="size-3" /> {t('admin.incorrectPassword')}
          </motion.p>
        )}
        <button
          type="submit"
          className="w-full rounded-xl py-3 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#FF6B4A', color: '#FFFFFF' }}
        >
          {t('admin.unlock')}
        </button>
      </motion.form>
    </div>
  )
}

const tierColors = {
  'The Velocity Build': '#2B7A78',
  'The Growth Stack': '#E85D3A',
  'The Apex Architecture': '#FF6B4A',
}

function LeadRow({ lead, isRead, onToggleRead, expanded, onToggleExpand }) {
  const priority = useMemo(() => {
    const score = computePriority(lead)
    return { ...priorityLabel(score), score }
  }, [lead])
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border p-5 mb-3 transition-all"
      style={{
        borderColor: isRead ? 'rgba(255,255,255,0.06)' : '#FF6B4A44',
        background: isRead ? '#1A1817' : '#1A1817',
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          {!isRead && <div className="size-2 rounded-full shrink-0 mt-1" style={{ backgroundColor: '#FF6B4A' }} />}
          <div className="size-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: '#FF6B4A22', color: '#FF6B4A' }}>
            {lead.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold truncate" style={{ color: '#F2F2F2' }}>{lead.name}</p>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${priority.color}22`, color: priority.color }}>
                {priority.label}
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Mail className="size-3 shrink-0" style={{ color: '#6A6A6A' }} />
              <a href={`mailto:${lead.email}`} className="text-xs hover:underline truncate" style={{ color: '#FF6B4A' }}>{lead.email}</a>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => { e.preventDefault(); onToggleRead(lead.id) }}
            className="rounded-lg p-1.5 transition-all hover:opacity-70"
            style={{ color: isRead ? '#6A6A6A' : '#FF6B4A' }}
            title={isRead ? 'Mark as unread' : 'Mark as read'}
            aria-label={isRead ? 'Mark as unread' : 'Mark as read'}
          >
            {isRead ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onToggleExpand(lead.id) }}
            className="rounded-lg p-1.5 transition-all hover:opacity-70"
            style={{ color: '#8A8A8A' }}
            aria-label={expanded ? 'Collapse details' : 'Expand details'}
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-3 text-xs" style={{ color: '#8A8A8A' }}>
        {lead.company && (
          <span className="flex items-center gap-1">
            <Building className="size-3" /> {lead.company}
          </span>
        )}
        {lead.project_tier && (
          <span className="flex items-center gap-1">
            <Briefcase className="size-3" /> {lead.project_tier}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Calendar className="size-3" /> {lead.timestamp}
        </span>
        <span className="flex items-center gap-1" style={{ color: priority.color }}>
          <TrendingUp className="size-3" /> Score: {priority.score}
        </span>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="rounded-lg p-3 text-xs leading-relaxed overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.03)', color: '#B0B0B0' }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <MessageSquare className="size-3" style={{ color: '#6A6A6A' }} />
            <span style={{ color: '#8A8A8A' }}>Message</span>
          </div>
          {lead.message}
        </motion.div>
      )}
    </motion.div>
  )
}

export default function AdminPage({ onBack }) {
  const { t } = useTranslation()
  const [authenticated, setAuthenticated] = useState(() => !!sessionStorage.getItem(AUTH_TOKEN_KEY))
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [readState, setReadState] = useState(() => {
    try { return JSON.parse(localStorage.getItem('leads_read_state') || '{}') } catch { return {} }
  })
  const [expandedIds, setExpandedIds] = useState(() => new Set())
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState('All')
  const [sortNewest, setSortNewest] = useState(true)
  const [priorityFilter, setPriorityFilter] = useState('All')

  function persistReadState(updated) {
    setReadState(updated)
    localStorage.setItem('leads_read_state', JSON.stringify(updated))
  }

  function handleToggleRead(id) {
    const updated = { ...readState, [id]: !readState[id] }
    persistReadState(updated)
  }

  function handleToggleExpand(id) {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  async function fetchLeads() {
    setLoading(true)
    setError(null)
    try {
      const token = sessionStorage.getItem(AUTH_TOKEN_KEY)
      const res = await fetch('/api/leads', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {},
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      const data = await res.json()
      setLeads(data.leads || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authenticated) fetchLeads()
  }, [authenticated])

  const tiers = useMemo(() => {
    const set = new Set(leads.map(l => l.project_tier).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [leads])

  const filtered = useMemo(() => {
    let result = [...leads]
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(l => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.company && l.company.toLowerCase().includes(q)))
    }
    if (tierFilter !== 'All') {
      result = result.filter(l => l.project_tier === tierFilter)
    }
    if (priorityFilter === 'Hot') {
      result = result.filter(l => computePriority(l) >= 60)
    } else if (priorityFilter === 'Warm') {
      result = result.filter(l => { const s = computePriority(l); return s >= 30 && s < 60 })
    } else if (priorityFilter === 'New') {
      result = result.filter(l => computePriority(l) < 30)
    }
    result.sort((a, b) => {
      if (!sortNewest) return new Date(a.timestamp) - new Date(b.timestamp)
      return new Date(b.timestamp) - new Date(a.timestamp)
    })
    return result
  }, [leads, search, tierFilter, priorityFilter, sortNewest])

  function handleExportCsv() {
    const csv = generateCsv(filtered)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `rogue-code-leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const unreadCount = leads.filter(l => !readState[l.id]).length

  if (!authenticated) return <AuthGate onAuth={() => setAuthenticated(true)} />

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-xs font-medium mb-4 transition-opacity hover:opacity-70"
              style={{ color: '#FF6B4A' }}
            >
              ← Back to site
            </button>
            <h1 className="text-2xl font-bold" style={{ color: '#F2F2F2' }}>{t('admin.title')}</h1>
            <p className="text-sm mt-1" style={{ color: '#8A8A8A' }}>
              {leads.length} lead{leads.length !== 1 ? 's' : ''} received
              {unreadCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 rounded text-[11px] font-semibold" style={{ background: '#FF6B4A22', color: '#FF6B4A' }}>
                  {unreadCount} unread
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              disabled={leads.length === 0}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium transition-all hover:opacity-80 disabled:opacity-40"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#8A8A8A' }}
              title={t('admin.export')}
            >
              <Download className="size-3.5" />
              {t('admin.export')}
            </button>
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium transition-all hover:opacity-80 disabled:opacity-50"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#8A8A8A' }}
            >
              <RefreshCw className={`size-3.5 ${loading ? 'animate-spin' : ''}`} />
              {t('admin.refresh')}
            </button>
            <button
              onClick={() => { sessionStorage.removeItem(AUTH_TOKEN_KEY); setAuthenticated(false) }}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-medium transition-all hover:opacity-80"
              style={{ background: 'rgba(255,255,255,0.06)', color: '#FF6B4A' }}
            >
              <LogOut className="size-3.5" />
              {t('admin.lock')}
            </button>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5" style={{ color: '#6A6A6A' }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('admin.search')}
              aria-label="Search leads"
              className="w-full rounded-xl border px-9 py-2.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] transition-colors"
              style={{
                backgroundColor: '#1A1817',
                borderColor: 'rgba(255,255,255,0.08)',
                color: '#F2F2F2',
              }}
            />
          </div>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            aria-label="Filter by project tier"
            className="rounded-xl border px-3 py-2.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] transition-colors"
            style={{
              backgroundColor: '#1A1817',
              borderColor: 'rgba(255,255,255,0.08)',
              color: '#F2F2F2',
            }}
          >
              {tiers.map(tier => (
                <option key={tier} value={tier}>{tier === 'All' ? t('admin.allTiers') : tier}</option>
              ))}
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              aria-label="Filter by priority"
              className="rounded-xl border px-3 py-2.5 text-xs outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] transition-colors"
              style={{
                backgroundColor: '#1A1817',
                borderColor: 'rgba(255,255,255,0.08)',
                color: '#F2F2F2',
              }}
            >
              <option value="All">{t('admin.allPriority')}</option>
            <option value="Hot">Hot</option>
            <option value="Warm">Warm</option>
            <option value="New">New</option>
          </select>
          <button
            onClick={() => setSortNewest(!sortNewest)}
            className="flex items-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all"
            style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#8A8A8A' }}
          >
            <SlidersHorizontal className="size-3.5" />
            {sortNewest ? 'Newest' : 'Oldest'}
          </button>
        </div>

        {loading && (
          <div className="text-center py-20">
            <div className="inline-block size-6 rounded-full border-2 border-t-transparent animate-spin mb-3" style={{ borderColor: '#FF6B4A', borderTopColor: 'transparent' }} />
            <p className="text-sm" style={{ color: '#8A8A8A' }}>Loading leads...</p>
          </div>
        )}

        {error && (
          <div className="rounded-xl border p-6 text-center" style={{ borderColor: 'rgba(255,107,74,0.2)', background: 'rgba(255,107,74,0.05)' }}>
            <AlertTriangle className="size-8 mx-auto mb-3" style={{ color: '#FF6B4A' }} />
            <p className="text-sm font-medium mb-1" style={{ color: '#F2F2F2' }}>Failed to load leads</p>
            <p className="text-xs" style={{ color: '#8A8A8A' }}>{error}</p>
            <button onClick={fetchLeads} className="mt-4 text-xs font-medium underline" style={{ color: '#FF6B4A' }}>
              Try again
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="flex items-center justify-center size-16 rounded-2xl mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <Mail className="size-7" style={{ color: '#6A6A6A' }} />
            </div>
            <p className="text-sm font-medium" style={{ color: '#8A8A8A' }}>
              {search || tierFilter !== 'All' || priorityFilter !== 'All' ? t('admin.noMatch') : t('admin.noLeads')}
            </p>
            <p className="text-xs mt-1" style={{ color: '#6A6A6A' }}>
              {search || tierFilter !== 'All' || priorityFilter !== 'All' ? t('admin.noMatchDesc') : t('admin.noLeadsDesc')}
            </p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div>
            {filtered.map((lead) => (
              <LeadRow
                key={lead.id}
                lead={lead}
                isRead={!!readState[lead.id]}
                onToggleRead={handleToggleRead}
                expanded={expandedIds.has(lead.id)}
                onToggleExpand={handleToggleExpand}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
