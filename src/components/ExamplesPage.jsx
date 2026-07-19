import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ExternalLink, Search, Grid3X3, List,
  Store, Coffee, Scissors, Dog, Cake, Palette, Briefcase,
  Monitor, Sparkles, ChevronDown, X, Star, Plus, Globe,
  UtensilsCrossed, Dumbbell, Flower2, AlertCircle,
  Lightbulb, Send
} from 'lucide-react'
import { toast } from 'sonner'

function getDomain(url) {
  try { return new URL(url).hostname.replace('www.', '') } catch { return url }
}

function getFaviconUrl(url) {
  const domain = getDomain(url)
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

function SiteThumbnail({ url, name }) {
  const [error, setError] = useState(false)
  const domain = getDomain(url)
  return (
    <div className="relative overflow-hidden" style={{ height: 160, background: '#0A0A0A' }}>
      {error ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
          <img src={getFaviconUrl(url)} alt="" loading="lazy" decoding="async" className="size-6 rounded"
            onError={(e) => { e.target.style.display = 'none' }} />
          <span className="text-[10px] font-medium text-white/50 text-center px-2 leading-tight">{domain}</span>
        </div>
      ) : (
        <>
          <iframe
            src={url}
            title={name}
            className="w-full h-full border-0"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
            style={{ background: '#fff', pointerEvents: 'none' }}
            onError={() => setError(true)}
          />
          <div className="absolute inset-0" style={{ pointerEvents: 'none', touchAction: 'none' }} />
        </>
      )}
    </div>
  )
}

