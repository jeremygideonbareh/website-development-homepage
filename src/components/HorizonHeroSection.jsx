import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

gsap.registerPlugin(ScrollTrigger);

export default function HorizonHeroSection() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollProgressRef = useRef(null);
  const menuRef = useRef(null);
  const heroTextRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const taglineRef = useRef(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 100 });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const threeRefs = useRef({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    stars: [],
    nebula: null,
    mountains: [],
    animationId: null,
  });

  useEffect(() => {
    const initThree = () => {
      const { current: refs } = threeRefs;

      refs.scene = new THREE.Scene();
      refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

      refs.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000,
      );
      refs.camera.position.z = 100;
      refs.camera.position.y = 20;

      refs.renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      refs.renderer.setSize(window.innerWidth, window.innerHeight);
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      refs.renderer.toneMappingExposure = 0.5;

      refs.composer = new EffectComposer(refs.renderer);
      const renderPass = new RenderPass(refs.scene, refs.camera);
      refs.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.2,
        0.1,
        0.3,
      );
      refs.composer.addPass(bloomPass);

      createStarField();
      createNebula();
      createMountains();
      animate();

      setIsReady(true);
      window.scrollTo(0, 0);
    };

    const createStarField = () => {
      const { current: refs } = threeRefs;
      const starCount = 5000;

      for (let i = 0; i < 3; i++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const colors = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);

        for (let j = 0; j < starCount; j++) {
          const radius = 200 + Math.random() * 800;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(Math.random() * 2 - 1);

          positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[j * 3 + 2] = radius * Math.cos(phi);

          const brightness = 0.5 + Math.random() * 0.5;
          const color = new THREE.Color(brightness, brightness, brightness);

          colors[j * 3] = color.r;
          colors[j * 3 + 1] = color.g;
          colors[j * 3 + 2] = color.b;
          sizes[j] = Math.random() * 2 + 0.5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            depth: { value: i },
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            uniform float depth;
            void main() {
              vColor = color;
              vec3 pos = position;
              float angle = time * 0.05 * (1.0 - depth * 0.3);
              mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
              pos.xy = rot * pos.xy;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (300.0 / -mvPosition.z);
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              float dist = length(gl_PointCoord - vec2(0.5));
              if (dist > 0.5) discard;
              float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
              gl_FragColor = vec4(vColor, opacity);
            }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });

        const stars = new THREE.Points(geometry, material);
        refs.scene.add(stars);
        refs.stars.push(stars);
      }
    };

    const createNebula = () => {
      const { current: refs } = threeRefs;

      const geometry = new THREE.PlaneGeometry(8000, 4000, 100, 100);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color1: { value: new THREE.Color(0x222222) },
          color2: { value: new THREE.Color(0x111111) },
          opacity: { value: 0.15 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying float vElevation;
          uniform float time;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color1;
          uniform vec3 color2;
          uniform float opacity;
          uniform float time;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixFactor = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
            vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
            float alpha = opacity * (1.0 - length(vUv - 0.5) * 2.0);
            alpha *= 1.0 + vElevation * 0.01;
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const nebula = new THREE.Mesh(geometry, material);
      nebula.position.z = -1050;
      refs.scene.add(nebula);
      refs.nebula = nebula;
    };

    const createMountains = () => {
      const { current: refs } = threeRefs;

      const layers = [
        { distance: -50, height: 60, color: 0x555555, opacity: 1 },
        { distance: -100, height: 80, color: 0x444444, opacity: 0.8 },
        { distance: -150, height: 100, color: 0x333333, opacity: 0.6 },
        { distance: -200, height: 120, color: 0x222222, opacity: 0.4 },
      ];

      layers.forEach((layer) => {
        const points = [];
        const segments = 50;

        for (let i = 0; i <= segments; i++) {
          const x = (i / segments - 0.5) * 1000;
          const y = Math.sin(i * 0.1) * layer.height
            + Math.sin(i * 0.05) * layer.height * 0.5
            + Math.random() * layer.height * 0.2 - 100;
          points.push(new THREE.Vector2(x, y));
        }

        points.push(new THREE.Vector2(5000, -2000));
        points.push(new THREE.Vector2(-5000, -2000));

        const shape = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(shape);
        const material = new THREE.MeshBasicMaterial({
          color: layer.color,
          transparent: true,
          opacity: layer.opacity,
          side: THREE.DoubleSide,
        });

        const mountain = new THREE.Mesh(geometry, material);
        mountain.position.z = layer.distance;
        mountain.position.y = 50;
        mountain.userData = { baseZ: layer.distance };
        refs.scene.add(mountain);
        refs.mountains.push(mountain);
      });
    };

    const animate = () => {
      const { current: refs } = threeRefs;
      refs.animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      refs.stars.forEach((starField) => {
        if (starField.material.uniforms) {
          starField.material.uniforms.time.value = time;
        }
      });

      if (refs.nebula && refs.nebula.material.uniforms) {
        refs.nebula.material.uniforms.time.value = time * 0.5;
      }

      if (refs.camera && refs.targetCameraX !== undefined) {
        const smoothingFactor = 0.05;

        smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
        smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
        smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;

        const floatX = Math.sin(time * 0.1) * 2;
        const floatY = Math.cos(time * 0.15) * 1;

        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, refs.camera.position.z - 300);
      }

      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + Math.cos(time * 0.15) * 1 * parallaxFactor;
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    initThree();

    const handleResize = () => {
      const { current: refs } = threeRefs;
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      const { current: refs } = threeRefs;

      if (refs.animationId) {
        cancelAnimationFrame(refs.animationId);
      }

      window.removeEventListener('resize', handleResize);

      refs.stars.forEach((starField) => {
        starField.geometry.dispose();
        starField.material.dispose();
      });

      refs.mountains.forEach((mountain) => {
        mountain.geometry.dispose();
        mountain.material.dispose();
      });

      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        refs.nebula.material.dispose();
      }

      if (refs.renderer) {
        refs.renderer.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    gsap.set([titleRef.current, subtitleRef.current, scrollProgressRef.current, menuRef.current], {
      visibility: 'visible',
    });

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }

    if (titleRef.current) {
      const titleChars = titleRef.current.querySelectorAll('.title-char');
      tl.from(titleChars, {
        y: 200,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: 'power4.out',
      }, '-=0.5');
    }

    if (subtitleRef.current) {
      const subtitleLines = subtitleRef.current.querySelectorAll('.subtitle-line');
      tl.from(subtitleLines, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }, '-=0.8');
    }

    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
      }, '-=0.5');
    }

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      pin: true,
      start: 'top top',
      end: '+=2000',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const { current: refs } = threeRefs;
        if (!refs.mountains.length || !refs.camera) return;

        const startZ = 300;
        const endZ = -600;
        refs.targetCameraX = 0;
        refs.targetCameraY = 30 + progress * 20;
        refs.targetCameraZ = startZ + (endZ - startZ) * progress;

        refs.mountains.forEach((mountain, i) => {
          const speed = 1 + i * 0.5;
          mountain.position.z = mountain.userData.baseZ + progress * 200 * speed;
        });

        if (refs.nebula && refs.mountains[3]) {
          refs.nebula.position.z = refs.mountains[3].position.z;
        }

        setScrollProgress(progress);
        setCurrentSection(Math.floor(progress * 3));

        if (heroTextRef.current) {
          const opacity = Math.max(0, 1 - (progress - 0.08) / 0.15);
          heroTextRef.current.style.opacity = opacity;
          heroTextRef.current.style.transform = `translateY(${(progress - 0.08) / 0.15 * 40}px)`;
        }
        if (taglineRef.current) {
          const tIn = Math.max(0, Math.min(1, (progress - 0.18) / 0.12));
          const tOut = Math.max(0, 1 - (progress - 0.35) / 0.12);
          const t = tIn * tOut;
          taglineRef.current.style.opacity = t;
          taglineRef.current.style.transform = `translateY(${20 - t * 20}px)`;
        }
        if (section1Ref.current) {
          const s1 = Math.max(0, Math.min(1, (progress - 0.42) / 0.14)) * Math.max(0, 1 - (progress - 0.58) / 0.12);
          section1Ref.current.style.opacity = s1;
          section1Ref.current.style.transform = `translateY(${20 - s1 * 20}px)`;
        }
        if (section2Ref.current) {
          const s2 = Math.max(0, Math.min(1, (progress - 0.65) / 0.14)) * Math.max(0, 1 - (progress - 0.80) / 0.10);
          section2Ref.current.style.opacity = s2;
          section2Ref.current.style.transform = `translateY(${20 - s2 * 20}px)`;
        }
      },
    });

    return () => {
      tl.kill();
      st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(containerRef.current);
      if (containerRef.current) {
        gsap.set(containerRef.current, { clearProps: 'all' });
      }
    };
  }, [isReady]);

  const splitTitle = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="title-char">
        {char}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className="hero-container">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div ref={menuRef} className="side-menu" style={{ visibility: 'hidden' }}>
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="vertical-text">SPACE</div>
      </div>

      <div className="hero-content">
        <div ref={heroTextRef}>
          <h1 ref={titleRef} className="hero-title">
            {splitTitle('HORIZON')}
          </h1>
          <div ref={subtitleRef} className="hero-subtitle">
            <p className="subtitle-line">Enterprise-grade web development & digital platforms.</p>
            <p className="subtitle-line">Scale your business with websites built for speed and conversion.</p>
          </div>
        </div>
      </div>

      <div ref={scrollProgressRef} className="scroll-progress" style={{ visibility: 'hidden' }}>
        <div className="scroll-text">SCROLL</div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="section-counter">
          {String(currentSection + 1).padStart(2, '0')} / 03
        </div>
      </div>

      <div className="scroll-sections">
        <section className="content-section" ref={taglineRef} style={{ opacity: 0 }}>
          <p className="text-xl md:text-2xl text-zinc-300 tracking-wide">
            Implementation Made Easy
          </p>
        </section>
        <section className="content-section" ref={section1Ref} style={{ opacity: 0 }}>
          <h1 className="hero-title">INTELLIGENCE</h1>
          <div className="hero-subtitle">
            <p className="subtitle-line">AI-powered web experiences, smart automation,</p>
            <p className="subtitle-line">and modern frameworks.</p>
          </div>
        </section>
        <section className="content-section" ref={section2Ref} style={{ opacity: 0 }}>
          <h1 className="hero-title">INFRASTRUCTURE</h1>
          <div className="hero-subtitle">
            <p className="subtitle-line">Bespoke web platforms.</p>
            <p className="subtitle-line">Built to handle massive traffic with zero downtime.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
