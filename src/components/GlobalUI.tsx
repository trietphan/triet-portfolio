"use client";

import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import CommandPalette from "./CommandPalette";

// Mounted in root layout so cursor, scroll bar and ⌘K work on every page
export default function GlobalUI() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <CommandPalette />
    </>
  );
}
