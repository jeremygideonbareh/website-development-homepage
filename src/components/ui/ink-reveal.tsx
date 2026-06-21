"use client";
import { useEffect, useRef, useCallback } from "react";

interface InkRevealProps {
  maskColor?: [number, number, number];
  brushSize?: number;
  lifetime?: number;
  rStart?: number;
  rVary?: number;
  stampStep?: number;
  maxStamps?: number;
  segments?: number;
  wobble?: [number, number, number];
  gradientInnerRadius?: number;
  gradientStops?: [number, number, number];
  permanent?: boolean;
  autoRevealThreshold?: number;
  autoRevealStaggerMs?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Stamp {
  x: number;
  y: number;
  born: number;
  seed: number;
  rmax: number;
}

export default function InkReveal({
  maskColor = [252, 250, 248],
  brushSize = 128,
  lifetime = 600,
  rStart = 10,
  rVary = 0.45,
  stampStep = 10,
  maxStamps = 200,
  segments = 36,
  wobble = [0.14, 0.08, 0.05],
  gradientInnerRadius = 0.2,
  gradientStops = [0.95, 0.88, 0],
  permanent = true,
  autoRevealThreshold = 0.3,
  autoRevealStaggerMs = 4,
  className,
  style,
}: InkRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const runningRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const dimsRef = useRef({ w: 0, h: 0 });
  const revealedRef = useRef(false);
  const autoRevealingRef = useRef(false);
  const loopRef = useRef<() => void>(() => {});

  const mc = maskColor;

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = parent.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    dimsRef.current = { w, h };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
    ctx.fillRect(0, 0, w, h);
  }, [mc]);

  const checkCoverage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const ctx = canvas.getContext("2d");
    if (!ctx) return 0;
    const { w, h } = dimsRef.current;
    if (!w || !h) return 0;
    const step = 40;
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;
    let cleared = 0;
    let total = 0;
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        if (data[(y * w + x) * 4 + 3] < 128) cleared++;
        total++;
      }
    }
    return total > 0 ? cleared / total : 0;
  }, []);

  const triggerAutoReveal = useCallback(() => {
    if (autoRevealingRef.current || revealedRef.current) return;
    autoRevealingRef.current = true;
    revealedRef.current = true;
    const { w, h } = dimsRef.current;
    if (!w || !h) return;
    const spacing = brushSize * 0.55;
    const cols = Math.ceil(w / spacing);
    const rows = Math.ceil(h / spacing);
    const offsetX = (w - (cols - 1) * spacing) / 2;
    const offsetY = (h - (rows - 1) * spacing) / 2;
    const now = performance.now();
    const stamps: Stamp[] = [];
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        stamps.push({
          x: offsetX + c * spacing,
          y: offsetY + r * spacing,
          born: now + i * autoRevealStaggerMs,
          seed: Math.random() * Math.PI * 2,
          rmax: brushSize,
        });
        i++;
      }
    }
    stampsRef.current.push(...stamps);
    if (!runningRef.current) {
      runningRef.current = true;
      requestAnimationFrame(() => loopRef.current());
    }
  }, [brushSize, autoRevealStaggerMs]);

  const carveInk = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      seed: number,
      alpha: number
    ) => {
      const g = ctx.createRadialGradient(
        x, y, r * gradientInnerRadius,
        x, y, r
      );
      g.addColorStop(0, `rgba(0,0,0,${gradientStops[0] * alpha})`);
      g.addColorStop(0.5, `rgba(0,0,0,${gradientStops[1] * alpha})`);
      g.addColorStop(1, `rgba(0,0,0,${gradientStops[2] * alpha})`);
      ctx.fillStyle = g;

      ctx.beginPath();
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2;
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7);
        const px = x + Math.cos(a) * r * wob;
        const py = y + Math.sin(a) * r * wob;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    },
    [segments, wobble, gradientInnerRadius, gradientStops]
  );

  const addStamp = useCallback(
    (x: number, y: number) => {
      const stamps = stampsRef.current;
      if (stamps.length >= maxStamps) stamps.shift();
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      });
    },
    [brushSize, rVary, maxStamps]
  );

  const stampAlong = useCallback(
    (x: number, y: number) => {
      const last = lastPosRef.current;
      if (!last) {
        addStamp(x, y);
      } else {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / stampStep));
        for (let i = 1; i <= steps; i++) {
          addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps);
        }
      }
      lastPosRef.current = { x, y };
    },
    [addStamp, stampStep]
  );

  const loop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h } = dimsRef.current;
    const now = performance.now();
    const stamps = stampsRef.current;

    if (!permanent) {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgb(${mc[0]},${mc[1]},${mc[2]})`;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = "destination-out";

    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / lifetime;
      if (t >= 1) {
        stamps.splice(i, 1);
        continue;
      }
      if (t < 0) continue;
      const ease = 1 - Math.pow(1 - t, 3);
      const r = rStart + (stamps[i].rmax - rStart) * ease;
      const alpha = permanent ? 1 : 1 - t * t;
      carveInk(ctx, stamps[i].x, stamps[i].y, r, stamps[i].seed, alpha);
    }

    if (!autoRevealingRef.current && autoRevealThreshold > 0 && stamps.length > 0) {
      const ratio = checkCoverage();
      if (ratio >= autoRevealThreshold) {
        triggerAutoReveal();
      }
    }

    if (stamps.length) {
      requestAnimationFrame(() => loopRef.current());
    } else {
      runningRef.current = false;
    }
  }, [carveInk, mc, lifetime, rStart, permanent, autoRevealThreshold, checkCoverage, triggerAutoReveal]);

  loopRef.current = loop;

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true;
      requestAnimationFrame(() => loopRef.current());
    }
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  const getRelativePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        cursor: "none",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (revealedRef.current) return;
        const pos = getRelativePos(e);
        lastPosRef.current = pos;
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseMove={(e) => {
        if (revealedRef.current) return;
        const pos = getRelativePos(e);
        stampAlong(pos.x, pos.y);
        startLoop();
      }}
      onMouseLeave={() => {
        lastPosRef.current = null;
      }}
    />
  );
}
