"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { EMAIL, MAILTO } from "@/content/portfolio"

const GMAIL_COMPOSE =
  "https://mail.google.com/mail/?view=cm&fs=1" +
  `&to=${encodeURIComponent(EMAIL)}` +
  `&su=${encodeURIComponent("Hello from your portfolio")}`

/**
 * One button, as it should be.
 *
 * A bare mailto: silently does nothing for anyone without a mail client
 * registered with their OS, and there is no reliable way to detect that it
 * failed. So the click does both things at once: it copies the address and it
 * asks the OS to open a composer. If a mail app appears, the copy was
 * invisible and harmless. If nothing appears, the address is already on the
 * clipboard and the fallback line explains it.
 *
 * The fallbacks stay hidden until the button is pressed — surfacing them by
 * default reads as a debug panel rather than a call to action.
 */
export default function ContactActions() {
  const [tried, setTried] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const send = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      // Clipboard needs a secure context and permission — fall back to a
      // throwaway field so the address still reaches the clipboard.
      const field = document.createElement("textarea")
      field.value = EMAIL
      field.setAttribute("readonly", "")
      field.style.position = "fixed"
      field.style.opacity = "0"
      document.body.appendChild(field)
      field.select()
      try {
        document.execCommand("copy")
      } catch {
        /* nothing left to try — the fallback line shows the address */
      }
      document.body.removeChild(field)
    }

    window.location.href = MAILTO

    clearTimeout(timer.current)
    setTried(true)
    timer.current = setTimeout(() => setTried(false), 12000)
  }

  return (
    <div className="mt-9 flex flex-col items-center">
      <button
        type="button"
        onClick={send}
        className="rounded-full px-10 py-4 text-base font-bold text-white transition-transform hover:-translate-y-1"
        style={{ background: "#3f6b47", boxShadow: "0 14px 30px -12px var(--shadow)" }}
      >
        Send me an email
      </button>

      <AnimatePresence>
        {tried && (
          <motion.p
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="mt-4 text-center text-sm font-medium"
            style={{ color: "var(--ink-soft)" }}
          >
            Nothing opened?{" "}
            <span className="font-bold" style={{ color: "var(--ink)" }}>
              {EMAIL}
            </span>{" "}
            is on your clipboard — or{" "}
            <a
              href={GMAIL_COMPOSE}
              target="_blank"
              rel="noreferrer"
              className="font-bold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: "var(--ink)" }}
            >
              compose in Gmail
            </a>
            .
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
