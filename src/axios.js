import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/`
  : "http://localhost:8800/api/";

export const makeRequest = axios.create({
  baseURL,
  withCredentials: true,
});