import type { DetailedHTMLProps, HTMLAttributes } from "react";

// The Spline web component (<spline-viewer>) loaded from the CDN.
type SplineViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  url?: string;
  "loading-anim-type"?: string;
  "events-target"?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": SplineViewerAttributes;
    }
  }
}
