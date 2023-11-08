import Header from "./Header";
import UpdateProfileDetails from "./UpdateProfileDetails";
import React, { useEffect, useState } from "react";
import Profile from "../../assets/profile.png";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const UserProfile = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const usertoken = localStorage.getItem("token");

  useEffect(() => {
    axiosInstance
      .get(`/user/${userId}`) // The baseURL will be appended due to the interceptor
      .then((response) => {
        setUserDetails(response.data.userDetails);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        // navigate('/404')
      });
  }, [userId, usertoken]);
 

  return (
    <div>
      <Header />
      {userDetails ? (
        <div className="flex flex-col md:flex-row justify-evenly items-center bg-slate-400 py-4 md:py-0">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="profile-icon">
              <img
                className="w-16 h-16 md:w-10 md:h-10"
                src={Profile}
                alt="Profile Icon"
              />
            </div>
            <div className="ml-2">
              <p className="text-lg">
                {userDetails.firstName} {userDetails.lastName}
              </p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <p>Mobile: {userDetails.mobileNumber}</p>
            <p>Email: {userDetails.emailId}</p>
            <p>Wallet balance: {userDetails.walletBalance}</p>
          </div>
        </div>
      ) : (
        <p className="text-center md:text-left">Loading user details...</p>
      )}

      {userDetails && (
        <UpdateProfileDetails userData={userDetails} userId={userId} />
      )}
    </div>
  );
};

export default UserProfile;
