import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api"
});

api.interceptors.request.use(config => {
  if (!config.url.includes("/auth/google")) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;

