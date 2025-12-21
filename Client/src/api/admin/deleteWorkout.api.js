export const deleteGymWorkout = async (id) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/admin/gymworkout/${id}`,
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
      `http://localhost:8000/api/admin/homeworkout/${id}`,
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
