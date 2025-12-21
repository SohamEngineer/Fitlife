export const updateGymWorkout = async (id, formData) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/admin/gymworkout/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData, 
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw err;
    }

    return await res.json();
  } catch (error) {
    throw error?.message || "Update failed";
  }
};
export const updateHomeWorkout = async (id, formData) => {
  try {
    const res = await fetch(
      `http://localhost:8000/api/admin/homeworkout/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData, 
      }
    );

    if (!res.ok) {
      const err = await res.json();
      throw err;
    }

    return await res.json();
  } catch (error) {
    throw error?.message || "Update failed";
  }
};
