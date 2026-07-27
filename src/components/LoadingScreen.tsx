"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Logo from "./Logo";
import { loaderHold, introSkipped, INTRO_SEEN_KEY } from "@/lib/intro";

/** Mark size, and the ring drawn around it. Both in CSS pixels. */
const MARK = 104;
const RING = 136;

/**
 * The intro replays on a real refresh, but not when returning to the home page
 * from another route in the same tab.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;

  // Petals bloom over ~0.8s; hold the mark a beat, then hand off to the page.
  // The hand-off point is shared with the hero/navbar entrance via lib/intro.
  const duration = reduce ? 500 : 1900;
  const hold = loaderHold(reduce);

  useEffect(() => {
    // Repeat visit: keep the mark up just long enough to cover hydration.
    //
    // Removing the loader outright looked faster on paper and was worse in
    // practice: the hero markup ships with opacity 0 and only animates in once
    // React has hydrated, so dropping the cover left a blank page for as long
    // as hydration took. This effect runs when hydration finishes, which makes
    // it the right moment to measure from.
    if (introSkipped()) {
      const t = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(t);
    }
    // Keep the in-memory flag in sync for client-side navigation. The layout
    // script only runs on a full document load, so storage alone would not make
    // introSkipped() true when returning from a blog post in the same tab.
    document.documentElement.dataset.intro = "skip";
    try { sessionStorage.setItem(INTRO_SEEN_KEY, "1"); } catch { /* private mode */ }

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
            {/*
              Fixed square with everything centred inside it. The ring used to
              size itself from `absolute -inset-4` alone, which only works if the
              engine resolves the insets; an <svg> is a replaced element with a
              300x150 intrinsic size, so an engine that falls back to that draws
              the ring too large and off to one side. Explicit width/height here
              means every browser gets the same circle.
            */}
            <div
              className="relative flex items-center justify-center"
              style={{ width: RING, height: RING }}
            >
              {/* Colour bleeding out from behind the mark as it opens */}
              <motion.div
                initial={reduce ? { opacity: 0.3, scale: 1.6 } : { opacity: 0, scale: 0.5 }}
                animate={reduce ? { opacity: 0.3, scale: 1.6 } : { opacity: [0, 0.55, 0.3], scale: 1.6 }}
                transition={reduce ? { duration: 0 } : { duration: 1.6, ease: "easeOut", times: [0, 0.5, 1] }}
                className="absolute rounded-full blur-[38px] pointer-events-none"
                style={{
                  width: MARK,
                  height: MARK,
                  background:
                    "conic-gradient(from -90deg, #ff6e60, #ff993b, #ffd05a, #6ddf88, #50d6e6, #5791ff, #827aef, #c175ef, #ff6e60)",
                }}
              />

              {/* Ring that draws itself around the finished mark */}
              <svg
                className="absolute inset-0 pointer-events-none"
                width={RING}
                height={RING}
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <motion.circle
                  cx="50" cy="50" r="47"
                  fill="none"
                  stroke="url(#loaderRing)"
                  strokeWidth="0.7"
                  strokeLinecap="round"
                  initial={reduce ? { pathLength: 1, opacity: 0.75 } : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.75 }}
                  transition={reduce ? { duration: 0 } : { duration: 1.5, delay: 0.35, ease: "easeInOut" }}
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
                initial={{ rotate: reduce ? 0 : -18 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <Logo size={MARK} animated />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduce ? 0 : 0.95, duration: reduce ? 0 : 0.5 }}
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
