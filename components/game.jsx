"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useGameContext } from "@/context/game-context"
import Bird from "./bird"
import Obstacle from "./obstacle"
import Section from "./section"
import Particle from "./particle"
import { useKeyPress } from "@/hooks/use-key-press"
import { useIsMobile } from "@/hooks/use-mobile"
import { useSound } from "@/hooks/use-sound"

export default function Game({ isPaused, onSectionClick }) {
  const gameRef = useRef(null)
  const hasPlayedHitSound = useRef(false)
  const {
    birdPosition,
    setBirdPosition,
    velocity,
    setVelocity,
    gameSpeed,
    setGameSpeed,
    gameOver,
    setGameOver,
    score,
    setScore,
  } = useGameContext()

  const [obstacles, setObstacles] = useState([])
  const [particles, setParticles] = useState([])
  const [groundOffset, setGroundOffset] = useState(0)
  const [cityOffset, setCityOffset] = useState(0)
  const [cloudsOffset, setCloudsOffset] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [isAI, setIsAI] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const hoverStartTime = useRef(0)
  const [lastVisitedSection, setLastVisitedSection] = useState(null)

  const [sections, setSections] = useState([
    { id: "about", title: "About", x: 800, y: 150, icon: "👤" },
    { id: "experience", title: "Experience", x: 1600, y: 120, icon: "💼" },
    { id: "projects", title: "Projects", x: 2400, y: 280, icon: "🚀" },
    { id: "youtube", title: "YouTube", x: 3200, y: 150, icon: "🎬" },
    { id: "contact", title: "Contact", x: 4000, y: 180, icon: "📧" },
  ])

  const isMobile = useIsMobile()
  const isJumpKeyPressed = useKeyPress(" ")
  const sound = useSound()

  // Complete game reset function
  const resetGame = useCallback(() => {
    setBirdPosition({ x: 150, y: 250 })
    setVelocity(0)
    setGameSpeed(3)
    setObstacles([])
    setParticles([])
    setScore(0)
    setGameOver(false)
    setIsStarted(false)
    setIsAI(false)
    setIsHovering(false)
    hoverStartTime.current = 0
    setLastVisitedSection(null)
    hasPlayedHitSound.current = false
    setSections([
      { id: "about", title: "About", x: 800, y: 150, icon: "👤" },
      { id: "experience", title: "Experience", x: 1600, y: 120, icon: "💼" },
      { id: "projects", title: "Projects", x: 2400, y: 280, icon: "🚀" },
      { id: "youtube", title: "YouTube", x: 3200, y: 150, icon: "🎬" },
      { id: "contact", title: "Contact", x: 4000, y: 180, icon: "📧" },
    ])
    setGroundOffset(0)
    setCityOffset(0)
    setCloudsOffset(0)
  }, [setBirdPosition, setVelocity, setGameSpeed, setScore, setGameOver])

  const jump = useCallback(() => {
    if (gameOver) return
    if (!isStarted) setIsStarted(true)
    setVelocity(-8)
    sound.playJump()
  }, [gameOver, isStarted, setVelocity, sound])

  // Handle jump with keyboard
  useEffect(() => {
    if (!isPaused && isJumpKeyPressed) {
      jump()
    }
  }, [isJumpKeyPressed, isPaused, jump])

  // Handle click/touch
  useEffect(() => {
    const handleInteraction = (e) => {
      // Don't jump if clicking on UI elements
      if (e.target.closest('.no-jump')) return
      if (!isPaused) {
        jump()
      }
    }

    const element = gameRef.current
    if (element) {
      element.addEventListener("click", handleInteraction)
      element.addEventListener("touchstart", handleInteraction, { passive: true })

      return () => {
        element.removeEventListener("click", handleInteraction)
        element.removeEventListener("touchstart", handleInteraction)
      }
    }
  }, [isPaused, jump])

  // Game loop
  useEffect(() => {
    if (isPaused || gameOver || !isStarted) return

    const gameLoop = setInterval(() => {
      // AI Presentation Logic
      if (isAI && !isHovering) {
        // Pause at sections (when they are just entering the "view" near the bird)
        const targetSection = sections.find(s => s.x > 150 && s.x < 160);
        if (targetSection && targetSection.id !== lastVisitedSection) {
          setIsHovering(true);
          hoverStartTime.current = Date.now();
          setLastVisitedSection(targetSection.id);

          // Auto-open modal after a short delay
          setTimeout(() => {
            onSectionClick(targetSection.id);
          }, 500);
        }
      }

      if (isHovering) {
        const elapsed = Date.now() - hoverStartTime.current;
        // Bobbing effect
        setBirdPosition(prev => ({
          ...prev,
          y: 250 + Math.sin(elapsed / 300) * 20
        }));
        setVelocity(0);

        // Resume after 3 seconds
        if (elapsed > 3000) {
          setIsHovering(false);
        }
        return; // Skip physics
      }

      // Apply gravity
      setVelocity((prev) => Math.min(prev + 0.5, 12))

      // Update bird position
      setBirdPosition((prev) => ({
        ...prev,
        y: prev.y + velocity,
      }))

      // Move obstacles and sections
      setObstacles((prev) =>
        prev
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - gameSpeed,
          }))
          .filter((obstacle) => obstacle.x > -100)
      )

      setSections((prev) =>
        prev.map((section) => ({
          ...section,
          x: section.x - gameSpeed,
        }))
      )

      // Update parallax backgrounds
      setGroundOffset((prev) => (prev + gameSpeed) % 48)
      setCityOffset((prev) => (prev + gameSpeed * 0.3) % 200)
      setCloudsOffset((prev) => (prev + gameSpeed * 0.1) % 300)

      // Generate new obstacles
      if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < 600) {
        const gapPosition = Math.floor(Math.random() * 200) + 100
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

      // AI Logic (Only if not hovering)
      if (isAI) {
        const nextObstacle = obstacles.find(o => o.x + 80 > 150);

        if (nextObstacle) {
          const gapCenter = nextObstacle.gapPosition + 100;
          if (birdPosition.y > gapCenter + 10 && velocity > -2) {
            jump();
          }
        } else {
          if (birdPosition.y > 300) {
            jump();
          }
        }
      }

    }, 1000 / 60)

    return () => clearInterval(gameLoop)
  }, [isPaused, gameOver, isStarted, velocity, obstacles, gameSpeed, setBirdPosition, setVelocity, isAI, isHovering, sections, lastVisitedSection, jump])

  // Collision detection and scoring
  useEffect(() => {
    if (gameOver || !isStarted) return

    // Ground/ceiling collision
    if (birdPosition.y < 0 || birdPosition.y > 520) {
      if (!hasPlayedHitSound.current) {
        sound.playDie()
        hasPlayedHitSound.current = true
      }
      setGameOver(true)
      return
    }

    // Pipe collision
    for (const obstacle of obstacles) {
      const birdRight = birdPosition.x + 50
      const birdBottom = birdPosition.y + 35
      const pipeLeft = obstacle.x
      const pipeRight = obstacle.x + 80
      const gapTop = obstacle.gapPosition
      const gapBottom = obstacle.gapPosition + 200

      if (birdRight > pipeLeft && birdPosition.x < pipeRight) {
        if (birdPosition.y < gapTop || birdBottom > gapBottom) {
          if (!hasPlayedHitSound.current) {
            sound.playDie()
            hasPlayedHitSound.current = true
          }
          setGameOver(true)
          return
        }
      }

      // Score point
      if (!obstacle.passed && obstacle.x + 80 < birdPosition.x) {
        sound.playScore()
        setObstacles((prev) =>
          prev.map((o) =>
            o.id === obstacle.id ? { ...o, passed: true } : o
          )
        )
        setScore((prev) => prev + 1)

        // Increase speed every 5 points
        if ((score + 1) % 5 === 0) {
          setGameSpeed((prev) => Math.min(prev + 0.3, 8))
        }

        // Spawn particles
        const newParticles = Array.from({ length: 12 }).map((_, i) => ({
          id: Date.now() + i + Math.random(),
          x: birdPosition.x,
          y: birdPosition.y + 20, // Center of bird roughly
          color: ['#FFD700', '#FFF', '#FF5722', '#4CAF50'][Math.floor(Math.random() * 4)]
        }))
        setParticles(prev => [...prev, ...newParticles])
      }
    }
  }, [birdPosition, obstacles, gameOver, isStarted, score, setGameOver, setScore, setGameSpeed, sound])

  // Cleanup particles
  useEffect(() => {
    if (particles.length === 0) return
    const timer = setInterval(() => {
      setParticles(prev => prev.filter(p => Date.now() - p.id < 1000)) // Remove after 1s
    }, 500)
    return () => clearInterval(timer)
  }, [particles.length])

  // Handle section click
  const handleSectionClick = (sectionId, e) => {
    e.stopPropagation()
    sound.playOpen()
    onSectionClick(sectionId)
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
        cursor: isPaused ? "default" : "pointer",
        imageRendering: "pixelated",
      }}
    >
      {/* Sky gradient - retro style */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(to bottom, #4EC0CA 0%, #4EC0CA 60%, #D4A574 60%, #E8C496 70%, #4EC0CA 70%)",
          zIndex: 0,
        }}
      />

      {/* Clouds layer - slowest parallax */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "200%",
          height: "200px",
          zIndex: 1,
          transform: `translateX(-${cloudsOffset}px)`,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${30 + (i % 3) * 40}px`,
              left: `${i * 180 + 50}px`,
              width: `${60 + (i % 3) * 20}px`,
              height: `${30 + (i % 2) * 10}px`,
              backgroundColor: "#FFFFFF",
              borderRadius: "50px",
              opacity: 0.9,
              boxShadow: "0 4px 0 rgba(0,0,0,0.1)",
            }}
          />
        ))}
      </div>

      {/* City silhouette - medium parallax */}
      <div
        style={{
          position: "absolute",
          bottom: "112px",
          left: 0,
          width: "200%",
          height: "180px",
          zIndex: 1,
          transform: `translateX(-${cityOffset}px)`,
        }}
      >
        {/* Buildings - pre-calculated to avoid hydration issues */}
        {[100, 70, 130, 85, 110, 65, 140, 90, 105, 75, 125, 80, 115, 70, 135, 95, 100, 68, 128, 88].map((height, i) => {
          const width = 40 + (i % 4) * 15
          const windowCount = Math.floor(height / 25)
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: 0,
                left: `${i * 70}px`,
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor: "#5D8C51",
                borderTop: "4px solid #4A7341",
                boxSizing: "border-box",
              }}
            >
              {/* Windows */}
              {Array.from({ length: windowCount }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    position: "absolute",
                    top: `${8 + j * 22}px`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "12px",
                    height: "12px",
                    backgroundColor: (i + j) % 3 === 0 ? "#FFE082" : "#4A7341",
                  }}
                />
              ))}
            </div>
          )
        })}
      </div>

      {/* Ground with pixel texture */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "112px",
          zIndex: 2,
          overflow: "hidden",
        }}
      >
        {/* Grass top layer */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: `-${groundOffset}px`,
            width: "calc(100% + 96px)",
            height: "24px",
            backgroundImage: `repeating-linear-gradient(
              to right,
              #5D8C51 0px,
              #5D8C51 12px,
              #6B9B5E 12px,
              #6B9B5E 24px,
              #5D8C51 24px,
              #5D8C51 36px,
              #4A7341 36px,
              #4A7341 48px
            )`,
            borderTop: "4px solid #4A7341",
            boxSizing: "border-box",
          }}
        />
        {/* Dirt layer */}
        <div
          style={{
            position: "absolute",
            top: "24px",
            left: `-${groundOffset}px`,
            width: "calc(100% + 96px)",
            height: "88px",
            backgroundColor: "#DEB887",
            backgroundImage: `
              repeating-linear-gradient(
                to right,
                transparent 0px,
                transparent 22px,
                #C4A574 22px,
                #C4A574 26px
              ),
              repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 10px,
                #C4A574 10px,
                #C4A574 14px
              )
            `,
          }}
        />
      </div>

      {/* Bird character */}
      <Bird position={birdPosition} velocity={velocity} />

      {/* Obstacles */}
      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          x={obstacle.x}
          gapPosition={obstacle.gapPosition}
          gapSize={200}
        />
      ))}

      {/* Portfolio sections as collectible-style items */}
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          icon={section.icon}
          x={section.x}
          y={section.y}
          onClick={(e) => handleSectionClick(section.id, e)}
        />
      ))}

      {/* Particles */}
      {particles.map((p) => (
        <Particle key={p.id} x={p.x} y={p.y} color={p.color} />
      ))}

      {/* Retro score display */}
      <div
        className="no-jump"
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "48px",
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          fontWeight: "bold",
          color: "white",
          textShadow: `
            -2px -2px 0 #000,
            2px -2px 0 #000,
            -2px 2px 0 #000,
            2px 2px 0 #000,
            0 4px 0 #000
          `,
          zIndex: 10,
          letterSpacing: "4px",
        }}
      >
        {score}
      </div>

      {/* Start screen */}
      {!isStarted && !gameOver && (
        <div
          className="no-jump"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#DEB887",
              border: "8px solid #8B4513",
              borderRadius: "0",
              padding: "30px 50px",
              boxShadow: "0 8px 0 #5D4E37",
              imageRendering: "pixelated",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "center"
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                color: "#543E14",
                marginBottom: "10px",
                textShadow: "2px 2px 0 #FFF",
                lineHeight: 1.5,
              }}
            >
              PINKY'S
              <br />
              PORTFOLIO
            </h1>
            <p
              style={{
                fontSize: "12px",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                color: "#8B4513",
                marginBottom: "10px",
                lineHeight: 1.8,
              }}
            >
              TAP OR PRESS
              <br />
              SPACE TO FLY
            </p>

            <div style={{ display: 'flex', gap: '20px' }}>
              <button
                className="no-jump"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAI(false);
                  jump(); // Starts the game
                }}
                style={{
                  padding: "10px 20px",
                  fontSize: "12px",
                  fontFamily: "'Press Start 2P', 'Courier New', monospace",
                  backgroundColor: "#73BF2E",
                  color: "white",
                  border: "4px solid #558B2F",
                  cursor: "pointer",
                  textShadow: "1px 1px 0 #2E5A1C",
                }}
              >
                PLAY
              </button>
              <button
                className="no-jump"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAI(true);
                  setIsStarted(true); // Start immediately
                }}
                style={{
                  padding: "10px 20px",
                  fontSize: "12px",
                  fontFamily: "'Press Start 2P', 'Courier New', monospace",
                  backgroundColor: "#4EC0CA",
                  color: "white",
                  border: "4px solid #2980B9",
                  cursor: "pointer",
                  textShadow: "1px 1px 0 #2980B9",
                }}
              >
                WATCH (AI)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game over screen */}
      {gameOver && (
        <div
          className="no-jump"
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
            zIndex: 20,
          }}
        >
          <div
            style={{
              backgroundColor: "#DEB887",
              border: "8px solid #8B4513",
              padding: "40px 60px",
              textAlign: "center",
              boxShadow: "0 8px 0 #5D4E37",
            }}
          >
            <h2
              style={{
                fontSize: "32px",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                color: "#E74C3C",
                marginBottom: "20px",
                textShadow: "3px 3px 0 #000",
              }}
            >
              GAME OVER
            </h2>
            <p
              style={{
                fontSize: "16px",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                color: "#543E14",
                marginBottom: "30px",
              }}
            >
              SCORE: {score}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                sound.playClick()
                resetGame()
              }}
              style={{
                padding: "15px 30px",
                fontSize: "14px",
                fontFamily: "'Press Start 2P', 'Courier New', monospace",
                backgroundColor: "#73BF2E",
                color: "white",
                border: "4px solid #558B2F",
                borderBottom: "8px solid #2E5A1C",
                cursor: "pointer",
                textShadow: "2px 2px 0 #2E5A1C",
                transition: "transform 0.1s",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(4px)"
                e.currentTarget.style.borderBottomWidth = "4px"
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.borderBottomWidth = "8px"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.borderBottomWidth = "8px"
              }}
            >
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}

      {/* Add CSS keyframes for blink animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}