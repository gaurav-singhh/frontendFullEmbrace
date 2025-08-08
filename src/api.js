import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1", // Your backend's base URL
  withCredentials: true, // This is crucial for sending/receiving cookies
});

export default api;
