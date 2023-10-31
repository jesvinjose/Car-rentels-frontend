import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);

const EarningsChartVendorSide = ({ earningsChartArray }) => {
  console.log("earningsChartArray:", earningsChartArray);
  if (!earningsChartArray || earningsChartArray.length === 0) {
    return <div>No data available for the chart.</div>;
  }

  // Extract years and months from the data
  const labels = earningsChartArray.map(
    (item) => `${item._id.year}-${item._id.month}`
  );
  const data = earningsChartArray.map((item) => item.totalEarnings);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Earnings",
        data: data,
        fill: false,
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EarningsChartVendorSide;
