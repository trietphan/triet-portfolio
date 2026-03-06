"use client";

import { motion } from "framer-motion";
import { useRef, useCallback } from "react";

const posts = [
  {
    title: "Why I'm Betting on AI Agent Swarms",
    excerpt:
      "Single AI agents hit a ceiling fast. Swarms of specialized agents, each with a narrow focus and quality gates, can accomplish what no single model can. Here's what I learned building MoonClawSwarm.",
    date: "Mar 2026",
    readTime: "5 min read",
    color: "#b347ff",
    tag: "AI",
  },
  {
    title: "Shipping Your First Monday.com Marketplace App",
    excerpt:
      "From idea to marketplace listing, building workflow tools for 200+ users taught me that the best developer tools solve one problem extraordinarily well.",
    date: "Feb 2026",
    readTime: "4 min read",
    color: "#ffaa33",
    tag: "Dev",
  },
  {
    title: "Teaching Code Changed How I Write It",
    excerpt:
      "Tutoring CIS students forced me to rethink everything I thought I knew. When you have to explain recursion to someone who's never seen a for-loop, your own code gets clearer too.",
    date: "Jan 2026",
    readTime: "3 min read",
    color: "#00fff5",
    tag: "Education",
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -4;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 4;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
  }, []);

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={`tilt-card ${className || ""}`}>
      {children}
    </div>
  );
}

export default function Blog() {
  return (
    <section id="blog" className="relative py-32 px-6">
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#00fff5]/3 rounded-full blur-[140px]" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-[#b347ff] font-mono text-sm tracking-widest uppercase mb-2">04</p>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Thoughts &{" "}
            <span className="bg-gradient-to-r from-[#b347ff] to-[#00fff5] bg-clip-text text-transparent">Writing</span>
          </h2>
          <p className="text-white/35 text-lg mb-16 max-w-xl">
            Lessons from building, teaching, and thinking out loud.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard>
                <div
                  data-hover="true"
                  className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer h-full flex flex-col"
                >
                  {/* Tag + Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider border"
                      style={{
                        borderColor: `${post.color}25`,
                        color: post.color,
                        backgroundColor: `${post.color}08`,
                      }}
                    >
                      {post.tag}
                    </span>
                    <span className="text-xs text-white/20 font-mono">{post.date}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white/80 group-hover:text-white transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm text-white/35 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-white/20">{post.readTime}</span>
                    <span className="text-xs group-hover:text-[#ffaa33] text-white/20 transition-colors">
                      Read more →
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
