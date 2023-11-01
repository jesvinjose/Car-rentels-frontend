import React, { useEffect, useState } from "react";
import axiosInstanceforAdmin from "../../api/axiosInstanceforAdmin";
import AdminHeader from "./AdminHeader";
import BookingsChart from "./BookingsChart"; // Import the Chart component
import EarningsDataChart from "./EarningsDataChart";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalBookingsThisWeek, setTotalBookingsThisWeek] = useState(0);
  const [totalEarningsThisWeek, setTotalEarningsThisWeek] = useState(0);
  const [totalEarningsThisMonth, setTotalEarningsThisMonth] = useState(0);
  const [totalCars, setTotalCars] = useState(0);
  // State to store chart data
  const [chartDataArray, setChartDataArray] = useState(null);
  const [earningsChartArray, setEarningsChartArray] = useState(null);

  useEffect(() => {
    // Fetch bookings vs. date data from the backend
    axiosInstanceforAdmin
      .get("/admin/bookings-vs-date-earnings-vs-month") // Adjust the URL to match your backend route
      .then((response) => {
        console.log(response.data);
        setChartDataArray(response.data.chartDataArray);
        setEarningsChartArray(response.data.earningsData);
      })
      .catch((error) => console.error(error));
  }, []); // Empty dependency array to run this effect only once

  console.log(chartDataArray, "---------chartArray");

  useEffect(() => {
    // Fetch data from the server and set state variables
    axiosInstanceforAdmin.get("/admin/stats").then((response) => {
      const {
        userCount,
        carCount,
        vendorCount,
        totalBookingsThisWeek,
        totalEarningsThisWeek,
        totalEarningsThisMonth,
      } = response.data;
      setTotalUsers(userCount);
      setTotalVendors(vendorCount);
      setTotalCars(carCount);
      setTotalBookingsThisWeek(totalBookingsThisWeek);
      setTotalEarningsThisWeek(totalEarningsThisWeek);
      setTotalEarningsThisMonth(totalEarningsThisMonth);
    });
  }, []);

  return (
    <div>
      <AdminHeader />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Cars</h5>
                <p className="card-text">{totalCars}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">{totalUsers}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Vendors</h5>
                <p className="card-text">{totalVendors}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Bookings This Week</h5>
                <p className="card-text">{totalBookingsThisWeek}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Earnings This Week</h5>
                <p className="card-text">₹{totalEarningsThisWeek}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Earnings This Month</h5>
                <p className="card-text">₹{totalEarningsThisMonth}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5 mb-5">
          <div className="col-md-12 col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bookings vs. Month</h5>
                <BookingsChart chartDataArray={chartDataArray} />
                {/* Pass the data for the chart */}
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Earnings vs. Month</h5>
                <EarningsDataChart earningsChartArray={earningsChartArray} />
                {/* Pass the data for the chart */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
