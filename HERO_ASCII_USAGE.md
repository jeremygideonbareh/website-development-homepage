# HeroAscii Component - Usage Guide

## Overview
The `HeroAscii` component is a premium, production-ready hero section featuring:
- Vitruvian Man ASCII animation (via Unicorn Studio embed or fallback stars)
- Technical design aesthetic with corner frames and coordinates
- Responsive mobile/desktop experience
- High-performance animations with Framer Motion
- Two CTA buttons with interactive effects
- System status indicators
- Golden ratio proportions

## Import

```typescript
import { HeroAscii } from '@/components/ui/hero-ascii'
```

## Basic Usage

```jsx
// Simple usage with default embed URL
<HeroAscii />

// Or in App.jsx:
import HeroAscii from '@/components/ui/hero-ascii'

<HeroAscii />
```

## Props

```typescript
interface HeroAsciiProps {
  // Unicorn Studio embed URL for the Vitruvian animation
  // Falls back to starfield on mobile or if load fails
  unicornStudioEmbedUrl?: string
  
  // Additional CSS class names
  className?: string
}
```

## Configuration

### Setting Your Unicorn Studio Embed URL

Get your embed URL from Unicorn Studio and pass it:

```jsx
<HeroAscii 
  unicornStudioEmbedUrl="https://www.unicornstudio.com/iframe?id=YOUR_EMBED_ID" 
/>
```

### Custom Styling

Add custom classes via the `className` prop:

```jsx
<HeroAscii className="my-custom-class" />
```

## Features

### Color Palette
Uses the design system colors:
- **putty**: #c4c3b6 (primary accent)
- **ink**: #000000 (text/buttons)
- **bone**: #e7e5e4 (accents)
- **chalk**: #ebebeb (light background)
- **vellum**: #dfdcd5 (subtle)
- **graphite**: #595855 (secondary text)
- **paper**: #ffffff (main background)

### Responsive Breakpoints
- **Mobile**: Full-screen, starfield background fallback
- **Tablet**: Optimized spacing and typography
- **Desktop (lg)**: Full Unicorn Studio animation

### Animations
- Smooth fade-in on page load
- Floating status indicators with pulse effects
- CTA buttons with hover animations
- Staggered content entrance
- Continuous star twinkling (mobile)
- Rotating decorative elements

### Interactive Elements
- **Coordinate Display**: Shows mouse position as [X, Y]
- **CTA Buttons**: 
  - "Explore the System" - Primary action
  - "Watch Animation" - Secondary action
- **System Status**: Real-time indicators (RENDER, MESH, SYNC)
- **Corner Frames**: Decorative ASCII-style borders

## Mobile Behavior

On mobile devices (< 1024px width):
- Hides Unicorn Studio embed
- Shows animated starfield instead
- Maintains all interactive elements
- Optimized touch/click targets
- Responsive typography

## Performance Optimization

✓ Code splitting: Component is properly tree-shakeable
✓ Lazy loading: Unicorn Studio embed loads asynchronously
✓ GPU acceleration: Uses will-change and transform optimizations
✓ Minimal dependencies: Only uses Framer Motion (already in project)
✓ Production ready: TypeScript, proper error handling

## Integration Example

```jsx
// In App.jsx or main page
import { HeroAscii } from '@/components/ui/hero-ascii'

function App() {
  return (
    <div>
      <HeroAscii unicornStudioEmbedUrl="YOUR_EMBED_URL" />
      {/* Other sections below */}
    </div>
  )
}
```

## Customization

### Change Button Labels
Edit the component directly (lines with "Explore the System" and "Watch Animation")

### Adjust System Status Indicators
Modify the `systemStatus` array:

```typescript
const systemStatus = [
  { label: 'RENDER', status: 'active', color: '#4ade80' },
  { label: 'MESH', status: 'optimal', color: '#60a5fa' },
  { label: 'SYNC', status: 'live', color: '#a78bfa' },
]
```

### Change Colors
Update the `colorPalette` object to use different hex values

## Browser Support

- Modern browsers with ES2020+ support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 13+, Android 8+)

## Notes

- The component assumes @/lib/utils exists with the cn() function
- Framer Motion must be installed (npm install framer-motion)
- Lucide-react must be installed for icons
- Tailwind CSS is required for styling
- Unicorn Studio embed URL is optional; component gracefully degrades to starfield

## Troubleshooting

**Embed not showing?**
- Verify Unicorn Studio URL is correct and publicly accessible
- Check browser console for CORS errors
- Fallback starfield will display automatically

**Animations laggy?**
- Reduce density prop in StarField component
- Check browser performance monitoring
- Disable other animations on the page

**Mobile not showing stars?**
- Check window width detection (should trigger < 1024px)
- Verify CSS media queries aren't overriding
