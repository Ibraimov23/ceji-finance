import React from "react";
import styled from "styled-components";
import { NavigationItem } from "../Navigation-item/Navigation-item";
import { useTranslation } from "react-i18next";
import { ReactComponent as NavDevider } from "../../assets/svg/nav-devider.svg";
import Logo from "../../assets/imgs/logo.png";
import { LangSelector } from "../Lang-selector/Lang-selector";
const StyledCopyright = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.02em;
  color: #817499;
`;
const StyledNavDevider = styled(NavDevider)`
  margin: 0 16px;
`;
const StyledFooterMenuContainer = styled.div`
  margin: 0 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`;
const StyledFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 1200px) {
    flex-direction: column;
  }
  
`;
const StyledFooterLogo = styled.div`
  display: block;
  p {
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.9);
    padding-top: 49px;
  }
  @media (max-width: 1200px) {
    margin: auto;
    text-align: center;
    img {width: 146px;height: 46px;}
    p {font-size: 15px;padding-top: 15px;}
  } 
`;
const StyledFooterContent = styled.div`
  display: flex;
  gap: 150px;
  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 23px 70px 0px 16px;
    gap: 20px;
  } 
`;
const StyledFooterBlock = styled.div`
  p {
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 700;
    font-size: 35px;
    line-height: 42px;
    color: rgba(255, 255, 255, 0.9);
  }
  @media (max-width: 1200px) {
    p{font-size: 25px;}
  } 
`;
const StyledFooterUl = styled.ul`
  display: block;
  padding-top: 15px;
  li{list-style: none;padding-bottom:9px;}
  li a {
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 18px;
    color: rgba(255, 255, 255, 0.85);
  }
  @media (max-width: 1200px) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding-top: 0px;
    li{padding-bottom:0px;}
    li a{font-size: 15px;}
  } 
`;

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <StyledFooterContainer>
          <StyledFooterLogo>
              <img src={Logo} />
              <p>Tel. 070-7797-7435</p>
          </StyledFooterLogo> 
          <StyledFooterContent>
              <StyledFooterBlock>
                  <p>Contact</p>
                  <StyledFooterUl>
                      <li><a href="https://ceji.io">Main</a></li>
                      <li><a href="https://https://www.ceji.io/#comp-l2y9h6a7">About</a></li>
                      <li><a href="https://https://www.ceji.io/#comp-l2y9h38c">OverView</a></li>
                      <li><a href="https://#">EcoSystem</a></li>
                      <li><a href="https://https://www.ceji.io/#comp-l2ya4nxv">Token</a></li>
                      <li><a href="https://https://www.ceji.io/#comp-l2yb5ayz">Platform</a></li>
                      <li><a href="https://https://www.ceji.io/#comp-l2ybxf1k">RoadMap</a></li>
                      <li><a href="https://https://www.ceji.io/#comp-l2ydt2k1">Team</a></li>
                  </StyledFooterUl>
              </StyledFooterBlock>
              <StyledFooterBlock>
                  <p>Docs</p>
                  <StyledFooterUl>
                      <li><a>White Paper ( KR )</a></li>
                      <li><a>White Paper ( EN )</a></li>
                  </StyledFooterUl>
              </StyledFooterBlock>
              <StyledFooterBlock>
                  <p>Contact Us</p>
                  <StyledFooterUl>
                      <li><a>no1business@hanmail.net</a></li>
                      <li><a>Twitter</a></li>
                      <li><a>Telegram</a></li>
                      <li><a>Kakao</a></li>
                      <li><a>Cafe</a></li>
                  </StyledFooterUl>
              </StyledFooterBlock>
          </StyledFooterContent>
    </StyledFooterContainer>
  );
};
