import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lock, Download, Check, X, AlertCircle, FileText, Shield, Clock, Code, DollarSign, Users, Zap, Star, TrendingUp } from 'lucide-react'

const AUTH_TOKEN_KEY = 'rogue_auth_token'
const SALES_ROLE = 'sales'

const tiers = [
  {
    name: 'Basic',
    monthlyPrice: '₹7,000',
    yearlyPrice: '₹70,000',
    priceUSD: '$85',
    yearlyUSD: '$850',
    desc: 'A clean, responsive website that gets your business online fast. Ideal for freelancers, local businesses, and early-stage startups.',
    accent: '#E85D3A',
    color: 'from-orange-500 to-rose-500',
    bestFor: ['Portfolio', 'Landing Page', 'Small Business Site', 'Freelancer Presence'],
    scope: [
      '5-page responsive website built from scratch (no templates)',
      'Mobile-first design with responsive breakpoints',
      'Custom React + Tailwind CSS frontend',
      'Basic SEO (meta tags, OG tags, sitemap, robots.txt)',
      'Contact form integration (name, email, message)',
      '1 round of revisions (content/layout feedback)',
      '1 month post-launch hosting support',
      'Deployment on modern CDN (Vercel, Cloudflare, or Netlify)',
    ],
    deliverables: [
      'Production-ready website deployed to your domain',
      'Source code repository (GitHub/GitLab, you own it)',
      'Admin deployment credentials',
      'Basic setup documentation (1-page)',
    ],
    exclusions: [
      'Custom illustrations, photography, or iconography',
      'Third-party API integrations (payment, maps, etc.)',
      'Custom CMS or admin dashboard',
      'Ongoing hosting costs (billed directly by provider)',
      'Domain registration fees',
      'Content copywriting or SEO keyword research',
      'Additional pages beyond 5',
    ],
    timeline: '2–3 weeks',
    timelineBreakdown: [
      'Week 1: Discovery, wireframes, design mockup',
      'Week 2: Development, content population',
      'Week 3: Testing, revisions, deployment',
    ],
    revisionPolicy: '1 round included. Additional rounds billed at ₹3,500/round.',
    postLaunchSupport: '1 month: bug fixes, uptime monitoring. After month 1: ₹5,000/mo retainer or hourly at ₹1,500/hr.',
    paymentTerms: '50% upfront to start. 50% on delivery before deployment.',
    positioning: [
      'Our lowest-risk entry point — perfect for clients who need a professional web presence without breaking the bank',
      'Emphasize: "No templates, no page builders — custom code from scratch"',
      'Compare to Wix/Squarespace: "You own the code, not a subscription"',
      'Upsell hint: "Most clients upgrade to Business within 6 months"',
    ],
    objections: [
      { objection: '"Can\'t I use a template for cheaper?"', rebuttal: 'Templates cost ₹2-5K but you can\'t customize deeply, they load slowly, and you don\'t own the code. Our sites are built from scratch — faster, more secure, and fully owned by you.' },
      { objection: '"What if I need more pages later?"', rebuttal: 'We scope 5 pages. If you need more mid-project, we bill at ₹1,500/page. Post-launch, we can add pages under a retainer.' },
      { objection: '"Why not just use Wix?"', rebuttal: 'Wix charges ₹2-5K/year locked in their ecosystem with limited customization. Our Basic tier is ₹7K one-time — you own everything and can take it anywhere.' },
    ],
    roi: 'One client inquiry from the site typically covers the entire investment. ROI break-even: 1 qualified lead.',
  },
  {
    name: 'Business',
    monthlyPrice: '₹14,000',
    yearlyPrice: '₹1,40,000',
    priceUSD: '$170',
    yearlyUSD: '$1,700',
    desc: 'Custom functionality, CMS, and automation to scale your operations. For growing businesses that need more than a brochure site.',
    accent: '#FF6B4A',
    color: 'from-orange-400 to-red-500',
    bestFor: ['E-commerce Store', 'SaaS Dashboard', 'Membership Portal', 'Custom Web App'],
    scope: [
      'Custom web application or AI automation project',
      'Custom CMS integration (Sanity, Strapi, or headless CMS)',
      'Advanced SEO setup (structured data, performance optimization, analytics)',
      '3 rounds of revisions',
      '30-day post-launch support with priority response',
      'Performance optimization (Core Web Vitals, lazy loading, code splitting)',
      'Up to 3 third-party API integrations (Stripe, SendGrid, Google Maps, etc.)',
      'Authentication system (email/password or OAuth)',
    ],
    deliverables: [
      'Fully deployed web application or automation system',
      'Source code repository (full ownership)',
      'CMS admin credentials + training walkthrough',
      'API documentation (if applicable)',
      'Deployment and maintenance guide',
      'Admin dashboard (if applicable)',
    ],
    exclusions: [
      'Custom illustrations, photography, or iconography',
      'Ongoing hosting/infrastructure costs',
      'Third-party service subscription fees (Stripe, SendGrid, etc.)',
      'Mobile app development (see Enterprise tier)',
      'Dedicated project manager (see Enterprise)',
      'Additional integrations beyond 3',
    ],
    timeline: '4–6 weeks',
    timelineBreakdown: [
      'Week 1: Discovery, technical architecture, wireframes',
      'Week 2: Design mockups, client review',
      'Week 3-4: Development of core features',
      'Week 5: Integration, testing, revisions',
      'Week 6: Deployment, documentation, handoff',
    ],
    revisionPolicy: '3 rounds included. Additional rounds: ₹7,000/round.',
    postLaunchSupport: '30 days included (bugs, uptime, minor content changes). After: ₹14,000/mo retainer or ₹2,500/hr.',
    paymentTerms: '50% upfront. 25% at milestone (design approval). 25% on delivery.',
    positioning: [
      'Our sweet spot — highest volume tier. Emphasize maximum value for growing businesses',
      'Compare to hiring in-house: "A full-stack developer costs ₹1.2L/month. You get a whole team for ₹14K."',
      'Highlight the AI automation angle: "We don\'t just build websites — we automate your workflows"',
      'Lead with the CMS: "You can update your content anytime, no developer needed"',
    ],
    objections: [
      { objection: '"Can I upgrade from Basic later?"', rebuttal: 'Yes — and many clients do. The migration cost is minimal since we built the original codebase. We\'ll discount the upgrade by ₹7K (what you already paid).' },
      { objection: '"What happens after the 30-day support period?"', rebuttal: 'We offer a retainer at ₹14K/mo for ongoing updates, monitoring, and priority support. Or you can pause and call us when needed at ₹2,500/hr.' },
      { objection: '"Do I need technical skills to manage the CMS?"', rebuttal: 'No. We set up an intuitive CMS and provide a 30-min walkthrough. If you get stuck, we\'re a call away during the support period.' },
    ],
    roi: 'An e-commerce store at this tier typically generates ₹50K-2L/month. Automation projects save 20-40 hours/week in manual work. ROI break-even: 1-4 weeks.',
  },
  {
    name: 'Enterprise',
    monthlyPrice: '₹25,000',
    yearlyPrice: '₹2,50,000',
    priceUSD: '$300',
    yearlyUSD: '$3,000',
    desc: 'Full-stack products with dedicated team and ongoing partnership. For established businesses building mission-critical digital infrastructure.',
    accent: '#3B8A88',
    color: 'from-emerald-500 to-teal-600',
    bestFor: ['Multi-tenant Platform', 'Marketplace', 'ERP System', 'Full Mobile + Web Ecosystem'],
    scope: [
      'Full-stack product development (frontend + backend + database)',
      'AI agent integration (chatbots, automation, document processing)',
      'Mobile app development (React Native, iOS + Android)',
      'Dedicated project manager as your single point of contact',
      'Unlimited revision rounds within scope',
      'Ongoing maintenance and support',
      'Priority response: 24-hour turnaround on all communications',
      'Full source code ownership + design files',
      'CI/CD pipeline setup',
      'Database architecture and optimization',
      'Load testing and performance benchmarking',
    ],
    deliverables: [
      'Complete production deployment (web + mobile if applicable)',
      'Full source code ownership (all repos)',
      'Design system files (Figma)',
      'Technical documentation (architecture, API, deployment)',
      'Admin training session(s)',
      'Monitoring and alerting setup',
      'SLA documentation',
    ],
    exclusions: [
      'Third-party software license fees',
      'Hardware/infrastructure costs (cloud hosting, etc.)',
      'Stock photography, illustration, or video assets',
      'Paid advertising or marketing services',
      'Legal or compliance consulting',
      'Dedicated creative director (see Custom Animated)',
    ],
    timeline: '6–12 weeks',
    timelineBreakdown: [
      'Week 1-2: Discovery + architecture + design system',
      'Week 3-4: Core development sprint 1',
      'Week 5-6: Core development sprint 2 + review',
      'Week 7-8: Mobile app development (if applicable)',
      'Week 9-10: Integration + testing + revisions',
      'Week 11-12: Deployment + documentation + handoff',
    ],
    revisionPolicy: 'Unlimited within defined scope. Scope changes after sign-off are estimated and billed separately.',
    postLaunchSupport: 'Ongoing: included in monthly retainer. Covers bug fixes, uptime monitoring, security patches, and minor feature additions.',
    paymentTerms: '30% upfront. 40% at mid-project milestone. 30% on delivery.',
    positioning: [
      'Position as a partnership, not a vendor: "We\'re your fractional CTO and engineering team combined"',
      'Compare to hiring an agency: "Agencies charge ₹5-10L/month for this. We deliver the same quality at 50-70% less because we have no sales overhead."',
      'Emphasize speed: "While you\'re interviewing developers, we\'re shipping your product"',
      'AI integration is the differentiator: "No other agency at this price point offers AI agent development"',
    ],
    objections: [
      { objection: '"What if we need to pause the project mid-way?"', rebuttal: 'No problem. We structure work in 2-week sprints. You can pause at any sprint boundary with zero penalty. You keep everything delivered so far.' },
      { objection: '"How do you compare to a full-time CTO + team?"', rebuttal: 'A full-time CTO + 2 developers costs ₹3-5L/month + benefits. We deliver the same at ₹25K with faster execution because we\'re a seasoned team that\'s already built dozens of products.' },
      { objection: '"What about data security and compliance?"', rebuttal: 'We follow security best practices: encrypted storage, secure authentication, regular audits, and GDPR-ready architecture. We can work within your compliance requirements.' },
    ],
    roi: 'Enterprise software at this tier typically replaces ₹5-15L/year in manual processes or SaaS subscriptions. Mobile apps drive 2-5x customer engagement. ROI break-even: 1-3 months.',
  },
  {
    name: 'Custom Animated',
    monthlyPrice: '₹3,00,000',
    yearlyPrice: '₹30,00,000',
    priceUSD: '$3,600',
    yearlyUSD: '$36,000',
    desc: 'Award-caliber animated experiences with 3D, WebGL, and cinematic motion design. For premium brands that compete on visual impact.',
    accent: '#7C5CFC',
    color: 'from-violet-500 to-purple-600',
    bestFor: ['3D / WebGL Experience', 'Cinematic Brand Showcase', 'Interactive Product Launch', 'Immersive Marketing Site'],
    scope: [
      'Custom 3D / WebGL experiences using Three.js, React Three Fiber, or GSAP',
      'Cinematic scroll-based animations with GSAP ScrollTrigger',
      'Interactive brand storytelling with custom motion design',
      'Dedicated creative director overseeing visual direction',
      'Unlimited revision rounds within scope',
      'Performance optimization for 60fps on target devices',
      'Full source code ownership + design assets',
      'Lottie/JSON animation files for ongoing use',
      'Custom shaders and post-processing effects',
    ],
    deliverables: [
      'Production-deployed animated experience',
      'Full source code + design assets',
      'Animation library files (Lottie, JSON, etc.)',
      'Brand guidelines extension (motion guidelines, animation principles)',
      'Performance report (FPS benchmarks, bundle size)',
      'Creative brief and process documentation',
    ],
    exclusions: [
      'Custom 3D model creation (outsourced or client-provided) — estimated ₹50K-2L extra',
      'Stock music or sound design — estimated ₹25K-1L extra',
      'Ongoing hosting (Edge CDN recommended at ₹10-15K/mo)',
      'Content strategy or copywriting',
      'Video production or motion capture',
    ],
    timeline: '8–16 weeks',
    timelineBreakdown: [
      'Week 1-2: Creative discovery + mood boards + concept exploration',
      'Week 3-4: Creative direction sign-off + technical prototype',
      'Week 5-8: Core animation development',
      'Week 9-12: Polish, performance optimization, testing',
      'Week 13-14: Revisions and refinement',
      'Week 15-16: Deployment + documentation',
    ],
    revisionPolicy: 'Unlimited within defined scope. Creative pivots after direction sign-off are estimated separately.',
    postLaunchSupport: '1 month included (critical bug fixes, performance issues). After: ₹50,000/mo retainer for ongoing updates.',
    paymentTerms: '30% upfront. 30% at creative direction sign-off. 20% at beta. 20% on delivery.',
    positioning: [
      'Premium positioning: "This is what Apple-level brands use for product launches"',
      'Compare to traditional animation agencies: "A single 30s animated explainer video costs ₹5-15L from a production house. We build an interactive experience that lives forever."',
      'Focus on shelf-life: "A static site gets outdated in 2 years. A cinematic animated experience captivates visitors every single time for 3-5 years."',
      'Lead with outcome: "Our animated sites have a proven 40-60% lower bounce rate and 2-3x longer session duration"',
    ],
    objections: [
      { objection: '"Can\'t we achieve the same effect with a cheaper solution?"', rebuttal: 'Pre-built animation libraries and templates look generic. Our custom animations are built from the ground up to match your brand identity — the difference is immediately visible to discerning audiences.' },
      { objection: '"Will it work on slow devices or poor connections?"', rebuttal: 'We optimize aggressively: progressive loading, adaptive quality based on device capability, and graceful degradation. Your site still works perfectly on a ₹10K Android phone — it just looks incredible on a flagship.' },
      { objection: '"Do we really need animations?"', rebuttal: 'In competitive markets, your website is your most visited asset. Static sites blend in. Motion captures attention, communicates sophistication, and keeps visitors engaged 2-3x longer. If your competitors are static, being animated is a massive differentiator.' },
    ],
    roi: 'An animated brand showcase typically drives 2-4x conversion rate on premium products. For a SaaS company with ₹50L ACV, one additional conversion pays for the entire project 15x over. ROI break-even: 1 qualified lead for high-ticket brands.',
  },
]

