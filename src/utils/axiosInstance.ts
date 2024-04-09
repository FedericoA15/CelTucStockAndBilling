import axios from 'axios';
console.log(process.env.BASE_API_URL);

const axiosInstance = axios.create({
  baseURL: "https://celtucapiinter.onrender.com"
});

export default axiosInstance;
