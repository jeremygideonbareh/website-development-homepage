import { useState, useEffect, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function hash(ix, iy) {
  const n = Math.sin(ix * 12.9898 + iy * 78.233) * 43758.5453
  return n - Math.floor(n)
}

function smoothNoise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y)
  const fx = x - ix, fy = y - iy
  const sx = fx * fx * (3 - 2 * fx)
  const sy = fy * fy * (3 - 2 * fy)
  const n00 = hash(ix, iy), n10 = hash(ix + 1, iy)
  const n01 = hash(ix, iy + 1), n11 = hash(ix + 1, iy + 1)
  return n00 + (n10 - n00) * sx + (n01 - n00) * sy + (n00 - n10 - n01 + n11) * sx * sy
}

function fbm(x, y, octaves = 5) {
  let val = 0, amp = 1, freq = 1, max = 0
  for (let i = 0; i < octaves; i++) {
    val += amp * smoothNoise(x * freq, y * freq)
    max += amp; amp *= 0.5; freq *= 2
  }
  return val / max
}

function ridgedFbm(x, y, octaves = 5) {
  let val = 0, amp = 1, freq = 1, max = 0
  for (let i = 0; i < octaves; i++) {
    let n = 1 - Math.abs(2 * smoothNoise(x * freq, y * freq) - 1)
    n = n * n
    val += amp * n; max += amp; amp *= 0.5; freq *= 2
  }
  return val / max
}

function createTerrain({ width, depth, segW, segD, freq, amp, ridged }) {
  const geo = new THREE.PlaneGeometry(width, depth, segW, segD)
  geo.rotateX(-Math.PI / 2)
  const pos = geo.attributes.position
  const noiseFn = ridged ? ridgedFbm : fbm

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getZ(i)
    const h = noiseFn(x * freq, z * freq) * amp
    pos.setY(i, h)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

function MountainLayer({ config, color = '#2B2B2B', opacity = 1, yOffset = 0 }) {
  const ref = useRef()
  const geo = useMemo(() => createTerrain(config), [config])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = yOffset + Math.sin(clock.elapsedTime * 0.08 + config.zOffset * 0.1) * 0.03
    }
  })

  return (
    <mesh ref={ref} geometry={geo} position={[0, yOffset, config.zOffset]}>
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        metalness={0.15}
        flatShading
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function FogEffect() {
  const { scene } = useThree()
  const fogRef = useRef()

  useMemo(() => {
    const fog = new THREE.FogExp2(0x2b2b2b, 0.025)
    scene.fog = fog
    fogRef.current = fog
  }, [])

  useFrame(({ clock }) => {
    if (fogRef.current) {
      fogRef.current.density = 0.025 + Math.sin(clock.elapsedTime * 0.3) * 0.003
    }
  })

  return null
}

function CameraController({ progress }) {
  const { camera } = useThree()

  useFrame(() => {
    const t = Math.min(progress, 1)
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    camera.position.z = 12 + (2 - 12) * eased
    camera.position.y = 3 + (4.5 - 3) * eased
    camera.lookAt(0, 0.5, -3)
  })

  return null
}

function Scene({ progress }) {
  return (
    <>
      <FogEffect />
      <CameraController progress={progress} />

      <ambientLight intensity={0.25} />
      <directionalLight position={[8, 12, 5]} intensity={0.5} />
      <directionalLight position={[-4, 6, -8]} intensity={0.15} color="#E41613" />

      <MountainLayer
        config={{ width: 50, depth: 20, segW: 60, segD: 30, freq: 0.02, amp: 3, ridged: true, zOffset: -12 }}
        color="#1a1a1a"
        opacity={0.3}
        yOffset={-2}
      />

      <MountainLayer
        config={{ width: 42, depth: 18, segW: 80, segD: 40, freq: 0.025, amp: 4, ridged: true, zOffset: -8 }}
        color="#202020"
        opacity={0.5}
        yOffset={-1.5}
      />

      <MountainLayer
        config={{ width: 36, depth: 16, segW: 100, segD: 50, freq: 0.03, amp: 5.5, ridged: true, zOffset: -4 }}
        color="#2B2B2B"
        opacity={0.8}
        yOffset={-1}
      />

      <MountainLayer
        config={{ width: 30, depth: 12, segW: 80, segD: 40, freq: 0.04, amp: 2.5, ridged: false, zOffset: 0 }}
        color="#181818"
        opacity={1}
        yOffset={-1.8}
      />

      <MountainLayer
        config={{ width: 24, depth: 8, segW: 60, segD: 30, freq: 0.05, amp: 1.5, ridged: false, zOffset: 4 }}
        color="#111111"
        opacity={1}
        yOffset={-2}
      />

      <mesh position={[-6, 1.5, -5]}>
        <planeGeometry args={[5, 5]} />
        <meshBasicMaterial color="#E41613" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const p = window.scrollY / window.innerHeight
      setProgress(Math.min(p / 1.5, 1))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}

export default function MountEverestScene() {
  const progress = useScrollProgress()

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 0,
      overflow: 'hidden',
      background: '#2B2B2B',
    }}>
      <Canvas
        camera={{ position: [0, 3, 12], fov: 50, near: 0.1, far: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene progress={progress} />
      </Canvas>

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        pointerEvents: 'none',
        textAlign: 'center',
        width: '100%',
        padding: '0 24px',
      }}>
        <p style={{
          fontSize: '14px',
          letterSpacing: '4px',
          color: '#E41613',
          fontWeight: 500,
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}>
          Horizon Labs
        </p>
        <h1 style={{
          fontSize: 'clamp(3rem, 10vw, 8rem)',
          fontWeight: 900,
          color: '#F2F2F2',
          lineHeight: 1,
          letterSpacing: '0.02em',
          margin: 0,
        }}>
          Sky's the<br />
          <span style={{ color: '#E41613' }}>Limit</span>
        </h1>
        <p style={{
          marginTop: '24px',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.2rem)',
          color: '#AAAAAA',
          maxWidth: '480px',
          lineHeight: 1.6,
          margin: '24px auto 0',
        }}>
          Scroll to explore the peaks of what's possible
        </p>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontSize: '11px',
          letterSpacing: '3px',
          color: '#AAAAAA',
          fontWeight: 500,
        }}>
          SCROLL TO ZOOM
        </span>
        <div style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, #E41613, transparent)',
        }} />
      </div>
    </div>
  )
}
