import Button from "../../components/Button";
/* eslint-disable react/prop-types */
import Profile from "../../components/Profile";
// import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border-bottom: 1px solid #f0eded;
  padding: 10px 0;

  p {
    color: #6a7280;
    font-size: 13px;
    margin-top: 3px;
  }
`;

const EditProfile = styled.button`
  border: 1px solid #f0eded;
  padding: 9px 19px;
  border-radius: 5px;
  background-color: transparent;

  &:hover {
    background: rgb(245 245 245);
  }
`;

const BusinessDetails = ({ onClick, business }) => {
  const empty = Object.keys(business).length === 0;

  if (empty) {
    return (
      <div>
        <Button onClick={onClick}>Create business</Button>
      </div>
    );
  }

  return (
    <Container className="flex justify-between">
      <div className="flex sm-gap">
        <div>
          <Profile />
        </div>
        <div>
          <h4>{business?.name}</h4>
          <div className="flex flex-col">
            <p className="text-sm font-medium text-gray-500">
              {business?.email}
            </p>

            <p className="text-sm font-medium text-gray-500">
              {business?.phone}
            </p>

            <p className="text-sm font-medium text-gray-500">
              {business?.city}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {business?.address}
            </p>
            <p className="text-sm font-medium text-gray-500">
              {business?.country}
            </p>
          </div>
        </div>
      </div>
      <div>
        <EditProfile
          onClick={() => {
            onClick();
          }}
        >
          Edit
        </EditProfile>
      </div>
    </Container>
  );
};

export default BusinessDetails;
