"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Contact "liquid glass" backdrop: soft aurora blobs (cyan / violet / blue) that
 * the frosted panels refract. Slow GSAP drift; static for reduced-motion.
 */
export function AuroraBackdrop() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;
      gsap.to(".aurora-1", { xPercent: 12, yPercent: 10, scale: 1.15, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".aurora-2", { xPercent: -10, yPercent: 8, scale: 1.1, duration: 23, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".aurora-3", { xPercent: 9, yPercent: -9, scale: 1.2, duration: 27, ease: "sine.inOut", yoyo: true, repeat: -1 });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="aurora-1 absolute -left-[15%] -top-[20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,#67e8f9_0%,transparent_60%)] opacity-25 blur-3xl will-change-transform" />
      <div className="aurora-2 absolute -right-[12%] top-[8%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,#a78bfa_0%,transparent_60%)] opacity-30 blur-3xl will-change-transform" />
      <div className="aurora-3 absolute -bottom-[25%] left-[20%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,#3b82f6_0%,transparent_62%)] opacity-20 blur-3xl will-change-transform" />
    </div>
  );
}
