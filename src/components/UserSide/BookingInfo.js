import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import logo from "../../assets/logo-1.png";

import carseat from "../../assets/car-seat.png";
import gearbox from "../../assets/gearbox.png";
import gasstation from "../../assets/gas-station.png";
import mileage from "../../assets/mileage.png";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import polyline from "@mapbox/polyline";

const BookingInfo = () => {
  const [carDetails, setCarDetails] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const carId = searchParams.get("carId");
  const pickupDate = searchParams.get("pickupDate");
  const returnDate = searchParams.get("returnDate");
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("walletBalance")
  );

  const [distanceBtwUserandCar,setDistanceBtwUserandCar]=useState(0);

  const navigate = useNavigate();

  // Assume pickupDate and returnDate are available as props or state
  const [numDays, setNumDays] = useState(0); // Number of days between pickup and return
  const dailyRentalRate = carDetails.dailyRentalRate; // Daily rental rate for the car

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
    }
  };

  //new code
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


  useEffect(() => {
    console.log(carDetails,useLocation,"----------car and user");
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

  const isMobile = window.innerWidth <= 768; // Adjust the mobile breakpoint as needed
  const isTablet = window.innerWidth <= 1100; // Adjust the tablet breakpoint as needed

  const responsiveClassName = (
    defaultClass,
    mobileClass,
    tabletClass,
    desktopClass
  ) => {
    if (isTablet) {
      return tabletClass || defaultClass;
    }
    return isMobile ? mobileClass : desktopClass || defaultClass;
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center mt-10">
        <h1>Booking Information</h1>
      </div>
      <div
        className={responsiveClassName(
          "box-car",
          "",
          "box-car-tablet",
          "box-car-desktop"
        )}
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
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-6">
            <div
              id="map"
              className="map-container"
              style={{
                height: isMobile ? "400px" : isTablet ? "300px" : "400px",
                backgroundColor: "gray",
              }}
            ></div>
          </div>
          <div className="col-md-6">
            <div className="col-12 col-md-12">
              <img
                className=" m-auto border border-black rounded"
                src={carDetails.carImage}
                alt="carImage-preview"
              />
            </div>
          </div>
        </div>
        <div>Distance between user and car: {distanceBtwUserandCar} km</div>
        <div className="row mt-5">
          <div className="col-12 col-md-12">
            <div className="row">
              <div className="col-6">
                <div className="flex justify-evenly">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={carseat}
                    alt="carseat-preview"
                  />
                  <h5 className="ml-2 m-auto">
                    {carDetails.seatNumber} seater
                  </h5>
                </div>
              </div>
              <div className="col-6">
                <div className="flex justify-evenly">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={gearbox}
                    alt="gearbox-preview"
                  />
                  <h5 className="ml-2 m-auto">{carDetails.gearBoxType}</h5>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-6">
                <div className="flex justify-evenly">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={gasstation}
                    alt="gasstation-preview"
                  />
                  <h5 className="ml-2 m-auto">{carDetails.fuelType}</h5>
                </div>
              </div>
              <div className="col-6 ">
                <div className="flex justify-evenly">
                  <img
                    style={{ width: "50px", height: "50px" }}
                    src={mileage}
                    alt="mileage-preview"
                  />
                  <h5 className="ml-2 m-auto">{carDetails.mileage} km/litre</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container border mt-10 mb-10 flex justify-evenly">
        <div className="border mt-5 mb-5">
          <h1 className="text-center">Description</h1>
          <div className="row">
            <div className="">{carDetails.description}</div>
          </div>
        </div>
        <div className="border mt-5 mb-5">
          <h1 className="text-center">Amount Details</h1>
          <div className="flex justify-evenly">
            <div className="mr-10">Car Pickup Date: {pickupDate}</div>
            <div className="mr-10">Car Return Date: {returnDate}</div>
          </div>
          <div className="mt-3">Total Amount: {calculateTotalAmount()}</div>
        </div>
      </div>
      <div className="container flex justify-center mb-20">
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={displayRazorpay}
        >
          Pay Using Razorpay
        </button>
      </div>
    </div>
  );
};

export default BookingInfo;
