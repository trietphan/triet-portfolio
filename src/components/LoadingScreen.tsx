"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="loading-screen"
        >
          <div className="flex flex-col items-center">
            <div className="loading-logo">
              <span className="letter bg-gradient-to-r from-[#ff6b2b] to-[#ffaa33] bg-clip-text text-transparent">
                T
              </span>
              <span className="letter bg-gradient-to-r from-[#ffaa33] to-[#b347ff] bg-clip-text text-transparent">
                P
              </span>
            </div>
            <div className="loading-bar">
              <div className="loading-bar-fill" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
