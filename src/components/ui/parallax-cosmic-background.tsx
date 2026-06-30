"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { starField } from "@/lib/starfield";

gsap.registerPlugin(useGSAP);

// Three parallax depth layers (computed once — deterministic). Nearer layers
// hold larger, faster-drifting stars. `dur` = seconds to travel one tile.
const LAYERS = [
  { img: starField(70, 300, 7, 1), tile: 300, dur: 110 },
  { img: starField(42, 420, 19, 1.4), tile: 420, dur: 70 },
  { img: starField(22, 560, 41, 2), tile: 560, dur: 44 },
];

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

interface CosmicParallaxBgProps {
  /** Large wordmark, centered (rendered as the `h1`). */
  head: string;
  /** Comma-separated sub-words; each part rises in beneath the wordmark. */
  text: string;
  /** Repeat the title entrance. Stars always drift. @default false */
  loop?: boolean;
  /** Extra classes on the container (e.g. `absolute inset-0` to fill a hero). */
  className?: string;
}

/**
 * A cosmic parallax backdrop: three drifting starfield layers, a planet rising
 * at the horizon with an atmospheric glow tinted to the page accent, and a
 * centered wordmark. Drift + the one-time title reveal are GSAP-driven and
 * skipped under `prefers-reduced-motion` (the content stays visible + static).
 */
export function CosmicParallaxBg({
  head,
  text,
  loop = false,
  className,
}: CosmicParallaxBgProps) {
  const root = useRef<HTMLDivElement>(null);
  const parts = text
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  useGSAP(
    () => {
      if (!root.current || prefersReduced()) return; // static for reduced motion

      // Continuous upward star drift. Each layer's child is one tile taller than
      // its clip, so translating up by exactly one tile loops seamlessly.
      const layers = gsap.utils.toArray<HTMLElement>(
        root.current.querySelectorAll<HTMLElement>(".cosmic-stars"),
      );
      layers.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: -LAYERS[i].tile,
            duration: LAYERS[i].dur,
            ease: "none",
            repeat: -1,
          },
        );
      });

      // Title + sub-words rise + fade in once (or loop), then settle. Selector
      // text is scoped to `root` by useGSAP.
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        repeat: loop ? -1 : 0,
        repeatDelay: 1.4,
      });
      tl.from(".cosmic-title", { autoAlpha: 0, y: 44, duration: 1 }).from(
        ".cosmic-subtitle [data-part]",
        { autoAlpha: 0, y: 18, stagger: 0.12, duration: 0.6 },
        "-=0.45",
      );
    },
    { scope: root, dependencies: [loop] },
  );

  return (
    <div ref={root} className={cn("cosmic-parallax-container", className)}>
      {/* Decorative starfield — three parallax depth layers. */}
      {LAYERS.map((l, i) => (
        <div key={i} aria-hidden className="cosmic-stars-clip">
          <div
            className="cosmic-stars"
            style={{
              height: `calc(100% + ${l.tile}px)`,
              backgroundImage: l.img,
              backgroundRepeat: "repeat",
              backgroundSize: `${l.tile}px ${l.tile}px`,
            }}
          />
        </div>
      ))}

      {/* Planet + atmospheric horizon glow (decorative). */}
      <div aria-hidden className="cosmic-glow" />
      <div aria-hidden className="cosmic-earth" />

      {/* Centered wordmark. */}
      <div className="cosmic-text">
        <h1 className="cosmic-title">{head}</h1>
        {parts.length > 0 && (
          <p className="cosmic-subtitle">
            {parts.map((part, i) => (
              <span key={`${part}-${i}`} className="contents">
                <span data-part>{part}</span>
                {i < parts.length - 1 && (
                  <span aria-hidden className="cosmic-dot">
                    ·
                  </span>
                )}
              </span>
            ))}
          </p>
        )}
      </div>
    </div>
  );
}
