import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logout clicked!");
    // Remove token from local storage or perform any other logout actions
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmailId");
    navigate("/admin");
  };

  return (
    <header className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome to Admin Dashboard
      </h1>
      <div className="flex flex-wrap justify-center gap-4 sm:justify-evenly md:justify-center lg:justify-evenly">
        <div className="bg-blue-200 p-4 rounded-lg flex flex-col items-center justify-center">
          <i className="fas fa-tachometer-alt text-4xl text-blue-600 mb-2"></i>
          <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
            Dashboard
          </Link>
        </div>
        <div className="bg-green-200 p-4 rounded-lg flex flex-col items-center justify-center">
          <i className="fas fa-users text-4xl text-green-600 mb-2"></i>
          <Link
            to="/admin/userslist"
            className="text-green-600 hover:underline"
          >
            Users
          </Link>
        </div>
        <div className="bg-yellow-200 p-4 rounded-lg flex flex-col items-center justify-center">
          <i className="fas fa-store text-4xl text-yellow-600 mb-2"></i>
          <Link
            to="/admin/vendorslist"
            className="text-yellow-600 hover:underline"
          >
            Vendors
          </Link>
        </div>
        <div className="bg-purple-200 p-4 rounded-lg flex flex-col items-center justify-center">
          <i className="fas fa-book text-4xl text-purple-600 mb-2"></i>
          <Link
            to="/bookings_list_adminside"
            className="text-purple-600 hover:underline"
          >
            Bookings
          </Link>
        </div>
        <div className="bg-pink-200 p-4 rounded-lg flex flex-col items-center justify-center">
          <i className="fas fa-camera fa-3x"></i>{" "}
          {/* Adjust size using fa-2x, fa-3x, fa-4x, fa-5x */}
          <Link to="/admin/carousels" className="text-pink-600 hover:underline">
            Carousels
          </Link>
        </div>
        <div className="bg-pink-200 p-4 rounded-lg flex flex-col items-center justify-center">
          <i className="fas fa-car text-4xl text-pink-600 mb-2"></i>
          <Link
            to="/admin/carslistadminside"
            className="text-pink-600 hover:underline"
          >
            Cars
          </Link>
        </div>
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
    </header>
  );
};

export default AdminHeader;
