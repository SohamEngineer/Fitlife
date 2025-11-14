import axios from "./axiosInstance";

// Fetch all gym workouts
export const getAllGymWorkoutsApi = async () => {
  const res = await axios.get("/gymworkout");
  return res.data;
};

// Fetch single workout by ID
export const getGymWorkoutByIdApi = async (id) => {
  const res = await axios.get(`/gymworkout/${id}`);
  return res.data;
};
