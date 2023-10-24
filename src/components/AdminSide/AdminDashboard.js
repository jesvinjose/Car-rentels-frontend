import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstanceforAdmin from '../../api/axiosInstanceforAdmin'
import AdminHeader from "./AdminHeader";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalBookingsThisWeek, setTotalBookingsThisWeek] = useState(0);
  const [totalEarningsThisWeek, setTotalEarningsThisWeek] = useState(0);

  // const adminToken=localStorage.getItem('adminToken');

  useEffect(() => {
    // const config = {
    //     headers: {
    //       Authorization: `Bearer ${adminToken}`  // Set the token in the headers
    //     }
    //   };
    // Fetch data from the server and set state variables
    axiosInstanceforAdmin.get("/admin/stats").then((response) => {
      const { userCount, vendorCount, totalBookingsThisWeek, totalEarningsThisWeek } = response.data;
      setTotalUsers(userCount);
      setTotalVendors(vendorCount);
      setTotalBookingsThisWeek(totalBookingsThisWeek);
    //   setTotalEarnings(earnings);
    });
  }, []);

  return (
    <div>
      <AdminHeader/>
      <h1>Admin Dashboard</h1>
      <p>Total Users: {totalUsers}</p>
      <p>Total Vendors: {totalVendors}</p>
      <p>Total Bookings: {totalBookingsThisWeek}</p>
      <p>Total Earnings: ₹{totalEarningsThisWeek}</p>
    </div>
  );
}

export default AdminDashboard;
