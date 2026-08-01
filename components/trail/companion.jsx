"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { CHAPTERS } from "@/content/chapters"
import { useChapter, useReducedMotion } from "@/hooks/use-chapter"

/**
 * Pinky walks the trail with the reader: a fixed companion that swaps pose and
 * speech as each chapter takes the centre of the viewport.
 *
 * Poses currently reuse the three existing cutouts as placeholders. Drop the
 * real art into /public/poses/ and only this map needs to change.
 */
const POSE_SRC = {
  wave: "/poses/wave.webp",
  peek: "/poses/peek.webp",
  think: "/poses/think.webp",
  point: "/poses/point.webp",
  rest: "/poses/rest.webp",
}

// Until the full set exists, unmapped poses fall back to art we already have.
const POSE_FALLBACK = {
  wave: "/chibi-game watching .webp",
  peek: "/chibi-game watching .webp",
  think: "/chibi-game watching .webp",
  point: "/chibi-game watching .webp",
  rest: "/chibi-game watching .webp",
}

export default function Companion() {
  const chapter = useChapter()
  const reduced = useReducedMotion()
  const { pose, lines } = CHAPTERS[chapter] ?? CHAPTERS.intro

  // Night chapters get a warm rim light so she reads against the dark sky.
  const isNight = chapter === "hobbies" || chapter === "contact"

  return (
    <div
      className="fixed bottom-3 left-3 z-50 flex items-end gap-2 pointer-events-none
                 md:bottom-8 md:left-8 md:gap-4"
    >
      {/* Character */}
      <motion.div
        key={pose}
        initial={reduced ? false : { opacity: 0, y: 24, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 130, damping: 17 }}
        className="relative w-[110px] h-[110px] flex-shrink-0 md:w-[180px] md:h-[180px]"
      >
        <motion.div
          className="relative w-full h-full"
          animate={reduced ? {} : { y: [0, -7, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={POSE_SRC[pose] ?? POSE_FALLBACK[pose] ?? POSE_FALLBACK.wave}
            alt=""
            fill
            sizes="180px"
            className={
              "object-contain object-bottom " +
              (isNight
                ? "drop-shadow-[0_0_18px_rgba(255,154,77,0.45)]"
                : "drop-shadow-[0_10px_18px_rgba(47,62,70,0.22)]")
            }
            priority
          />
        </motion.div>
      </motion.div>

      {/* Speech bubble — the narration */}
      <AnimatePresence mode="wait">
        <motion.div
          key={chapter}
          initial={reduced ? false : { opacity: 0, x: -14, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, x: -14, scale: 0.96 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="relative mb-6 max-w-[210px] rounded-[1.6rem] bg-[#fdfcf7]/95 px-4 py-3
                     shadow-[0_10px_30px_rgba(23,35,46,0.18)] backdrop-blur-sm
                     md:mb-10 md:max-w-[330px] md:px-6 md:py-5"
        >
          {/* Bubble tail */}
          <span
            className="absolute top-1/2 -left-[10px] h-0 w-0 -translate-y-1/2
                       border-y-[9px] border-r-[12px] border-y-transparent border-r-[#fdfcf7]
                       md:-left-[12px] md:border-y-[11px] md:border-r-[14px]"
          />
          {lines.map((line, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "font-serif text-[15px] font-bold leading-snug text-[#2f3e46] md:text-[19px]"
                  : "mt-1.5 text-[12px] font-medium leading-snug text-[#52796f] md:mt-2 md:text-[15px]"
              }
            >
              {line}
            </p>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
