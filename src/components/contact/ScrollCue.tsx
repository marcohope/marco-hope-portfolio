"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

/**
 * A small "scroll" hint pinned to the bottom of the contact hero. The chevron
 * bobs gently (GSAP) to signal there's content below the Spline. Static for
 * reduced-motion.
 */
export function ScrollCue() {
  const chev = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tw = gsap.to(chev.current, {
      y: 6,
      duration: 0.9,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
    return () => {
      tw.kill();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3">
      <span className="font-mono text-xs font-semibold uppercase tracking-[0.35em] text-white [text-shadow:_0_1px_12px_rgb(0_0_0_/_0.7)]">
        Scroll
      </span>
      <ChevronDown
        ref={chev}
        className="h-7 w-7 text-white [filter:_drop-shadow(0_1px_10px_rgb(0_0_0_/_0.7))]"
        strokeWidth={2.5}
      />
    </div>
  );
}
