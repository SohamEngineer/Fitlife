import axios from "./axiosInstance";
//Login API request
export const loginUserApi = async (credentials) => {
  const res = await axios.post("/auth/login", credentials);
  return res.data;
};
// Signup API request
export const signupUserApi = async (data) => {
  const res = await axios.post("/auth/signup", data);
  return res.data;
};