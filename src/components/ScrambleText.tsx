"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

/**
 * Resolves a string out of noise, one character at a time.
 *
 * Three things keep this from feeling janky:
 *
 * 1. It writes straight to the DOM node instead of holding React state. The
 *    previous version called setState every 35ms, which re-rendered the whole
 *    hero (five animated shapes, six motion elements) on every tick while the
 *    loading screen was still running its own animations.
 * 2. It runs on requestAnimationFrame, so it paints in step with the browser
 *    instead of fighting it on a timer.
 * 3. Unresolved characters are noise, never blanks. The old version padded with
 *    spaces, so the headline started out almost empty and looked broken rather
 *    than like it was decoding.
 *
 * The server renders the real text, so there is no layout shift and crawlers see
 * the name.
 */
export default function ScrambleText({
  text,
  delay = 0,
  duration = 750,
  reduce = false,
  className = "",
}: {
  text: string;
  /** ms to wait before the effect starts */
  delay?: number;
  /** ms from all-noise to fully resolved */
  duration?: number;
  reduce?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = text;
      return;
    }

    const noise = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
    // Start fully scrambled so the headline is never a blank box.
    el.textContent = Array.from(text, (c) => (c === " " ? " " : noise())).join("");

    let raf = 0;
    let startedAt = 0;

    const tick = (now: number) => {
      if (!startedAt) startedAt = now;
      const t = Math.min((now - startedAt) / duration, 1);
      // easeOutCubic: characters lock in quickly, then the last few settle.
      const eased = 1 - Math.pow(1 - t, 3);
      const locked = Math.floor(eased * text.length);

      let out = "";
      for (let i = 0; i < text.length; i++) {
        out += i < locked || text[i] === " " ? text[i] : noise();
      }
      el.textContent = out;

      if (t < 1) raf = requestAnimationFrame(tick);
      else el.textContent = text;
    };

    const timer = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [text, delay, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}
