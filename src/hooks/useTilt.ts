import { useRef, useCallback, useEffect } from "react";
import { useReducedMotion } from "framer-motion";

export function useTilt(strength: number = 5) {
  const reduceMotion = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) {
      if (ref.current) ref.current.style.transform = "";
    }
  }, [reduceMotion]);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Keep the spotlight responsive, but do not move the card itself when
      // the user has asked the OS to reduce motion.
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      if (reduceMotion) return;

      const rx = ((y - rect.height / 2) / (rect.height / 2)) * -strength;
      const ry = ((x - rect.width / 2) / (rect.width / 2)) * strength;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1)`;
    },
    [reduceMotion, strength]
  );

  const onMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
