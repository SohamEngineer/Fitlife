// src/api/workout.api.js
import axios from "./axiosInstance";

/** Fetch all home workouts */
export const getAllHomeWorkoutsApi = async () => {
  const res = await axios.get("/homeworkout");
  return res.data;
};

/** Fetch a single home workout by ID */
export const getHomeWorkoutByIdApi = async (id) => {
  const res = await axios.get(`/homeworkout/${id}`);
  return res.data;
};
