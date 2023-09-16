// Home.js
import React from "react";
import "./Home.css"; // Import the CSS file
import Header from "./Header";
import carousel from "../../assets/carousel-1.jpg";
import CarTypes from "./CarTypes";
import SearchBar from "./SeachBar";
import VendorSignUpBar from "./VendorSignUpBar";
function Home() {
  return (
    <>
      <div className="bg-red-600">
        <Header />
        {/* <h1 className="text-center">Welcome to the User Home Page</h1> */}
        {/* Render your fetched data or other components here */}
      </div>

      <div className="carousel">
        <img src={carousel} alt="carousel" />{" "}
        {/* Use the carousel image here */}
      </div>
      <SearchBar />
      <CarTypes />
      <VendorSignUpBar />
    </>
  );
}

export default Home;
