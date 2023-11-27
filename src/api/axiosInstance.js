import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your actual base URL
});

// const axiosInstance = axios.create({
//   baseURL: 'https://www.car-rentals.shop', // Replace with your actual base URL
// });

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
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
    if(error.code==="ECONNABORTED") toast.error("This request tooking long to respond",{position:toast.POSITION.TOP_CENTER})
   else if (error.response.status === 403) {
      toast.error(`${error.response.data.message}`,{position:toast.POSITION.TOP_CENTER})
      localStorage.removeItem('token')
      window.location.href = '/login';
    }
    else{
      toast.error(`${error.response.data.message}`,{position:toast.POSITION.TOP_CENTER})
    }
    return Promise.reject(error);

  }
);

export default axiosInstance;