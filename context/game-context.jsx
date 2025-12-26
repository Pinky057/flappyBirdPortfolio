"use client"

import { createContext, useContext, useState } from "react"

const GameContext = createContext(undefined)

export function GameProvider({ children }) {
  const [birdPosition, setBirdPosition] = useState({ x: 150, y: 250 })
  const [velocity, setVelocity] = useState(0)
  const [gameSpeed, setGameSpeed] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const restart = () => {
    setBirdPosition({ x: 150, y: 250 })
    setVelocity(0)
    setGameSpeed(3)
    setGameOver(false)
    setScore(0)
  }

  return (
    <GameContext.Provider
      value={{
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
        restart,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGameContext() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider")
  }
  return context
}
