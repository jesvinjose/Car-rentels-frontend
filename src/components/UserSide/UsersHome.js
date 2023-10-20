import React from "react";
import "./Home.css"; // Import the CSS file
import Header from "./Header";
import CarTypes from "./CarTypes";
import SearchBar from "./SeachBar";
import NewArrivals from "./NewArrivals";
import Carousel from "./Carousel";
function Home() {
  return (
    <>
      <Header />
      <Carousel />
      {/* <SearchBar /> */}
      <CarTypes />
      <NewArrivals />
    </>
  );
}

export default Home;
