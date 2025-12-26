"use client"

import { useEffect, useRef, useState } from "react"

export default function Bird({ position, velocity = 0 }) {
  const canvasRef = useRef(null)
  const [frame, setFrame] = useState(0)

  // Flapping animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 3)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Enable pixelated rendering
    ctx.imageSmoothingEnabled = false

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Pixel art bird - Classic Flappy Bird style (yellow bird)
    const pixelSize = 2

    // Bird color palette
    const colors = {
      body: "#F8E81C",      // Yellow body
      bodyDark: "#E6B800",  // Darker yellow
      bodyLight: "#FFF176", // Light yellow highlight
      wing: "#F8E81C",      // Wing color
      wingDark: "#C9A000",  // Wing shadow
      eye: "#FFFFFF",       // White of eye
      pupil: "#000000",     // Black pupil
      beak: "#FF6B35",      // Orange beak
      beakDark: "#CC4125",  // Dark beak
      outline: "#543E14",   // Brown outline
    }

    // Draw pixel helper
    const drawPixel = (x, y, color) => {
      ctx.fillStyle = color
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
    }

    // Bird body pixels (17x12 grid)
    const bodyPixels = [
      // Row 0-1: Top of head
      { x: 6, y: 0, c: colors.outline },
      { x: 7, y: 0, c: colors.outline },
      { x: 8, y: 0, c: colors.outline },
      { x: 9, y: 0, c: colors.outline },
      { x: 5, y: 1, c: colors.outline },
      { x: 6, y: 1, c: colors.bodyLight },
      { x: 7, y: 1, c: colors.bodyLight },
      { x: 8, y: 1, c: colors.body },
      { x: 9, y: 1, c: colors.body },
      { x: 10, y: 1, c: colors.outline },

      // Row 2: Head with eye
      { x: 4, y: 2, c: colors.outline },
      { x: 5, y: 2, c: colors.bodyLight },
      { x: 6, y: 2, c: colors.body },
      { x: 7, y: 2, c: colors.body },
      { x: 8, y: 2, c: colors.eye },
      { x: 9, y: 2, c: colors.eye },
      { x: 10, y: 2, c: colors.body },
      { x: 11, y: 2, c: colors.outline },

      // Row 3: Eye and head
      { x: 3, y: 3, c: colors.outline },
      { x: 4, y: 3, c: colors.body },
      { x: 5, y: 3, c: colors.body },
      { x: 6, y: 3, c: colors.body },
      { x: 7, y: 3, c: colors.eye },
      { x: 8, y: 3, c: colors.eye },
      { x: 9, y: 3, c: colors.pupil },
      { x: 10, y: 3, c: colors.body },
      { x: 11, y: 3, c: colors.outline },
      { x: 12, y: 3, c: colors.outline },
      { x: 13, y: 3, c: colors.outline },

      // Row 4: Beak start
      { x: 2, y: 4, c: colors.outline },
      { x: 3, y: 4, c: colors.body },
      { x: 4, y: 4, c: colors.body },
      { x: 5, y: 4, c: colors.body },
      { x: 6, y: 4, c: colors.body },
      { x: 7, y: 4, c: colors.body },
      { x: 8, y: 4, c: colors.body },
      { x: 9, y: 4, c: colors.body },
      { x: 10, y: 4, c: colors.outline },
      { x: 11, y: 4, c: colors.beak },
      { x: 12, y: 4, c: colors.beak },
      { x: 13, y: 4, c: colors.beak },
      { x: 14, y: 4, c: colors.outline },

      // Row 5: Body and beak
      { x: 1, y: 5, c: colors.outline },
      { x: 2, y: 5, c: colors.body },
      { x: 3, y: 5, c: colors.body },
      { x: 4, y: 5, c: colors.body },
      { x: 5, y: 5, c: colors.body },
      { x: 6, y: 5, c: colors.body },
      { x: 7, y: 5, c: colors.body },
      { x: 8, y: 5, c: colors.body },
      { x: 9, y: 5, c: colors.body },
      { x: 10, y: 5, c: colors.outline },
      { x: 11, y: 5, c: colors.beak },
      { x: 12, y: 5, c: colors.beak },
      { x: 13, y: 5, c: colors.beak },
      { x: 14, y: 5, c: colors.beak },
      { x: 15, y: 5, c: colors.outline },

      // Row 6: Body
      { x: 0, y: 6, c: colors.outline },
      { x: 1, y: 6, c: colors.body },
      { x: 2, y: 6, c: colors.body },
      { x: 3, y: 6, c: colors.body },
      { x: 4, y: 6, c: colors.body },
      { x: 5, y: 6, c: colors.body },
      { x: 6, y: 6, c: colors.body },
      { x: 7, y: 6, c: colors.body },
      { x: 8, y: 6, c: colors.body },
      { x: 9, y: 6, c: colors.body },
      { x: 10, y: 6, c: colors.outline },
      { x: 11, y: 6, c: colors.beakDark },
      { x: 12, y: 6, c: colors.beakDark },
      { x: 13, y: 6, c: colors.beakDark },
      { x: 14, y: 6, c: colors.outline },

      // Row 7: Body
      { x: 0, y: 7, c: colors.outline },
      { x: 1, y: 7, c: colors.body },
      { x: 2, y: 7, c: colors.body },
      { x: 3, y: 7, c: colors.body },
      { x: 4, y: 7, c: colors.body },
      { x: 5, y: 7, c: colors.body },
      { x: 6, y: 7, c: colors.body },
      { x: 7, y: 7, c: colors.body },
      { x: 8, y: 7, c: colors.body },
      { x: 9, y: 7, c: colors.body },
      { x: 10, y: 7, c: colors.outline },
      { x: 11, y: 7, c: colors.outline },
      { x: 12, y: 7, c: colors.outline },

      // Row 8: Lower body
      { x: 1, y: 8, c: colors.outline },
      { x: 2, y: 8, c: colors.bodyDark },
      { x: 3, y: 8, c: colors.bodyDark },
      { x: 4, y: 8, c: colors.body },
      { x: 5, y: 8, c: colors.body },
      { x: 6, y: 8, c: colors.body },
      { x: 7, y: 8, c: colors.body },
      { x: 8, y: 8, c: colors.body },
      { x: 9, y: 8, c: colors.outline },

      // Row 9: Bottom
      { x: 2, y: 9, c: colors.outline },
      { x: 3, y: 9, c: colors.outline },
      { x: 4, y: 9, c: colors.bodyDark },
      { x: 5, y: 9, c: colors.bodyDark },
      { x: 6, y: 9, c: colors.bodyDark },
      { x: 7, y: 9, c: colors.bodyDark },
      { x: 8, y: 9, c: colors.outline },

      // Row 10: Tail/bottom
      { x: 4, y: 10, c: colors.outline },
      { x: 5, y: 10, c: colors.outline },
      { x: 6, y: 10, c: colors.outline },
      { x: 7, y: 10, c: colors.outline },
    ]

    // Draw body
    bodyPixels.forEach(p => drawPixel(p.x, p.y, p.c))

    // Draw wing based on animation frame
    const wingFrames = [
      // Frame 0: Wing up
      [
        { x: 2, y: 4, c: colors.wingDark },
        { x: 3, y: 3, c: colors.wing },
        { x: 4, y: 3, c: colors.wing },
        { x: 3, y: 2, c: colors.outline },
        { x: 4, y: 2, c: colors.outline },
      ],
      // Frame 1: Wing middle
      [
        { x: 2, y: 5, c: colors.wing },
        { x: 3, y: 5, c: colors.wing },
        { x: 4, y: 5, c: colors.wingDark },
        { x: 2, y: 4, c: colors.outline },
        { x: 5, y: 5, c: colors.outline },
      ],
      // Frame 2: Wing down
      [
        { x: 2, y: 7, c: colors.wing },
        { x: 3, y: 7, c: colors.wing },
        { x: 4, y: 8, c: colors.wingDark },
        { x: 2, y: 8, c: colors.outline },
        { x: 3, y: 8, c: colors.outline },
      ],
    ]

    wingFrames[frame].forEach(p => drawPixel(p.x, p.y, p.c))

  }, [frame])

  // Calculate rotation based on velocity
  const rotation = Math.max(-30, Math.min(90, velocity * 3))

  return (
    <canvas
      ref={canvasRef}
      width={34}
      height={24}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.1s ease",
        zIndex: 5,
        imageRendering: "pixelated",
        width: "68px",
        height: "48px",
      }}
    />
  )
}