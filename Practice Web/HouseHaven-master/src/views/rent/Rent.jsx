import { Card } from "../../components";
import Pagination from "../../components/Pagination";
import React from "react";
import Table from "../../components/Table";

const tableHeader = [
  { id: 1, name: "Id", key: "id" },
  { id: 2, name: "Customer Name", key: "name" },
  { id: 3, name: "Phone number", key: "phone" },
  { id: 4, name: "Email Address", key: "email" },
  { id: 4, name: "Date", key: "date" },
  { id: 5, name: "Price", key: "price" },
  { id: 4, name: "Status", key: "status" },
  { id: 6, name: "", key: "action" },
];

const tableBody = [
  {
    id: 1,
    name: "TheLarry Family",
    phone: "08023939321",
    email: "thelarryfamily@gmail.com",
    date: "26 August, 2023",
    price: "900,000.00",
    status: "Paid",
    action: "View Details",
  },
  {
    id: 2,
    name: "Kemisola Funmilayo",
    phone: "08137654321",
    email: "kemmzy@gmail.com",
    date: "12 September, 2023",
    price: "750,000.00",
    status: "Pending",
    action: "View Details",
  },
  // Add more entries as needed
];

const Rent = () => {
  return (
    <div>
      <div>
        <Card />
      </div>
      <div>
        <h2>Rents</h2>

        <Table
          tableHeader={tableHeader}
          tableBody={tableBody}
          //   actionComponent={<Action />}
          //   aviComponent={<Avi />}
        />
        <Pagination />
      </div>
    </div>
  );
};

export default Rent;
