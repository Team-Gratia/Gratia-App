import Documents from "./tabs/Documents";
import Images from "./tabs/Images";
import PropertyInformation from "./tabs/PropertyInformation";
import React from "react";
import Tabs from "../../components/Tabs";
import Tenants from "./tabs/Tenants";
import Units from "./tabs/Units";
import styled from "styled-components";

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  color: rgb(107 114 128);
`;

const tabs = [
  { id: 1, title: "Property Information" },
  { id: 2, title: "Units" },
  { id: 3, title: "Images" },
  { id: 4, title: "Documents" },
  { id: 5, title: "Tenants" },
];

const AddProperty = () => {
  const [activeTab, setActiveTab] = React.useState(1);

  return (
    <div>
      <h2>Add a Property</h2>
      <SmallText>Add basic company information of the property.</SmallText>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {activeTab === 1 && <PropertyInformation setActiveTab={setActiveTab} />}
      {activeTab === 2 && <Units setActiveTab={setActiveTab} />}
      {activeTab === 3 && <Images setActiveTab={setActiveTab} />}
      {activeTab === 4 && <Documents setActiveTab={setActiveTab} />}
      {activeTab === 5 && <Tenants setActiveTab={setActiveTab} />}
    </div>
  );
};

export default AddProperty;
