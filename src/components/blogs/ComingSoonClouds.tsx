"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

/** A single fluffy cloud built from overlapping ellipses; fill via currentColor. */
function Cloud({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 240 100"
      className="absolute"
      style={style}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill="currentColor">
        <ellipse cx="74" cy="70" rx="66" ry="28" />
        <circle cx="84" cy="48" r="32" />
        <circle cx="128" cy="42" r="42" />
        <circle cx="172" cy="56" r="30" />
        <ellipse cx="166" cy="72" rx="62" ry="24" />
      </g>
    </svg>
  );
}

// Back-to-front: far clouds are small, faint, blurred and slow; near clouds are
// large, opaque and faster. Positions are fixed (no RNG → SSR-safe, no pop).
type Spec = { l: number; t: number; w: number };
const LAYERS: { dur: number; opacity: number; blur: string; clouds: Spec[] }[] = [
  {
    dur: 120,
    opacity: 0.5,
    blur: "blur-[3px]",
    clouds: [
      { l: 4, t: 13, w: 9 },
      { l: 30, t: 7, w: 11 },
      { l: 56, t: 17, w: 8 },
      { l: 82, t: 9, w: 10 },
    ],
  },
  {
    dur: 82,
    opacity: 0.78,
    blur: "blur-[1.5px]",
    clouds: [
      { l: 2, t: 33, w: 15 },
      { l: 28, t: 25, w: 18 },
      { l: 58, t: 37, w: 14 },
      { l: 84, t: 29, w: 17 },
    ],
  },
  {
    dur: 54,
    opacity: 0.95,
    blur: "",
    clouds: [
      { l: 6, t: 60, w: 22 },
      { l: 42, t: 70, w: 26 },
      { l: 76, t: 62, w: 22 },
    ],
  },
];

/**
 * Animated cloudscape backdrop for the /blogs "coming soon" page. Three parallax
 * layers of SVG clouds drift sideways at different speeds (back = slow + faint +
 * blurred). Decorative + pointer-transparent. Motion is GSAP, gated on
 * prefers-reduced-motion (then the clouds simply sit still). Only transform
 * animates, so it holds 60fps.
 */
export function ComingSoonClouds() {
  const root = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tweens = layerRefs.current.map((el, i) =>
        el
          ? gsap.to(el, {
              xPercent: -50,
              duration: LAYERS[i].dur,
              ease: "none",
              repeat: -1,
            })
          : null,
      );
      return () => tweens.forEach((t) => t?.kill());
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#6aa7e6] via-[#9ec9ef] to-[#e9f4fc]" />
      {/* Soft high sun glow */}
      <div className="absolute left-1/2 top-[15%] h-80 w-80 -translate-x-1/2 rounded-full bg-white/45 blur-3xl" />

      {/* Drifting cloud layers. Each is 200% wide and holds two identical halves;
          GSAP slides it left by 50% (one full screen) on a loop, so the second
          half lands exactly where the first began — a seamless drift. */}
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
          className={`absolute left-0 top-0 flex h-full w-[200%] text-white will-change-transform ${layer.blur}`}
          style={{ opacity: layer.opacity }}
        >
          {[0, 1].map((half) => (
            <div key={half} className="relative h-full w-1/2 shrink-0">
              {layer.clouds.map((c, j) => (
                <Cloud
                  key={j}
                  style={{ left: `${c.l}%`, top: `${c.t}%`, width: `${c.w}rem` }}
                />
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Settle the bottom into the page ground so the content reads cleanly. */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#e9f4fc]" />
    </div>
  );
}
