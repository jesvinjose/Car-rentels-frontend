//RegisterForm.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bgImage from "../../assets/signUpbackgroundImage.jpg";
import logo from "../../assets/logo-1.png";
import axiosInstance from '../../api/axiosInstance';

function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailId, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/user/register", {
        firstName,
        lastName,
        emailId,
        password,
        confirmPassword,
        mobileNumber,
      });
      console.log(response, "----------response");
      if (response.status === 200) {
        // OTP sent successfully
        // Pass userDetails as a prop when navigating
        navigate("/verifyOTP", {
          state: {
            firstName,
            lastName,
            emailId,
            password,
            confirmPassword,
            mobileNumber,
          },
        });
      } else if (response.status === 400) {
        // Handle validation errors
        const responseData = response.data;
        if (responseData.message === "Please enter a valid firstName") {
          console.error("Invalid first name");
        } else if (responseData.message === "Please enter a valid lastName") {
          console.error("Invalid last name");
        } else if (
          responseData.message ===
          "Password should be at least 8 characters long"
        ) {
          console.error("Password too short");
        } else if (responseData.message === "Passwords do not match") {
          console.error("Passwords do not match");
        } else if (
          responseData.message === "Please enter a valid email address"
        ) {
          console.error("Invalid email address");
        } else if (
          responseData.message === "Please enter a valid mobile number"
        ) {
          console.error("Invalid mobile number");
        }
      } else if (response.status === 409) {
        // User already exists
        console.error("User already exists");
      } else {
        // Other errors
        console.error("Registration failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
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
              Sign Up here
            </span>
          </div>
        </div>

        <form className="mt-6">
          <div className="flex">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="firstName"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                First Name
              </label>
              <input
                type="string"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="w-1/2 pl-2">
              <label
                htmlFor="lastName"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Last Name
              </label>
              <input
                type="string"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex mt-4">
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

          <div className="flex mt-4">
            <div className="w-1/2 pr-2">
              <label
                htmlFor="emailId"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Email Id
              </label>
              <input
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter Email"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="w-1/2 pl-2">
              <label
                htmlFor="mobileNumber"
                className="block text-sm text-gray-800 dark:text-gray-200"
              >
                Mobile Number
              </label>
              <input
                type="Number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              onClick={handleLogin}
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="mt-8 text-xs font-light text-center text-gray-400">
          {" "}
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;

// <div>
//       <h1>Register</h1>
//       <form onSubmit={handleLogin}>
//         <input
//           type="string"
//           placeholder="First Name"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           required
//         />
//         <input
//           type="string"
//           placeholder="Last Name"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={emailId}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="Number"
//           placeholder="Mobile Number"
//           value={mobileNumber}
//           onChange={(e) => setMobileNumber(e.target.value)}
//           required
//         />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
