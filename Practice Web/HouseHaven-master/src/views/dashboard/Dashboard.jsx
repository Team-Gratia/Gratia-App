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
import { FaHome, FaUserTie, FaUsers } from "react-icons/fa";

import { Line } from "react-chartjs-2";
import { PiMoneyWavyThin } from "react-icons/pi";
import RentTable from "../../components/RentTable";
import Table from "../../components/Table";
import { formatDate } from "../../utils";
// import React from "react";
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
  padding: 20px;

  h3 {
    margin: 10px 0;
  }

  .name {
    color: #f39149;
    margin-left: 5px;
  }

  .notification {
    margin-top: 30px;
    gap: 60px;
  }
`;

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  /* margin-top: 0.25rem; */
  color: rgb(107 114 128);
`;

const StatCard = styled.div`
  width: 240px;
  padding: 25px 20px;
  background: #ffffff;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.01);

  h1 {
    font-size: 34px;
    line-height: 1.4;
    color: #424243;
  }

  p {
    font-size: 15px;
    color: #b5b5c3;
  }
`;

const StatCards = styled.div`
  display: flex;
  gap: 20px;
  /* margin-top: 25px; */
`;

const ChartContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.01);
  margin-top: 20px;
`;

const WidgetContainer = styled.div`
  flex: 2;
  display: flex;
  gap: 20px;
`;

const Widget = styled.div`
  flex: ${(props) => props.flex || 1}; /* Default flex is 1 if not provided */
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.01);
  margin-top: 20px;
`;

const RecentActivity = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background: #fff;

  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.01);

  & > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 0.875rem;
  }

  & > div:last-child {
    color: #6b7280;
    font-size: 0.75rem;
  }
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

  const tableHeader = [
    { id: 1, name: "Name", key: "name" },
    { id: 2, name: "Phone number", key: "phone" },
    { id: 3, name: "Date", key: "date" },
    { id: 4, name: "Price", key: "price" },
    { id: 5, name: "Status", key: "status" },
    { id: 6, name: "", key: "action" },
  ];

  const tableBody = [
    {
      id: 1,
      name: "Abolaji Ade-Ajayi",
      phone: "09054472953",
      date: "2024-01-01",
      price: "900000",
      status: "paid",
    },
    {
      id: 2,
      name: "Afolashade Oyediran",
      phone: "08012345678",
      date: "2024-02-15",
      price: "650000",
      status: "paid",
    },
    {
      id: 3,
      name: "Jane Smith",
      phone: "07098765432",
      date: "2024-03-20",
      price: "550000",
      status: "pending",
    },
    {
      id: 4,
      name: "Mary Kim",
      phone: "07098765432",
      date: "2024-03-20",
      price: "650000",
      status: "cancelled",
    },
    {
      id: 4,
      name: "Daniel Mike",
      phone: "07098765432",
      date: "2023-09-20",
      price: "650000",
      status: "pending",
    },
  ];

  const activities = [
    {
      id: 1,
      type: "New Property",
      description: "Added a new property: 123 Main St.",
      date: "2024-06-28T10:00:00Z",
    },
    {
      id: 2,
      type: "New Tenant",
      description: "John Doe signed a lease for 456 Elm St.",
      date: "2024-06-28T09:00:00Z",
    },
    {
      id: 3,
      type: "Payment",
      description: "Rent payment received from Jane Smith.",
      date: "2024-06-27T18:00:00Z",
    },
    {
      id: 4,
      type: "Maintenance Request",
      description: "Maintenance request submitted for 456 Elm St.",
      date: "2024-06-26T15:30:00Z",
    },
    {
      id: 5,
      type: "Lease Renewal",
      description: "Lease for 789 Oak Ave renewed for another year.",
      date: "2024-06-25T12:00:00Z",
    },
    {
      id: 6,
      type: "Vacancy Filled",
      description: "Vacant unit at 789 Oak Ave has been rented out.",
      date: "2024-06-24T16:45:00Z",
    },
    // {
    //   id: 7,
    //   type: "Move-In",
    //   description: "Jane Smith moved into 456 Elm St.",
    //   date: "2024-06-23T11:00:00Z",
    // },
    // {
    //   id: 8,
    //   type: "Property Inspection",
    //   description: "Scheduled inspection completed for 123 Main St.",
    //   date: "2024-06-22T14:00:00Z",
    // },
  ];

  return (
    <DashboardContainer>
      <h2 className="flex">
        Welcome, <p className="name"> House Haven.</p>
      </h2>
      <SmallText>Here are your recent updates</SmallText>

      <div className="flex notification md-gap">
        <div>
          <StatCards>
            <StatCard>
              <h1>200</h1>
              <div className="flex ai-center xsm-gap">
                <FaHome color="#b5b5c3" />
                <p>Total Properties</p>
              </div>
            </StatCard>
            <StatCard>
              <h1>120</h1>
              <div className="flex ai-center xsm-gap">
                <FaUserTie color="#b5b5c3" />
                <p>Total Landlords</p>
              </div>
            </StatCard>
            <StatCard>
              <h1>50</h1>
              <div className="flex ai-center xsm-gap">
                <FaUsers color="#b5b5c3" />
                <p>Total Tenants</p>
              </div>
            </StatCard>
            <StatCard>
              <h1>2,500,000</h1>
              <div className="flex ai-center xsm-gap">
                <PiMoneyWavyThin color="#b5b5c3" />
                <p>Total Rents</p>
              </div>
            </StatCard>
          </StatCards>
        </div>
      </div>
      <h3>Financial Overview</h3>
      <ChartContainer>
        <Line
          data={lineChartData}
          options={{
            ...chartOptions,
            title: { text: "Property Value Over the Year" },
          }}
        />
      </ChartContainer>

      {/* <h3>Tenants</h3> */}
      {/* <Table tableBody={[]} tableHeader={[]} /> */}

      <WidgetContainer>
        <Widget flex="1.9">
          <h2>Rents</h2>
          <RentTable tableHeader={tableHeader} tableBody={tableBody} />
        </Widget>
        <Widget flex="1.1">
          <h2>Recent Activity</h2>
          <RecentActivity>
            {activities.map((activity) => (
              <ActivityItem key={activity.id}>
                <div>
                  <strong>{activity.type}</strong>
                  <p>{activity.description}</p>
                </div>
                <div>{formatDate(activity.date)}</div>
              </ActivityItem>
            ))}
          </RecentActivity>
        </Widget>
      </WidgetContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
