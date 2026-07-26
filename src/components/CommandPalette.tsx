"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { posts } from "@/data/posts";

type Command = {
  id: string;
  label: string;
  hint: string;
  group: "Navigate" | "Projects" | "Writing" | "Connect";
  icon: string;
  action: "scroll" | "external" | "route";
  target: string;
};

const baseCommands: Command[] = [
  { id: "about", label: "About", hint: "Who I am", group: "Navigate", icon: "◆", action: "scroll", target: "#about" },
  { id: "experience", label: "Experience", hint: "Where I've been", group: "Navigate", icon: "◆", action: "scroll", target: "#experience" },
  { id: "projects", label: "Projects", hint: "Things I'm building", group: "Navigate", icon: "◆", action: "scroll", target: "#projects" },
  { id: "playbook", label: "Playbook", hint: "36 free chapters", group: "Navigate", icon: "◆", action: "scroll", target: "#playbook" },
  { id: "blog", label: "Writing", hint: "Thoughts & essays", group: "Navigate", icon: "◆", action: "scroll", target: "#blog" },
  { id: "contact", label: "Contact", hint: "Let's build something", group: "Navigate", icon: "◆", action: "scroll", target: "#contact" },

  { id: "aifutures", label: "aifutures.dev", hint: "My AI product studio", group: "Projects", icon: "🚀", action: "external", target: "https://aifutures.dev" },
  { id: "clawswarm-app", label: "clawswarm.app", hint: "Multi-agent AI platform", group: "Projects", icon: "🌐", action: "external", target: "https://clawswarm.app" },
  { id: "clawswarm-oss", label: "ClawSwarm OSS", hint: "Open-source multi-agent CLI", group: "Projects", icon: "🧠", action: "external", target: "https://github.com/trietphan/clawswarm" },
  { id: "agentawake", label: "AgentAwake", hint: "AI productivity SaaS", group: "Projects", icon: "⚡", action: "external", target: "https://agentawake.com" },
  { id: "playbook-read", label: "Agent Memory Playbook", hint: "Read all 36 chapters free", group: "Projects", icon: "📚", action: "external", target: "https://agentawake.com/chapters" },

  { id: "resume", label: "Download Resume", hint: "PDF · one page", group: "Connect", icon: "📄", action: "external", target: "/Triet_Phan_Resume.pdf" },
  { id: "email", label: "Email me", hint: "trietphan85@gmail.com", group: "Connect", icon: "✉", action: "external", target: "mailto:trietphan85@gmail.com" },
  { id: "github", label: "GitHub", hint: "@trietphan", group: "Connect", icon: "⌥", action: "external", target: "https://github.com/trietphan" },
  { id: "linkedin", label: "LinkedIn", hint: "in/trietphan", group: "Connect", icon: "in", action: "external", target: "https://www.linkedin.com/in/trietphan" },
  { id: "x", label: "X / Twitter", hint: "@trietp", group: "Connect", icon: "𝕏", action: "external", target: "https://x.com/trietp" },
];

const postCommands: Command[] = posts.map((p) => ({
  id: `post-${p.slug}`,
  label: p.title,
  hint: `${p.tag} · ${p.readTime}`,
  group: "Writing" as const,
  icon: "✍",
  action: "route" as const,
  target: `/blog/${p.slug}`,
}));

const allCommands = [...baseCommands, ...postCommands];

const groupOrder: Command["group"][] = ["Navigate", "Projects", "Writing", "Connect"];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;
    return allCommands.filter((c) =>
      `${c.label} ${c.hint} ${c.group}`.toLowerCase().includes(q)
    );
  }, [query]);

  // Group results while preserving the flat index used for keyboard navigation
  const grouped = useMemo(() => {
    let i = 0;
    return groupOrder
      .map((group) => ({
        group,
        items: results.filter((r) => r.group === group).map((item) => ({ item, index: i++ })),
      }))
      .filter((g) => g.items.length > 0);
  }, [results]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setOpen(false);
      // "/" opens the palette unless the user is typing in a field
      if (e.key === "/" && !open) {
        const t = e.target as HTMLElement;
        if (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA" && !t.isContentEditable) {
          e.preventDefault();
          setOpen(true);
        }
      }
    };
    // Lets the navbar button (and anything else) open the palette
    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  // Keep the highlighted row inside the scroll viewport
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const run = (cmd: Command) => {
    setOpen(false);
    if (cmd.action === "scroll") {
      document.querySelector(cmd.target)?.scrollIntoView({ behavior: "smooth" });
    } else if (cmd.action === "route") {
      router.push(cmd.target);
    } else if (cmd.target.startsWith("mailto:")) {
      window.location.href = cmd.target;
    } else {
      window.open(cmd.target, "_blank", "noopener,noreferrer");
    }
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = results[cursor];
      if (cmd) run(cmd);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[99990] flex items-start justify-center px-4 pt-[12vh]"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="relative w-full max-w-xl rounded-2xl border border-white/10 overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            style={{ background: "rgba(14,14,32,0.96)" }}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#ff6b2b] shrink-0">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Jump to a section, project, or post…"
                className="flex-1 bg-transparent outline-none text-sm text-white/85 placeholder:text-white/25"
              />
              <kbd className="text-[10px] font-mono text-white/25 border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
              {grouped.length === 0 && (
                <p className="px-5 py-8 text-center text-sm text-white/25">
                  No matches for &ldquo;{query}&rdquo;
                </p>
              )}

              {grouped.map(({ group, items }) => (
                <div key={group} className="mb-1">
                  <p className="px-5 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/20">
                    {group}
                  </p>
                  {items.map(({ item, index }) => (
                    <button
                      key={item.id}
                      data-idx={index}
                      onMouseEnter={() => setCursor(index)}
                      onClick={() => run(item)}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors duration-100 ${
                        cursor === index ? "bg-[#ff6b2b]/10" : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <span className={`w-5 text-center text-xs shrink-0 ${cursor === index ? "text-[#ffaa33]" : "text-white/25"}`}>
                        {item.icon}
                      </span>
                      <span className={`text-sm flex-1 truncate ${cursor === index ? "text-white" : "text-white/65"}`}>
                        {item.label}
                      </span>
                      <span className="text-xs text-white/25 truncate max-w-[45%] hidden sm:block">{item.hint}</span>
                      {cursor === index && <span className="text-[#ffaa33] text-xs shrink-0">↵</span>}
                    </button>
                  ))}
                </div>
              ))}
            </div>

            {/* Footer legend */}
            <div className="flex items-center gap-4 px-5 py-2.5 border-t border-white/8 text-[10px] font-mono text-white/25">
              <span className="flex items-center gap-1"><kbd className="border border-white/10 rounded px-1">↑↓</kbd> navigate</span>
              <span className="flex items-center gap-1"><kbd className="border border-white/10 rounded px-1">↵</kbd> open</span>
              <span className="ml-auto text-white/15">{results.length} result{results.length === 1 ? "" : "s"}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
