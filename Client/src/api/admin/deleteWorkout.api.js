import { API_BASE_URL } from "../axiosInstance";

export const deleteGymWorkout = async (id) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/admin/gymworkout/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw err;
    }

    return await res.json();
  } catch (error) {
    throw error?.message || "Delete failed";
  }
};
export const deleteHomeWorkout = async (id) => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/admin/homeworkout/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw err;
    }

    return await res.json();
  } catch (error) {
    throw error?.message || "Delete failed";
  }
};
