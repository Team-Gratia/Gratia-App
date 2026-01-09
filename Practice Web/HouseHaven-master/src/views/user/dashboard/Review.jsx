import { Rating } from "../../../components";
import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Inner = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 30px;
`;

const Item = styled.div`
  flex: 1 1 calc(50% - 20px); /* Two items per row */
  border: 1px solid #e7e7e7;
  padding: 15px;
  border-radius: 5px;

  .avi {
    height: 37px;
    width: 37px;
    border-radius: 50%;
    background-color: #f2f0f0;
  }

  .name {
    font-size: 13px;
    font-weight: bold;
  }

  .location {
    font-size: 13px;
    color: #676868;
  }

  .rate {
    margin-top: 4px;
  }

  .review {
    margin-top: 10px;
  }

  .show-more {
    margin-top: 10px;
    color: #007bff;
    cursor: pointer;
    font-size: 12px;
  }
`;

const reviews = [
  {
    name: "Abolaji Ade-Ajayi",
    location: "Yaba, Lagos.",
    rating: 4,
    review:
      "Staying at this property will provide you with a wonderful experience, with excellent facilities and a friendly guard.",
  },
  {
    name: "Yazid Musa",
    location: "Ikeja, Lagos.",
    rating: 5,
    review: "This place is amazing! The rooms were very comfortable.",
  },
  {
    name: "Olawole Akorede",
    location: "Victoria Island, Lagos.",
    rating: 3,
    review:
      "The location is great, but the rooms could use some improvements. Overall, it was a decent stay.",
  },
  {
    name: "Mary Johnson",
    location: "Lekki, Lagos.",
    rating: 4,
    review:
      "Lovely place with beautiful surroundings. The staff were very attentive and the amenities were top-notch.",
  },
  {
    name: "Peter Brown",
    location: "Surulere, Lagos.",
    rating: 1.5,
    review: "Not good enough experience.",
  },
  {
    name: "Mike Will",
    location: "Lekki.",
    rating: 2,
    review:
      "Not the best experience. The room was not clean and the service was slow. Needs significant improvements.",
  },
];

const Review = () => {
  return (
    <Container>
      <div className="border-bottom" />
      <Inner>
        {reviews.map((review, index) => (
          <Item key={index}>
            <div className="flex sm-gap">
              <div className="avi" />
              <div>
                <p className="name">{review.name}</p>
                <p className="location">{review.location}</p>
              </div>
            </div>
            <div className="rate">
              <Rating rating={review.rating} size={12} outOf={5} />
            </div>
            <div className="review">{review.review}</div>
            <div className="show-more">Show more</div>
          </Item>
        ))}
      </Inner>
    </Container>
  );
};

export default Review;
