import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../../styles/WorkoutPlayer.css";
import { FaPause, FaPlay } from "react-icons/fa6";

const WorkoutPlayer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const workouts = state?.workouts || [];

  const [paused, setPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [phase, setPhase] = useState("workout"); // "workout" or "rest"

  // ✅ useCallback makes this stable
  const handleNext = useCallback(() => {
    if (currentIndex + 1 < workouts.length) {
      setCurrentIndex((prev) => prev + 1);
      setPhase("workout");
      setTimeLeft(30); // Workout time duration
    } else {
      alert("Workout Complete!");
      navigate(-1);
    }
  }, [currentIndex, workouts.length, navigate]);

  useEffect(() => {
    if (paused || currentIndex >= workouts.length) return;

    if (timeLeft === 0) {
      if (currentIndex + 1 === workouts.length) {
        alert("Workout Complete!");
        navigate(-1);
        return;
      }

      if (phase === "workout") {
        setPhase("rest");
        setTimeLeft(20); // Rest time
      } else {
        handleNext();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, paused, phase, currentIndex, workouts.length, navigate, handleNext]); // ✅ added handleNext

  const currentWorkout = workouts[currentIndex];
  const nextWorkout = workouts[currentIndex + 1];

  return (
    <div className="player-container">
      <div className="top-bar">
        <span className="back-icon" onClick={() => navigate(-1)}>&larr;</span>
        <h2>Home Workout</h2>
        <span>{currentIndex + 1}/{workouts.length}</span>
      </div>

      <div className="image-section">
        <video
          src={phase === "rest" ? nextWorkout?.videoBase64 : currentWorkout?.videoBase64}
          autoPlay
          muted
          playsInline
          loop
          style={{ maxHeight: "400px", borderRadius: "10px" }}
        />
      </div>

      {phase === "rest" ? (
        <>
          <div className="rest-next">
            <p>Next</p>
            <h3>{nextWorkout?.title || "Done"}</h3>
          </div>
          <h2>Rest</h2>
        </>
      ) : (
        <h2>{currentWorkout?.title}</h2>
      )}

      <div className="useButton">
        {phase !== "rest" ? (
          <>
            <button className="pause-btn" onClick={() => setPaused(!paused)}>
              {paused ? <FaPlay /> : <FaPause />}
            </button>
            <button className="next-btn" onClick={handleNext}>Next</button>
          </>
        ) : (
          <>
            <div className="timer-display">
              <button className="pause-btn" onClick={() => setPaused(!paused)}>
                {paused ? <FaPlay /> : <FaPause />}
              </button>
            </div>
            <button className="skip-btn" onClick={handleNext}>Skip</button>
          </>
        )}
      </div>

      <div className="timer-display">
        <h1>00 : {timeLeft.toString().padStart(2, "0")}</h1>
      </div>
    </div>
  );
};

export default WorkoutPlayer;
