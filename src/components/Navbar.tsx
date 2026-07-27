"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { introDelay } from "@/lib/intro";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Playbook", href: "#playbook" },
  { label: "Writing", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const reduce = !!useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is in view so the matching nav link stays lit
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0.3 : 0.8, delay: introDelay(0.3, reduce), ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0a0a1a]/90 border-b border-[#ff6b2b]/8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
        <a href="#" data-hover="true" className="flex items-center gap-2.5 group">
          <Logo size={34} className="logo-spin-hover shrink-0" title="Triet Phan · aifutures" />
          <span className="text-sm font-bold text-white/50 group-hover:text-[#ffaa33] transition-colors duration-300 hidden sm:block">
            Triet Phan
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a key={link.href} href={link.href} data-hover="true"
              className={`nav-link text-white/40 hover:text-[#ffaa33] transition-colors duration-300 text-sm font-medium tracking-wide ${
                active === link.href ? "active" : ""
              }`}>
              {link.label}
              <span className="nav-underline" />
            </a>
          ))}
          <button
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            data-hover="true"
            aria-label="Open command palette"
            title="Search with ⌘K"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/8 text-white/30 hover:text-[#ffaa33] hover:border-[#ff6b2b]/30 transition-colors duration-300"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <kbd className="text-[10px] font-mono tracking-wide">⌘K</kbd>
          </button>

          <a href="/Triet_Phan_Resume.pdf" target="_blank" rel="noopener noreferrer" data-hover="true"
            className="px-4 py-1.5 rounded-full border border-[#ff6b2b]/30 text-[#ffaa33] text-xs font-bold uppercase tracking-wider hover:bg-[#ff6b2b]/10 hover:border-[#ff6b2b]/50 transition-all duration-300">
            Resume
          </a>
        </div>

        <button onClick={() => setOpen(!open)} data-hover="true"
          aria-label="Toggle menu" aria-expanded={open} aria-controls="mobile-menu"
          className="md:hidden text-white/40 hover:text-[#ffaa33] transition-colors">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <motion.div id="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-[#0a0a1a]/95 backdrop-blur-xl">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}
              className={`transition-colors text-sm tracking-wide py-1 ${
                active === link.href ? "text-[#ffaa33]" : "text-white/50 hover:text-[#ffaa33]"
              }`}>
              {link.label}
            </a>
          ))}
          <a href="/Triet_Phan_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}
            className="text-[#ffaa33] text-sm tracking-wide py-1 font-semibold">
            Resume ↗
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
