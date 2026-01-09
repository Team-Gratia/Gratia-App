import { FaBriefcase, FaBuilding, FaLifeRing, FaUser } from "react-icons/fa";

/* eslint-disable react/prop-types */
import Alert from "./Alert";
import Footer from "./Footer";
import { HiHome } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const Container = styled.div`
  .auto {
    width: 1250px;
    margin: auto;
  }
`;

const MainContainer = styled.div`
  position: relative;
  top: 80px;
  min-height: calc(100vh - 80px);

  .full {
    width: 100%;
    background-color: #f8fdff;
    margin-top: 10px;
    border-radius: 5px;
    margin-right: 10px;
  }

  .userPath {
    background-color: #f8fdff;
    width: 100%;
  }
`;

const Icon = styled.div`
  height: 35px;
  width: 35px;
  border: 1px solid #b7b7b7;
  background-color: ${(props) => props.bg || "#3da397"};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
`;

const UserNavbar = styled.div`
  .top {
    background-color: #24263e;
    padding: 13px 0;
    p {
      color: #fff;
    }
  }

  .bottom {
    /* padding: 22px; */
    .link-container {
      width: 1250px;
      margin: auto;
    }

    border-bottom: 1px solid #efeeee;

    .link {
      /* margin-left: 28px; */
      margin: 10px;
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: #505a68;

      &:hover {
        border-radius: 4px;
        background: #eaeaea; /* Change text color on hover */
      }
    }
  }
`;

const Main = ({ children }) => {
  const userPath = !true;
  const name = "Abolaji Ade-Ajayi";

  const getInitials = (fullName) => {
    const namesArray = fullName.split(" ");
    const initials = namesArray.map((name) => name.charAt(0)).join("");
    return initials;
  };

  const links = [
    {
      id: 1,
      name: "Dashboard",
      icon: <HiHome color="#505A68" />,
      link: "/tenant/dashboard",
    },
    {
      id: 2,
      name: "Profile",
      icon: <FaUser color="#505A68" />,
      link: "/tenant/profile",
    },
    {
      id: 3,
      name: "Apartments",
      icon: <FaBuilding color="#505A68" />,
      link: "/tenant/apartments",
    },
    {
      id: 4,
      name: "Employment",
      icon: <FaBriefcase color="#505A68" />,
      link: "/tenant/employment",
    },
    {
      id: 5,
      name: "Support",
      icon: <FaLifeRing color="#505A68" />,
      link: "/tenant/support",
    },
  ];

  if (userPath) {
    return (
      <Container>
        <UserNavbar>
          <div className="top">
            <div className="flex justify-between auto ai-center">
              <div>
                <Logo dark />
              </div>
              <div className="flex ai-center sm-gap">
                <Icon bg="">{getInitials(name)}</Icon>
                <p>{name}</p>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="link-container flex lg-gap">
              {links.map((link) => (
                <Link key={link.id} to={link.link} className="link">
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </UserNavbar>
        <div className="auto">{children}</div>
      </Container>
    );
  }
  return (
    <div>
      <Navbar />
      <MainContainer className="flex flex-col">
        <Alert />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="p full">{children}</div>
        </div>
        <div>
          <Footer />
        </div>
      </MainContainer>
    </div>
  );
};

export default Main;
