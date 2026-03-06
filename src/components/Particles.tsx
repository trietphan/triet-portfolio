"use client";

import { useMemo } from "react";

const colors = ["#ff6b2b", "#ffaa33", "#ff8800", "#b347ff", "#00fff5", "#00ff88", "#f5ff00"];

export default function Particles() {
  // Generate once, no re-renders
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 5.5 + 2) % 100}%`,
        size: (i % 3) + 2,
        color: colors[i % colors.length],
        duration: `${16 + (i % 7) * 3}s`,
        delay: `${(i * 1.7) % 14}s`,
      })),
    []
  );

  return (
    <div className="particles-bg">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
