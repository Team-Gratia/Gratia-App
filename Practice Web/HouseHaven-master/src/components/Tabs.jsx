/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const AbsoluteSlider = styled.div`
  background-color: #f0eded;
  position: absolute;
  height: 1px;
  width: 100%;
  left: 0;
  bottom: 0;
`;

const TabContainer = styled.div`
  padding: 10px 0;
  position: relative;
`;

const Tab = styled.div`
  cursor: pointer;
  position: relative;
  font-size: 16px;
`;

const Slider = styled.div`
  position: absolute;
  background-color: #64bbea;
  height: 1px;
  width: ${(props) => props.width}px;
  left: ${(props) => props.left}px;
  bottom: 0px;
  transition: left 0.3s ease;
  z-index: 1;
`;

const Tabs = ({ activeTab, setActiveTab, tabs }) => {
  const [sliderStyle, setSliderStyle] = React.useState({ left: 0, width: 0 });
  const tabsRef = React.useRef([]);

  React.useEffect(() => {
    const activeTabRef = tabsRef.current[activeTab - 1];
    if (activeTabRef) {
      setSliderStyle({
        left: activeTabRef.offsetLeft,
        width: activeTabRef.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <TabContainer className="my flex md-gap">
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          ref={(el) => (tabsRef.current[tab.id - 1] = el)}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.title}
        </Tab>
      ))}
      <Slider left={sliderStyle.left} width={sliderStyle.width} />
      <AbsoluteSlider />
    </TabContainer>
  );
};

export default Tabs;
