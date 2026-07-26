/**
 * Programmatic scrolling helpers.
 *
 * `behavior: "smooth"` is honoured by the browser regardless of the CSS
 * `scroll-behavior` set on <html>, so the reduced-motion preference has to be
 * checked here too — otherwise the global reduced-motion rule is bypassed.
 */

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function behavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: behavior() });
}

export function scrollToElement(el: Element): void {
  el.scrollIntoView({ behavior: behavior(), block: "start" });
}
