"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny external store for the /about day↔night toggle. It lives in a module
 * (not React context) so the *persistent* InnerNav — which sits in (site)/layout,
 * a separate part of the tree from the About page — can read the same mode and
 * theme its accent surface to match, without prop-drilling across the server
 * layout boundary. Both subscribe via `useAboutMode()`.
 */
export type AboutMode = "day" | "night";

const STORAGE_KEY = "about-mode";
const DEFAULT: AboutMode = "day";

let mode: AboutMode = DEFAULT;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function setAboutMode(next: AboutMode) {
  if (next === mode) return;
  mode = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode / storage disabled — non-fatal */
  }
  emit();
}

export function toggleAboutMode() {
  setAboutMode(mode === "day" ? "night" : "day");
}

/**
 * Pull a persisted preference into the store. Called from an effect (never
 * during render) so the first client render still matches the server snapshot
 * ("day") and hydration stays clean; the crossfade makes any correction graceful.
 */
export function hydrateAboutMode() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "day" || stored === "night") setAboutMode(stored);
  } catch {
    /* ignore */
  }
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot(): AboutMode {
  return mode;
}

function getServerSnapshot(): AboutMode {
  return DEFAULT;
}

export function useAboutMode(): AboutMode {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
