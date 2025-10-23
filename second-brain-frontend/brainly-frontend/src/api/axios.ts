import axios from "axios";
import { Backend_Url } from "../config";
import toast from "react-hot-toast";
//This is for render so that on first request user get smooth experiance
const AXIOS_TIMEOUT = 60000;
//This is to check if the request is first request or not.
const LONG_REQUEST_THRESHOLD = 5000;
// A unique ID for the toast
const SPIN_UP_TOAST_ID = "server-spin-up";

const axiosInstance = axios.create({
  baseURL: Backend_Url,
  withCredentials: true,
  timeout: AXIOS_TIMEOUT, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const timer = setTimeout(() => {
      // If the timer fires, show the loading toast
      toast.loading("Our server is spinning up... Please wait a moment!", {
        id: SPIN_UP_TOAST_ID,
      });
    }, LONG_REQUEST_THRESHOLD);
    // Store the timer ID on the config so we can clear it later
    config.metadata = { timer };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // --- NEW: On success, clear the timer and dismiss the toast ---
    if (response.config.metadata?.timer) {
      clearTimeout(response.config.metadata.timer);
    }
    toast.dismiss(SPIN_UP_TOAST_ID);
    // --- End of new logic ---

    return response;
  },
  (error) => {
    if (error.config.metadata?.timer) {
      clearTimeout(error.config.metadata.timer);
    }
    toast.dismiss(SPIN_UP_TOAST_ID);

    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
      toast.error("The request timed out. Please try again.", {
        id: "timeout-error", // Use a different ID
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
