"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Logo from "./Logo";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  // Petals bloom over ~0.8s; hold the mark a beat, then hand off to the page.
  const duration = reduceMotion ? 600 : 1900;
  const hold = reduceMotion ? 700 : 2300;

  useEffect(() => {
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const timer = setTimeout(() => setVisible(false), hold);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [duration, hold]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          className="loading-screen"
        >
          <div className="flex flex-col items-center gap-7">
            <div className="relative">
              {/* Colour bleeding out from behind the mark as it opens */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.55, 0.3], scale: 1.6 }}
                transition={{ duration: 1.6, ease: "easeOut", times: [0, 0.5, 1] }}
                className="absolute inset-0 rounded-full blur-[38px] pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from -90deg, #ff6e60, #ff993b, #ffd05a, #6ddf88, #50d6e6, #5791ff, #827aef, #c175ef, #ff6e60)",
                }}
              />

              {/* Ring that draws itself around the finished mark */}
              <svg
                className="absolute -inset-4 pointer-events-none"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <motion.circle
                  cx="50" cy="50" r="47"
                  fill="none"
                  stroke="url(#loaderRing)"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.75 }}
                  transition={{ duration: 1.5, delay: 0.35, ease: "easeInOut" }}
                  transform="rotate(-90 50 50)"
                />
                <defs>
                  <linearGradient id="loaderRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#ff6e60" />
                    <stop offset="0.5" stopColor="#50d6e6" />
                    <stop offset="1" stopColor="#c175ef" />
                  </linearGradient>
                </defs>
              </svg>

              <motion.div
                initial={{ rotate: reduceMotion ? 0 : -18 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <Logo size={104} animated />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.95, duration: 0.5 }}
              className="text-[11px] font-mono tracking-[0.42em] uppercase text-white/30 pl-[0.42em]"
            >
              aifutures
            </motion.p>

            <div className="w-32 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress * 100}%`,
                  background: "linear-gradient(90deg, #ff6e60, #ffd05a, #50d6e6, #c175ef)",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
