// Single source of truth for the sakura petal silhouette. Shared by the ambient
// drifting field (CherryPetals) and the Journey branch — its blossoms are built
// from this same shape, and its finale storm releases these exact petals into
// the field, so "the branch you grew is the source of the site's petals" is
// literally true rather than two look-alike systems.

/** A single sakura petal with a soft notch at the wide (top) end. */
export const PETAL_PATH =
  "M10 24 C2 16 2.5 6 7.5 1.2 C8.8 0 8.2 3.2 10 3.8 C11.8 3.2 11.2 0 12.5 1.2 C17.5 6 18 16 10 24 Z";

/** viewBox the petal silhouette is drawn in. */
export const PETAL_VIEWBOX = "0 0 20 24";

/** The petal's narrow base ("tip") in PETAL_PATH coords — the point that sits at
 *  a blossom's centre when petals are arranged radially. */
const PETAL_TIP: readonly [number, number] = [10, 24];

const round = (n: number) => Math.round(n * 100) / 100;

/** Map every absolute coordinate pair in a path of only M/C/Z commands through
 *  `fn`, preserving command letters. (PETAL_PATH is all absolute M/C/Z, so every
 *  number is one half of an x,y pair — no per-command arithmetic needed.) */
function mapPathPairs(
  d: string,
  fn: (x: number, y: number) => [number, number],
): string {
  const tokens = d.match(/([a-zA-Z])|(-?\d*\.?\d+)/g) ?? [];
  const out: (string | number)[] = [];
  let pendingX: number | null = null;
  for (const t of tokens) {
    if (/[a-zA-Z]/.test(t)) {
      out.push(t);
      continue;
    }
    const n = parseFloat(t);
    if (pendingX === null) {
      pendingX = n;
    } else {
      const [x, y] = fn(pendingX, n);
      out.push(round(x), round(y));
      pendingX = null;
    }
  }
  return out.join(" ");
}

/** One petal placed with its base at (cx,cy), pointing outward at `angleDeg`
 *  (0° = up), scaled by `scale`, in the target SVG's user units. */
export function petalPath(
  cx: number,
  cy: number,
  angleDeg: number,
  scale: number,
): string {
  const a = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return mapPathPairs(PETAL_PATH, (x, y) => {
    // Recentre so the petal's base sits at the origin (wide end points up, −Y),
    // scale, rotate to the slot angle, then translate to the blossom centre.
    const lx = (x - PETAL_TIP[0]) * scale;
    const ly = (y - PETAL_TIP[1]) * scale;
    return [cx + (lx * cos - ly * sin), cy + (lx * sin + ly * cos)];
  });
}

/** Five petals radiating from (cx,cy) — one sakura blossom. */
export function blossomPetalPaths(
  cx: number,
  cy: number,
  scale: number,
): string[] {
  return Array.from({ length: 5 }, (_, i) => petalPath(cx, cy, i * 72, scale));
}
