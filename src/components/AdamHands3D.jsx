import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function createFinger(base, joints, angle, side) {
  const group = []
  let px = base[0], py = base[1], pz = base[2]
  for (let i = 0; i < joints.length; i++) {
    const [len, wide] = joints[i]
    const geo = new THREE.CylinderGeometry(wide * 0.7, wide, len, 6, 1)
    geo.translate(0, len / 2, 0)
    geo.rotateX(Math.PI / 2)

    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const mesh = new THREE.Mesh(geo, mat)
    const dir = side === 'god' ? 1 : -1
    mesh.position.set(px, py + len / 2, pz)
    mesh.rotation.z = angle * (i + 1) * dir
    mesh.rotation.order = 'YXZ'
    mesh.updateMatrix()
    group.push(mesh.geometry.clone().applyMatrix4(mesh.matrix))

    px += Math.sin(angle * (i + 1)) * len * dir
    py += Math.cos(angle * (i + 1)) * len
  }
  return group
}

function buildHand(side) {
  const geos = []
  const isGod = side === 'god'
  const dir = isGod ? 1 : -1

  // Palm
  const palmGeo = new THREE.SphereGeometry(6, 8, 6)
  palmGeo.scale(1.6, 1, 1.2)
  const palmMesh = new THREE.Mesh(palmGeo, new THREE.MeshBasicMaterial())
  palmMesh.position.set(isGod ? -4 : 4, 2, 0)
  palmMesh.updateMatrix()
  geos.push(palmMesh.geometry.clone().applyMatrix4(palmMesh.matrix))

  // Thumb
  const thumbJoints = [[3.5, 1.8], [2.5, 1.4]]
  const thumbBase = isGod ? [-6, -2, 2] : [6, -2, 2]
  const thumbFinger = createFinger(thumbBase, thumbJoints, isGod ? -0.3 : 0.3, side)
  geos.push(...thumbFinger)

  // Index finger (longest, extended toward center)
  const indexJoints = [[3, 1.6], [2.5, 1.3], [1.8, 1]]
  const indexBase = isGod ? [-2, 5, -1] : [2, 5, 1]
  const indexDir = isGod ? 0.08 : -0.08
  const indexFinger = createFinger(indexBase, indexJoints, indexDir, side)
  geos.push(...indexFinger)

  // Middle finger
  const middleJoints = [[3, 1.6], [2.5, 1.3], [1.8, 1]]
  const middleBase = isGod ? [-1, 5.5, 2] : [1, 5.5, -2]
  const middleFinger = createFinger(middleBase, middleJoints, isGod ? 0.15 : -0.15, side)
  geos.push(...middleFinger)

  // Ring finger
  const ringJoints = [[2.8, 1.5], [2.2, 1.2], [1.5, 0.9]]
  const ringBase = isGod ? [1, 5, 3.5] : [-1, 5, -3.5]
  const ringFinger = createFinger(ringBase, ringJoints, isGod ? 0.25 : -0.25, side)
  geos.push(...ringFinger)

  // Pinky
  const pinkyJoints = [[2.2, 1.2], [1.8, 1], [1.2, 0.7]]
  const pinkyBase = isGod ? [3, 4, 4.5] : [-3, 4, -4.5]
  const pinkyFinger = createFinger(pinkyBase, pinkyJoints, isGod ? 0.35 : -0.35, side)
  geos.push(...pinkyFinger)

  return geos
}

