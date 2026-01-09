/* eslint-disable react/prop-types */
import styled, { css } from "styled-components";

// import React from "react";
import logo from "../assets/logo.jpg";
import nobgLogo from "../assets/logowhite.png";

const Image = styled.img`
  height: 90px;
  width: 90px;
  object-fit: contain;
  cursor: pointer;

  ${(props) =>
    props.dark &&
    css`
      height: 48px;
      width: 48px;
    `}
`;

const Logo = ({ dark }) => {
  return (
    <div>
      <Image src={dark ? nobgLogo : logo} dark={dark} />
    </div>
  );
};

export default Logo;
