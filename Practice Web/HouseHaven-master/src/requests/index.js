const baseUrl = "http://localhost:4005/api/v1";

import axios from "axios";

const getBusinessLogo = async (id = 1) => {
  return axios.get(`${baseUrl}/business/${id}/logo`, {
    responseType: "arraybuffer",
  });
};

const getPropertyImage = async (id, imgId) => {
  return axios.get(`${baseUrl}/property/${id}/image/${imgId}`, {
    responseType: "arraybuffer",
  });
};

const fetchUnitImage = async (id, imgId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/property/${id}/image/${imgId}`,
      {
        responseType: "arraybuffer",
      }
    );
    const imageBlob = new Blob([response.data], { type: "image/jpeg" });
    const imageUrl = URL.createObjectURL(imageBlob);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching unit image:", error);
    return null;
  }
};

export { getBusinessLogo, getPropertyImage, fetchUnitImage };
