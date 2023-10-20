import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import axiosInstance from "../../api/axiosInstance";
import BookingDetailsModalAdminSide from "./BookingDetailsModalAdminSide";

const BookingsListAdminSide = () => {
  const [bookingData, setBookingData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedBookingDetails, setSelectedBookingDetails] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewBookingDetails = async (bookingid) => {
    console.log("inside handleViewBookingDetails");
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

  const adminToken = localStorage.getItem("adminToken");
  const adminEmailId = localStorage.getItem("adminEmailId");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminToken}`, // Set the token in the headers
        },
      };

      const response = await axiosInstance.get(
        `/admin/bookingslist/${adminEmailId}`,
        config
      );
      if (Array.isArray(response.data)) {
        setBookingData(response.data);
        console.log(bookingData);
        setError(null); // Clear any previous errors
      } else {
        setError("Invalid data received from the server");
      }
    } catch (error) {
      setError("Error fetching data: " + error.message);
    }
  };

  console.log(bookingData, "-------bookingData");

  return (
    <div>
      <AdminHeader />
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
        <BookingDetailsModalAdminSide
          selectedBookingDetails={selectedBookingDetails}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default BookingsListAdminSide;
