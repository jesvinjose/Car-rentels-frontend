import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo-1.png";
const Header = () => {
  const token = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");
  const emailId = localStorage.getItem("emailId");
  const lastName = localStorage.getItem("lastName");
  const userId = localStorage.getItem("userId");

  const handleLogout = (e) => {
    document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Clear cookie
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("emailId");
    localStorage.removeItem("userId");
  };
  return (
    <div>
      <header className="bg-white flex">
        <div className="flex  ">
          <div className="logo ">
            <img src={logo} alt="Logo" /> {/* Use the logo image here */}
          </div>

          <div className="flex justify-end  items-center ml-96  w-fit">
            <nav className=" text-black ">
              <ul className="font-serif text-black flex ">
                <li className="">
                  <a href="/">Home</a>
                </li>
                <li className="ml-5 ">
                  <a href="/subscription">Subscription</a>
                </li>
                <li className="ml-5">
                  <a href="/offers">Offers</a>
                </li>
                <li className="ml-5">
                  <a href="/about">About</a>
                </li>
                <li className="ml-5">
                  <a href="/contact">Contact</a>
                </li>
                {token ? (
                  <Link to="/logout">
                    <li className="ml-5" onClick={handleLogout}>
                      Logout
                    </li>
                  </Link>
                ) : (
                  <Link to="/login">
                    <li className="ml-5">Login</li>
                  </Link>
                )}
              </ul>
            </nav>
          </div>
        </div>
        <div className="logo ml-60 mt-7">
          <Link to={`/userprofile/${userId}`}>
            <p>{firstName}</p>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;

// console.log(token,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

// Decode the token
//   const base64Url = token ? token.split(".")[1] : null;

// // Rest of the code
//   const base64 = base64Url.replace("-", "+").replace("_", "/");
//   const decodedToken = JSON.parse(atob(base64));

// // Access the data from the decoded token
// const userId = decodedToken._id; // User ID
// const userEmail = decodedToken.emailId; // User Email ID
// const userFirstName = decodedToken.firstName; // User First Name

// // Use the extracted data as needed
// console.log("User ID:", userId);
// console.log("User Email:", userEmail);
// console.log("User First Name:", userFirstName);
