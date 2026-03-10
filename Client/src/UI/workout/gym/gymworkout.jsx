import React from "react";

import "./gymworkout.css";
import WorkoutCard from "../../../component/workoutcard";
import { useGym } from "./hooks/useGym";

const Gym = () => {
 const{currentType,
    progressPercent,
    handleWorkoutClick,
    handleDaySelect,
    isLoading,
    todayWorkout,
    setFilter,
  selectedDay,
completedDays,
workoutTypes,
filter,
navigate,
isPrime}=useGym();

  return (
    <div className="gym-workout-container container">
      {/* Header Section */}
      <header className="gw-header">
        <div className="gw-header-content">
          <div className="gw-badge">
            <span className="badge-icon">🏋️</span>
            <span>Gym Training Program</span>
          </div>
          <h1 className="gw-title">
            Build Your Strength
            <span className="gw-title-gradient"> at the Gym</span>
          </h1>
          <p className="gw-description">
            Professional gym workouts designed to maximize gains, build muscle, and increase strength with proven techniques.
          </p>
        </div>

        {/* Progress Circle */}
        <div className="gw-progress-circle">
          <svg className="progress-ring" width="160" height="160">
            <circle
              className="progress-ring-bg"
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#ffe8e0"
              strokeWidth="8"
            />
            <circle
              className="progress-ring-fill"
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="url(#gymProgressGradient)"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - progressPercent / 100)}`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gymProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
          <div className="progress-center">
            <div className="progress-day">{selectedDay}</div>
            <div className="progress-label">of 30</div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="gw-main-grid">
        {/* Sidebar - Day Selector */}
        <aside className="gw-sidebar">
          <div className="sidebar-sticky">
            <div className="sidebar-header">
              <h3 className="sidebar-title">Training Days</h3>
              <div className="completion-badge">
                {completedDays} completed
              </div>
            </div>

            <div className="day-list">
              {[...Array(30)].map((_, i) => {

  const day = i + 1;
  const isSelected = selectedDay === day;
  const isCompleted = day < selectedDay;
  const isLocked = !isPrime && day > 7;

  return (
    <button
      key={day}
      disabled={isLocked}
      className={`day-item 
        ${isSelected ? "selected" : ""} 
        ${isCompleted ? "completed" : ""} 
        ${isLocked ? "locked" : ""}`}
      onClick={() => handleDaySelect(day)}
    >

      <div className="day-item-content">

        <span className="day-item-number">
          {isLocked ? "🔒" : isCompleted ? "✓" : day}
        </span>

        <span className="day-item-label">
          Day {day}
        </span>

      </div>

      {isSelected && <div className="day-item-indicator"></div>}

    </button>
  );

})}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="gw-content">
          {/* Workout Type Selector */}
          <section className="workout-type-section">
            <h2 className="content-title">Choose Your Focus</h2>
            
            <div className="type-selector-grid">
              {workoutTypes.map((type) => (
                <button
                  key={type.value}
                  className={`type-card ${filter === type.value ? "active" : ""} type-${type.color}`}
                  onClick={() => setFilter(type.value)}
                >
                  <div className="type-card-icon">{type.icon}</div>
                  <div className="type-card-content">
                    <h3 className="type-card-title">{type.value}</h3>
                    <p className="type-card-desc">{type.description}</p>
                  </div>
                  {filter === type.value && (
                    <div className="type-card-check">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M16.667 5L7.5 14.167 3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Current Selection Info */}
          <section className="current-selection">
            <div className="selection-header">
              <div className="selection-info">
                <h2 className="selection-title">
                  <span className="selection-icon">{currentType?.icon}</span>
                  {filter} Workout
                </h2>
                <p className="selection-meta">
                  Day {selectedDay} • {todayWorkout.length} {todayWorkout.length === 1 ? 'Exercise' : 'Exercises'}
                </p>
              </div>
              
              {todayWorkout.length > 0 && (
                <button 
                  className="quick-start-btn"
                  onClick={() => navigate('/start-workout', { state: { workouts: todayWorkout } })}
                >
                  <span>Quick Start</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </section>

          {/* Workout Cards */}
          <section className="workout-cards-section">
            {isLoading ? (
              <div className="gw-loading">
                <div className="loading-spinner-wrapper">
                  <div className="loading-spinner"></div>
                  <div className="loading-pulse"></div>
                </div>
                <p className="loading-message">Loading your workout plan...</p>
              </div>
            ) : todayWorkout.length > 0 ? (
              <div className="workout-cards-grid">
                {todayWorkout.map((item, index) => (
                  <div
                    key={item._id}
                    className="workout-card-item"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    <WorkoutCard
                      workout={item}
                      onClick={() => handleWorkoutClick(item._id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="gw-empty-state">
                <div className="empty-state-icon">
                  <div className="icon-circle">
                    <span>🏋️</span>
                  </div>
                </div>
                <h3 className="empty-state-title">No Workouts Available</h3>
                <p className="empty-state-message">
                  We couldn't find any {filter.toLowerCase()} workouts for Day {selectedDay}.
                </p>
                <div className="empty-state-actions">
                  <button 
                    className="empty-action-btn primary"
                    onClick={() => setFilter("Full Body")}
                  >
                    Try Full Body
                  </button>
                  <button 
                    className="empty-action-btn secondary"
                    onClick={() => handleDaySelect(1)}
                  >
                    Back to Day 1
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Bottom Action */}
          {todayWorkout.length > 0 && (
            <section className="bottom-action">
              <div className="action-card">
                <div className="action-content">
                  <h3 className="action-title">Ready to push your limits?</h3>
                  <p className="action-description">
                    {todayWorkout.length} exercises designed for maximum results
                  </p>
                </div>
                <button 
                  className="main-start-btn"
                  onClick={() => navigate('/start-workout', { state: { workouts: todayWorkout } })}
                >
                  <span className="btn-text">Start Workout</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Gym;