import { Helmet } from 'react-helmet-async'

const site = {
  name: 'Rogue Code',
  url: 'https://rogue.codes',
  ogImage: 'https://rogue.codes/og-image.jpg',
  twitter: '@roguecodes',
}

export function HomeSeo() {
  return (
    <Helmet>
      <title>Rogue Code — Web Development &amp; AI Automation Agency</title>
      <meta name="title" content="Rogue Code — Web Development &amp; AI Automation Agency" />
      <meta name="description" content="Rogue Code is a full-service web development and AI automation agency. We build custom websites, AI agents, mobile apps, and UI/UX design for businesses worldwide." />
      <meta property="og:url" content={site.url} />
      <meta property="og:title" content="Rogue Code — Web Development &amp; AI Automation Agency" />
      <meta property="og:description" content="Custom websites, AI agents, mobile apps, and UI/UX design. From concept to launch — we ship production-grade digital products." />
      <meta property="og:image" content={site.ogImage} />
      <meta name="twitter:url" content={site.url} />
      <meta name="twitter:title" content="Rogue Code — Web Development &amp; AI Automation Agency" />
      <meta name="twitter:description" content="Custom websites, AI agents, mobile apps, and UI/UX design. We ship production-grade digital products." />
      <meta name="twitter:image" content={site.ogImage} />
      <link rel="canonical" href={site.url} />
    </Helmet>
  )
}

const caseStudySchemas = [
  {
    name: 'Paws for Change India',
    description: 'Animal rescue & adoption NGO website with donation integration, pet listing, and volunteer management system.',
    url: 'https://github.com/jeremygideonbareh/paws-for-change-india',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=85',
  },
  {
    name: 'Chelsea Man Spa',
    description: 'Mobile booking app for a Dubai Marina spa with Google Auth, Firestore real-time bookings, and dark gold theme.',
    url: 'https://github.com/jeremygideonbareh/chelsea-man-spa-mobile',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=600&q=85',
  },
  {
    name: 'Support Ticket Agent',
    description: 'AI agent built with LangChain & LangGraph that classifies support tickets and drafts contextual responses automatically.',
    url: 'https://github.com/jeremygideonbareh/support-ticket-agent',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=85',
  },
  {
    name: 'JMJ Events & Interiors',
    description: 'Full-service events and interiors business website with portfolio gallery, service catalog, and inquiry form.',
    url: 'https://github.com/jeremygideonbareh/JMJ-Events-Interiors-',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=85',
  },
  {
    name: 'Crumbs Bakery',
    description: 'Artisan bakery website with online ordering, product catalog, location finder, and brand story showcase.',
    url: 'https://github.com/jeremygideonbareh/crumbs-bakery-',
    image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=85',
  },
  {
    name: 'Trading Bot',
    description: 'Automated trading system with real-time market data processing, strategy execution, and portfolio management.',
    url: 'https://github.com/jeremygideonbareh/trading-bot-',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=85',
  },
]

const servicePages = {
  'web-development': {
    title: 'Custom Web Development — React, Next.js, TypeScript',
    description: 'Rogue Code builds custom React 19 and Next.js 15 websites with TypeScript and Tailwind CSS. No page builders, no templates — production-grade code deployed to Cloudflare Workers.',
  },
  'ai-automation': {
    title: 'AI Agents & Automation — LangChain, GPT-4, Custom ML',
    description: 'Rogue Code builds AI agents with LangChain, LangGraph, and OpenAI GPT-4. Automate customer support, ticket triage, and business workflows with measurable ROI.',
  },
  'mobile-apps': {
    title: 'React Native Mobile App Development — iOS & Android',
    description: 'Rogue Code ships cross-platform React Native apps with Firebase, Google Auth, Stripe payments, and push notifications. Single codebase for iOS and Android.',
  },
}

export function ServiceSeo({ service, slug }) {
  const pageData = servicePages[slug] || { title: service.name, description: service.description }
  const pageUrl = `${site.url}/?page=service&slug=${slug}`
  return (
    <Helmet>
      <title>{pageData.title}</title>
      <meta name="title" content={pageData.title} />
      <meta name="description" content={pageData.description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageData.title} />
      <meta property="og:description" content={pageData.description} />
      <meta property="og:image" content={service.hero} />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageData.title} />
      <meta name="twitter:description" content={pageData.description} />
      <meta name="twitter:image" content={service.hero} />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.name,
          description: service.description,
          provider: { '@type': 'Organization', name: 'Rogue Code', url: 'https://rogue.codes' },
          areaServed: 'Worldwide',
          audience: { '@type': 'Audience', audienceType: 'Businesses' },
        })}
      </script>
    </Helmet>
  )
}

export function CaseStudySeo({ project }) {
  const pageUrl = `${site.url}/?page=case&slug=${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  return (
    <Helmet>
      <title>{project.name} — Rogue Code Case Study</title>
      <meta name="title" content={`${project.name} — Rogue Code Case Study`} />
      <meta name="description" content={project.description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={`${project.name} — Rogue Code Case Study`} />
      <meta property="og:description" content={project.description} />
      <meta property="og:image" content={project.image} />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={`${project.name} — Rogue Code Case Study`} />
      <meta name="twitter:description" content={project.description} />
      <meta name="twitter:image" content={project.image} />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.name,
          description: project.description,
          url: project.url,
          image: project.image,
          author: {
            '@type': 'Organization',
            name: 'Rogue Code',
            url: 'https://rogue.codes',
          },
        })}
      </script>
    </Helmet>
  )
}

export function PageSeo({ title, description, path }) {
  const pageUrl = `${site.url}${path}`
  return (
    <Helmet>
      <title>{title} — Rogue Code</title>
      <meta name="title" content={`${title} — Rogue Code`} />
      <meta name="description" content={description} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={`${title} — Rogue Code`} />
      <meta property="og:description" content={description} />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={`${title} — Rogue Code`} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={pageUrl} />
    </Helmet>
  )
}
