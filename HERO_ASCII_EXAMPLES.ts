/**
 * EXAMPLE: How to use the HeroAscii component
 * 
 * This file shows common usage patterns for the HeroAscii component.
 * Copy these examples into your application to get started.
 */

// ============================================================================
// EXAMPLE 1: Basic Usage (Simplest)
// ============================================================================

import { HeroAscii } from '@/components/ui/hero-ascii'

export function SimpleHero() {
  return <HeroAscii />
}


// ============================================================================
// EXAMPLE 2: With Custom Unicorn Studio Embed URL
// ============================================================================

import { HeroAscii } from '@/components/ui/hero-ascii'

export function CustomEmbedHero() {
  return (
    <HeroAscii 
      unicornStudioEmbedUrl="https://www.unicornstudio.com/iframe?id=YOUR_EMBED_ID_HERE" 
    />
  )
}


// ============================================================================
// EXAMPLE 3: With Custom CSS Classes
// ============================================================================

import { HeroAscii } from '@/components/ui/hero-ascii'

export function StyledHero() {
  return (
    <HeroAscii 
      className="mt-0 pt-0 shadow-2xl"
      unicornStudioEmbedUrl="https://www.unicornstudio.com/iframe?id=YOUR_EMBED_ID"
    />
  )
}


// ============================================================================
// EXAMPLE 4: In Main App Component (Recommended)
// ============================================================================

import { HeroAscii } from '@/components/ui/hero-ascii'
import Services from '@/components/ui/services'
import Footer from '@/components/footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroAscii 
        unicornStudioEmbedUrl="https://www.unicornstudio.com/iframe?id=YOUR_EMBED_ID"
      />

      {/* Other Page Sections */}
      <Services />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}


// ============================================================================
// EXAMPLE 5: With Event Handlers (For Future Enhancement)
// ============================================================================

'use client'

import { HeroAscii } from '@/components/ui/hero-ascii'
import { useState } from 'react'

export function InteractiveHero() {
  const [isAnimating, setIsAnimating] = useState(true)

  return (
    <div>
      {/* Controls */}
      <button 
        onClick={() => setIsAnimating(!isAnimating)}
        className="fixed top-20 right-6 z-50 px-4 py-2 bg-black text-white rounded"
      >
        {isAnimating ? 'Pause' : 'Play'} Animation
      </button>

      {/* Hero Component */}
      {isAnimating && (
        <HeroAscii 
          unicornStudioEmbedUrl="https://www.unicornstudio.com/iframe?id=YOUR_EMBED_ID"
        />
      )}
    </div>
  )
}


// ============================================================================
// EXAMPLE 6: With Fallback Content
// ============================================================================

import { HeroAscii } from '@/components/ui/hero-ascii'
import { useEffect, useState } from 'react'

export function RobustHero() {
  const [hasEmbedUrl, setHasEmbedUrl] = useState(false)

  useEffect(() => {
    // Check if embed URL is available from environment
    const embedUrl = process.env.REACT_APP_UNICORN_EMBED_ID
    setHasEmbedUrl(!!embedUrl)
  }, [])

  return (
    <HeroAscii 
      unicornStudioEmbedUrl={
        hasEmbedUrl 
          ? `https://www.unicornstudio.com/iframe?id=${process.env.REACT_APP_UNICORN_EMBED_ID}`
          : 'https://www.unicornstudio.com/iframe?id=default-fallback'
      }
    />
  )
}


// ============================================================================
// EXAMPLE 7: Full Page Layout
// ============================================================================

'use client'

import { HeroAscii } from '@/components/ui/hero-ascii'
import { motion } from 'framer-motion'

export default function FullPageLayout() {
  return (
    <main className="w-full bg-white">
      {/* Hero Section */}
      <section id="hero">
        <HeroAscii 
          unicornStudioEmbedUrl="https://www.unicornstudio.com/iframe?id=YOUR_EMBED_ID"
        />
      </section>

      {/* Content Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 px-6 max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8">Discover Proportions</h2>
        <p className="text-lg text-gray-600">
          Your content here, positioned below the hero section...
        </p>
      </motion.section>
    </main>
  )
}


// ============================================================================
// ENVIRONMENT SETUP (Optional but recommended)
// ============================================================================

/*
Add to your .env file:

REACT_APP_UNICORN_EMBED_ID=your_actual_embed_id_here

Then use in component:

<HeroAscii 
  unicornStudioEmbedUrl={`https://www.unicornstudio.com/iframe?id=${process.env.REACT_APP_UNICORN_EMBED_ID}`}
/>
*/


// ============================================================================
// TAILWIND CONFIGURATION NOTE
// ============================================================================

/*
No additional Tailwind configuration needed - the component uses:
- Standard Tailwind classes (p-4, flex, etc.)
- Custom color values via inline styles
- Responsive classes (sm:, lg:)

The design system is already integrated in the component.
*/


// ============================================================================
// TYPESCRIPT SUPPORT
// ============================================================================

// If you need to extend the component props:

import { HeroAscii } from '@/components/ui/hero-ascii'
import React from 'react'

interface CustomHeroProps {
  title?: string
  embedUrl?: string
}

export function CustomHero({ title, embedUrl }: CustomHeroProps) {
  return (
    <HeroAscii 
      unicornStudioEmbedUrl={embedUrl}
      className="custom-hero"
    />
  )
}


// ============================================================================
// COMPONENT IS PRODUCTION-READY! ✅
// Copy any of these examples into your application and customize as needed.
// ============================================================================
