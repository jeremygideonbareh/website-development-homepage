import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ExternalLink, Search, Grid3X3, List,
  Store, Coffee, Scissors, Dog, Cake, Palette, Briefcase,
  Monitor, Sparkles, ChevronDown, X, Star, Plus, Globe,
  UtensilsCrossed, Dumbbell, Flower2, AlertCircle,
  Lightbulb, Send
} from 'lucide-react'
import { toast } from 'sonner'

const categories = [
  {
    id: 'groomers',
    label: 'Pet Groomers',
    icon: Dog,
    color: '#E85D3A',
    complexity: 'simple',
    items: [
      { name: 'Happy Tails Pet Grooming', url: 'https://happytailspetgroomingclayton.com/', desc: 'Grooming service for dogs of various breeds including Pomeranians and more.', rating: 4.7, reviews: 109 },
      { name: 'Community Bark Dog Wash & Groom', url: 'https://communitybark.net/', desc: 'Dog wash and grooming in Milwaukee with self-serve and full-service options.', rating: 4.8, reviews: 312 },
      { name: 'Mod Mutt Salon', url: 'https://modmuttsalon.com/', desc: 'Award-winning dog and cat grooming services in Austin with visible booking.', rating: 4.9, reviews: 245 },
      { name: 'My Cute Pawz Pet Salon', url: 'https://www.mycutepawz.com/', desc: 'Pet salon offering grooming, daycare, portrait and boutique services in Georgia.', rating: 4.6, reviews: 178 },
      { name: 'Woof Gang Bakery & Grooming', url: 'https://woofgangbakery.com/pages/locations/wendell', desc: 'Chain outlet for pet grooming with luxurious sPaw treatments and pet products.', rating: 4.9, reviews: 209 },
      { name: 'Pet Beauty Mobile Grooming', url: 'https://petbeautymobile.com/', desc: 'Mobile grooming that comes to your home with luxury care for your best friend.', rating: 4.8, reviews: 95 },
      { name: 'Eze Paws', url: 'https://ezepaws.com/', desc: 'Queens-based groomer with visible booking button and verified 5-star reviews.', rating: 4.9, reviews: 156 },
    ]
  },
  {
    id: 'coffee',
    label: 'Coffee Shops',
    icon: Coffee,
    color: '#6F4E37',
    complexity: 'simple',
    items: [
      { name: 'Indaba Coffee Roasters', url: 'https://www.indabacoffee.com/', desc: 'Specialty coffee roastery with a cozy, community-focused cafe atmosphere.', rating: 4.6, reviews: 450 },
      { name: 'Ceremony Coffee Roasters', url: 'https://ceremonycoffee.com', desc: 'Award-winning specialty roaster with multiple cafes across the mid-Atlantic.', rating: 4.8, reviews: 520 },
      { name: 'City On A Hill Coffee', url: 'https://cityonahillcoffee.com/', desc: 'Independent coffee roastery and cafe with a warm, inviting space.', rating: 4.8, reviews: 320 },
      { name: 'Elementary Coffee Co', url: 'https://www.elementarycoffee.co/', desc: 'Harrisburg-based coffee roaster with gorgeous photography and clean design.', rating: 4.7, reviews: 180 },
      { name: 'Ski Town Coffee', url: 'https://skitowncoffee.com/', desc: 'Mountain-themed coffee shop with artisan roasts and a rustic cabin vibe.', rating: 4.7, reviews: 180 },
      { name: 'Sorbenots Coffee', url: 'https://www.sorbenots.com/', desc: 'Charming local coffee shop known for friendly service and handcrafted beverages.', rating: 4.6, reviews: 290 },
      { name: 'The Coffee Movement', url: 'https://www.thecoffeemovement.com/', desc: 'San Francisco cafe with a simple design and community-focused approach.', rating: 4.5, reviews: 210 },
    ]
  },
  {
    id: 'cafes',
    label: 'Cafes & Bakeries',
    icon: Cake,
    color: '#D4A574',
    complexity: 'simple',
    items: [
      { name: 'Lady Yum', url: 'http://www.ladyyum.com/', desc: 'Charming bakery and cafe specializing in French macarons and pastries.', rating: 4.7, reviews: 560 },
      { name: 'Tori\'s Bakeshop', url: 'https://torisbakeshop.ca/', desc: 'Vegan bakery with soft earthy colors, big clear photos and easy navigation.', rating: 4.8, reviews: 230 },
      { name: 'Honeybear Bake Shop', url: 'https://www.honeybearbakeshop.com/', desc: 'Bright and playful bakery with pink tones, curvy shapes, and fun copy.', rating: 4.9, reviews: 340 },
      { name: 'TOAD Bakery', url: 'https://www.toadbakery.com/', desc: 'Minimalist grid bakery with professional product photography and clear pricing.', rating: 4.7, reviews: 180 },
      { name: 'Fuji Bakery', url: 'http://fujibakeryinc.com/', desc: 'Japanese-French fusion bakery with stunning artisan breads and pastries.', rating: 4.6, reviews: 670 },
      { name: 'Crust Vegan Bakery', url: 'https://www.crustveganbakery.com/', desc: 'Vegan bakery with warm terracotta color scheme and charming storefront design.', rating: 4.8, reviews: 290 },
      { name: 'Le Panier', url: 'https://www.lepanier.com/', desc: 'French bakery in Pike Place Market with authentic croissants and baguettes.', rating: 4.7, reviews: 890 },
    ]
  },
  {
    id: 'barbers',
    label: 'Barbers & Salons',
    icon: Scissors,
    color: '#2B7A78',
    complexity: 'simple',
    items: [
      { name: 'Blue Spruce Barber Shop', url: 'https://www.bluesprucebarbershop.com/', desc: 'Classic barbershop with a modern touch — hot towels, straight razors, great conversation.', rating: 4.8, reviews: 310 },
      { name: 'Scissors & Scotch', url: 'https://www.scissorsscotch.com/', desc: 'Upscale barber lounge with full-service bar — grooming meets craft cocktails.', rating: 4.7, reviews: 480 },
      { name: 'Birds Barbershop', url: 'https://birdsbarbershop.com/', desc: 'Austin\'s voted #1 barbershop with bold branding and seamless online booking.', rating: 4.6, reviews: 890 },
      { name: 'Mustache Barbershop', url: 'https://mustachebarbershop.com/', desc: 'Neon-lit barbershop with a cute aesthetic and strong visual identity.', rating: 4.7, reviews: 130 },
      { name: 'Shed Barber', url: 'https://shedbarber.com/', desc: 'Modern barbershop with split-screen hero and smooth image transitions.', rating: 4.5, reviews: 85 },
      { name: 'Boardroom Salon', url: 'https://boardroomsalon.com/', desc: 'Upscale men\'s styling lounge with masculine design and strong typography.', rating: 4.6, reviews: 210 },
      { name: 'Bonefade Barbers', url: 'https://www.bonefadebarbers.com/', desc: 'NYC barber with sleek layout and bold call-to-action booking buttons.', rating: 4.8, reviews: 95 },
    ]
  },
  {
    id: 'studios',
    label: 'Creative Studios',
    icon: Palette,
    color: '#9B59B6',
    complexity: 'medium',
    items: [
      { name: 'Cuberto', url: 'https://cuberto.com', desc: 'Digital design studio known for award-winning interactive experiences.', rating: 4.9, reviews: 45 },
      { name: 'Monogrid', url: 'https://monogrid.com', desc: 'Creative agency specializing in brand identity and digital design.', rating: 4.8, reviews: 30 },
      { name: 'Studio Simms', url: 'https://studio-simms.com', desc: 'Design studio crafting beautiful brand experiences and websites.', rating: 4.7, reviews: 25 },
      { name: 'Noomo Agency', url: 'https://noomoagency.com', desc: 'Multi-award winning agency for creative direction and web design.', rating: 4.9, reviews: 60 },
      { name: 'Playfight', url: 'https://www.letsplayfight.com', desc: 'Creative studio pushing boundaries with bold design and motion.', rating: 4.8, reviews: 35 },
      { name: 'Design in DC', url: 'https://designindc.com/', desc: 'DC-based design studio creating beautiful brand identities and web experiences.', rating: 4.7, reviews: 42 },
      { name: 'Kneads Bakeshop by Design in DC', url: 'https://kneadsbakeshop.com/', desc: 'Artisan bakery website by Design in DC with modular bento grid layout.', rating: 4.8, reviews: 55 },
    ]
  },
  {
    id: 'portfolios',
    label: 'Personal Portfolios',
    icon: Briefcase,
    color: '#E67E22',
    complexity: 'medium',
    items: [
      { name: 'John Kail', url: 'https://www.johnkail.com/', desc: 'Clean personal portfolio with minimal design and strong typography.', rating: 4.6, reviews: 20 },
      { name: 'ToddSunn Company', url: 'https://www.toddsunn.com/', desc: 'Creative portfolio showcasing brand identity and digital art projects.', rating: 4.5, reviews: 15 },
      { name: 'Sadie\'s Couture Floral', url: 'https://www.sadiesfloral.com/', desc: 'Floral design portfolio with beautiful photography and elegant layout.', rating: 4.7, reviews: 85 },
      { name: 'Tonic Blooms', url: 'https://tonicblooms.com/', desc: 'Toronto flower delivery with a beautifully designed e-commerce experience.', rating: 4.8, reviews: 320 },
      { name: 'Junction361', url: 'http://junction361.com/', desc: 'Creative portfolio website with a clean, minimal design aesthetic.', rating: 4.6, reviews: 20 },
      { name: 'Stylist Scott', url: 'https://www.stylistscott.co/', desc: 'Personal portfolio for a professional stylist showcasing creative work.', rating: 4.5, reviews: 15 },
      { name: 'Donut Shop Framer', url: 'https://donutshop.framer.website/', desc: 'Playful bakery portfolio on Framer with drag-and-drop donut ordering.', rating: 4.7, reviews: 45 },
    ]
  },
  {
    id: 'tech',
    label: 'Tech Startups',
    icon: Monitor,
    color: '#3498DB',
    complexity: 'complex',
    items: [
      { name: 'Apechain', url: 'https://apechain.com', desc: 'Cutting-edge blockchain platform with stunning 3D interactive design.', rating: 4.8, reviews: 90 },
      { name: 'Acova AI', url: 'https://acova.ai', desc: 'AI platform website with clean typography and smooth transitions.', rating: 4.7, reviews: 55 },
      { name: 'We Are Impossible', url: 'https://www.weareimpossible.com', desc: 'Creative tech studio with award-winning web design.', rating: 4.9, reviews: 75 },
      { name: 'Armory AI', url: 'https://www.armory.in', desc: 'Enterprise AI solutions with a bold, modern web presence.', rating: 4.6, reviews: 40 },
      { name: 'Element', url: 'https://www.element.in/', desc: 'Design-forward tech company with compelling CTAs and social proof.', rating: 4.5, reviews: 65 },
      { name: 'Eversight Labs', url: 'https://eversightlabs.com/', desc: 'AI platform with intuitive design and captivating visual storytelling.', rating: 4.7, reviews: 35 },
      { name: 'Tethr', url: 'https://tethr.com/', desc: 'Business intelligence platform with impeccable use of white space.', rating: 4.6, reviews: 50 },
    ]
  },
  {
    id: 'wellness',
    label: 'Wellness & Health',
    icon: Sparkles,
    color: '#27AE60',
    complexity: 'simple',
    items: [
      { name: 'Greenhaus Coffee', url: 'https://www.greenhauscoffee.com/', desc: 'Plant-filled coffee shop focusing on sustainability and well-being.', rating: 4.6, reviews: 175 },
      { name: 'Lavender Coffee Boutique', url: 'http://lavendercb.com/', desc: 'Wellness-focused coffee shop with calming lavender-infused drinks.', rating: 4.6, reviews: 200 },
      { name: 'Mountain Phoenix Roastery', url: 'https://www.mountainphoenixcoffee.com/', desc: 'Mountain-view cafe and roastery focused on organic wellness.', rating: 4.7, reviews: 150 },
      { name: 'Three Bees Pottery & Coffee', url: 'https://threebeeskck.com/', desc: 'Unique wellness space combining pottery with a coffee bar.', rating: 4.5, reviews: 85 },
      { name: 'Vinaka Cafe', url: 'http://vinakacafe.net/', desc: 'Community cafe with a wellness-focused menu and welcoming space.', rating: 4.4, reviews: 95 },
      { name: 'Pet Evolution', url: 'https://www.petevolution.com/', desc: 'Joyful pet wellness brand with heart-melting imagery and clean design.', rating: 4.8, reviews: 210 },
      { name: 'Scenthound', url: 'https://scenthound.com/', desc: 'Wellness-focused pet grooming franchises with membership-based model.', rating: 4.7, reviews: 340 },
    ]
  },
  {
    id: 'restaurants',
    label: 'Restaurants & Food',
    icon: UtensilsCrossed,
    color: '#E74C3C',
    complexity: 'simple',
    items: [
      { name: 'Notorious Nooch Co.', url: 'https://notoriousnooch.co/', desc: 'Playful nutritional yeast brand with unique, high-quality and artistic design.', rating: 4.8, reviews: 65 },
      { name: 'Sweet Mae\'s Cookie Co.', url: 'https://sweetmaescookies.com/', desc: 'Story-driven cookie company website that reads like a charming narrative.', rating: 4.9, reviews: 120 },
      { name: 'Modern Pastry Shop', url: 'https://modernpastry.com/', desc: 'Boston pastry shop with classic design, friendly typography and clear menu.', rating: 4.5, reviews: 430 },
      { name: 'Wild Goose Bakery', url: 'https://www.wildgoosebakery.com/', desc: 'UK bakery site with elegant earthy tones and mouth-watering food imagery.', rating: 4.7, reviews: 95 },
      { name: 'Partake Foods', url: 'https://partakefoods.com/', desc: 'Allergy-friendly snack brand with user-friendly layout and strong branding.', rating: 4.6, reviews: 180 },
      { name: 'Grand Central Bakery', url: 'https://www.grandcentralbakery.com/', desc: 'Artisan bread and pastries with clear navigation and responsive design.', rating: 4.7, reviews: 560 },
      { name: 'Forma Bakery', url: 'https://www.formabakery.com/', desc: 'Bakery with bold blue branding, cute cat illustrations and uncluttered design.', rating: 4.6, reviews: 75 },
    ]
  },
  {
    id: 'fitness',
    label: 'Fitness & Yoga',
    icon: Dumbbell,
    color: '#1ABC9C',
    complexity: 'simple',
    items: [
      { name: 'Donut Shop (Framer)', url: 'https://donutshop.framer.website/', desc: 'Playful food brand with interactive menu and drag-and-drop ordering experience.', rating: 4.5, reviews: 30 },
      { name: 'Pristine Carpet Clean', url: 'https://www.apristinecarpetclean.com.au/', desc: 'Australian cleaning service with clear brand identity and customer focus.', rating: 4.6, reviews: 145 },
      { name: 'Barbara Tatum Law', url: 'https://www.barbaratatumlaw.com/', desc: 'Legal services website with clean layout and professional trust signals.', rating: 4.4, reviews: 25 },
      { name: 'Bergen Pro Notary', url: 'https://www.bergenpronotary.com/', desc: 'Notary service with simple, professional design and easy navigation.', rating: 4.5, reviews: 40 },
      { name: 'Wiggs CPA', url: 'https://www.wiggscpa.com/', desc: 'Accounting firm website built on Webflow with modern, professional design.', rating: 4.3, reviews: 35 },
      { name: 'JWL Accountants', url: 'https://www.jwlouie.com/', desc: 'Squarespace-built accounting site with clear services and trust signals.', rating: 4.4, reviews: 50 },
      { name: 'Albertson & Davidson Law', url: 'https://www.aldavlaw.com/', desc: 'Law firm with professional design, clear practice areas and team profiles.', rating: 4.5, reviews: 65 },
    ]
  },
  {
    id: 'floral',
    label: 'Florists & Gifts',
    icon: Flower2,
    color: '#E91E63',
    complexity: 'simple',
    items: [
      { name: 'Tonic Blooms', url: 'https://tonicblooms.com/', desc: 'Toronto flower delivery with beautifully designed e-commerce and gift options.', rating: 4.8, reviews: 320 },
      { name: 'Sadie\'s Couture Floral', url: 'https://www.sadiesfloral.com/', desc: 'Floral design studio with stunning photography and elegant layout.', rating: 4.7, reviews: 85 },
      { name: 'Sweet Spot Whitewater', url: 'https://www.sweetspotwhitewater.com/', desc: 'Bakery, cafe and gift shop with warm branding and clear service menus.', rating: 4.6, reviews: 120 },
      { name: 'Three Bees Pottery & Coffee', url: 'https://threebeeskck.com/', desc: 'Gift shop combining handmade pottery with a welcoming coffee bar.', rating: 4.5, reviews: 85 },
      { name: 'Art Cafe Nyack', url: 'http://www.artcafenyack.com/', desc: 'NY cafe and art space with clean design showcasing local artists.', rating: 4.4, reviews: 65 },
      { name: 'Belle Epicurean', url: 'http://www.belleepicurean.com/', desc: 'Bakery-cafe with gift baskets, pastries and house-made treats.', rating: 4.1, reviews: 430 },
      { name: 'Beaucoup Bakery', url: 'https://www.beaucoupbakery.com/', desc: 'Parisian-style Vancouver bakery with elegant design and beautiful pastry photos.', rating: 4.7, reviews: 195 },
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
            <button onClick={onClose} className="size-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
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
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sweet Petite Bakery" className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none transition-colors" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#fff' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Website URL</label>
                <input required value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" type="url" className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none transition-colors" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#fff' }} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Category</label>
                <select required value={category} onChange={e => setCategory(e.target.value)} className="w-full px-3 py-2.5 text-sm rounded-xl border outline-none transition-colors" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#fff' }}>
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

function getScreenshotUrl(url) {
  return `https://api.miniature.io/screenshot?url=${encodeURIComponent(url)}&width=400&height=300`
}

function ScreenshotThumbnail({ url, name }) {
  const [error, setError] = useState(false)

  return (
    <div className="relative aspect-[4/3] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Globe className="size-6" style={{ color: 'rgba(255,255,255,0.15)' }} />
            <span className="text-[10px] text-center px-4" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Preview unavailable
            </span>
          </div>
        </div>
      ) : (
        <img
          src={getScreenshotUrl(url)}
          alt={`Preview of ${name}`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          onError={() => setError(true)}
          style={{ background: 'rgba(255,255,255,0.02)' }}
        />
      )}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.9) 100%)' }} />
    </div>
  )
}

