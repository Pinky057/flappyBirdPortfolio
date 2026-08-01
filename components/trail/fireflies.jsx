"use client"

import { motion, useTransform } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-chapter"
import { useTrail } from "@/context/trail-context"

/**
 * Fireflies that only exist after dusk. Tied to scroll progress so they fade in
 * as the trail reaches the campfire and never appear during the daylight
 * sections.
 */
export default function Fireflies({ count = 18 }) {
  const { light } = useTrail()
  const reduced = useReducedMotion()

  const opacity = useTransform(light, [0.68, 0.88], [0, 1])

  if (reduced) return null

  return (
    <motion.div
      className="fixed inset-0 -z-[8] pointer-events-none overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      {FLY_SEEDS.slice(0, count).map((fly, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#ffe08a]"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            width: fly.size,
            height: fly.size,
            boxShadow: `0 0 ${fly.size * 3}px ${fly.size}px rgba(255,214,122,0.55)`,
          }}
          animate={{
            x: [0, fly.dx, -fly.dx * 0.6, 0],
            y: [0, -fly.dy, -fly.dy * 1.7, 0],
            opacity: [0.15, 1, 0.35, 0.15],
          }}
          transition={{
            duration: fly.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: fly.delay,
          }}
        />
      ))}
    </motion.div>
  )
}

// Deterministic so SSR and client markup match.
const FLY_SEEDS = [
  { x: 8, y: 72, size: 4, dx: 40, dy: 60, dur: 9, delay: 0 },
  { x: 17, y: 55, size: 3, dx: -30, dy: 80, dur: 11, delay: 1.2 },
  { x: 24, y: 84, size: 5, dx: 55, dy: 45, dur: 8, delay: 0.6 },
  { x: 33, y: 63, size: 3, dx: -45, dy: 70, dur: 12, delay: 2.1 },
  { x: 41, y: 78, size: 4, dx: 35, dy: 55, dur: 10, delay: 0.3 },
  { x: 48, y: 58, size: 3, dx: -25, dy: 90, dur: 13, delay: 1.8 },
  { x: 55, y: 88, size: 5, dx: 50, dy: 40, dur: 9, delay: 2.6 },
  { x: 62, y: 66, size: 3, dx: -38, dy: 75, dur: 11, delay: 0.9 },
  { x: 70, y: 80, size: 4, dx: 42, dy: 58, dur: 10, delay: 1.5 },
  { x: 77, y: 60, size: 3, dx: -32, dy: 85, dur: 12, delay: 3.1 },
  { x: 84, y: 86, size: 5, dx: 48, dy: 42, dur: 8, delay: 0.4 },
  { x: 91, y: 68, size: 3, dx: -28, dy: 78, dur: 13, delay: 2.3 },
  { x: 12, y: 92, size: 4, dx: 36, dy: 50, dur: 10, delay: 1.1 },
  { x: 29, y: 45, size: 3, dx: -40, dy: 95, dur: 14, delay: 2.9 },
  { x: 46, y: 94, size: 5, dx: 52, dy: 38, dur: 9, delay: 0.7 },
  { x: 66, y: 48, size: 3, dx: -35, dy: 88, dur: 12, delay: 1.9 },
  { x: 88, y: 52, size: 4, dx: 44, dy: 66, dur: 11, delay: 2.4 },
  { x: 96, y: 90, size: 3, dx: -22, dy: 72, dur: 13, delay: 0.2 },
]
