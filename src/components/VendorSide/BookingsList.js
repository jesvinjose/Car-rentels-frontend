import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import VendorHeader from './VendorHeader';
import axiosInstance from '../../api/axiosInstance' 

const BookingsList = () => {
    const [bookingData,setBookingData]=useState([]);
    const vendorId=localStorage.getItem('vendorId')

      const vendortoken=localStorage.getItem('vendorToken')

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${vendortoken}`  // Set the token in the headers
        }
      };

      const response = await axiosInstance.get(
        `/vendor/bookingslist/${vendorId}`,config
      );
      if (Array.isArray(response.data)) {
        setBookingData(response.data);
      } else {
        console.error("Invalid data received from the server:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
        <VendorHeader/>
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
                        </button>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-2">
                          <span>Verification Status</span>
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
                    {bookingData.map((booking) => (
                      <tr key={booking._id} className="bg-white dark:bg-gray-900">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                          {
                            <h1>{booking.carId}</h1>
                          }
                        </td>
                        <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                          {booking.bookingHistory[0].pickupDate}
                        </td>
                        <td className="px-12 py-3 text-sm text-green-500 dark:text-green-400 whitespace-nowrap">
                        {booking.bookingHistory[0].returnDate}
                        </td>
                        <td className="py-3 text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {booking.bookingHistory[0].bookingStatus}
                        </td>
                        <td className="pr-4 py-3 text-sm font-medium text-right">
                          {/* <button
                            // onClick={() => handleEditDetails(car._id)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-600"
                          >
                            View And Edit Car Details
                          </button>
                          <button
                            // onClick={() => handleDelete(car._id)}
                            className="ml-2 text-red-500 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                          >
                            Delete
                          </button> */}
                          {booking.bookingHistory[0].Amount}
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
    </div>
  )
}

export default BookingsList
