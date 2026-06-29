"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Scroll-scrubbed "fade-through". As the block scrolls up into view it fades +
 * rises (enter); as it leaves past the top it fades + drifts away (leave) — both
 * locked to scroll position, so the previous section hides exactly as the next
 * is revealed. Two disjoint triggers (enter zone near the bottom, leave zone
 * near the top) so they never fight over the same property.
 *
 * Reduced-motion users get static, fully-visible content (no triggers created).
 */
export function ScrollScene({
  children,
  className,
  enter = true,
  leave = true,
  y = 48,
}: {
  children: React.ReactNode;
  className?: string;
  enter?: boolean;
  leave?: boolean;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = ref.current;
      if (!el) return;

      if (enter) {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 55%",
              scrub: true,
            },
          },
        );
      }

      if (leave) {
        gsap.fromTo(
          el,
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0,
            y: -y,
            ease: "none",
            // Don't apply the from-state on load — only once the leave zone is
            // hit — so it can't clobber the enter tween's initial hidden state.
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "bottom 42%",
              end: "bottom 6%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
