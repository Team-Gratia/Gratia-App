/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const slideDown = keyframes`
  from {
  transform: translate(-50%, -100%);

  }
  to {
  transform: translate(-50%, 40px);

  }
`;

const slideUp = keyframes`
  from {
  transform: translate(-50%, 40px);

  }
  to {
  transform: translate(-50%, -100%);

  }
`;

const NotificationWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  /* transform: translateX(-50%); */
  min-width: 300px;
  font-size: 15px;
  padding: 15px;
  text-align: center;
  background-color: ${(props) =>
    props.type === "error" ? "#ffcccc" : "#ccffcc"};
  color: ${(props) => (props.type === "error" ? "#990000" : "#006600")};
  border: 1px solid
    ${(props) => (props.type === "error" ? "#ff6666" : "#66cc66")};
  border-radius: 4px;
  animation: ${(props) =>
    props.show
      ? css`
          ${slideDown} 0.5s ease-out forwards
        `
      : css`
          ${slideUp} 0.5s ease-out forwards
        `};
  z-index: 999;
`;

const Notification = ({ message, type, duration = 5000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <NotificationWrapper type={type} show={show}>
      <p>{message}</p>
    </NotificationWrapper>
  );
};

export default Notification;
