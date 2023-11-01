import React from "react";

const BookingDetailsModalAdminSide = ({
  selectedBookingDetails,
  closeModal,
}) => {
  console.log(selectedBookingDetails, "inside modal");
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-8 shadow-lg w-full md:w-1/2 lg:w-1/3 border border-black mt-5 mb-5">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
          Booking Details
        </h2>
        <div className="flex flex-col md:flex-row justify-evenly">
          <div className="p-2">
            <strong>Car Image</strong>
            <img
              src={selectedBookingDetails[0]?.carImage}
              alt="Car Image"
              className="max-w-full max-h-100"
            />
          </div>
          <div className="p-2">
            <strong>RC Image</strong>
            <img
              src={selectedBookingDetails[0].rcImage}
              alt="RC Image"
              className="max-w-full max-h-100"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly">
          <div className="p-2">
            <strong>Vendor Adhar Front Image</strong>
            <img
              src={selectedBookingDetails[0]?.aadharFrontImage}
              alt="Vendor Aadhar Front Image"
              className="max-w-full max-h-100"
            />
          </div>
          <div className="p-2">
            <strong>Vendor Adhar Back Image</strong>
            <img
              src={selectedBookingDetails[0].aadharBackImage}
              alt="Vendor Aadhar Back Image"
              className="max-w-full max-h-100"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly">
          <p>
            <strong>Vendor Name:</strong> {selectedBookingDetails[0]?.firstName}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly">
          <p>
            <strong>Vendor Email Id:</strong>{" "}
            {selectedBookingDetails[0]?.emailId}
          </p>
          <p>
            <strong>Car Fuel Type:</strong>{" "}
            {selectedBookingDetails[0]?.fuelType}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly">
          <p>
            <strong>Car Fuel Capacity:</strong>{" "}
            {selectedBookingDetails[0]?.fuelCapacity}
          </p>
          <p>
            <strong>Daily Rental Rate:</strong>{" "}
            {selectedBookingDetails[0]?.dailyRentalRate}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-evenly">
          <p>
            <strong>Car Mileage:</strong> {selectedBookingDetails[0]?.mileage}
          </p>
          <p>
            <strong>Car Gear Box Type:</strong>{" "}
            {selectedBookingDetails[0]?.gearBoxType}
          </p>
        </div>
        <button
          onClick={closeModal}
          className="mt-4 md:mt-6 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingDetailsModalAdminSide;
