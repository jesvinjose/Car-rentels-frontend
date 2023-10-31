import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css"; // Import Font Awesome CSS
import categoryicon from "../../assets/categoryicon.png";
import gearbox from "../../assets/gearbox.png";
import gasstation from "../../assets/gas-station.png";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";


const AllCars = () => {
  const [allcars, setAllCars] = useState([]);
  const [search, setSearch] = useState(""); // Search term
  const [carTypes, setCarTypes] = useState([]); // Selected car types
  const [gearTypes, setGearTypes] = useState([]); // Selected gear types
  const [fuelTypes, setFuelTypes] = useState([]);
  // const [sortPriceLowToHigh, setSortPriceLowToHigh] = useState(false); // Sort by price: low to high
  // const [sortPriceHighToLow, setSortPriceHighToLow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(6); // Set the number of cars per page
  const [sortTypes, setSortTypes] = useState([]);
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
  );

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = allcars.slice(indexOfFirstCar, indexOfLastCar);
  const token=localStorage.getItem('token')

  useEffect(() => {
    console.log("Updated allcars:", allcars); // Log allcars whenever it changes
  }, [allcars]);

  useEffect(() => {
    console.log("Updated carTypes:", carTypes); // Log carTypes whenever it changes
  }, [carTypes]);

  useEffect(() => {
    console.log("Updated gearTypes:", gearTypes); // Log gearTypes whenever it changes
  }, [gearTypes]);

  useEffect(() => {
    console.log("Updated fuelTypes:", fuelTypes); // Log fuelTypes whenever it changes
  }, [fuelTypes]);

  // useEffect(() => {
  //   console.log("Updated sortPriceLowToHigh:", sortPriceLowToHigh); // Log sortPriceLowToHigh whenever it changes
  // }, [sortPriceLowToHigh]);

  // useEffect(() => {
  //   console.log("Updated sortPriceHighToLow:", sortPriceHighToLow);
  // }, [sortPriceHighToLow]);

  useEffect(() => {
    console.log("Updated sortTypes:", sortTypes);
  }, [sortTypes]);

  // useEffect(() => {
  //   console.log("Updated sortPriceHighToLow:", search);
  // }, [search]);

  const handleSearch = async () => {
    try {
      console.log(search, "search in frontend");
      await handleSelection(search, carTypes, gearTypes, fuelTypes, sortTypes);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  // Function to calculate the minimum return date (one day after pickup date)
  const getMinReturnDate = () => {
    const minReturnDate = new Date(pickupDate);
    minReturnDate.setDate(minReturnDate.getDate() + 1); // Set to one day after pickup date
    return minReturnDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    axiosInstance
      .get("/user/allcars")
      // axios
      //   .get("http://localhost:5000/user/allcars")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAllCars(response.data);
          // console.log(response.data, "inside axios");
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

  // console.log(allcars,"allcars");

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allcars.length / carsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li key={number} className="page-item">
      <button onClick={() => paginate(number)} className="page-link">
        {number}
      </button>
    </li>
  ));

  const handleFuelTypeChange = async (type) => {
    let updatedFuelTypes = "";

    // If the selected type is already in fuelTypes, unselect it
    if (fuelTypes === type) {
      updatedFuelTypes = "";
    } else {
      updatedFuelTypes = type;
    }

    setFuelTypes(updatedFuelTypes);

    // Call handleSelection with updated fuelTypes
    await handleSelection(
      search,
      carTypes,
      gearTypes,
      updatedFuelTypes,
      sortTypes
    );
  };

  const handleGearTypeChange = async (type) => {
    let updatedGearTypes = "";
    // If the selected type is already in gearTypes, unselect it
    if (gearTypes === type) {
      updatedGearTypes = "";
    } else {
      updatedGearTypes = type;
    }
    setGearTypes(updatedGearTypes);
    await handleSelection(
      search,
      carTypes,
      updatedGearTypes,
      fuelTypes,
      sortTypes
    );
  };

  const handleCarTypeChange = async (type) => {
    let updatedCarTypes = "";
    // If the selected type is already in gearTypes, unselect it
    if (carTypes === type) {
      updatedCarTypes = "";
    } else {
      updatedCarTypes = type;
    }
    setCarTypes(updatedCarTypes);
    await handleSelection(
      search,
      updatedCarTypes,
      gearTypes,
      fuelTypes,
      sortTypes
    );
  };

  const handleSortTypeChange = async (type) => {
    let updatedSortTypes = "";
    if (sortTypes === type) {
      updatedSortTypes = "";
    } else {
      updatedSortTypes = type;
    }
    setSortTypes(updatedSortTypes);
    await handleSelection(
      search,
      carTypes,
      gearTypes,
      fuelTypes,
      updatedSortTypes
    );
  };

  const handleSelection = async (
    search,
    carTypes,
    gearTypes,
    fuelTypes,
    sortTypes
  ) => {
    try {
      let url = "/user/allcars"; // Default URL for all cars
      // Add search parameter if provided
      if (search) {
        url += `?search=${search}`;
      }

      // Add pickupDate and returnDate to the URL
      // if(searchInitiated)
      // url += `?pickupDate=${pickupDate}&returnDate=${returnDate}`;

      if (carTypes) {
        url += search ? `&carTypes=${carTypes}` : `?carTypes=${carTypes}`;
      }
      if (gearTypes) {
        url +=
          search || carTypes
            ? `&gearTypes=${gearTypes}`
            : `?gearTypes=${gearTypes}`;
      }
      if (fuelTypes) {
        url +=
          search || carTypes || gearTypes
            ? `&fuelTypes=${fuelTypes}`
            : `?fuelTypes=${fuelTypes}`;
      }
      if (sortTypes) {
        url +=
          search || carTypes || gearTypes || fuelTypes
            ? `&sortTypes=${sortTypes}`
            : `?sortTypes=${sortTypes}`;
      }
      const response = await axiosInstance.get(url);
      console.log("Response from backend:", response.data);
      if (Array.isArray(response.data)) {
        setAllCars(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //----------------------------

  const handleSubmit = async (pickupDate, returnDate) => {
    console.log(pickupDate, "pickupDate");
    setSearchInitiated(true); // Set search initiated flag to true
    try {
      console.log(pickupDate, returnDate, "inside handleSubmit");
      // Send a POST request to the server to get available cars
      const response = await axiosInstance.post(
        "/user/availableCars",
        {
          pickupDate,
          returnDate,
        }
      );
      if (response) {
        // Update the availableCars state with the response data
        setAllCars(response.data);

        // console.log(availableCars);
        // navigate("/available_cars");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handlePickupDateChange = (e) => {
    const selectedDate = e.target.value;
    setPickupDate(selectedDate);

    // Calculate the minimum return date (one day after pickup date)
    const minReturnDate = new Date(selectedDate);
    minReturnDate.setDate(minReturnDate.getDate() + 1);

    // Set the return date to the minimum return date
    setReturnDate(minReturnDate.toISOString().split("T")[0]);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const secondDay = new Date(today);
  secondDay.setDate(today.getDate() + 2);
  const nextDay = secondDay.toISOString().split("T")[0];
  
  const [pickupDate, setPickupDate] = useState(tomorrow.toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState(nextDay);
  
  const [searchInitiated, setSearchInitiated] = useState(false);


  useEffect(() => {}, [searchInitiated]);

  return (
    <div>
      <Header walletBalance={walletBalance} setWalletBalance={setWalletBalance} />
      <div className="border border-black p-4 bg-lime-300 flex flex-col md:flex-row justify-center items-center mt-3">
        <label>Pickup Date:</label>
        <input
          type="date"
          className="border border-black rounded-lg mb-2 md:mr-2 md:mb-0 px-4 py-2"
          placeholder="Pickup Date"
          value={pickupDate}
          onChange={handlePickupDateChange}
          min={tomorrow.toISOString().split("T")[0]} // Set min to tomorrow's date in ISO format
          required
        />

        <label>Return Date: </label>
        <input
          type="date"
          className="border border-black rounded-lg mb-2 md:mr-2 md:mb-0 px-4 py-2"
          placeholder="Return Date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          min={getMinReturnDate()} // Set min to the calculated minimum return date
          required
        />

        <button
          onClick={() => handleSubmit(pickupDate, returnDate)}
          className="bg-green-500 border border-black rounded-lg px-4 py-2 mb-2 ml-4 text-white hover:bg-green-600 cursor-pointer"
        >
          Search
        </button>
      </div>

      {/* Search form */}
      {/* Search, Filter, and Sort in a single row */}

      {searchInitiated ? null : (
        <div className="container mt-5">
          {/* Search form */}
          <div className="row">
            <form
              className="col-lg-4 mb-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search car model"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </div>
            </form>

            <div className="col-lg-8 d-flex flex-wrap justify-content-between align-items-center mb-3">
              {/* Car type filters */}
              <div className="mb-3">
                <h5>Car Types:</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={carTypes.includes("Standard")}
                    onChange={() => handleCarTypeChange("Standard")}
                  />
                  Standard
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={carTypes.includes("Economy")}
                    onChange={() => handleCarTypeChange("Economy")}
                  />
                  Economy
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={carTypes.includes("Luxury")}
                    onChange={() => handleCarTypeChange("Luxury")}
                  />
                  Luxury
                </label>
              </div>

              {/* Gear type filters */}
              <div className="mb-3">
                <h5>Gear Types:</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={gearTypes.includes("Manual")}
                    onChange={() => handleGearTypeChange("Manual")}
                  />
                  Manual
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={gearTypes.includes("Automatic")}
                    onChange={() => handleGearTypeChange("Automatic")}
                  />
                  Automatic
                </label>
              </div>

              {/* Fuel type filters */}
              <div className="mb-3">
                <h5>Fuel Types:</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={fuelTypes.includes("Petrol")}
                    onChange={() => handleFuelTypeChange("Petrol")}
                  />
                  Petrol
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={fuelTypes.includes("Diesel")}
                    onChange={() => handleFuelTypeChange("Diesel")}
                  />
                  Diesel
                </label>
              </div>

              {/* Sort option */}
              <div className="mb-3">
                <h5>Sort:</h5>
                <label>
                  <input
                    type="checkbox"
                    checked={sortTypes.includes("Ascending")}
                    onChange={() => handleSortTypeChange("Ascending")}
                  />
                  Price: Low to High
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={sortTypes.includes("Descending")}
                    onChange={() => handleSortTypeChange("Descending")}
                  />
                  Price: High to Low
                </label>
              </div>
            </div>
          </div>

          {/* Filter options */}
        </div>
      )}

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
                    {/* <h1 className="px-2 text-sm">
                      {car.hourlyRentalRate}Rs/hr
                    </h1> */}
                    <h1 className="px-2 text-lg">
                      Rental-Rate:{car.dailyRentalRate} Rs/day
                    </h1>
                    {/* <h1 className="px-2 text-sm">
                      {car.monthlyRentalRate}Rs/month
                    </h1>  */}

                    <button className="border border-black w-28 rounded-lg bg-orange-500-100 hover:bg-orange-800-400 shadow-md">
                      {searchInitiated && token ? (
                        <Link
                          // onClick={() => handleBooking(car._id)}
                          to={`/booking_details?carId=${car._id}&pickupDate=${pickupDate}&returnDate=${returnDate}`}
                          className="btn_3"
                        >
                          Book Now
                        </Link>
                      ) : (
                        <Link
                          to={`/car_details?carId=${car._id}`}
                          className="btn_3"
                        >
                          View Details
                        </Link>
                      )}
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

export default AllCars;
