/* eslint-disable react/prop-types */
// import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid #e4e7eb;
  padding: 1rem;
  border-radius: 6px;
  width: 100%;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Amount = styled.p`
  color: rgb(17 24 39);
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const Days = styled.p`
  color: rgb(107 114 128);
  font-weight: 500;

  font-size: 0.875rem;
  line-height: 1.25rem;

  margin-top: 0.5rem;
`;

const PerChanges = styled.p`
  color: ${({ low }) => (!low ? "rgb(34 197 94)" : "#EF4444")};
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 1.5rem;
  text-align: center;
`;

const Card = ({ cl, amount, days, tenant }) => {
  return (
    <Container className="flex ai-center justify-center">
      <Amount>{amount}</Amount>
      <Days>Last {days} Days Earnings</Days>
      <PerChanges low={cl}>
        {cl ? "13%" : "43%"} {cl ? "less" : "extra"} since last week
      </PerChanges>
    </Container>
  );
};

const Cards = ({ tenant }) => {
  return (
    <div className="flex ai-center md-gap">
      <Card amount={`${tenant ? "50,000,441" : "4,500,000"}`} days={7} />
      <Card cl amount={`${tenant ? "124,900" : "50,900"}`} days={14} />
      <Card amount={`${tenant ? "12,000" : "5,900"}`} days={21} />
    </div>
  );
};

export default Cards;
