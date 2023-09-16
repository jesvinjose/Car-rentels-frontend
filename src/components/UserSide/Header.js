import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo-1.png'
const Header = () => {
  const token=localStorage.getItem('token') 
  // console.log(token,">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

  const handleLogout=((e)=>{
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
  })
  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" /> {/* Use the logo image here */}
        </div>
        <nav className="nav">
          <ul>
            <li className="font-serif">
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/subscription">Subscription</a>
            </li>
            <li>
              <a href="/offers">Offers</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            {token ? (<Link to="/logout">
            
              <li onClick={handleLogout}>Logout</li>
            </Link>) : (
              <Link to="/login">
              <li>Login</li>
            </Link>
            )}
            
          </ul>
        </nav>
        
   
       
      </header>
    </div>
  );
};

export default Header;
