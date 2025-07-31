export default function Obstacle({ x, gapPosition, gapSize = 220 }) {
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
          backgroundColor: "#FF7D2D", // Orange from the image
          borderRight: "5px solid #D45E00",
          borderLeft: "5px solid #D45E00",
          borderBottom: "5px solid #D45E00",
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "-15px",
            left: "-15px",
            width: "110px",
            height: "30px",
            backgroundColor: "#FF7D2D",
            borderRadius: "5px",
            borderTop: "5px solid #FFB27D",
            borderRight: "5px solid #D45E00",
            borderBottom: "5px solid #D45E00",
            borderLeft: "5px solid #D45E00",
          }}
        />
      </div>

      {/* Bottom pipe */}
      <div
        style={{
          position: "absolute",
          top: `${gapPosition + gapSize}px`,
          left: `${x}px`,
          width: "80px",
          height: `calc(100vh - ${gapPosition + gapSize}px)`,
          backgroundColor: "#FF7D2D", // Orange from the image
          borderRight: "5px solid #D45E00",
          borderLeft: "5px solid #D45E00",
          borderTop: "5px solid #D45E00",
          zIndex: 3,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-15px",
            left: "-15px",
            width: "110px",
            height: "30px",
            backgroundColor: "#FF7D2D",
            borderRadius: "5px",
            borderBottom: "5px solid #FFB27D",
            borderRight: "5px solid #D45E00",
            borderTop: "5px solid #D45E00",
            borderLeft: "5px solid #D45E00",
          }}
        />
      </div>
    </>
  )
}

