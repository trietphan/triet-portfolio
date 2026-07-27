"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTilt } from "@/hooks/useTilt";
import RevealHeading from "./RevealHeading";

// The three instruments shipping under aifutures.dev.
// `pulse` drives the live indicator — an explicit flag rather than a string
// comparison, which silently stops matching the moment a label is reworded.
const studioProjects = [
  {
    name: "AI Futures Trader",
    detail: "Machine-speed markets, human-grade discipline",
    status: "Live markets",
    pulse: true,
    color: "#ffd05a",
    url: "https://trade.aifutures.dev",
  },
  {
    name: "AIFlow",
    detail: "See the system inside your system",
    status: "Cartography",
    pulse: false,
    color: "#50d6e6",
    url: "https://github.com/trietphan",
  },
  {
    name: "Agent Control Center",
    detail: "Mission control for autonomous work",
    status: "Operations",
    pulse: false,
    color: "#c175ef",
    url: "https://github.com/trietphan",
  },
];

// The lab's operating principles, quoted from aifutures.dev.
const principles = [
  "The switch stays human",
  "Evidence over vibes",
  "Local-first",
  "Machine tempo",
];

const projects = [
  {
    title: "AI Futures Trader",
    tagline: "Live Markets — Decision Support",
    description: "Real-time auction analysis for futures: TPO profiles, value-area mapping and point-of-control, with a human confirmation gate on every entry. Server-side brackets and kill switches mean zero naked positions.",
    longDescription: null,
    tags: ["Market Structure", "TPO / Value Area", "Risk Controls", "Real-Time"],
    color: "#ffd05a",
    icon: "📊",
    stats: ["4 markets — ES, NQ, GC, CL", "70% value area · 30m TPO", "0 naked positions. Ever."],
    url: "https://trade.aifutures.dev",
    venture: true,
  },
  {
    title: "AIFlow",
    tagline: "Repository Cartography",
    description: "Maps the architecture living inside a codebase — AST-level detection with file:line evidence for every claim. Runs entirely on your machine: scan, view, share, diff.",
    longDescription: null,
    tags: ["TypeScript", "Python", "Go", "Rust", "AST", "Self-Hosted"],
    color: "#50d6e6",
    icon: "🗺",
    stats: ["4 languages scanned", "38 tests green", "0 bytes uploaded · 1 command to map"],
    url: "https://github.com/trietphan",
    venture: true,
  },
  {
    title: "Agent Control Center",
    tagline: "Mission Control for Agent Fleets",
    description: "A local-first control plane for multi-agent work. Each task runs in an isolated git worktree, gets independently verified, and lands as sealed SHA-256 evidence — with Ed25519-signed federation between nodes.",
    longDescription: null,
    tags: ["Node", "SQLite", "MCP", "Ed25519", "Local-First"],
    color: "#c175ef",
    icon: "🛰",
    stats: ["3 agent runtimes — Codex, Claude, OpenClaw", "7 stages per loop", "100% human final say"],
    url: "https://github.com/trietphan",
    venture: true,
  },
  {
    title: "clawswarm.app",
    tagline: "Multi-Agent AI Platform",
    description: "A hosted multi-agent platform: real-time streaming dashboard, team blueprints, run history, and human-in-the-loop review, built on top of an open-source CLI.",
    longDescription: null,
    tags: ["Next.js", "Convex", "WebSockets", "AI Agents", "SaaS"],
    color: "#b347ff",
    icon: "🌐",
    stats: [],
    url: "https://clawswarm.app",
    venture: false,
  },
  {
    title: "AgentAwake",
    tagline: "AI-Powered SaaS Platform",
    description: "A SaaS product helping users leverage AI agents for productivity — professional plans, prompt libraries, template bundles, and a free 36-chapter playbook on agent memory.",
    longDescription: null,
    tags: ["Next.js", "Stripe", "Resend", "Vercel", "SaaS"],
    color: "#ff6b2b",
    icon: "⚡",
    stats: [],
    url: "https://agentawake.com",
    venture: false,
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
    venture: false,
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
    venture: false,
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
    venture: false,
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
    venture: false,
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

function StudioCard() {
  const { ref, onMouseMove, onMouseLeave } = useTilt(1.5);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className="mb-8">
      <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="tilt-card">
        <div className="aurora-border spotlight rounded-3xl p-8 md:p-10 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ff6b2b]/8 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#b347ff]/8 rounded-full blur-[110px] pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            {/* Left — studio identity.
                min-w-0: grid items default to min-width:auto, and the truncated
                (white-space:nowrap) rows opposite would otherwise force the column
                wider than the card on narrow screens. */}
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ff6b2b]/25 bg-[#ff6b2b]/8 mb-5">
                <span className="status-dot w-1.5 h-1.5 rounded-full bg-[#ff6b2b]" />
                <span className="text-[11px] font-mono text-[#ffaa33] tracking-[0.2em] uppercase">Featured Venture</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black mb-1 tracking-tight">
                <span className="bg-gradient-to-r from-[#ff6b2b] via-[#ffaa33] to-[#b347ff] bg-clip-text text-transparent">
                  aifutures.dev
                </span>
              </h3>
              <p className="text-xs font-mono tracking-[0.25em] uppercase text-white/30 mb-5">Independent Product Lab · Founder</p>

              <p className="text-base font-semibold text-white/70 mb-3 leading-snug">
                The future isn&apos;t predicted. It&apos;s engineered.
              </p>
              <p className="text-white/45 leading-relaxed mb-6 max-w-md text-sm">
                An independent product lab building instruments for the agentic age — systems that
                trade live markets, map living codebases and command fleets of autonomous agents,
                with human judgment wired into every loop.
              </p>

              <div className="flex flex-wrap gap-2">
                {principles.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/5 text-white/35 border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — active projects */}
            <div className="space-y-2.5 min-w-0">
              <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/25 mb-3">Now in the studio</p>
              {studioProjects.map((p, i) => {
                const row = (
                  <motion.div key={p.name} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
                    className="group/row flex items-center gap-3 p-3 rounded-xl border border-white/5 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-200">
                    <span className={p.pulse ? "status-dot w-2 h-2 rounded-full shrink-0" : "w-2 h-2 rounded-full shrink-0"}
                      style={{ background: p.color }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white/75 group-hover/row:text-white transition-colors duration-200 truncate">{p.name}</p>
                      <p className="text-xs text-white/30 truncate">{p.detail}</p>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0"
                      style={{ color: p.color, borderColor: `${p.color}30`, background: `${p.color}0d` }}>
                      {p.status}
                    </span>
                    {p.url && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className="text-white/20 group-hover/row:text-white/50 transition-colors duration-200 shrink-0">
                        <path d="M7 17L17 7M7 7h10v10" />
                      </svg>
                    )}
                  </motion.div>
                );
                return p.url
                  ? <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" data-hover="true" className="block">{row}</a>
                  : <div key={p.name}>{row}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, onMouseMove, onMouseLeave } = useTilt(4);

  const inner = (
    <div className="spotlight group relative p-6 rounded-2xl border border-white/5 group-hover:border-white/12 transition-colors duration-300 h-full overflow-hidden"
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

      {/* Headline numbers stay visible on cards that link out — they never open
          the expand panel, so stats would otherwise be unreachable. */}
      {project.url && project.stats.length > 0 && (
        <div className="mb-3.5 space-y-1">
          {project.stats.map((s) => (
            <p key={s} className="text-xs text-white/32 flex items-start gap-2 leading-relaxed">
              <span className="mt-px shrink-0" style={{ color: project.color }}>✦</span>
              {s}
            </p>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5">
        {project.venture && (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider border border-[#ff6b2b]/25 text-[#ffaa33] bg-[#ff6b2b]/8">
            aifutures.dev
          </span>
        )}
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
        data-hover="true">
        {project.url ? (
          <a href={project.url} target="_blank" rel="noopener noreferrer" data-hover="true" className="block h-full">
            {inner}
          </a>
        ) : project.longDescription ? (
          // A real button so the expand is reachable by keyboard and announced
          // to assistive tech — a click handler on a div is neither.
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="block w-full h-full text-left cursor-pointer rounded-2xl"
          >
            {inner}
          </button>
        ) : (
          <div>{inner}</div>
        )}
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
          <RevealHeading text="Things I'm" accent="Building"
            accentClass="bg-gradient-to-r from-[#f5ff00] to-[#00ff88] bg-clip-text text-transparent"
            className="text-4xl md:text-5xl font-black mb-4" />
          <p className="text-white/30 text-lg mb-16 max-w-xl">
            The three instruments below ship under my product lab, aifutures.dev. Live links open directly — the rest expand on click.
          </p>
        </motion.div>

        <StudioCard />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
