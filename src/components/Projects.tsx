"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTilt } from "@/hooks/useTilt";

const projects = [
  {
    title: "ClawSwarm",
    tagline: "AI Agent Swarm Architecture",
    description:
      "An autonomous AI swarm where specialized agents collaborate to plan, code, review, and deploy software with human-in-the-loop quality gates and real-time streaming.",
    longDescription:
      "ClawSwarm is a multi-agent system with three specialized chiefs: CodeClaw (coding), ResearchClaw (research), and OpsClaw (operations). Each chief manages its own pipeline of tasks, with an auto-scoring quality gate system. Scores of 8+ are auto-approved, 5-7 go to human review, and below 5 are auto-rejected. The system includes a real-time WebSocket streaming dashboard, ticket-based authentication, and replay storage for debugging agent runs.",
    tags: ["TypeScript", "Convex", "AI Agents", "WebSockets", "Next.js"],
    color: "#b347ff",
    icon: "🧠",
    stats: ["3 specialized AI chiefs", "Auto-scoring quality gates", "Real-time stream dashboard", "38 unit tests passing"],
  },
  {
    title: "AgentAwake",
    tagline: "AI-Powered SaaS Platform",
    description:
      "A SaaS product helping users leverage AI agents for productivity. Features professional plans, prompt libraries, and template bundles.",
    longDescription:
      "AgentAwake is built on Next.js with Stripe for payments and Resend for transactional email. It offers DFY Professional ($9) and DFY Team ($19) plans along with a free prompt library that serves as a lead magnet. The platform includes template bundles, email automation flows, and a complete checkout experience deployed on Vercel.",
    tags: ["Next.js", "Stripe", "Resend", "Vercel", "SaaS"],
    color: "#ff6b2b",
    icon: "⚡",
    stats: ["Professional plans from $9/mo", "Free prompt library", "Automated email flows"],
  },
  {
    title: "Resource Management Application",
    tagline: "Monday.com Platform App for Airbnb",
    description:
      "A resource management application built for Airbnb's operations team on monday.com with full-cycle development.",
    longDescription:
      "Developed and deployed on monday.com, this application was tailored for Airbnb's team operations. It focused on modularity, scalability, and deep integration with monday.com's GraphQL and REST APIs. Adopted by over 200 team members, it enhanced project coordination and resource allocation across the organization.",
    tags: ["React", "Monday.com SDK", "GraphQL", "REST API", "UI/UX"],
    color: "#ffaa33",
    icon: "🏠",
    stats: ["200+ active users", "Full-cycle development", "GraphQL + REST integration", "Cross-team adoption"],
  },
  {
    title: "Dependent Dropdown",
    tagline: "Monday.com Marketplace App",
    description:
      "The company's first-ever marketplace application, a dependent dropdown widget essential for project management workflows.",
    longDescription:
      "This was a pioneering initiative that put AXANEXA on the Monday.com Marketplace. The dependent dropdown widget allows cascading selections based on parent values, becoming an essential tool for project management. It required innovating workflow logic, user interface design, and handling complex state management for dynamic option trees.",
    tags: ["JavaScript", "Monday.com API", "GraphQL", "Marketplace"],
    color: "#00fff5",
    icon: "🔗",
    stats: ["First marketplace app", "Pioneered workflow logic", "Complex state management"],
  },
];

function ProjectCard({
  project,
  index,
  expanded,
  onToggle,
}: {
  project: (typeof projects)[0];
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="tilt-card"
      >
        <div
          onClick={onToggle}
          data-hover="true"
          className="group relative p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors duration-300 cursor-pointer overflow-hidden"
        >
          {/* Top accent */}
          <div
            className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400"
            style={{
              background: `linear-gradient(90deg, transparent, ${project.color}25, transparent)`,
            }}
          />

          <div className="relative z-10">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl mt-0.5">{project.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white/85 group-hover:text-white transition-colors duration-200">
                    {project.title}
                  </h3>
                  <motion.span
                    animate={{ rotate: expanded ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-white/20 text-lg"
                  >
                    +
                  </motion.span>
                </div>
                <p className="text-xs font-mono tracking-wider uppercase mt-0.5" style={{ color: project.color }}>
                  {project.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-white/40 leading-relaxed mb-4">{project.description}</p>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 pb-2 border-t border-white/5">
                    <p className="text-sm text-white/50 leading-relaxed mb-4">{project.longDescription}</p>
                    <div className="space-y-1.5">
                      {project.stats.map((stat) => (
                        <p key={stat} className="text-xs text-white/35 flex items-center gap-2">
                          <span style={{ color: project.color }}>✦</span> {stat}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/5 text-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ff6b2b]/4 rounded-full blur-[150px]" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#00fff5] font-mono text-sm tracking-widest uppercase mb-2">03</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#f5ff00] to-[#00ff88] bg-clip-text text-transparent">Built</span>
          </h2>
          <p className="text-white/30 text-lg mb-16 max-w-xl">
            From AI swarms to marketplace apps — click to explore the details.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              expanded={expandedIndex === i}
              onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
