import Logo from "./Logo";
import Profile from "./Profile";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 80px;
  border-bottom: 1px solid #f0eded;
  position: fixed;
  width: 100%;
`;

const Navbar = () => {
  return (
    <Container className="flex ai-center justify-between px">
      <div>
        <Logo />
      </div>
      <div>
        <Profile />
      </div>
    </Container>
  );
};

export default Navbar;
