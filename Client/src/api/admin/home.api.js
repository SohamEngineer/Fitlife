import axios from "../axiosInstance";

export const addHomeWorkout = async (formData) => {
  try {
    const res = await axios.post("/homeworkout/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "API error" };
  }
};
