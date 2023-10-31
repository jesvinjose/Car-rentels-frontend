import React, { useEffect, useState } from "react";
import VendorHeader from "./VendorHeader";
import axiosInstanceforVendor from "../../api/axiosInstanceforVendor";
import BookingsChartVendorSide from "./BookingsChartVendorSide";
import EarningsChartVendorSide from "./EarningsChartVendorSide";

const VenderDashBoard = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalBookingsThisWeek, setTotalBookingsThisWeek] = useState(0);
  const [totalEarningsThisWeek, setTotalEarningsThisWeek] = useState(0);
  const vendorId = localStorage.getItem("vendorId");

  // State to store chart data
  const [chartDataArray, setChartDataArray] = useState(null);
  const [earningsChartArray,setEarningsChartArray]=useState(null);

  useEffect(() => {
    // Fetch bookings vs. date data from the backend
    axiosInstanceforVendor
      .get(`/vendor/bookings-vs-date-earnings-vs-month/${vendorId}`) // Adjust the URL to match your backend route
      .then((response) => {
        console.log(response.data,"----------response in vendor dashboard");
        setChartDataArray(response.data.chartDataArray);
        setEarningsChartArray(response.data.aggregatedData)
      })
      .catch((error) => console.error(error));
  }, []); // Empty dependency array to run this effect only once

  useEffect(() => {
    axiosInstanceforVendor.get(`/vendor/stats/${vendorId}`).then((response) => {
      const { totalBookings, totalBookingsThisWeek, totalEarningsThisWeek } =
        response.data;
      setTotalBookings(totalBookings);
      setTotalBookingsThisWeek(totalBookingsThisWeek);
      setTotalEarningsThisWeek(totalEarningsThisWeek);
    });
  }, []);
  return (
    <div>
      <VendorHeader />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Bookings</h5>
                <p className="card-text">{totalBookings}</p>
              </div>
            </div>
          </div>

          {/* <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Vendors</h5>
                <p className="card-text">{totalVendors}</p>
              </div>
            </div>
          </div> */}

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Bookings This Week</h5>
                <p className="card-text">{totalBookingsThisWeek}</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Earnings This Week</h5>
                <p className="card-text">₹{totalEarningsThisWeek}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bookings vs. Month</h5>
                <BookingsChartVendorSide chartDataArray={chartDataArray} />{" "}
                {/* Pass the data for the chart */}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Earnings vs. Month</h5>
                <EarningsChartVendorSide earningsChartArray={earningsChartArray} />{" "}
                {/* Pass the data for the chart */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenderDashBoard;
