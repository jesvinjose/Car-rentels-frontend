import React from "react";
import { Link } from "react-router-dom";

const BookingSuccessPage = () => {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Booking Successful!</h1>
      <p className="text-lg mb-6">Thank you for booking the car.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/usershome">Back to Home</Link>
      </button>
    </div>
  );
};

export default BookingSuccessPage;
