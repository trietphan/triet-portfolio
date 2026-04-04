"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.2, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0a0a1a]/90 border-b border-[#ff6b2b]/8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-3">
        <a href="#" data-hover="true" className="flex items-center gap-2 group">
          <Image src="/logo.png" alt="Triet Phan" width={36} height={36} className="rounded-full group-hover:scale-110 transition-transform duration-300" />
          <span className="text-sm font-bold text-white/50 group-hover:text-[#ffaa33] transition-colors duration-300 hidden sm:block">
            Triet Phan
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a key={link.href} href={link.href} data-hover="true"
              className="text-white/40 hover:text-[#ffaa33] transition-colors duration-300 text-sm font-medium tracking-wide relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} data-hover="true"
          className="md:hidden text-white/40 hover:text-[#ffaa33] transition-colors">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 pb-6 flex flex-col gap-4 bg-[#0a0a1a]/95 backdrop-blur-xl">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="text-white/50 hover:text-[#ffaa33] transition-colors text-sm tracking-wide py-1">
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
