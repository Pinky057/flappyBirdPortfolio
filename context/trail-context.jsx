"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useScroll, useTransform } from "framer-motion"

/**
 * The trail's single source of truth for time-of-day.
 *
 * `mode` chooses the DIRECTION of the arc rather than a flat colour scheme:
 *
 *   day   — scrolling down goes dawn -> golden -> campfire night
 *   night — scrolling down goes night -> pre-dawn -> bright morning
 *
 * Both are the same walk told in opposite directions, which is why the toggle
 * reads as a story choice instead of a settings switch. Everything downstream
 * consumes `light` (0 = brightest, 1 = darkest), never `mode` directly.
 */
const TrailContext = createContext(null)

const STORAGE_KEY = "pinky-trail-mode"

export function TrailProvider({ children }) {
  const [mode, setMode] = useState("day")
  const [mounted, setMounted] = useState(false)

  // Resolve the stored preference after mount so SSR and first paint agree.
  useEffect(() => {
    let initial = null
    try {
      initial = window.localStorage.getItem(STORAGE_KEY)
    } catch {
      /* private mode — fall through to the media query */
    }

    if (initial !== "day" && initial !== "night") {
      initial = window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day"
    }

    setMode(initial)
    setMounted(true)
  }, [])

  const toggle = () => {
    setMode((prev) => {
      const next = prev === "day" ? "night" : "day"
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* not fatal — the mode just won't persist */
      }
      return next
    })
  }

  const { scrollYProgress } = useScroll()

  // 0 = brightest point of the arc, 1 = deepest night.
  const light = useTransform(scrollYProgress, (p) => (mode === "day" ? p : 1 - p))

  // How dark the *surfaces* should be.
  //
  // This deliberately does NOT track the sky smoothly. Crossfading a near-white
  // surface to a near-black one passes through grey, and any scroll position
  // parked mid-fade renders every card as mud. The sky can afford a long
  // gradient because its midpoints (golden hour, dusk) are colours we want;
  // a card's midpoint is just a dead grey.
  //
  // So: hold light, flip over a short band, hold dark. The extra stops keep the
  // ends flat and spend as little time as possible in between.
  const darkness = useTransform(
    light,
    [0.7, 0.76, 0.8, 0.86],
    [0, 0.04, 0.96, 1],
    { clamp: true }
  )

  const value = useMemo(
    () => ({ mode, setMode, toggle, mounted, scrollYProgress, light, darkness }),
    [mode, mounted, scrollYProgress, light, darkness]
  )

  return <TrailContext.Provider value={value}>{children}</TrailContext.Provider>
}

export function useTrail() {
  const ctx = useContext(TrailContext)
  if (!ctx) throw new Error("useTrail must be used inside <TrailProvider>")
  return ctx
}
