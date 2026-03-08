"use client";

import { motion } from "framer-motion";

const items = [
  { icon: "🧠", label: "Building", value: "ClawSwarm v2 — multi-agent orchestration", color: "#b347ff" },
  { icon: "⚡", label: "Shipping", value: "AgentAwake — AI productivity SaaS", color: "#ff6b2b" },
  { icon: "📚", label: "Teaching", value: "CIS at Wilbur Wright College", color: "#00fff5" },
  { icon: "🔍", label: "Exploring", value: "LLM reasoning, agent memory & RAG systems", color: "#ffaa33" },
  { icon: "🌐", label: "Learning", value: "Web3, smart contracts & on-chain apps", color: "#00ff88" },
  { icon: "🎯", label: "Goal", value: "Ship tools that genuinely change how people work", color: "#f5ff00" },
];

export default function Now() {
  return (
    <section className="relative py-24 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[#ff6b2b]/20" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-xs font-mono text-[#00ff88] tracking-wider uppercase">Now — March 2026</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-3">
            What I&apos;m{" "}
            <span className="bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] bg-clip-text text-transparent">Up To</span>
          </h2>
          <p className="text-white/30 max-w-sm mx-auto text-sm">A living snapshot. Updated regularly.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }} transition={{ duration: 0.35, delay: i * 0.07 }}
              className="flex items-start gap-4 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors duration-300 group"
              style={{ background: "rgba(255,255,255,0.015)" }}>
              <span className="text-xl mt-0.5 group-hover:scale-110 transition-transform duration-200 shrink-0">{item.icon}</span>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: item.color }}>{item.label}</p>
                <p className="text-sm text-white/60 leading-relaxed">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
