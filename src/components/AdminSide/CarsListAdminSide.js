import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axios from "axios";


const CarDetailsModal=({carDetails,closeModal,carsData,setCarsData})=>{

  const [vendorFirstName, setVendorFirstName] = useState("");

  useEffect(() => {
    const fetchVendorName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/admin/findVendorName/${carDetails[0].vendorId}`
        );
        if (response.data.firstName) {
          setVendorFirstName(response.data.firstName);
        }
      } catch (error) {
        console.error("Error fetching vendor name:", error);
      }
    };

    fetchVendorName();
  }, [carDetails]);

  const handleAccept=async(id)=>{
    console.log("carId:"+id);
    console.log("inside handle Accept");
    const res = await axios.put(`http://localhost:5000/admin/carrVerificationAccept/${id}`);
    console.log(res,"return response");
    if(res.data.message==="Car is Accepted"){
      // setUserData()
      const updatedCarData = carsData.map(car => {
        if (car._id === id) {
          return { ...car, verificationStatus: "Approved" };
        }
        return car;
      });
      setCarsData(updatedCarData);
      console.log("car is verified successfully by the admin");
    }
  }

  const handleReject=async(id)=>{
    console.log("carId:"+id);
    console.log("inside handle Reject");
    const res = await axios.put(`http://localhost:5000/admin/carrVerificationReject/${id}`);
    console.log(res,"return response");
    if(res.data.message==="Car is Rejected"){
      // setUserData()
      const updatedCarData = carsData.map(car => {
        if (car._id === id) {
          return { ...car, verificationStatus: "Rejected" };
        }
        return car;
      });
      setCarsData(updatedCarData);
      console.log("car is rejected successfully by the admin");
    }
  }




  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  ">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-1/2 border border-black ">
        <h2 className="text-xl font-semibold mb-4 text-center">User Details</h2>
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
            <strong>Hourly Rental Rate:</strong> {carDetails[0].hourlyRentalRate}
          </p>
          <p>
            <strong>Car Type:</strong> {carDetails[0].carTypeName}
          </p>
        </div>
        <div className="flex justify-around">
          <p>
            <strong>Monthly Rental Rate:</strong> {carDetails[0].monthlyRentalRate}
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
        </div>

        <div className="flex justify-evenly">
        <button
          onClick={()=>handleAccept(carDetails[0]._id)}
          className="mt-6 w-5/12 px-4 py-2 bg-green-600 text-white rounded hover:bg-indigo-700"
        >
          Accept
        </button>
        <button
          onClick={()=>handleReject(carDetails[0]._id)}
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
}

const CarsListAdminSide = () => {
  const [carsData, setCarsData] = useState([]);
  const [isModalOpen,setIsModalOpen]=useState(false);
  const [selectedCarDetails,setSelectedCarDetails]=useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/carslist")
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
  }, [carsData]);
  console.log(carsData);

  const handleBlock = async (id) => {
    const res = await axios.put(`http://localhost:5000/admin/carblock/${id}`);
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
    const resss = await axios.put(
      `http://localhost:5000/admin/carunblock/${id}`
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

    setIsModalOpen(true)
    console.log(id,"id in frontend");

    
    console.log("inside view Details before response");
    const fullCarDetails=carsData.filter((item)=>(item._id===id));
    setSelectedCarDetails(fullCarDetails);
    console.log(selectedCarDetails,"to Modal");
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
                    {carsData.map((car) => (
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
