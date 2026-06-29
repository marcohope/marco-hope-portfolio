"use client";

import { CopyEmail } from "@/components/ui/copy-email";
import { profile } from "@/lib/profile";

const EMAIL = profile.links.email.replace("mailto:", "");

/**
 * Craft-stage wrapper for the {@link CopyEmail} control — the same click-to-copy
 * component shipped on /contact, presented here as an inspectable demo. Centered
 * in the violet stage with a one-line prompt above it.
 */
export function CopyEmailDemo() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground/55">
        Click to copy
      </p>
      <CopyEmail email={EMAIL} />
    </div>
  );
}
