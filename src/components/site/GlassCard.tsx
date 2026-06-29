"use client";

import { useRef } from "react";

/**
 * A frosted glass panel with a specular sheen that tracks the pointer — the
 * signature "liquid glass" interaction on /contact. Pointer position feeds CSS
 * vars consumed by the `.glass-sheen::before` highlight (see globals.css).
 */
export function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`glass glass-sheen relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
