import type { Metadata } from "next";
import { GlassNav } from "@/components/site/GlassNav";
import { AboutExperience } from "@/components/about/AboutExperience";
import { SakuraProfile } from "@/components/about/SakuraProfile";
import { profile } from "@/lib/profile";
import { SITE_URL, SITE_TAGLINE, SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// schema.org Person — helps search engines + AI build a knowledge entity.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.name,
  url: SITE_URL,
  jobTitle: SITE_TAGLINE,
  description: SITE_DESCRIPTION,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  sameAs: [
    profile.links.github,
    profile.links.linkedin,
    profile.links.site,
  ].filter(Boolean),
  knowsAbout: ["UI/UX Design", "Next.js", "React", "TypeScript", "AI engineering"],
};

export default function Home() {
  return (
    <>
      {/* JSON-LD structured data. The < scrub prevents </script> breakout. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {/* No loading screen on home: there's no 3D scene to stream, so the hero
          paints immediately (the loader is kept only on /work and /contact,
          where it masks the Spline scene streaming in). */}
      <GlassNav />
      <main id="main" tabIndex={-1}>
        <AboutExperience>
          <SakuraProfile />
        </AboutExperience>
      </main>
    </>
  );
}
