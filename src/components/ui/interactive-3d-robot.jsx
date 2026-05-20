import { Suspense, lazy, useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const Spline = lazy(() => import('@splinetool/react-spline'));

function TypewriterText({ text, color, speed = 80, onDone }) {
  const [idx, setIdx] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => setIdx((p) => p + 1), speed);
      return () => clearTimeout(t);
    } else if (!doneRef.current) {
      doneRef.current = true;
      onDone?.();
    }
  }, [idx, text.length, speed, onDone]);

  return (
    <p
      className="text-lg md:text-xl leading-relaxed uppercase"
      style={{
        color,
        fontFamily: "'Press Start 2P', monospace",
        imageRendering: 'pixelated',
        textShadow: `0 0 8px ${color}40`,
      }}
    >
      {text.slice(0, idx)}
      {idx < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.4 }}
          style={{ color }}
        >
          _
        </motion.span>
      )}
    </p>
  );
}

function PixelBubble({ children, color }) {
  return (
    <div
      className="relative px-6 py-4"
      style={{
        backgroundColor: '#0d0d1a',
        border: `3px solid ${color}`,
        boxShadow: `0 0 0 3px #0d0d1a, 0 0 0 6px ${color}, 0 0 24px ${color}40`,
        imageRendering: 'pixelated',
      }}
    >
      {children}
      <div
        className="absolute -bottom-3 left-1/2 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: '10px solid #0d0d1a',
          filter: 'drop-shadow(0 3px 0 #0d0d1a) drop-shadow(0 3px 0 #0d0d1a)',
        }}
      />
      <div
        className="absolute -bottom-[14px] left-1/2 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: '13px solid transparent',
          borderRight: '13px solid transparent',
          borderTop: '14px solid transparent',
        }}
      />
      <div
        className="absolute -bottom-[15px] left-1/2 -translate-x-1/2"
        style={{
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: `8px solid ${color}`,
        }}
      />
    </div>
  );
}

export function InteractiveRobotSpline({ scene, className }) {
  const [phase, setPhase] = useState('idle'); // idle | hello | future

  const handleClick = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('hello');
  }, [phase]);

  const handleHelloDone = useCallback(() => {
    setTimeout(() => setPhase('future'), 500);
  }, []);

  useEffect(() => {
    if (phase === 'future') {
      const t = setTimeout(() => setPhase('idle'), 3000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onClick={handleClick}
      style={{ perspective: '1000px', cursor: phase === 'idle' ? 'pointer' : 'default' }}
    >
      <motion.div className="w-full h-full">
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center bg-transparent">
              <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
              </svg>
            </div>
          }
        >
          <Spline scene={scene} className="w-full h-full" />
        </Suspense>
      </motion.div>

      <AnimatePresence>
        {phase === 'hello' && (
          <motion.div
            key="hello"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="absolute top-[10%] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <PixelBubble color="#00ff88">
              <TypewriterText text="hello" color="#00ff88" speed={120} onDone={handleHelloDone} />
            </PixelBubble>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'future' && (
          <motion.div
            key="future"
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="absolute top-[10%] left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <PixelBubble color="#ffd700">
              <TypewriterText text="ready for future?" color="#ffd700" speed={60} />
            </PixelBubble>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
