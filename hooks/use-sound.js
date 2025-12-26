"use client"

import { useCallback, useEffect, useRef } from "react"

// Generate 8-bit style sounds using Web Audio API
export function useSound() {
  const audioContextRef = useRef(null)
  const isMutedRef = useRef(false)

  useEffect(() => {
    // Create audio context on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
    }

    window.addEventListener("click", initAudio, { once: true })
    window.addEventListener("keydown", initAudio, { once: true })
    window.addEventListener("touchstart", initAudio, { once: true })

    return () => {
      window.removeEventListener("click", initAudio)
      window.removeEventListener("keydown", initAudio)
      window.removeEventListener("touchstart", initAudio)
    }
  }, [])

  const playTone = useCallback((frequency, duration, type = "square", volume = 0.3) => {
    if (isMutedRef.current || !audioContextRef.current) return

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

    gainNode.gain.setValueAtTime(volume, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  }, [])

  const playJump = useCallback(() => {
    if (!audioContextRef.current) return

    // Classic flappy bird wing flap sound
    playTone(400, 0.05, "square", 0.2)
    setTimeout(() => playTone(500, 0.05, "square", 0.15), 30)
    setTimeout(() => playTone(600, 0.08, "square", 0.1), 60)
  }, [playTone])

  const playScore = useCallback(() => {
    if (!audioContextRef.current) return

    // Coin/point sound effect
    playTone(880, 0.1, "square", 0.2)
    setTimeout(() => playTone(1320, 0.15, "square", 0.15), 80)
  }, [playTone])

  const playHit = useCallback(() => {
    if (!audioContextRef.current) return

    // Hit/crash sound
    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = "sawtooth"
    oscillator.frequency.setValueAtTime(200, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.2)

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.2)
  }, [])

  const playDie = useCallback(() => {
    if (!audioContextRef.current) return

    // Game over fall sound
    playHit()
    setTimeout(() => {
      const ctx = audioContextRef.current
      if (!ctx) return

      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = "square"
      oscillator.frequency.setValueAtTime(300, ctx.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5)

      gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5)

      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.5)
    }, 200)
  }, [playHit])

  const playClick = useCallback(() => {
    if (!audioContextRef.current) return
    playTone(600, 0.05, "square", 0.15)
  }, [playTone])

  const playOpen = useCallback(() => {
    if (!audioContextRef.current) return

    // Menu open sound
    playTone(440, 0.08, "square", 0.15)
    setTimeout(() => playTone(660, 0.08, "square", 0.12), 50)
    setTimeout(() => playTone(880, 0.1, "square", 0.1), 100)
  }, [playTone])

  const playClose = useCallback(() => {
    if (!audioContextRef.current) return

    // Menu close sound
    playTone(880, 0.08, "square", 0.15)
    setTimeout(() => playTone(660, 0.08, "square", 0.12), 50)
    setTimeout(() => playTone(440, 0.1, "square", 0.1), 100)
  }, [playTone])

  const toggleMute = useCallback(() => {
    isMutedRef.current = !isMutedRef.current
    return isMutedRef.current
  }, [])

  return {
    playJump,
    playScore,
    playHit,
    playDie,
    playClick,
    playOpen,
    playClose,
    toggleMute,
    isMuted: () => isMutedRef.current,
  }
}