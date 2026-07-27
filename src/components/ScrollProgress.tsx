"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let current = 0;
    let target = 0;

    const loop = () => {
      current += (target - current) * 0.1;
      if (ref.current) {
        ref.current.style.transform = `scaleX(${current})`;
      }
      if (Math.abs(target - current) > 0.0001) {
        raf = requestAnimationFrame(loop);
      } else {
        current = target;
        if (ref.current) ref.current.style.transform = `scaleX(${current})`;
        raf = 0;
      }
    };

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      target = docH > 0 ? window.scrollY / docH : 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" style={{ transform: "scaleX(0)" }} />;
}
