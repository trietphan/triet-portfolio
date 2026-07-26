"use client";

import { useId } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";

/**
 * The aifutures mark: eight teardrop petals in a ring.
 *
 * Geometry and colour were fitted against the source artwork — each petal is a
 * circle of radius 0.326R centred 0.5R from the origin, capped by a point at
 * 1.0R, and carries a linear gradient from a light tip to a saturated base.
 * Petals sit at 95% opacity so the overlaps layer the way the original does.
 */

// [tip, base] per petal, clockwise from the top.
export const PETALS: [string, string][] = [
  ["#ff6e60", "#ff3c32"], // red
  ["#ff993b", "#fa650b"], // orange
  ["#ffd05a", "#f9b221"], // amber
  ["#6ddf88", "#30bf59"], // green
  ["#50d6e6", "#12b6ca"], // cyan
  ["#5791ff", "#1766f6"], // blue
  ["#827aef", "#4c44d7"], // indigo
  ["#c175ef", "#9c40d7"], // violet
];

const PETAL_PATH =
  "M 0,-100 Q -18.54,-85.63 -24.72,-71.26 A 32.6,32.6 0 1 0 24.72,-71.26 Q 18.54,-85.63 0,-100 Z";

const PETAL_OPACITY = 0.95;

/**
 * Petals swing out from the centre, one after another, and settle.
 *
 * Both variants are functions of the petal index: each petal's resting rotation
 * is i*45deg, so the animated rotation has to be expressed relative to that —
 * a variant `rotate` would otherwise overwrite the base rotation entirely.
 */
type BloomCustom = { i: number; reduce: boolean };

const bloom: Variants = {
  hidden: ({ i, reduce }: BloomCustom) =>
    reduce
      ? { scale: 1, rotate: i * 45, opacity: PETAL_OPACITY }
      : { scale: 0.12, rotate: i * 45 - 75, opacity: 0 },
  visible: ({ i, reduce }: BloomCustom) => ({
    scale: 1,
    rotate: i * 45,
    opacity: PETAL_OPACITY,
    transition: reduce
      ? { duration: 0 }
      : {
          delay: 0.1 + i * 0.075,
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
  }),
};

export default function Logo({
  size = 40,
  animated = false,
  className = "",
  title = "aifutures",
}: {
  size?: number;
  /** Play the petal-by-petal bloom on mount. */
  animated?: boolean;
  className?: string;
  title?: string;
}) {
  const reduceMotion = useReducedMotion();
  // Per-instance gradient ids. Deriving them from the props would collide as
  // soon as two logos share a size; useId is unique per component instance.
  // Colons are stripped so the ids stay usable in plain CSS selectors too.
  const uid = `logo${useId().replace(/:/g, "")}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="-118 -118 236 236"
      className={className}
      role="img"
      aria-label={title}
    >
      <defs>
        {/*
          objectBoundingBox units keep the gradient locked to each petal's own
          geometry, which always points "up" in local coordinates. A
          userSpaceOnUse gradient would need a matching gradientTransform, and
          that breaks the moment the petal is rotated by a CSS transform during
          the bloom — the shape turns but the paint server does not.
        */}
        {PETALS.map(([tip, base], i) => (
          <linearGradient
            key={i}
            id={`${uid}-${i}`}
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor={tip} />
            <stop offset="1" stopColor={base} />
          </linearGradient>
        ))}
      </defs>

      <g style={{ isolation: "isolate" }}>
        {PETALS.map((_, i) =>
          // `animated` is fixed per call site, so this branch never flips at
          // runtime. Reduced motion is handled inside the variants instead of
          // by swapping element types — React would reuse the same <path> node
          // and leave half-finished animation styles stranded on it.
          animated ? (
            <motion.path
              key={i}
              d={PETAL_PATH}
              fill={`url(#${uid}-${i})`}
              custom={{ i, reduce: !!reduceMotion }}
              variants={bloom}
              initial="hidden"
              animate="visible"
              // Rotate/scale about the flower's centre, which sits at the SVG
              // user-space origin. Motion writes transform-origin itself
              // (defaulting to 50% 50%), so the origin has to go through its
              // originX/originY API rather than a plain transformOrigin style —
              // and transform-box must be view-box, or 0,0 lands on the corner
              // of each petal's own bounding box instead of the flower centre.
              style={{ transformBox: "view-box", originX: 0, originY: 0 }}
            />
          ) : (
            <path
              key={i}
              d={PETAL_PATH}
              fill={`url(#${uid}-${i})`}
              opacity={PETAL_OPACITY}
              transform={`rotate(${i * 45})`}
            />
          )
        )}
      </g>
    </svg>
  );
}
