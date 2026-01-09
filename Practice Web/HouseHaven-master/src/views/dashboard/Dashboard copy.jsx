import { Bar, Line } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import {
  FaExclamationTriangle,
  FaHome,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

import React from "react";
import styled from "styled-components";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const StatCards = styled.div`
  display: flex;
  gap: 20px;
`;

const StatCard = styled.div`
  flex: 1;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StatCardIcon = styled.div`
  font-size: 2.5rem;
  color: #4caf50;
`;

const StatCardTitle = styled.h4`
  margin: 10px 0;
  font-size: 1.2rem;
`;

const StatCardValue = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ChartContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Dashboard = () => {
  const lineChartData = {
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
        label: "Property Value",
        data: [
          50000, 60000, 55000, 70000, 75000, 80000, 85000, 90000, 95000, 100000,
          105000, 110000,
        ],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const barChartData = {
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
        label: "New Tenants",
        data: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <DashboardContainer>
      <StatCards>
        <StatCard>
          <StatCardIcon>
            <FaHome />
          </StatCardIcon>
          <StatCardTitle>Total Properties</StatCardTitle>
          <StatCardValue>120</StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardIcon>
            <FaUserTie />
          </StatCardIcon>
          <StatCardTitle>Total Landlords</StatCardTitle>
          <StatCardValue>45</StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardIcon>
            <FaUsers />
          </StatCardIcon>
          <StatCardTitle>Total Tenants</StatCardTitle>
          <StatCardValue>350</StatCardValue>
        </StatCard>
        <StatCard>
          <StatCardIcon>
            <FaExclamationTriangle />
          </StatCardIcon>
          <StatCardTitle>Outstanding Payments</StatCardTitle>
          <StatCardValue>$2,000</StatCardValue>
        </StatCard>
      </StatCards>

      <ChartContainer>
        <h3>Property Value Over the Year</h3>
        <Line
          data={lineChartData}
          options={{
            ...chartOptions,
            title: { text: "Property Value Over the Year" },
          }}
        />
      </ChartContainer>

      <ChartContainer>
        <h3>New Tenants Per Month</h3>
        <Bar
          data={barChartData}
          options={{
            ...chartOptions,
            title: { text: "New Tenants Per Month" },
          }}
        />
      </ChartContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
