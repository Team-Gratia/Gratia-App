/* eslint-disable react/prop-types */

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdAdd, MdRemove } from "react-icons/md";
import {
  useGetPropertiesQuery,
  useGetPropertyImagesQuery,
  useUploadPropertyImagesMutation,
} from "../../../app/api/api";

import Button from "../../../components/Button";
import { FaFileAlt } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import { Loader } from "../../../components";
import React from "react";
import { getPropertyImage } from "../../../requests";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const ImagePicker = styled.div`
  /* height: 30px; */
  width: 210px;
  padding: 18px 10px;
  border: 2px dashed #e2eef4;
  border-radius: 4px;
  background: #f1f3f6;
  position: relative;
  margin-top: 15px;

  p {
    font-size: 15px;
    color: rgb(107 114 128);
  }
  input {
    opacity: 0;
    height: 100%;
    position: absolute;
    width: 100%;
  }
`;

const SmallText = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-top: 0.25rem;
  color: rgb(107 114 128);
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 950px;
  overflow: hidden;
  /* margin: auto; */
`;

const Slide = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const SlideItem = styled.div`
  min-width: 300px;
  margin: 10px;

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

const Images = ({ setActiveTab }) => {
  //
  const [fileInputs, setFileInputs] = React.useState([{ id: 1, file: null }]);

  const [imageUrls, setImageUrls] = React.useState([]);

  const { id } = useParams();
  const { data: propertyData } = useGetPropertiesQuery();

  const properties = propertyData?.properties || [];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const property = properties.find((prop) => prop.id === Number(id));

  const [uploadPropertyImages, { isLoading }] =
    useUploadPropertyImagesMutation();

  const { data } = useGetPropertyImagesQuery(id);

  const images = React.useMemo(() => {
    return data?.images || [];
  }, [data]);

  React.useEffect(() => {
    const fetchImageBuffer = async (imageId) => {
      try {
        const response = await getPropertyImage(id, imageId); // Assuming getPropertyImage is your API function to fetch image data
        return response.data; // Assuming response.data contains the image buffer
      } catch (error) {
        console.error(`Error fetching image with ID ${imageId}:`, error);
        return null; // Handle error or return appropriate default value
      }
    };

    const fetchImages = async () => {
      if (images.length > 0) {
        const promises = images.map(async (image) => {
          const buffer = await fetchImageBuffer(image.id);
          if (buffer) {
            return {
              id: image.id,
              url: URL.createObjectURL(new Blob([buffer])),
            };
          } else {
            return { id: image.id, url: null }; // Handle case where image fetch fails
          }
        });
        const fetchedImages = await Promise.all(promises);
        setImageUrls(fetchedImages.filter((image) => image.url !== null)); // Filter out images with failed fetch
      }
    };

    fetchImages();
  }, [images, id]);

  const handleAddFileInput = () => {
    if (fileInputs.length < 5) {
      const newId = fileInputs.length + 1;
      setFileInputs([...fileInputs, { id: newId, file: null }]);
    }
  };

  const handleRemoveFileInput = (id) => {
    if (fileInputs.length > 1) {
      const filteredInputs = fileInputs.filter((input) => input.id !== id);
      setFileInputs(filteredInputs);
    }
  };

  const handleFileChange = (event, id) => {
    const updatedInputs = fileInputs.map((input) =>
      input.id === id ? { ...input, file: event.target.files[0] } : input
    );
    setFileInputs(updatedInputs);
  };

  const handleUploadImages = async () => {
    // Check if at least one image is selected
    const selectedImages = fileInputs.filter((input) => input.file !== null);
    if (selectedImages.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    selectedImages.forEach((input) => {
      formData.append(`images`, input.file);
    });

    await uploadPropertyImages({ formData, id }).unwrap();
    setFileInputs([{ id: 1, file: null }]);
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < Math.ceil(imageUrls.length / 3) - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h4 className={id && "mb"}>{property?.name || "Your"} Images</h4>
      {!id && (
        <>
          <SmallText>Add unit before uploading images</SmallText>
          <Button
            onClick={() => setActiveTab(1)}
            containerStyles={{
              marginTop: "15px",
            }}
          >
            ADD PROPERTY
          </Button>
        </>
      )}
      {/* IMAGE SLIDER */}
      <SliderContainer>
        <ArrowButton
          direction="left"
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
        >
          <FaChevronLeft />
        </ArrowButton>
        <Slide currentIndex={currentIndex}>
          {imageUrls.map((imageUrl) => (
            <SlideItem key={imageUrl.id}>
              <img src={imageUrl.url} alt={`Image ${imageUrl.id}`} />
            </SlideItem>
          ))}
        </Slide>

        <ArrowButton
          direction="right"
          onClick={handleNextClick}
          disabled={currentIndex === Math.ceil(imageUrls.length / 3) - 1}
        >
          <FaChevronRight />
        </ArrowButton>
      </SliderContainer>

      {/* IMAGE INPUT */}
      {id &&
        fileInputs.map((input, index) => {
          return (
            <div key={input.id}>
              <div className="flex ai-center lg-gap">
                <ImagePicker className="flex sm-gap ai-center">
                  <input
                    id={`file-upload-${input.id}`}
                    type="file"
                    onChange={(e) => handleFileChange(e, input.id)}
                  />
                  <ImUpload size={20} color="#7bb7f2" />
                  <p>Click here to upload</p>
                </ImagePicker>
                {input.file && (
                  <>
                    <div
                      className="mt"
                      style={{
                        minWidth: "100px",
                      }}
                    >
                      <div
                        style={{
                          marginLeft: "-4px",
                        }}
                      >
                        <FaFileAlt size={30} color="#7da4cb" />
                      </div>
                      <p
                        style={{
                          color: "rgb(107 114 128)",
                          fontSize: "11px",
                          marginTop: "-1px",
                        }}
                      >
                        {input.file.name}
                      </p>
                    </div>
                  </>
                )}
              </div>
              {index === fileInputs.length - 1 && (
                <div>
                  <Button
                    sec
                    icon
                    onClick={() => handleRemoveFileInput(input.id)}
                    containerStyles={{
                      marginTop: "10px",
                      background: "",
                      // padding: "10px 15px",
                      color: "",
                    }}
                  >
                    <MdRemove size={17} />
                  </Button>
                  <Button
                    sec
                    onClick={handleAddFileInput}
                    containerStyles={{
                      marginTop: "10px",
                      // padding: "10px 15px",
                    }}
                  >
                    <MdAdd size={17} />
                  </Button>
                </div>
              )}
            </div>
          );
        })}

      {id && (
        <Button
          onClick={handleUploadImages}
          containerStyles={{
            marginTop: "30px",
            padding: "15px 10px",
            fontSize: "15px",
          }}
        >
          UPLOAD IMAGES
        </Button>
      )}
    </div>
  );
};

export default Images;
