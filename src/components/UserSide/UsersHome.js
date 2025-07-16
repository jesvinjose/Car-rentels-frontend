import React, { useState } from "react";
import "./Home.css"; // Import the CSS file
import Header from "./Header";
import CarTypes from "./CarTypes";
import NewArrivals from "./NewArrivals";
import Carousel from "./Carousel";
function Home() {
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
  );
  return (
    <>
      <Header  walletBalance={walletBalance} setWalletBalance={setWalletBalance} />
      <Carousel />
      {/* <SearchBar /> */}
      <CarTypes />
      <NewArrivals />
    </>
  );
}

export default Home;
