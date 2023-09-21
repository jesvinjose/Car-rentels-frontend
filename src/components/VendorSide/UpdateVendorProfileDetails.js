import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateVendorProfileDetails = ({ vendorId, vendorData }) => {
  console.log(vendorData);
  const [vendorDetails, setVendorDetails] = useState({
    address: vendorData.address,
    state: vendorData.state,
    pinCode: vendorData.pinCode,
    firstName: vendorData.firstName,
    lastName: vendorData.lastName,
    mobileNumber: vendorData.mobileNumber,
    aadharNumber: vendorData.aadharNumber,
    aadharFrontImage: vendorData.aadharFrontImage,
    aadharBackImage: vendorData.aadharBackImage,
  });

    // Add state properties to hold image previews
    const [aadharFrontImagePreview, setAadharFrontImagePreview] = useState(
      vendorData.aadharFrontImage
    );
    const [aadharBackImagePreview, setAadharBackImagePreview] = useState(
      vendorData.aadharBackImage
    );

  useEffect(() => {
    // Update state if userData changes
    setVendorDetails({
      ...vendorData,
    });
  }, [vendorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(vendorDetails, "......frontend..........");
    try {
      const response = await axios.post(
        `http://localhost:5000/vendor/updateVendorProfile/${vendorId}`,
        vendorDetails
      );
    //   console.log("Vendor details updated:", response.data.vendor);
      alert("Vendor details updated successfully!");
    } catch (error) {
      console.error("Error updating vendor details:", error.response.data);
      alert("Error updating user details. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Set image preview based on the file being uploaded
        switch (name) {
          case "aadharFrontImage":
            setAadharFrontImagePreview(reader.result);
            break;
          case "aadharBackImage":
            setAadharBackImagePreview(reader.result);
            break;
          default:
            break;
        }

        setVendorDetails((prevDetails) => ({
          ...prevDetails,
          [name]: reader.result, // Assuming single file upload
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <form>
        <div className="flex justify-between mb-4">
          <div className="w-1/2 mr-2">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={vendorDetails.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2 ml-2">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={vendorDetails.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="w-1/2 ml-2">
            <label>Mobile Number</label>
            <input
              type="Number"
              name="mobileNumber"
              value={vendorDetails.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={vendorDetails.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2 ml-2">
            <label>PinCode</label>
            <input
              type="Number"
              name="pinCode"
              value={vendorDetails.pinCode}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={vendorDetails.state}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="w-1/2 ml-2">
            <label>Adhar Number</label>
            <input
              type="Number"
              name="aadharNumber"
              value={vendorDetails.aadharNumber}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2 ml-2">
          
          <label>
            Upload Adhar Front Image:
            <input
              type="file"
              accept="image/*"
              name="aadharFrontImage"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="w-1/2 ml-2">
          {aadharFrontImagePreview && (
            <img
              src={aadharFrontImagePreview}
              alt="Aadhar Front Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
        <div className="w-1/2 ml-2">
          
          <label>
            Upload Adhar Back Image:
            <input
              type="file"
              accept="image/*"
              name="aadharBackImage"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="w-1/2 ml-2">
          {aadharBackImagePreview && (
            <img
              src={aadharBackImagePreview}
              alt="Aadhar Back Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>

        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={(e) => handleUpdate(e)}
        >
          Update Details
        </button>
      </form>
    </div>
  );
};

export default UpdateVendorProfileDetails;
