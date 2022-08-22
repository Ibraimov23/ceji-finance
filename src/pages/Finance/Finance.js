import React, { useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ReactComponent as HeaderDevider } from "../../assets/svg/metoshi-underline.svg";
import { StakeItem} from "../../components/StakeItem/Stake-item";

const StyledHeader = styled.p`
  font-family: 'Gilroy';
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 60px;
  color: #70BF50;
  text-align: center;
  position: relative;
`;
const StyledBlock = styled.div`
  background: linear-gradient(89.93deg, #121C32 9.67%, #0C1322 50.9%, #131D32 94.17%);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  height: 172px;
  position: absolute;
  right: 0;
  left: 0;
  z-index: -1;
`;
const StyledStaking = styled.p`
  font-family: 'GrandHotel';
  font-style: normal;
  font-weight: 400;
  font-size: 35px;
  line-height: 48px;
  color: #FFFFFF;
  position: absolute;
  right: -25px;
`;
const StyledArrowBack = styled.p`
  color: #fff;
  display: flex;
  align-items: center;
`;
const StyledSectionContainer = styled.div`
  max-width: 1150px;
  margin: 0 auto;
`;
const StyledHeaderContainer = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  margin-top: 44.33px;
  @media (max-width: 600px) {
    display: flex;
  } 
`;
const StyledBlockContainer = styled.div`
  display: block;
  margin-top: 85px;
  @media (max-width: 600px) {
    display: none;
  } 
`;
const StyledStakeItemContainer = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;
const StyledStakeItemContainer2 = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 32px;
  align-items: flex-start;
`;

const StyledHeaderDevider = styled(HeaderDevider)`
  @media (max-width: 875px) {
    display: none;
  } 
`;

export const Finance = ({
    onUseConnection,
    account,
    onStake,
    onWindraw,
    onStakeV2,
    onStakeV3,
    onStakeV4,
    needToApprove,
    update,
    provider
}) => {
    const { t } = useTranslation();
    
    const handleUseConnection = useCallback(() => {
        onUseConnection();
    }, [ onUseConnection ])

    const handleWindraw = useCallback(() => {
      onWindraw();
 }, [ onWindraw ])

     const handleStake = useCallback(() => {
         onStake();
    }, [ onStake ])

     const handleStake2 = useCallback(() => {
         onStakeV2();
   }, [ onStakeV2 ])
   const handleStake3 = useCallback(() => {
    onStakeV3();
}, [ onStakeV3 ])
const handleStake4 = useCallback(() => {
  onStakeV4();
}, [ onStakeV4 ])

    return (
        <StyledSectionContainer>
            <StyledHeaderContainer>
                <StyledHeader>
                    Finance <StyledStaking>Staking</StyledStaking>
                </StyledHeader>
            </StyledHeaderContainer>
            <StyledBlockContainer>
                    <StyledBlock></StyledBlock>  
            </StyledBlockContainer>
            <StyledStakeItemContainer>
                <StakeItem
                    key="1"
                    version="1"
                    earnedText="CEJI"
                    activeButton={false}
                    onUseConnection={ handleUseConnection }
                    account={ account }
                    onStake={ handleStake }
                    onWindraw={handleWindraw}
                    needToApprove={ needToApprove }
                    update={ update }
                    provider={ provider }
                />
                <StakeItem
                    key="2"
                    version="2"
                    earnedText="CEJI"
                    activeButton={false}
                    onUseConnection={ handleUseConnection }
                    account={ account }
                    onStake={ handleStake2 }
                    needToApprove={ needToApprove }
                    update={ update }
                    provider={ provider }
                />
            </StyledStakeItemContainer>
            <StyledStakeItemContainer2>
            <StakeItem
                    key="3"
                    version="3"
                    earnedText="CEJI"
                    activeButton={false}
                    onUseConnection={ handleUseConnection }
                    account={ account }
                    onStake={ handleStake3 }
                    needToApprove={ needToApprove }
                    update={ update }
                    provider={ provider }
                />
            </StyledStakeItemContainer2>
        </StyledSectionContainer>
    );
};
