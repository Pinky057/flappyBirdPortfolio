"use client"

import { motion } from "framer-motion"
import { useChapter } from "@/hooks/use-chapter"
import ModeToggle from "./mode-toggle"

/**
 * Sticky trail sign.
 *
 * The old nav painted sage text straight onto the page, so its contrast changed
 * depending on whether it happened to be over sky or over the header art — some
 * items read fine and others vanished. Giving the bar its own surface makes
 * contrast constant regardless of what scrolls underneath.
 */
const LINKS = [
  { id: "about", label: "Me" },
  { id: "experience", label: "Work" },
  { id: "projects", label: "Built" },
  { id: "journey", label: "Road" },
  { id: "voice", label: "Voice" },
  { id: "person", label: "Life" },
  { id: "contact", label: "Say hi" },
]

export default function TrailNav() {
  const active = useChapter()

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center px-3 pt-3 md:px-6 md:pt-5">
      <nav
        className="pointer-events-auto flex w-full max-w-5xl items-center gap-2 rounded-full py-2 pl-4 pr-2
                   shadow-[0_10px_30px_-14px_var(--shadow)] backdrop-blur-md md:gap-4 md:pl-6"
        style={{ background: "color-mix(in srgb, var(--surface) 95%, transparent)" }}
      >
        <a
          href="#top"
          className="font-serif text-lg font-bold tracking-[0.18em] md:text-xl"
          style={{ color: "var(--ink)" }}
        >
          PINKY.
        </a>

        <ul className="ml-auto hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="relative block rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors"
                  style={{ color: isActive ? "var(--ink)" : "var(--ink-soft)" }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "var(--accent-wash, rgba(132,169,140,0.18))" }}
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        <div className="ml-auto lg:ml-2">
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}
