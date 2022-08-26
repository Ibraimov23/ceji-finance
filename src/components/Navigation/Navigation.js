import React, { useState } from "react";
import Logo from "../../assets/imgs/logo.png";
import styled from "styled-components";
import { ReactComponent as Burger } from "../../assets/svg/burger.svg";
import { useTranslation } from "react-i18next";
import {$} from "jquery";
const StyledNavContainer = styled.div`
  max-width: 1200px;
  margin: auto;
  @media (max-width: 1300px) {max-width: 1150px;}
  @media (max-width: 1200px) {max-width: 1100px;}
`;
const StyledHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledHeaderBlock = styled.div``;
const StyledHeaderLogo = styled.div`
  @media (max-width: 1128px) {
      display: none;
  } 
`;

const StyledHeaderNavMenu = styled.nav`
  @media (max-width: 1128px) {
      display: none;
  } 
`;
const StyledNavBurger = styled.div`
    position: relative;
    width: 28px;
    height: 25px;
    &:before, &:after {
      content: '';
      background-color: #70BF50;
      position: absolute;
      width: 100%;
      height: 3px;
      z-index: 4;
      left: 0px;
      transition: all 0.3s ease 0s;
    }
    &.active:before {transform: rotate(48deg);top: 12px; width: 100%;}
    &.active:after {transform: rotate(-48deg);bottom: 10px;}
    &.active:before, &.active:after{height: 2px;}
    &.active span{transform: scale(0);}
    &:before {top: 10px; width: 62.5%;}
    &:after {bottom: 0px;}
    span {
      background-color: #70BF50;
      position: absolute;
      left: 0px;
      width: 100%;
      height: 3px;
      top: -1px;
      z-index: 4;
      transition: all 0.3s ease 0s;
    }
`;
const StyledNavBurgerMenu = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: -100%;
  width: 50%;
  background-color: #101829;
  border-bottom-right-radius: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.25);
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  background-size: cover;
  z-index: 3;
  padding-top: 75px;
  transition: all 0.3s ease 0s;
  &.active {left: 0px}
  .nav-items{padding-top: 24px;padding-left:16px;padding-bottom: 9px;}
  .nav-items .nav-item{padding-bottom:16px;}
  .nav-items .nav-item a{
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #FFFFFF;
    text-decoration: none;
  }
  .nav-items .nav-item .select__row {
    position: absolute;
    background: #21321A;
    height: 32px;
    width: 99.8%;
    left: 1px;
    z-index: -1;
  }
  .nav-items .nav-item .select__item {color: #70BF50;}
`;
const StyledHeaderNavItems = styled.ul`
  display: flex;
  gap: 48px;
`;
const StyledHeaderNavItem = styled.li`
  list-style: none;
`;
const StyledHeaderNavItemA = styled.a`
  font-family: 'Gilroy';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 27px;
  color: #FFFFFF;
  text-decoration: none;
`;
const StyledHeaderNavMobile = styled.div`
  display: none;
  @media (max-width: 1128px) {
    display: block;
  } 
`;

export const Navigation = ({ handleBurgerClick }) => {
  const { t } = useTranslation();
  const burger = () => {
    $('.nav-burger,.burger-menu').toggleClass('active');
  }
  return (
    <header>
        <StyledNavContainer>
            <StyledHeaderContent>
                <StyledHeaderBlock>
                    <StyledHeaderNavMenu>
                        <StyledHeaderNavItems>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="https://ceji.io">Main</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="https://https://www.ceji.io/#comp-l2y9h6a7">About</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="https://https://www.ceji.io/#comp-l2y9h38c">OverView</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="https://https://www.ceji.io/#comp-l2ya4nxv">Token</StyledHeaderNavItemA></StyledHeaderNavItem>
                        </StyledHeaderNavItems>
                    </StyledHeaderNavMenu>
                    <StyledHeaderNavMobile>
                        <StyledNavBurger className="nav-burger" onClick={() => burger()}>
                            <span></span>
                        </StyledNavBurger>
                        <StyledNavBurgerMenu className="burger-menu">
                            <ul class="nav-items">
                                <li class="nav-item"><a href="https://ceji.io">Main</a></li>
                                <li class="nav-item"><a href="https://https://www.ceji.io/#comp-l2y9h6a7">About</a></li>
                                <li class="nav-item"><a href="https://https://www.ceji.io/#comp-l2y9h38c">OverView</a></li>
                                <li class="nav-item"><a href="https://https://www.ceji.io/#comp-l2ya4nxv">Token</a></li>
                                <li class="nav-item"><div className="select__row"></div><a className="select__item" href="#">Finance</a></li>
                                <li class="nav-item"><a href="https://https://www.ceji.io/#comp-l2yb5ayz">Platform</a></li>
                                <li class="nav-item"><a href="https://https://www.ceji.io/#comp-l2ybxf1k">RoadMap</a></li>
                                <li class="nav-item"><a href="https://https://www.ceji.io/#comp-l2ydt2k1">Team</a></li>
                            </ul>
                        </StyledNavBurgerMenu>
                    </StyledHeaderNavMobile>
                </StyledHeaderBlock>
                <StyledHeaderLogo>
                    <StyledHeaderNavMenu><a href="https://ceji.io"><img src={Logo} height="50" /></a></StyledHeaderNavMenu>
                </StyledHeaderLogo>
                <StyledHeaderBlock>
                    <StyledHeaderNavMenu>
                        <StyledHeaderNavItems>
                            <StyledHeaderNavItem><StyledHeaderNavItemA className="header__nav-item_select" href="#">Finance</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="https://https://www.ceji.io/#comp-l2yb5ayz">Platform</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="https://https://www.ceji.io/#comp-l2ybxf1k">RoadMap</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="https:://https://www.ceji.io/#comp-l2ydt2k1">Team</StyledHeaderNavItemA></StyledHeaderNavItem>
                        </StyledHeaderNavItems>
                    </StyledHeaderNavMenu>
                    <StyledHeaderNavMobile><img src={Logo} height="32" /></StyledHeaderNavMobile>
                </StyledHeaderBlock>
            </StyledHeaderContent>
        </StyledNavContainer>
    </header>
  );
};
