"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Section hand-off for the washi stack. A block rises in once as it enters
 * (snappy, not scrubbed, so content always arrives fast), then — as it leaves
 * past the top — RECEDES rather than vanishes: it sinks slightly and settles to
 * a still-legible opacity, never zero, so the page reads as sheets stacking back
 * onto the paper rather than deleting their own content. Pure transform/opacity
 * (compositor-friendly). Two disjoint triggers so enter and leave never fight.
 *
 * Reduced-motion users get static, fully-visible content (no triggers created).
 */
export function ScrollScene({
  children,
  className,
  enter = true,
  leave = true,
  y = 28,
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
        gsap.from(el, {
          autoAlpha: 0,
          y,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          // Hand the element back to the natural flow once it's in, so the
          // leave tween starts from a clean slate.
          clearProps: "opacity,visibility,transform",
        });
      }

      if (leave) {
        gsap.fromTo(
          el,
          { autoAlpha: 1, y: 0, scale: 1 },
          {
            // Recede, don't erase: opacity floors well above zero and the panel
            // only sinks/shrinks a touch as it clears the top.
            autoAlpha: 0.55,
            y: -y * 0.6,
            scale: 0.985,
            ease: "none",
            transformOrigin: "50% 0%",
            // Don't apply the from-state on load — only once the leave zone is
            // hit — so it can't clobber the enter tween's initial hidden state.
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: "bottom 55%",
              end: "bottom 8%",
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
