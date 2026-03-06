"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "MoonClawSwarm",
    tagline: "AI Agent Swarm Architecture",
    description:
      "An autonomous AI swarm where specialized agents (CodeClaw, ResearchClaw, OpsClaw) collaborate to plan, code, review, and deploy software — with human-in-the-loop quality gates and real-time streaming.",
    tags: ["TypeScript", "Convex", "AI Agents", "WebSockets", "Next.js"],
    color: "#b347ff",
    icon: "🧠",
    stats: ["3 specialized AI chiefs", "Auto-scoring quality gates", "Real-time stream dashboard"],
  },
  {
    title: "AgentAwake",
    tagline: "AI-Powered SaaS Platform",
    description:
      "A SaaS product helping users leverage AI agents for productivity. Features DFY professional plans, prompt libraries, and template bundles — built on Next.js with Stripe integration.",
    tags: ["Next.js", "Stripe", "Resend", "Vercel", "SaaS"],
    color: "#00fff5",
    icon: "⚡",
    stats: ["DFY plans from $9/mo", "Free prompt library", "Email automation"],
  },
  {
    title: "Airbnb Resource Manager",
    tagline: "Monday.com Platform App",
    description:
      "A resource management application built for Airbnb's operations team on monday.com. Adopted by 200+ team members for project coordination and resource allocation.",
    tags: ["React", "Monday.com SDK", "REST API", "UI/UX"],
    color: "#ff00e5",
    icon: "🏠",
    stats: ["200+ active users", "Full-cycle development", "Marketplace launch"],
  },
  {
    title: "Dependent Dropdown",
    tagline: "Monday.com Marketplace App",
    description:
      "The company's first-ever marketplace application — a dependent dropdown widget that became essential for project management workflows across client organizations.",
    tags: ["JavaScript", "Monday.com API", "Marketplace", "Workflow"],
    color: "#f5ff00",
    icon: "🔗",
    stats: ["First marketplace app", "Pioneered workflow logic", "Cross-org adoption"],
  },
  {
    title: "ClawHub",
    tagline: "AI Skill Registry",
    description:
      "An npm-powered registry for discovering, installing, and publishing AI agent skills. Think npm, but for AI capabilities.",
    tags: ["Node.js", "CLI", "npm", "AI Skills"],
    color: "#00ff88",
    icon: "📦",
    stats: ["6+ skill packages", "Install/publish CLI", "Version management"],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00fff5]/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#f5ff00] font-mono text-sm tracking-widest uppercase mb-2">
            {"// 03"}
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#f5ff00] to-[#00ff88] bg-clip-text text-transparent">
              Built
            </span>
          </h2>
          <p className="text-white/50 text-lg mb-16 max-w-xl">
            From AI swarms to marketplace apps — here&apos;s a taste of what keeps me up at night.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at center, ${project.color}08 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon + Title */}
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{project.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white/90 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono tracking-wider uppercase" style={{ color: project.color }}>
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-white/50 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="space-y-1 mb-4">
                  {project.stats.map((stat) => (
                    <p key={stat} className="text-xs text-white/40 flex items-center gap-2">
                      <span style={{ color: project.color }}>✦</span> {stat}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/5 text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
