"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const COUNT = 18;

// A single sakura petal with a soft notch at the wide (top) end.
const PETAL_PATH =
  "M10 24 C2 16 2.5 6 7.5 1.2 C8.8 0 8.2 3.2 10 3.8 C11.8 3.2 11.2 0 12.5 1.2 C17.5 6 18 16 10 24 Z";

/**
 * Decorative cherry-blossom petals drifting down the /about scene. Pure GSAP:
 * each petal wraps continuously through a vertical band (seamless loop) with a
 * gentle horizontal sway + tumble. Color, tint variety, and the night glow are
 * driven entirely by theme CSS (`.theme-about-*`) — never React inline styles —
 * so toggling day↔night recolors petals without disturbing the running tweens.
 * Reduced-motion: GSAP no-ops and the CSS base `opacity:0` keeps them hidden.
 */
export function CherryPetals() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced || !root.current) return;

      const petals = gsap.utils.toArray<HTMLElement>(".petal", root.current);
      const top = -90;
      const bottom = window.innerHeight + 90;
      const span = bottom - top;

      petals.forEach((p) => {
        gsap.set(p, {
          left: `${gsap.utils.random(-3, 100)}%`,
          y: gsap.utils.random(top, bottom),
          scale: gsap.utils.random(0.45, 1.05),
          opacity: gsap.utils.random(0.5, 0.92),
          rotationZ: gsap.utils.random(0, 360),
          rotationY: gsap.utils.random(0, 360),
        });

        // Continuous fall — advance y by exactly `span` and wrap into the band
        // for a seamless infinite loop (no mid-screen jump on repeat).
        gsap.to(p, {
          y: `+=${span}`,
          rotationZ: `+=${gsap.utils.random(220, 620)}`,
          duration: gsap.utils.random(10, 20),
          ease: "none",
          repeat: -1,
          modifiers: {
            y: gsap.utils.unitize(
              (v) => gsap.utils.wrap(top, bottom, parseFloat(v)),
              "px",
            ),
          },
        });

        // Independent gentle sway + flutter.
        gsap.to(p, {
          x: gsap.utils.random(36, 130) * (gsap.utils.random([1, -1])),
          rotationY: `+=${gsap.utils.random(180, 540)}`,
          duration: gsap.utils.random(3, 6.5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="petal-field pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {Array.from({ length: COUNT }).map((_, i) => (
        <svg
          key={i}
          className="petal"
          width="18"
          height="22"
          viewBox="0 0 20 24"
          fill="currentColor"
        >
          <path d={PETAL_PATH} />
        </svg>
      ))}
    </div>
  );
}
