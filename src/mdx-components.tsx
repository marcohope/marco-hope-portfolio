import type { MDXComponents } from "mdx/types";

/**
 * Global MDX element styling for the /blogs essays. Maps markdown's native
 * HTML to the site's tokens (font-display headings, foreground/accent ink,
 * surface code blocks) so posts read like the rest of the site without the
 * Tailwind typography plugin. Authored content lives in src/content/blogs/*.
 * Required by @next/mdx with the App Router.
 */
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-14 scroll-mt-24 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-10 font-display text-xl font-bold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 text-[1.05rem] leading-[1.75] text-foreground/80">
      {children}
    </p>
  ),
  a: ({ href, children }) => {
    const external = !!href && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="font-medium text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mt-5 list-disc space-y-2.5 pl-5 text-[1.05rem] leading-[1.7] text-foreground/80 marker:text-accent">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-[1.05rem] leading-[1.7] text-foreground/80 marker:text-foreground/45">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1.5">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-7 border-l-2 border-accent/50 pl-5 text-[1.05rem] italic leading-[1.7] text-foreground/70">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-border" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-foreground/90">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface p-5 font-mono text-sm leading-relaxed text-foreground/85 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0">
      {children}
    </pre>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
