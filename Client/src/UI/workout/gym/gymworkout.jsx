import React, { useState, useEffect } from "react";
import "../../../styles/homeworkout.css";

// import GymWorkoutCard from "./WorkoutCard";
import { getAllGymWorkoutsApi } from "../../../api/gymworkout.api";
import { useNavigate } from "react-router-dom";
import GymWorkoutCard from "../../../component/gymcard";

const Gym = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [filter, setFilter] = useState("Full Body");
  const [allWorkouts, setAllWorkouts] = useState([]);

  const navigate = useNavigate();

  // Restore selected day from localStorage
  useEffect(() => {
    const savedDay = localStorage.getItem("selectedDay");
    if (savedDay) setSelectedDay(parseInt(savedDay));
  }, []);

  // Fetch workouts when component loads
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const data = await getAllGymWorkoutsApi();
        setAllWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  // Filter based on day + workout type
  const todayWorkout = allWorkouts.filter(
    (w) => w.type === filter && w.day === `Day ${selectedDay}`
  );

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    localStorage.setItem("selectedDay", day);
  };

  const handleWorkoutClick = (id) => {
    navigate(`/gymworkout/${id}`);
  };

  return (
    <div className="workout-container">
      
      {/* Day Selector */}
      <div className="day-selector">
        <div className="day-head">
          <h2>Daily Workout</h2>
        </div>

        {[...Array(30)].map((_, i) => (
          <button
            key={i}
            className={selectedDay === i + 1 ? "day-btn active" : "day-btn"}
            onClick={() => handleDaySelect(i + 1)}
          >
            Day {i + 1}
          </button>
        ))}
      </div>

      {/* Workout Content */}
      <div className="content-area">
        <h2>Gym Workout</h2>

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="Full Body">Full Body</option>
          <option value="Upper">Upper</option>
          <option value="Lower">Lower</option>
          <option value="Core">Core</option>
          <option value="Cardio">Cardio</option>
        </select>

        <div className="workout-list">
          {todayWorkout.length > 0 ? (
            todayWorkout.map((item) => (
              <GymWorkoutCard
                key={item._id}
                workout={item}
                onClick={() => handleWorkoutClick(item._id)}
              />
            ))
          ) : (
            <p>No workouts found for this day and type.</p>
          )}
        </div>

        <button className="start-btn">Start</button>
      </div>
    </div>
  );
};

export default Gym;
