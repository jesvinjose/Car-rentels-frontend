// VendorHome.js
import React from "react";
import "./VendorHome.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function VendorHome() {
  const navigate=useNavigate();
  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked!");
    // Remove token from local storage or perform any other logout actions
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("vendorFirstName");
    navigate("/vendorlogin")
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome to Vendor Dashboard
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <i className="fas fa-tachometer-alt text-4xl text-blue-600 mb-2"></i>
            <Link
              to="/vendorDashboard"
              className="text-blue-600 hover:underline"
            >
              Dashboard
            </Link>
          </div>
          <div className="bg-green-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <i className="fas fa-users text-4xl text-green-600 mb-2"></i>
            <Link to="/carsList" className="text-green-600 hover:underline">
              Cars
            </Link>
          </div>
          <div className="bg-yellow-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <i className="fas fa-store text-4xl text-yellow-600 mb-2"></i>
            <Link to="/vendorInfo" className="text-yellow-600 hover:underline">
              Vendor Info
            </Link>
          </div>
          <div className="bg-purple-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <i className="fas fa-book text-4xl text-purple-600 mb-2"></i>
            <Link
              to="/bookingsList"
              className="text-purple-600 hover:underline"
            >
              Bookings
            </Link>
          </div>
          {/* Logout button */}
          <div className="bg-red-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <i className="fas fa-sign-out-alt text-4xl text-red-600 mb-2"></i>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorHome;
