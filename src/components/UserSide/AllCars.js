import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css"; // Import Font Awesome CSS

const AllCars = () => {
  const [allcars, setAllCars] = useState([]);
  const [search, setSearch] = useState(""); // Search term
  const [carTypes, setCarTypes] = useState([]); // Selected car types
  const [gearTypes, setGearTypes] = useState([]); // Selected gear types

  const [sortPriceLowToHigh, setSortPriceLowToHigh] = useState(false); // Sort by price: low to high
  const [sortPriceHighToLow, setSortPriceHighToLow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(6); // Set the number of cars per page
  const [sortTypes, setSortTypes] = useState([]);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = allcars.slice(indexOfFirstCar, indexOfLastCar);

  // const handleGearTypeChange = async (type) => {
  //   // If the selected type is already in gearTypes, unselect it
  //   setGearTypes((prevTypes) => (prevTypes.includes(type) ? [] : [type]));
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/user/Geartype?gearType=${type}`
  //     );
  //     console.log("Response from backend:", response.data);
  //     if (Array.isArray(response.data)) {
  //       setAllCars(response.data);
  //     }
  //     console.log(allcars);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // const handleFuelTypeChange = async (type) => {
  //   // If the selected type is already in fuelTypes, unselect it
  //   setFuelTypes((prevTypes) => (prevTypes.includes(type) ? [] : [type]));
  //   try {
  //     const response=await axios.get(`http://localhost:5000/user/Fueltype?fuelType=${type}`)
  //     console.log("Response from backend:", response.data);
  //     if (Array.isArray(response.data)) {
  //       setAllCars(response.data);
  //     }
  //     console.log(allcars);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const [fuelTypes, setFuelTypes] = useState([]);


  // const handleCarTypeChange = async (type) => {
  //   // If the selected type is already in carTypes, unselect it
  //   setCarTypes((prevTypes) => (prevTypes.includes(type) ? [] : [type]));
  //   try {
  //     let response;
  //     // If no car types are selected, fetch all cars
  //     if (carTypes.length === 0) {
  //       response = await axios.get("http://localhost:5000/user/allcars");
  //       // console.log("Response from backend:", response.data);
  //       // if (Array.isArray(response.data)) {
  //       //   setAllCars(response.data);
  //       // }
  //     } else {
  //       response = await axios.get(
  //         `http://localhost:5000/user/carsbycartype?carType=${type}`
  //       );
  //       console.log("Response from backend:", response.data);
  //       if (Array.isArray(response.data)) {
  //         setAllCars(response.data);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };


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

  useEffect(() => {
    console.log("Updated sortPriceLowToHigh:", sortPriceLowToHigh); // Log sortPriceLowToHigh whenever it changes
  }, [sortPriceLowToHigh]);

  useEffect(() => {
    console.log("Updated sortPriceHighToLow:", sortPriceHighToLow);
  }, [sortPriceHighToLow]);

  const handleSortPriceLowToHighChange = async () => {
    const newSortPriceLowToHigh = !sortPriceLowToHigh; // Toggle the sort
    setSortPriceLowToHigh(newSortPriceLowToHigh); // Update the state
    setSortPriceHighToLow(false); // Always set high to low to false when changing low to high

    const sortType = newSortPriceLowToHigh ? "asc" : "desc"; // Determine the sort type

    try {
      const response = await axios.get(
        `http://localhost:5000/user/SortAscentingType?SortAscentingType=${sortType}`
      );
      // console.log(response.data, "-----received from backend to frontend");
      if (Array.isArray(response.data)) {
        // console.log(response.data,"---------------");
        setAllCars(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSortPriceHighToLowChange = async () => {
    const newSortPriceHighToLow = !sortPriceHighToLow; // Toggle the sort
    setSortPriceHighToLow(newSortPriceHighToLow); // Update the state
    setSortPriceLowToHigh(false); // Always set high to low to false when changing low to high

    const sortType = newSortPriceHighToLow ? "desc" : "asc"; // Determine the sort type
    try {
      const response = await axios.get(
        `http://localhost:5000/user/SortDescentingType?SortDescentingType=${sortType}`
      );
      // console.log(response.data, "-----received from backend to frontend");
      if (Array.isArray(response.data)) {
        // console.log(response.data,"---------------");
        setAllCars(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      await handleSelection(search, carTypes, gearTypes, fuelTypes, sortTypes);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/allcars")
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
      <a onClick={() => paginate(number)} className="page-link" href="#">
        {number}
      </a>
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

  const handleGearTypeChange=async(type)=>{
    let updatedGearTypes="";
    // If the selected type is already in gearTypes, unselect it
    if(gearTypes===type){
      updatedGearTypes="";
    }else{
      updatedGearTypes=type;
    }
    setGearTypes(updatedGearTypes);
    await handleSelection(
      search,
      carTypes,
      updatedGearTypes,
      fuelTypes,
      sortTypes
    );
  }

  const handleCarTypeChange=async(type)=>{
    let updatedCarTypes="";
    // If the selected type is already in gearTypes, unselect it
    if(carTypes===type){
      updatedCarTypes="";
    }else{
      updatedCarTypes=type;
    }
    setCarTypes(updatedCarTypes);
    await handleSelection(
      search,
      updatedCarTypes,
      gearTypes,
      fuelTypes,
      sortTypes
    );

  }

  const handleSortTypeChange=async(type)=>{
    let updatedSortTypes="";
    if(sortTypes===type){
      updatedSortTypes="";
    }else{
      updatedSortTypes=type;
    }
    setSortTypes(updatedSortTypes);
    await handleSelection(
      search,
      carTypes,
      gearTypes,
      fuelTypes,
      updatedSortTypes
    );
  }

  const handleSelection = async (
    search,
    carTypes,
    gearTypes,
    fuelTypes,
    sortTypes
  ) => {
    try {
      let url = "http://localhost:5000/user/allcars"; // Default URL for all cars

      // Add search parameter if provided
      if (search) {
        url += `?search=${search}`;
      }
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
      const response = await axios.get(url);
      console.log("Response from backend:", response.data);
      if (Array.isArray(response.data)) {
        setAllCars(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Header />
      {/* Search form */}
      {/* Search, Filter, and Sort in a single row */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Search form */}
        <form className="w-25">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search car model"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>

        {/* Filter options */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* Car type filters */}
          <div>
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
          <div className="ml-10">
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
          <div className="ml-10">
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
          <div className="ml-10">
            <h5>Sort:</h5>
            <label>
              <input
                type="checkbox"
                checked={sortTypes.includes("sortPriceLowToHigh")}
                onChange={()=>handleSortTypeChange("sortPriceLowToHigh")}
              />
              Price: Low to High
            </label>
            <label>
              <input
                type="checkbox"
                checked={sortTypes.includes("sortPriceHighToLow")}
                onChange={()=>handleSortTypeChange("sortPriceHighToLow")}
              />
              Price: High to Low
            </label>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="header">Our Models</h1>
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
                    <h1 className="px-2 text-sm">
                      {car.hourlyRentalRate}Rs/hr
                    </h1>
                    {/* <h1 className="px-2 text-sm">
                      {car.dailyRentalRate}Rs/day
                    </h1>
                    <h1 className="px-2 text-sm">
                      {car.monthlyRentalRate}Rs/month
                    </h1> */}
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
