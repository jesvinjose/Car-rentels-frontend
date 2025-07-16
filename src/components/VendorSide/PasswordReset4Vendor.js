import React, { useState } from "react";
import axiosInstanceforVendor from '../../api/axiosInstanceforVendor'
import { useNavigate } from "react-router-dom";
import bgImage from '../../assets/ownacar.png'
import logo from "../../assets/logo-1.png";
import { useLocation } from "react-router-dom";

const PasswordReset4Vendor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { emailId } = location.state;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    console.log(password);
    console.log(confirmPassword);
    const response = await axiosInstanceforVendor.post(
      "/vendor/confirmPasswordReset4Vendor",
      {
        emailId,
        password,
        confirmPassword,
      }
    );
    if (
      response.data.message === "Password should be at least 8 characters long"
    ) {
      console.error("Password Too Short Requires min of 8 characters");
    }
    if (response.data.message === "Passwords do not match") {
      console.error("Passwords do not match");
    }
    if (response.data.message === "Password Reset successfully") {
        navigate("/vendorlogin?redirectFrom=PasswordReset");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mx-auto">
          <img className="w-20 h-30" src={logo} alt="" />
          <div className="mt-8">
            <span className="hidden mx-2 sm:inline font-semibold">
              Reset Password
            </span>
          </div>
        </div>

        <form className="mt-6">
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="password"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="w-1/2 pl-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              onClick={handlePasswordReset}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset4Vendor;
