/**
 * Design tokens for the trail.
 *
 * Surfaces are driven by how dark it currently is along the trail, NOT by the
 * day/night toggle directly — in night mode the top of the page is dark and the
 * bottom is bright, so cards must follow the light, not the mode.
 *
 * `components/trail/atmosphere.jsx` interpolates between LIGHT and DARK and
 * writes the result to CSS custom properties on <html>. Everything else just
 * reads var(--surface), var(--ink), etc. That is what makes dark mode a token
 * swap instead of fourteen hand edits.
 */

export const LIGHT = {
  surface: "#fdfcf7",
  surfaceSunk: "#f1f4ea",
  ink: "#2f3e46",
  inkSoft: "#52796f",
  inkFaint: "#84a98c",
  edge: "rgba(47,62,70,0.10)",
  shadow: "rgba(47,62,70,0.16)",
  tape: "rgba(210,196,150,0.55)",
}

export const DARK = {
  surface: "#1f2c34",
  surfaceSunk: "#182129",
  ink: "#edf3ec",
  inkSoft: "#a8c1b0",
  inkFaint: "#7f9c8a",
  edge: "rgba(237,243,236,0.13)",
  shadow: "rgba(0,0,0,0.55)",
  tape: "rgba(120,110,80,0.5)",
}

/**
 * Accents tint only small things — icon chips, tag pills, a corner leaf.
 * Never the card body. That is the rule that keeps fourteen cards feeling like
 * one system while still letting each section have a voice.
 */
export const ACCENTS = {
  leaf: { base: "#5f9e6e", wash: "rgba(95,158,110,0.20)" },
  bark: { base: "#c4884a", wash: "rgba(196,136,74,0.20)" },
  bloom: { base: "#c47bb4", wash: "rgba(196,123,180,0.20)" },
  ember: { base: "#ef8544", wash: "rgba(239,133,68,0.22)" },
  sky: { base: "#5b9fc9", wash: "rgba(91,159,201,0.20)" },
}

/** Deterministic tilts — cards sit like photos laid on a table, not a grid. */
export const TILTS = [-1.4, 0.9, -0.6, 1.3, -1.1, 0.5, 1.0, -0.9]

/**
 * The light arc. 0 = brightest morning, 1 = deepest night.
 * Day mode maps scroll straight onto this; night mode maps it reversed.
 */
export const SKY_STOPS = [
  { at: 0.0, colors: ["#d8ecdc", "#eef6ea", "#f7faf2"] }, // pale dawn canopy
  { at: 0.3, colors: ["#bfe0ef", "#dcefe4", "#f2f7ec"] }, // clear midday
  { at: 0.6, colors: ["#f6d9a8", "#f3e3cd", "#f7efe0"] }, // golden hour
  { at: 0.82, colors: ["#d99a6c", "#b57a68", "#6f5a5e"] }, // dusk
  { at: 1.0, colors: ["#16232e", "#1d2f3b", "#25313a"] }, // night / campfire
]
