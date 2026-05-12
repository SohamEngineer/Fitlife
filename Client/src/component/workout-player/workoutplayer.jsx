import React, { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useWorkoutPlayer from "./hooks/useWorkoutPlayer"
import "./workoutplayer.css"
import FitBotPanel from "../FitBot/FitBotPanel"

import {
  FaArrowLeft,
  FaPause,
  FaPlay,
  FaForward,
  FaBackward,
  FaRedo,
  FaFireAlt
} from "react-icons/fa"

import { MdSkipNext } from "react-icons/md"
import { IoCheckmarkCircle } from "react-icons/io5"

const AnimatedWorkout = () => {

  const { state } = useLocation()
  const navigate = useNavigate()
  const workouts = useMemo(() => {
    if (state?.workouts?.length) {
      sessionStorage.setItem("fitlifeLastWorkoutQueue", JSON.stringify(state.workouts))
      return state.workouts
    }

    try {
      return JSON.parse(sessionStorage.getItem("fitlifeLastWorkoutQueue") || "[]")
    } catch (_error) {
      return []
    }
  }, [state])

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const {
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
    setPaused,
    handleNext,
    handlePrevious,
    handleSkipRest,
    reset
  } = useWorkoutPlayer(workouts)

  /* Keyboard Controls */

  useEffect(() => {
    const handleKeyPress = (e) => {

      if (e.code === "Space") {
        e.preventDefault()
        setPaused((p) => !p)
      }

      else if (e.code === "ArrowRight") {
        handleNext()
      }

      else if (e.code === "ArrowLeft") {
        handlePrevious()
      }

    }

    window.addEventListener("keydown", handleKeyPress)

    return () => window.removeEventListener("keydown", handleKeyPress)

  }, [handleNext, handlePrevious, setPaused])


  /* Touch gestures */

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {

    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (distance > minSwipeDistance) handleNext()
    else if (distance < -minSwipeDistance) handlePrevious()

  }

  const handleDoubleTap = (e) => {
    if (e.detail === 2) {
      setPaused((p) => !p)
    }
  }

  const workoutContext = {
    phase,
    currentIndex,
    currentTitle: current?.title,
    currentDescription: current?.description,
    currentCalories: current?.caloryburn,
    nextTitle: next?.title,
    timeLeft,
    totalExercises: workouts.length,
  }

  /* Empty State */

  if (!workouts.length) {
    return (
      <div className="animated-workout">
        <div className="container empty-container">

          <div className="empty-icon">🏋️‍♂️</div>

          <h2>No Workouts Selected</h2>

          <p>Please select a workout to begin your training session.</p>

          <button
            onClick={() => navigate(-1)}
            className="back-home-btn"
          >
            Back to Workouts
          </button>

        </div>
      </div>
    )
  }

  return (

    <div
      className={`animated-workout 
        ${phase === "rest" ? "rest-mode" : "workout-mode"} 
        ${showComplete ? "complete-mode" : ""} 
        ${paused ? "paused-mode" : ""}`
      }
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >

      {/* Background */}

      <div className="animated-bg">

        <div className="bg-gradient"></div>

        <div className="bg-particles">

          {[...Array(20)].map((_, i) => (

            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />

          ))}

        </div>

      </div>


      {/* TOP PROGRESS */}

      <div className="top-progress">

        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />

      </div>


      {/* HEADER */}

      <header className="workout-header container">

        <button
          className="icon-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={22} />
        </button>

        <div className="header-status">

          <span className="status-badge">
            {phase === "rest" ? "💤 Rest" : "💪 Active"}
          </span>

          <span className="counter">
            {currentIndex + 1}/{workouts.length}
          </span>

        </div>

      </header>


      {!showComplete ? (

        <>

          {/* VIDEO */}

          <div
            className="video-container"
            onClick={handleDoubleTap}
          >

            <video
              key={phase === "rest" ? `rest-${next?._id}` : `workout-${current?._id}`}
              src={phase === "rest" ? next?.videoBase64 : current?.videoBase64}
              autoPlay
              muted
              loop
              playsInline
              className="bg-video"
            />

            <div className="video-overlay"></div>

          </div>


          {/* CENTER CONTENT */}

          <div className="center-content container">

            <div className="workout-info">

              {phase === "rest" ? (

                <>
                  <div className="up-next">

                    <span className="next-badge">
                      Up Next
                    </span>

                    <h3 className="next-exercise">
                      {next?.title || "Complete!"}
                    </h3>

                  </div>

                  <h1 className="main-title rest-title">
                    💤 Rest Time
                  </h1>

                </>

              ) : (

                <>

                  <h1 className="main-title">
                    {current?.title}
                  </h1>

                  {current?.description && (
                    <p className="description">
                      {current.description}
                    </p>
                  )}

                  <div className="exercise-meta">
                    {current?.caloryburn && (
                      <span className="meta-chip">
                        <FaFireAlt aria-hidden="true" />
                        {current.caloryburn} kcal
                      </span>
                    )}
                    {current?.type && (
                      <span className="meta-chip">
                        {current.type}
                      </span>
                    )}
                    {current?.day && (
                      <span className="meta-chip">
                        {current.day}
                      </span>
                    )}
                  </div>

                </>

              )}

            </div>


            {/* TIMER */}

            <div className="timer-display">

              <svg className="timer-circle" viewBox="0 0 200 200">

                <circle cx="100" cy="100" r="85" className="timer-bg" />

                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  className="timer-ring"
                  strokeDasharray={`${2 * Math.PI * 85}`}
                  strokeDashoffset={`${2 * Math.PI * 85 * (1 - timerProgress / 100)}`}
                />

              </svg>

              <div className="timer-text">

                <span className={`time ${timeLeft <= 5 ? "urgent" : ""}`}>
                  {String(timeLeft).padStart(2, "0")}
                </span>

                <span className="unit">
                  seconds
                </span>

              </div>

            </div>


            {/* CONTROLS */}

            <div className="controls">

              <button
                className="control-btn secondary"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <FaBackward size={22} />
              </button>

              <button
                className="control-btn primary"
                onClick={() => setPaused(!paused)}
              >
                {paused ? <FaPlay size={24} /> : <FaPause size={24} />}
              </button>

              {phase === "rest" ? (

                <button
                  className="control-btn skip"
                  onClick={handleSkipRest}
                >
                  Skip <MdSkipNext size={20} />
                </button>

              ) : (

                <button
                  className="control-btn secondary"
                  onClick={handleNext}
                >
                  <FaForward size={22} />
                </button>

              )}

            </div>

          </div>


          {/* QUEUE */}

          <div className="exercise-queue container">

            <div className="queue-header">
              <span>Next Up</span>
            </div>

            <div className="queue-list">

              {workouts
                .slice(currentIndex + 1, currentIndex + 4)
                .map((w, idx) => (

                  <div
                    key={w._id || idx}
                    className="queue-item"
                  >

                    <span className="queue-num">
                      {currentIndex + idx + 2}
                    </span>

                    <span className="queue-name">
                      {w.title}
                    </span>

                    {w.caloryburn && (
                      <span className="queue-cal">
                        {w.caloryburn} kcal
                      </span>
                    )}

                  </div>

                ))}

            </div>

          </div>


          {/* PAUSE OVERLAY */}

          {paused && (

            <div className="pause-screen">

              <div className="pause-content">

                <FaPause size={60} />

                <h2>Paused</h2>

                <p>Double tap or press Space to continue</p>

              </div>

            </div>

          )}

        </>

      ) : (

        /* COMPLETION SCREEN */

        <div className="completion-screen">

          <div className="completion-content container">

            <IoCheckmarkCircle
              size={100}
              className="success-icon"
            />

            <h1 className="completion-title">
              Workout Complete!
            </h1>

            <p className="completion-subtitle">
              Amazing work! 🎉
            </p>

            <div className="stats-grid">

              <div className="stat-box">

                <div className="stat-value">
                  {workouts.length}
                </div>

                <div className="stat-label">
                  Exercises
                </div>

              </div>

              <div className="stat-box">

                <div className="stat-value">
                  {totalCalories}
                </div>

                <div className="stat-label">
                  Calories
                </div>

              </div>

            </div>

            <div className="completion-actions">

              <button
                className="action-btn primary"
                onClick={() => navigate(-1)}
              >
                Done
              </button>

              <button
                className="action-btn secondary"
                onClick={reset}
              >
                <FaRedo size={18} />
                Restart
              </button>

            </div>

          </div>

        </div>

      )}

      <FitBotPanel workoutContext={workoutContext} />

    </div>

  )

}

export default AnimatedWorkout
