"use client"

import { useState, useEffect } from "react"

export default function Section({ id, title, icon, x, y, onClick }) {
  const [bounce, setBounce] = useState(0)

  // Floating animation
  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const floatY = Math.sin(bounce * Math.PI / 180) * 8

  // Color schemes for different sections
  const getColors = () => {
    switch (id) {
      case "about":
        return {
          primary: "#FFD700",     // Gold
          secondary: "#FFA500",   // Orange
          outline: "#8B6914",     // Dark gold
          glow: "#FFE44D",
        }
      case "experience":
        return {
          primary: "#4169E1",     // Royal blue
          secondary: "#1E90FF",   // Dodger blue
          outline: "#1A3A6E",     // Dark blue
          glow: "#87CEEB",
        }
      case "projects":
        return {
          primary: "#32CD32",     // Lime green
          secondary: "#00FF00",   // Green
          outline: "#228B22",     // Forest green
          glow: "#90EE90",
        }
      case "contact":
        return {
          primary: "#FF6B6B",     // Coral red
          secondary: "#FF4444",   // Red
          outline: "#8B0000",     // Dark red
          glow: "#FFB6C1",
        }
      default:
        return {
          primary: "#FFD700",
          secondary: "#FFA500",
          outline: "#8B6914",
          glow: "#FFE44D",
        }
    }
  }

  const colors = getColors()

  return (
    <div
      className="section no-jump"
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y + floatY}px`,
        cursor: "pointer",
        zIndex: 4,
        transform: "translateZ(0)",
        transition: "filter 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = "brightness(1.2)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = "brightness(1)"
      }}
    >
      {/* Glow effect */}
      <div
        style={{
          position: "absolute",
          top: "-10px",
          left: "-10px",
          width: "calc(100% + 20px)",
          height: "calc(100% + 20px)",
          background: `radial-gradient(ellipse at center, ${colors.glow}40 0%, transparent 70%)`,
          animation: "pulse 2s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      {/* Main container - pixel art style sign/badge */}
      <div
        style={{
          position: "relative",
          backgroundColor: colors.primary,
          border: `4px solid ${colors.outline}`,
          padding: "12px 20px",
          minWidth: "100px",
          textAlign: "center",
          boxShadow: `
            0 4px 0 ${colors.outline},
            0 8px 0 rgba(0,0,0,0.3),
            inset 0 2px 0 ${colors.glow}
          `,
          imageRendering: "pixelated",
        }}
      >
        {/* Icon */}
        <div
          style={{
            fontSize: "32px",
            marginBottom: "4px",
            textShadow: "2px 2px 0 rgba(0,0,0,0.3)",
            filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.2))",
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "10px",
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            color: "#FFFFFF",
            textShadow: `
              1px 1px 0 ${colors.outline},
              -1px -1px 0 ${colors.outline},
              1px -1px 0 ${colors.outline},
              -1px 1px 0 ${colors.outline}
            `,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>

        {/* Click indicator */}
        <div
          style={{
            marginTop: "8px",
            fontSize: "8px",
            fontFamily: "'Press Start 2P', 'Courier New', monospace",
            color: colors.glow,
            textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
            animation: "blink 1.5s infinite",
          }}
        >
          CLICK
        </div>

        {/* Corner decorations - pixel art style */}
        <div style={{ position: "absolute", top: "-2px", left: "-2px", width: "6px", height: "6px", backgroundColor: colors.glow }} />
        <div style={{ position: "absolute", top: "-2px", right: "-2px", width: "6px", height: "6px", backgroundColor: colors.glow }} />
        <div style={{ position: "absolute", bottom: "2px", left: "-2px", width: "6px", height: "6px", backgroundColor: colors.secondary }} />
        <div style={{ position: "absolute", bottom: "2px", right: "-2px", width: "6px", height: "6px", backgroundColor: colors.secondary }} />
      </div>

      {/* Pole/stand */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          width: "12px",
          height: "300px",
          backgroundColor: "#8B4513",
          transform: "translateX(-50%)",
          borderLeft: "2px solid #654321",
          borderRight: "2px solid #5D3A1A",
          zIndex: -1,
          boxShadow: "2px 0 0 rgba(0,0,0,0.2)",
        }}
      />

      {/* Add keyframes */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        @keyframes blink {
          0%, 40% { opacity: 1; }
          50%, 90% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
