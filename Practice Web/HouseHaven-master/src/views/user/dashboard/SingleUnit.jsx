import { BiBuildingHouse } from "react-icons/bi";
import { BiSolidCarGarage } from "react-icons/bi";
import { BsCalendar2Check } from "react-icons/bs";
import { FaNairaSign } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { HiOutlineReceiptPercent } from "react-icons/hi2";
import { IoShareOutline } from "react-icons/io5";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { MdAccessTime } from "react-icons/md";
import { MdApartment } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineBed } from "react-icons/md";
import Modal from "../../../components/Modal";
import { PiBathtub } from "react-icons/pi";
import { Rating } from "../../../components";
import React from "react";
import Review from "./Review";
import { VscLocation } from "react-icons/vsc";
import bg1 from "./bg1.jpg";
import bg2 from "./bg2.jpg";
import bg3 from "./bg3.jpg";
import bg4 from "./bg4.jpg";
import styled from "styled-components";

const Button = styled.button`
  background-color: transparent;
  border-radius: 15px;
  border: none;
  border: 1px solid #ccc;
  padding: 7px 11px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #1e457c;
  font-size: 13px;
`;
const ImageContainer = styled.div`
  height: 600px;
  display: flex;
  gap: 10px;

  .box-1,
  .box-2,
  .box-3,
  .box-4 {
    background-color: #e5dbdb;
    border-radius: 5px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.09);
    position: relative;
  }

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }

  .box-1 {
    background-image: url(${bg1});
  }

  .box-2 {
    background-image: url(${bg4});
  }

  .box-3 {
    background-image: url(${bg2});
  }

  .box-4 {
    background-image: url(${bg3});
  }

  .gap {
    gap: 10px;
  }
`;

const ShowAll = styled.button`
  background-color: white;
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 7px 11px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #1e457c;
  font-size: 13px;

  position: absolute;
  z-index: 2;
  bottom: 15px;
  right: 10px;
`;

const Container = styled.div`
  h4 {
    margin: 10px 0;
    font-size: 19px;
    /* color: rgba(0, 0, 0, 0.8); */
    /* color: #1e457c; */
  }

  .description {
    font-size: 15px;
    /* color: #e9e9e9; */
    /* color: #1e457c; */
    line-height: 19px;

    color: rgba(0, 0, 0, 0.6);
  }

  .rating {
    margin-top: 40px;
  }

  .rate {
    font-size: 21px;
  }

  .res {
    margin-top: 5px;
    margin-left: 3px;
    color: #676868;
  }

  .ball {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: #eaeaea;
  }

  .sm {
    font-size: 14px;
    font-weight: 500;
  }

  .title {
    font-size: 14px;
    margin-top: 3px;
    color: #676868;
  }
`;

const Menu = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* border-radius: 15px; */
  border: 0.5px solid #e9e7e7;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  margin-bottom: 10px;

  .item {
    border: 0.5px solid #e9e7e7;
    padding: 20px 20px;

    .icon-box {
      height: 45px;
      width: 45px;
      border-radius: 50%;
      background-color: #f6f9fb;
      /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05); */
    }

    .title {
      color: #777;
      font-size: 14px;
    }

    .amount {
      color: #505a68;
      font-weight: bold;
    }
  }