function SitePreview({ url, name }) {
  const [error, setError] = useState(false)
  const domain = getDomain(url)
  return (
    <div className="relative overflow-hidden" style={{ height: '80dvh', maxHeight: 800 }}>
      {error ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4" style={{ background: '#1A1817' }}>
          <img src={getFaviconUrl(url)} alt="" loading="lazy" decoding="async" className="size-16 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}
            onError={(e) => { e.target.style.display = 'none' }} />
          <p className="text-lg font-semibold text-white">{domain}</p>
          <p className="text-sm opacity-60" style={{ color: '#8A8A8A' }}>Preview unavailable — open in new tab</p>
          <motion.a href={url} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white"
            style={{ background: '#FF6B4A' }} whileHover={{ scale: 1.05 }}>
            <ExternalLink className="size-4" /> Open in new tab
          </motion.a>
        </div>
      ) : (
        <iframe
          src={url}
          title={name}
          className="w-full h-full border-0"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          style={{ background: '#fff' }}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}

const categories = [
  {
    id: 'groomers',
    label: 'Pet Groomers',
    icon: Dog,
    color: '#E85D3A',
    complexity: 'simple',
    items: [
      { name: 'Paws for Change India', url: 'https://pawsforchangeindia.org', desc: 'Animal welfare NGO website with donation portal, adoption listings, and volunteer management.', rating: 5.0, reviews: 12 },
      { name: 'Pet Care Booking Template', url: 'https://roguecode.dev/pet-care', desc: 'Bespoke pet care booking platform with online scheduling, service catalog, and client portal.', rating: 4.9, reviews: 8 },
      { name: 'Vet Clinic Pro', url: 'https://roguecode.dev/vet-clinic', desc: 'Veterinary clinic website with appointment booking, pet profiles, and health record management.', rating: 4.8, reviews: 6 },
      { name: 'Pet Shop Online', url: 'https://roguecode.dev/pet-shop', desc: 'E-commerce pet supply store with product catalog, cart, and integrated payment gateway.', rating: 4.7, reviews: 5 },
    ]
  },
  {
    id: 'coffee',
    label: 'Coffee Shops',
    icon: Coffee,
    color: '#6F4E37',
    complexity: 'simple',
    items: [
      { name: 'Crumbs Bakery', url: 'https://crumbsbakery.in', desc: 'Artisan bakery website with menu showcase, online ordering, and location finder.', rating: 5.0, reviews: 15 },
      { name: 'Cafe Landing Pro', url: 'https://roguecode.dev/cafe', desc: 'Coffee shop landing page template with menu display, location hours, and contact form.', rating: 4.8, reviews: 10 },
      { name: 'Roastery Shop', url: 'https://roguecode.dev/roastery', desc: 'Coffee roastery e-commerce site with subscription plans, bean catalog, and brewing guides.', rating: 4.7, reviews: 7 },
      { name: 'Brew & Co.', url: 'https://roguecode.dev/brew-co', desc: 'Modern coffee brand site with loyalty program, store locator, and merch shop.', rating: 4.8, reviews: 9 },
    ]
  },
  {
    id: 'cafes',
    label: 'Cafes & Bakeries',
    icon: Cake,
    color: '#D4A574',
    complexity: 'simple',
    items: [
      { name: 'Crumbs Bakery', url: 'https://crumbsbakery.in', desc: 'Full-featured bakery website with daily menu, online pre-orders, and catering inquiries.', rating: 5.0, reviews: 15 },
      { name: 'Bakery Showcase', url: 'https://roguecode.dev/bakery', desc: 'Artisan bakery template with product gallery, custom cake builder, and delivery zones.', rating: 4.9, reviews: 11 },
      { name: 'Patisserie Deluxe', url: 'https://roguecode.dev/patisserie', desc: 'French pastry shop site with elegant gallery, seasonal menus, and wedding cake consultation.', rating: 4.8, reviews: 8 },
      { name: 'Bistro Online', url: 'https://roguecode.dev/bistro', desc: 'Neighborhood bistro website with real-time table booking, event calendar, and chef profiles.', rating: 4.7, reviews: 6 },
    ]
  },
  {
    id: 'barbers',
    label: 'Barbers & Salons',
    icon: Scissors,
    color: '#2B7A78',
    complexity: 'simple',
    items: [
      { name: 'Chelsea Man Spa', url: 'https://chelseamanspa.com', desc: 'Premium men\'s spa and grooming with online booking, service menu, and product shop.', rating: 5.0, reviews: 24 },
      { name: 'Salon Booking Pro', url: 'https://roguecode.dev/salon', desc: 'Hair and beauty salon website with appointment scheduling, stylist profiles, and price list.', rating: 4.9, reviews: 14 },
      { name: 'Barber Shop Classic', url: 'https://roguecode.dev/barber', desc: 'Traditional barbershop site with walk-in status, booking widget, and gallery of cuts.', rating: 4.8, reviews: 10 },
      { name: 'Nail Spa Template', url: 'https://roguecode.dev/nail-spa', desc: 'Nail salon website with service catalog, online booking, and gift card purchases.', rating: 4.7, reviews: 8 },
    ]
  },
  {
    id: 'studios',
    label: 'Creative Studios',
    icon: Palette,
    color: '#9B59B6',
    complexity: 'medium',
    items: [
      { name: "Kiki Garod's Portfolio", url: 'https://kikigarod.com', desc: 'Award-winning filmmaker portfolio with cinematic video reels, project gallery, and commission inquiry.', rating: 5.0, reviews: 18 },
      { name: 'Brand Identity Suite', url: 'https://roguecode.design/brand', desc: 'Complete brand identity design project with logo exploration, color systems, and brand guidelines.', rating: 4.9, reviews: 12 },
      { name: 'Design System Library', url: 'https://roguecode.design/systems', desc: 'Scalable design system with component library, style tokens, and responsive grid frameworks.', rating: 4.8, reviews: 9 },
      { name: 'UX Audit & Redesign', url: 'https://roguecode.design/audit', desc: 'Comprehensive UX audit with heatmaps, user testing, and data-driven redesign recommendations.', rating: 4.9, reviews: 11 },
    ]
  },
  {
    id: 'portfolios',
    label: 'Personal Portfolios',
    icon: Briefcase,
    color: '#E67E22',
    complexity: 'medium',
    items: [
      { name: "Kiki Garod's Portfolio", url: 'https://kikigarod.com', desc: 'Filmmaker portfolio with immersive video backgrounds, project case studies, and contact form.', rating: 5.0, reviews: 18 },
      { name: 'Portfolio Pro', url: 'https://roguecode.dev/portfolio', desc: 'Creative professional portfolio template with project filtering, lightbox gallery, and blog.', rating: 4.8, reviews: 15 },
      { name: 'Photography Showcase', url: 'https://roguecode.dev/photography', desc: 'Photography portfolio with full-screen gallery, client proofing, and print store integration.', rating: 4.7, reviews: 10 },
      { name: 'Freelancer Hub', url: 'https://roguecode.dev/freelancer', desc: 'Freelancer platform site with service packages, client testimonials, and project inquiry form.', rating: 4.8, reviews: 12 },
    ]
  },
  {
    id: 'tech',
    label: 'Tech Startups',
    icon: Monitor,
    color: '#3498DB',
    complexity: 'complex',
    items: [
      { name: 'Support Ticket AI Agent', url: 'https://roguecode.ai/support-agent', desc: 'AI-powered support ticket automation system with intelligent routing, responses, and analytics.', rating: 4.9, reviews: 22 },
      { name: 'Custom Chatbot Platform', url: 'https://roguecode.ai/chatbots', desc: 'Custom AI chatbot platform with business data training, multi-channel deployment, and analytics.', rating: 4.8, reviews: 17 },
      { name: 'Trading Bot System', url: 'https://roguecode.ai/trading', desc: 'Algorithmic trading bot with real-time market data, strategy backtesting, and portfolio management.', rating: 4.7, reviews: 14 },
      { name: 'Data Pipeline Automation', url: 'https://roguecode.ai/pipelines', desc: 'Enterprise data pipeline solution with ETL workflows, real-time processing, and monitoring dashboards.', rating: 4.8, reviews: 10 },
    ]
  },
  {
    id: 'wellness',
    label: 'Wellness & Health',
    icon: Sparkles,
    color: '#27AE60',
    complexity: 'simple',
    items: [
      { name: 'Chelsea Man Spa', url: 'https://chelseamanspa.com', desc: 'Premium wellness and grooming platform with membership plans, online booking, and retail store.', rating: 5.0, reviews: 24 },
      { name: 'Fitness Tracker App', url: 'https://roguecode.dev/fitness', desc: 'Cross-platform fitness tracking app with workout logging, progress charts, and social features.', rating: 4.8, reviews: 16 },
      { name: 'Yoga Studio Pro', url: 'https://roguecode.dev/yoga', desc: 'Yoga studio website with class schedules, instructor profiles, online booking, and streaming portal.', rating: 4.7, reviews: 11 },
      { name: 'Meditation App', url: 'https://roguecode.dev/meditate', desc: 'Mindfulness and meditation app with guided sessions, progress tracking, and community features.', rating: 4.6, reviews: 9 },
    ]
  },
  {
    id: 'restaurants',
    label: 'Restaurants & Food',
    icon: UtensilsCrossed,
    color: '#E74C3C',
    complexity: 'simple',
    items: [
      { name: 'Crumbs Bakery', url: 'https://crumbsbakery.in', desc: 'Bakery and cafe site with online ordering, daily specials, catering menu, and store locator.', rating: 5.0, reviews: 15 },
      { name: 'Restaurant Booking Pro', url: 'https://roguecode.dev/restaurant', desc: 'Fine dining restaurant website with reservation system, menu PDFs, wine list, and private events.', rating: 4.9, reviews: 13 },
      { name: 'Food Delivery App', url: 'https://roguecode.dev/food-delivery', desc: 'Custom food delivery platform with real-time tracking, restaurant dashboard, and payment integration.', rating: 4.8, reviews: 10 },
      { name: 'Quick Serve Template', url: 'https://roguecode.dev/quick-serve', desc: 'Fast-casual restaurant site with online ordering, loyalty rewards, and franchise locations.', rating: 4.7, reviews: 8 },
    ]
  },
  {
    id: 'fitness',
    label: 'Fitness & Yoga',
    icon: Dumbbell,
    color: '#1ABC9C',
    complexity: 'simple',
    items: [
      { name: 'Fitness Tracker App', url: 'https://roguecode.dev/fitness', desc: 'Mobile fitness app with workout plans, exercise library, progress tracking, and social challenges.', rating: 4.8, reviews: 16 },
      { name: 'Gym Management Pro', url: 'https://roguecode.dev/gym', desc: 'Gym and fitness center website with membership management, class schedules, and trainer profiles.', rating: 4.7, reviews: 12 },
      { name: 'Yoga Studio Pro', url: 'https://roguecode.dev/yoga', desc: 'Yoga studio platform with class streaming, workshop registration, and wellness blog.', rating: 4.7, reviews: 11 },
      { name: 'Personal Trainer Hub', url: 'https://roguecode.dev/trainer', desc: 'Personal trainer website with session booking, workout programs, nutrition guides, and client dashboard.', rating: 4.6, reviews: 7 },
    ]
  },
  {
    id: 'floral',
    label: 'Florists & Gifts',
    icon: Flower2,
    color: '#E91E63',
    complexity: 'simple',
    items: [
      { name: 'Floral Shop Pro', url: 'https://roguecode.dev/floral', desc: 'Florist e-commerce site with arrangement catalog, same-day delivery, and event consultation.', rating: 4.8, reviews: 10 },
      { name: 'Gift Shop Online', url: 'https://roguecode.dev/gifts', desc: 'Gift shop platform with curated collections, gift finder quiz, and personalized wrapping options.', rating: 4.7, reviews: 8 },
      { name: 'Wedding Flowers Studio', url: 'https://roguecode.dev/wedding-flowers', desc: 'Wedding floral design studio with portfolio gallery, consultation booking, and pricing packages.', rating: 4.9, reviews: 14 },
      { name: 'Plant Nursery Pro', url: 'https://roguecode.dev/plant-nursery', desc: 'Plant nursery website with online catalog, plant care guides, delivery scheduling, and loyalty program.', rating: 4.7, reviews: 9 },
    ]
  },
]

const allItems = categories.flatMap(cat =>
  cat.items.map(item => ({ ...item, category: cat.id, categoryLabel: cat.label, categoryColor: cat.color, complexity: cat.complexity }))
)

const complexityOptions = ['all', 'simple', 'medium', 'complex']

function SuggestModal({ open, onClose }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [category, setCategory] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!open) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !url || !category) return
    setSubmitted(true)
    toast.success('Thanks for the suggestion! We\'ll review it soon.', {
      duration: 4000,
      icon: <Send className="size-4" />,
    })
    setTimeout(() => { onClose(); setSubmitted(false); setName(''); setUrl(''); setCategory('') }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border"
        style={{ background: '#1A1817', borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,107,74,0.15)' }}>
                <Lightbulb className="size-5" style={{ color: '#FF6B4A' }} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Suggest a Website</h3>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Know a cute local business website? Share it!</p>
              </div>
            </div>
            <button onClick={onClose} aria-label="Close suggestion form" className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
              <X className="size-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
            </button>
          </div>

          {submitted ? (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-12">
              <div className="size-16 mx-auto rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(46,204,113,0.15)' }}>
                <Send className="size-6" style={{ color: '#2ECC71' }} />
              </div>
              <p className="text-white font-semibold">Thanks!</p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>We'll review your suggestion and add it soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Business Name</label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sweet Petite Bakery" aria-label="Business name" className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] transition-colors" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#fff' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Website URL</label>
                <input required value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" type="url" aria-label="Website URL" className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] transition-colors" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#fff' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Category</label>
                <select required value={category} onChange={e => setCategory(e.target.value)} aria-label="Category" className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] transition-colors" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#fff' }}>
                  <option value="" disabled>Select a category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  <option value="other">Other</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:brightness-110" style={{ background: '#FF6B4A' }}>
                Send Suggestion
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

const blockedSites = ['faunarobotics.com', 'locomotive.ca', 'ponder.ai']

function isBlocked(url) {
  return blockedSites.some(s => url.includes(s))
}

function IframeThumbnail({ url, name }) {
  const [error, setError] = useState(false)
  const blocked = isBlocked(url)

  if (blocked || error) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="flex flex-col items-center gap-2">
          <Globe className="size-6" style={{ color: 'rgba(255,255,255,0.15)' }} />
          <span className="text-[10px] text-center px-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {blocked ? 'Preview blocked' : 'Preview unavailable'}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden" style={{ background: '#fff' }}>
      <iframe
        src={url}
        title={name}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        onError={() => setError(true)}
        style={{ pointerEvents: 'none' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.9) 100%)', pointerEvents: 'none' }} />
    </div>
  )
}

function IframeModalPreview({ url, name }) {
  const [error, setError] = useState(false)
  const blocked = isBlocked(url)

  return (
    <div className="relative overflow-hidden" style={{ height: '80dvh', maxHeight: 800 }}>
      {blocked || error ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4" style={{ background: '#1A1817' }}>
          <AlertCircle className="size-12" style={{ color: 'rgba(255,255,255,0.15)' }} />
          <p className="text-lg font-semibold text-white">{url.replace('https://', '').replace('http://', '').replace(/\/.*/, '')}</p>
          <p className="text-sm" style={{ color: '#8A8A8A' }}>Preview unavailable — open in new tab</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white transition-all hover:brightness-110" style={{ background: '#FF6B4A' }}>
            <ExternalLink className="size-4" /> Open in new tab
          </a>
        </div>
      ) : (
        <iframe
          src={url}
          title={name}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          style={{ background: '#fff' }}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}

export default function ExamplesPage({ onBack }) {
  const [filter, setFilter] = useState('all')
  const [complexityFilter, setComplexityFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [showSuggest, setShowSuggest] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const totalExamples = allItems.length

  const filtered = useMemo(() => {
    return allItems.filter(item => {
      if (filter !== 'all' && item.category !== filter) return false
      if (complexityFilter !== 'all' && item.complexity !== complexityFilter) return false
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.desc.toLowerCase().includes(searchQuery.toLowerCase())) return false
      return true
    })
  }, [filter, complexityFilter, searchQuery])

  const grouped = useMemo(() => {
    const groups = {}
    filtered.forEach(item => {
      if (!groups[item.category]) {
        const cat = categories.find(c => c.id === item.category)
        groups[item.category] = { label: cat.label, icon: cat.icon, color: cat.color, items: [] }
      }
      groups[item.category].items.push(item)
    })
    return groups
  }, [filtered])

  return (
    <div className="min-h-screen" style={{ background: '#0A0A0A' }}>
      {/* Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full border transition-colors" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}>
                <ArrowLeft className="size-4" /> Back
              </button>
              <span className="hidden sm:inline text-sm font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
              <h1 className="hidden sm:block text-sm font-semibold text-white">Local Business Examples</h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ml-1" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
                {totalExamples} sites
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowSuggest(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors" style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', background: 'rgba(255,255,255,0.03)' }}>
                <Plus className="size-3" /> Suggest
              </button>
              <button onClick={() => setViewMode('grid')} aria-label="Grid view" className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}><Grid3X3 className="size-4" /></button>
              <button onClick={() => setViewMode('list')} aria-label="List view" className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}><List className="size-4" /></button>
            </div>
          </div>
          {/* Search & filters */}
          <div className="pb-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
              <input type="text" placeholder="Search businesses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} aria-label="Search businesses" className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B4A] transition-colors" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#fff' }} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {/* Category filter */}
              <div className="relative">
                <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border transition-colors" style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#fff', background: 'rgba(255,255,255,0.04)' }}>
                  <Store className="size-4" />
                  {filter === 'all' ? 'All Types' : categories.find(c => c.id === filter)?.label || 'All Types'}
                  <ChevronDown className="size-3" style={{ color: 'rgba(255,255,255,0.4)' }} />
                </button>
                <AnimatePresence>
                  {showFilters && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute top-full mt-1 left-0 z-50 w-48 rounded-xl border overflow-hidden" style={{ background: '#1A1A1A', borderColor: 'rgba(255,255,255,0.08)' }}>
                      <button onClick={() => { setFilter('all'); setShowFilters(false) }} className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5" style={{ color: filter === 'all' ? '#FF6B4A' : '#aaa' }}>
                        All Types
                      </button>
                      {categories.map(cat => (
                        <button key={cat.id} onClick={() => { setFilter(cat.id); setShowFilters(false) }} className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/5 flex items-center gap-2" style={{ color: filter === cat.id ? cat.color : '#aaa' }}>
                          <cat.icon className="size-3.5" /> {cat.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Complexity filter */}
              <div className="flex gap-1 p-1 rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
                {complexityOptions.map(opt => (
                  <button key={opt} onClick={() => setComplexityFilter(opt)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${complexityFilter === opt ? 'text-white' : 'text-white/40 hover:text-white/70'}`} style={{ background: complexityFilter === opt ? 'rgba(255,255,255,0.1)' : 'transparent' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="pt-44 sm:pt-36 pb-0 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-start gap-3 p-4 rounded-xl border mb-6" style={{ background: 'rgba(255,107,74,0.06)', borderColor: 'rgba(255,107,74,0.15)' }}>
          <AlertCircle className="size-5 shrink-0 mt-0.5" style={{ color: '#FF6B4A' }} />
          <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            <strong style={{ color: 'rgba(255,255,255,0.75)' }}>Inspiration Gallery</strong> — These websites are real examples from around the web, provided for inspiration and reference only. They are <strong style={{ color: 'rgba(255,255,255,0.75)' }}>not</strong> projects built by Rogue Code. Browse the <a href="#case-studies" className="underline hover:no-underline" style={{ color: '#FF6B4A' }}>Case Studies section</a> below for examples of our actual work.
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-32">
            <p className="text-lg font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>No examples found</p>
            <button onClick={() => { setFilter('all'); setComplexityFilter('all'); setSearchQuery('') }} className="mt-4 px-4 py-2 text-sm rounded-full border" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}>
              Clear filters
            </button>
          </div>
        ) : (
          Object.entries(grouped).map(([catId, group]) => (
            <div key={catId} className="mb-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-xl flex items-center justify-center" style={{ background: `${group.color}20` }}>
                  <group.icon className="size-5" style={{ color: group.color }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{group.label}</h2>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>{group.items.length} {group.items.length === 1 ? 'example' : 'examples'}</p>
                </div>
              </motion.div>

              {viewMode === 'grid' ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {group.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedItem(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedItem(item)
                        }
                      }}
                      whileHover={{ y: -4 }}
                      role="button"
                      tabIndex={0}
                      className="group relative rounded-xl border overflow-hidden cursor-pointer transition-all duration-300"
                      style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}
                    >
                      <SiteThumbnail url={item.url} name={item.name} />
                      <div className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'rgba(0,0,0,0.6)', color: group.color }}>
                        {item.complexity}
                      </div>

                      {/* Info */}
                      <div className="p-3.5">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
                          <ExternalLink className="size-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'rgba(255,255,255,0.3)' }} />
                        </div>
                        <p className="mt-1 text-xs leading-relaxed line-clamp-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                        <div className="mt-2 flex items-center gap-3 text-[10px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
                          <span className="flex items-center gap-1">
                            <Star className="size-3" style={{ color: '#FFD700' }} /> {item.rating}
                          </span>
                          <span>{getDomain(item.url)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* List view */
                <div className="space-y-2">
                  {group.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => setSelectedItem(item)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          setSelectedItem(item)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      className="flex items-center gap-4 p-3 rounded-xl border cursor-pointer transition-all hover:bg-white/5"
                      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                    >
                      <div className="size-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${group.color}15` }}>
                        <group.icon className="size-4" style={{ color: group.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-semibold text-white truncate">{item.name}</h3>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full capitalize" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}>{item.complexity}</span>
                        </div>
                        <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="flex items-center gap-1 text-xs" style={{ color: '#FFD700' }}>
                          <Star className="size-3" /> {item.rating}
                        </span>
                        <ExternalLink className="size-3.5" style={{ color: 'rgba(255,255,255,0.2)' }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Suggest Modal */}
      <AnimatePresence>
        {showSuggest && <SuggestModal open={showSuggest} onClose={() => setShowSuggest(false)} />}
      </AnimatePresence>

      {/* Preview Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl"
              style={{ background: '#1A1817' }}
            >
              {/* Browser chrome */}
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)', background: '#222020' }}>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedItem(null)} aria-label="Close preview" className="min-w-[44px] min-h-[44px] flex items-center justify-center" style={{ touchAction: 'manipulation' }}>
                    <span className="size-3 rounded-full bg-[#FF5F57]" />
                  </button>
                  <span className="size-3 rounded-full bg-[#FFBD2E]" />
                  <span className="size-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 mx-4 px-3 py-1.5 rounded-lg text-xs truncate text-center" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A8A8A' }}>
                  <span className="opacity-60">https://</span>
                  {getDomain(selectedItem.url)}
                </div>
                <div className="flex items-center gap-2">
                  <a href={selectedItem.url} target="_blank" rel="noopener noreferrer" aria-label="Open in new tab" className="size-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/10" style={{ color: '#F2F2F2' }}>
                    <ExternalLink className="size-4" />
                  </a>
                  <button onClick={() => setSelectedItem(null)} aria-label="Close preview" className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors hover:bg-white/10" style={{ color: '#F2F2F2', touchAction: 'manipulation' }}>
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <SitePreview url={selectedItem.url} name={selectedItem.name} />
              {/* Info overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl flex items-center justify-center" style={{ background: `${selectedItem.categoryColor || '#FF6B4A'}20` }}>
                    {(() => {
                      const CatIcon = categories.find(c => c.id === selectedItem.category)?.icon || Store
                      return <CatIcon className="size-5" style={{ color: selectedItem.categoryColor || '#FF6B4A' }} />
                    })()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedItem.name}</h3>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {selectedItem.categoryLabel} · {selectedItem.complexity} · ★ {selectedItem.rating}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
