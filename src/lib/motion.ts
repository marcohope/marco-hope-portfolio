/** True when the user has asked the OS to minimise animation. SSR-safe (returns
 *  false on the server where `matchMedia` is absent). Read at call time, not at
 *  module load, so toggling the OS setting takes effect without a reload. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
