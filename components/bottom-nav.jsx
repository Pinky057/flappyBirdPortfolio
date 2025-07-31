"use client"

import { useState, useEffect } from "react"
import { useGameContext } from "@/context/game-context"
import { Info, Briefcase, FolderOpen, Mail, Settings } from "lucide-react"

export default function BottomNav({ onSectionClick, activeSection }) {
  const { restart, gameOver } = useGameContext()
  const [characterVisible, setCharacterVisible] = useState(true)

  // Add floating animation to character
  useEffect(() => {
    const characterElement = document.getElementById("character-cutout")
    if (characterElement) {
      characterElement.style.animation = "float 4s ease-in-out infinite"
    }
  }, [characterVisible])

  return (
    <nav
      className="bottom-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#f5f5f5", // Light gray background like in the reference
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        zIndex: 50,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      {/* Left side - Portfolio text */}
      <div
        style={{
          fontFamily: "cursive",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#2D4B73",
        }}
      >
        Portfolio
      </div>

      {/* Center - Navigation items */}
      <div style={{ display: "flex", gap: "25px", marginLeft: "40px" }}>
        <button
          onClick={() => onSectionClick("about")}
          className={`nav-button ${activeSection === "about" ? "active" : ""}`}
          style={{
            padding: "8px 15px",
            backgroundColor: "transparent",
            color: "#333",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Info size={18} />
          About
        </button>

        <button
          onClick={() => onSectionClick("experience")}
          className={`nav-button ${activeSection === "experience" ? "active" : ""}`}
          style={{
            padding: "8px 15px",
            backgroundColor: "transparent",
            color: "#333",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Briefcase size={18} />
          Experience
        </button>

        <button
          onClick={() => onSectionClick("projects")}
          className={`nav-button ${activeSection === "projects" ? "active" : ""}`}
          style={{
            padding: "8px 15px",
            backgroundColor: "transparent",
            color: "#333",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <FolderOpen size={18} />
          Projects
        </button>

        <button
          onClick={() => onSectionClick("contact")}
          className={`nav-button ${activeSection === "contact" ? "active" : ""}`}
          style={{
            padding: "8px 15px",
            backgroundColor: "transparent",
            color: "#333",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Mail size={18} />
          Contact
        </button>
      </div>

      {/* Character cutout - positioned to appear as if standing on the navbar */}
      {characterVisible && (
        <div
          id="character-cutout"
          style={{
            height: "180px",
            position: "absolute",
            bottom: "40px", // Position it so only the bottom part is in the navbar
            right: "120px", // Position it to the right of the navbar
            zIndex: 60,
            pointerEvents: "none", // So it doesn't interfere with clicking
          }}
        >
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL_E_2025-03-08_10.39.55_-_A_chibi-style_illustration_of_a_young_woman_named_Ishrat_Pinky__walking_forward_in_a_forest._She_has_a_cute_outfit_matching_forest_colors__such_as_ear-removebg-preview-L09SW6AdPseXAaflCqms3WXttKpUlq.png"
            alt="Character"
            style={{
              height: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3))",
            }}
          />
        </div>
      )}

      {/* Right side - Play Again button */}
      <div style={{ marginLeft: "auto" }}>
        {/* Play Again button */}
        <button
          onClick={() => {
            restart()
            if (activeSection) {
              onSectionClick(null)
            }
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 20px",
            backgroundColor: "#FF7D2D",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#D45E00"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#FF7D2D"
          }}
        >
          <Settings size={16} />
          {gameOver ? "Play Again" : "Play Again"}
        </button>
      </div>
    </nav>
  )
}

