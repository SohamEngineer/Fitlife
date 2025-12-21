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
// ----------------------
// UPDATE fitness record
// ----------------------
export const updateFitnessEntryApi = async (recordId, payload) => {
  const res = await axios.put(`/fitness/${recordId}`, payload);
  return res.data;
};

//Delete fitness record
export const deleteFitnessEntryApi = async (recordId) => {
  const res = await axios.delete(`/fitness/${recordId}`);
  return res.data;
};