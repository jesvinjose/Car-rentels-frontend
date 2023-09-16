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
   {/* <div className='bg-red-500 flex flex-row'>
    <div className="bg-green-500" >
      <form onSubmit={handleSubmit} className="form-inline flex flex-row items-center justify-center">
        <div className="form-group items-center flex flex-row justify-center">
          <input
            type="text"
            className="form-control"
            placeholder="Pickup Point"
            value={pickupPoint}
            onChange={(e) => setPickupPoint(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            placeholder="Pickup Date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="time"
            className="form-control"
            placeholder="Pickup Time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            placeholder="Return Date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="time"
            className="form-control"
            placeholder="Return Time"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
    </div>
    </div> */}
    <div className="border border-black w-full h-20 bg-lime-300">
      <div className="flex mt-6 ml-2 justify-center items-center ">
        <div>
        <input
            type="text"
            className=" border border-black rounded-md"
            placeholder="Pickup Point"
            value={pickupPoint}
            onChange={(e) => setPickupPoint(e.target.value)}
            required
          />
        </div>

        <div className="ml-2">
        <input
            type="date"
            className="border border-black rounded-md"
            placeholder="Pickup Date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
        </div>

        <div className="ml-2">
          <input
            type="time"
            className="border border-black rounded-md"
            placeholder="Pickup Time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            required
          />
        </div>
        

        <div className="ml-2">
          <input
            type="date"
            className="form-control border border-black rounded-md"
            placeholder="Return Date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </div>

        <div className="ml-2">
          <input
            type="time"
            className="form-control border border-black rounded-md"
            placeholder="Return Time"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            required
          />
        </div>

        <div className="ml-2">
          <button className="bg-green-500 border border-black rounded-lg w-20 text-white hover:bg-green-600 cursor-pointer">Search</button>
        </div>


      </div>

    </div>
    </>
  );
};

export default SearchBar;
