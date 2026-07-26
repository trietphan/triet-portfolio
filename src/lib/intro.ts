/**
 * The page-load timeline, in one place.
 *
 * The loading screen covers the viewport while the navbar and hero play their
 * staggered entrance underneath. Those two things have to be tuned together:
 * shortening the loader without shortening the entrance leaves the user staring
 * at an empty page, which is exactly what reduced-motion users would otherwise
 * get — the preference they set to *reduce* motion would hand them a blank
 * screen for a second instead.
 *
 * So the entrance is expressed as offsets from a single start point, and both
 * the start point and the spread collapse under reduced motion.
 */

/** How long the loader stays up, in ms. */
export function loaderHold(reduce: boolean): number {
  return reduce ? 700 : 2300;
}

/** When the content behind the loader begins revealing itself, in seconds. */
function introStart(reduce: boolean): number {
  return reduce ? 0.35 : 1.9;
}

/** Reduced motion keeps the order but compresses the gaps. */
function spread(reduce: boolean): number {
  return reduce ? 0.12 : 1;
}

/**
 * Absolute delay for an entrance step, in seconds.
 * `offset` is the step's position in the sequence, measured from the start.
 */
export function introDelay(offset: number, reduce: boolean): number {
  return +(introStart(reduce) + offset * spread(reduce)).toFixed(3);
}
