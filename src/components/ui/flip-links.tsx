import { cn } from "@/lib/utils";

/** Per-letter stagger (ms) for the cascading flip. */
const PER_LETTER_MS = 25;

export type FlipLinkItem = {
  label: string;
  href: string;
};

/**
 * Hover/focus "flip" link: the label is split into letters; on hover the resting
 * row rises out of view while a duplicate row rises up from below to take its
 * place, each letter offset by a small delay for a cascading flip.
 *
 * Pure CSS transitions — no JS, no Framer Motion — to match this project's
 * GSAP-first, dependency-light setup (see menu-vertical.tsx for the same call).
 * Reduced-motion is handled globally in globals.css: the reduced-motion reset
 * zeroes both transition-duration and transition-delay, so the flip resolves as
 * an instant, un-staggered swap instead of a cascade.
 *
 * Accessibility: both letter layers are aria-hidden and the accessible name
 * lives on the <a> (so a screen reader reads the label once, not twice), and the
 * flip mirrors on focus-visible so keyboard users get the same affordance.
 *
 * Server-component safe: no hooks, state, or event handlers.
 */
export function FlipLink({
  children,
  href,
  className,
}: {
  children: string;
  href: string;
  className?: string;
}) {
  const external = /^https?:\/\//i.test(href);
  // Keep spaces visible inside the inline-block letter layout (a bare " " in an
  // inline-block collapses to zero width).
  const letters = [...children].map((l) => (l === " " ? " " : l));

  return (
    <a
      href={href}
      aria-label={children}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "group relative block overflow-hidden whitespace-nowrap font-display font-black uppercase leading-[0.75] text-foreground/80 transition-colors duration-300 hover:text-foreground focus-visible:text-foreground",
        "text-5xl sm:text-7xl md:text-8xl",
        className,
      )}
    >
      {/* Resting layer — rises out on hover/focus. */}
      <span aria-hidden className="flex">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%] group-focus-visible:-translate-y-[110%]"
            style={{ transitionDelay: `${i * PER_LETTER_MS}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
      {/* Incoming layer — starts below and rises into place; recolors to accent. */}
      <span aria-hidden className="absolute inset-0 flex text-accent">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0 group-focus-visible:translate-y-0"
            style={{ transitionDelay: `${i * PER_LETTER_MS}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
    </a>
  );
}

/**
 * Vertical stack of {@link FlipLink}s. Pass the destinations as `items`; each row
 * is a flip link. `itemClassName` is forwarded to every link for size overrides.
 */
export function FlipLinks({
  items,
  className,
  itemClassName,
}: {
  items: FlipLinkItem[];
  className?: string;
  itemClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {items.map((item) => (
        <FlipLink key={item.label} href={item.href} className={itemClassName}>
          {item.label}
        </FlipLink>
      ))}
    </div>
  );
}
