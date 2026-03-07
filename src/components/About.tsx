"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const skillsRow = [
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

function AnimatedStat({ value, label, sub, color = "#ff6b2b", countTo, suffix = "" }: {
  value?: string;
  label: string;
  sub: string;
  color?: string;
  countTo?: number;
  suffix?: string;
}) {
  const { ref, display } = useCountUp(countTo ?? 0, 1400, suffix);

  return (
    <div
      ref={ref}
      className="p-5 rounded-xl border border-white/5 hover:border-[#ff6b2b]/20 transition-colors duration-300"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <p className="text-2xl font-black" style={{ color }}>
        {countTo !== undefined ? display : value}
      </p>
      <p className="text-sm text-white/45 mt-1">{label}</p>
      <p className="text-xs text-white/20 mt-0.5">{sub}</p>
    </div>
  );
}

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
          <p className="text-[#ff6b2b] font-mono text-sm tracking-widest uppercase mb-2">01</p>
          <h2 className="text-4xl md:text-5xl font-black mb-16">
            About{" "}
            <span className="bg-gradient-to-r from-[#00fff5] to-[#b347ff] bg-clip-text text-transparent">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Profile */}
            <div className="mb-8 flex items-start gap-6">
              <div
                className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border border-white/5 flex items-center justify-center shrink-0 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(255,107,43,0.15), rgba(179,71,255,0.1), rgba(0,255,245,0.1))" }}
              >
                <span className="text-4xl md:text-5xl">👨‍💻</span>
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-bold text-white/90 mb-1">Triet Phan</h3>
                <p className="text-[#ffaa33] text-sm font-mono tracking-wider">AI Enthusiast · Chicago, IL</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                  <span className="text-xs text-white/35">Open to opportunities</span>
                </div>
              </div>
            </div>

            <p className="text-lg text-white/55 leading-relaxed">
              I believe technology should empower people to pursue their dreams. From shipping{" "}
              <span className="text-[#ff6b2b] font-medium">marketplace apps</span> used by hundreds at Airbnb, to architecting{" "}
              <span className="text-[#b347ff] font-medium">AI agent swarms</span> that autonomously write, review, and deploy code, I thrive at the intersection of creativity and engineering.
            </p>
            <p className="text-lg text-white/55 leading-relaxed">
              When I&apos;m not coding, I&apos;m{" "}
              <span className="text-[#f5ff00] font-medium">tutoring</span> the next generation of developers and helping people discover the power of building with code.
            </p>

            {/* Animated stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0 }}>
                <AnimatedStat value="MS" label="Computer Science" sub="CSU Fullerton" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.08 }}>
                <AnimatedStat countTo={10} suffix="+" label="Projects shipped" sub="Web, AI & marketplace" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.16 }}>
                <AnimatedStat value="AI-First" label="Developer" sub="Agent architecture" />
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.24 }}>
                <AnimatedStat value="∞" label="Curiosity level" sub="Always learning" color="#b347ff" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            <h3 className="text-xl font-bold mb-6 text-white/80">Education</h3>
            <div className="space-y-5">
              {[
                { degree: "M.S. Computer Science", school: "California State University, Fullerton" },
                { degree: "B.S. Computer Science", school: "Illinois Institute of Technology" },
                { degree: "A.S. Computer Science", school: "Wilbur Wright College" },
              ].map((edu, i) => (
                <motion.div
                  key={edu.school}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <div className="w-2 h-2 mt-2 rounded-full bg-[#b347ff] shrink-0 group-hover:shadow-[0_0_8px_rgba(179,71,255,0.5)] transition-all" />
                  <div>
                    <p className="font-semibold text-white/80 text-sm">{edu.degree}</p>
                    <p className="text-xs text-white/35">{edu.school}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-4 mt-10 text-white/80">Honors & Awards</h3>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "IIT Presidential Scholarship", color: "#f5ff00" },
                { label: "Class Salutatorian", color: "#00fff5" },
                { label: "Phi Theta Kappa", color: "#b347ff" },
                { label: "All Illinois Academic Team", color: "#00ff88" },
                { label: "Presidential Scholar Semi-finalist", color: "#ffaa33" },
              ].map((award) => (
                <span
                  key={award.label}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border cursor-default transition-colors duration-200"
                  style={{
                    borderColor: `${award.color}18`,
                    color: `${award.color}aa`,
                    backgroundColor: `${award.color}08`,
                  }}
                >
                  {award.label}
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
          className="mt-24 overflow-hidden"
        >
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0a0a1a] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0a0a1a] to-transparent z-10" />
            <div className="marquee-track">
              {[...skillsRow, ...skillsRow].map((skill, i) => (
                <span
                  key={`${skill.name}-${i}`}
                  className="mx-2 px-5 py-2 rounded-full border text-sm font-medium whitespace-nowrap cursor-default"
                  style={{
                    borderColor: `${skill.color}18`,
                    color: `${skill.color}bb`,
                    backgroundColor: `${skill.color}06`,
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
