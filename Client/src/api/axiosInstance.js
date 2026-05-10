import axios from "axios";

const localApiUrl = "http://localhost:8000/api";
const productionApiUrl = "https://fitlife-jnz7.onrender.com/api";
const isLocalhost =
  typeof window !== "undefined" &&
  ["localhost", "127.0.0.1"].includes(window.location.hostname);

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || (isLocalhost ? localApiUrl : productionApiUrl),
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
