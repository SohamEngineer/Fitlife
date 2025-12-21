
export const fetchGymWorkouts = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/gymworkout");

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
    const res = await fetch("http://localhost:8000/api/homeworkout");

    if (!res.ok) {
      const err = await res.json();
      throw err;
    }

    return await res.json();
  } catch (error) {
    throw error?.message || "Failed to fetch gym workouts";
  }
};
