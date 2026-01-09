import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  width: 50px;
  background-color: aliceblue;
  border-radius: 50%;
`;

const Avi = () => {
  return (
    <div className="flex ai-center sm-gap">
      <Container />
      <p>Abolaji Ade-Ajayi</p>
    </div>
  );
};

export default Avi;