`;

const SingleUnit = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <Container className="py">
      <Modal isOpen={isOpen} close={() => setIsOpen(false)} />
      <div className="border-bottom">
        <div className="flex justify-between py ai-end">
          <div className="flex flex-col xsm-gap">
            <div className="flex ai-center xsm-gap">
              <Rating rating={4.5} outOf={5} size={15} />
              <p>4.5</p>
            </div>

            <h3>Abolaji House</h3>
            <div className="flex ai-center">
              <VscLocation />
              <p>18 akanni bashuaa shomolu.</p>
            </div>
          </div>

          <div className="flex xsm-gap">
            <Button>
              <MdFavoriteBorder color="#67a5fd" />
              Save
            </Button>
            <Button>
              <IoShareOutline color="#347ce1" />
              Share
            </Button>
          </div>
        </div>
        <ImageContainer className="mb">
          <div className="flex-1 box-1">
            <div className="backdrop" />
          </div>
          <div className="flex-1 flex flex-col gap">
            <div className="flex-1 box-2">
              <div className="backdrop" />
            </div>
            <div className="flex-1 flex gap">
              <div className="flex-1 box-3">
                <div className="backdrop" />
              </div>
              <div className="flex-1 box-4">
                <div className="backdrop" />
                <ShowAll onClick={openModal}>Show all photos</ShowAll>
              </div>
            </div>
          </div>
        </ImageContainer>
        <div className="flex xsm-gap">
          <Button>
            <MdOutlineBed />3 Bedrooms
          </Button>
          <Button>
            <PiBathtub color="#6c6868" size={18} />3 Bathroom
          </Button>
          <Button>
            <BiSolidCarGarage />
            Parking
          </Button>
        </div>
      </div>
      {/*  */}
      <h4>Property overview</h4>
      <p className="description">
        Abolaji House, situated at 18 Akanni Bashua, Shomolu, is a prime real
        estate offering with 3 spacious bedrooms and 3 modern bathrooms. This
        elegant property features a contemporary design, a well-maintained
        interior, and ample parking space, making it perfect for families or
        individuals seeking comfort and convenience. The location provides easy
        access to local amenities and is ideal for those who appreciate a
        tranquil, ocean breeze retreat. With its appealing features and
        strategic location, Abolaji House is a highly desirable property. Save
        and share this exceptional opportunity with ease
      </p>
      {/*  */}

      <Menu>
        <div className="flex ai-center item md-gap">
          <div className="icon-box center">
            <LiaMoneyBillWaveSolid size={22} />
          </div>
          <div className="flex flex-col xsm-gap">
            <p className="title">Rental cost</p>
            <p className="flex ai-center amount">
              <FaNairaSign />
              900,000,000
            </p>
          </div>
        </div>
        <div className="flex ai-center item md-gap">
          <div className="icon-box center">
            <HiOutlineReceiptPercent size={22} />
          </div>
          <div className="flex flex-col xsm-gap">
            <p className="title">Vacancy rate</p>
            <p className="amount">0.5%</p>
          </div>
        </div>
        <div className="flex ai-center item md-gap">
          <div className="icon-box center">
            <MdAccessTime size={22} />
          </div>
          <div className="flex flex-col xsm-gap">
            <p className="title">Minimum stay</p>
            <p className="amount">1 year</p>
          </div>
        </div>
        <div className="flex ai-center item md-gap">
          <div className="icon-box center">
            <BsCalendar2Check size={18} />
          </div>
          <div className="flex flex-col xsm-gap">
            <p className="title">Listed</p>
            <p className="amount">0.8%</p>
          </div>
        </div>
        <div className="flex ai-center item md-gap">
          <div className="icon-box center">
            <BiBuildingHouse size={22} />
          </div>
          <div className="flex flex-col xsm-gap">
            <p className="title">Number of floors</p>
            <p className="amount">1</p>
          </div>
        </div>
        <div className="flex ai-center item md-gap">
          <div className="icon-box center">
            <MdApartment size={22} />
          </div>
          <div className="flex flex-col xsm-gap">
            <p className="title">Property size</p>
            <p className="amount">2,500 sq. ft. / 232 sq. meters</p>
          </div>
        </div>
      </Menu>

      <div className="rating">
        <div className="flex ai-center xsm-gap">
          <FaStar size={35} color="#347ce1" />
          <div className="flex">
            <p className="rate">4.5</p>
            <p className="flex res jc-end">875 reviews</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex mt ai-center sm-gap">
            <div className="ball" />
            <div>
              <div className="flex ai-center xsm-gap">
                <FaStar size={15} color="#347ce1" />
                <p className="sm">4.5</p>
              </div>
              <p className="title">Value</p>
            </div>
          </div>
          <div className="flex mt ai-center sm-gap">
            <div className="ball" />
            <div>
              <div className="flex ai-center xsm-gap">
                <FaStar size={15} color="#347ce1" />
                <p className="sm">4.3</p>
              </div>
              <p className="title">Accuracy</p>
            </div>
          </div>
          <div className="flex mt ai-center sm-gap">
            <div className="ball" />
            <div>
              <div className="flex ai-center xsm-gap">
                <FaStar size={15} color="#347ce1" />
                <p className="sm">4.4</p>
              </div>
              <p className="title">Cleanliness</p>
            </div>
          </div>
          <div className="flex mt ai-center sm-gap">
            <div className="ball" />
            <div>
              <div className="flex ai-center xsm-gap">
                <FaStar size={15} color="#347ce1" />
                <p className="sm">4.3</p>
              </div>
              <p className="title">Location</p>
            </div>
          </div>
          <div className="flex mt ai-center sm-gap">
            <div className="ball" />
            <div>
              <div className="flex ai-center xsm-gap">
                <FaStar size={15} color="#347ce1" />
                <p className="sm">4.5</p>
              </div>
              <p className="title">Communication</p>
            </div>
          </div>
        </div>
      </div>
      <Review />
    </Container>
  );
};

export default SingleUnit;
