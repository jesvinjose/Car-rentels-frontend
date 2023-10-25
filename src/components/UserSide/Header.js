import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidUserCircle } from "react-icons/bi";
import logo from "../../assets/logo-1.png";
const Header = () => {
  const token = localStorage.getItem("token");
  const firstName = localStorage.getItem("firstName");
  const emailId = localStorage.getItem("emailId");
  const lastName = localStorage.getItem("lastName");
  const userId = localStorage.getItem("userId");
  const walletBalance=localStorage.getItem("walletBalance")
  const navigate = useNavigate();
  const handleLogout = (e) => {
    document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // Clear cookie
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("emailId");
    localStorage.removeItem("userId");
    localStorage.removeItem("walletBalance");
    localStorage.removeItem("user");
  };
  return (
<div>
  <header className="bg-white d-flex justify-content-between align-items-center px-4">
    <div className="d-flex align-items-center">
      <div className="logo mr-4">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="d-flex">
        <Link to="/usershome" className="nav-link">
          Home
        </Link>
        <Link to="/allcars" className="nav-link ml-3">
          Cars
        </Link>
        <Link to="/offers" className="nav-link ml-3">
          Offers
        </Link>
        <Link to="/about" className="nav-link ml-3">
          About
        </Link>
        <Link to="/contact" className="nav-link ml-3">
          Contact
        </Link>
      </nav>
    </div>

    {token ? (
      <div className="d-flex align-items-center">
        <div className="dropdown">
          <button
            className="btn d-flex"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <BiSolidUserCircle size="1.5rem" />
          </button>
          <div
            className="dropdown-menu dropdown-menu-right" // Align dropdown menu to the right
            aria-labelledby="dropdownMenuButton"
          >
            <a className="dropdown-item" href="#">
              <p
                className="cursor-pointer"
                onClick={() => navigate(`/userprofile/${userId}`)}
              >
                {firstName}
              </p>
            </a>
            {walletBalance ? (
                  <li className="dropdown-item">
                    Wallet: {walletBalance}
                  </li>
                ) : null}
            {token ? (
              <Link to="/booking_history" className="dropdown-item">
                <li>Booking History</li>
              </Link>
           ) : (
              <></>
            )}
            {token ? (
              <Link to="/logout" className="dropdown-item">
                <li onClick={handleLogout}>Logout</li>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    ) : (
      <Link to="/login" className="nav-link ml-3">
        Login
      </Link>
    )}
  </header>
</div>

  );
};

export default Header;
