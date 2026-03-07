"use client";

import { useEffect, useRef } from "react";

export default function BlogReadingBar({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let current = 0;
    let target = 0;

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      target = docH > 0 ? window.scrollY / docH : 0;
    };

    const loop = () => {
      current += (target - current) * 0.1;
      if (ref.current) {
        ref.current.style.transform = `scaleX(${current})`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "2px",
        width: "100%",
        background: `linear-gradient(90deg, ${color}, #ff6b2b)`,
        transformOrigin: "left",
        transform: "scaleX(0)",
        zIndex: 9999,
        willChange: "transform",
      }}
    />
  );
}
