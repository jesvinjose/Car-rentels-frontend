import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import VendorHeader from "./VendorHeader";
import axiosInstanceforVendor from "../../api/axiosInstanceforVendor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BookingDetailsModal = ({
  selectedBookingDetails,
  closeModal,
  bookingData,
  setBookingData,
  otpAvailable,
  setOtpAvailable,
  handleSubmit,
  handleChange,
  otp,
  setOtp,
  navigate

}) => {
  
  console.log(
    selectedBookingDetails,
    otpAvailable,
    ">>>>>>>>>y=userrrrrrrrrrrrrrrrrrrrrr>>>>>>>>>>>>.."
  );
  

  useEffect(() => {}, [selectedBookingDetails]);

  // Check if bookingDetails is defined and not empty
  if (!selectedBookingDetails || selectedBookingDetails.length === 0) {
    return null; // or you can display an error message
  }

  // Access booking details using an index (assuming bookingDetails is an array)
  const firstBookingDetail = selectedBookingDetails[0];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  ">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg w-1/2 ">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Booking Details
        </h2>
        <div className="flex justify-evenly">
          <p>
            <strong>Car Image</strong>
            <img
              // src={firstBookingDetail?.carImage}
              src={firstBookingDetail.car.carImage}
              alt="Aadhar Front Preview"
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </p>
          <p>
            <strong>RC Image</strong>
            <img
              src={firstBookingDetail.car.rcImage}
              alt="Aadhar Front Preview"
              style={{ maxWidth: "100%", maxHeight: "100px" }}
            />
          </p>
        </div>
        <div className="flex justify-evenly">
          {firstBookingDetail.bookingHistory[0]?.bookingStatus === "booked" &&
          otpAvailable ? (
            <p>
              <strong>Enter OTP to Start Trip:</strong>{" "}
              <input
                type="number"
                value={otp}
                onChange={handleChange}
                placeholder="Enter OTP"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit OTP
              </button>
            </p>
          ) : null}
          {firstBookingDetail.bookingHistory[0]?.bookingStatus === "running" ? (
            <p>
              <strong>OTP to End Trip:</strong>
              {firstBookingDetail.endTripOtp}
            </p>
          ) : null}
          {console.log("After condition check")}
          <p>
            <strong>RC Number:</strong> {firstBookingDetail.car.rcNumber}
          </p>
        </div>
        <div className="flex justify-evenly">
          <p>
            <strong>Fuel Type:</strong> {firstBookingDetail.car.fuelType}
          </p>
          <p>
            <strong>Fuel Capacity:</strong>{" "}
            {firstBookingDetail.car.fuelCapacity}
          </p>
        </div>
        <div className="flex justify-evenly">
          <p>
            <strong>Delivery Hub:</strong> {firstBookingDetail.car.deliveryHub}
          </p>
          <p>
            <strong>Daily Rental Rate:</strong>{" "}
            {firstBookingDetail.car.dailyRentalRate}
          </p>
        </div>
        <div className="flex justify-evenly">
          <p>
            <strong>Mileage:</strong> {firstBookingDetail.car.mileage}
          </p>
          <p>
            <strong>Gear Box Type:</strong> {firstBookingDetail.car.gearBoxType}
          </p>
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

const BookingsList = () => {
  const [bookingData, setBookingData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
  const [otpAvailable, setOtpAvailable] = useState(false);
  const vendorId = localStorage.getItem("vendorId");
  const [date,setDate]=useState(new Date())
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const vendorToken = localStorage.getItem("vendorToken");

  const firstBookingDetail = selectedBookingDetails ? selectedBookingDetails[0] : null;
  const [error, setError] = useState(null);

  
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async () => {
    // Handle OTP submission logic here
    console.log("OTP submitted:", otp);
    let otpToBeChecked = otp;
    let bookingId = firstBookingDetail._id;
    let carId = firstBookingDetail.carId;
    let userId = firstBookingDetail.bookingHistory[0].userId;
    console.log(userId, "00userId");
    console.log(bookingId, "-----bookingId-");
    try {
      const response = await axiosInstanceforVendor.post(
        `/vendor/check_user_and_deliver_vehicle`,
        {
          otpToBeChecked,
          bookingId,
          carId,
          userId,
        }
      );
      if (
        response.data.message ===
        "Car, booking history, and booking details updated"
      ) {
        toast("car, booking history and booking details updated");
        setDate(new Date());
        navigate("/bookingslist");
      } else if (response.data.message === "Start trip Otp is wrong") {
        toast("Start trip Otp is wrong");
      } else if (response.data.message === "Booking not found") {
        toast("Booking not found");
      } else {
        toast("Check your code");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // Reset the OTP input field
    setOtp("");
  };

  useEffect(() => {

    fetchData();
  }, [date]);

      const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${vendorToken}`, // Set the token in the headers
          },
        };
  
        const response = await axios.get(
          ` http://localhost:5000/vendor/bookingslist/${vendorId}`,
          config
        );
        if (Array.isArray(response.data)) {
          setBookingData(response.data);
          setError(null); // Clear any previous errors
        } else {
          setError("Invalid data received from the server");
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      }
    };






  const handleCancel = async (id) => {
    // console.log(id, "-----bookingId");
    try {
      // const config = {
      //   headers: {
      //     Authorization: `Bearer ${vendortoken}`, // Set the token in the headers
      //   },
      // };
      const response = await axiosInstanceforVendor.get(
        `/vendor/cancelbooking/${id}`,
        // config
      );
      if (response.data.message === "Booking cancelled successfully") {
        console.log("Car cancelled successfully");
        // Fetch the updated car list after deletion
        setDate(new Date());
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error in cancelling the booking:", error);
    }
  };

  const handleViewBookingDetails = async (
    bookingid,
    userpickupDate,
    userreturnDate
  ) => {
    console.log(bookingid, "--------bookingid----------");
    const pickupDate = new Date(userpickupDate);
    const returnDate = new Date(userreturnDate);
    const currentDate = new Date();

    if (currentDate >= pickupDate && currentDate <= returnDate) {
      console.log("Current date is within the pickup and return date range.");
      setOtpAvailable(true);
    } else {
      console.log("Current date is outside the pickup and return date range.");
      setOtpAvailable(false);
    }
    console.log(currentDate, pickupDate, returnDate, "-----isTodayBtw");

    setIsModalOpen(true);
    // console.log("inside view Details before response", bookingData);
    const fullBookingDetails = bookingData?.filter((item) => {
      // console.log("item is ",item)
      if (item._id === bookingid) return item;
    });
    console.log(fullBookingDetails, "fullBookingDetails");
    setSelectedBookingDetails(fullBookingDetails);
    console.log(selectedBookingDetails, "transferred to modal");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookingDetails(null);
  };

  return (
    <div>
      <VendorHeader />
      <ToastContainer />
      <section className="container px-4 mx-auto">
        <div className="flex items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Bookings
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {bookingData.length} bookings
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
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Model</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Trip Start Date</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <div className="flex items-center gap-x-3">
                          <span>Trip End Date</span>
                        </div>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 pr-4 text-sm font-normal text-right text-gray-500 dark:text-gray-400"
                      >
                        Booking Status
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
                    {bookingData.map((booking) => (
                      <tr
                        key={booking._id}
                        className="bg-white dark:bg-gray-900"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {booking.car.modelName}
                        </td>
                        <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                          {booking.bookingHistory[0].pickupDate}
                        </td>
                        <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                          {booking.bookingHistory[0].returnDate}
                        </td>
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {booking.bookingHistory[0].Amount}
                        </td>
                        <td className="pr-4 py-3 text-sm font-medium text-right">
                          {booking.bookingHistory[0].bookingStatus}
                        </td>
                        <td className="pr-4 py-3 text-sm font-medium text-right">
                          <button
                            onClick={() =>
                              handleViewBookingDetails(
                                booking._id,
                                booking.bookingHistory[0].pickupDate,
                                booking.bookingHistory[0].returnDate
                              )
                            }
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
                          >
                            View Booking Details
                          </button>

                          {booking.bookingHistory[0].bookingStatus ===
                            "booked" &&
                            new Date(booking.bookingHistory[0].pickupDate) >
                              new Date() && (
                              <button
                                onClick={() => handleCancel(booking._id)}
                                className="ml-2 text-red-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                              >
                                Cancel
                              </button>
                            )}
                            {["booked", "running"].includes(
                              booking.bookingHistory[0].bookingStatus
                            ) && (
                              <Link

                                to={`/chat_with_user/${booking._id}/${booking.bookingHistory[0].userId}/${booking.vendorId}`}
                                
                                className="ml-2 text-green-500 hover:text-green-900 dark:text-green-400 dark:hover:text-green-600"
                              >
                                Chat with User
                              </Link>
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
      </section>
      {isModalOpen && selectedBookingDetails && (
        <BookingDetailsModal
          selectedBookingDetails={selectedBookingDetails}
          closeModal={closeModal}
          bookingData={bookingData}
          setBookingData={setBookingData}
          otpAvailable={otpAvailable}
          setOtpAvailable={setOtpAvailable}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          otp={otp}
          setOtp={setOtp}
          navigate={navigate}
        />
      )}
    </div>
  );
};

export default BookingsList;
