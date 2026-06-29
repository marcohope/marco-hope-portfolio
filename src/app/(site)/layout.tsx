import { InnerNav } from "@/components/site/InnerNav";
import { RouteCloudCurtain } from "@/components/transition/RouteCloudCurtain";

/**
 * Shared skeleton for the inner routes (/work, /about, /contact). The nav
 * persists across navigations (layouts don't remount); each page paints its
 * own theme + background inside <main>.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteCloudCurtain>
      <InnerNav />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
    </RouteCloudCurtain>
  );
}
