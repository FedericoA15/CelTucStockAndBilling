import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL || "http://localhost:8080/api",
});

export default axiosInstance;
