"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Magnetic from "./Magnetic";
import RevealHeading from "./RevealHeading";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/trietphan",
    color: "#ffaa33",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/trietphan",
    color: "#00fff5",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/trietp",
    color: "#b347ff",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const EMAIL = "trietphan85@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ff6b2b]/3 rounded-full blur-[200px]" />

      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#00ff88] font-mono text-sm tracking-widest uppercase mb-2">06</p>
          <RevealHeading text="Let's Build" accent="Something"
            accentClass="bg-gradient-to-r from-[#00ff88] via-[#00fff5] to-[#b347ff] bg-clip-text text-transparent"
            className="text-4xl md:text-6xl font-black mb-6" />
          <p className="text-lg text-white/35 mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re looking for a developer, collaborator, or just want to chat about AI agents, I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href={`mailto:${EMAIL}`}
              data-hover="true"
              className="squeeze-btn inline-block px-10 py-4 rounded-full bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] text-black font-bold text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(255,107,43,0.35)] transition-all duration-300"
            >
              Get In Touch
            </a>
          </Magnetic>
          <button
            onClick={copyEmail}
            data-hover="true"
            className="squeeze-btn inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-white/50 text-sm font-medium hover:border-[#00fff5]/40 hover:text-[#00fff5] transition-all duration-300"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="text-[#00ff88]">Copied!</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy email
              </>
            )}
          </button>
          <a
            href="/Triet_Phan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-hover="true"
            className="squeeze-btn inline-flex items-center gap-2 px-6 py-4 rounded-full border border-white/10 text-white/50 text-sm font-medium hover:border-[#b347ff]/40 hover:text-[#b347ff] transition-all duration-300"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Resume
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-5 mb-16"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-hover="true"
              className="w-11 h-11 rounded-full border border-white/8 flex items-center justify-center transition-all duration-300 hover:border-white/20 group"
              title={s.label}
            >
              <span className="group-hover:scale-110 transition-transform duration-200" style={{ color: s.color }}>
                {s.icon}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="pt-16 border-t border-white/5"
        >
          <p className="text-sm text-white/40 font-mono">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
          <p className="text-xs text-white/45 mt-3 font-mono">
            Press <kbd className="border border-white/20 rounded px-1.5 py-0.5 mx-0.5">⌘K</kbd> to search anything
          </p>
          <p className="text-xs text-white/35 mt-3">
            © {new Date().getFullYear()} Triet Phan · aifutures.dev
          </p>
        </motion.div>
      </div>
    </section>
  );
}
