import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import bgImage from "../../assets/signUpbackgroundImage.jpg";
import logo from "../../assets/logo-1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { USER_INFO } from "../../redux/actions/types";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function UserLogin() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search).get(
      "redirectFrom"
    );
    if (urlParams === "OTP") {
      toast("Account Created Successfully");
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
      const userData = {
        emailId: emailId,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:5000/user/verifyUserLogin",
        userData
      );
      // console.log(response, "--------Frontend User Login Response");
      console.log(response.data, "-----response.data.........");
      if (response.data.message === "Valid User") {
        // Set values in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("firstName", response.data.firstName);
        localStorage.setItem("emailId", response.data.emailId);
        localStorage.setItem("lastName", response.data.lastName);
        localStorage.setItem("userId", response.data.userId);
        navigate("/usershome");
      } else if (response.data.message === "Wrong password") {
        toast("Wrong password");
      } else if (
        response.data.message === "User is not registered, please register now"
      ) {
        toast("User is not registered, please register now");
      } else if (
        response.data.message ===
        "User is blocked, contact jesvinjose49@gmail.com"
      ) {
        toast("User is blocked, contact jesvinjose49@gmail.com");
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
    const response = await axios.post(
      "http://localhost:5000/user/verifyGoogleLogin",
      email
    );
    console.log(response, "--------response-----------");
    if (response.data.message === "Google Login") {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("firstName", response.data.firstName);
      localStorage.setItem("emailId", response.data.emailId);
      localStorage.setItem("lastName", response.data.lastName);
      localStorage.setItem("userId", response.data.userId);
      navigate("/");
    }
    if (response.data.message === "Invalid User") navigate(`/googlesignupform/${response.data.email}`);
    toast("User is not Registered, So Please SignUp")
  };

  // const handleGoogleSignup = async (credentialResponse) => {
  //   // Decode the credential response to extract the email
  //   const credentialResponseDecoded = jwt_decode(credentialResponse.credential);
  //   console.log(credentialResponseDecoded, "credential response decoded");
  
  //   if (credentialResponseDecoded) {
  //     const email = credentialResponseDecoded.email;
      
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/user/verifyGoogleSignup",
  //         { email }
  //       );
  
  //       // Check the response message from the backend
  //       if (response.data.message === "User have already Registered") {
  //         navigate("/login");
  //         toast("User have already Registered,Please login normaly or with google ")
  //       } else if (response.data.message === "Open google sign up registration form") {
  //         // Navigate to the Google signup form page
  //         navigate(`/googlesignupform/${email}`);
  //       } else {
  //         console.error("Unknown response from server:", response.data.message);
  //       }
  //     } catch (error) {
  //       console.error("Error during Google signup:", error.message);
  //     }
  //   }
  // };
  


  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="">
        <div className="max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mr-8 mt-20">
          <div className="px-6 py-4">
            <div className="flex justify-center mx-auto">
              <img className="w-20 h-30" src={logo} alt="" />
            </div>

            <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
              Welcome Back
            </h3>
            <div>
              <ToastContainer />
            </div>
            <form>
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
                    onChange={(e) => setEmailId(e.target.value)}
                    required
                  />
                </div>

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
              </div>

              <div className="flex items-center justify-between mt-4">
                <a
                  className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
                  href="/forgotpassword"
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

              <div>
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
              to="/register"
              className="font-medium text-gray-700 dark:text-gray-200 hover:underline"
            >
              Sign Up
            </Link>
            {/* <div>
              <GoogleLogin
                buttonText="Sign Up with Google" 
                onSuccess={(credentialResponse) => handleGoogleSignup(credentialResponse)} 
                onError={() => console.log("Google Sign Up Failed")} 
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;

// {
//   /* <div className="flex mt-4">
// <div className="w-1/2 pr-2">
//   <label
//     htmlFor="emailId"
//     className="block text-sm text-gray-800 dark:text-gray-200"
//   >
//     Email Id
//   </label>
//   <input
//     type="email"
//     className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//     placeholder="Enter Email"
//     value={emailId}
//     onChange={(e) => setEmail(e.target.value)}
//     required
//   />
// </div> */
// }

// {
//   /* <div className="flex mt-4">
// <div className="w-1/2 pr-2">
//   <label
//     htmlFor="password"
//     className="block text-sm text-gray-800 dark:text-gray-200"
//   >
//     Password
//   </label>
//   <input
//     type="password"
//     className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//     placeholder="Password"
//     value={password}
//     onChange={(e) => setPassword(e.target.value)}
//     required
//   />
// </div> */
// }
