"use client"

export default function Obstacle({ x, gapPosition, gapSize = 200 }) {
  // Classic Flappy Bird pipe colors
  const pipeColors = {
    main: "#73BF2E",      // Light green
    dark: "#558B2F",      // Dark green shadow
    light: "#8BC34A",     // Highlight
    outline: "#2E5A1C",   // Dark outline
    cap: "#73BF2E",
    capLight: "#9CCC65",
    capDark: "#558B2F",
  }

  return (
    <>
      {/* Top pipe */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${x}px`,
          width: "80px",
          height: `${gapPosition}px`,
          zIndex: 3,
          imageRendering: "pixelated",
        }}
      >
        {/* Pipe body */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "8px",
            width: "64px",
            height: `${gapPosition - 30}px`,
            background: `linear-gradient(to right,
              ${pipeColors.outline} 0%,
              ${pipeColors.outline} 4px,
              ${pipeColors.dark} 4px,
              ${pipeColors.dark} 8px,
              ${pipeColors.main} 8px,
              ${pipeColors.main} 20px,
              ${pipeColors.light} 20px,
              ${pipeColors.light} 28px,
              ${pipeColors.main} 28px,
              ${pipeColors.main} 56px,
              ${pipeColors.dark} 56px,
              ${pipeColors.dark} 60px,
              ${pipeColors.outline} 60px
            )`,
          }}
        />
        {/* Pipe cap */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "80px",
            height: "30px",
            background: `linear-gradient(to right,
              ${pipeColors.outline} 0%,
              ${pipeColors.outline} 4px,
              ${pipeColors.capDark} 4px,
              ${pipeColors.capDark} 8px,
              ${pipeColors.cap} 8px,
              ${pipeColors.cap} 16px,
              ${pipeColors.capLight} 16px,
              ${pipeColors.capLight} 28px,
              ${pipeColors.cap} 28px,
              ${pipeColors.cap} 68px,
              ${pipeColors.capDark} 68px,
              ${pipeColors.capDark} 72px,
              ${pipeColors.outline} 72px
            )`,
            borderTop: `4px solid ${pipeColors.capLight}`,
            borderBottom: `4px solid ${pipeColors.outline}`,
            boxSizing: "border-box",
          }}
        />
        {/* Horizontal lines for retro effect */}
        {Array.from({ length: Math.floor((gapPosition - 30) / 20) }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${i * 20}px`,
              left: "8px",
              width: "64px",
              height: "2px",
              backgroundColor: pipeColors.dark,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      {/* Bottom pipe */}
      <div
        style={{
          position: "absolute",
          top: `${gapPosition + gapSize}px`,
          left: `${x}px`,
          width: "80px",
          height: `calc(100vh - ${gapPosition + gapSize}px)`,
          zIndex: 3,
          imageRendering: "pixelated",
        }}
      >
        {/* Pipe cap */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "80px",
            height: "30px",
            background: `linear-gradient(to right,
              ${pipeColors.outline} 0%,
              ${pipeColors.outline} 4px,
              ${pipeColors.capDark} 4px,
              ${pipeColors.capDark} 8px,
              ${pipeColors.cap} 8px,
              ${pipeColors.cap} 16px,
              ${pipeColors.capLight} 16px,
              ${pipeColors.capLight} 28px,
              ${pipeColors.cap} 28px,
              ${pipeColors.cap} 68px,
              ${pipeColors.capDark} 68px,
              ${pipeColors.capDark} 72px,
              ${pipeColors.outline} 72px
            )`,
            borderTop: `4px solid ${pipeColors.outline}`,
            borderBottom: `4px solid ${pipeColors.capDark}`,
            boxSizing: "border-box",
          }}
        />
        {/* Pipe body */}
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "8px",
            width: "64px",
            height: `calc(100vh - ${gapPosition + gapSize + 30}px)`,
            background: `linear-gradient(to right,
              ${pipeColors.outline} 0%,
              ${pipeColors.outline} 4px,
              ${pipeColors.dark} 4px,
              ${pipeColors.dark} 8px,
              ${pipeColors.main} 8px,
              ${pipeColors.main} 20px,
              ${pipeColors.light} 20px,
              ${pipeColors.light} 28px,
              ${pipeColors.main} 28px,
              ${pipeColors.main} 56px,
              ${pipeColors.dark} 56px,
              ${pipeColors.dark} 60px,
              ${pipeColors.outline} 60px
            )`,
          }}
        />
        {/* Horizontal lines for retro effect */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${30 + i * 20}px`,
              left: "8px",
              width: "64px",
              height: "2px",
              backgroundColor: pipeColors.dark,
              opacity: 0.3,
            }}
          />
        ))}
      </div>
    </>
  )
}