const sectionHeader = (title, subtitle) => (
  <div className="mb-6">
    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
    {subtitle && <p className="text-sm text-zinc-400">{subtitle}</p>}
  </div>
)

function PasswordGate({ onUnlock }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        sessionStorage.setItem(AUTH_TOKEN_KEY, data.token)
        onUnlock()
      } else {
        setError('Incorrect password')
        setPassword('')
      }
    } catch {
      setError('Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl p-8 shadow-2xl text-center">
          <div className="mx-auto mb-6 size-16 rounded-full bg-zinc-800 flex items-center justify-center">
            <Lock className="size-7 text-zinc-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Restricted Access</h1>
          <p className="text-sm text-zinc-400 mb-8">
            This page contains confidential pricing information for Rogue Code sales team only.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="Enter sales password"
              aria-label="Sales password"
              className="w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none focus-visible:ring-2 focus-visible:ring-white/30 transition-all bg-white/5 border-zinc-800 focus:border-zinc-500"
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-400 flex items-center justify-center gap-1.5">
                <X className="size-3.5" /> {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-sm font-semibold text-black bg-white hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Verifying...' : 'Unlock'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

function TierCard({ tier, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-zinc-800 pb-12 mb-12 last:border-b-0 last:pb-0 last:mb-0">
      {/* Tier header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-3xl font-bold text-white">{tier.name}</h2>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 text-zinc-400 border border-zinc-700/60">
              Tier {index + 1}
            </span>
          </div>
          <p className="text-zinc-400 max-w-2xl mt-1">{tier.desc}</p>
        </div>
        <div className="text-right flex-shrink-0 ml-6">
          <div className="text-3xl font-black text-white">{tier.monthlyPrice}<span className="text-sm font-normal text-zinc-500">/mo</span></div>
          <div className="text-sm text-zinc-500 mt-0.5">{tier.yearlyPrice}/yr <span className="text-emerald-400">(-17%)</span></div>
          <div className="text-xs text-zinc-600 mt-0.5">≈ USD {tier.priceUSD}/mo · {tier.yearlyUSD}/yr</div>
        </div>
      </div>

      {/* Best for tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tier.bestFor.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 rounded-full border border-zinc-700/60 text-zinc-300 bg-zinc-800/50"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Main breakdown grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Scope of work */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Code className="size-4" style={{ color: tier.accent }} />
            <h3 className="text-sm font-semibold text-white tracking-wide">Scope of Work</h3>
          </div>
          <ul className="space-y-2">
            {tier.scope.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                <Check className="size-3.5 mt-0.5 flex-shrink-0" style={{ color: tier.accent }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText className="size-4" style={{ color: tier.accent }} />
            <h3 className="text-sm font-semibold text-white tracking-wide">Deliverables at Handoff</h3>
          </div>
          <ul className="space-y-2">
            {tier.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                <Check className="size-3.5 mt-0.5 flex-shrink-0" style={{ color: tier.accent }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Exclusions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <X className="size-4" style={{ color: '#ef4444' }} />
            <h3 className="text-sm font-semibold text-white tracking-wide">Exclusions</h3>
          </div>
          <ul className="space-y-2">
            {tier.exclusions.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                <span className="size-3.5 mt-0.5 flex-shrink-0 text-zinc-600">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="size-4" style={{ color: tier.accent }} />
            <h3 className="text-sm font-semibold text-white tracking-wide">Typical Timeline</h3>
          </div>
          <p className="text-lg font-bold text-white mb-2">{tier.timeline}</p>
          <ul className="space-y-1">
            {tier.timelineBreakdown.map((item) => (
              <li key={item} className="text-sm text-zinc-400">{item}</li>
            ))}
          </ul>
        </div>

        {/* Revision policy */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="size-4" style={{ color: tier.accent }} />
            <h3 className="text-sm font-semibold text-white tracking-wide">Revision Policy</h3>
          </div>
          <p className="text-sm text-zinc-300">{tier.revisionPolicy}</p>
        </div>

        {/* Post-launch support */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="size-4" style={{ color: tier.accent }} />
            <h3 className="text-sm font-semibold text-white tracking-wide">Post-Launch Support</h3>
          </div>
          <p className="text-sm text-zinc-300">{tier.postLaunchSupport}</p>
        </div>

        {/* Payment terms */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="size-4" style={{ color: tier.accent }} />
            <h3 className="text-sm font-semibold text-white tracking-wide">Payment Terms</h3>
          </div>
          <p className="text-sm text-zinc-300">{tier.paymentTerms}</p>
        </div>
      </div>

      {/* Extended details (expandable) */}
      <div className="mt-8 border-t border-zinc-800 pt-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <span>{expanded ? 'Hide' : 'Show'} Sales Strategy & Objections</span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >→</motion.span>
        </button>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-8"
          >
            {/* Positioning */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap className="size-4" style={{ color: tier.accent }} />
                <h3 className="text-sm font-semibold text-white tracking-wide">Sales Positioning & Talking Points</h3>
              </div>
              <ul className="space-y-2">
                {tier.positioning.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <Star className="size-3.5 mt-0.5 flex-shrink-0" style={{ color: tier.accent }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Objections */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="size-4" style={{ color: tier.accent }} />
                <h3 className="text-sm font-semibold text-white tracking-wide">Common Objections & Rebuttals</h3>
              </div>
              <div className="space-y-4">
                {tier.objections.map((item, i) => (
                  <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                    <p className="text-sm font-medium text-white mb-1.5">{item.objection}</p>
                    <p className="text-sm text-zinc-400">{item.rebuttal}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="size-4" style={{ color: tier.accent }} />
                <h3 className="text-sm font-semibold text-white tracking-wide">ROI Break-Even</h3>
              </div>
              <p className="text-sm text-zinc-300">{tier.roi}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function SalesPricingPage({ onBack }) {
  const [unlocked, setUnlocked] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('page') === 'sales-pricing'
  })

  if (!unlocked) return <PasswordGate onUnlock={() => setUnlocked(true)} />

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Print warning banner (hidden in print) */}
      <div className="print:hidden fixed top-0 left-0 right-0 z-50 bg-amber-900/80 backdrop-blur-md border-b border-amber-700/50">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          <p className="text-xs text-amber-200 flex items-center gap-1.5">
            <Lock className="size-3" />
            Confidential — Rogue Code Sales Team Only
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-700/50 text-amber-100 hover:bg-amber-700 transition-colors"
            >
              <Download className="size-3.5" />
              Download PDF
            </button>
            {onBack && (
              <button
                onClick={onBack}
                className="text-xs text-amber-300/70 hover:text-amber-200 transition-colors"
              >
                Back to site
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-12 print:hidden" />

      <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Cover page */}
        <div className="mb-16 pb-12 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-4 print:mb-4">
            <FileText className="size-3.5" />
            ROGUE CODE — INTERNAL SALES DOCUMENT
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            Pricing Breakdown &<br />
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 bg-clip-text text-transparent">Sales Playbook</span>
          </h1>
          <p className="text-base text-zinc-400 max-w-2xl mb-6">
            Complete tier-by-tier breakdown including scope of work, deliverables, exclusions, timelines, revision policies, post-launch support, payment terms, sales positioning, and common objections with rebuttals.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
            <span>Updated: July 2026</span>
            <span className="size-1 rounded-full bg-zinc-700" />
            <span>4 tiers</span>
            <span className="size-1 rounded-full bg-zinc-700" />
            <span>Confidential</span>
          </div>
        </div>

        {/* Quick comparison table */}
        <div className="mb-16 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50">
          <h2 className="text-lg font-bold text-white mb-4">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 pr-4 font-medium text-zinc-400">Feature</th>
                  {tiers.map((t) => (
                    <th key={t.name} className="text-left py-3 px-3 font-bold text-white">{t.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                <tr>
                  <td className="py-3 pr-4 text-zinc-400">Monthly</td>
                  {tiers.map((t) => (
                    <td key={t.name} className="py-3 px-3 font-semibold text-white">{t.monthlyPrice}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-zinc-400">Yearly</td>
                  {tiers.map((t) => (
                    <td key={t.name} className="py-3 px-3 font-semibold text-white">{t.yearlyPrice}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-zinc-400">Timeline</td>
                  {tiers.map((t) => (
                    <td key={t.name} className="py-3 px-3 text-zinc-300">{t.timeline}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-zinc-400">Revisions</td>
                  {tiers.map((t) => (
                    <td key={t.name} className="py-3 px-3 text-zinc-300">
                      {tierRevisionCount(t.name)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-zinc-400">Support</td>
                  {tiers.map((t) => (
                    <td key={t.name} className="py-3 px-3 text-zinc-300">
                      {tierSupportText(t.name)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b-0">
                  <td className="py-3 pr-4 text-zinc-400">Best For</td>
                  {tiers.map((t) => (
                    <td key={t.name} className="py-3 px-3 text-xs text-zinc-400">{t.bestFor.slice(0, 2).join(', ')}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed breakdown per tier */}
        {tiers.map((tier, i) => (
          <TierCard key={tier.name} tier={tier} index={i} />
        ))}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <div className="flex items-center justify-between text-xs text-zinc-600">
            <span>Rogue Code — Confidential Sales Document</span>
            <span>rogue.codes · cloudlyconfusing@gmail.com</span>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page { margin: 0.75in; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
          * { background: #09090b !important; color: #e4e4e7 !important; }
          .text-zinc-400, .text-zinc-500, .text-zinc-600 { color: #a1a1aa !important; }
          .bg-zinc-950 { background: #09090b !important; }
          .bg-zinc-900\\/50 { background: #18181b !important; }
          .bg-zinc-800\\/50 { background: #27272a !important; }
          a { text-decoration: none; }
          img { max-width: 100%; }
        }
      `}</style>
    </div>
  )
}

function tierRevisionCount(name) {
  switch (name) {
    case 'Basic': return '1 round'
    case 'Business': return '3 rounds'
    case 'Enterprise': return 'Unlimited'
    case 'Custom Animated': return 'Unlimited'
    default: return ''
  }
}

function tierSupportText(name) {
  switch (name) {
    case 'Basic': return '1 month'
    case 'Business': return '30 days'
    case 'Enterprise': return 'Ongoing'
    case 'Custom Animated': return '1 month + retainer'
    default: return ''
  }
}
