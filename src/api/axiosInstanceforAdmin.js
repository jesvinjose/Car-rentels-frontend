import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";


// const axiosInstanceforAdmin = axios.create({
//   baseURL: 'https://www.car-rentals.shop', // Replace with your actual base URL
// });

const axiosInstanceforAdmin = axios.create({
  baseURL: process.env.REACT_APP_API_baseURL,
});


axiosInstanceforAdmin.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('adminToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstanceforAdmin.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.code==="ECONNABORTED") toast.error("This request tooking long to respond",{position:toast.POSITION.TOP_CENTER})
   else if (error.response.status === 403) {
      toast.error(`${error.response.data.message}`,{position:toast.POSITION.TOP_CENTER})
      localStorage.removeItem('adminToken')
      window.location.href = '/admin';

    }
    else{
      toast.error(`${error.response.data.message}`,{position:toast.POSITION.TOP_CENTER})
    }
    return Promise.reject(error);

  }
);

export default axiosInstanceforAdmin;