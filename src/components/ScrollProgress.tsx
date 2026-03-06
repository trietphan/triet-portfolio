"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
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
      // Smooth lerp instead of snapping
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

  return <div ref={ref} className="scroll-progress" style={{ transform: "scaleX(0)" }} />;
}
