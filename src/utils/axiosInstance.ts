import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: "https://celtucapi-bbb9fa28ff48.herokuapp.com/api",
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

export default axiosInstance;
