"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

const PULL = 0.4; // button follows 40% of the cursor's offset…
const LABEL_PULL = 0.22; // …and the label drifts a touch further, for depth.

/**
 * A "magnetic" button: while the pointer is over the card the button leans
 * toward the cursor (a fraction of the offset, clamped so it never leaves the
 * stage), with its label drifting a little further for a parallax sense of
 * depth. Both axes run through prebuilt `gsap.quickTo` setters — no tween is
 * allocated per move — and leaving springs everything back with `elastic.out`.
 * The magnet is pointer-only; on touch / reduced motion it's a plain button.
 */
export function MagneticButtonDemo() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const field = fieldRef.current;
      const btn = btnRef.current;
      const label = labelRef.current;
      if (!field || !btn || !label) return;
      // Magnetism is a mouse affordance — skip it on touch and reduced motion,
      // leaving a perfectly ordinary button.
      const fine = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      if (!fine || prefersReducedMotion()) return;

      const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
      const lxTo = gsap.quickTo(label, "x", { duration: 0.5, ease: "power3.out" });
      const lyTo = gsap.quickTo(label, "y", { duration: 0.5, ease: "power3.out" });
      const clampBtn = gsap.utils.clamp(-40, 40);
      const clampLabel = gsap.utils.clamp(-22, 22);

      const onMove = (e: PointerEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        xTo(clampBtn(dx * PULL));
        yTo(clampBtn(dy * PULL));
        lxTo(clampLabel(dx * LABEL_PULL));
        lyTo(clampLabel(dy * LABEL_PULL));
      };
      const onLeave = () => {
        gsap.to([btn, label], {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
          overwrite: true,
        });
      };

      field.addEventListener("pointermove", onMove);
      field.addEventListener("pointerleave", onLeave);
      return () => {
        field.removeEventListener("pointermove", onMove);
        field.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: fieldRef },
  );

  return (
    <div
      ref={fieldRef}
      className="flex h-full w-full items-center justify-center p-10"
    >
      <button
        ref={btnRef}
        type="button"
        className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground outline-none transition-shadow duration-200 will-change-transform hover:shadow-[0_18px_45px_-15px_var(--color-accent)] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <span
          ref={labelRef}
          className="inline-flex items-center gap-2 will-change-transform"
        >
          Say hello
          <ArrowUpRight aria-hidden className="h-4 w-4" />
        </span>
      </button>
    </div>
  );
}
