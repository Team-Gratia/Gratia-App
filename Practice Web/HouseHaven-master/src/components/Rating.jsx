/* eslint-disable react/prop-types */
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

import React from "react";
import styled from "styled-components";

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled.span`
  color: ${({ theme }) => theme.primary || "#1e81f3"};
  margin: 0 2px;
`;

const Rating = ({ rating, outOf = 5, size = 20 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = outOf - fullStars - (halfStar ? 1 : 0);

  return (
    <RatingContainer>
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <Star key={`full-${index}`}>
            <FaStar size={size} />
          </Star>
        ))}
      {halfStar && (
        <Star key="half">
          <FaStarHalfAlt size={size} />
        </Star>
      )}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <Star key={`empty-${index}`}>
            <FaRegStar size={size} />
          </Star>
        ))}
    </RatingContainer>
  );
};

export default Rating;
