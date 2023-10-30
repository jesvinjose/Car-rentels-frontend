import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import categoryicon from "../../assets/categoryicon.png";
import gearbox from "../../assets/gearbox.png";
import gasstation from "../../assets/gas-station.png";

const CategorywiseCars = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const [categorycars, setCategoryCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(6); // Set the number of cars per page
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
  );

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = categorycars.slice(indexOfFirstCar, indexOfLastCar);

  useEffect(() => {
    // Make API request to fetch cars based on the category
    const fetchCars = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/user/car_list?category=${category}`);
        const response = await axiosInstance.get(
          `/user//car_list?category=${category}`
        );
        setCategoryCars(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (category) {
      fetchCars();
    }
  }, [category]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categorycars.length / carsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li key={number} className="page-item">
      <a onClick={() => paginate(number)} className="page-link" href="#">
        {number}
      </a>
    </li>
  ));

  return (
    <div>
      <Header walletBalance={walletBalance} setWalletBalance={setWalletBalance}/>
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
        {currentCars.map((car, index) => (
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
      <div className="d-flex justify-content-center">
        <ul className="pagination">{renderPageNumbers}</ul>
      </div>
    </div>
  );
};

export default CategorywiseCars;
