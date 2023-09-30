import React,{useState} from 'react';
import bgImage from '../../assets/ownacar.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword4Vendor = () => {

  const navigate=useNavigate();

  const [emailId,setEmailId]=useState("");

  const handleVerifyEmail=async(event)=>{
    event.preventDefault();
    try {
      console.log("inside handleVerifyEmail")
      const response=await axios.post("http://localhost:5000/vendor/verifyEmail",{
        emailId
      })
      if(response.data.message==="OTP sent successfully"){
        console.log("OTP sent successfully");
        navigate('/verifyOTP4PasswordReset4Vendor',{
          state: {
            emailId,
          },
        })
      }else if(response.data.message==="This User doesnt exists"){
        console.log("This User doesnt exists");
        navigate('/register')
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    } 
  }
    return (
        <div
          className="flex justify-center items-center h-screen bg-cover"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <div>
              <label
                htmlFor="Forgot Password"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Forgot Password
              </label>
    
              <input
                type="email"
                placeholder="Enter Email"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                value={emailId}
                onChange={(event) => setEmailId(event.target.value)}
                required
              />
            </div>
    
            <div className="mt-6">
              <div className="flex justify-center">
                <button
                  className="px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                  onClick={handleVerifyEmail}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ForgotPassword4Vendor
