"use client";

import { useEffect, useState } from "react";

/**
 * Reactive `prefers-reduced-transparency: reduce` — true when the user has asked
 * the OS to minimise see-through / blurred surfaces. Components swap their
 * liquid-glass fills for solid ones when this is set. SSR-safe: starts false
 * (the translucent default) and updates after mount, so server and first client
 * render agree. Mirrors the motion gate in `motion.ts`, but reactive because the
 * glass fills are computed during render.
 */
export function useReducedTransparency() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-transparency: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
