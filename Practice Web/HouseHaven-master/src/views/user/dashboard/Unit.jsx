import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineArrowsPointingOut } from "react-icons/hi2";
import { IoFilter } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineBed } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
/* eslint-disable react/prop-types */
import React from "react";
import { RxBookmark } from "react-icons/rx";
import { fetchUnitImage } from "../../../requests";
import styled from "styled-components";
import { useGetAllUnitsQuery } from "../../../app/api/api";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  margin-top: 30px;
  .heading {
    display: flex;
    color: #43799c;
    p {
      font-size: 19px;
    }
  }
  button {
    height: 35px;
    width: 35px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #dbeffd;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #d0d7de;
    border-radius: 40px;
    min-width: 100px;
    text-align: center;
    cursor: pointer;
    p {
      font-weight: 700;
    }
  }
`;

const SingleUnit = styled.div`
  height: 380px;
  background: #ccc;
  border-radius: 7px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  position: relative;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 7px;
    position: absolute;
    left: 0;
  }

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 6px;
  }

  .location {
    position: absolute;
    z-index: 99;
    border-radius: 27px;
    top: 20px;
    left: 20px;
    padding: 6px 9px;
    background-color: #faf8f8;
    font-size: 14px;
    gap: 4px;
  }

  .details {
    padding: 20px;
    background-color: #faf8f8;
    width: 90%;
    position: absolute;
    z-index: 99;
    border-radius: 7px;
    bottom: 20px;
    transform: translate(-50%, 0%);
    left: 50%;
    min-height: 140px;

    h3 {
      color: #3778e9;
      font-weight: bold;
    }

    .tile {
      background-color: #e9e9f3;
      padding: 9px 10px;
      border-radius: 50px;

      h4 {
        font-size: 14px;
      }
    }

    .action {
      margin-top: 9px;
    }
  }
`;

const UnitContainer = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const SmallText = styled.p`
  font-size: 15px;
  line-height: 1.25rem;
  color: rgb(107 114 128);
  margin: 3px 0;
`;

const Unit = () => {
  // eslint-disable-next-line no-unused-vars
  const { data, isLoading } = useGetAllUnitsQuery();
  const units = data?.results.items || [];

  return (
    <Container>
      <div className="heading ai-center xsm-gap">
        <p>Unit Listing</p>
        <BiInfoCircle />
      </div>

      <div className="flex ai-center justify-between">
        <div>
          <TabContainer>
            <div className="tab xsm-gap">
              <p>All </p>
              (200)
            </div>
            <div className="tab xsm-gap">
              <p>Apartment </p>
              (50)
            </div>
            <div className="tab xsm-gap">
              <p>House </p>
              (30)
            </div>
            <div className="tab xsm-gap">
              <p>Duplex </p>
              (120)
            </div>
          </TabContainer>
        </div>
        <div>
          <button>
            <IoFilter size={22} color="#1c5f92" />
          </button>
        </div>
      </div>

      <UnitContainer>
        {units.map((unit) => (
          <SingleUnitWithImage key={unit.id} unit={unit} />
        ))}
      </UnitContainer>
    </Container>
  );
};

const SingleUnitWithImage = ({ unit }) => {
  const [imageUrl, setImageUrl] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchImage = async () => {
      const url = await fetchUnitImage(unit.PropertyId, unit.id);
      setImageUrl(url);
    };

    fetchImage();
  }, [unit.PropertyId, unit.id]);

  return (
    <SingleUnit
      onClick={() => {
        navigate(`/tenant/unit/${unit.id}`);
      }}
    >
      <div className="location flex ai-center">
        <IoLocationOutline size={16} />
        <p>{unit.location}</p>
      </div>
      {imageUrl && <img src={imageUrl} alt={unit.name} />}
      <div className="backdrop" />
      <div className="details">
        <div className="flex ai-center justify-between">
          <h4 className="title">{unit.name}</h4>
          <RxBookmark size={19} color="#265377" />
        </div>

        <SmallText>{unit.description}</SmallText>
        <div className="flex ai-center sm-gap">
          <div className="tile flex ai-center sm-gap jc-center">
            <MdOutlineBed color="#6c6868" size={18} />
            <h4 className="number">({unit.bedrooms})</h4>
          </div>
          <div className="tile flex ai-center sm-gap jc-center">
            <PiBathtub color="#6c6868" size={18} />
            <h4 className="number">({unit.bathrooms})</h4>
          </div>
          <div className="tile flex ai-center sm-gap jc-center">
            <HiOutlineArrowsPointingOut color="#6c6868" size={15} />
            <h4 className="number">({unit.area})</h4>
          </div>
        </div>

        <div className="flex ai-center justify-between action">
          <h3>{unit.rent}/year</h3>
          {/* <div>B</div> */}
        </div>
      </div>
    </SingleUnit>
  );
};

export default Unit;
