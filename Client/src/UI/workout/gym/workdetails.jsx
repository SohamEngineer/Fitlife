import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../../styles/workoutdetails.css";

import { FaCircleLeft } from "react-icons/fa6";
import { getGymWorkoutByIdApi } from "../../../api/gymworkout.api";

const GymWorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Workout Data State
  const [workout, setWorkout] = useState(null);

  // Fetch workout details on mount
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const data = await getGymWorkoutByIdApi(id);
        setWorkout(data);
      } catch (err) {
        console.error("Error fetching workout:", err);
      }
    };

    fetchWorkout();
  }, [id]);

  // Loading state UI
  if (!workout) return <div className="loading">Loading...</div>;

  return (
    <div className="workout-detail-container">
      <div className="back-button" onClick={() => navigate(-1)}>
        <FaCircleLeft />
      </div>

      <h2 className="workout-title">{workout.title}</h2>

      <div className="workout-image">
        {workout.videoBase64 ? (
          <video
            src={workout.videoBase64}
            autoPlay
            loop
            muted
            playsInline
          ></video>
        ) : (
          <p>Video not available</p>
        )}
      </div>

      <div className="workout-description">
        <h3>Description</h3>
        <p>{workout.description}</p>
      </div>

      <div className="workout-benefits">
        <h3>Benefits</h3>
        <ul>
          <li><strong>Calories Burned:</strong> {workout.caloryburn} kcal</li>
        </ul>
      </div>
    </div>
  );
};

export default GymWorkoutDetails;
