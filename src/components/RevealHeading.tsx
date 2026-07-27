"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3 };

// 130%, not 110%: the wrapper carries bottom padding so descenders are not
// clipped, and the word has to start below that padding too.
const wordVariants = {
  hidden: { y: "130%", opacity: 0 },
  visible: { y: "0%", opacity: 1 },
};

const staticVariants = {
  hidden: { y: "0%", opacity: 1 },
  visible: { y: "0%", opacity: 1 },
};

// Splits a heading into words that rise into place one after another on scroll.
//
// The in-view observer sits on the heading itself, not the words: a word starts
// translated fully below its overflow-hidden wrapper, so observing the word
// would never intersect the viewport and the reveal could never fire.
//
// The accent gradient is applied per-word because a transformed descendant is
// not picked up by an ancestor's background-clip:text.
export default function RevealHeading({
  text,
  accent,
  accentClass = "",
  className = "",
  as = "h2",
}: {
  text: string;
  accent?: string;
  accentClass?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const Tag = tags[as];
  const reduce = !!useReducedMotion();
  const plain = text.split(" ");
  const fancy = accent ? accent.split(" ") : [];
  const total = plain.length + fancy.length;

  // The inter-word space must sit OUTSIDE the overflow-hidden wrapper —
  // trailing whitespace inside it gets trimmed and the words run together.
  const word = (w: string, i: number, isAccent: boolean) => (
    <Fragment key={`${w}-${i}`}>
      {/* pb/-mb pair: the padding keeps descenders inside the clip box, the
          negative margin keeps the heading's layout height unchanged. */}
      <span className="inline-block overflow-hidden align-bottom pb-[0.18em] -mb-[0.18em]">
        <motion.span
          className={`inline-block ${isAccent ? accentClass : ""}`}
          variants={reduce ? staticVariants : wordVariants}
          transition={
            reduce
              ? { duration: 0 }
              : {
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }
          }
        >
          {w}
        </motion.span>
      </span>
      {i < total - 1 ? " " : null}
    </Fragment>
  );

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {plain.map((w, i) => word(w, i, false))}
      {fancy.map((w, i) => word(w, plain.length + i, true))}
    </Tag>
  );
}
