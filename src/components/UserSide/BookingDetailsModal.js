import DayChangeEffect from "./DayChangeEffect";
import logo from "../../assets/logo-1.png";
import axiosInstance from "../../api/axiosInstance";


const BookingDetailsModal = ({
  selectedBookingDetails,
  closeModal,
  handleSubmit,
  otp,
  setOtp,
  numDays,
  setNumDays,
  handleChange,
  bookingId,
  carId,
  navigate,
  dailyRentalRate,
  calculateTotalAmount,
}) => {
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
    const bookingData = {
      pickupDate: pickupDate,
      returnDate: currentDate,
      userId: userId,
      Amount: calculateTotalAmount(),
    };
    try {
      await axiosInstance.put("/user/carbooking", {
        bookingId: bookingId,
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

  // Check if bookingDetails is defined and not empty
  if (!selectedBookingDetails || selectedBookingDetails.length === 0) {
    return null; // or you can display an error message
  }

  // Access booking details using an index (assuming bookingDetails is an array)
  const firstBookingDetail = selectedBookingDetails[0];
  const returnDate = new Date(firstBookingDetail.returnDate);
  const pickupDate = new Date(firstBookingDetail.pickupDate);
  const currentDate = new Date();
  const isTodayBetweenPickupAndReturn =
    currentDate >= pickupDate && currentDate < returnDate;
  const isTodayGreaterThanPickupAndLessThanOrEqualToReturn =
    currentDate > pickupDate && currentDate <= returnDate;
  const isTodayGreaterThanReturn = currentDate > returnDate;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {isTodayGreaterThanReturn && (
        <DayChangeEffect
          currentDate={currentDate}
          returnDate={returnDate}
          setNumDays={setNumDays}
        />
      )}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Booking Details
        </h2>
        <div className="flex flex-col md:flex-row justify-evenly">
          <p className="mb-4 md:mb-0">
            <strong>Car Image</strong>
            <img
              src={firstBookingDetail?.carImage}
              alt="Car"
              className="max-w-full max-h-48 md:max-h-100"
            />
          </p>
          <p>
            <strong>RC Image</strong>
            <img
              src={firstBookingDetail?.rcImage}
              alt="RC"
              className="max-w-full max-h-48 md:max-h-100"
            />
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly">
          {firstBookingDetail.bookingStatus === "booked" &&
          isTodayBetweenPickupAndReturn ? (
            <p>
              <strong>OTP to Start Trip:</strong>{" "}
              {firstBookingDetail?.startTripOtp}
            </p>
          ) : null}
          {firstBookingDetail.bookingStatus === "running" &&
          (isTodayGreaterThanPickupAndLessThanOrEqualToReturn ||
            numDays === 0) ? (
            <p>
              <strong>Enter OTP to End Trip:</strong>{" "}
              <input
                type="number"
                value={otp}
                onChange={handleChange}
                placeholder="Enter OTP"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit OTP
              </button>
            </p>
          ) : null}
          {isTodayGreaterThanReturn &&
          firstBookingDetail.bookingStatus === "running" &&
          numDays > 0 ? (
            <div>
              <h6>
                You have used {numDays} extra days, so please pay{" "}
                {calculateTotalAmount()} to end the trip
              </h6>
              <button className="btn btn-primary" onClick={displayRazorpay}>
                Pay Now
              </button>
            </div>
          ) : null}
          <p>
            <strong>RC Number:</strong> {firstBookingDetail?.rcNumber}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly">
          <p>
            <strong>Fuel Type:</strong> {firstBookingDetail?.fuelType}
          </p>
          <p>
            <strong>Fuel Capacity:</strong> {firstBookingDetail?.fuelCapacity}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly">
          <p>
            <strong>Delivery Hub:</strong> {firstBookingDetail?.deliveryHub}
          </p>
          <p>
            <strong>Daily Rental Rate:</strong>{" "}
            {firstBookingDetail?.dailyRentalRate}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-evenly">
          <p>
            <strong>Mileage:</strong> {firstBookingDetail?.mileage}
          </p>
          <p>
            <strong>Gear Box Type:</strong> {firstBookingDetail?.gearBoxType}
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="fixed top-4 right-4 px-2 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default BookingDetailsModal;
