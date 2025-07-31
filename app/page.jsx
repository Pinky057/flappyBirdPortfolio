"use client"

import { useState } from "react"
import Game from "@/components/game"
import Modal from "@/components/modal"
import BottomNav from "@/components/bottom-nav"
import { GameProvider } from "@/context/game-context"

export default function Home() {
  const [activeSection, setActiveSection] = useState(null)
  const [isPaused, setIsPaused] = useState(false)

  const openSection = (section) => {
    setActiveSection(section)
    setIsPaused(section !== null)
  }

  const closeSection = () => {
    setActiveSection(null)
    setIsPaused(false)
  }

  return (
    <GameProvider>
      <main className="game-container">
        <Game isPaused={isPaused} onSectionClick={openSection} />

        {activeSection && <Modal section={activeSection} onClose={closeSection} />}

        <BottomNav onSectionClick={openSection} activeSection={activeSection} />
      </main>
    </GameProvider>
  )
}

