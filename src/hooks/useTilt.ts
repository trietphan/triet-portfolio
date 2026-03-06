import { useRef, useCallback, useEffect } from "react";

export function useTilt(strength: number = 5) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const target = useRef({ rx: 0, ry: 0 });
  const current = useRef({ rx: 0, ry: 0 });
  const active = useRef(false);

  useEffect(() => {
    let id: number;
    const loop = () => {
      current.current.rx += (target.current.rx - current.current.rx) * 0.1;
      current.current.ry += (target.current.ry - current.current.ry) * 0.1;
      if (ref.current) {
        const s = active.current ? 1.02 : 1;
        ref.current.style.transform = `perspective(800px) rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg) scale3d(${s},${s},1)`;
      }
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.current.rx = ((y - rect.height / 2) / (rect.height / 2)) * -strength;
      target.current.ry = ((x - rect.width / 2) / (rect.width / 2)) * strength;
      active.current = true;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    target.current.rx = 0;
    target.current.ry = 0;
    active.current = false;
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
