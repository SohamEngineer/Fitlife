import React, { useState } from "react";
import "../styles/workCard.css";

const WorkoutCard = ({ workout, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  if (!workout) return null;

  return (
    <div 
      className="workout-card"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video Background */}
      <div className="workout-card-media">
        <video
          src={workout.videoBase64}
          className="workout-video"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="video-overlay"></div>
        
        {/* Hover Play Indicator */}
        <div className={`play-indicator ${isHovered ? 'visible' : ''}`}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="white" strokeWidth="2" opacity="0.8"/>
            <path d="M19 15L33 24L19 33V15Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Content Section */}
      <div className="workout-card-content">
        <div className="workout-header">
          <h3 className="workout-title">{workout.title}</h3>
          
          {/* Calorie Badge */}
          <div className="calorie-badge">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flame-icon">
              <path d="M8 2C8 2 5 5 5 8C5 10.209 6.791 12 9 12C11.209 12 13 10.209 13 8C13 5 10 2 10 2C10 2 9 4 8 4C7 4 8 2 8 2Z" fill="currentColor"/>
            </svg>
            <span className="calorie-value">{workout.caloryburn}</span>
            <span className="calorie-unit">Cal</span>
          </div>
        </div>

        {/* Description */}
        <p className="workout-description">{workout.description}</p>

        {/* Metadata Footer */}
        <div className="workout-footer">
          <div className="workout-meta">
            {workout.duration && (
              <div className="meta-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M7 3.5V7H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>{workout.duration} min</span>
              </div>
            )}
            
            {workout.difficulty && (
              <div className="meta-item">
                <div className={`difficulty-indicator ${workout.difficulty.toLowerCase()}`}>
                  <span className="difficulty-dot"></span>
                  <span>{workout.difficulty}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Button */}
          <button className="card-action-btn">
            <span>View</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;