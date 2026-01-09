import React from "react";
import Search from "./Search";
import bg from "./bgg.jpg";
import styled from "styled-components";

const Container = styled.div`
  height: 400px;
  background: #f4f2f2;
  margin-top: 40px;
  border-radius: 6px;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.09);
  position: relative;

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4); /* Adjust the opacity and color as needed */
    border-radius: 6px;
  }
`;

const Hero = () => {
  return (
    <Container>
      <div className="backdrop"></div>
      <Search />
    </Container>
  );
};

export default Hero;
