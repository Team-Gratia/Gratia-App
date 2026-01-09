/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

const Container = styled.button`
  padding: 10px;
  text-transform: uppercase;
  background: #64bbea;
  border: 2px solid white;
  transition: 0.4s;
  border-radius: 6px;
  font-size: 13px;
  color: white;
  font-weight: bold;

  ${({ containerStyles }) => containerStyles}
  &:focus {
    /* border: 2px solid #5cb6e7; */
  }

  &:hover {
    border: 2px solid #95d2f2;
  }

  &:active {
    transform: scale(0.96);
  }

  ${({ hover }) => {
    return (
      hover &&
      `  &:hover {
      background: rgb(245 245 245);

    }`
    );
  }}
`;

const SmallButton = styled.button`
  padding: 5px;
  border-radius: 3px;
  margin-right: 10px;
  font-size: 13px;
  font-weight: 500;
  border: 2px solid transparent;

  &:hover {
    opacity: 0.95;
    border: 2px solid #ccc;
    border-radius: 3px;
  }
  ${({ containerStyles }) => containerStyles};
`;

const SecondaryButton = ({ containerStyles, text, onClick, children }) => {
  return (
    <SmallButton onClick={onClick} containerStyles={containerStyles}>
      {text || children}
    </SmallButton>
  );
};

const Button = ({
  hover,
  onClick,
  children,
  disabled,
  containerStyles,
  sec,
  text,
  type,
  icon,
}) => {
  if (sec) {
    return (
      <SecondaryButton
        text={text}
        containerStyles={containerStyles}
        onClick={onClick}
      >
        {children}
      </SecondaryButton>
    );
  }
  return (
    <Container
      disabled={disabled}
      hover={hover}
      onClick={onClick}
      containerStyles={containerStyles}
      type={type}
    >
      {children}
    </Container>
  );
};

export default Button;
