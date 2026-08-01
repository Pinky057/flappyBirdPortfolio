"use client"

import Image from "next/image"
import { motion, useTransform } from "framer-motion"
import { useTrail } from "@/context/trail-context"

/**
 * A painted scene that sits behind a section.
 *
 * The campfire art has its dusk lighting and dark vignette baked in, so it only
 * belongs on screen when the trail is actually dark. Tying its opacity to
 * `light` means it fades itself out in night mode — where this same stretch of
 * the walk is bright morning instead — rather than sitting there contradicting
 * the sky.
 */
export default function SceneBackdrop({ src, alt = "", caption, from = 0.5, to = 0.78 }) {
  const { light } = useTrail()

  // A painted scene behind live text was unreadable — the art washed the cards
  // out and the copy disappeared into the grass. It works as a banner instead:
  // full quality, nothing on top of it, and it still keys off the light so the
  // dusk lighting only shows up once the trail is actually dark.
  const opacity = useTransform(light, [from, to], [0.35, 1])

  return (
    <motion.figure
      style={{ opacity }}
      className="relative mb-12 overflow-hidden rounded-[2.5rem]"
    >
      <div className="relative aspect-[21/9] w-full">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 1100px" className="object-cover" />
      </div>

      {caption && (
        <figcaption
          className="absolute bottom-4 left-6 rounded-full px-4 py-2 text-xs font-bold backdrop-blur-sm"
          style={{ background: "color-mix(in srgb, var(--surface) 80%, transparent)", color: "var(--ink-soft)" }}
        >
          {caption}
        </figcaption>
      )}
    </motion.figure>
  )
}
