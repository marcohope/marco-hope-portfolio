/* eslint-disable @next/next/no-img-element -- these are tiny, fixed-size,
   decorative vector logos: next/image serves SVGs unoptimized anyway (no LCP
   win) and would complicate the per-theme variant swap. Plain <img> is right. */
import { cn } from "@/lib/utils";
import { TechIcon } from "./TechIcon";
import { TOOL_LOGOS } from "./tool-logos";

/**
 * A full-colour brand mark. Used by the home Tools marquee and the project
 * tech-tags (home "Selected work" grid + the /work catalogue).
 *
 * - Full-colour brands render as an <img> (an isolated SVG resource — safe to
 *   duplicate across the page without gradient/clip-id collisions).
 * - The React mark ships light-bg / dark-bg variants; globals.css shows the one
 *   tuned for the active ground ([data-theme-variant]).
 * - Monochrome brands fall back to the currentColor <TechIcon> glyph so they
 *   follow the foreground ink and adapt to any panel on their own.
 *
 * Accessibility: pass `label` (the tool's name) where the mark is the *only*
 * carrier of that name — the tech-tags — so assistive tech announces it. Omit it
 * for decorative use where an adjacent sr-only list already names every tool
 * (the marquee); the marks then render with empty alt and don't double-read.
 *
 * Hover/size lives in `className` (the marquee chip adds its scale-on-hover);
 * this component only owns the base transition and the day/night swap.
 */
export function ToolLogo({
  slug,
  className,
  label,
}: {
  slug: string;
  className?: string;
  label?: string;
}) {
  const spec = TOOL_LOGOS[slug];

  // Monochrome brand (or an unmapped slug): currentColor glyph. TechIcon names
  // itself from the generated data; passing `title` overrides only when labelled
  // (undefined → it keeps the default, matching the marquee's prior behaviour).
  if (!spec || spec.kind === "mono") {
    return (
      <TechIcon
        slug={slug}
        title={label}
        className={cn(
          "text-foreground/65 transition duration-200 group-hover:text-accent",
          className,
        )}
      />
    );
  }

  // Labelled marks carry the tool name; decorative ones (alt="" + aria-hidden)
  // stay out of the a11y tree — the marquee's sr-only list names them instead.
  // `alt` is kept explicit (not spread) so the a11y linter can see it.
  const alt = label ?? "";
  const decorative = label ? {} : { "aria-hidden": true as const };
  // `tool-logo` is the hook globals.css uses to halo dark marks on dark grounds.
  const cls = cn("tool-logo object-contain transition duration-200", className);

  if (spec.kind === "themed") {
    return (
      <>
        <img
          alt={alt}
          {...decorative}
          src={spec.day}
          draggable={false}
          data-theme-variant="day"
          className={cls}
        />
        <img
          alt={alt}
          {...decorative}
          src={spec.night}
          draggable={false}
          data-theme-variant="night"
          className={cls}
        />
      </>
    );
  }

  return (
    <img
      alt={alt}
      {...decorative}
      src={spec.src}
      draggable={false}
      className={cls}
    />
  );
}
