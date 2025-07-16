import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

const VendorHeader = () => {
  const vendorToken = localStorage.getItem("vendorToken");
  const vendorFirstName = localStorage.getItem("vendorFirstName");
  const vendorLastName = localStorage.getItem("vendorLastName");
  const vendorEmailId = localStorage.getItem("vendorEmailId");
  const vendorId = localStorage.getItem("vendorId");
  // const { vendorId } = useParams();

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
    localStorage.removeItem("vendor");
    navigate("/vendorlogin");
  };

  return (
    <header className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome to Vendor Dashboard
      </h1>
      <div className="flex flex-wrap justify-center">
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4">
          <div className="bg-blue-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <i className="fas fa-tachometer-alt text-4xl text-blue-600 mb-2"></i>
            <Link
              to="/vendorDashboard"
              className="text-blue-600 hover:underline"
            >
              Dashboard
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4">
          <div className="bg-green-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <i className="fas fa-car text-4xl text-pink-600 mb-2"></i>
            <Link
              to={`/carsList/${vendorId}`}
              className="text-green-600 hover:underline"
            >
              Cars
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4">
          <div className="bg-yellow-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <i className="fas fa-user fa-3x"></i>
            <Link
              to={`/vendorprofile/${vendorId}`}
              className="text-yellow-600 hover:underline"
            >
              Vendor Info
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4">
          <div className="bg-purple-200 p-4 rounded-lg flex flex-col items-center justify-center">
            <i className="fas fa-book text-4xl text-purple-600 mb-2"></i>
            <Link
              to="/bookingslist"
              className="text-purple-600 hover:underline"
            >
              Bookings
            </Link>
          </div>
        </div>
        {vendorToken ? (
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4">
            <div className="bg-red-200 p-4 rounded-lg flex flex-col items-center justify-center">
              <i className="fas fa-sign-out-alt text-4xl text-red-600 mb-2"></i>
              <span
                onClick={handleLogout}
                className="cursor-pointer text-red-600 hover:underline"
              >
                Logout
              </span>
            </div>
          </div>
        ) : (
          <Link to="/vendorlogin">
            <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 p-4">
              <div className="bg-indigo-200 p-4 rounded-lg flex flex-col items-center justify-center">
                <i className="fas fa-sign-in-alt text-4xl text-indigo-600 mb-2"></i>
                <span className="text-indigo-600 hover:underline">Login</span>
              </div>
            </div>
          </Link>
        )}
      </div>
      <div className="logo mt-7">
        <p>{vendorFirstName}</p>
      </div>
    </header>
  );
};

export default VendorHeader;
