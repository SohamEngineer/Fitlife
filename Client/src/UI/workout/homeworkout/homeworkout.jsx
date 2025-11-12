import React, { useState, useEffect } from 'react';
import '../../../styles/HomeWorkout.css';
import WorkoutCard from '../../workoutCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomeWorkout = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const [filter, setFilter] = useState('Full Body');
  const [allWorkouts, setAllWorkouts] = useState([]);
  const navigate = useNavigate();

  // Get selected day from localStorage on component mount
  useEffect(() => {
    const savedDay = localStorage.getItem('selectedDay');
    if (savedDay) {
      setSelectedDay(parseInt(savedDay));
    }
  }, []);

  // Fetch workouts
  useEffect(() => {
    const fetchHomeWorkout = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/homeworkout");
        setAllWorkouts(res.data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
    fetchHomeWorkout();
  }, []);

  // Handle day selection and save to localStorage
  const handleDaySelect = (day) => {
    setSelectedDay(day);
    localStorage.setItem('selectedDay', day);
  };

  // Filter workouts for selected day and type
  const todayWorkout = allWorkouts.filter(
    (w) => w.type === filter && w.day === `Day ${selectedDay}`
  );

  const handleWorkoutClick = (id) => {
    navigate(`/homeworkout/${id}`);
  };


  return (
    <div className="workout-container">
      <div className="day-selector">
        <div className='day-head'>
          <h2>Daily Workout</h2>
        </div>
        {[...Array(30)].map((_, i) => (
          <button
            key={i + 1}
            className={selectedDay === i + 1 ? 'day-btn active' : 'day-btn'}
            onClick={() => handleDaySelect(i + 1)}
          >
            Day {i + 1}
          </button>
        ))}
      </div>

      <div className="content-area">
        <h2>Home Workout</h2>

        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="Full Body">Full Body</option>
          <option value="Upper">Upper</option>
          <option value="Lower">Lower</option>
          <option value="Core">Core</option>
          <option value="Cardio">Cardio</option>
        </select>

        <div className="workout-list">
          {todayWorkout.length > 0 ? (
            todayWorkout.map((item, index) => (
              <WorkoutCard
                key={index}
                workout={item}
                onClick={() => handleWorkoutClick(item._id)}
              />
            ))
          ) : (
            <p>No workouts found for this day and type.</p>
          )}
        </div>

        <button className="start-btn"
          onClick={() =>
            navigate("/start-workout", { state: { workouts: todayWorkout } })
          }>Start</button>
      </div>
    </div>
  );
};

export default HomeWorkout;
