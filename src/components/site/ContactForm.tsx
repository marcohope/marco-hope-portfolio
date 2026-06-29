"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Check } from "lucide-react";
import { profile } from "@/lib/profile";

const FIELD =
  "w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none transition focus:border-accent/60 focus:ring-2 focus:ring-ring/40";

/**
 * Design-ready contact form. No backend yet — on submit it composes a mailto:
 * (so it works today). Includes a honeypot. Swap to a real handler later.
 * The result is announced via an aria-live region and the button recovers so the
 * form never sits in a frozen "sent?" state.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const timer = useRef<number | null>(null);
  const addr = profile.links.email.replace("mailto:", "");

  // Clear the pending reset timer if the form unmounts mid-cycle.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get("company")) return; // honeypot — bots fill this hidden field
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!message) return;

    const subject = encodeURIComponent(
      `Portfolio message${name ? ` from ${name}` : ""}`,
    );
    const body = encodeURIComponent(
      `${message}\n\n— ${name || "Anonymous"}${email ? ` (${email})` : ""}`,
    );
    window.location.href = `mailto:${addr}?subject=${subject}&body=${body}`;
    setSent(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSent(false), 6000);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* honeypot (hidden from humans) */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground/80">
          Name
          <input name="name" type="text" required placeholder="Your name" className={FIELD} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-foreground/80">
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="you@email.com"
            className={FIELD}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm font-medium text-foreground/80">
        Message
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What are you building?"
          className={`${FIELD} resize-none`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:scale-[1.02]"
        >
          {sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
          {sent ? "Opening your mail app" : "Send message"}
        </button>
        <span className="text-xs text-foreground/45">Opens your email client.</span>
      </div>

      {/* Announced to assistive tech; reserves height so layout doesn't jump. */}
      <p
        role="status"
        aria-live="polite"
        className="min-h-[1.25rem] text-sm text-accent"
      >
        {sent
          ? `Your mail app should be opening. If nothing happened, email me directly at ${addr}.`
          : ""}
      </p>
    </form>
  );
}
