"use client";

import { useEffect, useState } from "react";
import { HeroSpline } from "@/components/hero/HeroSpline";

/**
 * Fixed full-viewport Spline scene behind the /work content. The scene's 3D
 * detail sits on the right, so legibility scrims darken the left half (desktop)
 * and the whole frame (mobile) to keep the project copy readable. Reduced-motion
 * users get the static poster via HeroSpline.
 */
export function WorkBackground() {
  const [mm, setMm] = useState({ ready: false, reduced: false });

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setMm({ ready: true, reduced: q.matches });
    sync();
    q.addEventListener("change", sync);
    return () => q.removeEventListener("change", sync);
  }, []);

  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0">
        {mm.ready && <HeroSpline reducedMotion={mm.reduced} />}
      </div>

      {/* Scrims never block the pointer — the scene stays interactive. */}
      {/* Mobile: dim the whole scene so the stacked content stays legible. */}
      <div className="pointer-events-none absolute inset-0 bg-background/75 lg:hidden" />
      {/* Top + bottom vignette so sections resolve cleanly at the edges. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
