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
      { name: 'Ezepaws', url: 'https://ezepaws.com', desc: 'Pet services platform with online booking, service listings, and care management tools.', rating: 4.8, reviews: 7 },
      { name: 'Kindred Pet Care', url: 'https://kindredpetcare.com', desc: 'Veterinary and pet care website with wellness resources, service info, and appointment scheduling.', rating: 4.9, reviews: 11 },
      { name: 'Skitown Coffee', url: 'https://skitowncoffee.com', desc: 'Pet-friendly coffee roaster with a warm, community-focused website design.', rating: 5.0, reviews: 8 },
      { name: 'Radiant Hot Yoga', url: 'https://radianthotyoga.com', desc: 'Wellness studio site with class scheduling, membership info, and calming visual design.', rating: 4.7, reviews: 6 },
    ]
  },
  {
    id: 'coffee',
    label: 'Coffee Shops',
    icon: Coffee,
    color: '#6F4E37',
    complexity: 'simple',
    items: [
      { name: 'Skitown Coffee', url: 'https://skitowncoffee.com', desc: 'Colorado coffee roaster showcasing single-origin beans, brewing guides, and cafe culture.', rating: 5.0, reviews: 14 },
      { name: "Sorbenot's Coffee", url: 'https://sorbenots.com', desc: 'Premium coffee brand with curated blends, brewing tutorials, and subscription options.', rating: 4.9, reviews: 12 },
      { name: 'Jazean Coffee', url: 'https://jazeancoffee.com', desc: 'Specialty coffee company with ethically sourced beans and modern brand presence.', rating: 4.8, reviews: 10 },
      { name: 'Gelato Laboca', url: 'https://gelatolaboca.com', desc: 'Artisan gelato shop with vibrant product photography and seasonal flavor offerings.', rating: 4.7, reviews: 9 },
    ]
  },
  {
    id: 'cafes',
    label: 'Cafes & Bakeries',
    icon: Cake,
    color: '#D4A574',
    complexity: 'simple',
    items: [
      { name: 'Donut Shop', url: 'https://donutshop.framer.website', desc: 'Playful donut shop website with mouth-watering product showcases and online ordering.', rating: 4.9, reviews: 13 },
      { name: 'The Olly', url: 'https://theolly.it', desc: 'Authentic Italian cafe and restaurant with seasonal menu and warm atmosphere.', rating: 4.8, reviews: 11 },
      { name: 'Crescente Sicily', url: 'https://crescentesicily.com', desc: 'Sicilian food brand with artisan products and rich culinary heritage storytelling.', rating: 4.7, reviews: 8 },
      { name: 'Gelato Laboca', url: 'https://gelatolaboca.com', desc: 'Artisan gelateria with hand-crafted frozen treats and vibrant product presentation.', rating: 4.8, reviews: 10 },
    ]
  },
  {
    id: 'barbers',
    label: 'Barbers & Salons',
    icon: Scissors,
    color: '#2B7A78',
    complexity: 'simple',
    items: [
      { name: 'Hagis Barbering', url: 'https://hagisbarbering.com', desc: 'Premium barbershop in Germany with online booking, service menu, and gallery of cuts.', rating: 4.9, reviews: 15 },
      { name: 'Don Barber', url: 'https://donbarber.com', desc: 'Modern barbershop with sleek website, appointment scheduling, and styling portfolio.', rating: 4.8, reviews: 12 },
      { name: 'Studio Tyrsa', url: 'https://studiotyrsa.com', desc: 'Creative design studio with bold aesthetic and innovative portfolio presentation.', rating: 4.7, reviews: 9 },
      { name: 'Fantik Studio', url: 'https://fantik.studio', desc: 'Creative agency with cutting-edge design work and immersive brand experiences.', rating: 4.9, reviews: 14 },
    ]
  },
  {
    id: 'studios',
    label: 'Creative Studios',
    icon: Palette,
    color: '#9B59B6',
    complexity: 'medium',
    items: [
      { name: 'Fantik Studio', url: 'https://fantik.studio', desc: 'Multidisciplinary creative studio with bold visual identity and innovative project work.', rating: 5.0, reviews: 20 },
      { name: 'Design in DC', url: 'https://designindc.com', desc: 'Washington DC design agency delivering brand strategy, web design, and creative direction.', rating: 4.9, reviews: 16 },
      { name: 'Synchronized Studio', url: 'https://synchronized.studio', desc: 'Design studio specializing in brand identity, digital products, and visual systems.', rating: 4.8, reviews: 13 },
      { name: 'Studio Tyrsa', url: 'https://studiotyrsa.com', desc: 'Boutique creative studio with expertise in branding, art direction, and visual design.', rating: 4.8, reviews: 11 },
    ]
  },
  {
    id: 'portfolios',
    label: 'Personal Portfolios',
    icon: Briefcase,
    color: '#E67E22',
    complexity: 'medium',
    items: [
      { name: 'Federico Pian', url: 'https://federicopian.com', desc: 'Designer portfolio showcasing creative projects, brand work, and visual design expertise.', rating: 5.0, reviews: 22 },
      { name: 'John Kail', url: 'https://johnkail.com', desc: 'Creative professional portfolio with immersive project case studies and design work.', rating: 4.9, reviews: 18 },
      { name: 'Christina Hohner', url: 'https://christinahohner.de', desc: 'German designer portfolio featuring clean layout, typography, and creative direction.', rating: 4.8, reviews: 14 },
      { name: 'Aino Agency', url: 'https://aino.agency', desc: 'Design agency portfolio with brand strategy work, visual identity systems, and client results.', rating: 4.9, reviews: 17 },
    ]
  },
  {
    id: 'tech',
    label: 'Tech Startups',
    icon: Monitor,
    color: '#3498DB',
    complexity: 'complex',
    items: [
      { name: 'Getmicro', url: 'https://getmicro.com', desc: 'SaaS platform for micro-businesses offering tools for management, growth, and operations.', rating: 4.9, reviews: 24 },
      { name: 'SafetyWing', url: 'https://safetywing.com', desc: 'Insurance technology company providing global health insurance for remote workers and nomads.', rating: 4.8, reviews: 20 },
      { name: 'Kriss AI', url: 'https://kriss.ai', desc: 'AI-powered platform delivering intelligent automation solutions for modern businesses.', rating: 4.7, reviews: 15 },
      { name: 'Minitap', url: 'https://minitap.ai', desc: 'Mobile-first platform with AI-driven features and intuitive user experience design.', rating: 4.8, reviews: 13 },
    ]
  },
  {
    id: 'wellness',
    label: 'Wellness & Health',
    icon: Sparkles,
    color: '#27AE60',
    complexity: 'simple',
    items: [
      { name: 'Radiant Hot Yoga', url: 'https://radianthotyoga.com', desc: 'Hot yoga studio in Canada with class schedules, instructor profiles, and wellness resources.', rating: 4.9, reviews: 18 },
      { name: 'Yoga Maya', url: 'https://yogamaya.com', desc: 'Yoga and wellness studio with meditation resources, class booking, and holistic health content.', rating: 4.8, reviews: 15 },
      { name: 'Kindred Pet Care', url: 'https://kindredpetcare.com', desc: 'Veterinary wellness center with pet health resources, service listings, and care guides.', rating: 4.7, reviews: 11 },
      { name: 'Sadies Floral', url: 'https://sadiesfloral.com', desc: 'Floral design studio bringing wellness through botanical beauty and artistic arrangements.', rating: 4.8, reviews: 9 },
    ]
  },
  {
    id: 'restaurants',
    label: 'Restaurants & Food',
    icon: UtensilsCrossed,
    color: '#E74C3C',
    complexity: 'simple',
    items: [
      { name: 'Mugaritz', url: 'https://mugaritz.com', desc: 'Michelin-starred avant-garde restaurant in Spain known for innovative gastronomy and tasting menus.', rating: 5.0, reviews: 25 },
      { name: 'Tastavents', url: 'https://tastavents.com', desc: 'Restaurant and catering company with event menus, culinary services, and food gallery.', rating: 4.8, reviews: 14 },
      { name: 'The Olly', url: 'https://theolly.it', desc: 'Authentic Italian restaurant with traditional recipes, wine list, and warm dining atmosphere.', rating: 4.9, reviews: 17 },
      { name: 'Crescente Sicily', url: 'https://crescentesicily.com', desc: 'Sicilian food brand celebrating Mediterranean cuisine with premium products and recipes.', rating: 4.7, reviews: 10 },
    ]
  },
  {
    id: 'fitness',
    label: 'Fitness & Yoga',
    icon: Dumbbell,
    color: '#1ABC9C',
    complexity: 'simple',
    items: [
      { name: 'Radiant Hot Yoga', url: 'https://radianthotyoga.com', desc: 'Hot yoga studio with heated classes, teacher training, and community wellness programs.', rating: 4.9, reviews: 16 },
      { name: 'Yoga Maya', url: 'https://yogamaya.com', desc: 'Yoga studio offering diverse class styles, meditation sessions, and holistic wellness programs.', rating: 4.8, reviews: 14 },
      { name: 'Skitown Coffee', url: 'https://skitowncoffee.com', desc: 'Active lifestyle cafe fueling the fitness community with premium coffee and community space.', rating: 4.7, reviews: 10 },
      { name: 'Kindred Pet Care', url: 'https://kindredpetcare.com', desc: 'Pet wellness center promoting active, healthy lifestyles for pets through preventive care.', rating: 4.6, reviews: 8 },
    ]
  },
  {
    id: 'floral',
    label: 'Florists & Gifts',
    icon: Flower2,
    color: '#E91E63',
    complexity: 'simple',
    items: [
      { name: 'Sadies Floral', url: 'https://sadiesfloral.com', desc: 'Floral design studio with stunning arrangements for weddings, events, and everyday occasions.', rating: 4.9, reviews: 15 },
      { name: 'Restoration Blooms Floral', url: 'https://restorationbloomsfloral.com', desc: 'Floral design studio specializing in bespoke arrangements, event flowers, and botanical art.', rating: 4.8, reviews: 11 },
      { name: 'Gelato Laboca', url: 'https://gelatolaboca.com', desc: 'Colorful gelato shop with beautiful presentation and gift-worthy product packaging.', rating: 4.7, reviews: 9 },
      { name: 'Donut Shop', url: 'https://donutshop.framer.website', desc: 'Delightful donut shop with gift boxes, catering options, and shareable treat arrangements.', rating: 4.8, reviews: 12 },
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

const blockedSites = ['cooperpetcare.com', 'evasanchez.com', 'emmettsparling.com', 'flowerdose.com.au', 'goshaflowers.com', 'consideritflowers.com', 'casacorpo.de', 'dhunwellness.com', 'antaraspa.com', 'altavistaanimalhospital.com', 'freshcutbarbershop.com', 'remote.com', 'floom.com', 'creativeapproa.ch', 'studionamma.com', 'faunarobotics.com', 'locomotive.ca', 'ponder.ai']

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
