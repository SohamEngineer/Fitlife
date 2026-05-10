
import { API_BASE_URL } from "../axiosInstance";

export const fetchGymWorkouts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/gymworkout`);

    if (!res.ok) {
      const err = await res.json();
      throw err;
    }

    return await res.json();
  } catch (error) {
    throw error?.message || "Failed to fetch gym workouts";
  }
};
export const fetchHomeWorkouts = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/homeworkout`);

    if (!res.ok) {
      const err = await res.json();
      throw err;
    }

    return await res.json();
  } catch (error) {
    throw error?.message || "Failed to fetch gym workouts";
  }
};
