import { Outlet,useNavigate } from "react-router-dom";
// import axios from "axios";
import axiosInstance from "../../api/axiosInstance";

export const PrivateRoutes = ({ Component }) => {
  const navigate=useNavigate();
  const fetchData=async()=>{
    
    try {
      const userId = localStorage.getItem("userId");
      const userToken = localStorage.getItem("token");
      // const response = await axios.get(
      //   `http://localhost:5000/user/checkBlockStatus/${userId}`
      // );
      const response = await axiosInstance.get(
        `/user/checkBlockStatus/${userId}`
      );
      // const response = await axios.get(
      //   `https://www.car-rentals.shop/user/checkBlockStatus/${userId}`
      // );
      console.log(response, "response in PrivateRoute");
  
      if (userToken) {
        if (response.data.message === "user is blocked") {
          navigate('/login')
          return null;
        } else {
          console.log("else user is not blocked ");
          return <Outlet />;
        }
      } else {
        console.log("userToken is null");
        return navigate('/login')
      }
    } catch (error) {
      console.error("Error fetching block status of user:", error);
    }
  }
  fetchData();
  return (
    <div>
      <Component />
    </div>
  );
};
