// import React from 'react';
// import Chart from "chart.js/auto";
// import { Bar } from 'react-chartjs-2';
// import { CategoryScale } from "chart.js";
// Chart.register(CategoryScale);


// const BookingsChart = ({chartDataArray}) => {
//   // Your data from the backend
//   if (!chartDataArray || chartDataArray.length === 0) {
//     return <div>No data available for the chart.</div>;
//   }

//   // Extract dates and counts from the data
//   const dates = chartDataArray.map(item => item.date);
//   const counts = chartDataArray.map(item => item.count);

//   const data = {
//     labels: dates, // Dates on the X-axis
//     datasets: [
//       {
//         label: 'Bookings',
//         data: counts, // Counts on the Y-axis
//         fill: false, // To remove area below the line
//         borderColor: 'blue', // Line color
//         borderWidth: 2, // Line width
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       x: [
//         {
//           type: 'time',
//           time: {
//             unit: 'day',
//             displayFormats: {
//               day: 'MMM D',
//             },
//           },
//         },
//       ],
//       y: [
//         {
//           beginAtZero: true,
//         },
//       ],
//     },
//   };

//   return (
//     <div style={{ width: '80%', margin: 'auto' }}>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default BookingsChart;

import React from 'react';
import Chart from "chart.js/auto";
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const BookingsChart = ({ chartDataArray }) => {
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

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     x: [
  //       {
  //         type: 'category',
  //       },
  //     ],
  //     y: [
  //       {
  //         beginAtZero: true,
  //       },
  //     ],
  //   },
  // };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category',
      },
      y: {
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

export default BookingsChart;