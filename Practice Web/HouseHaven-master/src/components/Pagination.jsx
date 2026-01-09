/* eslint-disable react/prop-types */
// import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 8px 16px;
  margin: 0 4px;
  border: none;
  background-color: ${(props) => (props.active ? "#5cb6e7" : "#f2f2f2")};
  color: ${(props) => (props.active ? "#ffffff" : "#333333")};
  cursor: pointer;
`;

const Pagination = ({ paginationData = {}, onPageChange }) => {
  const { currentPage, totalPages, hasPrev, hasNext } = paginationData;

  const handlePageChange = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrev}
      >
        Prev
      </PageButton>
      {[...Array(totalPages)].map((_, index) => (
        <PageButton
          key={index}
          active={index + 1 === currentPage}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </PageButton>
      ))}
      <PageButton
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNext}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
