import React, { useEffect, useState } from "react";
import axiosInstanceforVendor from "../../api/axiosInstanceforVendor";
import Profile from "../../assets/profile.png";
import { useParams } from "react-router-dom";
import VendorHeader from "./VendorHeader";
import UpdateVendorProfileDetails from "./UpdateVendorProfileDetails";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendorDetails, setVendorDetails] = useState(null);
  const vendortoken = localStorage.getItem("vendorToken");
  useEffect(() => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${vendortoken}`  // Set the token in the headers
    //   }
    // };
    //Fetch vendor details based on vendorId
    axiosInstanceforVendor
      .get(`/vendor/${vendorId}`)
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
  }, [vendorId, vendortoken]);
  console.log(vendorDetails, "---------vendorProfile console-----------");
  return (
<div className="p-4">
  <VendorHeader />
  {vendorDetails ? (
    <div className="flex flex-col items-center bg-slate-400 p-4">
      <div className="profile-icon text-center">
        <img className="w-16 h-16" src={Profile} alt="Profile Icon" />
      </div>
      <div className="mt-4 text-center">
        <p>
          {vendorDetails.firstName} {vendorDetails.lastName}
        </p>
      </div>
      <div className="mt-2 text-center">
        <p>Mobile: {vendorDetails.mobileNumber}</p>
      </div>
      <div className="mt-2 text-center">
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
