import axios from "axios";

const api = axios.create({
  baseURL: "https://hisabkisabserver-meta.vercel.app/api"
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

