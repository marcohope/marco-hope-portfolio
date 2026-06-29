"use client";

import { useCallback, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { X } from "lucide-react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

// Past this fraction of the sheet's height — or this downward flick speed — a
// release dismisses; otherwise it springs back to rest.
const DISMISS_DISTANCE = 0.4; // of sheet height
const DISMISS_VELOCITY = 0.6; // px per ms, downward

/**
 * A contained bottom sheet you can fling away. Dragging is hand-rolled on
 * Pointer Events (works for touch + mouse, capture so it survives leaving the
 * grabber); GSAP only runs the open / snap-back / dismiss tweens. Pulling up
 * past rest rubber-bands. Keyboard users get an explicit Close button + Escape;
 * reduced motion drops the tweens to instant.
 */
export function DragSheetDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  // Whether this open was triggered from the keyboard (click detail === 0) — if
  // so the sheet appears instantly; animating keyboard-driven UI is disorienting.
  const viaKeyboard = useRef(false);

  const drag = useRef({
    active: false,
    startY: 0,
    lastY: 0,
    lastT: 0,
    height: 0,
    dy: 0,
    vel: 0,
  });

  const reduce = () => prefersReducedMotion();

  // Animate in whenever the sheet mounts, and drop focus onto it.
  useGSAP(
    () => {
      if (!open) return;
      const sheet = sheetRef.current;
      const bd = backdropRef.current;
      if (!sheet || !bd) return;
      const instant = reduce() || viaKeyboard.current;
      gsap.fromTo(
        sheet,
        { y: sheet.offsetHeight },
        { y: 0, duration: instant ? 0 : 0.42, ease: "power3.out" },
      );
      gsap.fromTo(
        bd,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: instant ? 0 : 0.3, ease: "power2.out" },
      );
      sheet.focus();
    },
    { dependencies: [open], scope: stageRef },
  );

  const close = useCallback(() => {
    const sheet = sheetRef.current;
    const bd = backdropRef.current;
    if (!sheet) {
      setOpen(false);
      return;
    }
    gsap.to(sheet, {
      y: sheet.offsetHeight,
      duration: reduce() ? 0 : 0.3,
      ease: "power2.out",
      onComplete: () => {
        setOpen(false);
        openBtnRef.current?.focus();
      },
    });
    if (bd) gsap.to(bd, { autoAlpha: 0, duration: reduce() ? 0 : 0.25 });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    gsap.killTweensOf(sheet);
    drag.current = {
      active: true,
      startY: e.clientY,
      lastY: e.clientY,
      lastT: e.timeStamp,
      height: sheet.offsetHeight,
      dy: 0,
      vel: 0,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    let dy = e.clientY - d.startY;
    // Resist upward pulls (past rest) so the sheet feels anchored.
    if (dy < 0) dy *= 0.25;
    dy = Math.min(dy, d.height);
    d.vel = (e.clientY - d.lastY) / Math.max(1, e.timeStamp - d.lastT);
    d.lastY = e.clientY;
    d.lastT = e.timeStamp;
    d.dy = dy;
    gsap.set(sheetRef.current, { y: dy });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    const dismiss =
      d.dy > d.height * DISMISS_DISTANCE || d.vel > DISMISS_VELOCITY;
    if (dismiss) {
      close();
    } else {
      gsap.to(sheetRef.current, {
        y: 0,
        duration: reduce() ? 0 : 0.4,
        ease: "power3.out",
      });
    }
  };

  return (
    <div ref={stageRef} className="relative h-full w-full overflow-hidden">
      <div className="flex h-full w-full items-center justify-center">
        <button
          ref={openBtnRef}
          type="button"
          onClick={(e) => {
            viaKeyboard.current = e.detail === 0;
            setOpen(true);
          }}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground outline-none transition-transform duration-200 hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Open sheet
        </button>
      </div>

      {open && (
        <>
          <div
            ref={backdropRef}
            aria-hidden
            onClick={close}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          />
          <div
            ref={sheetRef}
            role="dialog"
            aria-label="Draggable demo sheet"
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
            }}
            className="absolute inset-x-0 bottom-0 rounded-t-2xl border-t border-white/15 bg-elevated/95 shadow-[0_-20px_50px_-20px_rgb(0_0_0_/_0.8)] outline-none backdrop-blur-xl"
          >
            {/* Grabber — the only drag surface; touch-action:none stops the page
                from scrolling under the gesture. */}
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{ touchAction: "none" }}
              className="flex cursor-grab justify-center py-3 active:cursor-grabbing"
            >
              <span
                aria-hidden
                className="h-1.5 w-10 rounded-full bg-foreground/30"
              />
            </div>
            <div className="px-6 pb-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold">
                    Drag me down
                  </h3>
                  <p className="mt-1 text-sm text-foreground/65">
                    Fling past 40% or with a quick flick to dismiss — otherwise
                    it springs back.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close sheet"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-foreground/70 outline-none transition-colors hover:bg-white/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
