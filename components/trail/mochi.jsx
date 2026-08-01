"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-chapter"

/**
 * Mochi — the cat. Trails the cursor lazily, sits down when it stops, and curls
 * up asleep after 12s of stillness. Pure CSS/SVG so she costs nothing and works
 * before the real art exists.
 *
 * Deliberately slow: a cat that snaps to the cursor reads as a cursor effect,
 * a cat that arrives late reads as an animal.
 */
export default function Mochi() {
  const reduced = useReducedMotion()
  const [state, setState] = useState("sit") // walk | sit | sleep
  const idleTimer = useRef(null)
  const sleepTimer = useRef(null)

  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 28, damping: 16, mass: 1.4 })
  const sy = useSpring(y, { stiffness: 28, damping: 16, mass: 1.4 })

  useEffect(() => {
    if (reduced) return

    const onMove = (e) => {
      // Hang back and below, like something following rather than attached.
      x.set(e.clientX - 70)
      y.set(e.clientY + 26)
      setState("walk")

      clearTimeout(idleTimer.current)
      clearTimeout(sleepTimer.current)
      idleTimer.current = setTimeout(() => setState("sit"), 900)
      sleepTimer.current = setTimeout(() => setState("sleep"), 12000)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", onMove)
      clearTimeout(idleTimer.current)
      clearTimeout(sleepTimer.current)
    }
  }, [reduced, x, y])

  if (reduced) return null

  return (
    <motion.div
      className="pointer-events-none fixed z-40 hidden md:block"
      style={{ x: sx, y: sy, top: 0, left: 0 }}
      aria-hidden="true"
    >
      <motion.div
        animate={
          state === "walk"
            ? { rotate: [-3, 3, -3], y: [0, -2, 0] }
            : state === "sleep"
              ? { rotate: 0, scaleY: 0.82 }
              : { rotate: 0, scaleY: 1 }
        }
        transition={
          state === "walk"
            ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.6, ease: "easeOut" }
        }
        className="relative"
      >
        <CatSvg asleep={state === "sleep"} />

        {/* Sleep z's */}
        {state === "sleep" && (
          <div className="absolute -top-3 left-9">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute font-serif font-bold text-[#84a98c]"
                style={{ fontSize: 11 + i * 3 }}
                animate={{ opacity: [0, 1, 0], y: [-2, -18], x: [0, 8] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.8 }}
              >
                z
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function CatSvg({ asleep }) {
  return (
    <svg width="54" height="42" viewBox="0 0 54 42" fill="none">
      {/* tail */}
      <motion.path
        d="M6 30 C-2 28 0 18 8 20"
        stroke="#e8a866"
        strokeWidth="4"
        strokeLinecap="round"
        animate={asleep ? {} : { rotate: [0, -12, 0] }}
        style={{ originX: "8px", originY: "26px" }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* body */}
      <ellipse cx="24" cy="28" rx="17" ry="11" fill="#f2c894" />
      <ellipse cx="24" cy="28" rx="17" ry="11" fill="none" stroke="#c98b4b" strokeWidth="1.5" />
      {/* stripes */}
      <path d="M18 20 L17 26 M25 19 L24 25 M32 21 L31 27" stroke="#e0a469" strokeWidth="2.5" strokeLinecap="round" />
      {/* head */}
      <circle cx="40" cy="22" r="11" fill="#f7d7ab" stroke="#c98b4b" strokeWidth="1.5" />
      {/* ears */}
      <path d="M32 15 L33 6 L41 12 Z" fill="#f7d7ab" stroke="#c98b4b" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M46 11 L50 4 L51 14 Z" fill="#f7d7ab" stroke="#c98b4b" strokeWidth="1.5" strokeLinejoin="round" />
      {/* eyes */}
      {asleep ? (
        <>
          <path d="M35 22 Q37.5 24.5 40 22" stroke="#4a3520" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M43 22 Q45 24 47 22" stroke="#4a3520" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="37" cy="21" r="2.2" fill="#4a3520" />
          <circle cx="45" cy="21" r="2.2" fill="#4a3520" />
        </>
      )}
      {/* nose + whiskers */}
      <path d="M41 26 L40 27.5 L42 27.5 Z" fill="#d98b8b" />
      <path d="M31 24 L26 23 M31 27 L26 28 M51 24 L54 23 M51 27 L54 28" stroke="#c98b4b" strokeWidth="1" strokeLinecap="round" />
      {/* paws */}
      <ellipse cx="17" cy="38" rx="4" ry="3" fill="#fdf0dc" stroke="#c98b4b" strokeWidth="1.2" />
      <ellipse cx="29" cy="38" rx="4" ry="3" fill="#fdf0dc" stroke="#c98b4b" strokeWidth="1.2" />
    </svg>
  )
}
