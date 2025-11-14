import axios from "../axiosInstance";

// Fetch all users + total count
export const getAllUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Error fetching users" };
  }
};
