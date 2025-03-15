import axios from "axios";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  //"X-CSRF": "1",
};

const axiosInstance = axios.create({
  baseURL: "",
  headers,
  // withCredentials: true,
});

export default axiosInstance;
