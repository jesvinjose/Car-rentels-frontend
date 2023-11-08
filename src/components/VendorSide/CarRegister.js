import React, { useState, useEffect } from "react";
// import * as React from "react";
import axios from "axios";
import VendorHeader from "./VendorHeader";
import { useNavigate, useParams } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import axiosInstance from "../../api/axiosInstance";
import axiosInstanceforVendor from "../../api/axiosInstanceforVendor";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
// mapboxgl.accessToken =
//   "pk.eyJ1IjoiamVzdmluam9zZSIsImEiOiJjbG5ha2xmM3AwNWZ1MnFyc3pxczN3aW84In0.1vF_M9hKw9RecdOlyFar2A";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamVzdmluam9zZSIsImEiOiJjbG9wcDAyZjUwYnhmMmtwZWpyaXIyODJ4In0.IElaQos2Dju7KqG0DLp8aw";

const CarRegister = () => {
  const carTypes = ["Standard", "Economy", "Luxury"];
  const fuelTypes = ["Petrol", "Diesel"];
  const gearTypes = ["Manual", "Automatic"];
  // const vendorId = localStorage.getItem("vendorId");
  const [deliveryHub, setDeliveryHub] = useState("");
  const [modelName, setModelName] = useState("");
  const [fuelCapacity, setFuelCapacity] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [mileage, setMileage] = useState("");
  const [description, setDescription] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const { vendorId } = useParams();

  const [rcImageDataUrl, setRcImageDataUrl] = useState(null);
  const [carImageDataUrl, setCarImageDataUrl] = useState(null);

  const [selectedCarType, setSelectedCarType] = useState("");
  const [selectedGearBox, setSelectedGearBox] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [hourlyRentalRate, setHourlyRentalRate] = useState("");
  const [dailyRentalRate, setDailyRentalRate] = useState("");
  const [monthlyRentalRate, setMonthlyRentalRate] = useState("");
  // State to store car location (latitude and longitude)
  const [carLocation, setCarLocation] = useState({
    latitude: 12.971599,
    longitude: 77.594566,
  });
  const navigate = useNavigate();

  const vendortoken = localStorage.getItem("vendorToken");

  const handleModelNameChange = (e) => {
    setModelName(e.target.value);
    console.log(modelName, "modelName");
  };

  const handleDeliveryHubChange = (e) => {
    setDeliveryHub(e.target.value);
    console.log(deliveryHub, "deliveryHub");
  };

  const handleFuelCapacityChange = (e) => {
    setFuelCapacity(e.target.value);
  };

  const handleGearBoxChange = (e) => {
    setSelectedGearBox(e.target.value);
  };

  const handleSeatNumberChange = (e) => {
    setSeatNumber(e.target.value);
  };

  const handleMileageChange = (e) => {
    setMileage(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRcNumberChange = (e) => {
    setRcNumber(e.target.value);
  };

  const handleRcImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("inside rcimage file");
      handleFileChange(file, setRcImageDataUrl);
    } else {
      console.log("ouside rcimage file");
    }
  };

  const handleCarImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("inside carimage file");
      handleFileChange(file, setCarImageDataUrl);
    } else {
      console.log("ouside carimage file");
    }
  };

  const handleFileChange = (file, setImageDataUrl) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result);
    };

    if (file) {
      console.log("inside file");
      reader.readAsDataURL(file);
    }
  };

  const handleCarTypeChange = (e) => {
    setSelectedCarType(e.target.value);
  };

  const handleFuelTypeChange = (e) => {
    setSelectedFuelType(e.target.value);
  };

  const handleHourlyRentalRateChange = (e) => {
    setHourlyRentalRate(e.target.value);
  };

  const handleDailyRentalRateChange = (e) => {
    setDailyRentalRate(e.target.value);
  };

  const handleMonthlyRentalRateChange = (e) => {
    setMonthlyRentalRate(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log(
      modelName,
      deliveryHub,
      description,
      fuelCapacity,
      selectedFuelType,
      seatNumber,
      rcNumber,
      rcImageDataUrl,
      "etc"
    );
    console.log(vendorId, "-------vendorId");
    e.preventDefault();
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${vendortoken}`  // Set the token in the headers
      //   }
      // };
      console.log(carLocation, "-------------carLocationFrontend-------");
      // console.log(rcImageDataUrl,"----------imageurl");
      const response = await axiosInstanceforVendor.post(
        `/vendor/registercar/${vendorId}`,
        {
          modelName,
          deliveryHub,
          fuelCapacity,
          selectedGearBox,
          seatNumber,
          mileage,
          selectedFuelType,
          description,
          rcNumber,
          rcImageDataUrl,
          carImageDataUrl,
          vendorId,
          selectedCarType,
          hourlyRentalRate,
          dailyRentalRate,
          monthlyRentalRate,
          carLocation, // Include car location (latitude and longitude)
        }
        // config
      );

      console.log("Car registered successfully:", response.data);
      resetForm();
      // alert("updated list")
      navigate(`/carsList/${vendorId}`);
    } catch (error) {
      console.error("Error registering car:", error.message);
    }
  };

  const resetForm = () => {
    setModelName("");
    setDeliveryHub("");
    setFuelCapacity("");
    setSeatNumber("");
    setMileage("");
    setSelectedFuelType("");
    setDescription("");
    setRcNumber("");
    setSelectedCarType("");
    setSelectedGearBox("");
    setRcImageDataUrl(null);
    setCarImageDataUrl(null);
    setCarLocation({ latitude: 12.971599, longitude: 77.594566 }); // Reset car location
  };

  console.log(carLocation);

  useEffect(() => {
    // mapboxgl.accessToken = "pk.eyJ1IjoiamVzdmluam9zZSIsImEiOiJjbG5ha2xmM3AwNWZ1MnFyc3pxczN3aW84In0.1vF_M9hKw9RecdOlyFar2A"; // Set Mapbox access token
    mapboxgl.accessToken = "pk.eyJ1IjoiamVzdmluam9zZSIsImEiOiJjbG9wcDAyZjUwYnhmMmtwZWpyaXIyODJ4In0.IElaQos2Dju7KqG0DLp8aw"; // Set Mapbox access token
    const map = new mapboxgl.Map({
      container: "map",
      // style: 'mapbox://styles/mapbox/streets-v11',
      style: "mapbox://styles/jesvinjose/cln9szz4n03hz01r4clrd2gx3",
      // style:"mapbox://styles/jesvinjose/cloppcklg00ib01nz83kvdfdn",
      center: [carLocation.longitude, carLocation.latitude],
      zoom: 12,
    });

    // Add a marker for the car's location
    new mapboxgl.Marker()
      .setLngLat([carLocation.longitude, carLocation.latitude])
      .addTo(map);

    // Event listener to update latitude and longitude on map click
    map.on("click", (e) => {
      const { lng, lat } = e.lngLat;
      setCarLocation({
        latitude: lat,
        longitude: lng,
      });
    });

    return () => {
      map.remove(); // Clean up the map on component unmount
    };
  }, [carLocation.longitude, carLocation.latitude]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <VendorHeader />
          <h2 className="text-2xl font-semibold text-gray-800 my-4 text-center">
            Car Register
          </h2>
          <form>
            <div className="row">
              <div className="col-md-6 mb-4">
                <label htmlFor="modelName" className="form-label">
                  Model Name
                </label>
                <input
                  type="text"
                  name="modelName"
                  placeholder="Model Name"
                  value={modelName}
                  onChange={handleModelNameChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="deliveryHub" className="form-label">
                  Delivery Hub
                </label>
                <input
                  type="text"
                  id="deliveryHub"
                  name="deliveryHub"
                  placeholder="Delivery Hub"
                  value={deliveryHub}
                  onChange={handleDeliveryHubChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="fuelCapacity" className="form-label">
                  Fuel Capacity
                </label>
                <input
                  type="number"
                  name="fuelCapacity"
                  placeholder="Fuel Capacity"
                  value={fuelCapacity}
                  onChange={handleFuelCapacityChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="seatNumber" className="form-label">
                  Seat Numbers
                </label>
                <input
                  type="number"
                  name="seatNumber"
                  placeholder="Seat Numbers"
                  value={seatNumber}
                  onChange={handleSeatNumberChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="mileage" className="form-label">
                  Mileage
                </label>
                <input
                  type="number"
                  name="mileage"
                  placeholder="Enter Mileage"
                  value={mileage}
                  onChange={handleMileageChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter Description"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="rcNumber" className="form-label">
                  RC Number
                </label>
                <input
                  type="text"
                  name="rcNumber"
                  placeholder="Enter RC Number"
                  value={rcNumber}
                  onChange={handleRcNumberChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="hourlyRentalRate" className="form-label">
                  Hourly Rental Rate
                </label>
                <input
                  type="number"
                  name="hourlyRentalRate"
                  placeholder="Enter Hourly Rental Rate"
                  value={hourlyRentalRate}
                  onChange={handleHourlyRentalRateChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="dailyRentalRate" className="form-label">
                  Daily Rental Rate
                </label>
                <input
                  type="number"
                  name="dailyRentalRate"
                  placeholder="Enter Daily Rental Rate"
                  value={dailyRentalRate}
                  onChange={handleDailyRentalRateChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="monthlyRentalRate" className="form-label">
                  Monthly Rental Rate
                </label>
                <input
                  type="number"
                  name="monthlyRentalRate"
                  placeholder="Enter Monthly Rental Rate"
                  value={monthlyRentalRate}
                  onChange={handleMonthlyRentalRateChange}
                  required
                  className="form-control"
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="gearBox" className="form-label">
                  GearBox Type
                </label>
                <select
                  id="gearBox"
                  name="gearBox"
                  value={selectedGearBox}
                  onChange={handleGearBoxChange}
                  className="form-select"
                >
                  <option value="" disabled>
                    Select GearBox Type
                  </option>
                  {gearTypes.map((gearType, index) => (
                    <option key={index} value={gearType}>
                      {gearType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="fuelType" className="form-label">
                  Fuel Type
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={selectedFuelType}
                  onChange={handleFuelTypeChange}
                  className="form-select"
                >
                  <option value="" disabled>
                    Select Fuel Type
                  </option>
                  {fuelTypes.map((fuelType, index) => (
                    <option key={index} value={fuelType}>
                      {fuelType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="carType" className="form-label">
                  Car Type
                </label>
                <select
                  id="carType"
                  name="carType"
                  value={selectedCarType}
                  onChange={handleCarTypeChange}
                  className="form-select"
                >
                  <option value="" disabled>
                    Select Car Type
                  </option>
                  {carTypes.map((carType, index) => (
                    <option key={index} value={carType}>
                      {carType}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-12 mb-4">
                <label htmlFor="rcImage" className="form-label">
                  RC Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="rcImage"
                  onChange={handleRcImageChange}
                  className="form-control"
                />
                {rcImageDataUrl && (
                  <div>
                    <p>Preview:</p>
                    <img
                      src={rcImageDataUrl}
                      alt="Preview"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                )}
              </div>

              <div className="col-md-12 mb-4">
                <label htmlFor="carImage" className="form-label">
                  Car Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="carImage"
                  onChange={handleCarImageChange}
                  className="form-control"
                />
                {carImageDataUrl && (
                  <div>
                    <p>Preview:</p>
                    <img
                      src={carImageDataUrl}
                      alt="Preview"
                      style={{ maxWidth: "100%" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 mb-4">
                <div
                  id="map"
                  className="map-container"
                  style={{
                    width: "100%",
                    height: "300px",
                    backgroundColor: "gray",
                  }}
                ></div>
              </div>
            </div>

            <div className="col-md-12 mb-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary w-100"
              >
                Register Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarRegister;
