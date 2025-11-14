import React, { useEffect, useState } from "react";
import "../../../styles/workoutdetails.css";

import { useParams, useNavigate } from "react-router-dom";
import { FaCircleLeft } from "react-icons/fa6";
import { getHomeWorkoutByIdApi } from "../../../api/homeworkout.api";

const WorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getHomeWorkoutByIdApi(id);
        setWorkout(data);
      } catch (e) {
        console.error("Error loading workout:", e);
      }
    };
    load();
  }, [id]);

  if (!workout) return <div className="loading">Loading...</div>;

  return (
    <div className="workout-detail-container">
      <div className="header-row">
        <div className="back-button" onClick={() => navigate(-1)}>
          <FaCircleLeft />
        </div>
        <h2 className="workout-title">{workout.title}</h2>
      </div>

      <video
        src={workout.videoBase64}
        autoPlay
        loop
        muted
        playsInline
        className="workout-video"
      />

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

export default WorkoutDetails;
