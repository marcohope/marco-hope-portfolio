import { TECH_ICONS } from "./tech-icons.generated";

type Props = {
  slug: string;
  className?: string;
  title?: string;
};

/** Monochrome brand glyph (currentColor) from the generated simple-icons data. */
export function TechIcon({ slug, className, title }: Props) {
  const icon = TECH_ICONS[slug];
  if (!icon) return null;
  const label = title ?? icon.title;
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={label}
      className={className}
      fill="currentColor"
      focusable="false"
    >
      <title>{label}</title>
      <path d={icon.path} />
    </svg>
  );
}
