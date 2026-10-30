import type Lenis from "lenis";

let lenis: Lenis | null = null;
let locks = 0;

/** Registered by <SmoothScroll /> so other components can pause it. */
export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/**
 * Stops page scrolling while a modal or menu is open. Lenis drives the scroll
 * itself, so hiding body overflow alone wouldn't stop the page behind it.
 * Calls are counted, so nested overlays unlock correctly.
 */
export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  document.body.style.overflow = "hidden";
  lenis?.stop();
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  document.body.style.overflow = "";
  lenis?.start();
}
