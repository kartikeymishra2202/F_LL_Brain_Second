import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { Backend_Url } from "../config";
import toast from "react-hot-toast";

const AXIOS_TIMEOUT = 60000;
const LONG_REQUEST_THRESHOLD = 5000;
const SPIN_UP_TOAST_ID = "server-spin-up";

const requestTimers = new Map<
  AxiosRequestConfig | InternalAxiosRequestConfig,
  number
>();

const axiosInstance = axios.create({
  baseURL: Backend_Url,
  withCredentials: true,
  timeout: AXIOS_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const timer = setTimeout(() => {
      toast.loading("Our server is spinning up... Please wait a moment!", {
        id: SPIN_UP_TOAST_ID,
      });
    }, LONG_REQUEST_THRESHOLD);

    requestTimers.set(config, timer);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const timer = requestTimers.get(response.config);
    if (timer) {
      clearTimeout(timer);
      requestTimers.delete(response.config);
    }
    toast.dismiss(SPIN_UP_TOAST_ID);
    return response;
  },
  (error) => {
    if (error.config) {
      const timer = requestTimers.get(error.config);
      if (timer) {
        clearTimeout(timer);
        requestTimers.delete(error.config);
      }
    }
    toast.dismiss(SPIN_UP_TOAST_ID);

    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
      toast.error("The request timed out. Please try again.", {
        id: "timeout-error",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
