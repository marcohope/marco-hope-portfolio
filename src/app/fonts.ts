import { Archivo, Space_Grotesk, Instrument_Serif } from "next/font/google";

// Variable fonts: omit `weight` to load the full axis (gives us 400–900 for Archivo).
export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo", // display / headings
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk", // body / UI
});

// Single-weight serif (no variable axis) — the glass-nav wordmark.
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif", // serif wordmark
});
