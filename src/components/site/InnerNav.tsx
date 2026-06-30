"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { CurtainLink } from "@/components/transition/CurtainLink";
import { useAboutMode, type AboutMode } from "@/components/about/about-mode";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Craft", href: "/craft" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

/** Map a pathname to its per-page theme class so the nav's accent (underline,
 *  hover, CTA fill) — and, on the sakura home, its whole light/dark surface —
 *  inherits the page it sits on. Home follows the live day↔night toggle. */
function themeForPath(p: string, aboutMode: AboutMode) {
  if (p.startsWith("/work")) return "theme-work";
  if (p.startsWith("/craft")) return "theme-craft";
  if (p.startsWith("/blogs")) return "theme-blogs";
  if (p === "/")
    return aboutMode === "night" ? "theme-about-night" : "theme-about-day";
  if (p.startsWith("/contact")) return "theme-contact";
  return "";
}

/**
 * Persistent top nav for the inner (non-home) routes. Lives in (site)/layout
 * so it never remounts across navigations. Active link via usePathname; its
 * accent auto-themes to the current route.
 */
export function InnerNav() {
  const pathname = usePathname();
  const aboutMode = useAboutMode();
  const [open, setOpen] = useState(false);
  const theme = themeForPath(pathname, aboutMode);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // While the mobile menu is open: lock scroll, move focus into the drawer,
  // trap Tab, close on Escape, and return focus to the toggle on close.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current; // stable; capture for the cleanup closure
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      panelRef.current
        ? Array.from(
            panelRef.current.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          )
        : [];

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);

  // /work, /contact, /craft and /blogs use the home's floating GlassNav, so
  // the inner nav steps aside on those routes.
  if (
    pathname.startsWith("/work") ||
    pathname.startsWith("/contact") ||
    pathname.startsWith("/craft") ||
    pathname.startsWith("/blogs")
  )
    return null;

  return (
    <div className={theme}>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border/60 bg-background/70 px-6 backdrop-blur-md md:h-20 md:px-10">
        <CurtainLink
          href="/"
          aria-label="Marco Hope — home"
          className="group grid h-9 w-9 place-items-center rounded-md border border-foreground/25 font-display text-sm font-bold tracking-tight transition-colors hover:border-accent/60"
        >
          <span className="transition-transform duration-300 group-hover:-rotate-6">
            MH
          </span>
        </CurtainLink>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-7">
            {LINKS.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.href);
              return (
                <CurtainLink
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 ${
                    active
                      ? "text-foreground after:scale-x-100"
                      : "text-foreground/65 after:scale-x-0"
                  }`}
                >
                  {l.label}
                </CurtainLink>
              );
            })}
          </nav>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="inner-menu"
          className="grid h-11 w-11 place-items-center rounded-md border border-foreground/25 text-foreground transition-colors hover:border-accent/60 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile menu (slides in from the right) */}
      <div
        id="inner-menu"
        inert={!open}
        className={`fixed inset-0 z-50 md:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={panelRef}
          className={`absolute right-0 top-0 flex h-full w-[80%] max-w-sm flex-col border-l border-border bg-elevated px-7 pb-10 pt-24 transition-transform duration-500 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-2">
            {LINKS.map((l) => (
              <CurtainLink
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="w-fit font-display text-3xl font-bold text-foreground/85 transition-colors hover:text-accent"
              >
                {l.label}
              </CurtainLink>
            ))}
          </nav>

          <div className="mt-auto">
            <CurtainLink
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.02]"
            >
              Work with me
            </CurtainLink>
          </div>
        </div>
      </div>
    </div>
  );
}
