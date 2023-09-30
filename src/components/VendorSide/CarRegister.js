import React, { useState } from "react";
import axios from "axios";
import VendorHeader from "./VendorHeader";
import { useNavigate } from "react-router-dom";

const CarRegister = () => {
  const carTypes = ["Standard", "Economy", "Luxury"];
  const fuelTypes = ["Petrol", "Diesel"];
  const gearTypes = ["Manual", "Automatic"];
  const vendorId = localStorage.getItem("vendorId");
  const [deliveryHub, setDeliveryHub] = useState("");
  const [modelName, setModelName] = useState("");
  const [fuelCapacity, setFuelCapacity] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [mileage, setMileage] = useState("");
  const [description, setDescription] = useState("");
  const [rcNumber, setRcNumber] = useState("");

  const [rcImageDataUrl, setRcImageDataUrl] = useState(null);
  const [carImageDataUrl, setCarImageDataUrl] = useState(null);

  const [selectedCarType, setSelectedCarType] = useState("");
  const [selectedGearBox, setSelectedGearBox] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [hourlyRentalRate, setHourlyRentalRate] = useState("");
  const [dailyRentalRate, setDailyRentalRate] = useState("");
  const [monthlyRentalRate, setMonthlyRentalRate] = useState("");

  const navigate = useNavigate();

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
    // console.log(modelName,deliveryHub,description,fuelCapacity,fuelType,seatNumber,rcNumber,rcImageDataUrl,"etc");
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/vendor/registercar",
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
          monthlyRentalRate
        }
      );

      console.log("Car registered successfully:", response.data);
      resetForm();
      navigate("/carsList");
    } catch (error) {
      console.error("Error registering car:", error);
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
  };

  return (
    <div>
      <VendorHeader />
      <p>Car Register</p>
      <form>
        <input
          type="text"
          name="modelName"
          placeholder="Model Name"
          value={modelName}
          onChange={handleModelNameChange}
          required
        />
        <input
          type="text"
          name="deliveryHub"
          placeholder="Delivery Hub"
          value={deliveryHub}
          onChange={handleDeliveryHubChange}
          required
        />
        <input
          type="number"
          name="fuelCapacity"
          placeholder="Fuel Capacity"
          value={fuelCapacity}
          onChange={handleFuelCapacityChange}
          required
        />
        <input
          type="number"
          name="seatNumber"
          placeholder="Seat Numbers"
          value={seatNumber}
          onChange={handleSeatNumberChange}
          required
        />
        <input
          type="number"
          name="mileage"
          placeholder="Enter Mileage"
          value={mileage}
          onChange={handleMileageChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          value={description}
          onChange={handleDescriptionChange}
          required
        />
        <input
          type="text"
          name="rcNumber"
          placeholder="Enter RC Number"
          value={rcNumber}
          onChange={handleRcNumberChange}
          required
        />
        <input
          type="Number"
          name="hourlyRentalRate"
          placeholder="Enter Hourly RentalRate"
          value={hourlyRentalRate}
          onChange={handleHourlyRentalRateChange}
          required
        />
        <input
          type="Number"
          name="dailyRentalRate"
          placeholder="Enter Daily RentalRate"
          value={dailyRentalRate}
          onChange={handleDailyRentalRateChange}
          required
        />
        <input
          type="Number"
          name="monthlyRentalRate"
          placeholder="Enter Monthly RentalRate"
          value={monthlyRentalRate}
          onChange={handleMonthlyRentalRateChange}
          required
        />
        <label
          htmlFor="gearBox"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          GearBox Type
        </label>
        <select
          id="gearBox"
          name="gearBox"
          value={selectedGearBox}
          onChange={handleGearBoxChange}
          className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Select Gear Box Type"
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
        <label
          htmlFor="fuelType"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Fuel Type
        </label>
        <select
          id="fuelType"
          name="fuelType"
          value={selectedFuelType}
          onChange={handleFuelTypeChange}
          className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Select Gear Box Type"
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

        <div className="mb-4">
          <label
            htmlFor="carType"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Car Type
          </label>
          <select
            id="carType"
            name="carType"
            value={selectedCarType}
            onChange={handleCarTypeChange}
            className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Select Car Type"
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
        <label>RC Image</label>
        <div>
          <input
            type="file"
            accept="image/*"
            name="rcImage"
            onChange={handleRcImageChange}
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
        <label>Car Image</label>
        <div>
          <input
            type="file"
            accept="image/*"
            name="carImage"
            onChange={handleCarImageChange}
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

        <button type="button" onClick={handleSubmit}>
          Register Car
        </button>
      </form>
    </div>
  );
};

export default CarRegister;
