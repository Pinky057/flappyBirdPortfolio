"use client"

import { motion } from "framer-motion"
import { ACCENTS, TILTS } from "@/content/theme"
import { useReducedMotion } from "@/hooks/use-chapter"

/**
 * The one card in the system.
 *
 * Rules that keep fourteen cards feeling like one site:
 *   - a single surface colour, taken from the atmosphere CSS vars
 *   - no borders; depth comes from shadow and a hairline top highlight
 *   - `accent` tints only small things (chips, pills, the corner leaf),
 *     never the card body
 *
 * Personality comes from behaviour rather than colour: each card sits at a
 * slight deterministic tilt, like a photo laid on a table, and straightens
 * itself when you hover it.
 */
export default function Card({
  children,
  accent = "leaf",
  seed = 0,
  tape = false,
  leaf = false,
  interactive = true,
  className = "",
  as = "div",
  ...rest
}) {
  const reduced = useReducedMotion()
  const tone = ACCENTS[accent] ?? ACCENTS.leaf
  const tilt = reduced ? 0 : TILTS[seed % TILTS.length]

  const Component = motion[as] ?? motion.div

  return (
    <Component
      initial={{ opacity: 0, y: 26, rotate: tilt }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={
        interactive && !reduced
          ? { rotate: 0, y: -8, transition: { type: "spring", stiffness: 260, damping: 20 } }
          : undefined
      }
      className={
        "relative rounded-[2rem] p-6 md:p-8 " +
        "shadow-[0_10px_30px_-14px_var(--accent-shadow)] " +
        "transition-shadow duration-300 hover:shadow-[0_28px_54px_-18px_var(--accent-shadow)] " +
        className
      }
      style={{
        // A single flat off-white for every card read as dull. The accent is
        // now mixed into the surface itself at low strength and into the
        // shadow — enough chroma to tell the cards apart, low enough saturation
        // that they still read as one system.
        background:
          "linear-gradient(160deg," +
          " color-mix(in srgb, var(--surface) 97%, #fff 3%) 0%," +
          " color-mix(in srgb, var(--surface) 91%, var(--accent) 9%) 100%)",
        color: "var(--ink)",
        "--accent": tone.base,
        "--accent-wash": tone.wash,
        // Readable in both palettes: pulls the accent toward whichever ink is
        // currently active, so it darkens by day and lightens at night.
        "--accent-text": `color-mix(in srgb, ${tone.base} 58%, var(--ink) 42%)`,
        "--accent-shadow": `color-mix(in srgb, ${tone.base} 40%, var(--shadow))`,
      }}
      {...rest}
    >
      {/* Hairline top highlight — reads as a lit edge instead of a border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px rounded-full"
        style={{ background: "var(--edge)" }}
      />

      {tape && <Tape />}
      {leaf && <CornerLeaf />}

      {children}
    </Component>
  )
}

/** Strip of washi tape, for cards that should feel pinned into a journal. */
function Tape() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-3 left-8 h-7 w-24 -rotate-6 rounded-[2px]"
      style={{
        background: "var(--tape)",
        boxShadow: "0 2px 6px -2px var(--shadow)",
      }}
    />
  )
}

/** Pressed leaf in the corner, tinted by the card's accent. */
function CornerLeaf() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="pointer-events-none absolute -right-2 -top-2 h-10 w-10 -rotate-12"
      fill="var(--accent)"
      opacity="0.85"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2A7 7 0 0 1 11 20Z" />
    </svg>
  )
}

/** Small tinted pill for tech tags. Uses only the accent wash, never a body colour. */
export function Tag({ children }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-bold"
      style={{ background: "var(--accent-wash)", color: "var(--accent-text)" }}
    >
      {children}
    </span>
  )
}

/** Icon chip — the one place an accent gets to be loud. */
export function Chip({ children, className = "" }) {
  return (
    <span
      className={
        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-2xl " +
        className
      }
      style={{ background: "var(--accent-wash)" }}
    >
      {children}
    </span>
  )
}
