import axios from "axios";
import { BASE_URL } from "./apiPaths";

// Create instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token"); // ✅ clear expired token
        window.location.href = "/"; // redirect to login
      } else if (error.response.status === 500) {
        console.error("🚨 Server Error:", error.response.data);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("⚠️ Request timeout");
    } else {
      console.error("⚠️ Network/Unknown Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
