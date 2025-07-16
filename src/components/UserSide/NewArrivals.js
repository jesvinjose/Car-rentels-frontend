import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import categoryicon from "../../assets/categoryicon.png";
import gearbox from "../../assets/gearbox.png";
import gasstation from "../../assets/gas-station.png";
import LoadingSpinner from "./LoadingSpinner"; // Import your loading spinner component

const NewArrivals = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const navigate = useNavigate();
  useEffect(() => {
    // Use axiosInstance for your request (make sure it's correctly configured)
    axiosInstance
      .get("/user/newlyarrivedcars")
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setCars(response.data);
          setIsLoading(false)
          console.log(cars, "inside axios");
        } else {
          // Handle the case when the response is empty
          console.error("No cars found or invalid data received.");
          setIsLoading(false)
          navigate("/404");
        }
      })
      .catch((error) => {
        // Handle network errors and other issues
        console.error("Error fetching data:", error);
        setIsLoading(false)
        navigate("/404");
      });
  }, []); // Empty dependency array to run this effect once

  console.log(cars, "in new arrivals");

  // Conditional rendering based on isLoading
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <LoadingSpinner />
      </div>
    ); // Render the loading spinner
  }

  return (
    <div>
      <div className="flex justify-center mt-5">
        <h1 className="text-3xl font-bold my-8">New Arrivals</h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {cars.map((car, index) => (
          <div key={index} className="m-4">
            {!car.blockStatus && (
              <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
                <img
                  className="object-cover object-center w-full h-56"
                  src={car.carImage}
                  alt="avatar"
                  style={{ width: "400px", height: "200px" }}
                />

                <div className="px-6 py-4 justify-between">
                  <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {car.modelName}
                  </h1>
                  <div className="flex justify-evenly">
                    <div>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={categoryicon}
                        alt="categoryicon-preview"
                      />
                      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {car.carTypeName}
                      </h1>
                    </div>
                    <div>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={gasstation}
                        alt="gasstation-preview"
                      />
                      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {car.fuelType}
                      </h1>
                    </div>
                    <div>
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={gearbox}
                        alt="gearbox-preview"
                      />
                      <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {car.gearBoxType}
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    <h1 className="px-2 text-lg">
                      Rental-Rate:{car.dailyRentalRate} Rs/day
                    </h1>
                    <button className="border border-black w-28 rounded-lg bg-orange-500-100 hover:bg-orange-800-400 shadow-md">
                      <a
                        href={`/car_details?carId=${car._id}`}
                        className="btn_3"
                      >
                        View Details
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
