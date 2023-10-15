import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import axiosInstance from '../../api/axiosInstance';

const CategorywiseCars = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');  
  const [categorycars, setCategoryCars] = useState([]);
  useEffect(() => {
    // Make API request to fetch cars based on the category
    const fetchCars = async () => {
        try {
          // const response = await axios.get(`http://localhost:5000/user/car_list?category=${category}`);
          const response=await axiosInstance.get(`/user//car_list?category=${category}`)
          setCategoryCars(response.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      if (category) {
        fetchCars();
      }
  }, [category]);

  return (
    <div>
      <Header />
      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="header">{category} Models</h1>
      </div>

      <div className="flex flex-wrap justify-center">
        {categorycars.map((car, index) => (
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
                    <button><h1 className="px-10 text-base">View Details</h1></button>
                    
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

export default CategorywiseCars;
