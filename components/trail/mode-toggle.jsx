"use client"

import { motion } from "framer-motion"
import { useTrail } from "@/context/trail-context"

/**
 * Swings the sun and moon around a pivot. Because the mode flips the direction
 * of the whole arc, the label says where the walk *ends* rather than what
 * colour scheme is active.
 */
export default function ModeToggle() {
  const { mode, toggle, mounted } = useTrail()
  const isNight = mode === "night"

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isNight}
      aria-label={
        isNight
          ? "Night walk: scrolling down leads to sunrise. Switch to a day walk."
          : "Day walk: scrolling down leads to the campfire. Switch to a night walk."
      }
      title={isNight ? "Walking out at sunrise" : "Walking in to the campfire"}
      className="group relative flex h-11 items-center gap-2 rounded-full pl-2 pr-4
                 shadow-[0_6px_18px_-8px_var(--shadow)] transition-shadow
                 hover:shadow-[0_10px_26px_-10px_var(--shadow)]"
      style={{ background: "var(--surface)", color: "var(--ink)" }}
    >
      {/* Pendulum */}
      <span className="relative block h-8 w-8 overflow-hidden rounded-full" style={{ background: "var(--surface-sunk)" }}>
        <motion.span
          className="absolute left-1/2 top-1/2 block h-8 w-8 -translate-x-1/2"
          style={{ transformOrigin: "50% 0%" }}
          animate={{ rotate: isNight ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          {/* Sun hangs below the pivot */}
          <span className="absolute left-1/2 top-[3px] h-[15px] w-[15px] -translate-x-1/2 rounded-full bg-[#f2b544]" />
          {/* Moon sits opposite, swings in when night is chosen */}
          <span className="absolute left-1/2 top-[-18px] h-[15px] w-[15px] -translate-x-1/2 rotate-180 rounded-full bg-[#dfe7f2]">
            <span
              className="absolute right-[-3px] top-[-3px] h-[13px] w-[13px] rounded-full"
              style={{ background: "var(--surface-sunk)" }}
            />
          </span>
        </motion.span>
      </span>

      <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: "var(--ink-soft)" }}>
        {mounted ? (isNight ? "Sunrise" : "Campfire") : "        "}
      </span>
    </button>
  )
}
