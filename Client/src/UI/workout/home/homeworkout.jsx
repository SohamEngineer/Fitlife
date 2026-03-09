import React from "react";
import WorkoutCard from "../../../component/workoutcard";
import "./homeworkout.css";
import useHome from "./hooks/useHome";

const HomeWorkout = () => {
  const {currentType,
    progressPercent,
    handleStart,
    handleDaySelect,
    isLoading,
    todayWorkout,
    setFilter,
    filter,
    selectedDay,
    completedDays,
    workoutTypes,
    navigate}=useHome();
  return (
    <div className="home-workout-container container">
      {/* Header Section */}
      <header className="hw-header">
        <div className="hw-header-content">
          <div className="hw-badge">
            <span className="badge-icon">🏠</span>
            <span>Home Workout Program</span>
          </div>
          <h1 className="hw-title">
            Your Fitness Journey
            <span className="hw-title-gradient"> at Home</span>
          </h1>
          <p className="hw-description">
            No equipment needed. Build strength, flexibility, and endurance from the comfort of your home.
          </p>
        </div>

        {/* Progress Circle */}
        <div className="hw-progress-circle">
          <svg className="progress-ring" width="160" height="160">
            <circle
              className="progress-ring-bg"
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#e0e7ff"
              strokeWidth="8"
            />
            <circle
              className="progress-ring-fill"
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - progressPercent / 100)}`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
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
      <div className="hw-main-grid">
        {/* Sidebar - Day Selector */}
        <aside className="hw-sidebar">
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

                return (
                  <button
                    key={day}
                    className={`day-item ${isSelected ? "selected" : ""} ${isCompleted ? "completed" : ""}`}
                    onClick={() => handleDaySelect(day)}
                  >
                    <div className="day-item-content">
                      <span className="day-item-number">
                        {isCompleted ? "✓" : day}
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
        <main className="hw-content">
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
                <button className="quick-start-btn" onClick={handleStart}>
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
              <div className="hw-loading">
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
                      onClick={() => navigate(`/homeworkout/${item._id}`)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="hw-empty-state">
                <div className="empty-state-icon">
                  <div className="icon-circle">
                    <span>💪</span>
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
                  <h3 className="action-title">Ready to begin?</h3>
                  <p className="action-description">
                    {todayWorkout.length} exercises waiting for you
                  </p>
                </div>
                <button className="main-start-btn" onClick={handleStart}>
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

export default HomeWorkout;