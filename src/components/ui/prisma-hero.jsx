import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import ScrambleText from "./ScrambleText";
import VariableFontCursorProximity from "./VariableFontCursorProximity";

/* ---------------- PrismaHero ---------------- */
export default function PrismaHero({ onStartProject }) {
  const tagline = "We build websites, AI agents, and mobile apps that grow your business.";
  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 500], [0, 80])
  const contentY = useTransform(scrollY, [0, 500], [0, -40])
  const [videoFailed, setVideoFailed] = useState(false)

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
        
        {/* Background video with parallax */}
        <motion.div style={{ y: videoY }} className="absolute inset-0">
          {!videoFailed && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720'%3E%3Crect fill='%230a0a0a' width='1280' height='720'/%3E%3C/svg%3E"
              className="h-full w-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
              onError={() => setVideoFailed(true)}
            />
          )}
          {videoFailed && (
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1817 30%, #2B1A17 60%, #0A0A0A 100%)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 8s ease infinite',
              }}
            />
          )}
        </motion.div>

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Hero content - vertical stack */}
        <motion.div style={{ y: contentY }} className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 md:px-10 pb-[5%]">
          <div className="max-w-4xl mx-auto w-full">
            <VariableFontCursorProximity
              label={tagline}
              fontSize="clamp(1.75rem,5vw,4.5rem)"
              color="#E1E0CC"
              fromWeight={400}
              toWeight={900}
              strength={25}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              style={{ textAlign: "center", width: "100%" }}
            />

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl"
              style={{ color: "rgba(225, 224, 204, 0.8)" }}
            >
              <ScrambleText
                text="A full-service web development & AI automation agency — we ship custom websites, intelligent AI workflows, and mobile apps for businesses that demand more than templates."
                delay={0.8}
              />
            </motion.p>

            <motion.button
              onClick={onStartProject}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex items-center gap-2 rounded-full py-1 pl-5 pr-1 text-sm font-medium transition-all hover:gap-3 sm:text-base mt-8"
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
        </motion.div>
      </div>
    </div>
  );
}


