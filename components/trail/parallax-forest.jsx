"use client"

import { motion, useTransform } from "framer-motion"
import { useTrail } from "@/context/trail-context"

/**
 * Four depth planes of forest that drift at different rates, faking the painted
 * depth of an illustrated poster. Swap the SVG silhouettes for real painted PNG
 * layers when the art lands — the motion setup stays identical.
 *
 * Layers, back to front:
 *   0. distant ridge   — barely moves
 *   1. mid canopy      — slow
 *   2. near trunks     — medium
 *   3. foreground leaf — fast, overlaps content edges
 */
export default function ParallaxForest() {
  const { scrollYProgress, light } = useTrail()

  const ridge = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"])
  const canopy = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"])
  const trunks = useTransform(scrollYProgress, [0, 1], ["0%", "-34%"])
  const leaves = useTransform(scrollYProgress, [0, 1], ["0%", "-58%"])

  // Everything darkens together as night falls so the planes stay cohesive.
  const dim = useTransform(light, [0.65, 1], [0, 0.5])

  return (
    <div className="fixed inset-0 -z-[9] pointer-events-none overflow-hidden" aria-hidden="true">
      {/* 0 — distant ridge */}
      <motion.div style={{ y: ridge }} className="absolute inset-x-0 bottom-0 h-[45vh] opacity-25">
        <Ridge fill="#84a98c" />
      </motion.div>

      {/* 1 — mid canopy, hanging from the top */}
      <motion.div style={{ y: canopy }} className="absolute inset-x-0 top-0 h-[38vh] opacity-40">
        <Canopy fill="#6f9179" />
      </motion.div>

      {/* 2 — near trunks flanking the content */}
      <motion.div style={{ y: trunks }} className="absolute inset-0 opacity-30">
        <Trunks fill="#52796f" />
      </motion.div>

      {/* 3 — foreground leaf cluster, top corners */}
      <motion.div style={{ y: leaves }} className="absolute inset-x-0 top-0 h-[30vh] opacity-55">
        <ForegroundLeaves fill="#41604f" />
      </motion.div>

      {/* Night dimmer across all planes */}
      <motion.div className="absolute inset-0 bg-[#0d1a22]" style={{ opacity: dim }} />
    </div>
  )
}

function Ridge({ fill }) {
  return (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
      <path
        fill={fill}
        d="M0,192 L60,181 C120,171,240,149,360,154 C480,160,600,192,720,197 C840,203,960,181,1080,170 C1200,160,1320,160,1380,160 L1440,160 L1440,320 L0,320 Z"
      />
    </svg>
  )
}

function Canopy({ fill }) {
  return (
    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
      <path
        fill={fill}
        d="M0,0 L1440,0 L1440,96 C1380,128,1320,160,1200,154 C1080,149,1020,107,900,112 C780,117,720,171,600,165 C480,160,420,96,300,101 C180,107,120,171,60,176 L0,181 Z"
      />
    </svg>
  )
}

function Trunks({ fill }) {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="w-full h-full">
      <path fill={fill} d="M40,0 L120,0 L104,900 L56,900 Z" />
      <path fill={fill} d="M1320,0 L1400,0 L1416,900 L1352,900 Z" />
      <path fill={fill} opacity="0.6" d="M228,0 L268,0 L258,900 L232,900 Z" />
      <path fill={fill} opacity="0.6" d="M1180,0 L1224,0 L1236,900 L1198,900 Z" />
    </svg>
  )
}

function ForegroundLeaves({ fill }) {
  return (
    <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="w-full h-full">
      <g fill={fill}>
        <ellipse cx="90" cy="40" rx="150" ry="80" />
        <ellipse cx="250" cy="10" rx="120" ry="65" />
        <ellipse cx="1350" cy="55" rx="165" ry="90" />
        <ellipse cx="1180" cy="15" rx="130" ry="70" />
        <ellipse cx="700" cy="-30" rx="220" ry="85" />
      </g>
    </svg>
  )
}
