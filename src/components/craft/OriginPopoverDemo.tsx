"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Copy, Link2, Share2 } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

const TRIGGERS = ["Account", "Filters", "Share"];

/**
 * Popover that grows out of whichever trigger opened it: its transform-origin is
 * set to the trigger's centre, so the scale-in reads as the panel unfolding from
 * the button. Opened by mouse → a quick scale(0.96)+fade; opened by keyboard →
 * appears instantly (animating keyboard-driven UI is disorienting). Escape and
 * outside-click close it; Escape restores focus to the trigger.
 */
export function OriginPopoverDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Whether the current open was triggered from the keyboard (detail === 0).
  const viaKeyboard = useRef(false);

  // Position the panel under its trigger, point the transform-origin at the
  // trigger centre, then play it in. Runs in a layout effect → no flash.
  useGSAP(
    () => {
      if (openIndex == null) return;
      const pop = popRef.current;
      const stage = stageRef.current;
      const trigger = btnRefs.current[openIndex];
      if (!pop || !stage || !trigger) return;

      const stageBox = stage.getBoundingClientRect();
      const tb = trigger.getBoundingClientRect();
      const triggerCenter = tb.left - stageBox.left + tb.width / 2;
      const popW = pop.offsetWidth;
      const left = Math.max(
        8,
        Math.min(triggerCenter - popW / 2, stage.clientWidth - popW - 8),
      );
      const top = tb.bottom - stageBox.top + 10;
      gsap.set(pop, { left, top });
      pop.style.transformOrigin = `${triggerCenter - left}px top`;

      const instant = viaKeyboard.current || prefersReducedMotion();
      gsap.fromTo(
        pop,
        { autoAlpha: 0, scale: instant ? 1 : 0.96 },
        { autoAlpha: 1, scale: 1, duration: instant ? 0 : 0.22, ease: "power2.out" },
      );
      pop.querySelector<HTMLElement>("a,button")?.focus();
    },
    { dependencies: [openIndex], scope: stageRef },
  );

  const close = useCallback(
    (restoreFocus: boolean) => {
      const pop = popRef.current;
      const idx = openIndex;
      const finish = () => {
        setOpenIndex(null);
        if (restoreFocus && idx != null) btnRefs.current[idx]?.focus();
      };
      if (!pop || prefersReducedMotion()) {
        finish();
        return;
      }
      gsap.to(pop, {
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.16,
        ease: "power2.out",
        onComplete: finish,
      });
    },
    [openIndex],
  );

  // Close on any pointerdown outside the panel + its trigger (no focus restore).
  useEffect(() => {
    if (openIndex == null) return;
    const onDown = (e: PointerEvent) => {
      const pop = popRef.current;
      const trig = btnRefs.current[openIndex];
      const target = e.target as Node;
      if (pop && !pop.contains(target) && trig && !trig.contains(target)) {
        close(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openIndex, close]);

  return (
    <div
      ref={stageRef}
      onKeyDown={(e) => {
        if (e.key === "Escape" && openIndex != null) close(true);
      }}
      className="relative flex h-full w-full items-start justify-center p-6"
    >
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {TRIGGERS.map((label, i) => {
          const isOpen = openIndex === i;
          return (
            <button
              key={label}
              ref={(el) => {
                btnRefs.current[i] = el;
              }}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              onClick={(e) => {
                if (openIndex === i) {
                  close(true);
                } else {
                  viaKeyboard.current = e.detail === 0;
                  setOpenIndex(i);
                }
              }}
              className={`rounded-lg border px-4 py-2 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-accent ${
                isOpen
                  ? "border-accent/60 bg-accent/15 text-foreground"
                  : "border-border bg-surface text-foreground/75 hover:border-border-strong hover:text-foreground"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {openIndex != null && (
        <div
          ref={popRef}
          role="dialog"
          aria-label={`${TRIGGERS[openIndex]} options`}
          style={{ position: "absolute", opacity: 0 }}
          className="z-10 w-56 rounded-xl border border-border-strong bg-elevated/95 p-1.5 shadow-[0_24px_60px_-24px_rgb(0_0_0_/_0.85)] backdrop-blur-xl"
        >
          <p className="px-3 pb-1.5 pt-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground/55">
            {TRIGGERS[openIndex]}
          </p>
          {[
            { icon: Link2, label: "Copy link" },
            { icon: Copy, label: "Duplicate" },
            { icon: Share2, label: "Share…" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => close(true)}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-foreground/80 outline-none transition-colors hover:bg-accent/15 hover:text-foreground focus-visible:bg-accent/15 focus-visible:text-foreground"
            >
              <Icon className="h-4 w-4 text-foreground/55" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