export default function AdamHands3D({ className }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 200)
    camera.position.set(0, 0, 50)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Build hands
    const godGeos = buildHand('god')
    const adamGeos = buildHand('adam')

    const godMerged = mergeGeos(godGeos)
    const adamMerged = mergeGeos(adamGeos)

    // Offset hands to left and right
    const godPos = new THREE.Vector3(-8, -1, 0)
    const adamPos = new THREE.Vector3(8, -1, 0)

    // Create particles from vertices
    const godParticles = sampleParticles(godMerged, godPos, 2500)
    const adamParticles = sampleParticles(adamMerged, adamPos, 2500)

    // Add index finger tip glow
    const tipPositions = getTipPositions(godMerged, godPos, adamMerged, adamPos)

    const allPositions = [...godParticles, ...adamParticles, ...tipPositions]

    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(allPositions.length * 3)
    const sizes = new Float32Array(allPositions.length)
    const alphas = new Float32Array(allPositions.length)
    const isTip = new Float32Array(allPositions.length)

    allPositions.forEach((p, i) => {
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
      sizes[i] = p.size || (0.15 + Math.random() * 0.25)
      alphas[i] = i >= godParticles.length + adamParticles.length ? 1 : 0.5 + Math.random() * 0.4
      isTip[i] = i >= godParticles.length + adamParticles.length ? 1 : 0
    })

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    particleGeo.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1))
    particleGeo.setAttribute('isTip', new THREE.BufferAttribute(isTip, 1))

    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute float alpha;
        attribute float isTip;
        uniform float uTime;
        varying float vAlpha;
        varying float vTip;

        void main() {
          vAlpha = alpha;
          vTip = isTip;
          vec3 pos = position;
          pos.y += sin(uTime * 0.5 + position.x * 0.3) * 0.3;
          pos.x += sin(uTime * 0.3 + position.z * 0.2) * 0.2;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (40.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vAlpha;
        varying float vTip;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;

          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          vec3 color = vec3(0.95, 0.95, 0.95);

          if (vTip > 0.5) {
            color = vec3(0.906, 0.773, 0.604);
            glow *= 1.5;
          }

          float alpha = vAlpha * glow;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    })

    const particleSystem = new THREE.Points(particleGeo, particleMat)
    scene.add(particleSystem)

    // Add ambient glow at the gap
    const gapGlow = new THREE.Mesh(
      new THREE.SphereGeometry(3, 16, 16),
      new THREE.MeshBasicMaterial({
        color: 0xe7c59a,
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    gapGlow.position.set(0, 5, 0)
    scene.add(gapGlow)

    // Animation
    let time = 0

    const animate = () => {
      time += 0.01
      particleMat.uniforms.uTime.value = time
      camera.position.x = Math.sin(time * 0.1) * 5
      camera.lookAt(0, 0, 0)
      gapGlow.material.opacity = 0.06 + Math.sin(time) * 0.03
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      while (container.firstChild) container.removeChild(container.firstChild)
    }
  }, [])

  return (
    <div ref={containerRef} className={`w-full overflow-hidden ${className || ''}`} style={{ height: '500px' }} />
  )
}

function mergeGeos(geos) {
  const merged = new THREE.BufferGeometry()
  const positions = []
  for (const geo of geos) {
    const pos = geo.attributes.position.array
    for (let i = 0; i < pos.length; i += 3) {
      positions.push(pos[i], pos[i + 1], pos[i + 2])
    }
  }
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  merged.computeVertexNormals()
  return merged
}

function sampleParticles(geo, offset, count) {
  const pos = geo.attributes.position.array
  const particles = []
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * (pos.length / 3)) * 3
    particles.push({
      x: pos[idx] + offset.x + (Math.random() - 0.5) * 0.5,
      y: pos[idx + 1] + offset.y + (Math.random() - 0.5) * 0.5,
      z: pos[idx + 2] + offset.z + (Math.random() - 0.5) * 0.5,
    })
  }
  return particles
}

function getTipPositions(godGeo, godOff, adamGeo, adamOff) {
  const tips = []
  const godPos = godGeo.attributes.position.array
  const adamPos = adamGeo.attributes.position.array

  // Find the farthest points (fingertips)
  let maxGodDist = 0
  let maxAdamDist = 0
  let godTip = new THREE.Vector3()
  let adamTip = new THREE.Vector3()

  for (let i = 0; i < godPos.length; i += 3) {
    const d = Math.sqrt(godPos[i] * godPos[i] + godPos[i + 2] * godPos[i + 2])
    if (d > maxGodDist) {
      maxGodDist = d
      godTip.set(godPos[i], godPos[i + 1], godPos[i + 2])
    }
  }
  for (let i = 0; i < adamPos.length; i += 3) {
    const d = Math.sqrt(adamPos[i] * adamPos[i] + adamPos[i + 2] * adamPos[i + 2])
    if (d > maxAdamDist) {
      maxAdamDist = d
      adamTip.set(adamPos[i], adamPos[i + 1], adamPos[i + 2])
    }
  }

  // Add glow particles near fingertips
  for (let i = 0; i < 30; i++) {
    const t = i / 30
    const spread = 0.5 + t * 2
    tips.push({
      x: godTip.x + godOff.x + (Math.random() - 0.5) * spread,
      y: godTip.y + godOff.y + (Math.random() - 0.5) * spread,
      z: godTip.z + godOff.z + (Math.random() - 0.5) * spread,
      size: 0.3 + t * 0.5,
    })
    tips.push({
      x: adamTip.x + adamOff.x + (Math.random() - 0.5) * spread,
      y: adamTip.y + adamOff.y + (Math.random() - 0.5) * spread,
      z: adamTip.z + adamOff.z + (Math.random() - 0.5) * spread,
      size: 0.3 + t * 0.5,
    })
  }

  return tips
}
