"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTilt } from "@/hooks/useTilt";
import { useLanguage } from "@/contexts/LanguageContext";

const projects = [
  {
    title: { en: "ClawSwarm", vi: "ClawSwarm" },
    tagline: { en: "AI Agent Swarm Architecture", vi: "Kiến trúc AI Agent Swarm" },
    description: {
      en: "An autonomous AI swarm where specialized agents collaborate to plan, code, review, and deploy software.",
      vi: "Hệ AI swarm tự vận hành, nơi các agent chuyên biệt cùng lập kế hoạch, code, review và triển khai phần mềm.",
    },
    longDescription: {
      en: "A multi-agent system with specialized chiefs and quality gates for reliable delivery.",
      vi: "Hệ đa agent với các chief chuyên biệt và cổng kiểm định chất lượng để bàn giao đáng tin cậy.",
    },
    tags: ["TypeScript", "Convex", "AI Agents", "WebSockets", "Next.js"],
    color: "#b347ff", icon: "🧠", stats: { en: ["3 specialized AI chiefs", "Auto-scoring quality gates", "Real-time stream dashboard"], vi: ["3 chief AI chuyên biệt", "Cổng chấm điểm tự động", "Dashboard stream thời gian thực"] }, url: null,
  },
  { title: { en: "AgentAwake", vi: "AgentAwake" }, tagline: { en: "AI-Powered SaaS Platform", vi: "Nền tảng SaaS dùng AI" }, description: { en: "A SaaS product helping users leverage AI agents for productivity.", vi: "Sản phẩm SaaS giúp người dùng tận dụng AI agents để tăng năng suất." }, longDescription: null, tags: ["Next.js", "Stripe", "Resend", "Vercel", "SaaS"], color: "#ff6b2b", icon: "⚡", stats: { en: [], vi: [] }, url: "https://agentawake.com" },
  { title: { en: "Market Profile Guide", vi: "Market Profile Guide" }, tagline: { en: "Trading Education Platform", vi: "Nền tảng giáo dục giao dịch" }, description: { en: "Interactive market profile and trading education website.", vi: "Website tương tác về market profile và giáo dục giao dịch." }, longDescription: null, tags: ["Next.js", "React", "Tailwind CSS", "Vercel"], color: "#00ff88", icon: "📈", stats: { en: [], vi: [] }, url: "https://market-profile-website.vercel.app" },
];

function ExternalIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-35 group-hover:opacity-70 transition-opacity duration-200 shrink-0"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>; }

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, onMouseMove, onMouseLeave } = useTilt(4);
  const { locale } = useLanguage();

  const inner = (
    <div className="group relative p-6 rounded-2xl border border-white/5 group-hover:border-white/12 transition-colors duration-300 h-full overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="absolute top-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(90deg, transparent, ${project.color}30, transparent)` }} />
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl mt-0.5">{project.icon}</span>
        <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><h3 className="text-lg font-bold text-white/85 group-hover:text-white transition-colors duration-200">{project.title[locale]}</h3>{project.url && <ExternalIcon />}{!project.url && project.longDescription && <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.18 }} className="text-white/20 text-base leading-none ml-auto">+</motion.span>}</div><p className="text-xs font-mono tracking-wider uppercase mt-0.5" style={{ color: project.color }}>{project.tagline[locale]}</p></div>
      </div>
      <p className="text-sm text-white/40 leading-relaxed mb-3">{project.description[locale]}</p>
      {!project.url && project.longDescription && (
        <AnimatePresence initial={false}>{expanded && (<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: "easeInOut" }} className="overflow-hidden"><div className="pt-3 border-t border-white/5 mb-3"><p className="text-sm text-white/40 leading-relaxed mb-3">{project.longDescription[locale]}</p>{project.stats[locale].map((s) => (<p key={s} className="text-xs text-white/28 flex items-center gap-2 mb-1"><span style={{ color: project.color }}>✦</span>{s}</p>))}</div></motion.div>)}</AnimatePresence>
      )}
      <div className="flex flex-wrap gap-1.5">{project.tags.map((tag) => (<span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-white/5 text-white/28">{tag}</span>))}</div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.4, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}>
      <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className="tilt-card h-full" onClick={!project.url && project.longDescription ? () => setExpanded(!expanded) : undefined} data-hover="true">
        {project.url ? (<a href={project.url} target="_blank" rel="noopener noreferrer" data-hover="true" className="block h-full">{inner}</a>) : (<div className={project.longDescription ? "cursor-pointer" : ""}>{inner}</div>)}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#ff6b2b]/4 rounded-full blur-[150px]" />
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-[#00fff5] font-mono text-sm tracking-widest uppercase mb-2">03</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">{t.projects.title} <span className="bg-gradient-to-r from-[#f5ff00] to-[#00ff88] bg-clip-text text-transparent">{t.projects.titleAccent}</span></h2>
          <p className="text-white/30 text-lg mb-16 max-w-xl">{t.projects.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{projects.map((project, i) => (<ProjectCard key={project.title.en} project={project} index={i} />))}</div>
      </div>
    </section>
  );
}
