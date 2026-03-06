"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const projects = [
  {
    title: "MoonClawSwarm",
    tagline: "AI Agent Swarm Architecture",
    description:
      "An autonomous AI swarm where specialized agents collaborate to plan, code, review, and deploy software with human-in-the-loop quality gates and real-time streaming.",
    tags: ["TypeScript", "Convex", "AI Agents", "WebSockets", "Next.js"],
    color: "#b347ff",
    icon: "🧠",
    stats: ["3 specialized AI chiefs", "Auto-scoring quality gates", "Real-time stream dashboard"],
  },
  {
    title: "AgentAwake",
    tagline: "AI-Powered SaaS Platform",
    description:
      "A SaaS product helping users leverage AI agents for productivity. Features professional plans, prompt libraries, and template bundles built on Next.js with Stripe integration.",
    tags: ["Next.js", "Stripe", "Resend", "Vercel", "SaaS"],
    color: "#ff6b2b",
    icon: "⚡",
    stats: ["Professional plans from $9/mo", "Free prompt library", "Email automation"],
  },
  {
    title: "Resource Management Application",
    tagline: "Monday.com Platform App for Airbnb",
    description:
      "A resource management application built for Airbnb's operations team on monday.com. Full-cycle development with a focus on modularity, scalability, and API integration.",
    tags: ["React", "Monday.com SDK", "GraphQL", "REST API", "UI/UX"],
    color: "#ffaa33",
    icon: "🏠",
    stats: ["200+ active users", "Full-cycle development", "Cross-team adoption"],
  },
  {
    title: "Dependent Dropdown",
    tagline: "Monday.com Marketplace App",
    description:
      "The company's first-ever marketplace application. A dependent dropdown widget that became essential for project management workflows across client organizations.",
    tags: ["JavaScript", "Monday.com API", "GraphQL", "Marketplace"],
    color: "#ff8800",
    icon: "🔗",
    stats: ["First marketplace app", "Pioneered workflow logic", "Cross-org adoption"],
  },
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff6b2b]/5 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#ff8800] font-mono text-sm tracking-widest uppercase mb-2">
            03
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] bg-clip-text text-transparent">
              Built
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-16 max-w-xl">
            From AI swarms to marketplace apps, here&apos;s what keeps me up at night.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer overflow-hidden"
              style={{
                transform: hoveredIndex === i ? "translateY(-6px)" : "translateY(0)",
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s",
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at center, ${project.color}06 0%, transparent 70%)`,
                }}
              />

              {/* Top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(90deg, transparent, ${project.color}40, transparent)`,
                }}
              />

              <div className="relative z-10">
                {/* Icon + Title */}
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-3xl mt-0.5">{project.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white/85 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono tracking-wider uppercase mt-0.5" style={{ color: project.color }}>
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-white/45 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="space-y-1.5 mb-5">
                  {project.stats.map((stat) => (
                    <p key={stat} className="text-xs text-white/35 flex items-center gap-2">
                      <span style={{ color: project.color }}>✦</span> {stat}
                    </p>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/5 text-white/35"
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
