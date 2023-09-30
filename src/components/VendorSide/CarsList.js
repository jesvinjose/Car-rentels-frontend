import React, { useEffect, useState } from "react";
import axios from "axios";
import VendorHeader from "./VendorHeader";
import { Link } from "react-router-dom";

const EditCarModal = ({ carDataToEdit, closeModal, onCarUpdate }) => {
  const carTypes = ["Standard", "Economy", "Luxury"];
  const fuelTypes = ["Petrol", "Diesel"];
  const gearTypes = ["Manual", "Automatic"];
  const [carDataForm, setCarDataForm] = useState(carDataToEdit[0]);
  // console.log(carDataForm);
  const [rcImageDataUrl, setRcImageDataUrl] = useState(
    carDataToEdit[0].rcImage
  );
  const [carImageDataUrl, setCarImageDataUrl] = useState(
    carDataToEdit[0].carImage
  );

  const handleUpdate = async (event) => {
    event.preventDefault();
    // Append the image URLs to carDataForm

    if (rcImageDataUrl) {
      carDataForm.rcImage = rcImageDataUrl;
    }
    if (carImageDataUrl) {
      carDataForm.carImage = carImageDataUrl;
    }

    const updatedCarDataForm = {
      ...carDataForm,
    };

    console.log(updatedCarDataForm, "handle the update of carDataForm");
    try {
      // Send the updated car type data to your server using Axios or a similar HTTP library
      const response = await axios.put(
        `http://localhost:5000/vendor/carDataFormEdit/${carDataForm._id}`,
        updatedCarDataForm,
        {
          headers: {
            "Content-Type": "application/json", // Adjust the content type if needed
          },
        }
      );
      // console.log(response.data.message, "from editCarDetails to frontend");
      if (response.data.message === "Car updated successfully")
        // console.log("Car updated successfully!");
      onCarUpdate(updatedCarDataForm); // Notify the parent component of the update
      closeModal();
    } catch (error) {
      console.error("Error updating the car:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarDataForm((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleRcImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // console.log("inside rcimage file");
      handleFileChange(file, setRcImageDataUrl);
    } else {
      // console.log("ouside rcimage file");
    }
  };

  const handleCarImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // console.log("inside carimage file");
      handleFileChange(file, setCarImageDataUrl);
    } else {
      // console.log("ouside carimage file");
    }
  };

  const handleFileChange = (file, setImageDataUrl) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageDataUrl(reader.result);
      // console.log(reader.result, "image>>>>>");
    };

    if (file) {
      console.log("inside file");
      reader.readAsDataURL(file);
      // console.log(file, "filessssssssss");
    }
  };

  // console.log(carImageDataUrl, "---------carImage--------");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-md w-full overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Car Details</h2>
        <form>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block mb-2">
                <strong>Model:</strong>
              </label>
              <input
                type="text"
                name="modelName"
                value={carDataForm.modelName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label>
                <strong>Hub:</strong>
              </label>
              <input
                type="text"
                name="deliveryHub"
                value={carDataForm.deliveryHub}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label>
                <strong>Fuel Cap</strong>
              </label>

              <input
                type="Number"
                name="fuelCapacity"
                value={carDataForm.fuelCapacity}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label>
                <strong>Seat Nos</strong>
              </label>

              <input
                type="Number"
                name="seatNumber"
                value={carDataForm.seatNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label>
                <strong>Mileage</strong>
              </label>

              <input
                type="text"
                name="mileage"
                value={carDataForm.mileage}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label>
                <strong>Car Desc</strong>
              </label>

              <input
                type="text"
                name="description"
                value={carDataForm.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label>
                <strong>RC No</strong>
              </label>

              <input
                type="Number"
                name="rcNumber"
                value={carDataForm.rcNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label>
                <strong>Rate/Hour:</strong>
              </label>

              <input
                type="Number"
                name="hourlyRentalRate"
                value={carDataForm.hourlyRentalRate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label>
                <strong>Rate/Day:</strong>
              </label>
              <input
                type="Number"
                name="dailyRentalRate"
                value={carDataForm.dailyRentalRate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label>
                <strong>Rate/Month</strong>
              </label>
              <input
                type="Number"
                name="monthlyRentalRate"
                value={carDataForm.monthlyRentalRate}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label>
                <strong>GearType</strong>
              </label>
              <select
                id="gearBox"
                name="gearBox"
                value={carDataForm.gearBoxType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <div>
              <label>
                <strong>Fuel Type</strong>
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={carDataForm.fuelType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label
                htmlFor="carTypeName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Car Type
              </label>
              <select
                id="carTypeName"
                name="carTypeName"
                value={carDataForm.carTypeName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <div>
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
                      style={{ maxWidth: "25%" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
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
                      style={{ maxWidth: "25%" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            <button
              type="submit"
              onClick={handleUpdate}
              className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-indigo-700"
            >
              Update Car Type
            </button>
            <button
              onClick={closeModal}
              className="mt-3 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CarsList = () => {
  const [carData, setCarData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarData, setSelectedCarData] = useState(null);
  const vendorId=localStorage.getItem("vendorId")

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/vendor/carslist/${vendorId}`
      );
      if (Array.isArray(response.data)) {
        setCarData(response.data);
      } else {
        console.error("Invalid data received from the server:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditDetails = async (id) => {
    console.log("inside handleEditDetails");
    setIsModalOpen(true);
    const editCarData = carData.filter((item) => item._id === id);
    console.log(editCarData, "carData to edit");
    setSelectedCarData(editCarData);
    console.log(selectedCarData, "transferred to modal");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCarData(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/vendor/deletecar/${id}`
      );
      if (response.data.message === "car deleted successfully") {
        // console.log("Car deleted successfully");
        // Fetch the updated car list after deletion
        fetchData();
      } else {
        console.error("Failed to delete car");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleCarUpdate = (updatedCar) => {
    // Update carData with the updated car
    setCarData((prevCarData) =>
      prevCarData.map((car) => (car._id === updatedCar._id ? updatedCar : car))
    );
  };

  return (
    <div>
      <VendorHeader />
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Cars
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {carData.length} cars
          </span>
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            <Link to="/addnewcar">Add New Car</Link>
          </h2>
        </div>

        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Image</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Model</span>
                          <svg
                            className="h-3"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          ></svg>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Hourly Rental Rate
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pr-4 text-sm font-normal text-right text-gray-500 dark:text-gray-400"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                    {carData.map((car) => (
                      <tr key={car._id} className="bg-white dark:bg-gray-900">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {
                            <img
                              src={car.carImage}
                              alt="#"
                              // style={{ maxWidth: "100%" }}
                              className="w-32 h-32 object-cover"
                            ></img>
                          }
                        </td>
                        <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                          {car.modelName}
                        </td>
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {car.hourlyRentalRate}
                        </td>
                        <td className="pr-4 py-3 text-sm font-medium text-right">
                          <button
                            onClick={() => handleEditDetails(car._id)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
                          >
                            View And Edit Car Details
                          </button>
                          <button
                            onClick={() => handleDelete(car._id)}
                            className="ml-2 text-red-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <EditCarModal
          carDataToEdit={selectedCarData}
          closeModal={closeModal}
          carData={carData}
          onCarUpdate={handleCarUpdate}
        />
      )}
    </div>
  );
};

export default CarsList;
