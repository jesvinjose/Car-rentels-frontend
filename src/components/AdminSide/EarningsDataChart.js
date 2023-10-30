// import React, { useEffect, useState } from 'react';
// import Chart from "chart.js/auto";
// import { Bar } from 'react-chartjs-2';
// import axiosInstanceforAdmin from '../../api/axiosInstanceforAdmin'; // Import your axios instance
// import { CategoryScale } from "chart.js";
// Chart.register(CategoryScale);

// const EarningsDataChart = ({earningsChartArray}) => {
//   // const [earningsData, setEarningsData] = useState([]);
//   const [errorMessage, setErrorMessage] = useState(null);
//   if (!chartDataArray || chartDataArray.length === 0) {
//     return <div>No data available for the chart.</div>;
//   }

//     // Extract months and counts from the data
//     const months = chartDataArray.map(item => (item.month || '').substring(0, 7));
//     const counts = chartDataArray.map(item => item.totalEarnings || 0);

//   // useEffect(() => {
//   //   // Fetch earnings data when the component mounts
//   //   console.log(getEarningsData());
//   //   getEarningsData();
//   // }, []);

//   // async function getEarningsData() {
//   //   await axiosInstanceforAdmin
//   //     .get("/admin/bookings-vs-date") // Adjust the URL to match your backend route
//   //     .then((response) => {
//   //       console.log(response.data,"------in front end response");
//   //       setEarningsData(response.data);
//   //     })
//   //     .catch((error) => {
//   //       if (error.response && error.response.data && error.response.data.message) {
//   //         setErrorMessage(error.response.data.message);
//   //       } else {
//   //         console.error(error);
//   //       }
//   //     });
//   // }
// //  
// //   earningsData.map(entry => entry.totalEarnings)||

// console.log(earningsData,"-----earningsData----------");
// let enterlabel=[]
// let enterdata=[]
// if(earningsData.length>0){
//     enterlabel=earningsData.filter(entry => entry.month)
//     enterdata=earningsData.filter(entry => entry.totalEarnings)
// }
// else{
//     const currentDate = new Date();
//     const options = { month: 'long' };
//     const currentMonth = currentDate.toLocaleString('en-US', options);
    

//     enterlabel=[currentMonth]
//     enterdata=[0]
// }
//   const chartData = {
//     labels:enterlabel, // Array of month labels
//     datasets: [{
//       label: 'Earnings per Month',
//       data: enterdata, // Array of earnings values
//       backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize the appearance
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 1,
//     }],
//   };

//   const chartOptions = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div>
//       {errorMessage ? (
//         // Display the error message if it exists
//         <div>Error: {errorMessage}</div>
//       ) : (
//         // Display the chart if there is no error
//         <div style={{ width: '80%', margin: 'auto' }}>
//           <Bar data={chartData} options={chartOptions} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default EarningsDataChart;




import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const EarningsDataChart = ({ earningsChartArray }) => {
  if (!earningsChartArray || earningsChartArray.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  // Extract years and months from the data
  const labels = earningsChartArray.map(item => `${item._id.year}-${item._id.month}`);
  const data = earningsChartArray.map(item => item.totalEarnings);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Earnings',
        data: data,
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
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EarningsDataChart;
