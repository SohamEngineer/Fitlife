import axios from "../axiosInstance";

export const addGymWorkout = async (formData) => {
  try {
    const res = await axios.post("/gymworkout/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "API error" };
  }
};
