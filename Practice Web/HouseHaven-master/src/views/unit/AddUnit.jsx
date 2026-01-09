import Documents from "./tabs/Documents";
import Images from "./tabs/Images";
import React from "react";
import Tabs from "../../components/Tabs";
import Tenants from "./tabs/Tenants";
import Unit from "./tabs/Unit";
import styled from "styled-components";
import { useGetPropertyQuery } from "../../app/api/api";
import { useParams } from "react-router-dom";

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  color: rgb(107 114 128);
`;

const tabs = [
  { id: 1, title: "Units" },
  { id: 2, title: "Images" },
  { id: 3, title: "Documents" },
  { id: 4, title: "Tenants" },
];

const AddUnit = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  const { id } = useParams();

  const { data } = useGetPropertyQuery({ businessId: 1, propertyId: id });
  const property = data?.property;

  return (
    <div>
      <h2>Add Unit</h2>
      <SmallText>{property?.name}.</SmallText>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {activeTab === 1 && <Unit />}
      {activeTab === 2 && <Images />}
      {activeTab === 3 && <Documents />}
      {activeTab === 4 && <Tenants />}
    </div>
  );
};

export default AddUnit;
