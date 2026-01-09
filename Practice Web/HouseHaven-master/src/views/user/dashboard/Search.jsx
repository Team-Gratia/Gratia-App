import Button from "../../../components/Button";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  /* margin-top: 140px; */
  padding: 14px 30px;
  position: absolute;
  bottom: 30px;
  width: 90%;
  transform: translate(-50%, 0%);
  left: 50%;
  border-radius: 6px;
  display: flex;

  input {
    width: 100%;
    outline: none;
    border: none;
    font-size: 17px;
  }
`;

const Search = () => {
  return (
    <Container>
      <input placeholder="Search Property, Apartment" />
      <Button>SEARCH</Button>
    </Container>
  );
};

export default Search;
