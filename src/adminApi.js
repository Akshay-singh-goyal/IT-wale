// services/adminApi.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/admin",
});

export const getRegistrations = () => API.get("/registrations");
export const approveRegistration = (id) =>
  API.put(`/registrations/${id}/approve`);
export const confirmSeat = (id) =>
  API.put(`/registrations/${id}/confirm-seat`);
