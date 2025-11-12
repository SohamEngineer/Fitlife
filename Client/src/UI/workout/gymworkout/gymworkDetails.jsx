import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../../styles/WorkoutDetails.css";
import { FaCircleLeft } from "react-icons/fa6";

const GymWorkoutDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/gymwork/gymworkout/${id}`);
        setWorkout(res.data);
      } catch (err) {
        console.error("Error fetching workout:", err);
      }
    };

    fetchWorkout();
  }, [id]);

  if (!workout) return <div className="loading">Loading...</div>;

  return (
    <div className="workout-detail-container">
      <div className="back-button" onClick={() => navigate(-1)}><FaCircleLeft />
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
            // className="workout-video"
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
