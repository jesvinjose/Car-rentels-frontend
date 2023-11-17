import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SeachBar";
import carseat from "../../assets/car-seat.png";
import gearbox from "../../assets/gearbox.png";
import gasstation from "../../assets/gas-station.png";
import mileage from "../../assets/mileage.png";
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo-1.png";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import polyline from "@mapbox/polyline";

const CarDetails = () => {
  const [carDetails, setCarDetails] = useState([]);
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
  );
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const carId = searchParams.get("carId");
  const navigate = useNavigate();
  // Assume pickupDate and returnDate are available as props or state
  const [numDays, setNumDays] = useState(0); // Number of days between pickup and return
  const dailyRentalRate = carDetails.dailyRentalRate; // Daily rental rate for the car


  const handlePickupDateChange = (e) => {
    const selectedDate = e.target.value;
    setPickupDate(selectedDate);

    // Calculate the minimum return date (one day after pickup date)
    const minReturnDate = new Date(selectedDate);
    minReturnDate.setDate(minReturnDate.getDate() + 1);

    // Set the return date to the minimum return date
    setReturnDate(minReturnDate.toISOString().split("T")[0]);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const secondDay = new Date(today);
  secondDay.setDate(today.getDate() + 2);
  const nextDay = secondDay.toISOString().split("T")[0];

  const [pickupDate, setPickupDate] = useState(
    tomorrow.toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(nextDay);

  const [searchInitiated, setSearchInitiated] = useState(false);
  const [availableCar, setAvailableCar] = useState(false);
  const [distanceBtwUserandCar,setDistanceBtwUserandCar]=useState(0);

  useEffect(() => {}, [searchInitiated]);

  useEffect(() => {
    // Calculate the number of days between pickup and return
    const pickupDateObj = new Date(pickupDate);
    const returnDateObj = new Date(returnDate);
    const differenceInTime = returnDateObj - pickupDateObj;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    setNumDays(differenceInDays);
  }, [pickupDate, returnDate]);

  const calculateTotalAmount = () => {
    return numDays * dailyRentalRate;
  };

  const [userLocation, setUserLocation] = useState(null);
  useEffect(() => {
    // Get user's location using Geolocation API
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("inside position");
          const { latitude, longitude } = position.coords;
          console.log(latitude, "-----------latitude");
          console.log(longitude, "----------longitude");
          setUserLocation({ userLongitude: longitude, userLatitude: latitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    };
    // Call the function to get user's location
    getUserLocation();
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const token = localStorage.getItem("token");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axiosInstance.post("/payment/orders", {
      amount: calculateTotalAmount(), // Pass the correct amount dynamically
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_66NjKXg25GaxAP", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "car--rentals",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        try {
          // Call handleBooking with the necessary data
          await handleBooking(carId, data);
        } catch (error) {
          console.error("Error while handling booking:", error);
        }

        const result = await axiosInstance.post("/payment/success", data);
        if (result)
          // alert(result.data.msg);
          navigate("/booking_success");
      },
      prefill: {
        name: "Jesvin Jose",
        email: "jj4jesvinjose@gmail.com",
        contact: "7592097252",
      },
      notes: {
        address: "Car Rentals Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const handleBooking = async (carId, paymentData) => {
    const userId = localStorage.getItem("userId");
    // const pickupDateObj = new Date(pickupDate);
    // const returnDateObj = new Date(returnDate);
    const bookingData = {
      pickupDate: pickupDate,
      returnDate: returnDate,
      userId: userId,
      // Amount: (returnDateObj - pickupDateObj) / (1000 * 60 * 60 * 24), // Calculate the difference in days
      Amount: calculateTotalAmount(),
    };
    try {
      await axiosInstance.post("/user/carbooking", {
        carId: carId,
        bookingData: bookingData,
        paymentData: paymentData, // Pass the paymentData to the API call
      });

      // Additional handling after successful booking
      // ...
    } catch (error) {
      console.log("Error during booking:", error);
      navigate("/404");
    }
  };

  // Function to calculate the minimum return date (one day after pickup date)
  const getMinReturnDate = () => {
    const minReturnDate = new Date(pickupDate);
    minReturnDate.setDate(minReturnDate.getDate() + 1); // Set to one day after pickup date
    return minReturnDate.toISOString().split("T")[0];
  };

  const handleSubmit = async (pickupDate, returnDate, carId) => {
    console.log(pickupDate, "pickupDate+++", carId);
    console.log(typeof pickupDate);
    setSearchInitiated(true); // Set search initiated flag to true
    try {
      console.log(pickupDate, returnDate, "inside handleSubmit");
      // Send a POST request to the server to get available cars
      // const response = await axios.post(
      //   "http://localhost:5000/user/check_car_availability",
      //   {
      //     pickupDate,
      //     returnDate,
      //     carId,
      //   }
      // );
      const response = await axiosInstance.post(
        "/user/check_car_availability",
        {
          pickupDate,
          returnDate,
          carId,
        }
      );
      if (
        response.data.message ===
        "Car is not available for the specified date range"
      ) {
        console.log("cars is not available in this date range");
        toast("Car is not available for the specified date range");
      } else if (
        response.data.message ===
        "Car is available for the specified date range"
      ) {
        setAvailableCar(true);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    // Make API request to fetch carDetails based on the carId
    const fetchCarDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `/user/car_details?carId=${carId}`
        );
        setCarDetails(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (carId) {
      fetchCarDetails();
    }
  }, []);

  // useEffect(() => {
  //   if (carDetails && carDetails.carLocation) {
  //     const { longitude, latitude } = carDetails.carLocation;

  //     const map = new mapboxgl.Map({
  //       container: "map",
  //       style: "mapbox://styles/jesvinjose/cln9szz4n03hz01r4clrd2gx3",
  //       // style: "mapbox://styles/jesvinjose/cloppcklg00ib01nz83kvdfdn",
  //       center: [longitude, latitude],
  //       zoom: 12,
  //     });

  //     // Add a marker at the car's location
  //     new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
  //   }
  // }, [carDetails]);
  // console.log(carDetails, "---------here is the carDetails");

  useEffect(() => {
    console.log(carDetails,userLocation,"----------car and user");
    if (carDetails && carDetails.carLocation && userLocation) {
      const { longitude: carLongitude, latitude: carLatitude } =
        carDetails.carLocation;
      const { userLongitude, userLatitude } = userLocation;

      // Create a new map
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/jesvinjose/cln9szz4n03hz01r4clrd2gx3",
        center: [userLongitude, userLatitude],
        zoom: 12,
      });

      // Add a marker at the car's location
      new mapboxgl.Marker().setLngLat([carLongitude, carLatitude]).addTo(map);

      // Add a marker at the user's location
      new mapboxgl.Marker({ color: "green" })
        .setLngLat([userLongitude, userLatitude])
        .addTo(map);

      // Use Mapbox Directions API to get the driving route
      const getDirections = async () => {
        try {
          const response = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${userLongitude},${userLatitude};${carLongitude},${carLatitude}`,
            {
              params: {
                access_token:
                  "pk.eyJ1IjoiamVzdmluam9zZSIsImEiOiJjbG5ha2xmM3AwNWZ1MnFyc3pxczN3aW84In0.1vF_M9hKw9RecdOlyFar2A", // Replace with your Mapbox access token
              },
            }
          );

          const routeEncoded = response.data.routes[0].geometry;

          // Decode the polyline string to get the coordinates
          const routeCoordinates = polyline
            .decode(routeEncoded)
            .map((pair) => pair.reverse());

          // Add a line layer to represent the route
          map.on("load", () => {
            map.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "LineString",
                    coordinates: routeCoordinates,
                  },
                },
              },
              layout: {
                "line-join": "round",
                "line-cap": "round",
              },
              paint: {
                "line-color": "blue",
                "line-width": 2,
              },
            });
          });
        } catch (error) {
          console.error("Error fetching directions:", error);
        }
      };

      // Call the function to get directions
      getDirections();

      const directionsRequest = `https://api.mapbox.com/directions/v5/mapbox/driving/${userLongitude},${userLatitude};${carLongitude},${carLatitude}?access_token=pk.eyJ1IjoiamVzdmluam9zZSIsImEiOiJjbG5ha2xmM3AwNWZ1MnFyc3pxczN3aW84In0.1vF_M9hKw9RecdOlyFar2A`;

      fetch(directionsRequest)
        .then((response) => response.json())
        .then((data) => {
          const route = data.routes[0];
          const distanceInKm = route.distance / 1000; // Distance in kilometers
          console.log("Distance between user and car:", distanceInKm, "km");
          const formattedDistance = distanceInKm.toFixed(2);
          setDistanceBtwUserandCar(formattedDistance)
        })
        .catch((error) => {
          console.error("Error fetching directions:", error);
        });
    }

  }, [carDetails, userLocation]);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="text-center">
          <h1>Car Details</h1>
        </div>
        <ToastContainer />

        <div
          className="box-car"
          style={{
            boxShadow: "0px 0px 10px 1px rgb(185, 179, 179)",
            padding: "",
          }}
        >
          <div className="row mt-3">
            <div className="col-md-4 text-center">
              <h3>Model: {carDetails.modelName}</h3>
            </div>
            <div className="col-md-4 text-center">
              <h3>Delivery at Hub: {carDetails.deliveryHub}</h3>
            </div>
            <div className="col-md-4 text-center">
              <h3>Fuel Capacity: {carDetails.fuelCapacity} L</h3>
            </div>
          </div>
        </div>

        <div className="row mt-5 flex">
          <div className="col-12 col-md-6 mt-5">
            <img
              className="m-auto border border-black rounded img-fluid"
              src={carDetails.carImage}
              alt="car-imagePreview"
            />
          </div>
          <div className="col-12 col-md-6 mt-1">
            <div className="row">
              <div className="col-6 col-md-6 text-center">
                <label>Pickup Date:</label>
                <br></br>
                <input
                  type="date"
                  className="border border-black rounded-lg mb-2 md:mr-2 md:mb-0 px-2 py-1"
                  placeholder="Pickup Date"
                  value={pickupDate}
                  onChange={handlePickupDateChange}
                  min={tomorrow.toISOString().split("T")[0]} // Set min to tomorrow's date in ISO format
                  required
                />
              </div>
              <div className="col-6 col-md-6 text-center">
                <label>Return Date: </label>
                <br></br>
                <input
                  type="date"
                  className="border border-black rounded-lg mb-2 md:mr-2 md:mb-0 px-2 py-1"
                  placeholder="Return Date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={getMinReturnDate()} // Set min to the calculated minimum return date
                  required
                />
              </div>
            </div>

            <div className="flex flex-col items-center mt-3 mb-3">
              <button
                onClick={() =>
                  handleSubmit(pickupDate, returnDate, carDetails._id)
                }
                className="btn btn-success px-4"
              >
                Search
              </button>
            </div>

            <div className="row mt-5">
              <div className="row">
                <div className="col-6 flex">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={carseat}
                    alt="Car Seat"
                  />
                  <h5 className="ml-2 m-auto">
                    {carDetails.seatNumber} seater
                  </h5>
                </div>
                <div className="col-6 flex">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={gearbox}
                    alt="Gearbox"
                  />
                  <h5 className="ml-2 m-auto">{carDetails.gearBoxType}</h5>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-6 flex">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={gasstation}
                    alt="Gas Station"
                  />
                  <h5 className="ml-2 m-auto">{carDetails.fuelType}</h5>
                </div>
                <div className="col-6 flex">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={mileage}
                    alt="Mileage"
                  />
                  <h5 className="ml-2 m-auto">{carDetails.mileage} km/litre</h5>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4"></div>
      </div>

      <div className="container border mt-10 mb-10">
        <h1 className="">Description</h1>
        <div className="row">
          <div className="col-12">{carDetails.description}</div>
        </div>
      </div>
      {availableCar && token ? (
        <div className="container justify-items-start mb-20">
          <div className="border mt-5 mb-5">
            <h1>Amount Details</h1>
            <div className="flex flex-col md:flex-row justify-start">
              <div className="mr-3">Car Pickup Date: {pickupDate}</div>
              <div className="mr-3">Car Return Date: {returnDate}</div>
            </div>
            <div className="mt-3">Total Amount: {calculateTotalAmount()}</div>
          </div>
          <button
            className="btn btn-primary"
            style={{ borderRadius: "5px", cursor: "pointer" }}
            onClick={displayRazorpay}
          >
            Book Now
          </button>
        </div>
      ) : (
        <div className="container justify-items-start mb-20">
          <div className="border mt-5 mb-5">
            <h1>Amount Details</h1>
            <div className="flex flex-col md:flex-row justify-start">
              <div className="mr-3">Car Pickup Date: {pickupDate}</div>
              <div className="mr-3">Car Return Date: {returnDate}</div>
            </div>
            <div className="mt-3">Total Amount: {calculateTotalAmount()}</div>
          </div>
          {!token && (
            <div>
              <h1 className="text-center">Log in to the Account for Booking</h1>
            </div>
          )}
        </div>
      )}

      <div className="px-5">
        <h4 className="mb-5">Car Location</h4>
        <div
          id="map"
          className="col-12 col-md-6 map-container mb-4 border"
          style={{ height: "400px", backgroundColor: "gray", width: "100%" }}
        ></div>
        <div>Distance between user and car: {distanceBtwUserandCar} km</div>
      </div>
    </div>
  );
};

export default CarDetails;
