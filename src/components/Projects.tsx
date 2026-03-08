"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTilt } from "@/hooks/useTilt";

const projects = [
  {
    title: "ClawSwarm",
    tagline: "AI Agent Swarm Architecture",
    description: "An autonomous AI swarm where specialized agents collaborate to plan, code, review, and deploy software with human-in-the-loop quality gates and real-time streaming.",
    longDescription: "ClawSwarm is a multi-agent system with three specialized chiefs: CodeClaw (coding), ResearchClaw (research), and OpsClaw (operations). Each manages its own pipeline with an auto-scoring quality gate system. Scores ≥8 auto-approve, 5–7 escalate to human review, below 5 are reworked. Includes a real-time WebSocket streaming dashboard, ticket-based auth, and replay storage for debugging.",
    tags: ["TypeScript", "Convex", "AI Agents", "WebSockets", "Next.js"],
    color: "#b347ff",
    icon: "🧠",
    stats: ["3 specialized AI chiefs", "Auto-scoring quality gates", "Real-time stream dashboard"],
    url: null,
  },
  {
    title: "AgentAwake",
    tagline: "AI-Powered SaaS Platform",
    description: "A SaaS product helping users leverage AI agents for productivity. Features professional plans, prompt libraries, and template bundles.",
    longDescription: null,
    tags: ["Next.js", "Stripe", "Resend", "Vercel", "SaaS"],
    color: "#ff6b2b",
    icon: "⚡",
    stats: [],
    url: "https://agentawake.com",
  },
  {
    title: "Market Profile Guide",
    tagline: "Trading Education Platform",
    description: "An interactive market profile and trading education website, helping traders understand price action, volume analysis, and market structure.",
    longDescription: null,
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    color: "#00ff88",
    icon: "📈",
    stats: [],
    url: "https://market-profile-website.vercel.app",
  },
  {
    title: "ETH Smart Contracts",
    tagline: "Ethereum Smart Contract Platform",
    description: "A platform for deploying and interacting with Ethereum smart contracts — streamlining the development, testing, and deployment workflow for Web3 projects.",
    longDescription: null,
    tags: ["Solidity", "Ethereum", "Web3.js", "Next.js"],
    color: "#00fff5",
    icon: "⛓️",
    stats: [],
    url: "https://vercel.com/trietphans-projects/ethsmartcontracts",
  },
  {
    title: "Resource Management App",
    tagline: "Monday.com Platform App for Airbnb",
    description: "A resource management application built for Airbnb's operations team on monday.com. Full-cycle development with GraphQL + REST API integration.",
    longDescription: "Built for Airbnb's operations team, this monday.com application focused on modularity, scalability, and deep GraphQL/REST API integration. Adopted by over 200 team members, it enhanced project coordination and resource allocation across the organization.",
    tags: ["React", "Monday.com SDK", "GraphQL", "REST API", "UI/UX"],
    color: "#ffaa33",
    icon: "🏠",
    stats: ["200+ active users", "Full-cycle development", "GraphQL integration"],
    url: null,
  },
  {
    title: "Dependent Dropdown",
    tagline: "Monday.com Marketplace App",
    description: "The company's first marketplace app — a dependent dropdown widget essential for project management workflows across client organizations.",
    longDescription: "A pioneering initiative that put AXANEXA on the Monday.com Marketplace. The widget enables cascading selections based on parent values, requiring innovative workflow logic and complex state management for dynamic option trees.",
    tags: ["JavaScript", "Monday.com API", "GraphQL", "Marketplace"],
    color: "#f5ff00",
    icon: "🔗",
    stats: ["First marketplace app", "Pioneered workflow logic", "Cross-org adoption"],
    url: null,
  },
];

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      className="opacity-35 group-hover:opacity-70 transition-opacity duration-200 shrink-0">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, onMouseMove, onMouseLeave } = useTilt(4);

  const inner = (
    <div className="group relative p-6 rounded-2xl border border-white/5 group-hover:border-white/12 transition-colors duration-300 h-full overflow-hidden"
      style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}30, transparent)` }} />

      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl mt-0.5">{project.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white/85 group-hover:text-white transition-colors duration-200">
              {project.title}
            </h3>
            {project.url && <ExternalIcon />}
            {!project.url && project.longDescription && (
              <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.18 }}
                className="text-white/20 text-base leading-none ml-auto">+</motion.span>
            )}
          </div>
          <p className="text-xs font-mono tracking-wider uppercase mt-0.5" style={{ color: project.color }}>
            {project.tagline}
          </p>
        </div>
      </div>

      <p className="text-sm text-white/40 leading-relaxed mb-3">{project.description}</p>

      {!project.url && project.longDescription && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden">
              <div className="pt-3 border-t border-white/5 mb-3">
                <p className="text-sm text-white/40 leading-relaxed mb-3">{project.longDescription}</p>
                {project.stats.map((s) => (
                  <p key={s} className="text-xs text-white/28 flex items-center gap-2 mb-1">
                    <span style={{ color: project.color }}>✦</span>{s}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/5 text-white/28">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}>
      <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="tilt-card h-full"
        onClick={!project.url && project.longDescription ? () => setExpanded(!expanded) : undefined}
        data-hover="true">
        {project.url
          ? <a href={project.url} target="_blank" rel="noopener noreferrer" data-hover="true" className="block h-full">{inner}</a>
          : <div className={project.longDescription ? "cursor-pointer" : ""}>{inner}</div>}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ff6b2b]/4 rounded-full blur-[150px]" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-[#00fff5] font-mono text-sm tracking-widest uppercase mb-2">03</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#f5ff00] to-[#00ff88] bg-clip-text text-transparent">Built</span>
          </h2>
          <p className="text-white/30 text-lg mb-16 max-w-xl">Live sites open directly. Others expand on click.</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
