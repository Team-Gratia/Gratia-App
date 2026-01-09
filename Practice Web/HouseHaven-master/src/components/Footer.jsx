import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  padding: 20px 0;
  /* border-top: 1px solid #e7e7e7; */
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background-color: #fdfeff;
`;

const FooterSection = styled.div`
  margin: 10px;
`;

const FooterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const FooterLink = styled.a`
  display: block;
  color: #6c757d;
  margin-bottom: 5px;
  text-decoration: none;
  &:hover {
    color: #495057;
    text-decoration: underline;
  }
`;

const FooterText = styled.p`
  color: #6c757d;
  font-size: 0.9rem;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialIcon = styled.a`
  color: #6c757d;
  font-size: 1.5rem;
  margin: 0 10px;
  text-decoration: none;
  &:hover {
    color: #495057;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSection></FooterSection>
    </FooterContainer>
  );
};

export default Footer;
