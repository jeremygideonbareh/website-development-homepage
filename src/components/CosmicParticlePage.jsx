import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ═══════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════

const N = 6000 // Total particles
const BRAND_COLORS = {
  purple: 0x8052ff,
  amber: 0xffb829,
  teal: 0x15846e,
  white: 0xffffff,
}

const PHASES = [0, 0.15, 0.25, 0.35, 0.48, 0.62, 0.70, 0.78, 0.86, 0.94, 1]

const STATE_OFFSETS = [
  [16, 1, 0],     // 0: brain RIGHT
  [-26, 1, 0],    // 1: brain LEFT
  [0, 0, 0],      // 2: rocket CENTER (static)
  [-16, -1, 0],   // 3: globe LEFT
  [0, -14, 0],    // 4: globeLarge BOTTOM
]

// ═══════════════════════════════════════════════════════════════════════════
// SHAPE GENERATION FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

// Parse OBJ vertices
function parseObjVertices(text, label) {
  const vertices = []
  const lines = text.split('\n')
  for (const line of lines) {
    if (line.startsWith('v ')) {
      const parts = line.slice(2).trim().split(/\s+/)
      vertices.push({
        x: parseFloat(parts[0]),
        y: parseFloat(parts[1]),
        z: parseFloat(parts[2]),
      })
    }
  }
  return vertices
}

// Normalize vertices to [-1, 1]
function normalizeVertices(vertices) {
  if (vertices.length === 0) return vertices
  let minX = Infinity, maxX = -Infinity
  let minY = Infinity, maxY = -Infinity
  let minZ = Infinity, maxZ = -Infinity
  for (const v of vertices) {
    minX = Math.min(minX, v.x)
    maxX = Math.max(maxX, v.x)
    minY = Math.min(minY, v.y)
    maxY = Math.max(maxY, v.y)
    minZ = Math.min(minZ, v.z)
    maxZ = Math.max(maxZ, v.z)
  }
  const rangeX = maxX - minX || 1
  const rangeY = maxY - minY || 1
  const rangeZ = maxZ - minZ || 1
  const maxRange = Math.max(rangeX, rangeY, rangeZ)
  const centerX = (minX + maxX) / 2
  const centerY = (minY + maxY) / 2
  const centerZ = (minZ + maxZ) / 2
  return vertices.map(v => ({
    x: (v.x - centerX) / maxRange * 2,
    y: (v.y - centerY) / maxRange * 2,
    z: (v.z - centerZ) / maxRange * 2,
  }))
}

// Sample positions from vertices
function samplePositions(vertices, N, scale) {
  const sampled = []
  for (let i = 0; i < N; i++) {
    const v = vertices[Math.floor(Math.random() * vertices.length)]
    sampled.push([v.x * scale, v.y * scale, v.z * scale])
  }
  return sampled
}

// Generate scatter (random positions)
function generateScatter(N, spread, density = 1.0) {
  const count = Math.floor(N * density)
  const positions = []
  for (let i = 0; i < count; i++) {
    positions.push([
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread,
      (Math.random() - 0.5) * spread,
    ])
  }
  // Fill remaining with origin
  for (let i = count; i < N; i++) {
    positions.push([0, 0, 0])
  }
  return positions
}

// Generate top scatter (particles falling from top)
function generateTopScatter(N) {
  const positions = []
  for (let i = 0; i < N; i++) {
    const y = 15 + Math.random() * 25
    const x = (Math.random() < 0.5 ? -1 : 1) * 40
    const z = (Math.random() - 0.5) * 40
    positions.push([x, y, z])
  }
  return positions
}

