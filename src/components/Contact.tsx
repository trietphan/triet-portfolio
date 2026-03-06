"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff6b2b]/4 rounded-full blur-[200px]" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#ff6b2b] font-mono text-sm tracking-widest uppercase mb-2">
            04
          </p>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Let&apos;s Build{" "}
            <span className="bg-gradient-to-r from-[#ff6b2b] via-[#ffaa33] to-[#ff8800] bg-clip-text text-transparent">
              Something
            </span>
          </h2>
          <p className="text-lg text-white/40 mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re looking for a developer, collaborator, or just want to
            chat about AI agents, I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="mailto:trietphan85@gmail.com"
            className="magnetic-btn px-8 py-4 rounded-full bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] text-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,107,43,0.35)] transition-all duration-300"
          >
            trietphan85@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/trietphan"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn px-8 py-4 rounded-full border border-[#ffaa33]/30 text-[#ffaa33] font-bold text-sm uppercase tracking-wider hover:bg-[#ffaa33]/8 hover:shadow-[0_0_30px_rgba(255,170,51,0.15)] transition-all duration-300"
          >
            LinkedIn
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-16 border-t border-white/5"
        >
          <p className="text-sm text-white/15 font-mono">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
          <p className="text-xs text-white/10 mt-3">
            © {new Date().getFullYear()} Triet Phan
          </p>
        </motion.div>
      </div>
    </section>
  );
}
