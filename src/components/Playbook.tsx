"use client";

import { motion } from "framer-motion";

const chapters = [
  { n: 0,  title: "Why Your AI Agent Has Amnesia", emoji: "🧠", slug: "why-your-agent-has-amnesia" },
  { n: 1,  title: "The Three-Layer Brain", emoji: "🧁", slug: "the-three-layer-brain" },
  { n: 2,  title: "Layer 1: The Knowledge Base", emoji: "📚", slug: "knowledge-base" },
  { n: 3,  title: "Layer 2: Daily Notes", emoji: "📝", slug: "daily-notes" },
  { n: 4,  title: "Layer 3: Tacit Knowledge", emoji: "🎓", slug: "tacit-knowledge" },
  { n: 5,  title: "The Heartbeat & Cron System", emoji: "⏱️", slug: "heartbeat-and-cron" },
  { n: 6,  title: "The Security Model", emoji: "🔒", slug: "security-basics" },
  { n: 7,  title: "Day One: Your 45-Minute Setup", emoji: "🚀", slug: "day-one-checklist" },
  { n: 8,  title: "Copy-Paste Config Templates", emoji: "📋", slug: "copy-paste-configs" },
  { n: 9,  title: "4 Cron Job Recipes", emoji: "🍳", slug: "cron-recipes" },
  { n: 10, title: "Case Study: The Trading Bot", emoji: "📊", slug: "case-study-trading" },
  { n: 11, title: "Case Study: 90/10 Content Pipeline", emoji: "✍️", slug: "case-study-content" },
  { n: 12, title: "Case Study: Idea Validation Engine", emoji: "💡", slug: "case-study-validation" },
  { n: 13, title: "The Bottleneck Elimination Framework", emoji: "⚡", slug: "bottleneck-elimination" },
  { n: 14, title: "Multi-Agent Orchestration", emoji: "🕸️", slug: "multi-agent-orchestration" },
  { n: 15, title: "Prompt Injection Defense", emoji: "🛡️", slug: "prompt-injection-defense" },
  { n: 16, title: "The Progressive Trust Ladder", emoji: "🪜", slug: "progressive-trust" },
  { n: 17, title: "Cost Optimization & Model Selection", emoji: "💸", slug: "cost-optimization" },
  { n: 18, title: "Debugging & Observability", emoji: "🔍", slug: "debugging-observability" },
  { n: 19, title: "Tool & API Integration Patterns", emoji: "🔧", slug: "tool-api-integration" },
  { n: 20, title: "Prompt Engineering for Agents", emoji: "🎯", slug: "prompt-engineering-agents" },
  { n: 21, title: "The Revenue Playbook", emoji: "💰", slug: "revenue-playbook" },
  { n: 22, title: "Your Agent's Second Brain", emoji: "🗂️", slug: "obsidian-second-brain" },
  { n: 23, title: "Memory That Scales", emoji: "🧬", slug: "memory-that-scales" },
  { n: 24, title: "The Agent Workspace", emoji: "🖥️", slug: "agent-workspace" },
  { n: 25, title: "From Solo Agent to Agent Team", emoji: "👥", slug: "agent-teams" },
  { n: 26, title: "The Agent's Daily Routine", emoji: "☀️", slug: "daily-routine" },
  { n: 27, title: "Building in Public with Your Agent", emoji: "📢", slug: "building-in-public" },
  { n: 28, title: "Claude Implementation Guide", emoji: "🤖", slug: "claude-implementation" },
  { n: 29, title: "ChatGPT / OpenAI Guide", emoji: "💬", slug: "chatgpt-implementation" },
  { n: 30, title: "CrewAI Implementation Guide", emoji: "⚙️", slug: "crewai-implementation" },
  { n: 31, title: "LangChain / LangGraph Guide", emoji: "🔗", slug: "langchain-implementation" },
  { n: 32, title: "AutoGPT Implementation Guide", emoji: "🤖", slug: "autogpt-implementation" },
  { n: 33, title: "n8n Implementation Guide", emoji: "🔄", slug: "n8n-implementation" },
  { n: 34, title: "Cursor / Windsurf / Cline Guide", emoji: "✏️", slug: "cursor-implementation" },
  { n: 35, title: "OpenClaw Implementation Guide", emoji: "🐾", slug: "openclaw-implementation" },
];

export default function Playbook() {
  return (
    <section id="playbook" className="relative py-32 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#00ff88]/3 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#b347ff]/3 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
          <p className="text-[#00ff88] font-mono text-sm tracking-widest uppercase mb-2">Free Playbook</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            36 Chapters on{" "}
            <span className="bg-gradient-to-r from-[#00ff88] to-[#00fff5] bg-clip-text text-transparent">
              AI Agent Memory
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mb-8">
            The complete guide to building AI agents with persistent memory. No login. No paywall. All 36 chapters free on AgentAwake.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <a href="https://agentawake.com/chapters" target="_blank" rel="noopener noreferrer" data-hover="true"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00ff88] to-[#00fff5] text-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,255,136,0.25)] transition-shadow duration-300">
              Read All 36 Chapters →
            </a>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="text-xs font-mono text-[#00ff88] tracking-wider">36 chapters · Free · No login</span>
            </div>
          </div>
        </motion.div>

        {/* Chapter grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {chapters.map((ch, i) => (
            <motion.a key={ch.slug}
              href={`https://agentawake.com/guide/${ch.slug}`}
              target="_blank" rel="noopener noreferrer"
              data-hover="true"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.025, 0.5) }}
              className="group flex items-start gap-3 p-4 rounded-xl border border-white/5 hover:border-[#00ff88]/20 hover:bg-[#00ff88]/3 transition-all duration-200">
              <span className="text-lg mt-0.5 shrink-0">{ch.emoji}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-mono text-white/25 mb-0.5 uppercase tracking-wider">
                  Ch {ch.n}
                </p>
                <p className="text-sm text-white/55 group-hover:text-white/80 transition-colors duration-200 leading-snug font-medium">
                  {ch.title}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center">
          <p className="text-white/25 text-sm mb-4">Works with Claude, ChatGPT, CrewAI, LangChain, n8n, Cursor, and more.</p>
          <a href="https://agentawake.com" target="_blank" rel="noopener noreferrer" data-hover="true"
            className="text-[#00ff88] text-sm font-medium hover:underline underline-offset-4">
            More resources at agentawake.com →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
