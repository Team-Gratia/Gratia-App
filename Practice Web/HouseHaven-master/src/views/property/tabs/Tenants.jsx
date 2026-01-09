/* eslint-disable react/prop-types */
import Button from "../../../components/Button";
import { Loader } from "../../../components";
// import React from "react";
import styled from "styled-components";
import { useGetPropertiesQuery } from "../../../app/api/api";
import { useParams } from "react-router-dom";

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  color: rgb(107 114 128);
`;

const Tenants = ({ setActiveTab }) => {
  const isLoading = false;
  const { id } = useParams();

  const { data: propertyData } = useGetPropertiesQuery();

  const properties = propertyData?.properties || [];

  const property = properties.find((prop) => prop.id === Number(id));
  return (
    <div>
      {isLoading && <Loader />}
      <h4 className={id && "mb"}>{property?.name || "Your"} Tenants</h4>
      {!id && (
        <>
          <SmallText>Add property before creating tenants</SmallText>
          <Button
            onClick={() => setActiveTab(1)}
            containerStyles={{
              marginTop: "15px",
            }}
          >
            ADD PROPERTY
          </Button>
        </>
      )}
    </div>
  );
};

export default Tenants;
