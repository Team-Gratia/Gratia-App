/* eslint-disable react/prop-types */
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import React from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 950px;
  overflow: hidden;
  background-color: red;
  margin: auto;
`;

const Slide = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const SlideItem = styled.div`
  min-width: 400px;
  margin: 10px;
  height: 400px;
  background-color: blue;

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const ArrowButton = styled.button`
  top: 50%;
  position: absolute;
  ${({ direction }) => direction}: 0px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10;
  transform: translateY(-50%);
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
`;

const Modal = ({ isOpen, close }) => {
  return (
    isOpen && (
      <ModalContainer onClick={() => close()}>
        <SliderContainer className="center">
          <ArrowButton
            direction="left"
            // onClick={handlePrevClick}
            // disabled={currentIndex === 0}
          >
            <FaChevronLeft />
          </ArrowButton>
          <Slide>
            <SlideItem></SlideItem>

            {/* {imageUrls.map((imageUrl) => (
            <SlideItem key={imageUrl.id}>
              <img src={imageUrl.url} alt={`Image ${imageUrl.id}`} />
            </SlideItem>
          ))} */}
          </Slide>

          <ArrowButton
            direction="right"
            // onClick={handleNextClick}
            // disabled={currentIndex === Math.ceil(imageUrls.length / 3) - 1}
          >
            <FaChevronRight />
          </ArrowButton>
        </SliderContainer>
      </ModalContainer>
    )
  );
};

export default Modal;
