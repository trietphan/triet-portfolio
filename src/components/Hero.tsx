"use client";

import { motion } from "framer-motion";

const roles = [
  "AI Agent Architect",
  "Full-Stack Developer",
  "Open Source Builder",
  "Educator & Mentor",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00fff5]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff00e5]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#f5ff00]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 text-center max-w-4xl">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[#00fff5] font-mono text-sm md:text-base mb-4 tracking-widest uppercase"
        >
          {">"} Hello, World — I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-[#00fff5] via-[#b347ff] to-[#ff00e5] bg-clip-text text-transparent">
            Triet Phan
          </span>
        </motion.h1>

        {/* Hook line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          I build <span className="text-[#00fff5] font-semibold">AI agents that think</span>,{" "}
          <span className="text-[#ff00e5] font-semibold">apps that scale</span>, and{" "}
          <span className="text-[#f5ff00] font-semibold">communities that grow</span>.
        </motion.p>

        {/* Animated role tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {roles.map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1 + i * 0.15 }}
              whileHover={{ scale: 1.1, rotate: Math.random() > 0.5 ? 3 : -3 }}
              className="px-4 py-2 rounded-full text-sm font-medium border border-white/10 bg-white/5 hover:border-[#00fff5]/50 hover:bg-[#00fff5]/10 transition-all cursor-default"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#00fff5] to-[#b347ff] text-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,255,245,0.4)] transition-all duration-300"
          >
            See What I&apos;ve Built →
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-full border border-[#ff00e5]/50 text-[#ff00e5] font-bold text-sm uppercase tracking-wider hover:bg-[#ff00e5]/10 hover:shadow-[0_0_30px_rgba(255,0,229,0.2)] transition-all duration-300"
          >
            Let&apos;s Connect
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-[#00fff5] rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
