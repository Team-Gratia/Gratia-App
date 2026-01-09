import { formatDate, formatNumber } from "../utils";

import Action from "../views/landlord/components/Action";
import Profile from "./Profile";
/* eslint-disable react/prop-types */
// import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  margin-bottom: 10px;
  th,
  td {
    border-bottom: 1px solid #f0eded;
    font-size: 14px;

    padding: 8px;
    text-align: left;
  }

  th {
    /* background-color: #f2f2f2; */
    font-weight: bold;
  }

  tr:nth-child(even) {
    /* background-color: #fbfbfb; */
  }

  tr:hover {
    /* background-color: #ddd; */
  }
`;

const Table = ({ tableHeader, tableBody, tableKey }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {tableHeader.map((headerItem) => (
            <th key={headerItem.id}>{headerItem.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableBody.map((row, index) => (
          <tr key={index}>
            {tableHeader.map((headerItem) => {
              if (headerItem.key === "name") {
                return (
                  <td key={headerItem.key}>
                    {<Profile avi name={row["name"]} />}
                  </td>
                );
              }
              if (
                headerItem.key === "startDate" ||
                headerItem.key === "createdAt"
              ) {
                return (
                  <td key={headerItem.key}>
                    {formatDate(row[headerItem.key])}
                  </td>
                );
              }
              if (headerItem.key === "rentalCost") {
                return (
                  <td key={headerItem.key}>
                    {formatNumber(row[headerItem.key])}
                  </td>
                );
              }
              if (headerItem.key === "action") {
                return (
                  <td key={headerItem.key}>
                    {<Action id={row.id} tableKey={tableKey} />}
                  </td>
                );
              }
              return <td key={headerItem.key}>{row[headerItem.key]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
