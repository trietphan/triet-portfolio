"use client";

import { motion } from "framer-motion";
import RevealHeading from "./RevealHeading";

const items = [
  {
    title: "Founder & Sole Product Engineer",
    company: "aifutures.dev · Independent Product Lab",
    period: "2026 to now",
    color: "#ff6b2b",
    highlights: [
      "Built and operate tpochart.tech under aifutures.dev: a bilingual production SaaS for ES, NQ, GC and CL with TypeScript, Node.js, Next.js, React and PostgreSQL through Supabase",
      "Engineered the Market Profile pipeline behind TPO and volume profiles, value areas, POC, Initial Balance, directional bias and session scenarios",
      "Integrated ProjectX and TopstepX for customer-authorized live market data, with reconnect, polling fallback, token refresh, rate-limit handling and contract-roll safeguards",
      "Shipped event-driven alerts, daily briefs, trade planning, paper brackets and public scoreboards for published brief levels and practice calls",
      "Own the full production lifecycle: architecture, APIs, data, frontend, automated tests, billing, deployment, observability and incident runbooks",
    ],
  },
  {
    title: "Computer Information Systems Tutor",
    company: "Wilbur Wright College · City Colleges of Chicago",
    period: "Oct 2025 to now",
    color: "#00fff5",
    highlights: [
      "Tutor students one on one and in groups across programming, databases, algorithms and web development",
      "Run workshops on study skills, learning strategies and applied problem solving in live classrooms",
      "Build learning plans around what each student is already good at and what their course actually asks for",
    ],
  },
  {
    title: "JavaScript Developer I",
    company: "AXANEXA",
    period: "Feb 2023 to Nov 2023",
    color: "#ff6b2b",
    highlights: [
      "Built a resource management app on monday.com for Airbnb that 200+ people ended up using day to day",
      "Shipped the company's first Marketplace listing, a Dependent Dropdown app that clients still run",
      "Wrote a role assignment system that handles hundreds of concurrent tasks and queues around API rate limits",
      "Set the reactive UI patterns the team used across desktop and mobile",
    ],
  },
  {
    title: "Teaching Assistant, Intro to Computer Science",
    company: "Illinois Institute of Technology",
    period: "Aug 2016 to Dec 2017",
    color: "#b347ff",
    highlights: [
      "Ran lab sessions alongside the professor for 60+ students and graded with real feedback, not just marks",
      "Held weekly office hours for one on one help and small group discussion",
    ],
  },
  {
    title: "Digital Communications, Institutional Advancement",
    company: "Illinois Institute of Technology",
    period: "Nov 2015 to Dec 2017",
    color: "#ffaa33",
    highlights: [
      "Looked after the IIT Alumni and Mies Van der Rohe Society sites, and moved the media database over in a way that cut load time by 40%",
      "Produced the Giving Day 2016 video and published content that reached more than 10,000 alumni and donors",
    ],
  },
  {
    title: "Mathematics Tutor",
    company: "Wilbur Wright College · City Colleges of Chicago",
    period: "Jun 2014 to May 2015",
    color: "#00ff88",
    highlights: [
      "Tutored 30+ students a semester in everything from algebra through calculus",
      "Kept satisfaction above 95% and pointed students toward STEM paths and scholarships they had not considered",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#b347ff]/4 rounded-full blur-[150px]" />
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-[#ffaa33] font-mono text-sm tracking-widest uppercase mb-2">02</p>
          <RevealHeading text="Where I've" accent="Been"
            accentClass="bg-gradient-to-r from-[#ffaa33] to-[#ff6b2b] bg-clip-text text-transparent"
            className="text-4xl md:text-5xl font-black mb-16" />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00fff5]/25 via-[#ff6b2b]/20 to-[#00ff88]/15" />
          <div className="space-y-10">
            {items.map((exp, i) => (
              <motion.div key={exp.title} custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-50px" }} variants={cardVariants}
                className="relative pl-12 md:pl-20">
                <div className="absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full border-2"
                  style={{ borderColor: exp.color, boxShadow: `0 0 10px ${exp.color}30`, backgroundColor: `${exp.color}18` }} />
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors duration-300 group">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white/85 group-hover:text-white transition-colors duration-200">{exp.title}</h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
                    <p className="text-xs text-white/30 mt-1">{exp.period}</p>
                  </div>
                  <div className="space-y-2">
                    {exp.highlights.map((h) => (
                      <p key={h} className="text-sm text-white/45 leading-relaxed pl-4 relative">
                        <span className="absolute left-0 top-0" style={{ color: `${exp.color}60` }}>›</span>{h}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
