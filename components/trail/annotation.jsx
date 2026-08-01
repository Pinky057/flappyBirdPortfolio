"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-chapter"

/**
 * Hand-drawn callout arrow that draws itself when scrolled into view, with a
 * handwritten label at the tail. This is the annotation language from the
 * infographic reference — use it to point at things and talk about them in a
 * margin voice, not a heading voice.
 *
 * Usage:
 *   <Annotation label="the hard one" direction="down-right" className="…" />
 *
 * Position it with absolute classes on the parent; it draws inside a 200x140 box.
 */

const PATHS = {
  "down-right": "M12,14 C48,26 78,58 106,96",
  "down-left": "M188,14 C152,26 122,58 94,96",
  "up-right": "M12,126 C48,114 78,82 106,44",
  "up-left": "M188,126 C152,114 122,82 94,44",
  right: "M10,70 C58,52 120,52 170,68",
}

const HEADS = {
  "down-right": "M106,96 L92,80 M106,96 L88,98",
  "down-left": "M94,96 L108,80 M94,96 L112,98",
  "up-right": "M106,44 L92,60 M106,44 L88,42",
  "up-left": "M94,44 L108,60 M94,44 L112,42",
  right: "M170,68 L152,58 M170,68 L153,76",
}

const LABEL_POS = {
  "down-right": { x: 4, y: 8, anchor: "start" },
  "down-left": { x: 196, y: 8, anchor: "end" },
  "up-right": { x: 4, y: 134, anchor: "start" },
  "up-left": { x: 196, y: 134, anchor: "end" },
  right: { x: 6, y: 58, anchor: "start" },
}

export default function Annotation({
  label,
  direction = "down-right",
  color = "#52796f",
  className = "",
  delay = 0,
}) {
  const reduced = useReducedMotion()
  const path = PATHS[direction] ?? PATHS["down-right"]
  const head = HEADS[direction] ?? HEADS["down-right"]
  const pos = LABEL_POS[direction] ?? LABEL_POS["down-right"]

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 0.9, ease: "easeInOut", delay }, opacity: { duration: 0.1, delay } },
    },
  }

  return (
    <motion.svg
      viewBox="0 0 200 140"
      className={`pointer-events-none select-none ${className}`}
      initial={reduced ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      aria-hidden="true"
    >
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={draw}
      />
      <motion.path
        d={head}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.25, delay: delay + 0.8 },
          },
        }}
      />
      <motion.text
        x={pos.x}
        y={pos.y}
        textAnchor={pos.anchor}
        fill={color}
        className="font-serif italic"
        style={{ fontSize: "17px" }}
        variants={{
          hidden: { opacity: 0, y: -4 },
          show: { opacity: 1, y: 0, transition: { duration: 0.4, delay: delay + 0.55 } },
        }}
      >
        {label}
      </motion.text>
    </motion.svg>
  )
}
