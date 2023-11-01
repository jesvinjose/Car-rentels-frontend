import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bgImage from "../../assets/ownacar.png";
import logo from "../../assets/logo-1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import axiosInstanceforVendor from "../../api/axiosInstanceforVendor";

function VendorLogin() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search).get(
      "redirectFrom"
    );
    if (urlParams === "OTP") {
      toast("Vendor Account Created Successfully");
    }
    if (urlParams === "PasswordReset") {
      toast("Password Reset Successfully");
    }
  }, []);

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      const vendorData = {
        emailId: emailId,
        password: password,
      };
      const response = await axiosInstanceforVendor.post(
        "/vendor/verifyVendorLogin",
        vendorData
      );
      console.log(response, "--------Frontend User Login Response");
      console.log(response.data);
      if (response.data.message === "Valid Vendor") {
        localStorage.setItem("vendorToken", response.data.vendorToken);
        localStorage.setItem("vendorFirstName", response.data.vendorFirstName);
        localStorage.setItem("vendor", response.data.vendorFirstName);
        localStorage.setItem("vendorLastName", response.data.vendorBackName);
        localStorage.setItem("vendorEmailId", response.data.vendorEmailId);
        localStorage.setItem("vendorId", response.data.vendorId);
        navigate("/vendorHome");
      } else if (response.data.message === "Wrong password") {
        toast("Wrong password");
      } else if (
        response.data.message ===
        "Vendor is not registered, please register now"
      ) {
        toast("Vendor is not registered, please register now");
      } else if (
        response.data.message ===
        "Vendor is blocked, contact jesvinjose49@gmail.com"
      ) {
        console.log("Vendor is blocked, contact jesvinjose49@gmail.com");
        toast("Vendor is blocked, contact jesvinjose49@gmail.com");
      } else {
        toast("Internal server error");
      }
    } catch (error) {
      console.error("Error during Sign In:", error.message);
    }
  };

  const handleGoogleLogin = async (credentialResponseDecoded) => {
    console.log("inside handle google login");
    console.log(credentialResponseDecoded.email);
    let email = { email: credentialResponseDecoded.email };
    console.log(email);
    const response = await axiosInstanceforVendor.post(
      "/vendor/verifyGoogleLogin",
      email
    );
    console.log(response, "--------response-----------");
    if (response.data.message === "Google Login") {
      localStorage.setItem("vendorToken", response.data.vendorToken);
      localStorage.setItem("vendorFirstName", response.data.vendorFirstName);
      localStorage.setItem("vendor", response.data.vendorFirstName);
      localStorage.setItem("vendorEmailId", response.data.vendorEmailId);
      localStorage.setItem("vendorLastName", response.data.vendorLastName);
      localStorage.setItem("vendorId", response.data.vendorId);
      navigate("/vendorHome");
    }
    if (response.data.message === "Invalid User")
      navigate(`/googlesignupformvendorside/${response.data.email}`);
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-sm w-full sm:w-96 md:w-96 lg:w-96 xl:w-96 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-20">
        <div className="px-6 py-4">
          <div className="flex justify-center">
            <img className="w-20 h-30" src={logo} alt="" />
          </div>

          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Hi Vendors, Welcome Back
          </h3>
          <ToastContainer />
          <form>
            <div className="mt-4">
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
                onChange={(e) => setEmailId(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
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

            <div className="mt-4 flex items-center justify-between">
              <a
                href="/forgotpassword4vendor"
                className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
              >
                Forget Password?
              </a>

              <div className="mt-6">
                <button
                  className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  onClick={handleSignIn}
                >
                  Sign In
                </button>
              </div>
            </div>

            <div className="mt-4">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  var credentialResponseDecoded = jwt_decode(
                    credentialResponse.credential
                  );
                  console.log(credentialResponseDecoded);
                  if (credentialResponseDecoded) {
                    handleGoogleLogin(credentialResponseDecoded);
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Don't have an account?{" "}
          </span>

          <Link
            to="/vendorregister"
            className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >
            Vendor Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VendorLogin;
