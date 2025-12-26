"use client"

import { useGameContext } from "@/context/game-context"
import { Info, Briefcase, FolderOpen, Mail, RotateCcw, Youtube } from "lucide-react"

export default function BottomNav({ onSectionClick, activeSection }) {
  const { restart, gameOver } = useGameContext()

  return (
    <>
      {/* Character cutout - positioned to appear as if standing on the navbar */}
      <div
        style={{
          position: "fixed",
          bottom: "50px",
          right: "100px",
          height: "180px",
          zIndex: 60,
          pointerEvents: "none",
          animation: "float 4s ease-in-out infinite",
        }}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DALL_E_2025-03-08_10.39.55_-_A_chibi-style_illustration_of_a_young_woman_named_Ishrat_Pinky__walking_forward_in_a_forest._She_has_a_cute_outfit_matching_forest_colors__such_as_ear-removebg-preview-L09SW6AdPseXAaflCqms3WXttKpUlq.png"
          alt="Pinky Character"
          style={{
            height: "100%",
            objectFit: "contain",
            filter: "drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3))",
          }}
        />
      </div>

      <nav
      className="bottom-nav no-jump"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#DEB887",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 30px",
        zIndex: 50,
        borderTop: "4px solid #8B4513",
        boxShadow: "0 -4px 0 #5D4E37",
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      {/* Left side - Portfolio text */}
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#543E14",
          textShadow: "1px 1px 0 #FFF",
        }}
      >
        🎮 PINKY
      </div>

      {/* Center - Navigation items */}
      <div style={{ display: "flex", gap: "8px" }}>
        {[
          { id: "about", icon: Info, label: "About" },
          { id: "experience", icon: Briefcase, label: "Exp" },
          { id: "projects", icon: FolderOpen, label: "Projects" },
          { id: "youtube", icon: Youtube, label: "YouTube" },
          { id: "contact", icon: Mail, label: "Contact" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onSectionClick(id)}
            style={{
              padding: "8px 12px",
              backgroundColor: activeSection === id ? "#73BF2E" : "#F5DEB3",
              color: activeSection === id ? "white" : "#543E14",
              border: "3px solid #8B4513",
              borderBottom: activeSection === id ? "3px solid #2E5A1C" : "5px solid #8B4513",
              cursor: "pointer",
              fontSize: "8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "all 0.1s",
              boxShadow: activeSection === id ? "none" : "0 2px 0 #5D4E37",
              transform: activeSection === id ? "translateY(2px)" : "translateY(0)",
            }}
            onMouseEnter={(e) => {
              if (activeSection !== id) {
                e.currentTarget.style.backgroundColor = "#EED9A4"
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== id) {
                e.currentTarget.style.backgroundColor = "#F5DEB3"
              }
            }}
          >
            <Icon size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Right side - Play Again button */}
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
          gap: "8px",
          padding: "10px 16px",
          backgroundColor: "#E74C3C",
          border: "3px solid #8B0000",
          borderBottom: "6px solid #5C0000",
          cursor: "pointer",
          color: "white",
          fontSize: "9px",
          textShadow: "1px 1px 0 #5C0000",
          transition: "all 0.1s",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "translateY(3px)"
          e.currentTarget.style.borderBottomWidth = "3px"
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.borderBottomWidth = "6px"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)"
          e.currentTarget.style.borderBottomWidth = "6px"
        }}
      >
        <RotateCcw size={14} strokeWidth={2.5} />
        RESTART
      </button>
    </nav>
    </>
  )
}
