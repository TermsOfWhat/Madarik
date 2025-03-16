import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_APP_BASE_URL || "https://madarik-api.onrender.com",
  headers,
});

export default axiosInstance;
