"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

function useScrambleText(text: string, delay: number = 0) {
  const [display, setDisplay] = useState("");
  const chars = "!@#$%^&*_+{}|:<>?01234567890";

  useEffect(() => {
    const timeout = setTimeout(() => {
      let frame = 0;
      const totalFrames = text.length * 3;
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const revealed = Math.floor(progress * text.length);
        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (i < revealed) result += text[i];
          else if (i < revealed + 3) result += chars[Math.floor(Math.random() * chars.length)];
          else result += "\u00A0";
        }
        setDisplay(result);
        if (frame >= totalFrames) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, 35);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return display;
}

export default function Hero() {
  const { t } = useLanguage();
  const scrambledName = useScrambleText("Triet Phan", 2200);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* 3D Floating shapes — pure CSS, GPU-accelerated */}
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

      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#ff6b2b]/5 rounded-full blur-[160px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#b347ff]/5 rounded-full blur-[160px]" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#ffaa33]/3 rounded-full blur-[140px]" />

      <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.1, ease: "easeOut" }}
          className="text-[#ffaa33] font-mono text-sm md:text-base mb-6 tracking-[0.3em] uppercase"
        >
          {t.hero.hello}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 2.1 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.95] tracking-tight"
        >
          <span className="bg-gradient-to-r from-[#ff6b2b] via-[#ffaa33] to-[#ff8800] bg-clip-text text-transparent font-mono">
            {scrambledName || "\u00A0"}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 3, ease: "easeOut" }}
          className="text-xl md:text-2xl text-white/55 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
        >
          {t.hero.summary.a}{" "}
          <span className="text-[#00fff5] font-medium">{t.hero.summary.b}</span>
          {t.hero.summary.c}{" "}
          <span className="text-[#ff6b2b] font-medium">{t.hero.summary.d}</span>
          {t.hero.summary.e}{" "}
          <span className="text-[#f5ff00] font-medium">{t.hero.summary.f}</span>
          {t.hero.summary.g}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 3.4 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {t.hero.roles.map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 3.5 + i * 0.08, ease: "easeOut" }}
              whileHover={{ scale: 1.06, y: -2 }}
              data-hover="true"
              className="px-5 py-2.5 rounded-full text-sm font-medium border border-white/8 bg-white/[0.03] text-white/60 hover:border-[#ff6b2b]/30 hover:text-[#ffaa33] transition-colors duration-200 cursor-default"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 3.9, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            data-hover="true"
            className="squeeze-btn px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] text-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,107,43,0.3)] transition-shadow duration-300"
          >
            {t.hero.ctaProjects}
          </a>
          <a
            href="#contact"
            data-hover="true"
            className="squeeze-btn px-8 py-3.5 rounded-full border border-[#ff6b2b]/30 text-[#ffaa33] font-bold text-sm uppercase tracking-wider hover:bg-[#ff6b2b]/8 hover:shadow-[0_0_30px_rgba(255,107,43,0.1)] transition-all duration-300"
          >
            {t.hero.ctaContact}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-9 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-[#ff6b2b] rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
