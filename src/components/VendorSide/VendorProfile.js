import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../../assets/profile.png";
import { useParams } from "react-router-dom";
import VendorHeader from "./VendorHeader";
import UpdateVendorProfileDetails from "./UpdateVendorProfileDetails";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendorDetails, setVendorDetails] = useState(null);

  useEffect(() => {
    //Fetch vendor details based on vendorId
    axios
      .get(`http://localhost:5000/vendor/${vendorId}`)
      .then((response) => {
        setVendorDetails(response.data.vendorDetails);
        console.log(
          response.data.vendorDetails,
          "---------from Response-----------"
        );
      })
      .catch((error) => {
        console.error("Error fetching vendor details:", error);
      });
  }, [vendorId]);
  console.log(vendorDetails, "---------vendorProfile console-----------");
  return (
    <div>
      <VendorHeader />
      {vendorDetails ? ( // Use conditional rendering here
        <div className="flex justify-evenly items-center bg-slate-400 h-30">
          <div className="flex items-center">
            <div className="profile-icon">
              {/* Add your profile icon */}
              <img className="w-10 h-10" src={Profile} alt="Profile Icon" />
            </div>
            <div className="ml-2">
              {/* Display first name and last name with space in between */}
              <p>
                {vendorDetails.firstName} {vendorDetails.lastName}
              </p>
            </div>
          </div>

          <div>
            <p>Mobile: {vendorDetails.mobileNumber}</p>

            {/* Display other user details as needed */}
          </div>
          <div>
            <p>Email: {vendorDetails.emailId}</p>
            {/* Display other user details as needed */}
          </div>
        </div>
      ) : (
        <p>Loading vendor details...</p>
      )}
      {vendorDetails && (
        <UpdateVendorProfileDetails
          vendorData={vendorDetails}
          vendorId={vendorId}
        />
      )}
    </div>
  );
};

export default VendorProfile;
