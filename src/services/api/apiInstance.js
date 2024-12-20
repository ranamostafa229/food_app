import axios from "axios";
import { BASE_URL } from "./apiConfig";

// public instance
const apiInstance = axios.create({
  baseURL: BASE_URL,
});

// private instance
const privateApiInstance = axios.create({
  baseURL: BASE_URL,
  // headers: { Authorization: `${localStorage.getItem("token")}` },
});
privateApiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { privateApiInstance, apiInstance };
