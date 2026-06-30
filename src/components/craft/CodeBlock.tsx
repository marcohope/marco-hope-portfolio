"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/**
 * Source viewer with click-to-copy, used on the /craft/[slug] detail pages. The
 * code is read from disk at build and passed in as a string, so it's always the
 * code that actually runs. Copy uses the async Clipboard API with a hidden-
 * textarea fallback, and announces success via a polite aria-live region.
 */
export function CodeBlock({
  code,
  filename,
}: {
  code: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* clipboard unavailable — nothing more we can do */
      }
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-surface">
      <figcaption className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
        <span className="truncate font-mono text-xs text-foreground/55">
          {filename}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied to clipboard" : "Copy code"}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-2.5 py-1 font-mono text-xs text-foreground/70 outline-none transition-colors hover:border-accent/50 hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
        >
          {copied ? (
            <Check aria-hidden className="h-3.5 w-3.5 text-accent" />
          ) : (
            <Copy aria-hidden className="h-3.5 w-3.5" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-relaxed text-foreground/85">
        <code>{code}</code>
      </pre>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </figure>
  );
}
