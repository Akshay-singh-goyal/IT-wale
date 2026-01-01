// services/adminApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://sm-backend-8me3.onrender.com/admin",
});

export const getRegistrations = () => API.get("/registrations");
export const approveRegistration = (id) =>
  API.put(`/registrations/${id}/approve`);
export const confirmSeat = (id) =>
  API.put(`/registrations/${id}/confirm-seat`);
