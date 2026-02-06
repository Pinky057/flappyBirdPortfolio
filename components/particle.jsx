"use client"

import { useEffect, useState } from "react"

export default function Particle({ x, y, color }) {
    const [style, setStyle] = useState({
        position: "absolute",
        left: x,
        top: y,
        width: "12px",
        height: "12px",
        backgroundColor: color,
        borderRadius: "2px", // Confetti
        pointerEvents: "none",
        zIndex: 9999, // On top
        opacity: 1,
        transform: "translate(0, 0) rotate(0deg)",
        boxShadow: `0 0 4px ${color}`
    })

    useEffect(() => {
        // Random velocity
        const angle = Math.random() * Math.PI * 2
        const velocity = 2 + Math.random() * 4
        const vx = Math.cos(angle) * velocity
        let vy = Math.sin(angle) * velocity
        const gravity = 0.2

        let posX = x
        let posY = y
        let opacity = 1

        const animate = () => {
            posX += vx
            posY += vy
            vy += gravity
            opacity -= 0.02

            if (opacity <= 0) return

            setStyle((prev) => ({
                ...prev,
                left: posX,
                top: posY,
                opacity: opacity,
            }))

            requestAnimationFrame(animate)
        }

        const frameId = requestAnimationFrame(animate)
        return () => cancelAnimationFrame(frameId)
    }, [x, y])

    if (style.opacity <= 0) return null

    return <div style={style} />
}
