/* eslint-disable react/prop-types */
import Button from "../../../components/Button";
// import React from "react";
import Unit from "../Unit";
import styled from "styled-components";
import { useGetPropertyQuery } from "../../../app/api/api";
import { useParams } from "react-router-dom";

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  color: rgb(107 114 128);
`;

const Units = ({ setActiveTab }) => {
  const { id } = useParams();

  const { data } = useGetPropertyQuery({ businessId: 1, propertyId: id });
  const property = {};
  console.log(data);

  return (
    <div>
      <h4> {property?.name || "Your"} Units</h4>
      {property && <SmallText>{property?.name} Apartment.</SmallText>}
      {!id && <SmallText>Add property before creating a unit</SmallText>}
      {!id && (
        <Button
          onClick={() => setActiveTab(1)}
          containerStyles={{
            marginTop: "15px",
          }}
        >
          ADD PROPERTY
        </Button>
      )}
      {id && <Unit setActiveTab={setActiveTab} />}
    </div>
  );
};

export default Units;
