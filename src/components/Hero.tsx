"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useRef } from "react";
import Magnetic from "./Magnetic";
import ScrambleText from "./ScrambleText";
import { introDelay } from "@/lib/intro";

const roles = ["Founder @ aifutures.dev", "Sole Product Engineer", "Agent Systems Architect", "Market Structure Nerd", "Educator & Mentor"];

export default function Hero() {
  const reduce = !!useReducedMotion();
  // Every entrance step is an offset on the shared intro timeline, so the
  // loader and the hero always hand off to each other cleanly.
  const d = (offset: number) => introDelay(offset, reduce);
  const lightRef = useRef<HTMLDivElement>(null);

  // A soft light that follows the pointer. Written straight to CSS variables so
  // it never triggers a React render on mouse move.
  const onPointer = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = lightRef.current;
    if (!el || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.setProperty("--hx", `${e.clientX - r.left}px`);
    el.style.setProperty("--hy", `${e.clientY - r.top}px`);
    el.classList.add("lit");
  }, [reduce]);

  const onLeave = useCallback(() => lightRef.current?.classList.remove("lit"), []);

  return (
    <section
      onMouseMove={onPointer}
      onMouseLeave={onLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6"
    >
      <div ref={lightRef} className="hero-light" aria-hidden="true" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="geo-shape geo-bob" style={{ top: "15%", left: "8%", animationDuration: "7s" }}>
          <svg width="70" height="70" viewBox="0 0 70 70" className="geo-spin" style={{ animationDuration: "22s" }}>
            <polygon points="35,5 65,60 5,60" fill="none" stroke="#ff6b2b" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="geo-shape geo-bob" style={{ top: "18%", right: "10%", animationDuration: "9s", animationDelay: "2s" }}>
          <svg width="90" height="90" viewBox="0 0 90 90" className="geo-spin-reverse" style={{ animationDuration: "28s" }}>
            <polygon points="45,5 83,25 83,65 45,85 7,65 7,25" fill="none" stroke="#b347ff" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="geo-shape geo-bob" style={{ bottom: "25%", left: "12%", animationDuration: "8s", animationDelay: "1s" }}>
          <svg width="50" height="50" viewBox="0 0 50 50" className="geo-spin" style={{ animationDuration: "20s" }}>
            <rect x="5" y="5" width="40" height="40" fill="none" stroke="#00fff5" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="geo-shape geo-bob" style={{ bottom: "30%", right: "14%", animationDuration: "6s", animationDelay: "3s" }}>
          <svg width="35" height="35" viewBox="0 0 35 35" className="geo-spin-reverse" style={{ animationDuration: "18s" }}>
            <polygon points="17.5,2 33,17.5 17.5,33 2,17.5" fill="none" stroke="#ffaa33" strokeWidth="0.8" />
          </svg>
        </div>
        <div className="geo-shape geo-bob" style={{ top: "55%", left: "48%", animationDuration: "10s", animationDelay: "4s" }}>
          <svg width="40" height="40" viewBox="0 0 40 40" className="geo-spin" style={{ animationDuration: "35s" }}>
            <circle cx="20" cy="20" r="17" fill="none" stroke="#f5ff00" strokeWidth="0.8" />
          </svg>
        </div>
      </div>

      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#ff6b2b]/5 rounded-full blur-[160px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#b347ff]/5 rounded-full blur-[160px]" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#ffaa33]/3 rounded-full blur-[140px]" />

      <motion.div className="relative z-10 text-center max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: d(0), ease: "easeOut" }}
          className="flex justify-center mb-6">
          <a href="#projects" data-hover="true"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ff6b2b]/25 bg-[#ff6b2b]/6 hover:bg-[#ff6b2b]/12 hover:border-[#ff6b2b]/40 transition-colors duration-300 group">
            <span className="status-dot w-1.5 h-1.5 rounded-full bg-[#00ff88]" />
            <span className="text-[11px] font-mono text-[#ffaa33] tracking-[0.2em] uppercase">
              Now building aifutures.dev
            </span>
            <span className="text-[#ffaa33]/50 group-hover:translate-x-0.5 transition-transform duration-200 text-xs">→</span>
          </a>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: d(0.2), ease: "easeOut" }}
          className="text-[#ffaa33] font-mono text-sm md:text-base mb-6 tracking-[0.3em] uppercase">
          Hello, World
        </motion.p>

        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: d(0.2) }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.95] tracking-tight">
          <ScrambleText
            text="Triet Phan"
            delay={d(0.3) * 1000}
            reduce={reduce}
            className="bg-gradient-to-r from-[#ff6b2b] via-[#ffaa33] to-[#ff8800] bg-clip-text text-transparent font-mono"
          />
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: d(1.1), ease: "easeOut" }}
          className="text-xl md:text-2xl text-white/55 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
          I build at{" "}
          <span className="text-[#50d6e6] font-medium">machine speed</span>
          , keep{" "}
          <span className="text-[#ff993b] font-medium">human judgment in the loop</span>
          , and ship on{" "}
          <span className="text-[#c175ef] font-medium">provable evidence</span>.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: d(1.5) }}
          className="flex flex-wrap justify-center gap-3 mb-14">
          {roles.map((role, i) => (
            <motion.span key={role} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: d(1.6 + i * 0.08) }}
              whileHover={{ scale: 1.06, y: -2 }} data-hover="true"
              className="px-5 py-2.5 rounded-full text-sm font-medium border border-white/8 bg-white/[0.03] text-white/60 hover:border-[#ff6b2b]/30 hover:text-[#ffaa33] transition-colors duration-200 cursor-default">
              {role}
            </motion.span>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: d(2.0), ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Magnetic>
            <a href="#projects" data-hover="true"
              className="squeeze-btn inline-block px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] text-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,107,43,0.3)] transition-shadow duration-300">
              See What I&apos;m Building
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" data-hover="true"
              className="squeeze-btn inline-block px-8 py-3.5 rounded-full border border-[#ff6b2b]/30 text-[#ffaa33] font-bold text-sm uppercase tracking-wider hover:bg-[#ff6b2b]/8 transition-all duration-300">
              Let&apos;s Connect
            </a>
          </Magnetic>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d(2.6) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-9 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5">
            <div className="w-1 h-2 bg-[#ff6b2b] rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
