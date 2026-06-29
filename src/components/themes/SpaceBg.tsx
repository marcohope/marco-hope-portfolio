"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Small seeded PRNG so the star pattern is identical on server + client. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A tiled field of stars as a list of radial-gradient dots (integers → SSR-safe). */
function starField(count: number, tile: number, seed: number, dot: number) {
  const rnd = mulberry32(seed);
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round(rnd() * tile);
    const y = Math.round(rnd() * tile);
    const a = (0.35 + Math.round(rnd() * 55) / 100).toFixed(2);
    parts.push(
      `radial-gradient(${dot}px ${dot}px at ${x}px ${y}px, rgba(255,255,255,${a}), transparent)`,
    );
  }
  return parts.join(", ");
}

// Three depth layers (computed once at module load — deterministic).
const LAYERS = [
  { img: starField(16, 220, 7, 1), tile: 220, dur: 140 },
  { img: starField(11, 320, 19, 1), tile: 320, dur: 95 },
  { img: starField(7, 460, 41, 2), tile: 460, dur: 60 },
];

/**
 * Space motif for /work: a parallax tiled starfield, a soft nebula, and a faint
 * coordinate grid. Absolute inset-0 inside the page wrapper (content sits above).
 * Drift is GSAP-animated (seamless: each cycle advances by whole tiles) and
 * disabled for reduced-motion.
 */
export function SpaceBg() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced || !root.current) return;
      // Drift via transform (GPU-composited, zero repaint). Each tile is one
      // `tile` taller than the clip, so translating up by exactly one tile loops
      // seamlessly. dur/6 keeps the original px/sec speed.
      const layers = gsap.utils.toArray<HTMLElement>(".star-scroll");
      layers.forEach((el, i) => {
        const { tile, dur } = LAYERS[i];
        gsap.fromTo(
          el,
          { y: 0 },
          { y: -tile, duration: dur / 6, ease: "none", repeat: -1 },
        );
      });
      // Very slow nebula breathing.
      gsap.to(".space-nebula", {
        scale: 1.12,
        rotation: 8,
        duration: 40,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "70% 30%",
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Nebula glow + grain */}
      <div className="space-nebula absolute -right-[12%] -top-[18%] h-[78vmax] w-[78vmax] will-change-transform">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,#3b82f6_0%,transparent_60%)] opacity-[0.16] blur-3xl" />
        <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,#c77dff_0%,transparent_58%)] opacity-[0.12] blur-3xl" />
      </div>

      {/* Coordinate grid (faded at edges) */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(110,168,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,168,255,0.05) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 80%)",
        }}
      />

      {/* Star layers — each clip holds an oversized tiled child that translates
          (composited) for seamless parallax drift. */}
      {LAYERS.map((l, i) => (
        <div key={i} className="absolute inset-0 overflow-hidden">
          <div
            className="star-scroll absolute inset-x-0 top-0 will-change-transform"
            style={{
              height: `calc(100% + ${l.tile}px)`,
              backgroundImage: l.img,
              backgroundRepeat: "repeat",
              backgroundSize: `${l.tile}px ${l.tile}px`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
