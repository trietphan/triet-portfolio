"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "MS", label: "Computer Science", sub: "CSU Fullerton" },
  { value: "200+", label: "Users served", sub: "Airbnb team app" },
  { value: "3", label: "Marketplace apps", sub: "Monday.com" },
  { value: "∞", label: "Curiosity level", sub: "Always learning" },
];

const skillsRow1 = [
  { name: "JavaScript", color: "#f5ff00" },
  { name: "TypeScript", color: "#00fff5" },
  { name: "React", color: "#61dafb" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Node.js", color: "#00ff88" },
  { name: "GraphQL", color: "#e535ab" },
  { name: "AI Architecture", color: "#b347ff" },
  { name: "API Design", color: "#ff6b2b" },
  { name: "Monday.com SDK", color: "#ffaa33" },
  { name: "Make.com", color: "#ff8800" },
  { name: "Python", color: "#00ff88" },
  { name: "Tailwind CSS", color: "#38bdf8" },
  { name: "UI/UX Design", color: "#ff6b2b" },
  { name: "Framer Motion", color: "#b347ff" },
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
          <p className="text-[#ff6b2b] font-mono text-sm tracking-widest uppercase mb-2">
            01
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">
            About{" "}
            <span className="bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] bg-clip-text text-transparent">
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
            <p className="text-lg text-white/60 leading-relaxed">
              I&apos;m an AI enthusiast and full-stack developer based in{" "}
              <span className="text-[#ffaa33] font-medium">Chicago</span>. I believe
              technology should empower people to pursue their dreams and I
              build tools that make that happen.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              From shipping{" "}
              <span className="text-[#ff6b2b] font-medium">marketplace apps</span> used by
              hundreds at Airbnb, to architecting{" "}
              <span className="text-[#b347ff] font-medium">AI agent swarms</span> that
              autonomously write, review, and deploy code, I thrive at the
              intersection of creativity and engineering.
            </p>
            <p className="text-lg text-white/60 leading-relaxed">
              When I&apos;m not coding, I&apos;m{" "}
              <span className="text-[#ffaa33] font-medium">tutoring</span> students in
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
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#ff6b2b]/25 transition-all duration-300"
                >
                  <p className="text-2xl font-black text-[#ff6b2b]">{stat.value}</p>
                  <p className="text-sm text-white/50 mt-1">{stat.label}</p>
                  <p className="text-xs text-white/25 mt-0.5">{stat.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Education */}
            <h3 className="text-xl font-bold mb-6 text-white/80">
              Education
            </h3>
            <div className="space-y-5">
              {[
                { degree: "M.S. Computer Science", school: "California State University, Fullerton", year: "2018 – 2022" },
                { degree: "B.S. Computer Science", school: "Illinois Institute of Technology", year: "2015 – 2017" },
                { degree: "A.S. Computer Science", school: "Wilbur Wright College, Chicago", year: "2013 – 2015" },
              ].map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-2.5 h-2.5 mt-2 rounded-full bg-[#ff6b2b] shrink-0 group-hover:shadow-[0_0_10px_rgba(255,107,43,0.5)] transition-all" />
                  <div>
                    <p className="font-semibold text-white/85">{edu.degree}</p>
                    <p className="text-sm text-white/40">{edu.school} · {edu.year}</p>
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
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#ffaa33]/8 text-[#ffaa33]/80 border border-[#ffaa33]/15 hover:border-[#ffaa33]/30 transition-colors cursor-default"
                >
                  {award}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 overflow-hidden"
        >
          <h3 className="text-xl font-bold mb-6 text-white/80 text-center">
            Technologies I Work With
          </h3>
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a1a] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a1a] to-transparent z-10" />

            <div className="marquee-track">
              {[...skillsRow1, ...skillsRow1].map((skill, i) => (
                <span
                  key={`${skill.name}-${i}`}
                  className="mx-3 px-5 py-2.5 rounded-full border text-sm font-medium whitespace-nowrap cursor-default transition-all hover:scale-110"
                  style={{
                    borderColor: `${skill.color}20`,
                    color: `${skill.color}cc`,
                    backgroundColor: `${skill.color}08`,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
