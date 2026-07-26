"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { posts } from "@/data/posts";
import { scrollToElement } from "@/lib/scroll";

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

  { id: "aifutures", label: "aifutures.dev", hint: "My independent product lab", group: "Projects", icon: "✦", action: "external", target: "https://aifutures.dev" },
  { id: "trader", label: "AI Futures Trader", hint: "Live markets — ES, NQ, GC, CL", group: "Projects", icon: "📊", action: "external", target: "https://trade.aifutures.dev" },
  { id: "aiflow", label: "AIFlow", hint: "Repository cartography", group: "Projects", icon: "🗺", action: "external", target: "https://github.com/trietphan" },
  { id: "acc", label: "Agent Control Center", hint: "Mission control for agent fleets", group: "Projects", icon: "🛰", action: "external", target: "https://github.com/trietphan" },
  { id: "clawswarm-app", label: "clawswarm.app", hint: "Multi-agent AI platform", group: "Projects", icon: "🌐", action: "external", target: "https://clawswarm.app" },
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;
    return allCommands.filter((c) =>
      `${c.label} ${c.hint} ${c.group}`.toLowerCase().includes(q)
    );
  }, [query]);

  // Group for display, and derive the keyboard order FROM that grouping.
  // `results` is in source order (Navigate, Projects, Connect, Writing) while the
  // rendered order follows groupOrder — indexing into `results` would select a
  // different command than the one highlighted.
  const { grouped, ordered } = useMemo(() => {
    const gs: { group: Command["group"]; items: { item: Command; index: number }[] }[] = [];
    const flat: Command[] = [];
    for (const group of groupOrder) {
      const items = results.filter((r) => r.group === group);
      if (!items.length) continue;
      gs.push({
        group,
        items: items.map((item) => {
          flat.push(item);
          return { item, index: flat.length - 1 };
        }),
      });
    }
    return { grouped: gs, ordered: flat };
  }, [results]);

  // Reset at the point of opening rather than in an effect, so the palette
  // never renders a frame with the previous query still in it.
  const openPalette = useCallback(() => {
    setQuery("");
    setCursor(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else openPalette();
        return;
      }
      if (e.key === "Escape") setOpen(false);
      // "/" opens the palette unless the user is typing in a field
      if (e.key === "/" && !open) {
        const t = e.target as HTMLElement;
        if (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA" && !t.isContentEditable) {
          e.preventDefault();
          openPalette();
        }
      }
    };
    // Lets the navbar button (and anything else) open the palette
    const onOpen = () => openPalette();

    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [open, openPalette]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";

    // Remember where focus came from so it can be handed back on close.
    const opener = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => inputRef.current?.focus());

    // Keep Tab inside the dialog while it is open.
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onTab);

    return () => {
      document.removeEventListener("keydown", onTab);
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, [open]);

  // Keep the highlighted row inside the scroll viewport
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-idx="${cursor}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  const run = (cmd: Command) => {
    setOpen(false);
    if (cmd.action === "scroll") {
      const el = document.querySelector(cmd.target);
      // Sections only exist on the home page — from a post or the 404 page,
      // route home with the hash instead of silently doing nothing.
      if (el) scrollToElement(el);
      else router.push(`/${cmd.target}`);
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
      setCursor((c) => (ordered.length ? (c + 1) % ordered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (ordered.length ? (c - 1 + ordered.length) % ordered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = ordered[cursor];
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
            ref={dialogRef}
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
                onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
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
              <span className="ml-auto text-white/15">{ordered.length} result{ordered.length === 1 ? "" : "s"}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
