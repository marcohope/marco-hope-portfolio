"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** A personal crimson hanko (seal stamp) with the MH monogram, "pressed" in. */
export function HankoSeal() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;
      gsap.from(ref.current, {
        autoAlpha: 0,
        scale: 1.7,
        rotate: -16,
        duration: 0.55,
        ease: "back.out(2)",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
        clearProps: "opacity,visibility",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="-rotate-3">
      <svg
        viewBox="0 0 100 100"
        className="h-24 w-24 md:h-28 md:w-28"
        role="img"
        aria-label="Marco Hope personal seal"
      >
        <rect x="6" y="6" width="88" height="88" rx="14" fill="var(--color-accent)" opacity="0.92" />
        <rect
          x="13"
          y="13"
          width="74"
          height="74"
          rx="9"
          fill="none"
          stroke="#fff"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
        <text
          x="50"
          y="52"
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-archivo), sans-serif"
          fontWeight="700"
          fontSize="34"
          fill="#fff"
          letterSpacing="-1"
        >
          MH
        </text>
      </svg>
    </div>
  );
}
