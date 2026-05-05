import axios from "./axiosInstance";

export const getDeepProfileApi = async () => {
  const res = await axios.get("/users/me/profile");
  return res.data;
};

export const updateDeepProfileApi = async (payload) => {
  const res = await axios.put("/users/me/profile", payload);
  return res.data;
};

export const generateAIPlanApi = async () => {
  const res = await axios.post("/ai/plans");
  return res.data;
};

export const getCurrentAIPlanApi = async () => {
  const res = await axios.get("/ai/plans/current");
  return res.data;
};

export const getAIPlanHistoryApi = async () => {
  const res = await axios.get("/ai/plans/history");
  return res.data;
};

export const getWorkoutCatalogApi = async (location = "both") => {
  const res = await axios.get(`/workouts/catalog?location=${location}`);
  return res.data;
};
