"use client"

import { useEffect } from "react"
import { useTransform } from "framer-motion"
import { DARK, LIGHT } from "@/content/theme"
import { useTrail } from "@/context/trail-context"

const TOKENS = Object.keys(LIGHT)

/**
 * Interpolates every design token between the light and dark palettes as the
 * trail darkens, then writes the result to CSS custom properties on <html>.
 *
 * Cards, nav and text all read those variables, so the entire site changes
 * temperature from one place — and it follows the *light along the trail*, not
 * the toggle, which is what makes the reversed night arc work.
 */
export default function Atmosphere() {
  const { darkness } = useTrail()

  // One motion value per token, interpolating LIGHT -> DARK.
  const values = TOKENS.map((token) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks -- TOKENS is a module constant, so order is stable
    useTransform(darkness, [0, 1], [LIGHT[token], DARK[token]])
  )

  useEffect(() => {
    const root = document.documentElement

    const write = (token, value) => root.style.setProperty(`--${kebab(token)}`, value)

    // Paint once immediately so there is no flash before the first scroll.
    TOKENS.forEach((token, i) => write(token, values[i].get()))

    const unsubscribers = values.map((value, i) =>
      value.on("change", (v) => write(TOKENS[i], v))
    )

    return () => unsubscribers.forEach((stop) => stop())
  }, [values])

  return null
}

function kebab(s) {
  return s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)
}
