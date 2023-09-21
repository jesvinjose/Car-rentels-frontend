import React, { useState } from 'react';
import AdminHeader from './AdminHeader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarTypeRegister = () => {
  const [carTypeData, setCarTypeData] = useState({
    carTypeName: '',
    hourlyRentalRate: 0,
    dailyRentalRate: 0,
    monthlyRentalRate: 0,
  });
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarTypeData({ ...carTypeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('inside add new car type submit');
        const response = await axios.post('http://localhost:5000/admin/carTypeRegister', carTypeData);
        console.log('Car type registered successfully:', response.data.message);
        // Optionally, you can show a success message or redirect to a different page
        navigate('/carrentalrates')
      } catch (error) {
        console.error('Error registering car type:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error('Server responded with non-2xx status:', error.response.data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received from the server.');
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Error setting up the request:', error.message);
        }
      }
  };

  return (
    <div>
      <AdminHeader />
      <div>
        <h2>Car Type Register Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="carTypeName">Car Type Name:</label>
            <input
              type="text"
              id="carTypeName"
              name="carTypeName"
              value={carTypeData.carTypeName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="hourlyRentalRate">Hourly Rental Rate:</label>
            <input
              type="number"
              id="hourlyRentalRate"
              name="hourlyRentalRate"
              value={carTypeData.hourlyRentalRate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="dailyRentalRate">Daily Rental Rate:</label>
            <input
              type="number"
              id="dailyRentalRate"
              name="dailyRentalRate"
              value={carTypeData.dailyRentalRate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="monthlyRentalRate">Monthly Rental Rate:</label>
            <input
              type="number"
              id="monthlyRentalRate"
              name="monthlyRentalRate"
              value={carTypeData.monthlyRentalRate}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register Car Type</button>
        </form>
      </div>
    </div>
  );
};

export default CarTypeRegister;
