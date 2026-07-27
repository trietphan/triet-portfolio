/**
 * The page-load timeline, in one place.
 *
 * The loading screen covers the viewport while the navbar and hero play their
 * staggered entrance underneath. Those two things have to be tuned together:
 * shorten one without the other and the visitor is left staring at an empty
 * page. That happens in two situations, so both collapse the same way.
 *
 *   reduced motion  the visitor asked for less animation
 *   repeat visit    the intro already played once this session
 */

export const INTRO_SEEN_KEY = "intro-played";

/**
 * Set by the inline script in the document head, before first paint, so the
 * loader can be hidden with CSS instead of flashing on screen. Reading a DOM
 * attribute rather than sessionStorage keeps this cheap enough to call during
 * render, and it is `false` on the server, which is the safe default.
 */
export function introSkipped(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.intro === "skip";
}

/** How long the loader stays up, in ms. */
export function loaderHold(reduce: boolean): number {
  return reduce ? 700 : 2300;
}

/**
 * Absolute delay for an entrance step, in seconds. `offset` is the step's
 * position in the sequence, measured from the start of the entrance.
 */
export function introDelay(offset: number, reduce: boolean): number {
  const quick = reduce || introSkipped();
  const start = quick ? 0.15 : 1.9;
  const spread = quick ? 0.12 : 1;
  return +(start + offset * spread).toFixed(3);
}
