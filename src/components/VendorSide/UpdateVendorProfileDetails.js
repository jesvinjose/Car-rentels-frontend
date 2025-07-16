import React, { useState, useEffect } from "react";
import axiosInstanceforVendor from '../../api/axiosInstanceforVendor'

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    // console.log(vendorDetails, "......frontend..........");
    console.log(vendorDetails.aadharNumber, "-------------");
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${vendortoken}`  // Set the token in the headers
      //   }
      // };

      await axiosInstanceforVendor.post(
        `/vendor/updateVendorProfile/${vendorId}`,
        vendorDetails,
        // config
      );
      //   console.log("Vendor details updated:", response.data.vendor);
      alert("Vendor details updated successfully!");
    } catch (error) {
      console.error("Error updating vendor details:", error.response.data);
      alert("Error updating vendor details. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails((prevDetails) => ({
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
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-2xl dark:bg-gray-800 mt-5">
      <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
        Account settings
      </h2>
      <form>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-4">
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
              value={vendorDetails.firstName}
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
              value={vendorDetails.lastName}
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
              value={vendorDetails.mobileNumber}
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
              value={vendorDetails.address}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-4">
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
              value={vendorDetails.pinCode}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label htmlFor="state" className="text-gray-700 dark:text-gray-200">
              State
            </label>
            <input
              type="text"
              name="state"
              value={vendorDetails.state}
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
              value={vendorDetails.aadharNumber}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-4">
          <div>
            <label>
              Upload Adhar Front Image:
              <input
                type="file"
                accept="image/*"
                name="aadharFrontImage"
                onChange={handleFileChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
          <div>
            <label>
              Upload Adhar Back Image:
              <input
                type="file"
                accept="image/*"
                name="aadharBackImage"
                onChange={handleFileChange}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
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
        </div>

        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={(e) => handleUpdate(e)}
        >
          Update Details
        </button>
      </form>
    </section>
  );
};

export default UpdateVendorProfileDetails;
