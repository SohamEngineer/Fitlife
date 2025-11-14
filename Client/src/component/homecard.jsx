import React from "react";
import "../styles/workCard.css";

const WorkoutCard = ({ workout, onClick }) => {
  if (!workout) return null;

  return (
    <div className="workout-card" onClick={onClick}>
      <video
        src={workout.videoBase64}
        className="workout-video"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="workout-content">
        <h3>{workout.title}</h3>
        <p>{workout.description}</p>
      </div>

      <span className="cal">{workout.caloryburn} Cal</span>
    </div>
  );
};

export default WorkoutCard;
