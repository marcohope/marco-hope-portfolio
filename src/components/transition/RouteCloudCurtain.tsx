"use client";

import { createContext, useContext } from "react";

// The cloud route-transition curtain has been removed. This stays as a thin
// pass-through so the (site) layout and CurtainLink don't need rewiring: the
// nav context now always declines, so links fall back to instant SPA nav.
const CurtainCtx = createContext<(href: string) => boolean>(() => false);
export const useCurtainNav = () => useContext(CurtainCtx);

export function RouteCloudCurtain({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
