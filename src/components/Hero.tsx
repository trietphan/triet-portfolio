"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "AI Agent Architect",
  "Full-Stack Developer",
  "Open Source Builder",
  "Educator & Mentor",
];

// Text scramble effect
function useScrambleText(text: string, delay: number = 0) {
  const [display, setDisplay] = useState("");
  const chars = "!@#$%^&*()_+{}|:<>?~`-=[];',./01234567890";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let frame = 0;
    const totalFrames = text.length * 3;

    timeout = setTimeout(() => {
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
            result += " ";
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
  const scrambledName = useScrambleText("Triet Phan", 800);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background gradient orbs — orange-tinted */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6b2b]/8 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff00e5]/8 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#ffaa33]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 text-center max-w-4xl">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#ffaa33] font-mono text-sm md:text-base mb-6 tracking-[0.3em] uppercase"
        >
          Hello, World
        </motion.p>

        {/* Name with scramble effect */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.95] tracking-tight"
        >
          <span className="bg-gradient-to-r from-[#ff6b2b] via-[#ffaa33] to-[#ff8800] bg-clip-text text-transparent font-mono">
            {scrambledName || "\u00A0"}
          </span>
        </motion.h1>

        {/* Hook line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed font-light"
        >
          I build{" "}
          <span className="text-[#ff6b2b] font-medium">AI agents that think</span>,{" "}
          <span className="text-[#ffaa33] font-medium">apps that scale</span>, and{" "}
          <span className="text-[#ff8800] font-medium">communities that grow</span>.
        </motion.p>

        {/* Animated role tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {roles.map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 2.4 + i * 0.12 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="px-5 py-2.5 rounded-full text-sm font-medium border border-[#ff6b2b]/15 bg-[#ff6b2b]/5 text-white/70 hover:border-[#ff6b2b]/40 hover:text-[#ffaa33] transition-all cursor-default"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="magnetic-btn px-8 py-3.5 rounded-full bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] text-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,107,43,0.35)] transition-all duration-300"
          >
            See What I&apos;ve Built
          </a>
          <a
            href="#contact"
            className="magnetic-btn px-8 py-3.5 rounded-full border border-[#ff6b2b]/40 text-[#ffaa33] font-bold text-sm uppercase tracking-wider hover:bg-[#ff6b2b]/10 hover:shadow-[0_0_30px_rgba(255,107,43,0.15)] transition-all duration-300"
          >
            Let&apos;s Connect
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-9 rounded-full border-2 border-white/15 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-[#ff6b2b] rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
