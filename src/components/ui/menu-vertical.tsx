import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

type MenuItem = {
  label: string;
  href: string;
};

interface MenuVerticalProps {
  menuItems: MenuItem[];
  /** Hover / keyboard-focus accent color. Defaults to the portfolio blue. */
  color?: string;
  className?: string;
}

/**
 * Large vertical menu: an arrow slides in and the label shifts + recolors on
 * hover/focus. Adapted to CSS transitions (no Framer Motion) to match this
 * project's GSAP-first, dependency-light setup.
 */
export const MenuVertical = ({
  menuItems = [],
  color = "#2f80ff",
  className = "",
}: MenuVerticalProps) => {
  return (
    <nav
      className={`flex w-fit flex-col gap-2 md:gap-3 ${className}`}
      style={{ "--mv-color": color } as CSSProperties}
    >
      {menuItems.map((item, index) => (
        <Link
          key={`${item.href}-${index}`}
          href={item.href}
          className="group/nav flex items-center gap-2 rounded-sm text-foreground no-underline"
        >
          {/* Arrow + slide-in are a hover affordance — desktop only. On touch
              (no hover) it would leave labels shifted under the viewport edge,
              so below md the arrow is hidden and the label sits at rest. */}
          <span
            aria-hidden
            className="hidden transition-[transform,color,opacity] duration-300 ease-out md:inline-flex md:-translate-x-full md:opacity-0 md:group-hover/nav:translate-x-0 md:group-hover/nav:text-[var(--mv-color)] md:group-hover/nav:opacity-100 md:group-focus-visible/nav:translate-x-0 md:group-focus-visible/nav:text-[var(--mv-color)] md:group-focus-visible/nav:opacity-100"
          >
            <ArrowRight strokeWidth={3} className="size-12 sm:size-14 lg:size-16" />
          </span>
          <span className="font-display text-5xl font-semibold leading-none [text-shadow:0_1px_24px_rgb(0_0_0_/_0.5)] transition-[transform,color] duration-300 ease-out sm:text-6xl md:-translate-x-14 md:group-hover/nav:translate-x-0 md:group-hover/nav:text-[var(--mv-color)] md:group-focus-visible/nav:translate-x-0 md:group-focus-visible/nav:text-[var(--mv-color)] lg:-translate-x-16 lg:text-7xl">
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
};
