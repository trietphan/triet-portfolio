"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  size: number;
  color: string;
  duration: string;
  delay: string;
}

// No pink — orange, amber, purple, cyan, green, yellow
const colors = ["#ff6b2b", "#ffaa33", "#ff8800", "#b347ff", "#00fff5", "#00ff88", "#f5ff00"];

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: `${Math.random() * 20 + 12}s`,
        delay: `${Math.random() * 14}s`,
      }))
    );
  }, []);

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
