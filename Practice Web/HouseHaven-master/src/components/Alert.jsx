import React, { useState } from "react";

import Button from "./Button";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { IoBulbSharp } from "react-icons/io5";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  right: 40px;
  top: 10px;
`;

const RemindTenants = styled.div`
  padding: 20px;
  margin-top: 50px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  transform: ${(props) => (props.visible ? "scale(1)" : "scale(0)")};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  transform-origin: top right;

  right: 0;
  top: 0;

  .top {
    margin-bottom: 10px;
  }
`;

const TenantReminder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(107 114 128);
`;

const Ball = styled.div`
  height: 50px;
  width: 50px;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  top: 0px;
  right: 0px;

  &:hover {
    transform: scale(1.09);
  }
`;

const Alert = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleBellClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Container>
      <Ball className="flex ai-center jc-center" onClick={handleBellClick}>
        <HiOutlineBellAlert size="27" color="#f39149" />
      </Ball>
      <RemindTenants visible={isVisible}>
        <div className="flex ai-center top xsm-gap">
          <IoBulbSharp color="#bfc34e" />
          <SmallText>Some tenants' rents due</SmallText>
        </div>
        {Array.from({ length: 5 }).map((_, index) => (
          <TenantReminder key={index} className="xsm-gap">
            <p>Ade-Ajayi Abolaji</p>
            <p>3,000,000.00</p>
          </TenantReminder>
        ))}
        <Button
          containerStyles={{
            width: "100%",
          }}
        >
          REMIND ALL
        </Button>
      </RemindTenants>
    </Container>
  );
};

export default Alert;
