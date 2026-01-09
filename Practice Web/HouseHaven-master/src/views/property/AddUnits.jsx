import Documents from "./tabs/Documents";
import Images from "./tabs/Images";
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
  { id: 1, title: "Units" },
  { id: 2, title: "Images" },
  { id: 3, title: "Documents" },
  { id: 4, title: "Tenants" },
];
const AddUnits = () => {
  const [activeTab, setActiveTab] = React.useState(1);

  return (
    <div>
      <h2>Add a Unit</h2>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {activeTab === 1 && <Units />}
      {activeTab === 2 && <Images />}
      {activeTab === 3 && <Documents />}
      {activeTab === 4 && <Tenants />}
    </div>
  );
};

export default AddUnits;
