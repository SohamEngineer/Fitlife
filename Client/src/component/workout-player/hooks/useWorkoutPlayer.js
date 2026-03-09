import { useState, useEffect, useCallback, useMemo } from "react"

const WORK_TIME = 30
const REST_TIME = 20

export default function useWorkoutPlayer(workouts = []) {
  const [paused, setPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(WORK_TIME)
  const [phase, setPhase] = useState("workout")
  const [showComplete, setShowComplete] = useState(false)
  const [totalCalories, setTotalCalories] = useState(0)

  const current = workouts[currentIndex]
  const next = workouts[currentIndex + 1]

  const progress = useMemo(() => {
    if (!workouts.length) return 0
    return ((currentIndex + 1) / workouts.length) * 100
  }, [currentIndex, workouts.length])

  const timerProgress = useMemo(() => {
    const max = phase === "workout" ? WORK_TIME : REST_TIME
    return ((max - timeLeft) / max) * 100
  }, [timeLeft, phase])

  const handleNext = useCallback(() => {
    if (currentIndex + 1 < workouts.length) {
      setCurrentIndex((i) => i + 1)
      setPhase("workout")
      setTimeLeft(WORK_TIME)
      setPaused(false)
    } else {
      const total = workouts.reduce(
        (sum, w) => sum + (w.caloryburn || 0),
        0
      )
      setTotalCalories(total)
      setShowComplete(true)
    }
  }, [currentIndex, workouts])

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
      setPhase("workout")
      setTimeLeft(WORK_TIME)
      setPaused(false)
    }
  }, [currentIndex])

  const handleSkipRest = useCallback(() => {
    if (phase === "rest") handleNext()
  }, [phase, handleNext])

  // Timer Engine
  useEffect(() => {
    if (paused || showComplete || !workouts.length) return

    if (timeLeft === 0) {
      if (phase === "workout") {
        setPhase("rest")
        setTimeLeft(REST_TIME)
      } else {
        handleNext()
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [paused, timeLeft, phase, handleNext, showComplete, workouts.length])

  const reset = useCallback(() => {
    setCurrentIndex(0)
    setPhase("workout")
    setTimeLeft(WORK_TIME)
    setShowComplete(false)
    setPaused(false)
    setTotalCalories(0)
  }, [])

  return {
    // State
    paused,
    current,
    next,
    currentIndex,
    phase,
    timeLeft,
    progress,
    timerProgress,
    showComplete,
    totalCalories,

    // Actions
    setPaused,
    handleNext,
    handlePrevious,
    handleSkipRest,
    reset
  }
}
