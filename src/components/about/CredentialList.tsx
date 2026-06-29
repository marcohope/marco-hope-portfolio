"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image, { type StaticImageData } from "next/image";
import { Expand, X } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP);

type Credential = { label: string; image: StaticImageData | null };

/**
 * Awards / certifications list with proof on demand. Each item that has a scan
 * gets a small thumbnail that opens the full certificate in an accessible,
 * focus-trapped lightbox (Escape / backdrop to close; focus returns to the
 * thumbnail). Items without a scan keep a simple bullet, but reserve the same
 * footprint so every row's text stays aligned. The lightbox is `fixed inset-0`
 * so it's mobile-safe by construction; reduced motion drops the tweens.
 */
export function CredentialList({ items }: { items: readonly Credential[] }) {
  const [open, setOpen] = useState<Credential | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    const done = () => {
      setOpen(null);
      triggerRef.current?.focus();
    };
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (prefersReducedMotion() || !backdrop || !panel) {
      done();
      return;
    }
    gsap.to(backdrop, { opacity: 0, duration: 0.2, ease: "power2.out" });
    gsap.to(panel, {
      scale: 0.96,
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
      onComplete: done,
    });
  }, []);

  // Play the lightbox in and move focus onto the close button.
  useGSAP(
    () => {
      if (!open) return;
      const backdrop = backdropRef.current;
      const panel = panelRef.current;
      if (!backdrop || !panel) return;
      const reduced = prefersReducedMotion();
      // Animate the backdrop's opacity (a SIBLING of the panel, not an ancestor
      // of the close button) and the panel's TRANSFORM only — never the opacity
      // of the focusable subtree — so the close button is focusable the instant
      // it mounts, regardless of where the entrance tween is.
      gsap.fromTo(
        backdrop,
        { opacity: 0 },
        { opacity: 1, duration: reduced ? 0 : 0.2, ease: "power2.out" },
      );
      gsap.fromTo(
        panel,
        { scale: reduced ? 1 : 0.95 },
        { scale: 1, duration: reduced ? 0 : 0.3, ease: "back.out(1.5)" },
      );
    },
    { dependencies: [open] },
  );

  // While open: lock body scroll, close on Escape, trap Tab inside the dialog.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the dialog (post-paint, so the close button is focusable).
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;
      const f = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 text-sm text-foreground/75"
          >
            {item.image ? (
              <button
                type="button"
                aria-label={`View certificate: ${item.label}`}
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setOpen(item);
                }}
                className="group relative h-11 w-14 shrink-0 overflow-hidden rounded-md border border-border/60 bg-elevated/40 outline-none transition-colors hover:border-accent/60 focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="56px"
                  placeholder="blur"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 grid place-items-center bg-background/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand className="h-4 w-4 text-foreground" />
                </span>
              </button>
            ) : (
              <span
                aria-hidden
                className="grid h-11 w-14 shrink-0 place-items-center rounded-md border border-border/40"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
              </span>
            )}
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      {open?.image && typeof document !== "undefined" ? createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${open.label}`}
          onClick={close}
          className="fixed inset-0 z-[120] grid place-items-center p-4 md:p-8"
        >
          {/* Backdrop is a sibling (animated) so the panel's focusable content is
              never inside an opacity-animated subtree. */}
          <div
            ref={backdropRef}
            aria-hidden
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <div
            ref={panelRef}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex max-h-[90svh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_80px_-30px_rgb(0_0_0/0.8)]"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close certificate"
              className="absolute right-2 top-2 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/70 text-foreground outline-none backdrop-blur transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="overflow-auto p-3">
              <Image
                src={open.image}
                alt={open.label}
                placeholder="blur"
                sizes="(max-width: 768px) 92vw, 768px"
                className="h-auto w-full rounded-md"
              />
            </div>
            <p className="border-t border-border px-4 py-3 text-sm text-foreground/80">
              {open.label}
            </p>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}
