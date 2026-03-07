"use client";

import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";

// Mounted in root layout so cursor + scroll bar work on every page
export default function GlobalUI() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
    </>
  );
}