function ScreenshotModalPreview({ url, name }) {
  const [error, setError] = useState(false)

  return (
    <div className="relative overflow-hidden" style={{ height: '80vh', maxHeight: 800 }}>
      {error ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4" style={{ background: '#1A1817' }}>
          <AlertCircle className="size-12" style={{ color: 'rgba(255,255,255,0.15)' }} />
          <p className="text-lg font-semibold text-white">{url.replace('https://', '').replace('http://', '').replace(/\/.*/, '')}</p>
          <p className="text-sm" style={{ color: '#8A8A8A' }}>Preview unavailable — open in new tab</p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white transition-all hover:brightness-110" style={{ background: '#FF6B4A' }}>
            <ExternalLink className="size-4" /> Open in new tab
          </a>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <img
            src={getScreenshotUrl(url)}
            alt={`Preview of ${name}`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            onError={() => setError(true)}
            style={{ background: '#1A1817' }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, rgba(10,10,10,0.9))' }} />
        </div>
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

  function getDomain(url) {
    try { return new URL(url).hostname.replace('www.', '') } catch { return url }
  }

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
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}><Grid3X3 className="size-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}><List className="size-4" /></button>
            </div>
          </div>
          {/* Search & filters */}
          <div className="pb-4 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
              <input type="text" placeholder="Search businesses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border outline-none transition-colors" style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#fff' }} />
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

      {/* Results */}
      <div className="pt-36 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
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
                      whileHover={{ y: -4 }}
                      className="group relative rounded-xl border overflow-hidden cursor-pointer transition-all duration-300"
                      style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.03)' }}
                    >
                      <ScreenshotThumbnail url={item.url} name={item.name} />
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
                  <button onClick={() => setSelectedItem(null)} className="size-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all" />
                  <span className="size-3 rounded-full bg-[#FFBD2E]" />
                  <span className="size-3 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 mx-4 px-3 py-1.5 rounded-lg text-xs truncate text-center" style={{ background: 'rgba(255,255,255,0.05)', color: '#8A8A8A' }}>
                  <span className="opacity-60">https://</span>
                  {getDomain(selectedItem.url)}
                </div>
                <div className="flex items-center gap-2">
                  <a href={selectedItem.url} target="_blank" rel="noopener noreferrer" className="size-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/10" style={{ color: '#F2F2F2' }}>
                    <ExternalLink className="size-4" />
                  </a>
                  <button onClick={() => setSelectedItem(null)} className="size-8 flex items-center justify-center rounded-full transition-colors hover:bg-white/10" style={{ color: '#F2F2F2' }}>
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <ScreenshotModalPreview url={selectedItem.url} name={selectedItem.name} />
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
