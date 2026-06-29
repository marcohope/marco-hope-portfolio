/** Shared section eyebrow: a 1px accent rule + uppercase tracked label.
 *  Used verbatim across every page so the system reads as one. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-foreground/60 ${className}`}
    >
      <span className="inline-block h-px w-6 bg-accent" aria-hidden />
      {children}
    </p>
  );
}
