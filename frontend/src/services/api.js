import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // 🔥 CHANGE THIS TO YOUR BACKEND PORT
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;