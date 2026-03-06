"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const roles = [
  "AI Agent Architect",
  "Full-Stack Developer",
  "Open Source Builder",
  "Educator & Mentor",
];

function useScrambleText(text: string, delay: number = 0) {
  const [display, setDisplay] = useState("");
  const chars = "!@#$%^&*()_+{}|:<>?~01234567890";

  useEffect(() => {
    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = text.length * 3;

      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const revealedCount = Math.floor(progress * text.length);

        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (i < revealedCount) {
            result += text[i];
          } else if (i < revealedCount + 3) {
            result += chars[Math.floor(Math.random() * chars.length)];
          } else {
            result += "\u00A0";
          }
        }
        setDisplay(result);

        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 30);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay]);

  return display;
}

export default function Hero() {
  const scrambledName = useScrambleText("Triet Phan", 2400);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* 3D Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Rotating wireframe triangle */}
        <div className="geo-shape" style={{ top: "15%", left: "8%", animation: "bobFloat 6s ease-in-out infinite" }}>
          <svg width="80" height="80" viewBox="0 0 80 80" style={{ animation: "spin3d 20s linear infinite" }}>
            <polygon points="40,5 75,70 5,70" fill="none" stroke="#ff6b2b" strokeWidth="1" />
          </svg>
        </div>

        {/* Rotating wireframe hexagon */}
        <div className="geo-shape" style={{ top: "20%", right: "10%", animation: "bobFloat 8s ease-in-out infinite", animationDelay: "2s" }}>
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ animation: "spin3d-reverse 25s linear infinite" }}>
            <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill="none" stroke="#b347ff" strokeWidth="1" />
          </svg>
        </div>

        {/* Rotating wireframe square */}
        <div className="geo-shape" style={{ bottom: "25%", left: "12%", animation: "bobFloat 7s ease-in-out infinite", animationDelay: "1s" }}>
          <svg width="60" height="60" viewBox="0 0 60 60" style={{ animation: "spin3d 18s linear infinite" }}>
            <rect x="5" y="5" width="50" height="50" fill="none" stroke="#00fff5" strokeWidth="1" />
          </svg>
        </div>

        {/* Small diamond */}
        <div className="geo-shape" style={{ bottom: "30%", right: "15%", animation: "bobFloat 5s ease-in-out infinite", animationDelay: "3s" }}>
          <svg width="40" height="40" viewBox="0 0 40 40" style={{ animation: "spin3d-reverse 15s linear infinite" }}>
            <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="#ffaa33" strokeWidth="1" />
          </svg>
        </div>

        {/* Circle */}
        <div className="geo-shape" style={{ top: "60%", left: "50%", animation: "bobFloat 9s ease-in-out infinite", animationDelay: "4s" }}>
          <svg width="50" height="50" viewBox="0 0 50 50" style={{ animation: "spin3d 30s linear infinite" }}>
            <circle cx="25" cy="25" r="22" fill="none" stroke="#f5ff00" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6b2b]/6 rounded-full blur-[160px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#b347ff]/6 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#ffaa33]/4 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "2s" }} />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-4xl">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.3 }}
          className="text-[#ffaa33] font-mono text-sm md:text-base mb-6 tracking-[0.3em] uppercase"
        >
          Hello, World
        </motion.p>

        {/* Name with scramble */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 2.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.95] tracking-tight"
        >
          <span className="bg-gradient-to-r from-[#ff6b2b] via-[#ffaa33] to-[#ff8800] bg-clip-text text-transparent font-mono">
            {scrambledName || "\u00A0"}
          </span>
        </motion.h1>

        {/* Tagline — colorful, no pink */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="text-xl md:text-2xl text-white/55 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
        >
          I craft{" "}
          <span className="text-[#00fff5] font-medium">tools that empower</span>,{" "}
          build{" "}
          <span className="text-[#ff6b2b] font-medium">systems that scale</span>, and{" "}
          inspire the{" "}
          <span className="text-[#f5ff00] font-medium">next generation to dream bigger</span>.
        </motion.p>

        {/* Role tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3.6 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {roles.map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 3.8 + i * 0.1 }}
              whileHover={{ scale: 1.08, y: -3 }}
              data-hover="true"
              className="px-5 py-2.5 rounded-full text-sm font-medium border border-white/8 bg-white/[0.03] text-white/60 hover:border-[#ff6b2b]/30 hover:text-[#ffaa33] transition-all cursor-default"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 4.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            data-hover="true"
            className="squeeze-btn px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] text-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,107,43,0.35)] transition-all duration-300"
          >
            See What I&apos;ve Built
          </a>
          <a
            href="#contact"
            data-hover="true"
            className="squeeze-btn px-8 py-3.5 rounded-full border border-[#ff6b2b]/30 text-[#ffaa33] font-bold text-sm uppercase tracking-wider hover:bg-[#ff6b2b]/8 hover:shadow-[0_0_30px_rgba(255,107,43,0.12)] transition-all duration-300"
          >
            Let&apos;s Connect
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-9 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-[#ff6b2b] rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
