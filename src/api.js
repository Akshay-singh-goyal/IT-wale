import axios from "axios";

const api = axios.create({
  baseURL: "https://sm-backend-8me3.onrender.com/api", // add /api here
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
