"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

// How far the thumb travels: track inner width (60px) − thumb (28px) = 32px.
const TRAVEL = 32;

/**
 * A spring-loaded toggle. The thumb travels on a `back.out` spring so it
 * overshoots the far edge and settles back — and squashes a little along its
 * direction of travel — so flipping it feels physical rather than linear. The
 * track colour crossfades in lockstep (CSS). A real `role="switch"`: keyboard-
 * operable with a focus ring; reduced motion snaps it with no overshoot.
 */
export function SpringToggleDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useGSAP(
    () => {
      const thumb = thumbRef.current;
      if (!thumb) return;

      if (prefersReducedMotion()) {
        gsap.set(thumb, { x: on ? TRAVEL : 0 });
        return;
      }

      const tl = gsap.timeline();
      tl.to(thumb, { x: on ? TRAVEL : 0, duration: 0.5, ease: "back.out(2.4)" });
      // Squash along the throw, then round back out at rest.
      tl.fromTo(
        thumb,
        { scaleX: 1 },
        {
          scaleX: 0.86,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
          transformOrigin: on ? "right center" : "left center",
        },
        0,
      );
    },
    { dependencies: [on], scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      className="flex h-full w-full flex-col items-center justify-center gap-5 p-6"
    >
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label="Demo setting"
        onClick={() => setOn((v) => !v)}
        className={`relative inline-flex h-9 w-[4.25rem] items-center rounded-full p-1 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
          on ? "bg-accent" : "bg-foreground/15"
        }`}
      >
        <span
          ref={thumbRef}
          aria-hidden
          className="h-7 w-7 rounded-full bg-white shadow-[0_2px_8px_rgb(0_0_0_/_0.4)] will-change-transform"
        />
      </button>
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground/55">
        {on ? "On" : "Off"}
      </p>
    </div>
  );
}
