"use client"

import { createContext, useContext, useState } from "react"

const GameContext = createContext(undefined)

export function GameProvider({ children }) {
  const [birdPosition, setBirdPosition] = useState({ x: 150, y: 200 })
  const [gameSpeed, setGameSpeed] = useState(2) // Reduced from 3 to 2
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  // Update the restart function in the context to be more comprehensive
  const restart = () => {
    setBirdPosition({ x: 150, y: 200 })
    setGameSpeed(2)
    setGameOver(false)
    setScore(0)
  }

  return (
    <GameContext.Provider
      value={{
        birdPosition,
        setBirdPosition,
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

