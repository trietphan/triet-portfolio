"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff00e5]/5 rounded-full blur-[200px]" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#00ff88] font-mono text-sm tracking-widest uppercase mb-2">
            {"// 04"}
          </p>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Let&apos;s Build{" "}
            <span className="bg-gradient-to-r from-[#00ff88] via-[#00fff5] to-[#b347ff] bg-clip-text text-transparent">
              Something
            </span>
          </h2>
          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
            Whether you&apos;re looking for a developer, collaborator, or just want to
            chat about AI agents — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="mailto:trietphan85@gmail.com"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#00ff88] to-[#00fff5] text-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(0,255,136,0.4)] transition-all duration-300"
          >
            📧 trietphan85@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/trietphan"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full border border-[#b347ff]/50 text-[#b347ff] font-bold text-sm uppercase tracking-wider hover:bg-[#b347ff]/10 hover:shadow-[0_0_30px_rgba(179,71,255,0.2)] transition-all duration-300"
          >
            🔗 LinkedIn
          </a>
        </motion.div>

        {/* Fun footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-16 border-t border-white/5"
        >
          <p className="text-sm text-white/20 font-mono">
            Built with Next.js, Tailwind CSS, & Framer Motion
          </p>
          <p className="text-sm text-white/20 font-mono mt-1">
            Designed & deployed by an{" "}
            <span className="text-[#00fff5]/40">AI agent</span> 🤖
          </p>
          <p className="text-xs text-white/10 mt-4">
            © {new Date().getFullYear()} Triet Phan. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
