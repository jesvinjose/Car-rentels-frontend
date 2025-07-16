import React, { useState } from "react";

const SearchBar = ({ handleSubmit }) => {
  const today = new Date().toISOString().split("T")[0];
  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState(today);
  // const [searchInitiated, setSearchInitiated] = useState(false);
  // const [availableCars, setAvailableCars] = useState([]);
  // const navigate = useNavigate();

  const handlePickupDateChange = (e) => {
    const selectedDate = e.target.value;
    setPickupDate(selectedDate);

    // Set return date to be at least the pickup date
    const minReturnDate = new Date(selectedDate);
    minReturnDate.setDate(minReturnDate.getDate());
    setReturnDate(minReturnDate.toISOString().split("T")[0]);
  };

  return (
    <>
      <div className="border border-black p-4 bg-red-400 flex flex-col md:flex-row justify-center items-center mt-3">
        <label>Pickup Date:</label>
        <input
          type="date"
          className="border border-black rounded-lg mb-2 md:mr-2 md:mb-0 px-4 py-2"
          placeholder="Pickup Date"
          value={pickupDate}
          onChange={handlePickupDateChange}
          min={today} // Set min to today's date
          required
        />

        <label className="mt-2 md:mt-0">Return Date: </label>
        <input
          type="date"
          className="border border-black rounded-lg mb-2 md:mr-2 md:mb-0 px-4 py-2"
          placeholder="Return Date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          min={pickupDate} // Set min to the return date
          required
        />

        <button
          onClick={() => handleSubmit(pickupDate, returnDate)}
          className="bg-green-500 border border-black rounded-lg px-4 py-2 mb-2 mt-2 md:mt-0 md:ml-4 text-white hover:bg-green-600 cursor-pointer"
        >
          Search
        </button>
      </div>
    </>
  );
};

export default SearchBar;