// Generate rocket shape and plume
function generateProceduralRocket(N, spread = 16, density = 0.75) {
  const rocketCount = Math.floor(N * density)
  const plumeCount = N - rocketCount
  const positions = []
  
  const tilt = (22 * Math.PI) / 180
  const cosTilt = Math.cos(tilt)
  const sinTilt = Math.sin(tilt)
  
  // Body (55%)
  const bodyCount = Math.floor(rocketCount * 0.55)
  for (let i = 0; i < bodyCount; i++) {
    const r = Math.pow(Math.random(), 0.5) * 0.35 * spread
    const theta = Math.random() * Math.PI * 2
    const yNorm = Math.random()
    const bodyHeight = 3 * spread
    const x = r * Math.cos(theta)
    const y = (yNorm - 0.5) * bodyHeight
    const z = r * Math.sin(theta)
    const barrelFactor = 1 - 0.15 * Math.sin(yNorm * Math.PI)
    const xBarr = x * barrelFactor
    const zBarr = z * barrelFactor
    const xRot = xBarr * cosTilt - y * sinTilt
    const yRot = xBarr * sinTilt + y * cosTilt
    positions.push([xRot, yRot, zBarr])
  }
  
  // Nose (20%)
  const noseCount = Math.floor(rocketCount * 0.20)
  for (let i = 0; i < noseCount; i++) {
    const noseHeight = 1.5 * spread
    const yNorm = Math.random()
    const r = Math.pow(Math.random(), 0.5) * 0.35 * spread * (1 - yNorm)
    const theta = Math.random() * Math.PI * 2
    const x = r * Math.cos(theta)
    const y = 1.5 * spread + yNorm * noseHeight
    const z = r * Math.sin(theta)
    const xRot = x * cosTilt - y * sinTilt
    const yRot = x * sinTilt + y * cosTilt
    positions.push([xRot, yRot, z])
  }
  
  // Fins (13%)
  const finCount = Math.floor(rocketCount * 0.13)
  for (let i = 0; i < finCount; i++) {
    const finIdx = Math.floor(Math.random() * 3)
    const baseAngle = finIdx * (Math.PI * 2 / 3)
    const r = 0.35 * spread + Math.random() * 0.3 * spread
    const theta = baseAngle + (Math.random() - 0.5) * 0.5
    const yNorm = Math.random()
    const finHeight = 1.5 * spread
    const x = r * Math.cos(theta)
    const y = (yNorm - 0.5) * finHeight
    const z = r * Math.sin(theta)
    const xRot = x * cosTilt - y * sinTilt
    const yRot = x * sinTilt + y * cosTilt
    positions.push([xRot, yRot, z])
  }
  
  // Base band (12%)
  const baseCount = Math.floor(rocketCount * 0.12)
  for (let i = 0; i < baseCount; i++) {
    const r = Math.pow(Math.random(), 0.5) * 0.35 * spread
    const theta = Math.random() * Math.PI * 2
    const x = r * Math.cos(theta)
    const y = -1.5 * spread
    const z = r * Math.sin(theta)
    const xRot = x * cosTilt - y * sinTilt
    const yRot = x * sinTilt + y * cosTilt
    positions.push([xRot, yRot, z])
  }
  
  // Plume (25%)
  for (let i = 0; i < plumeCount; i++) {
    const yOff = -0.5 * spread - Math.pow(Math.random(), 0.3) * 5 * spread
    const radiusFactor = 0.4 + Math.pow(Math.random(), 0.5) * 4
    const r = radiusFactor * spread
    const theta = Math.random() * Math.PI * 2
    const x = r * Math.cos(theta)
    const z = r * Math.sin(theta)
    const xRot = x * cosTilt - yOff * sinTilt
    const yRot = x * sinTilt + yOff * cosTilt
    positions.push([xRot, yRot, z])
  }
  
  return positions
}

