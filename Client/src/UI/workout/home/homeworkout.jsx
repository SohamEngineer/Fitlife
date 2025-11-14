import React, { useState, useEffect } from "react";
import "../../../styles/homeworkout.css";

// import WorkoutCard from "../../workoutCard";
import { useNavigate } from "react-router-dom";
import { getAllHomeWorkoutsApi } from "../../../api/homeworkout.api";
import WorkoutCard from "../../../component/homecard";

const HomeWorkout = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [filter, setFilter] = useState("Full Body");
  const [allWorkouts, setAllWorkouts] = useState([]);

  const navigate = useNavigate();

  // Load selected day from storage
  useEffect(() => {
    const saved = localStorage.getItem("selectedDay");
    if (saved) setSelectedDay(Number(saved));
  }, []);

  // Fetch all workouts once
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await getAllHomeWorkoutsApi();
        setAllWorkouts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching home workouts:", err);
      }
    };
    loadWorkouts();
  }, []);

  // Filter workouts
  const todayWorkout = allWorkouts.filter(
    (w) => w.type === filter && w.day === `Day ${selectedDay}`
  );

  const handleStart = () => {
    navigate("/start-workout", { state: { workouts: todayWorkout } });
  };

  return (
    <div className="workout-container">
      {/* Day Selector */}
      <div className="day-selector">
        <div className="day-head">
          <h2>Daily Workout</h2>
        </div>

        {[...Array(30)].map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              className={selectedDay === day ? "day-btn active" : "day-btn"}
              onClick={() => {
                setSelectedDay(day);
                localStorage.setItem("selectedDay", day);
              }}
            >
              Day {day}
            </button>
          );
        })}
      </div>

      {/* Workout Content */}
      <div className="content-area">
        <h2>Home Workout</h2>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Full Body">Full Body</option>
          <option value="Upper">Upper</option>
          <option value="Lower">Lower</option>
          <option value="Core">Core</option>
          <option value="Cardio">Cardio</option>
        </select>

        <div className="workout-list">
          {todayWorkout.length ? (
            todayWorkout.map((item) => (
              <WorkoutCard
                key={item._id}
                workout={item}
                onClick={() => navigate(`/homeworkout/${item._id}`)}
              />
            ))
          ) : (
            <p>No workouts found.</p>
          )}
        </div>

        <button className="start-btn" onClick={handleStart}>
          Start
        </button>
      </div>
    </div>
  );
};

export default HomeWorkout;
