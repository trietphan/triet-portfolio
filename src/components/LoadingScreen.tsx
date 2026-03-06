"use client";

import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2200);
    const removeTimer = setTimeout(() => setRemoved(true), 2800);
    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div className={`loading-screen ${hidden ? "hidden" : ""}`}>
      <div className="flex flex-col items-center">
        <div className="loading-logo">
          <span className="letter bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] bg-clip-text text-transparent">T</span>
          <span className="letter bg-gradient-to-r from-[#ffaa33] to-[#b347ff] bg-clip-text text-transparent">P</span>
        </div>
        <div className="loading-bar">
          <div className="loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}
