import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import axiosInstance from '../../api/axiosInstance';

const NewArrivals = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/user/newlyarrivedcars")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCars(response.data);
          console.log(cars, "inside axios");
        } else {
          console.error(
            "Invalid data received from the server:",
            response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(cars, "in new arrivals");

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

                <div className="px-6 py-4">
                  <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {car.modelName}
                  </h1>
                  {/* Add your p element here */}
                  <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    {/* Add your SVG and h1 elements here */}
                  </div>
                  <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    {/* Add your SVG and h1 elements here */}
                  </div>
                  <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
                    {/* <h1 className="px-2 text-sm">
                      {car.hourlyRentalRate}Rs/hr
                    </h1> */}
                    <h1 className="px-2 text-sm">
                      {car.dailyRentalRate}Rs/day
                    </h1>
                    {/* <h1 className="px-2 text-sm">
                      {car.monthlyRentalRate}Rs/month
                    </h1> */}
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
