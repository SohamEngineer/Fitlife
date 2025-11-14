import axios from "./axiosInstance";

// Fetch all fitness entries for a user
export const getFitnessDataApi = async (userId) => {
  const res = await axios.get(`/fitness/${userId}`);
  return res.data;
};

// Add new fitness entry
export const addFitnessEntryApi = async (payload) => {
  const res = await axios.post("/fitness", payload);
  return res.data;
};
