import React from 'react';
import '../styles/WorkCard.css';

const WorkoutCard = ({ workout,onClick }) => {
  return (
    <div className="workout-card" onClick={onClick}>
      <video
        // controls
        src={workout.videoBase64} // base64 or video URL
        className="workout-video"
        autoPlay
  loop
  muted
  playsInline
      ></video>
      <div className="workout-content">
        <h3>{workout.title}</h3>
        <p>{workout.description}</p>
      </div>
      {/* <span>{workout.caloryburn} Cal</span> */}
    </div>
  );
};

export default WorkoutCard;
