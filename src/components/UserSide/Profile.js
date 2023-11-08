import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner";

const Profile = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const usertoken = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Add state properties to hold image previews
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [aadharFrontImagePreview, setAadharFrontImagePreview] = useState(null);
  const [aadharBackImagePreview, setAadharBackImagePreview] = useState(null);
  const [dlFrontImagePreview, setDlFrontImagePreview] = useState(null);
  const [dlBackImagePreview, setDlBackImagePreview] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/user/${userId}`)
      .then((response) => {
        setUserDetails(response.data.userDetails);
        // Set profileImagePreview here
        setProfileImagePreview(response.data.userDetails.profileImage);
        setAadharFrontImagePreview(response.data.userDetails.aadharFrontImage);
        setDlFrontImagePreview(response.data.userDetails.dlFrontImage);
        setAadharBackImagePreview(response.data.userDetails.aadharBackImage);
        setDlBackImagePreview(response.data.userDetails.dlBackImage);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        // Handle error here
      });
  }, [userId, usertoken]);

  // console.log(userDetails, "----------------userDetails----------------");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log(userDetails.profileImage, "......frontend..........");

    try {
      setIsLoadingProfile(true);
      const response = await axiosInstance.post(
        `user/updateProfileImage/${userId}`,
        userDetails
      );
      if (response) setIsLoadingProfile(false);
      console.log("User details updated:", response.data.user);
      toast("Profile Image updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
      toast("Error updating user details. Please try again.");
      setIsLoadingProfile(false);
      // navigate('/404')
    }
  };

  return (
    <div className="container-xl px-4 mt-4">
      <Header />
      <hr className="mt-5 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              <ToastContainer />
              {isLoadingProfile ? (
                <div className="flex items-center justify-center h-screen">
                  <LoadingSpinner />
                </div>
              ) : (
                <form>
                  {profileImagePreview && (
                    <img
                      src={profileImagePreview}
                      alt="Profile Image Preview"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  )}
                  {!profileImagePreview && (
                    <img src="http://bootdey.com/img/Content/avatar/avatar1.png" />
                  )}

                  <input
                    className="img-account-profile rounded-circle mb-2"
                    type="file"
                    accept="image/*"
                    name="profileImage"
                    onChange={handleFileChange}
                  />
                  <div className="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                  </div>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={(e) => handleUpdateProfile(e)}
                  >
                    Update Profile Photo
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="card mt-4 mb-4 mb-xl-0">
            <div className="card-header">Email and Wallet</div>
            <div className="card-body text-left">
              <p>Email: {userDetails?.emailId || ""}</p>
              <p>Wallet balance: {userDetails?.walletBalance || ""}</p>
            </div>
          </div>
        </div>

        <div className="col-xl-8">
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <ToastContainer />
              {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                  <LoadingSpinner />
                </div>
              ) : (
                <form>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        First name
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        name="firstName"
                        value={userDetails?.firstName || ""} // Initialize with an empty string
                        placeholder="Enter your first name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Last name
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        value={userDetails?.lastName || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputOrgName">
                        Mobile Number
                      </label>
                      <input
                        className="form-control"
                        id="inputOrgName"
                        name="mobileNumber"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={userDetails?.mobileNumber || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLocation">
                        Address
                      </label>
                      <input
                        className="form-control"
                        id="inputLocation"
                        name="address"
                        type="text"
                        placeholder="Enter your address"
                        value={userDetails?.address || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputEmailAddress">
                        Pin Code
                      </label>
                      <input
                        className="form-control"
                        id="inputEmailAddress"
                        type="Number"
                        name="pinCode"
                        placeholder="Enter your pincode"
                        value={userDetails?.pinCode || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">
                        State
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="text"
                        name="state"
                        placeholder="Enter your state"
                        value={userDetails?.state || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">
                        DL number
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="text"
                        name="dlNumber"
                        placeholder="Enter your DL number"
                        value={userDetails?.dlNumber || ""}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputBirthday">
                        Aadhar Number
                      </label>
                      <input
                        className="form-control"
                        id="inputBirthday"
                        type="Number"
                        name="aadharNumber"
                        placeholder="Enter your Aadhar Number"
                        value={userDetails?.aadharNumber || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">
                        DL Front Image
                      </label>
                      {dlFrontImagePreview && (
                        <img
                          src={dlFrontImagePreview}
                          alt="DL Front Image Preview"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      )}
                      <input
                        className="img-account-profile rounded-circle mb-2"
                        type="file"
                        accept="image/*"
                        name="dlFrontImage"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputBirthday">
                        DL Back Image
                      </label>
                      {dlBackImagePreview && (
                        <img
                          src={dlBackImagePreview}
                          alt="DL Back Image Preview"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      )}
                      <input
                        className="img-account-profile rounded-circle mb-2"
                        type="file"
                        accept="image/*"
                        name="dlBackImage"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">
                        Aadhar Front Image
                      </label>
                      {aadharFrontImagePreview && (
                        <img
                          src={aadharFrontImagePreview}
                          alt="Aadhar Front Image Preview"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      )}
                      <input
                        className="img-account-profile rounded-circle mb-2"
                        type="file"
                        accept="image/*"
                        name="aadharFrontImage"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputBirthday">
                        Aadhar Back Image
                      </label>
                      {aadharBackImagePreview && (
                        <img
                          src={aadharBackImagePreview}
                          alt="Profile Image Preview"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      )}
                      <input
                        className="img-account-profile rounded-circle mb-2"
                        type="file"
                        accept="image/*"
                        name="aadharBackImage"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  {/* <button className="btn btn-primary" onClick="{(e) => handleUpdate(e)}">
                  Save changes
                </button> */}
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleUpdate(e)}
                  >
                    Update Details
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
