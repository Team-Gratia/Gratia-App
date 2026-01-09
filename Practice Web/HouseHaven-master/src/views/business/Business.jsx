import BusinessDetails from "./BusinessDetails";
import Password from "./Password";
import Profile from "./Profile";
import React from "react";
import Subscription from "./Subscription";
import Tabs from "../../components/Tabs";
import styled from "styled-components";
import { useGetBusinessQuery } from "../../app/api/api";

const BusinessContainer = styled.div`
  /* background-color: red; */
`;
const tabs = [
  { id: 1, title: "Business" },
  { id: 2, title: "Profile" },
  { id: 3, title: "Password" },
  { id: 4, title: "Subscription" },
];
const Business = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  const { data } = useGetBusinessQuery();

  const business = data?.business || {};

  React.useEffect(() => {});

  return (
    <BusinessContainer>
      <h2 className="my">{business.name || "Business"} Profile</h2>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {activeTab === 1 && (
        <BusinessDetails onClick={() => setActiveTab(2)} business={business} />
      )}
      {activeTab === 2 && (
        <Profile
          onClick={() => setActiveTab(3)}
          setActiveTab={setActiveTab}
          business={business}
        />
      )}
      {activeTab === 3 && <Password onClick={() => setActiveTab(4)} />}
      {activeTab === 4 && <Subscription />}
    </BusinessContainer>
  );
};

export default Business;
