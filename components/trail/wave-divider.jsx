"use client"

/**
 * Organic transition between trail sections — the soft blob edge from the
 * children's-site reference. Replaces hard card borders: sections should melt
 * into each other, not sit in boxes.
 *
 * `variant` picks the silhouette, `flip` mirrors it vertically so a section can
 * be closed off from above or below.
 */
const SHAPES = {
  soft: "M0,64 C160,112 320,16 480,32 C640,48 800,128 960,128 C1120,128 1280,48 1360,24 L1440,0 L1440,160 L0,160 Z",
  deep: "M0,32 C240,128 480,0 720,48 C960,96 1200,144 1440,80 L1440,160 L0,160 Z",
  gentle: "M0,96 C180,64 360,96 540,104 C720,112 900,80 1080,72 C1260,64 1380,88 1440,96 L1440,160 L0,160 Z",
}

export default function WaveDivider({
  variant = "soft",
  color = "#eef6ea",
  flip = false,
  className = "",
  height = 110,
}) {
  return (
    <div
      className={`relative w-full overflow-hidden leading-[0] pointer-events-none ${className}`}
      style={{ height, transform: flip ? "rotate(180deg)" : undefined }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d={SHAPES[variant] ?? SHAPES.soft} fill={color} />
      </svg>
    </div>
  )
}
