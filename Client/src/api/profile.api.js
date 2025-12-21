import axios from "./axiosInstance";

export const profileApi = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found — user not logged in");
  }

  const res = await axios.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
