import React, { useEffect, useState, useCallback } from "react";
import "../../../styles/WorkoutPlayer.css";

import { useLocation, useNavigate } from "react-router-dom";
import { FaPause, FaPlay } from "react-icons/fa6";

const WorkoutPlayer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const workouts = state?.workouts || [];
  const [paused, setPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [phase, setPhase] = useState("workout");

  const handleNext = useCallback(() => {
    if (currentIndex + 1 < workouts.length) {
      setCurrentIndex((prev) => prev + 1);
      setPhase("workout");
      setTimeLeft(30);
    } else {
      alert("Workout Complete!");
      navigate(-1);
    }
  }, [currentIndex, workouts.length, navigate]);

  useEffect(() => {
    if (paused) return;

    if (timeLeft === 0) {
      if (phase === "workout") {
        setPhase("rest");
        setTimeLeft(20);
      } else {
        handleNext();
      }
      return;
    }

    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [paused, timeLeft, phase, handleNext]);

  const current = workouts[currentIndex];
  const next = workouts[currentIndex + 1];

  return (
    <div className="player-container">
      <div className="top-bar">
        <span className="back-icon" onClick={() => navigate(-1)}>&larr;</span>
        <h2>Home Workout</h2>
        <span>{currentIndex + 1}/{workouts.length}</span>
      </div>

      <video
        src={phase === "rest" ? next?.videoBase64 : current?.videoBase64}
        autoPlay
        muted
        loop
        playsInline
        className="preview-video"
      />

      {phase === "rest" ? (
        <>
          <p>Next</p>
          <h3>{next?.title || "Done"}</h3>
          <h2>Rest</h2>
        </>
      ) : (
        <h2>{current?.title}</h2>
      )}

      <div className="controls">
        <button onClick={() => setPaused(!paused)} className="pause-btn">
          {paused ? <FaPlay /> : <FaPause />}
        </button>

        <button onClick={handleNext} className="next-btn">
          {phase === "rest" ? "Skip" : "Next"}
        </button>
      </div>

      <div className="timer-display">
        <h1>00 : {String(timeLeft).padStart(2, "0")}</h1>
      </div>
    </div>
  );
};

export default WorkoutPlayer;
