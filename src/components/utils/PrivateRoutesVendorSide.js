import { Outlet,useNavigate } from "react-router-dom";
import axios from "axios";

export const PrivateRoutesVendorSide = ({ Component }) => {
  const navigate=useNavigate();
  const fetchData=async()=>{
    
    try {
      const vendorId = localStorage.getItem("vendorId");
      const vendorToken = localStorage.getItem("vendorToken");
      const response = await axios.get(
        `http://localhost:5000/vendor/checkBlockStatus/${vendorId}`
      );
      console.log(response, "response in PrivateRoute");
  
      if (vendorToken) {
        if (response.data.message === "vendor is blocked") {
          navigate('/vendorlogin')
          return null;
        } else {
          console.log("else vendor is not blocked ");
          return <Outlet />;
        }
      } else {
        console.log("vendorToken is null");
        return navigate('/vendorlogin')
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