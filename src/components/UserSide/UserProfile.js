import Header from "./Header";
import UpdateProfileDetails from "./UpdateProfileDetails";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../../assets/profile.png";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";


const UserProfile = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const usertoken = localStorage.getItem("token");
  const navigate=useNavigate();

  useEffect(() => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${usertoken}`, // Set the token in the headers
    //   },
    // };
    // // Use axiosInstance instead of axios here
    // axiosInstance
    //   .get(`user/${userId}`, config) // The baseURL will be appended due to the interceptor
    //   .then((response) => {
    //     setUserDetails(response.data.userDetails);
    //     console.log(
    //       response.data.userDetails,
    //       "---------from Response-----------"
    //     );
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching user details:", error);
    //   });
    
    // Use axiosInstance instead of axios here
    // axios
    //   .get(`http://localhost:5000/user/${userId}`) // The baseURL will be appended due to the interceptor
    axiosInstance
      .get(`/user/${userId}`) // The baseURL will be appended due to the interceptor
      .then((response) => {
        setUserDetails(response.data.userDetails);
        console.log(
          response.data.userDetails,
          "---------from Response-----------"
        );
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        // navigate('/404')
      });
  }, [userId, usertoken]);
  console.log(userDetails, "----------userProfile console----------");

  return (
    <div>
      <Header />
      {userDetails ? ( // Use conditional rendering here
        <div className="flex justify-evenly items-center bg-slate-400 h-30">
          <div className="flex items-center">
            <div className="profile-icon">
              {/* Add your profile icon */}
              <img className="w-10 h-10" src={Profile} alt="Profile Icon" />
            </div>
            <div className="ml-2">
              {/* Display first name and last name with space in between */}
              <p>
                {userDetails.firstName} {userDetails.lastName}
              </p>
            </div>
          </div>

          <div>
            <p>Mobile: {userDetails.mobileNumber}</p>

            {/* Display other user details as needed */}
          </div>
          <div>
            <p>Email: {userDetails.emailId}</p>
            {/* Display other user details as needed */}
          </div>
        </div>
      ) : (
        // You can add a loading spinner or message here while userDetails is null
        <p>Loading user details...</p>
      )}
      {userDetails && (
        <UpdateProfileDetails userData={userDetails} userId={userId} />
      )}
    </div>
  );
};

export default UserProfile;
