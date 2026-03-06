"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "MS", label: "Computer Science", sub: "CSU Fullerton" },
  { value: "200+", label: "Users served", sub: "Airbnb team app" },
  { value: "3", label: "Marketplace apps", sub: "Monday.com" },
  { value: "∞", label: "Curiosity level", sub: "Always learning" },
];

const skills = [
  { name: "JavaScript / TypeScript", color: "#f5ff00" },
  { name: "React / Next.js", color: "#00fff5" },
  { name: "Node.js", color: "#00ff88" },
  { name: "AI Agent Architecture", color: "#b347ff" },
  { name: "API Design", color: "#ff00e5" },
  { name: "Monday.com SDK", color: "#ff8800" },
  { name: "Make.com / Automation", color: "#00fff5" },
  { name: "UI/UX Design", color: "#f5ff00" },
  { name: "Python", color: "#00ff88" },
  { name: "Tailwind CSS", color: "#b347ff" },
];

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Section label */}
          <p className="text-[#00fff5] font-mono text-sm tracking-widest uppercase mb-2">
            {"// 01"}
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-12">
            About{" "}
            <span className="bg-gradient-to-r from-[#00fff5] to-[#b347ff] bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg text-white/70 leading-relaxed">
              I&apos;m an AI enthusiast and full-stack developer based in{" "}
              <span className="text-[#00fff5]">Chicago</span>. I believe
              technology should empower people to pursue their dreams — and I
              build tools that make that happen.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              From shipping{" "}
              <span className="text-[#ff00e5]">marketplace apps</span> used by
              hundreds at Airbnb, to architecting{" "}
              <span className="text-[#b347ff]">AI agent swarms</span> that
              autonomously write, review, and deploy code — I thrive at the
              intersection of creativity and engineering.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              When I&apos;m not coding, I&apos;m{" "}
              <span className="text-[#f5ff00]">tutoring</span> students in
              computer science, helping the next generation discover the magic of
              programming.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#00fff5]/30 transition-all"
                >
                  <p className="text-2xl font-black text-[#00fff5]">{stat.value}</p>
                  <p className="text-sm text-white/60">{stat.label}</p>
                  <p className="text-xs text-white/30 mt-1">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Skills cloud */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-6 text-white/80">
              Tech I Work With
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{
                    scale: 1.15,
                    boxShadow: `0 0 20px ${skill.color}40`,
                  }}
                  className="px-4 py-2 rounded-full border text-sm font-medium cursor-default transition-all"
                  style={{
                    borderColor: `${skill.color}30`,
                    color: skill.color,
                    backgroundColor: `${skill.color}08`,
                  }}
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>

            {/* Education */}
            <h3 className="text-xl font-bold mb-4 mt-10 text-white/80">
              Education
            </h3>
            <div className="space-y-4">
              {[
                { degree: "M.S. Computer Science", school: "CSU Fullerton", year: "2018–2022" },
                { degree: "B.S. Computer Science", school: "Illinois Institute of Technology", year: "2015–2017" },
                { degree: "A.S. Computer Science", school: "Wright College, Chicago", year: "2013–2015" },
              ].map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#b347ff] shrink-0" />
                  <div>
                    <p className="font-semibold text-white/90">{edu.degree}</p>
                    <p className="text-sm text-white/50">{edu.school} · {edu.year}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Awards */}
            <h3 className="text-xl font-bold mb-4 mt-10 text-white/80">
              Honors & Awards
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "IIT Presidential Scholarship",
                "Class Salutatorian",
                "Phi Theta Kappa",
                "All Illinois Academic Team",
                "Presidential Scholar Semi-finalist",
              ].map((award) => (
                <span
                  key={award}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#f5ff00]/10 text-[#f5ff00] border border-[#f5ff00]/20"
                >
                  {award}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
