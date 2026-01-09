import { formatDate, formatNumber } from "../utils";
import styled, { css } from "styled-components";

import Profile from "./Profile";
import PropTypes from "prop-types";

// import React from "react";

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 10px;

  th,
  td {
    border-bottom: 1px solid #f0eded;
    font-size: 14px;
    padding: 8px;
    text-align: left;
  }

  th {
    font-weight: bold;
  }
`;

const statusIcon = css`
  height: 7px;
  width: 7px;
  border-radius: 50%;
`;

const Paid = styled.div`
  ${statusIcon};
  background: #22c55e;
`;

const Pending = styled.div`
  ${statusIcon};
  background: #eab308;
`;

const Cancelled = styled.div`
  ${statusIcon};
  background: #d1d5db;
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const RentTable = ({ tableHeader = [], tableBody = [] }) => {
  const getStatusComponent = (status) => {
    switch (status) {
      case "paid":
        return (
          <StatusContainer>
            <Paid /> Complete
          </StatusContainer>
        );
      case "pending":
        return (
          <StatusContainer>
            <Pending /> Pending
          </StatusContainer>
        );
      case "cancelled":
        return (
          <StatusContainer>
            <Cancelled /> Canceled
          </StatusContainer>
        );
      default:
        return null;
    }
  };
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
                    <Profile avi name={row[headerItem.key]} />
                  </td>
                );
              }
              if (headerItem.key === "date") {
                return (
                  <td key={headerItem.key}>
                    {formatDate(row[headerItem.key])}
                  </td>
                );
              }
              if (headerItem.key === "price") {
                return (
                  <td key={headerItem.key}>
                    {formatNumber(row[headerItem.key])}
                  </td>
                );
              }
              if (headerItem.key === "status") {
                return (
                  <td key={headerItem.key}>
                    {getStatusComponent(row[headerItem.key])}
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

RentTable.propTypes = {
  tableHeader: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableBody: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      date: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      status: PropTypes.string,
    })
  ).isRequired,
};

export default RentTable;
