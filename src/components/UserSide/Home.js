import React from "react";
import "./Home.css"; // Import the CSS file
import Header from "./Header";
import CarTypes from "./CarTypes";
import SearchBar from "./SeachBar";
import VendorSignUpBar from "./VendorSignUpBar";
import Carousel from "./Carousel";
import NewArrivals from "./NewArrivals";
function Home() {
  const userToken = localStorage.getItem("token");
  return (
    <>
      <Header />
      <Carousel/>
      <SearchBar />
      <CarTypes />
      {userToken ? <NewArrivals/> : <VendorSignUpBar />}
    </>
  );
}

export default Home;
