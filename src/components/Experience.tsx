"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "Computer Information Systems Tutor",
    company: "Wilbur Wright College — City Colleges of Chicago",
    period: "Oct 2025 — Present",
    color: "#00fff5",
    highlights: [
      "Individual and group tutoring across CIS subjects",
      "Embedded tutor in classrooms, leading workshops on study skills and learning strategies",
      "Develop personalized learning plans tailored to each student's strengths",
    ],
  },
  {
    title: "JavaScript Developer I",
    company: "AXANEXA",
    period: "Feb 2023 — Nov 2023",
    color: "#ff6b2b",
    highlights: [
      "Built a resource management application for Airbnb on monday.com, adopted by 200+ team members",
      "Launched the company's first Dependent Dropdown application on the Monday.com Marketplace",
      "Created role assignment system handling hundreds of tasks with smart API rate-limit management",
      "Pioneered UI/UX design strategy with reactive programming across devices",
    ],
  },
  {
    title: "Teaching Assistant — Intro to Computer Science",
    company: "Illinois Institute of Technology",
    period: "Aug 2016 — Dec 2017",
    color: "#b347ff",
    highlights: [
      "Assisted professor during lab sessions and graded assignments",
      "Held office hours for one-on-one student mentoring and small group discussions",
    ],
  },
  {
    title: "Digital Communications, Institutional Advancement",
    company: "Illinois Institute of Technology",
    period: "Nov 2015 — Dec 2017",
    color: "#ffaa33",
    highlights: [
      "Administered IIT Alumni and Mies Van der Rohe Society websites",
      "Migrated media database to external storage, achieving 40% speed improvement",
      "Produced the Giving Day 2016 video and in-house content for IA teams",
      "Proposed cloud backup solutions to cut cost and improve workflow",
    ],
  },
  {
    title: "Mathematics Tutor",
    company: "Wilbur Wright College — City Colleges of Chicago",
    period: "Jun 2014 — May 2015",
    color: "#00ff88",
    highlights: [
      "Motivated students to excel in STEM through personalized math tutoring",
      "Guided students to use Khan Academy and online resources for independent learning",
    ],
  },
];

// Simple stagger variant — no per-card scroll tracking
const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#b347ff]/4 rounded-full blur-[150px]" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#ffaa33] font-mono text-sm tracking-widest uppercase mb-2">02</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">
            Where I&apos;ve{" "}
            <span className="bg-gradient-to-r from-[#ffaa33] to-[#ff6b2b] bg-clip-text text-transparent">Been</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00fff5]/25 via-[#ff6b2b]/20 to-[#00ff88]/15" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title + exp.company}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
                className="relative pl-12 md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-2.5 md:left-6.5 top-6 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: exp.color,
                    boxShadow: `0 0 10px ${exp.color}30`,
                    backgroundColor: `${exp.color}18`,
                  }}
                />

                {/* Card */}
                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white/85 group-hover:text-white transition-colors duration-200">
                        {exp.title}
                      </h3>
                      <p className="text-sm font-medium mt-0.5" style={{ color: exp.color }}>
                        {exp.company}
                      </p>
                    </div>
                    <p className="text-sm text-white/25 font-mono mt-1 md:mt-0">{exp.period}</p>
                  </div>
                  <div className="space-y-2">
                    {exp.highlights.map((h) => (
                      <p key={h} className="text-sm text-white/45 leading-relaxed pl-4 relative">
                        <span className="absolute left-0 top-0" style={{ color: `${exp.color}40` }}>›</span>
                        {h}
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
