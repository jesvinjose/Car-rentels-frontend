import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VendorHeader = () => {
  const vendorToken = localStorage.getItem("vendorToken");
  const vendorFirstName = localStorage.getItem("vendorFirstName");
  const vendorLastName = localStorage.getItem("vendorLastName");
  const vendorEmailId = localStorage.getItem("vendorEmailId");
  const vendorId = localStorage.getItem("vendorId");
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    // Implement your logout logic here
    console.log("Logout clicked!");
    // Remove token from local storage or perform any other logout actions
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorFirstName");
    localStorage.removeItem("vendorLastName");
    localStorage.removeItem("vendorEmailId");
    localStorage.removeItem("vendorId");
    navigate("/vendorlogin");
  };

  return (
    <header className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome to Vendor Dashboard
      </h1>
      {/* <div className="flex justify-center"> */}
      <div className="flex justify-evenly">
        <div className="bg-blue-200 p-4 rounded-lg flex flex-col items-center justify-center">
          <i className="fas fa-tachometer-alt text-4xl text-blue-600 mb-2"></i>
          <Link to="/vendorDashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
        </div>
        <div className="bg-green-200 p-4 rounded-lg flex flex-col items-center justify-center">
          <i className="fas fa-car text-4xl text-pink-600 mb-2"></i>
          <Link to="/carsList" className="text-green-600 hover:underline">
            Cars
          </Link>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg flex flex-col items-center justify-center">
          {/* <i className="fas fa-store text-4xl text-yellow-600 mb-2"></i> */}
          <i className="fas fa-user fa-3x"></i>
          <Link
            to={`/vendorprofile/${vendorId}`}
            className="text-yellow-600 hover:underline"
          >
            Vendor Info
          </Link>
        </div>
        <div className="bg-purple-200 p-4 rounded-lg flex flex-col items-center justify-center">
          <i className="fas fa-book text-4xl text-purple-600 mb-2"></i>
          <Link to="/bookingslist" className="text-purple-600 hover:underline">
            Bookings
          </Link>
        </div>
        {vendorToken ? (
          <div className="bg-red-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <i className="fas fa-sign-out-alt text-4xl text-red-600 mb-2"></i>
            <span
              onClick={handleLogout}
              className="cursor-pointer text-red-600 hover:underline"
            >
              Logout
            </span>
          </div>
        ) : (
          <Link to="/login">
            <div className="bg-indigo-200 p-4 rounded-lg flex flex-col items-center justify-center">
              <i className="fas fa-sign-in-alt text-4xl text-indigo-600 mb-2"></i>
              <span className="text-indigo-600 hover:underline">Login</span>
            </div>
          </Link>
        )}

        <div className="logo ml-0 mt-7">
          <p>{vendorFirstName}</p>
        </div>
      </div>
      {/* </div> */}
    </header>
  );
};

export default VendorHeader;
