"use client"

import { useState, useEffect, useRef } from "react"
import { useGameContext } from "@/context/game-context"
import Bird from "./bird"
import Obstacle from "./obstacle"
import Section from "./section"
import { useKeyPress } from "@/hooks/use-key-press"
import { useMobile } from "@/hooks/use-mobile"

export default function Game({ isPaused, onSectionClick }) {
  const gameRef = useRef(null)
  const {
    birdPosition,
    setBirdPosition,
    gameSpeed,
    setGameSpeed,
    gameOver,
    setGameOver,
    score,
    setScore,
    restart: contextRestart,
  } = useGameContext()

  const [obstacles, setObstacles] = useState([])

  const [sections, setSections] = useState([
    { id: "about", title: "About Me", x: 800, y: 150 },
    { id: "experience", title: "Work Experience", x: 1500, y: 100 },
    { id: "projects", title: "Projects", x: 2200, y: 300 },
    { id: "contact", title: "Contact Me", x: 2900, y: 200 },
  ])

  const isMobile = useMobile()
  const isJumpKeyPressed = useKeyPress(" ")

  // Complete game reset function
  const resetGame = () => {
    // Reset bird position
    setBirdPosition({ x: 150, y: 200 })

    // Reset game speed
    setGameSpeed(2)

    // Clear all obstacles
    setObstacles([])

    // Reset score
    setScore(0)

    // Reset game over state
    setGameOver(false)

    // Reset sections to their original positions
    setSections([
      { id: "about", title: "About Me", x: 800, y: 150 },
      { id: "experience", title: "Work Experience", x: 1500, y: 100 },
      { id: "projects", title: "Projects", x: 2200, y: 300 },
      { id: "contact", title: "Contact Me", x: 2900, y: 200 },
    ])
  }

  // Handle jump with keyboard
  useEffect(() => {
    if (!isPaused && !gameOver && isJumpKeyPressed) {
      jump()
    }
  }, [isJumpKeyPressed, isPaused, gameOver])

  // Handle jump with mouse click
  useEffect(() => {
    const handleClick = () => {
      if (!isPaused && !gameOver) {
        jump()
      }
    }

    if (gameRef.current) {
      gameRef.current.addEventListener("click", handleClick)

      return () => {
        if (gameRef.current) {
          gameRef.current.removeEventListener("click", handleClick)
        }
      }
    }
  }, [isPaused, gameOver])

  // Handle touch for mobile
  useEffect(() => {
    const handleTouch = () => {
      if (!isPaused && !gameOver) {
        jump()
      }
    }

    if (isMobile && gameRef.current) {
      gameRef.current.addEventListener("touchstart", handleTouch)

      return () => {
        if (gameRef.current) {
          gameRef.current.removeEventListener("touchstart", handleTouch)
        }
      }
    }
  }, [isMobile, isPaused, gameOver])

  // Game loop
  useEffect(() => {
    if (isPaused || gameOver) return

    const gameLoop = setInterval(() => {
      // Update bird position (gravity)
      setBirdPosition((prev) => ({
        ...prev,
        y: prev.y + 3,
      }))

      // Move obstacles and sections
      setObstacles((prev) =>
        prev
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - gameSpeed,
          }))
          .filter((obstacle) => obstacle.x > -100),
      )

      setSections((prev) =>
        prev.map((section) => ({
          ...section,
          x: section.x - gameSpeed,
        })),
      )

      // Check collisions
      checkCollisions()

      // Generate new obstacles
      if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 800) {
        generateObstacle()
      }

      // Update score
      updateScore()
    }, 1000 / 60) // 60 FPS

    return () => clearInterval(gameLoop)
  }, [isPaused, gameOver, birdPosition, obstacles, gameSpeed])

  const jump = () => {
    setBirdPosition((prev) => ({
      ...prev,
      y: prev.y - 40,
    }))
  }

  const generateObstacle = () => {
    const gapPosition = Math.floor(Math.random() * 250) + 100

    setObstacles((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: 1000,
        gapPosition,
        passed: false,
      },
    ])
  }

  const checkCollisions = () => {
    // Check if bird hits the ground or ceiling
    if (birdPosition.y < 0 || birdPosition.y > 600) {
      setGameOver(true)
      return
    }

    // Check if bird hits obstacles
    for (const obstacle of obstacles) {
      if (
        birdPosition.x + 40 > obstacle.x &&
        birdPosition.x < obstacle.x + 80 &&
        (birdPosition.y < obstacle.gapPosition || birdPosition.y + 40 > obstacle.gapPosition + 220) // Increased from 180 to 220
      ) {
        setGameOver(true)
        return
      }
    }
  }

  const updateScore = () => {
    const newObstacles = [...obstacles]
    let scoreUpdated = false

    for (let i = 0; i < newObstacles.length; i++) {
      if (!newObstacles[i].passed && newObstacles[i].x < birdPosition.x) {
        newObstacles[i].passed = true
        scoreUpdated = true
      }
    }

    if (scoreUpdated) {
      setScore((prev) => prev + 1)
      setObstacles(newObstacles)

      // Increase game speed every 10 points
      if (score > 0 && score % 10 === 0) {
        setGameSpeed((prev) => Math.min(prev + 0.3, 6))
      }
    }
  }

  return (
    <div
      ref={gameRef}
      className="game-world"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#5ECCE1", // Teal background from the image
        cursor: isPaused ? "default" : "pointer",
      }}
    >
      {/* Sky and clouds */}
      <div className="clouds">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="cloud"
              style={{
                position: "absolute",
                top: `${Math.random() * 200 + 50}px`,
                left: `${Math.random() * 1000 + 100}px`,
                width: "80px",
                height: "40px",
                backgroundColor: "white",
                borderRadius: "20px",
                opacity: 0.8,
                transform: `scale(${Math.random() * 0.5 + 0.8})`,
              }}
            />
          ))}
      </div>

      {/* Mountains in background */}
      <div className="mountains">
        <div
          className="mountain"
          style={{
            position: "absolute",
            bottom: "80px",
            width: "100%",
            height: "150px",
            background: "linear-gradient(to top, #3A7D89, #5ECCE1)",
            clipPath: "polygon(0% 100%, 20% 40%, 40% 80%, 60% 20%, 80% 60%, 100% 10%, 100% 100%)",
          }}
        />
      </div>

      {/* Ground */}
      <div
        className="ground"
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          height: "80px",
          backgroundColor: "#4AA83B", // Green ground
          borderTop: "5px solid #2D6624",
        }}
      />

      {/* Bird character */}
      <Bird position={birdPosition} />

      {/* Obstacles */}
      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          x={obstacle.x}
          gapPosition={obstacle.gapPosition}
          gapSize={220} // Increased from 180 to 220
        />
      ))}

      {/* Portfolio sections */}
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          x={section.x}
          y={section.y}
          onClick={() => onSectionClick(section.id)}
        />
      ))}

      {/* Score display */}
      <div
        className="score"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "24px",
          fontWeight: "bold",
          color: "white",
          textShadow: "2px 2px 0 #000",
        }}
      >
        Score: {score}
      </div>

      {/* Game over overlay */}
      {gameOver && (
        <div
          className="game-over"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            zIndex: 10,
          }}
        >
          <h2 style={{ fontSize: "48px", marginBottom: "20px" }}>Game Over</h2>
          <p style={{ fontSize: "24px", marginBottom: "30px" }}>Score: {score}</p>
          <button
            onClick={resetGame}
            style={{
              padding: "12px 24px",
              fontSize: "18px",
              backgroundColor: "#FF7D2D", // Orange from the image
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
        </div>
      )}

      {/* Game instructions */}
      {!gameOver && score === 0 && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "20px",
            borderRadius: "10px",
            color: "white",
            textAlign: "center",
            zIndex: 5,
          }}
        >
          <p style={{ fontSize: "24px", marginBottom: "15px" }}>Click or Press Space to Jump</p>
          <p style={{ fontSize: "16px" }}>Navigate through obstacles and explore your portfolio!</p>
        </div>
      )}
    </div>
  )
}

