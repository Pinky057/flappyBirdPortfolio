"use client"

import { useEffect, useRef } from "react"

export default function Bird({ position }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw bird body
    ctx.fillStyle = "#FF7D2D" // Orange from the image
    ctx.beginPath()
    ctx.ellipse(20, 20, 18, 15, 0, 0, Math.PI * 2)
    ctx.fill()

    // Draw wing
    ctx.fillStyle = "#FFD52D" // Yellow
    ctx.beginPath()
    ctx.ellipse(15, 22, 8, 6, Math.PI / 4, 0, Math.PI * 2)
    ctx.fill()

    // Draw eye
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(28, 15, 5, 0, Math.PI * 2)
    ctx.fill()

    // Draw pupil
    ctx.fillStyle = "black"
    ctx.beginPath()
    ctx.arc(30, 15, 2, 0, Math.PI * 2)
    ctx.fill()

    // Draw beak
    ctx.fillStyle = "#FFD52D" // Yellow
    ctx.beginPath()
    ctx.moveTo(35, 20)
    ctx.lineTo(45, 15)
    ctx.lineTo(35, 25)
    ctx.closePath()
    ctx.fill()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={50}
      height={40}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "rotate(0deg)",
        transition: "transform 0.1s ease",
        zIndex: 5,
      }}
    />
  )
}

