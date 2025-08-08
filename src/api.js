import axios from "axios";
import conf from "./conf/conf";

const api = axios.create({
  baseURL: `${conf.backendUrl}/api/v1`, // Your backend's base URL
  withCredentials: true, // This is crucial for sending/receiving cookies
});

// Add a request interceptor to include the access token in all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
