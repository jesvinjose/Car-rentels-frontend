import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SeachBar";
import carseat from "../../assets/car-seat.png";
import gearbox from "../../assets/gearbox.png";
import gasstation from "../../assets/gas-station.png";
import mileage from "../../assets/mileage.png";
import axiosInstance from '../../api/axiosInstance';

const CarDetails = () => {
  const [carDetails, setCarDetails] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const carId = searchParams.get("carId");

  useEffect(() => {
    // Make API request to fetch carDetails based on the carId
    const fetchCarDetails = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:5000/user/car_details?carId=${carId}`
        // );
        const response=await axiosInstance.get(`/user/car_details?carId=${carId}`) 
        setCarDetails(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (carId) {
      fetchCarDetails();
    }
  }, []);
  console.log(carDetails, "---------here is the carDetails");
  return (
    <div>
      <Header />
      {/* <SearchBar /> */}
      <div className="flex justify-center items-center mt-10">
        <h1>Car Details</h1>
      </div>
      <div className="flex justify-evenly mt-10">
        <h3>Model:{carDetails.modelName}</h3>
        <h3>Delivery at Hub:{carDetails.deliveryHub}</h3>
        <h3>With Fuel Capacity:{carDetails.fuelCapacity} L</h3>
      </div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-6">
            <img
              className=" m-auto border border-black rounded"
              src={carDetails.carImage}
            />
          </div>
          <div className="col-6 m-auto">
            <div className="row">
              <div className="col-6">
                <div className="flex justify-evenly ">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={carseat}
                  />
                  <h5 className="ml-2 m-auto">
                    {carDetails.seatNumber} seater
                  </h5>
                </div>
              </div>
              <div className="col-6">
                <div className="flex justify-evenly">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={gearbox}
                  />
                  <h5 className="ml-2 m-auto">{carDetails.gearBoxType}</h5>
                </div>
              </div>
            </div>

            {/* ================ */}
            <div className="row mt-5">
              <div className="col-6">
                <div className="flex justify-evenly">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={gasstation}
                  />
                  <h5 className="ml-2 m-auto">{carDetails.fuelType}</h5>
                </div>
              </div>
              <div className="col-6 ">
                <div className="flex justify-evenly">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={mileage}
                  />
                  <h5 className="ml-2 m-auto">{carDetails.mileage} km/litre</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container border mt-10 mb-10">
        <h1>Description</h1>
        <div className="row">
          <div className="col-12">{carDetails.description}</div>
        </div>
      </div>
      <div className="container flex justify-center mb-20">
        {/* <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Book Now
        </button> */}
      </div>
    </div>
  );
};

export default CarDetails;
