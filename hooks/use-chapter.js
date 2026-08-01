"use client"

import { useEffect, useState } from "react"

/**
 * Tracks which `[data-chapter]` section owns the middle of the viewport.
 *
 * The -40% root margin shrinks the observation band to the centre third of the
 * screen, so the active chapter changes when a section reaches the middle
 * rather than the instant it peeks over the fold. Feels deliberate instead of
 * twitchy.
 */
export function useChapter(fallback = "intro") {
  const [chapter, setChapter] = useState(fallback)

  useEffect(() => {
    const sections = document.querySelectorAll("[data-chapter]")
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const winner = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (winner) setChapter(winner.target.dataset.chapter)
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.05, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return chapter
}

/** True when the visitor has asked the OS to tone down animation. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(query.matches)

    const onChange = (e) => setReduced(e.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])

  return reduced
}
