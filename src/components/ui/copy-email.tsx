"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

/** Copy `text` to the clipboard. Prefers the async Clipboard API and falls back
 *  to a hidden-textarea + execCommand where it's unavailable (older / insecure
 *  contexts). Returns whether the copy succeeded. */
async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Click-to-copy email control. Copies the address to the clipboard, then flips
 * from "Copy" to a "Copied!" confirmation (with a small GSAP pop on the icon)
 * for ~1.6s before settling back. The address stays selectable for manual
 * copy, the result is announced politely for screen readers, and reduced motion
 * drops the pop to an instant swap.
 */
export function CopyEmail({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);
  const timer = useRef(0);

  // Clear the pending reset timer if the control unmounts mid-confirmation.
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    const ok = await writeClipboard(email);
    if (!ok) return;
    setCopied(true);
    if (!prefersReducedMotion() && iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0.5 },
        { scale: 1, duration: 0.45, ease: "back.out(3)" },
      );
    }
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  }, [email]);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={
        copied ? "Email address copied" : `Copy email address ${email}`
      }
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-sm text-foreground/75 backdrop-blur-md transition-colors hover:border-white/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-0",
        className,
      )}
    >
      <span className="select-all">{email}</span>
      <span
        ref={iconRef}
        aria-hidden
        className="grid h-4 w-4 shrink-0 place-items-center"
      >
        {copied ? (
          <Check className="h-4 w-4 text-accent" />
        ) : (
          <Copy className="h-4 w-4 text-foreground/55 transition-colors group-hover:text-accent" />
        )}
      </span>
      {/* Polite live region so the copy result is announced without stealing focus. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
