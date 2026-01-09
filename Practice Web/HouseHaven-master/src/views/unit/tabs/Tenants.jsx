import {
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useGetTenantsQuery,
} from "../../../app/api/api";

import Table from "../../../components/Table";
// import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  color: rgb(107 114 128);
`;

const Tenants = () => {
  const { id } = useParams();

  const { data } = useGetTenantsQuery();

  const tableBody = data?.tenants || [];
  const tableHeader = [
    { id: 1, name: "Name", key: "name" },
    { id: 2, name: "Phone", key: "phone" },
    { id: 2, name: "email", key: "email" },
    { id: 3, name: "Salutation", key: "salutation" },
    { id: 5, name: "City", key: "city" },
    { id: 6, name: "", key: "action" },
  ];

  const { data: propertyData } = useGetPropertyQuery({
    businessId: 1,
    propertyId: id,
  });

  const property = propertyData?.property;
  return (
    <div>
      <h4 className="">{property?.name || "Your"} Tenants.</h4>
      <SmallText>Below are your Tenants.</SmallText>
      <Table tableBody={tableBody} tableHeader={tableHeader} />

      {/* <Button
        containerStyles={{
          textTransform: "uppercase",
          marginTop: "10px",
        }}
      >
        Add a tenant
      </Button> */}
    </div>
  );
};

export default Tenants;
