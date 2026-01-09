import { FaLandmark, FaPeopleGroup } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { PiHouseLineFill, PiMoneyWavyBold } from "react-icons/pi";
import React, { Suspense, lazy } from "react";

import { BiSolidDashboard } from "react-icons/bi";
import { IoBusinessSharp } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { RiHandCoinFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import styled from "styled-components";

const Button = lazy(() => import("./Button"));

const Container = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #fdfeff;

  a {
    text-decoration: none;
  }
`;

const SidebarContainer = styled.div`
  padding: 12px 9px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 8px;
  .link {
    font-size: 13px;
    color: #636363;
    margin-left: 8px;
    text-decoration: none;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &.active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const SmallTitle = styled.div`
  text-transform: uppercase;
  color: #a6acb7;
  margin: 20px 0;
  font-size: 13px;
`;

const routes = [
  {
    id: "Company",
    links: [
      {
        id: 1,
        name: "Business Information",
        icon: <IoBusinessSharp size={13} color="#636363" />,
        link: "/business",
      },
      {
        id: 2,
        name: "Landlords",
        icon: <PiHouseLineFill size={13} color="#636363" />,
        link: "/landlord",
      },
      {
        id: 3,
        name: "Properties",
        icon: <FaLandmark size={13} color="#636363" />,
        link: "/property",
      },
      {
        id: 4,
        name: "Tenants",
        icon: <FaPeopleGroup size={13} color="#636363" />,
        link: "/tenants",
      },
      {
        id: 5,
        name: "Rents",
        icon: <PiMoneyWavyBold size={13} color="#636363" />,
        link: "/rent",
      },
    ],
  },
  {
    id: "Profile",
    links: [
      {
        id: 1,
        name: "Manage Agents",
        icon: <MdSupportAgent size={13} color="#636363" />,
        link: "/agents",
      },
      {
        id: 2,
        name: "Customers",
        icon: <RiHandCoinFill size={13} color="#636363" />,
        link: "/customer",
      },
      {
        id: 3,
        name: "Reports",
        icon: <TbReportAnalytics size={13} color="#636363" />,
        link: "/reports",
      },
    ],
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Button
          onClick={() => {
            navigate("/landlord");
          }}
          containerStyles={{
            marginTop: "15px",
          }}
        >
          Add Property
        </Button>
      </Suspense>

      <SidebarContainer
        as={NavLink}
        to="/dashboard"
        activeClassName="active"
        className="mt flex xsm-gap ai-center"
      >
        <BiSolidDashboard size={13} color="#636363" />
        <div className="link">Dashboard</div>
      </SidebarContainer>

      {routes.map((route) => (
        <div key={route.id}>
          <SmallTitle>{route.id}</SmallTitle>
          {route.links.map((link) => (
            <SidebarContainer
              as={NavLink}
              to={link.link}
              key={link.id}
              activeClassName="active"
              className="flex xsm-gap ai-center"
            >
              {link.icon && link.icon}
              <div className="link">{link.name}</div>
            </SidebarContainer>
          ))}
        </div>
      ))}
    </Container>
  );
};

export default Sidebar;
