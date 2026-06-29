"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useCurtainNav } from "./RouteCloudCurtain";

/**
 * Drop-in <Link> that routes through the cloud curtain. Interception lives in
 * `onNavigate`, which Next fires ONLY for same-origin SPA navigations — so
 * modifier-clicks (Cmd/Ctrl/middle), external URLs, and downloads are excluded
 * for free. If the curtain declines (reduced-motion, same route, no provider),
 * the link navigates normally.
 */
export function CurtainLink({
  href,
  onNavigate,
  ...rest
}: ComponentProps<typeof Link>) {
  const navigate = useCurtainNav();
  return (
    <Link
      href={href}
      onNavigate={(e) => {
        onNavigate?.(e);
        if (typeof href === "string" && navigate(href)) e.preventDefault();
      }}
      {...rest}
    />
  );
}
