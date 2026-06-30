/** Seeded PRNG so a generated star pattern is byte-identical on server + client
 *  — no hydration mismatch, no first-paint pop. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A tiled field of stars as a list of radial-gradient dots (rounded ints →
 * SSR-safe). Used by CosmicParallaxBg (/craft), which owns its own layer tuning
 * (count/tile/duration), but the SSR-safe generation lives here so the rounding
 * + alpha logic is maintained in one place.
 */
export function starField(count: number, tile: number, seed: number, dot: number) {
  const rnd = mulberry32(seed);
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round(rnd() * tile);
    const y = Math.round(rnd() * tile);
    const a = (0.35 + Math.round(rnd() * 55) / 100).toFixed(2);
    parts.push(
      `radial-gradient(${dot}px ${dot}px at ${x}px ${y}px, rgba(255,255,255,${a}), transparent)`,
    );
  }
  return parts.join(", ");
}
