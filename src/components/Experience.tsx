"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Computer Information Systems Tutor",
    company: "Wright College — City Colleges of Chicago",
    period: "Oct 2025 — Present",
    color: "#00fff5",
    highlights: [
      "Individual and group tutoring across CIS subjects",
      "Embedded tutor in classrooms — leading workshops on study skills",
      "Develop personalized learning plans for each student",
    ],
  },
  {
    title: "JavaScript Developer I",
    company: "AXANEXA",
    period: "Feb 2023 — Nov 2023",
    color: "#ff00e5",
    highlights: [
      "Built a resource management app for Airbnb on monday.com — adopted by 200+ team members",
      "Launched the company's first Dependent Dropdown app on the Monday.com Marketplace",
      "Created role assignment system handling hundreds of tasks with smart API rate-limit management",
      "Pioneered UI/UX design strategy with reactive programming across devices",
    ],
  },
  {
    title: "Teaching Assistant — Intro to CS",
    company: "Illinois Institute of Technology",
    period: "Aug 2016 — Dec 2017",
    color: "#b347ff",
    highlights: [
      "Assisted professor during lab sessions and graded assignments",
      "Held office hours for one-on-one student mentoring",
    ],
  },
  {
    title: "Digital Communications, Institutional Advancement",
    company: "Illinois Institute of Technology",
    period: "Nov 2015 — Dec 2017",
    color: "#f5ff00",
    highlights: [
      "Administered IIT Alumni and Mies Van der Rohe Society websites",
      "Migrated media database to external storage — 40% speed improvement",
      "Produced Giving Day 2016 video and in-house content for IA teams",
      "Proposed cloud backup solutions to cut cost and improve workflow",
    ],
  },
  {
    title: "Mathematics Tutor",
    company: "Wright College — City Colleges of Chicago",
    period: "Jun 2014 — May 2015",
    color: "#00ff88",
    highlights: [
      "Motivated students to excel in STEM through personalized math tutoring",
      "Guided students to use Khan Academy and online resources for self-study",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#b347ff]/5 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#ff00e5] font-mono text-sm tracking-widest uppercase mb-2">
            {"// 02"}
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">
            Where I&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#ff00e5] to-[#ff8800] bg-clip-text text-transparent">
              Been
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00fff5]/50 via-[#ff00e5]/50 to-[#f5ff00]/50" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title + exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: exp.color,
                    boxShadow: `0 0 10px ${exp.color}60`,
                    backgroundColor: `${exp.color}30`,
                  }}
                />

                {/* Card */}
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: exp.color }}>
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-sm text-white/40 font-mono mt-1 md:mt-0">
                      {exp.period}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {exp.highlights.map((h) => (
                      <li key={h} className="text-sm text-white/60 flex items-start gap-2">
                        <span className="text-white/20 mt-0.5">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
