"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar to 100% over ~1.8s
    const start = performance.now();
    const duration = 1800;
    let raf: number;
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const timer = setTimeout(() => setVisible(false), 2200);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="loading-screen"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative"
            >
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #ff6b2b, #ffaa33, #b347ff, #00fff5, #ff6b2b)",
                  padding: "2px",
                  borderRadius: "50%",
                  WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
                }}
              />
              {/* Pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
                style={{ background: "rgba(255,107,43,0.2)", borderRadius: "50%" }}
              />
              <Image
                src="/logo.png"
                alt="Logo"
                width={88}
                height={88}
                className="rounded-full relative z-10"
                priority
              />
            </motion.div>

            {/* Progress bar */}
            <div className="w-32 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress * 100}%`,
                  background: "linear-gradient(90deg, #ff6b2b, #ffaa33, #b347ff)",
                  transition: "width 0.05s linear",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
