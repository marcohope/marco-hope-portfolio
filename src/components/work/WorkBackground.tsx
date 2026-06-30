"use client";

import { useEffect, useState } from "react";
import { HeroSpline } from "@/components/hero/HeroSpline";

/**
 * Fixed full-viewport Spline scene behind the /work content. The scene's 3D
 * detail sits on the right and is driven by the cursor (hover / look-at-mouse),
 * so the heavy WebGL viewer only earns its cost on a hover-capable, fine-pointer
 * device wide enough (lg+) to show it un-scrimmed — the same condition that
 * surfaces the "hover to interact" hint. Phones and tablets (where the scene is
 * dimmed to ~25% by the scrim and can't be hovered) get the static poster
 * instead, as do reduced-motion / reduced-data users. That keeps the page fast
 * — no multi-second WebGL parse on mobile — exactly where the scene would never
 * be interactive anyway. The legibility scrims darken the left half (desktop)
 * and the whole frame (mobile) so the project copy stays readable either way.
 */
export function WorkBackground() {
  const [mm, setMm] = useState({ ready: false, live: false });

  useEffect(() => {
    // Visible AND usable: hover-capable fine pointer at lg+ (where the mobile
    // scrim lifts). All three features are widely supported, so the combined
    // query is safe to gate on.
    const capable = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
    );
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // `!matches` defaults to "allow" when the feature is unsupported, so this
    // only ever blocks the scene, never hides it from a capable desktop.
    const data = window.matchMedia("(prefers-reduced-data: reduce)");
    const sync = () =>
      setMm({
        ready: true,
        live: capable.matches && !motion.matches && !data.matches,
      });
    sync();
    capable.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    data.addEventListener("change", sync);
    return () => {
      capable.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
      data.removeEventListener("change", sync);
    };
  }, []);

  // Poster path (no live scene to stream) → tell the loading screen we're ready
  // so it clears at its 3s floor instead of hanging to the 8s scene fallback.
  // rAF so the loader has mounted its listener; harmless if it already finished.
  useEffect(() => {
    if (!mm.ready || mm.live) return;
    const id = requestAnimationFrame(() =>
      window.dispatchEvent(new Event("hero:scene-ready")),
    );
    return () => cancelAnimationFrame(id);
  }, [mm.ready, mm.live]);

  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <div className="absolute inset-0">
        {mm.ready &&
          (mm.live ? (
            <HeroSpline reducedMotion={false} />
          ) : (
            <div className="hero-poster absolute inset-0" />
          ))}
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
