"use client"

import { motion, useTransform } from "framer-motion"
import { SKY_STOPS } from "@/content/theme"
import { useTrail } from "@/context/trail-context"

const STOP_POSITIONS = SKY_STOPS.map((stop) => stop.at)
const TOP = SKY_STOPS.map((stop) => stop.colors[0])
const MID = SKY_STOPS.map((stop) => stop.colors[1])
const BOTTOM = SKY_STOPS.map((stop) => stop.colors[2])

/**
 * Fixed backdrop for the whole trail. Reads `light` from the trail context, so
 * it runs dawn -> campfire in day mode and night -> sunrise in night mode
 * without knowing which is which.
 */
export default function Sky() {
  const { light } = useTrail()

  const top = useTransform(light, STOP_POSITIONS, TOP)
  const mid = useTransform(light, STOP_POSITIONS, MID)
  const bottom = useTransform(light, STOP_POSITIONS, BOTTOM)

  const gradient = useTransform(
    [top, mid, bottom],
    ([t, m, b]) => `linear-gradient(to bottom, ${t} 0%, ${m} 48%, ${b} 100%)`
  )

  // Firelight, vignette and stars all key off darkness, not scroll direction.
  const warmth = useTransform(light, [0.6, 0.88, 1], [0, 0.22, 0.4])
  const vignette = useTransform(light, [0.68, 1], [0, 0.42])
  const stars = useTransform(light, [0.78, 1], [0, 1])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <motion.div className="absolute inset-0" style={{ background: gradient }} />

      <motion.div className="absolute inset-0" style={{ opacity: stars }}>
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          {STAR_FIELD.map((star, i) => (
            <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="#fdf6e3" opacity={star.o} />
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          opacity: warmth,
          background:
            "radial-gradient(ellipse 90% 55% at 50% 118%, #ff9a4d 0%, #d2622e 35%, transparent 72%)",
          mixBlendMode: "soft-light",
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          opacity: vignette,
          background:
            "radial-gradient(ellipse 85% 70% at 50% 45%, transparent 30%, rgba(9,16,22,0.85) 100%)",
        }}
      />
    </div>
  )
}

// Pre-computed so server and client render identical markup (no Math.random()).
const STAR_FIELD = [
  { x: 6, y: 9, r: 0.22, o: 0.9 }, { x: 14, y: 22, r: 0.15, o: 0.6 },
  { x: 21, y: 6, r: 0.28, o: 1 }, { x: 29, y: 17, r: 0.16, o: 0.7 },
  { x: 34, y: 31, r: 0.2, o: 0.55 }, { x: 41, y: 8, r: 0.24, o: 0.85 },
  { x: 47, y: 25, r: 0.14, o: 0.5 }, { x: 53, y: 13, r: 0.26, o: 0.95 },
  { x: 58, y: 34, r: 0.17, o: 0.6 }, { x: 64, y: 5, r: 0.21, o: 0.8 },
  { x: 69, y: 20, r: 0.15, o: 0.65 }, { x: 74, y: 30, r: 0.25, o: 0.9 },
  { x: 79, y: 11, r: 0.18, o: 0.7 }, { x: 85, y: 24, r: 0.23, o: 0.85 },
  { x: 90, y: 7, r: 0.16, o: 0.6 }, { x: 95, y: 18, r: 0.2, o: 0.75 },
  { x: 11, y: 38, r: 0.13, o: 0.45 }, { x: 26, y: 44, r: 0.19, o: 0.5 },
  { x: 44, y: 40, r: 0.14, o: 0.45 }, { x: 62, y: 46, r: 0.18, o: 0.5 },
  { x: 81, y: 41, r: 0.15, o: 0.45 }, { x: 97, y: 36, r: 0.2, o: 0.6 },
]
