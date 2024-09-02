import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: "https://celtucapiinter-production.up.railway.app/api",
  // baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json", 
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = Cookies.get('jwt');
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      toast.error("Vuelve a iniciar sesion por favor!");

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
