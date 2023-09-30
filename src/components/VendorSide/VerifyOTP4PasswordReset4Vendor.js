import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import bgImage from '../../assets/ownacar.png'

function VerifyOTP4PasswordReset4Vendor() {
  const location = useLocation();
  const {
    emailId,
  } = location.state;
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerifyOTP = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/vendor/VerifyOTP4PasswordReset4Vendor",
        {
          otp,
          emailId,
        }
      );
      if (response.data.message === "OTP sent successfully") {
        navigate("/PasswordReset4Vendor",{
            state: {
              emailId,
            },
        });
      } else if (response.data.message === "wrong OTP") {
        console.error("wrong OTP");
      } else {
        console.error("OTP verification failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div>
          <label
            htmlFor="Verify OTP"
            className="block text-sm text-gray-500 dark:text-gray-300"
          >
            Verify OTP
          </label>

          <input
            type="text"
            placeholder="Enter OTP"
            className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            required
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-center">
            <button
              className="px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP4PasswordReset4Vendor;
