import React, { useState, useEffect } from "react";
import Header from "./Header";
import axiosInstance from "../../api/axiosInstance";
import BookingDetailsModal from "./BookingDetailsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";


const BookingHistory = () => {
  const [bookingData, setBookingData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState([]);
  const userId = localStorage.getItem("userId");
  const [otp, setOtp] = useState("");
  const [numDays, setNumDays] = useState(0);
  const [date, setDate] = useState(new Date());
  const [allData,setAllData]=useState([])
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const currentDate = new Date();
  const navigate = useNavigate();

  const usertoken = localStorage.getItem("token");

  const [error, setError] = useState(null);

  const bookingId =
    selectedBookingDetails.length > 0
      ? selectedBookingDetails[0].bookingId
      : null;
  console.log(bookingId, "-------bookingId");

  const carId =
    selectedBookingDetails.length > 0 ? selectedBookingDetails[0].carId : null;
  console.log(carId, "------carId");

  const dailyRentalRate =
    selectedBookingDetails.length > 0
      ? selectedBookingDetails[0].dailyRentalRate
      : null;
  console.log(dailyRentalRate, "------dailyRent");

  const handleSubmit = async () => {
    console.log("OTP submitted:", otp);
    const userId = localStorage.getItem("userId");
    let otpToBeChecked = otp;
    // console.log(carId,"------carId");
    // console.log(userId,"userId");
    // console.log(bookingId, "-----bookingId-");
    try {
      const response = await axiosInstance.post(
        `/user/check_vendor_and_end_trip`,
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
      } else if (response.data.message === "End trip OTP is wrong") {
        toast("End trip OTP is wrong");
      } else if (response.data.message === "Booking not found") {
        toast("Booking not found");
      } else {
        toast("Check your code");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`, // Set the token in the headers
        },
      };

      const response = await axiosInstance.get(
        `/user/bookingslist_user_side/${userId}`,
        config
      );
      if (Array.isArray(response.data)) {
        setBookingData(response.data);
        setAllData(response.data)
        setError(null);
      } else {
        setError("Invalid data received from the server");
      }
    } catch (error) {
      setError("Error fetching data: " + error.message);
    }
  };
  const handleCancel = async (id) => {
    console.log(id, "-----bookingId");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${usertoken}`, // Set the token in the headers
        },
      };
      const response = await axiosInstance.get(
        `/user/cancelbooking_user_side/${id}`,
        config
      );
      if (response.data.message === "Booking cancelled successfully") {
        console.log("Car cancelled successfully");
        // Fetch the updated car list after deletion
        fetchData();
      } else {
        console.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error in cancelling the booking:", error);
    }
  };

  const handleViewBookingDetails = async (bookingid) => {
    setIsModalOpen(true);
    // console.log("inside view Details before response", bookingData);
    const fullBookingDetails = bookingData?.filter((item) => {
      // console.log("item is ",item)
      if (item.bookingId === bookingid) return item;
    });
    console.log(fullBookingDetails);
    setSelectedBookingDetails(fullBookingDetails);
    console.log(selectedBookingDetails, "transferred to modal");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBookingDetails([]);
  };

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleAlert = () => {
    alert("Working");
  };

  const calculateTotalAmount = () => {
    return numDays * dailyRentalRate;
  };


  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = Math.ceil(allData.length / itemsPerPage);

  const displayData = allData.filter((item, index) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return index >= startIndex && index < endIndex;
  });

  return (
    <div>
      <Header />
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
                    {displayData.map((booking) => (
                      <tr
                        key={booking.bookingId}
                        className="bg-white dark:bg-gray-900"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {booking.modelName}
                        </td>
                        <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                          {booking.pickupDate}
                        </td>
                        <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                          {booking.returnDate}
                        </td>
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {booking.Amount}
                        </td>
                        <td className="pr-4 py-3 text-sm font-medium text-right">
                          {booking.bookingStatus}
                        </td>
                        <td className="pr-4 py-3 text-sm font-medium text-right">
                          <button
                            onClick={() =>
                              handleViewBookingDetails(booking.bookingId)
                            }
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
                          >
                            View Booking Details
                          </button>
                          {booking.bookingStatus === "booked" &&
                            new Date(booking.pickupDate) > new Date() && (
                              <button
                                onClick={() => handleCancel(booking.bookingId)}
                                className="ml-2 text-red-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                              >
                                Cancel
                              </button>
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                <button className="ml-5" disabled={currentPage==1} onClick={handlePrevPage}>
                    Prev
                  </button>
                  <button className="ml-10" disabled={currentPage==totalPages} onClick={handleNextPage}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <BookingDetailsModal
          selectedBookingDetails={selectedBookingDetails}
          closeModal={closeModal}
          handleAlert={handleAlert}
          handleSubmit={handleSubmit}
          otp={otp}
          setOtp={setOtp}
          numDays={numDays}
          setNumDays={setNumDays}
          handleChange={handleChange}
          bookingId={bookingId}
          carId={carId}
          navigate={navigate}
          dailyRentalRate={dailyRentalRate}
          calculateTotalAmount={calculateTotalAmount}
        />
      )}
    </div>
  );
};

export default BookingHistory;
