/* eslint-disable react/prop-types */
import React from "react";
import { getBusinessLogo } from "../requests";
import styled from "styled-components";

const Avi = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 18px;
  }
`;

const Image = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;

  ${(prop) =>
    prop.big &&
    `
      height: 90px;
      width: 90px;

  `}
`;

const Profile = ({ big, avi, name }) => {
  const [logoUrl, setLogoUrl] = React.useState("");

  React.useEffect(() => {
    const fetchLogo = async () => {
      const response = await getBusinessLogo();
      const logoBlob = new Blob([response.data]);
      setLogoUrl(URL.createObjectURL(logoBlob));
    };
    fetchLogo();
  }, []);

  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word[0]).join("");
    return initials.toUpperCase();
  };

  if (avi || !logoUrl) {
    return (
      <div className="flex ai-center sm-gap">
        <Avi>{name && <p>{getInitials(name)}</p>}</Avi>
        <p>{name}</p>
      </div>
    );
  }

  if (logoUrl) {
    return (
      <div>
        <Image
          big={big}
          src={logoUrl}
          alt="Business Logo"
          style={{ maxWidth: "100px" }}
        />
      </div>
    );
  }
};

export default Profile;
