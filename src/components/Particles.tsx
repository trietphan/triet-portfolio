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

// Orange-heavy palette
const colors = ["#ff6b2b", "#ffaa33", "#ff8800", "#ff6b2b", "#ffaa33", "#b347ff", "#ff00e5"];

export default function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: `${Math.random() * 18 + 12}s`,
      delay: `${Math.random() * 12}s`,
    }));
    setParticles(generated);
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
