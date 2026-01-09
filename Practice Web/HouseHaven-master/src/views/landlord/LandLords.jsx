import Action from "./components/Action";
import Avi from "./components/Avi";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
// import React from "react";
import Table from "../../components/Table";
import styled from "styled-components";
import { useGetLandlordsQuery } from "../../app/api/api";
import { useNavigate } from "react-router-dom";

const SmallText = styled.p`
  color: rgb(107 114 128);
  font-size: 14px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin: 5px 0;
`;

const LandLords = () => {
  const navigate = useNavigate();

  const { data } = useGetLandlordsQuery();

  //
  const tableHeader = [
    { id: 1, name: "Name", key: "name" },
    { id: 2, name: "Email Address", key: "email" },
    { id: 3, name: "Phone number", key: "phone" },
    { id: 4, name: "Join Date", key: "createdAt" },
    { id: 5, name: "City", key: "city" },
    { id: 6, name: "", key: "action" },
  ];

  //

  const tableBody = data?.items || [];

  return (
    <div>
      {/* <h2 className="my"></h2> */}
      <h2 className="my"> Landlords ({data?.totalItems || 0})</h2>

      <SmallText>Below are the landlords under your management.</SmallText>
      <Button
        onClick={() => {
          navigate("/add/landlord");
        }}
        containerStyles={{
          textTransform: "uppercase",
        }}
      >
        Add a landlord
      </Button>

      <Table
        tableHeader={tableHeader}
        tableBody={tableBody}
        actionComponent={<Action />}
      />
      {tableBody.length > 0 && (
        <Pagination paginationData={data} onPageChange={() => {}} />
      )}
    </div>
  );
};

export default LandLords;
