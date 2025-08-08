import axios from "axios";
import conf from "./conf/conf";

const api = axios.create({
  baseURL: `${conf.backendUrl}/api/v1`, // Your backend's base URL
  withCredentials: true, // This is crucial for sending/receiving cookies
});

export default api;
