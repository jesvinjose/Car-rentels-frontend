import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateProfileDetails = ({ userId, userData }) => {
  console.log(userData, "---------userData-----------");
  const [userDetails, setUserDetails] = useState({
    address: userData.address,
    state: userData.state,
    pinCode: userData.pinCode,
    aadharNumber: userData.aadharNumber,
    dlNumber: userData.dlNumber,
    dlFrontImage: userData.dlFrontImage,
    dlBackImage: userData.dlBackImage,
    aadharFrontImage: userData.aadharFrontImage,
    aadharBackImage: userData.aadharBackImage,
    firstName: userData.firstName,
    lastName: userData.lastName,
    mobileNumber: userData.mobileNumber,
  });

  // Add state properties to hold image previews
  const [aadharFrontImagePreview, setAadharFrontImagePreview] = useState(
    userData.aadharFrontImage
  );
  const [aadharBackImagePreview, setAadharBackImagePreview] = useState(
    userData.aadharBackImage
  );
  const [dlFrontImagePreview, setDlFrontImagePreview] = useState(
    userData.dlFrontImage
  );
  const [dlBackImagePreview, setDlBackImagePreview] = useState(
    userData.dlBackImage
  );

  useEffect(() => {
    // Update state if userData changes
    setUserDetails({
      ...userData,
    });
  }, [userData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(userDetails, "......frontend..........");
    try {
      const response = await axios.post(
        `http://localhost:5000/user/updateProfile/${userId}`,
        userDetails
      );
      console.log("User details updated:", response.data.user);
      alert("User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error.response.data);
      alert("Error updating user details. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
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
          case "dlFrontImage":
            setDlFrontImagePreview(reader.result);
            break;
          case "dlBackImage":
            setDlBackImagePreview(reader.result);
            break;
          default:
            break;
        }

        setUserDetails((prevDetails) => ({
          ...prevDetails,
          [name]: reader.result, // Assuming single file upload
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-lg">
      <form>
        <div className="flex justify-between mb-4">
          <div className="w-1/2 mr-2">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2 ml-2">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
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
              value={userDetails.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={userDetails.address}
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
              value={userDetails.pinCode}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={userDetails.state}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2 ml-2">
            <label>Driving License Number</label>
            <input
              type="text"
              name="dlNumber"
              value={userDetails.dlNumber}
              onChange={handleChange}
            />
          </div>

          <div className="w-1/2 ml-2">
            <label>Adhar Number</label>
            <input
              type="Number"
              name="aadharNumber"
              value={userDetails.aadharNumber}
              onChange={handleChange}
            />
          </div>
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
        <div className="form-group">
          <label>
            Upload License Front Image:
            <input
              type="file"
              accept="image/*"
              name="dlFrontImage"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="form-group">
          {dlFrontImagePreview && (
            <img
              src={dlFrontImagePreview}
              alt="DL Front Preview"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
        <div className="form-group">
          <label>
            Upload License Back Image:
            <input
              type="file"
              accept="image/*"
              name="dlBackImage"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="form-group">
          {dlBackImagePreview && (
            <img
              src={dlBackImagePreview}
              alt="DL Back Preview"
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

export default UpdateProfileDetails;
