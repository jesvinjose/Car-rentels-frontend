import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner";

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
    profileImage:userData.profileImage,
    aadharFrontImage: userData.aadharFrontImage,
    aadharBackImage: userData.aadharBackImage,
    firstName: userData.firstName,
    lastName: userData.lastName,
    mobileNumber: userData.mobileNumber,
  });
  const [isLoading, setIsLoading] = useState(false);

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
  const [profileImagePreview, setProfileImagePreview] = useState(
    userData.profileImage
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
      setIsLoading(true);
      const response = await axiosInstance.post(
        `user/updateProfile/${userId}`,
        userDetails
      );
      if (response) setIsLoading(false);
      console.log("User details updated:", response.data.user);
      toast("User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error.response.data);
      toast("Error updating user details. Please try again.");
      setIsLoading(false);
      // navigate('/404')
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
          case "profileImage":
            setProfileImagePreview(reader.result);
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
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 mt-2">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        About Me
      </h2>
      <ToastContainer />
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <label
                htmlFor="firstName"
                className="text-gray-700 dark:text-gray-200"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={userDetails.firstName}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="text-gray-700 dark:text-gray-200"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={userDetails.lastName}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="mobileNumber"
                className="text-gray-700 dark:text-gray-200"
              >
                Mobile Number
              </label>
              <input
                type="Number"
                name="mobileNumber"
                value={userDetails.mobileNumber}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="text-gray-700 dark:text-gray-200"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="pinCode"
                className="text-gray-700 dark:text-gray-200"
              >
                PinCode
              </label>
              <input
                type="Number"
                name="pinCode"
                value={userDetails.pinCode}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="state"
                className="text-gray-700 dark:text-gray-200"
              >
                State
              </label>
              <input
                type="text"
                name="state"
                value={userDetails.state}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="dlNumber"
                className="text-gray-700 dark:text-gray-200"
              >
                DL Number
              </label>
              <input
                type="text"
                name="dlNumber"
                value={userDetails.dlNumber}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="aadharNumber"
                className="text-gray-700 dark:text-gray-200"
              >
                Aadhar Number
              </label>
              <input
                type="Number"
                name="aadharNumber"
                value={userDetails.aadharNumber}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label>
                Adhar Front Image:
                <input
                  type="file"
                  accept="image/*"
                  name="aadharFrontImage"
                  onChange={handleFileChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </label>
            </div>
            <div className="w-full">
              {aadharFrontImagePreview && (
                <img
                  src={aadharFrontImagePreview}
                  alt="Aadhar Front Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
            </div>

            <div>
              <label>
                Adhar Back Image:
                <input
                  type="file"
                  accept="image/*"
                  name="aadharBackImage"
                  onChange={handleFileChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </label>
            </div>
            <div className="w-full">
              {aadharBackImagePreview && (
                <img
                  src={aadharBackImagePreview}
                  alt="Aadhar Back Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
            </div>

            <div>
              <label>
                License Front Image:
                <input
                  type="file"
                  accept="image/*"
                  name="dlFrontImage"
                  onChange={handleFileChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </label>
            </div>
            <div className="w-full">
              {dlFrontImagePreview && (
                <img
                  src={dlFrontImagePreview}
                  alt="DL Front Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
            </div>

            <div>
              <label>
                License Back Image:
                <input
                  type="file"
                  accept="image/*"
                  name="dlBackImage"
                  onChange={handleFileChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </label>
            </div>
            <div className="w-full">
              {dlBackImagePreview && (
                <img
                  src={dlBackImagePreview}
                  alt="DL Back Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              )}
            </div>
            <div>
              <label>
                Profile Image:
                <input
                  type="file"
                  accept="image/*"
                  name="profileImage"
                  onChange={handleFileChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
              </label>
            </div>
            <div className="w-full">
              {/* {profileImagePreview && ( */}
                <img
                  // src={profileImagePreview}
                  src={userDetails.profileImage}
                  alt="Profile Image Preview"
                  style={{ maxWidth: "100%", maxHeight: "200px" }}
                />
              {/* )} */}
            </div>
          </div>

          <button
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={(e) => handleUpdate(e)}
          >
            Update Details
          </button>
        </form>
      )}
    </section>
  );
};

export default UpdateProfileDetails;
