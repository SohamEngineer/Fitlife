import React from 'react';
import '../../../styles/WorkCard.css';

const GymWorkoutCard = ({ workout }) => {
  console.log(workout)
  return (
    <div className="workout-card">
      <video
        className="workout-video"
        src={workout.videoBase64} // base64 or public URL
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
