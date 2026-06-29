"use client";

import { useEffect, useRef, useState } from "react";
import { MousePointer2 } from "lucide-react";
import gsap from "gsap";

/**
 * A small cursor hint on the right side of /work nudging the user to hover the
 * interactive Spline scene. A ring pulses out and the cursor gently bobs (GSAP),
 * looping for as long as the page is open. Hover-capable pointers only;
 * reduced-motion shows it static.
 */
export function WorkHoverHint() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLSpanElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      // One-time client-capability gate (no SSR equivalent).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (!show) return;
    const el = root.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        autoAlpha: 0,
        x: 14,
        duration: 0.6,
        delay: 1,
        ease: "power3.out",
      });
      if (!reduced) {
        gsap.fromTo(
          ring.current,
          { scale: 0.7, opacity: 0.55 },
          { scale: 1.7, opacity: 0, duration: 1.8, ease: "power1.out", repeat: -1 },
        );
        gsap.to(cursor.current, {
          x: 5,
          y: -5,
          duration: 1.2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, el);

    return () => ctx.revert();
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed right-[6vw] top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      <span className="relative grid h-12 w-12 place-items-center">
        <span
          ref={ring}
          className="absolute inset-0 rounded-full border border-accent/60"
        />
        <span ref={cursor} className="relative">
          <MousePointer2 className="h-5 w-5 text-accent" />
        </span>
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/75">
        Hover to interact
      </span>
    </div>
  );
}
