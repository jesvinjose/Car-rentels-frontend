import React, { useState } from "react";

const SearchBar = () => {
  // State variables to store form input values
  const [pickupPoint, setPickupPoint] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any actions here with the form input values
    console.log("Form submitted with values:");
    console.log("Pickup Point:", pickupPoint);
    console.log("Pickup Date:", pickupDate);
    console.log("Return Date:", returnDate);
    console.log("Return Time:", returnTime);
  };

  return (
    <>
      <div className="border border-black p-4 bg-lime-300 flex flex-col md:flex-row justify-center items-center">
        <input
          type="text"
          className="border border-black rounded-md mb-2 md:mr-2 md:mb-0"
          placeholder="Pickup Point"
          value={pickupPoint}
          onChange={(e) => setPickupPoint(e.target.value)}
          required
        />

        <input
          type="date"
          className="border border-black rounded-md mb-2 md:mr-2 md:mb-0"
          placeholder="Pickup Date"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          required
        />

        <input
          type="time"
          className="border border-black rounded-md mb-2 md:mr-2 md:mb-0"
          placeholder="Pickup Time"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          required
        />

        <input
          type="date"
          className="border border-black rounded-md mb-2 md:mr-2 md:mb-0"
          placeholder="Return Date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
        />

        <input
          type="time"
          className="border border-black rounded-md mb-2 md:mr-2 md:mb-0"
          placeholder="Return Time"
          value={returnTime}
          onChange={(e) => setReturnTime(e.target.value)}
          required
        />

        <button
          onClick={handleSubmit}
          className="bg-green-500 border border-black rounded-lg px-4 py-2 text-white hover:bg-green-600 cursor-pointer"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
