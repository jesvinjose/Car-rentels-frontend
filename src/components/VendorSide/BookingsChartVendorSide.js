import React from 'react';
import Chart from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const BookingsChartVendorSide = ({ chartDataArray }) => {
  if (!chartDataArray || chartDataArray.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  // Extract months and counts from the data
  const months = chartDataArray.map(item => (item.month || '').substring(0, 7));
  const counts = chartDataArray.map(item => item.count || 0);

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Bookings',
        data: counts,
        fill: false,
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: 
        {
          type: 'category',
        },
    
      y: 
        {
          beginAtZero: true,
        },
    },
  };

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BookingsChartVendorSide;
