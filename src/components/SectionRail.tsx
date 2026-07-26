"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About", color: "#00fff5" },
  { id: "experience", label: "Experience", color: "#ffaa33" },
  { id: "projects", label: "Projects", color: "#ff6b2b" },
  { id: "playbook", label: "Playbook", color: "#6ddf88" },
  { id: "blog", label: "Writing", color: "#c175ef" },
  { id: "contact", label: "Contact", color: "#50d6e6" },
];

/**
 * A slim vertical rail marking where you are in the page. Desktop only.
 *
 * It unmounts entirely while hidden rather than fading to opacity 0: a
 * transparent-but-present rail still takes tab stops, still exposes a landmark
 * to screen readers, and its invisible labels still swallow clicks aimed at the
 * content underneath.
 *
 * The targets are real anchors, so activating one also moves the sequential
 * focus starting point to that section — a button that only scrolls would drop
 * a keyboard user back at the top of the document on their next Tab.
 */
export default function SectionRail() {
  const [active, setActive] = useState("");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    els.forEach((el) => obs.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {shown && (
        <motion.nav
          key="rail"
          aria-label="Section navigation"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="section-rail hidden lg:flex"
        >
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                data-hover="true"
                aria-current={isActive ? "true" : undefined}
                className="rail-dot group"
              >
                <span className="rail-label" style={{ color: s.color }} aria-hidden="true">
                  {s.label}
                </span>
                <span
                  className="rail-mark"
                  style={isActive ? { background: s.color, boxShadow: `0 0 10px ${s.color}90` } : undefined}
                />
                <span className="sr-only">{s.label}</span>
              </a>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
