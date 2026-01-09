import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { FaChartLine, FaExclamationTriangle } from "react-icons/fa";

import { Line } from "react-chartjs-2";
import React from "react";

// Register the components and scales
// Register the components and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Monthly Income",
        data: [
          5000, 6000, 5500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500,
          11000,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Income",
      },
    },
  };

  return (
    <div className="financial-overview">
      {/* <h3>Financial Overview</h3>
      <div className="chart">
        <FaChartLine />
      </div> */}
      <div className="outstanding-payments">
        <Line data={data} options={options} />
        {/* <FaExclamationTriangle /> */}
        {/* <p>Outstanding Payments: $2,000</p> */}
      </div>
    </div>
  );
};

export default Charts;
