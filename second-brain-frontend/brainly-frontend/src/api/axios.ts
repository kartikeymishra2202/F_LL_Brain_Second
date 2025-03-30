import axios from "axios";
import { Backend_Url } from "../config";

const axiosInstance = axios.create({
  baseURL: Backend_Url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
