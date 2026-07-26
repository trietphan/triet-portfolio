"use client";

import { useEffect, useState } from "react";
import { scrollToElement } from "@/lib/scroll";

const SECTIONS = [
  { id: "about", label: "About", color: "#00fff5" },
  { id: "experience", label: "Experience", color: "#ffaa33" },
  { id: "projects", label: "Projects", color: "#ff6b2b" },
  { id: "playbook", label: "Playbook", color: "#6ddf88" },
  { id: "blog", label: "Writing", color: "#c175ef" },
  { id: "contact", label: "Contact", color: "#50d6e6" },
];

/** A slim vertical rail marking where you are in the page. Desktop only. */
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
    <nav
      aria-label="Section navigation"
      className={`section-rail hidden lg:flex ${shown ? "is-visible" : ""}`}
    >
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => {
              const el = document.getElementById(s.id);
              if (el) scrollToElement(el);
            }}
            data-hover="true"
            aria-label={`Go to ${s.label}`}
            aria-current={isActive ? "true" : undefined}
            className="rail-dot group"
          >
            <span
              className="rail-mark"
              style={isActive ? { background: s.color, boxShadow: `0 0 10px ${s.color}90` } : undefined}
            />
            <span className="rail-label" style={{ color: s.color }}>
              {s.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
