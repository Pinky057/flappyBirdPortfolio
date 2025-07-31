"use client"

export default function Section({ id, title, x, y, onClick }) {
  // Different styles based on section type
  const getSectionStyle = () => {
    switch (id) {
      case "about":
        return {
          backgroundColor: "#2D4B73", // Dark blue
          borderColor: "#1A2A40",
          width: 180,
          height: 120,
        }
      case "experience":
        return {
          backgroundColor: "#2D4B73", // Dark blue
          borderColor: "#1A2A40",
          width: 220,
          height: 140,
        }
      case "projects":
        return {
          backgroundColor: "#2D4B73", // Dark blue
          borderColor: "#1A2A40",
          width: 180,
          height: 120,
        }
      case "contact":
        return {
          backgroundColor: "#E74C3C", // Red
          borderColor: "#A93226",
          width: 200,
          height: 150,
        }
      default:
        return {
          backgroundColor: "#2D4B73",
          borderColor: "#1A2A40",
          width: 180,
          height: 120,
        }
    }
  }

  const style = getSectionStyle()

  return (
    <div
      className="section"
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${style.width}px`,
        height: `${style.height}px`,
        backgroundColor: style.backgroundColor,
        border: `5px solid ${style.borderColor}`,
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: "24px",
        cursor: "pointer",
        zIndex: 4,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        transform: "translateZ(0)",
        transition: "transform 0.2s ease",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateZ(0) scale(1.05)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateZ(0) scale(1)"
      }}
    >
      {/* Section pole */}
      <div
        style={{
          position: "absolute",
          bottom: `-${window.innerHeight - y - style.height}px`,
          left: "50%",
          width: "20px",
          height: `${window.innerHeight - y - style.height}px`,
          backgroundColor: "#8B4513", // Brown pole
          transform: "translateX(-50%)",
          zIndex: 2,
        }}
      />

      {/* Section title */}
      <div
        style={{
          textAlign: "center",
          textShadow: "2px 2px 0 #000",
        }}
      >
        {title.toUpperCase()}
      </div>
    </div>
  )
}

