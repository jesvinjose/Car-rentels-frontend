import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
// import axios from "axios";
import axiosInstanceforAdmin from "../../api/axiosInstanceforAdmin";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

mapboxgl.accessToken="pk.eyJ1IjoiamVzdmluam9zZSIsImEiOiJjbG5ha2xmM3AwNWZ1MnFyc3pxczN3aW84In0.1vF_M9hKw9RecdOlyFar2A"

const CarDetailsModal = ({ carDetails, closeModal, carsData, setCarsData }) => {
  const [vendorFirstName, setVendorFirstName] = useState("");
  const [vendorAdharFrontImage, setVendorAdharFrontImage] = useState("");
  const [vendorAdharBackImage, setVendorAdharBackImage] = useState("");
  // const adminToken=localStorage.getItem('adminToken');

  useEffect(() => {
    const fetchVendorNameAndAdhar = async () => {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${adminToken}`,  // Set the token in the headers
      //   }
      // };
      try {
        const response = await axiosInstanceforAdmin.get(
          `/admin/findVendorNameAndAdhar/${carDetails[0].vendorId}`
          // config
        );
        if (response.data.firstName) {
          setVendorFirstName(response.data.firstName);
        }
        if (response.data.aadharFrontImage) {
          setVendorAdharFrontImage(response.data.aadharFrontImage);
        }
        if (response.data.aadharBackImage) {
          setVendorAdharBackImage(response.data.aadharBackImage);
        }
      } catch (error) {
        console.error("Error fetching vendor name:", error);
      }
    };

    fetchVendorNameAndAdhar();
  }, [carDetails]);

  const handleAccept = async (id) => {
    console.log("carId:" + id);
    console.log("inside handle Accept");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
    //   },
    // };
    const res = await axiosInstanceforAdmin.put(
      `/admin/carrVerificationAccept/${id}`,
      null
      // config
    );
    console.log(res, "return response");
    if (res.data.message === "Car is Accepted") {
      // setUserData()
      const updatedCarData = carsData.map((car) => {
        if (car._id === id) {
          return { ...car, verificationStatus: "Approved" };
        }
        return car;
      });
      setCarsData(updatedCarData);
      console.log("car is verified successfully by the admin");
    }
  };

  const handleReject = async (id) => {
    console.log("carId:" + id);
    console.log("inside handle Reject");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
    //   },
    // };
    const res = await axiosInstanceforAdmin.put(
      `/admin/carrVerificationReject/${id}`,
      null
      // config
    );
    console.log(res, "return response");
    if (res.data.message === "Car is Rejected") {
      // setUserData()
      const updatedCarData = carsData.map((car) => {
        if (car._id === id) {
          return { ...car, verificationStatus: "Rejected" };
        }
        return car;
      });
      setCarsData(updatedCarData);
      console.log("car is rejected successfully by the admin");
    }
  };

  useEffect(() => {}, [carDetails]);

  useEffect(() => {
    // Check if carDetails and carDetails[0] exist and have carLocation
    if (carDetails && carDetails[0] && carDetails[0].carLocation) {
      const { longitude, latitude } = carDetails[0].carLocation;

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/jesvinjose/cln9szz4n03hz01r4clrd2gx3",
        center: [longitude, latitude],
        zoom: 12,
      });

      // Add a marker at the car's location
      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
    }
  }, [carDetails]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  ">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-1/2 border border-black ">
        <h2 className="text-xl font-semibold mb-4 text-center">Car Details</h2>
        <div
          id="map"
          className="map-container mb-4"
          style={{ width: "100%", height: "200px", backgroundColor: "gray" }}
        ></div>
        <div className="flex justify-around">
          <p>
            <strong>Model Name:</strong> {carDetails[0].modelName}
          </p>
          <p>
            <strong>Delivery Hub:</strong> {carDetails[0].deliveryHub}
          </p>
        </div>
        <div className="flex justify-around">
          <p>
            <strong>Fuel Capacity:</strong> {carDetails[0].fuelCapacity}
          </p>
          <p>
            <strong>Seat Numbers:</strong> {carDetails[0].seatNumber}
          </p>
        </div>
        <div className="flex justify-around">
          <p>
            <strong>Mileage:</strong> {carDetails[0].mileage}
          </p>
          <p>
            <strong>Gear Box Type:</strong> {carDetails[0].gearBoxType}
          </p>
        </div>
        <div className="flex justify-around">
          <p>
            <strong>Fuel Type:</strong> {carDetails[0].fuelType}
          </p>
          <p>
            <strong>Description:</strong> {carDetails[0].description}
          </p>
        </div>
        <div className="flex justify-around">
          <p>
            <strong>RC Number:</strong> {carDetails[0].rcNumber}
          </p>
          <p>
            <strong>Vendor Name:</strong> {vendorFirstName}
          </p>
        </div>
        <div className="flex justify-around">
          <p>
            <strong>Hourly Rental Rate:</strong>{" "}
            {carDetails[0].hourlyRentalRate}
          </p>
          <p>
            <strong>Car Type:</strong> {carDetails[0].carTypeName}
          </p>
        </div>
        <div className="flex justify-around">
          <p>
            <strong>Monthly Rental Rate:</strong>{" "}
            {carDetails[0].monthlyRentalRate}
          </p>
          <p>
            <strong>Daily Rental Rate:</strong> {carDetails[0].dailyRentalRate}
          </p>
        </div>
        <div className="flex justify-around">
          <p>
            <strong>RC Image</strong>
            <img
              src={carDetails[0].rcImage}
              alt="RC Preview"
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </p>
          <p>
            <strong>Car Image</strong>
            <img
              src={carDetails[0].carImage}
              alt="Car Preview"
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </p>
          <p>
            <strong>Adhar Front Image</strong>
            <img
              src={vendorAdharFrontImage}
              alt="AdharFrontImagePreview"
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </p>
          <p>
            <strong>Adhar Back Image</strong>
            <img
              src={vendorAdharBackImage}
              alt="AdharBackimagePreview"
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </p>
        </div>

        <div className="flex justify-evenly">
          <button
            onClick={() => handleAccept(carDetails[0]._id)}
            className="mt-6 w-5/12 px-4 py-2 bg-green-600 text-white rounded hover:bg-indigo-700"
          >
            Accept
          </button>
          <button
            onClick={() => handleReject(carDetails[0]._id)}
            className="mt-6 w-5/12 px-4 py-2 bg-red-600 text-white rounded hover:bg-indigo-700"
          >
            Reject
          </button>
        </div>

        <button
          onClick={closeModal}
          className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

const CarsListAdminSide = () => {
  const [carsData, setCarsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCarDetails, setSelectedCarDetails] = useState(null);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
    //   },
    // };
    axiosInstanceforAdmin
      .get("/admin/carslist")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCarsData(response.data);
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
  console.log(carsData);

  useEffect(() => {}, [carsData]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(carsData.length / itemsPerPage);

  const displayData = carsData.filter((item, index) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return index >= startIndex && index < endIndex;
  });

  const handleBlock = async (id) => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
    //   },
    // };
    const res = await axiosInstanceforAdmin.put(
      `/admin/carblock/${id}`,
      null,
      // config
    );
    // console.log(id);

    console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    if (res) {
      const updatedCar = carsData.map((i) =>
        i._id === id ? { ...i, blockStatus: true } : i
      );
      setCarsData(updatedCar);
    }
  };

  const handleUnblock = async (id) => {
    console.log(id, "");
    console.log("hellooooooooooooooooooooooo");
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${adminToken}`, // Set the token in the headers
    //   },
    // };
    const resss = await axiosInstanceforAdmin.put(
      `/admin/carunblock/${id}`,
      null,
      // config
    );
    console.log(id);

    // console.log(resss, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    if (resss) {
      const updatedCar = carsData.map((i) =>
        i._id === id ? { ...i, blockStatus: false } : i
      );
      setCarsData(updatedCar);
    }
  };

  const handleViewDetails = async (id) => {
    setIsModalOpen(true);
    console.log(id, "id in frontend");

    console.log("inside view Details before response");
    const fullCarDetails = carsData.filter((item) => item._id === id);
    setSelectedCarDetails(fullCarDetails);
    console.log(selectedCarDetails, "to Modal");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCarDetails(null);
  };

  return (
    <div>
      <AdminHeader />
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Cars
          </h2>
          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {carsData.length} cars
          </span>
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
                          <span>Model Name</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Verification Status</span>
                          <svg
                            className="h-3"
                            viewBox="0 0 10 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            {/* Your SVG icon here */}
                          </svg>
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Car Type
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Joining Date
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
                    {displayData.map((car) => (
                      <tr key={car._id} className="bg-white dark:bg-gray-900">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {car.modelName}
                        </td>
                        <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                          {car.verificationStatus}
                        </td>
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {car.carTypeName}
                        </td>
                        <td className="py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {new Date(car.createdAt).toLocaleString()}
                        </td>
                        <td className="pr-4 py-3 text-sm font-medium text-right">
                          <button
                            onClick={() => handleViewDetails(car._id)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
                          >
                            View Details
                          </button>
                          {car.blockStatus ? (
                            <button
                              onClick={() => handleUnblock(car._id)}
                              className="ml-2 text-green-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                            >
                              UnBlock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleBlock(car._id)}
                              className="ml-2 text-red-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                            >
                              Block
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <button
                    className="ml-5"
                    disabled={currentPage === 1}
                    onClick={handlePrevPage}
                  >
                    Prev
                  </button>
                  <button
                    className="ml-10"
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <CarDetailsModal
            carDetails={selectedCarDetails}
            closeModal={closeModal}
            carsData={carsData}
            setCarsData={setCarsData}
          />
        )}
      </section>
    </div>
  );
};

export default CarsListAdminSide;
