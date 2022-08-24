import React, { useState } from "react";
import Logo from "../../assets/imgs/logo.png";
import styled from "styled-components";
import { ReactComponent as Burger } from "../../assets/svg/burger.svg";
import { useTranslation } from "react-i18next";

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
  @media (max-width: 600px) {
      display: none;
  } 
`;

const StyledHeaderNavMenu = styled.nav`
  @media (max-width: 600px) {
      display: none;
  } 
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
  @media (max-width: 600px) {
    display: block;
  } 
`;

export const Navigation = ({ handleBurgerClick }) => {
  const { t } = useTranslation();
  return (
    <header>
        <StyledNavContainer>
            <StyledHeaderContent>
                <StyledHeaderBlock>
                    <StyledHeaderNavMenu>
                        <StyledHeaderNavItems>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="">Main</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="">About</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="">OverView</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="">Token</StyledHeaderNavItemA></StyledHeaderNavItem>
                        </StyledHeaderNavItems>
                    </StyledHeaderNavMenu>
                    <StyledHeaderNavMobile>
                          <Burger />
                    </StyledHeaderNavMobile>
                </StyledHeaderBlock>
                <StyledHeaderLogo>
                    <StyledHeaderNavMenu><img src={Logo} height="50" /></StyledHeaderNavMenu>
                </StyledHeaderLogo>
                <StyledHeaderBlock>
                    <StyledHeaderNavMenu>
                        <StyledHeaderNavItems>
                            <StyledHeaderNavItem><StyledHeaderNavItemA className="header__nav-item_select" href="">Finance</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="">Platform</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="">RoadMap</StyledHeaderNavItemA></StyledHeaderNavItem>
                            <StyledHeaderNavItem><StyledHeaderNavItemA href="">Team</StyledHeaderNavItemA></StyledHeaderNavItem>
                        </StyledHeaderNavItems>
                    </StyledHeaderNavMenu>
                    <StyledHeaderNavMobile><img src={Logo} height="32" /></StyledHeaderNavMobile>
                </StyledHeaderBlock>
            </StyledHeaderContent>
        </StyledNavContainer>
    </header>
  );
};