// Generate rocket colors
function generateRocketColors(N, rocketDensity = 0.75) {
  const rocketCount = Math.floor(N * rocketDensity)
  const plumeCount = N - rocketCount
  const colors = []
  
  // Body + nose (75% of rocket) → bright white
  for (let i = 0; i < Math.floor(rocketCount * 0.75); i++) {
    const r = 0.85 + Math.random() * 0.15
    const g = 0.82 + Math.random() * 0.15
    const b = 0.85 + Math.random() * 0.15
    colors.push(r, g, b)
  }
  
  // Fins + base (25% of rocket) → bright white
  for (let i = 0; i < Math.floor(rocketCount * 0.25); i++) {
    const r = 0.85 + Math.random() * 0.15
    const g = 0.82 + Math.random() * 0.15
    const b = 0.85 + Math.random() * 0.15
    colors.push(r, g, b)
  }
  
  // Plume → warm amber/orange
  for (let i = 0; i < plumeCount; i++) {
    const r = 1.0
    const g = 0.55 + Math.random() * 0.2
    const b = 0.1 + Math.random() * 0.15
    colors.push(r, g, b)
  }
  
  return colors
}

// Generate Earth-like globe
function generateEarthGlobe(N, radius, density = 1.0) {
  const isLand = (lng, lat) => {
    // Rough continents polygon check
    const regions = [
      { lon: [-120, -60], lat: [10, 50] },     // North America
      { lon: [-80, 40], lat: [-55, 10] },      // South America + Africa
      { lon: [40, 140], lat: [-50, 60] },      // Europe/Asia
      { lon: [100, 160], lat: [-50, 10] },     // Oceania
    ]
    return regions.some(r => {
      const lngMatch = lng >= r.lon[0] && lng <= r.lon[1]
      const latMatch = lat >= r.lat[0] && lat <= r.lat[1]
      return lngMatch && latMatch
    })
  }
  
  const count = Math.floor(N * density)
  const positions = []
  for (let i = 0; i < count; i++) {
    const lng = Math.random() * 360 - 180
    const lat = Math.random() * 180 - 90
    if (isLand(lng, lat)) {
      const latRad = (lat * Math.PI) / 180
      const lngRad = (lng * Math.PI) / 180
      const x = radius * Math.cos(latRad) * Math.cos(lngRad) + (Math.random() - 0.5) * 2
      const y = radius * Math.sin(latRad) + (Math.random() - 0.5) * 2
      const z = radius * Math.cos(latRad) * Math.sin(lngRad) + (Math.random() - 0.5) * 2
      positions.push([x, y, z])
    }
  }
  // Fill remaining with origin
  for (let i = positions.length; i < N; i++) {
    positions.push([0, 0, 0])
  }
  return positions
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE HELPER
// ═══════════════════════════════════════════════════════════════════════════

function phaseAt(progress) {
  if (progress >= PHASES[PHASES.length - 1]) {
    return { index: PHASES.length - 2, t: 1 }
  }
  for (let i = 0; i < PHASES.length - 1; i++) {
    if (progress >= PHASES[i] && progress < PHASES[i + 1]) {
      const start = PHASES[i]
      const end = PHASES[i + 1]
      const t = (progress - start) / (end - start)
      return { index: i, t }
    }
  }
  return { index: 0, t: 0 }
}

// ═══════════════════════════════════════════════════════════════════════════
// MORPH DATA LOADING
// ═══════════════════════════════════════════════════════════════════════════

async function loadMorphData() {
  const morphs = [null, null, null, null, null, null, null, null, null, null]
  
  // Load brain from OBJ
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}models/head.obj`)
    const text = await response.text()
    const verts = parseObjVertices(text)
    const normalized = normalizeVertices(verts)
    morphs[0] = samplePositions(normalized, N, 16)
    morphs[2] = [...morphs[0]]
    morphs[3] = [...morphs[0]]
  } catch (err) {
    console.warn('Brain load failed, using scatter:', err.message)
    morphs[0] = generateScatter(N, 16, 1.0)
    morphs[2] = [...morphs[0]]
    morphs[3] = [...morphs[0]]
  }
  
  // Scatter
  morphs[1] = generateScatter(N, 16, 1.0)
  
  // Rocket
  morphs[4] = generateProceduralRocket(N, 16, 0.75)
  morphs[5] = [...morphs[4]]
  
  // Top Scatter
  morphs[6] = generateTopScatter(N)
  
  // Globe (medium, section 4)
  morphs[7] = generateEarthGlobe(N, 16, 0.7)
  morphs[8] = [...morphs[7]]
  
  // Globe (large, section 5)
  morphs[9] = generateEarthGlobe(N, 30, 0.7)
  
  return morphs
}

// ═══════════════════════════════════════════════════════════════════════════
// KINETIC LINES COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

const KineticLines = ({ lines, as = 'h1', style = {} }) => {
  const Component = motion[as] || motion.div
  return (
    <Component style={style}>
      {lines.map((line, i) => (
        <motion.div
          key={`${i}-${line}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
            delay: i * 0.2,
          }}
        >
          {line}
        </motion.div>
      ))}
    </Component>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function CosmicParticlePage() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const morphsRef = useRef(null)
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const brainColorsRef = useRef(null)
  const rocketColorsRef = useRef(null)
  const lastStateIdxRef = useRef(-1)
  const isNoRotRef = useRef(false)
  const [phase, setPhase] = useState(0)
  const [buildIdx, setBuildIdx] = useState(0)

  // Load morphs on mount
  useEffect(() => {
    loadMorphData().then(morphs => {
      morphsRef.current = morphs
    })
  }, [])

  // Build card cycling
  useEffect(() => {
    const timer = setInterval(() => setBuildIdx(p => (p + 1) % 3), 2500)
    return () => clearInterval(timer)
  }, [])

  // Canvas setup and animation
  useEffect(() => {
    if (!canvasRef.current || !morphsRef.current) return

    // Three.js scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)

    // Geometry & Material
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(N * 3)
    const colors = new Float32Array(N * 3)
    const brainColors = new Float32Array(N * 3)
    const rocketColors = new Float32Array(generateRocketColors(N, 0.75))

    // Initialize with scatter
    const scatter = generateScatter(N, 16, 1.0)
    for (let i = 0; i < N; i++) {
      positions[i * 3] = scatter[i][0]
      positions[i * 3 + 1] = scatter[i][1]
      positions[i * 3 + 2] = scatter[i][2]
    }

    // Brain colors (hemisphere-based)
    for (let i = 0; i < N; i++) {
      const x = positions[i * 3]
      if (x >= 0) {
        colors[i * 3] = 0.8 + Math.random() * 0.2       // amber/green
        colors[i * 3 + 1] = 0.6 + Math.random() * 0.3
        colors[i * 3 + 2] = 0.1 + Math.random() * 0.2
      } else {
        colors[i * 3] = 0.5 + Math.random() * 0.3       // purple
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.2
        colors[i * 3 + 2] = 1.0
      }
    }
    brainColorsRef.current = new Float32Array(colors)
    rocketColorsRef.current = rocketColors

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 32
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'rgba(255, 255, 255, 0)'
    ctx.fillRect(0, 0, 32, 32)
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)'
    ctx.lineWidth = 3
    const s = 16
    ctx.beginPath()
    ctx.moveTo(s, 2)
    ctx.lineTo(s + 14, 30)
    ctx.lineTo(s - 14, 30)
    ctx.closePath()
    ctx.stroke()

    const texture = new THREE.CanvasTexture(canvas)
    const material = new THREE.PointsMaterial({
      map: texture,
      size: 0.8,
      vertexColors: true,
      transparent: true,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    })
    materialRef.current = material

    const mesh = new THREE.Points(geometry, material)
    meshRef.current = mesh
    scene.add(mesh)

    // Camera setup
    const updateCamera = () => {
      const aspect = window.innerWidth / window.innerHeight
      camera.aspect = aspect
      camera.updateProjectionMatrix()
      camera.position.z = aspect > 1 ? 35 : 60
    }
    updateCamera()

    // Scroll trigger
    let killTrigger = false
    const trigger = ScrollTrigger.create({
      onUpdate: ({ progress }) => {
        if (killTrigger) return
        setPhase(progress)
        
        if (!morphsRef.current || !meshRef.current) return
        
        const { index: i0, t: phaseT } = phaseAt(progress)
        const morphIdx0 = i0
        const morphIdx1 = i0 + 1
        
        if (morphIdx1 >= morphsRef.current.length) return
        
        const a0 = morphsRef.current[morphIdx0]
        const a1 = morphsRef.current[morphIdx1]
        const pa = geometry.attributes.position.array

        for (let i = 0; i < N; i++) {
          pa[i * 3] = a0[i][0] + (a1[i][0] - a0[i][0]) * phaseT
          pa[i * 3 + 1] = a0[i][1] + (a1[i][1] - a0[i][1]) * phaseT
          pa[i * 3 + 2] = a0[i][2] + (a1[i][2] - a0[i][2]) * phaseT
        }
        geometry.attributes.position.needsUpdate = true

        // State-based positioning
        const stateIdx = Math.floor(i0 / 2)
        const tState = (i0 % 2 === 0) ? phaseT : phaseT
        
        const lerp = (a, b, t) => a + (b - a) * t
        const o0 = STATE_OFFSETS[stateIdx] || [0, 0, 0]
        const o1 = STATE_OFFSETS[Math.min(stateIdx + 1, STATE_OFFSETS.length - 1)] || [0, 0, 0]

        mesh.position.set(
          lerp(o0[0], o1[0], tState),
          lerp(o0[1], o1[1], tState),
          lerp(o0[2], o1[2], tState),
        )

        // Rotation gating
        isNoRotRef.current = stateIdx === 2

        // Particle size per state
        if (stateIdx === 2) {
          material.size = 0.85
        } else if (stateIdx === 4) {
          material.size = 1.6
        } else {
          material.size = 0.8
        }

        // Color swapping
        if (stateIdx === 2 && lastStateIdxRef.current !== 2) {
          geometry.attributes.color.array.set(rocketColorsRef.current)
          geometry.attributes.color.needsUpdate = true
        } else if (stateIdx !== 2 && lastStateIdxRef.current === 2) {
          geometry.attributes.color.array.set(brainColorsRef.current)
          geometry.attributes.color.needsUpdate = true
        }
        lastStateIdxRef.current = stateIdx
      },
    })

    // Animation loop
    let rafId = null
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      if (!isNoRotRef.current) {
        mesh.rotation.z += 0.002
      }
      renderer.render(scene, camera)
    }
    animate()

    // Resize handler
    const handleResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      updateCamera()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
      if (trigger) trigger.kill()
      killTrigger = true
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  const buildCards = [
    {
      title: 'THE VELOCITY BUILD',
      color: '#9d7aff',
      desc: 'Digital authority established in weeks, not months.',
    },
    {
      title: 'THE GROWTH STACK',
      color: '#ffb829',
      desc: 'High-performance infrastructure built for scale.',
    },
    {
      title: 'THE APEX ARCHITECTURE',
      color: '#15846e',
      desc: 'Bespoke experiences pushing the limits of the browser.',
    },
  ]

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-x-hidden">
      {/* Canvas - particle background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-screen pointer-events-none"
      />

      {/* Content Container */}
      <div className="relative z-10">
        {/* Section 1: Results */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            {phase < 0.25 && (
              <KineticLines
                key="section1"
                as="h1"
                lines={[
                  '50+ Projects Delivered',
                  '3x Faster Than In-House',
                  '100% Code Ownership',
                ]}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, system-ui',
                }}
              />
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase < 0.25 ? 1 : 0, y: phase < 0.25 ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 flex gap-4 justify-center flex-wrap"
            >
              <button className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors">
                Start a Project
              </button>
              <button className="px-6 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                View Portfolio
              </button>
            </motion.div>
          </div>
        </section>

        {/* Section 2: Tiers */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            {phase >= 0.25 && phase < 0.5 && (
              <KineticLines
                key="section2"
                as="h2"
                lines={[
                  'Every tier solves',
                  'a specific problem.',
                  'Pick the one that fits.',
                ]}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, system-ui',
                }}
              />
            )}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 0.25 && phase < 0.5 ? 1 : 0, y: phase >= 0.25 && phase < 0.5 ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto"
            >
              Choose the engagement model that aligns with your timeline and goals.
            </motion.p>
          </div>
        </section>

        {/* Section 3: Digital Authority (Build Cards) */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-2xl mx-auto text-center w-full">
            {phase >= 0.5 && phase < 0.7 && (
              <KineticLines
                key="section3"
                as="h2"
                lines={[
                  'Digital Authority',
                  'in a lightning-fast sprint',
                ]}
                style={{
                  fontSize: 'clamp(2rem, 7vw, 4rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, system-ui',
                }}
              />
            )}

            {/* Build Cards Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: phase >= 0.5 && phase < 0.7 ? 1 : 0, y: phase >= 0.5 && phase < 0.7 ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 w-full max-w-lg mx-auto"
            >
              <AnimatePresence mode="wait">
                {buildCards.map((card, idx) => {
                  if (idx !== buildIdx) return null
                  return (
                    <motion.div
                      key={`build-${idx}`}
                      initial={{ opacity: 0, y: 30, scale: 0.92 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.92 }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 22,
                      }}
                      className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl w-full"
                      style={{
                        borderColor: `${card.color}40`,
                        background: `linear-gradient(135deg, ${card.color}10, ${card.color}05)`,
                      }}
                    >
                      <div
                        className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                        style={{ color: card.color, backgroundColor: `${card.color}20` }}
                      >
                        {card.title}
                      </div>
                      <p className="text-lg text-zinc-300 leading-relaxed mt-4">
                        {card.desc}
                      </p>
                      
                      {/* Visual Lightbulb Element */}
                      <svg className="w-16 h-16 mx-auto mt-6 opacity-60" viewBox="0 0 64 64" fill="none" stroke={card.color} strokeWidth="2">
                        <path d="M32 6C23 6 16 13 16 22C16 28 18 32 20 36H44C46 32 48 28 48 22C48 13 41 6 32 6Z" />
                        <line x1="28" y1="48" x2="36" y2="48" />
                        <line x1="26" y1="54" x2="38" y2="54" />
                        <circle cx="32" cy="42" r="2" fill={card.color} />
                      </svg>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Blueprint */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            {phase >= 0.7 && phase < 0.86 && (
              <KineticLines
                key="section4"
                as="h2"
                lines={[
                  'AI meets infrastructure.',
                  'Built in 30 days.',
                  'Shipped with confidence.',
                ]}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, system-ui',
                }}
              />
            )}
          </div>
        </section>

        {/* Section 5: Edge */}
        <section className="min-h-screen flex items-center justify-center px-6 py-32">
          <div className="max-w-4xl mx-auto text-center">
            {phase >= 0.86 && (
              <KineticLines
                key="section5"
                as="h2"
                lines={[
                  'AI-Native Team',
                  '3x Faster Delivery',
                  'One Point of Contact',
                  'Global Talent',
                ]}
                style={{
                  fontSize: 'clamp(2rem, 7vw, 4rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: '#ffffff',
                  fontFamily: 'Space Grotesk, system-ui',
                }}
              />
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase >= 0.86 ? 1 : 0, y: phase >= 0.86 ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <button className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors">
                Get Started
              </button>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Extended scroll space for trigger */}
      <div className="h-96" />
    </div>
  )
}
