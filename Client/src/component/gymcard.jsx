import React from "react";
import "../styles/workCard.css";

const GymWorkoutCard = ({ workout, onClick }) => {
  return (
    <div className="workout-card" onClick={onClick}>
      <video
        className="workout-video"
        src={workout.videoBase64}
        autoPlay
        loop
        muted
        playsInline
      ></video>

      <div className="workout-content">
        <h3>{workout.title}</h3>
        <p>{workout.description}</p>
      </div>

      <span>{workout.caloryburn} Cal</span>
    </div>
  );
};

export default GymWorkoutCard;
