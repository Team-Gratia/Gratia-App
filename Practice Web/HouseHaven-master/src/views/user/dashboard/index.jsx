import Filter from "./Filter";
import Hero from "./Hero";
import React from "react";
import Search from "./Search";
import Unit from "./Unit";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f8fdff;
`;

const Dashboard = () => {
  return (
    <Container>
      <Hero />
      <Unit />
      {/* <Search /> */}
      {/* <Filter /> */}
    </Container>
  );
};

export default Dashboard;
