"use client"

import Image from "next/image"
import { motion } from "framer-motion"

/**
 * Full-bleed hero.
 *
 * The old header pasted an opaque PNG into the top-right corner, so its white
 * left edge cut a hard vertical seam across the page — and the name was baked
 * into the image, which meant it was unselectable, invisible to search engines
 * and uncontrollable on small screens.
 *
 * Now the scene art is keyed and bleeds off the right edge, and the name is
 * real text on the left.
 */
export default function Hero() {
  return (
    <section
      id="top"
      data-chapter="intro"
      className="relative flex min-h-[92vh] w-full items-center overflow-hidden"
    >
      {/* Scene art, full-bleed.
          Cropping this to a right-hand column sliced the canopy down the middle
          and left a visible vertical edge. Keeping the full plate and keying the
          white out instead means the only boundary is the painted grass curve,
          so there is nothing to blend — the empty left of the plate simply is
          the sky, and the copy sits on it. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/hero/scene.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right-top"
        />
      </div>

      {/* Name + intro, as actual text */}
      <div className="relative z-10 w-full max-w-6xl px-6 pt-24 md:px-12 md:pt-16">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-2 flex items-center gap-2 text-base font-medium md:text-lg"
          style={{ color: "var(--ink-soft)" }}
        >
          Hi there, I&apos;m
          <Leaf />
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="font-serif text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ color: "var(--ink)" }}
        >
          Ishrat{" "}
          <span style={{ color: "#4b7f4e" }}>Pinky</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-6 max-w-md text-lg font-medium leading-relaxed md:text-xl"
          style={{ color: "var(--ink-soft)" }}
        >
          Full-stack developer. I care most about the part people actually touch.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="rounded-full px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-transform hover:-translate-y-0.5"
            style={{ background: "#3f6b47", boxShadow: "0 10px 24px -10px var(--shadow)" }}
          >
            See the work
          </a>
          <a
            href="#person"
            className="rounded-full px-7 py-3.5 text-sm font-bold tracking-wide transition-transform hover:-translate-y-0.5"
            style={{ background: "var(--surface)", color: "var(--ink)", boxShadow: "0 10px 24px -12px var(--shadow)" }}
          >
            Or skip to the campfire
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        animate={{ y: [0, 9, 0], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="var(--ink-soft)" strokeWidth="2" />
          <circle cx="11" cy="10" r="3" fill="var(--ink-soft)" />
        </svg>
      </motion.div>
    </section>
  )
}

function Leaf() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#4b7f4e" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.2A7 7 0 0 1 11 20Z" />
    </svg>
  )
}
