import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 100
const CONNECT_DIST = 3.5
const SPREAD = 8

function float32(seed) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

function Particles({ color = '#FF6B4A', speed = 0.15 }) {
  const meshRef = useRef()
  const lineRef = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (float32(i + 1) - 0.5) * SPREAD
      arr[i * 3 + 1] = (float32(i + 100) - 0.5) * SPREAD * 0.6
      arr[i * 3 + 2] = (float32(i + 200) - 0.5) * SPREAD * 0.4
    }
    return arr
  }, [])

  const velRef = useRef(new Float32Array(PARTICLE_COUNT * 3))
  useMemo(() => {
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      velRef.current[i] = (float32(i + 300 + i) - 0.5) * 0.008
    }
  }, [])

  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    return geo
  }, [positions])

  const lineGeo = useMemo(() => {
    const maxLines = PARTICLE_COUNT * (PARTICLE_COUNT - 1)
    const geo = new THREE.BufferGeometry()
    const pos = new Float32Array(maxLines * 6)
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    geo.setDrawRange(0, 0)
    return geo
  }, [])

  let frameCount = 0

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array
    const vel = velRef.current
    const t = clock.elapsedTime * speed

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      pos[ix] += vel[ix] + Math.sin(t + i * 0.5) * 0.002
      pos[ix + 1] += vel[ix + 1] + Math.cos(t * 0.7 + i * 0.3) * 0.002
      pos[ix + 2] += vel[ix + 2] + Math.sin(t * 0.5 + i * 0.7) * 0.002

      if (Math.abs(pos[ix]) > SPREAD / 2) vel[ix] *= -1
      if (Math.abs(pos[ix + 1]) > SPREAD * 0.3) vel[ix + 1] *= -1
      if (Math.abs(pos[ix + 2]) > SPREAD * 0.2) vel[ix + 2] *= -1
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true

    frameCount++
    if (frameCount % 3 !== 0) return

    if (!lineRef.current) return
    const linePos = lineGeo.attributes.position.array
    let idx = 0

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const jx = j * 3
        const dx = pos[ix] - pos[jx]
        const dy = pos[ix + 1] - pos[jx + 1]
        const dz = pos[ix + 2] - pos[jx + 2]
        const distSq = dx * dx + dy * dy + dz * dz
        if (distSq < CONNECT_DIST * CONNECT_DIST) {
          const o = idx * 6
          linePos[o] = pos[ix]; linePos[o + 1] = pos[ix + 1]; linePos[o + 2] = pos[ix + 2]
          linePos[o + 3] = pos[jx]; linePos[o + 4] = pos[jx + 1]; linePos[o + 5] = pos[jx + 2]
          idx++
        }
      }
    }

    lineGeo.setDrawRange(0, idx * 2)
    lineGeo.attributes.position.needsUpdate = true
  })

  return (
    <>
      <points ref={meshRef} geometry={particleGeo}>
        <pointsMaterial
          size={0.08}
          color={color}
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={lineRef} geometry={lineGeo}>
        <lineBasicMaterial color={color} transparent opacity={0.12} depthWrite={false} />
      </lineSegments>
    </>
  )
}

export default function NetworkParticles({ className, color = '#FF6B4A', speed = 0.15 }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 30 }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Particles color={color} speed={speed} />
      </Canvas>
    </div>
  )
}
