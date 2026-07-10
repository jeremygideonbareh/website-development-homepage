import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

/* ---------------- WordsPullUp ---------------- */
function WordsPullUp({ text, className = "", showAsterisk = false, style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();
  const words = text.split(" ");

  const animProps = shouldReduce
    ? { initial: {}, animate: {} }
    : { initial: { y: 20, opacity: 0 }, animate: isInView ? { y: 0, opacity: 1 } : {} };

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            {...animProps}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
}

/* ---------------- WordsPullUpMultiStyle ---------------- */
function WordsPullUpMultiStyle({ segments, className = "", style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduce = useReducedMotion();

  const words = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  const animProps = shouldReduce
    ? { initial: {}, animate: {} }
    : { initial: { y: 20, opacity: 0 }, animate: isInView ? { y: 0, opacity: 1 } : {} };

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          {...animProps}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------------- PrismaHero ---------------- */
export default function PrismaHero({ onStartProject }) {
  const tagline = "We build websites, AI agents, and mobile apps that grow your business.";

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100dvh',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div className="relative h-full w-full">
        
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720'%3E%3Crect fill='%230a0a0a' width='1280' height='720'/%3E%3C/svg%3E"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end sm:justify-end lg:justify-center px-4 sm:px-8 md:px-10 pb-[10%] sm:pb-[10%] lg:pb-[5%]">
          <div className="max-w-5xl">
          <div className="grid grid-cols-12 items-end gap-4">
            
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-medium leading-[1.1] tracking-[-0.05em] sm:tracking-[-0.03em] text-[clamp(1.5rem,4vw,4rem)]"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text={tagline} />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 lg:col-span-4">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-sm md:text-base"
                style={{ lineHeight: 1.2, color: "rgba(225, 224, 204, 0.8)" }}
              >
                A full-service web development & AI automation agency — we ship custom websites, intelligent AI workflows, and mobile apps for businesses that demand more than templates.
              </motion.p>

              <motion.button
                onClick={onStartProject}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-all hover:gap-3 sm:text-base"
                style={{ backgroundColor: "#E1E0CC", color: "#0A0A0A" }}
              >
                Start a project
                <span className="flex h-11 w-11 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                  style={{ backgroundColor: "#0A0A0A" }}
                >
                  <ArrowRight className="h-4 w-4" style={{ color: "#E1E0CC" }} />
                </span>
              </motion.button>

            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { WordsPullUp, WordsPullUpMultiStyle };
