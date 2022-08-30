import React, { useCallback, useState, useImperativeHandle, useEffect } from "react";
import styled from "styled-components";
import HelpIcon from "../../assets/imgs/help-icon.png";
import { useTranslation } from "react-i18next";
import { SC } from '../../SmartContracts';
import '../../index.css';
import CloseIcon from '../../assets/imgs/close.png';

const StyledStakeItemContainer = styled.div`
  min-width: 450px;
  max-width: 500px;
  z-index: 10;
  background: #131D32;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 18px;
  box-sizing: border-box;
  padding: 49px 34px 31px 34px;
  @media (max-width: 600px) {
    min-width: 270px;
    max-width: 270px;
    border-radius: 37px;
    padding-right: 17px;
    padding-left: 17px;
    padding-top: 26px;
    padding-bottom: 29px;
  }
`;
const StyledStakeItem = styled.div`
  margin-bottom: 72px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 40px;
  padding: 21px 23px 21px 23px;
  @media (max-width: 600px) {
    padding: 11px;
    margin: auto;
    margin-bottom: 52px;
  }
`;


const StyledStakeItemHeader = styled.div`
  display: flex;
  gap: 21px;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 55px;
  p {
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 700;
    font-size: 37px;
    line-height: 45px;
    color: #70BF50;
    animation: glow 1s ease-in-out infinite alternate;
    text-align: center;
  }
  @keyframes glow {
    from {
      text-shadow: 0 0 50px #70bf50;
    }
    
    to {
      text-shadow: 0 0 50px #70bf50;
    }
  }
  @media (max-width: 600px) {
    gap 5px;
    margin-bottom: 0px;
    p{
      font-size: 30px;
      line-height: 36px;
    }
  }
`;

const StyledStakeItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  p,span {
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    color: rgba(255, 255, 255, 0.9);
  }
  @media (max-width: 600px) {
    margin-top: 20px;
    p,span {font-size: 17px;}
  }
`;

const StyledFarmingItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  p,span {
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    color: rgba(255, 255, 255, 0.9);
  }
  @media (max-width: 600px) {
    margin-top: 8px;
    p,span {font-size: 17px;}
  }
`;

const StyledStakeItemRowWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 36px;
  @media (max-width: 600px) {
    margin-top: 5px;
  }
`;
const StyledStakeItemRowWithButton2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  @media (max-width: 600px) {
    margin-top: 9px;
  }
`;
export const StyledStakeItemBuy = styled.a`
    cursor: pointer;
    display: -webkit-box;
    border-radius: 12px;
    letter-spacing: 0.02em;
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s;
    padding: 2vh 2vh 2vh 3vh;
  ${(props) =>
        props.activeButton &&
        "background: linear-gradient(83.53deg, #B114FF 0, #B114FF 24.77%, #FF1493 100.89%);"}
  ${(props) =>
        props.activeButton &&
        "&:hover { background-position: left center; background-size: 200%;}"}
    
  img {
    margin-left: 12px;
  }
  &:hover {
    background-position: right center;
  }
  p {
    display: flex;
    justify-content: center;
    max-width: 20vh;
    min-width: 12vh;
    font-size: 2.55vh;
    color: #fff;
    font-weight: 500;
    margin: auto;
  }
`;

export const StyledStakeItemButton = styled.a`
    cursor: pointer;
    display: flex;
    background: rgba(83, 83, 83, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 8px;
    -webkit-transition-duration: 0.2s;
    justify-content: center;
    transition-duration: 0.2s;
    padding: 15px 0px 16px 0px;
    width: 169px;
    
    span {
      font-family: 'Gilroy';
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 18px;
      color: rgba(255, 255, 255, 0.9);
    }
    @media (max-width: 600px) {
      width: 86px;
      padding: 8px 0px 9px 0px;
      border-radius: 4px;
      span {font-size: 10px;}
    }

  ${(props) =>
        props.activeButton &&
        "background: linear-gradient(89.96deg, #455B3C 12.11%, #264819 48.63%, #16280F 92.55%);"}
  ${(props) =>
        props.activeButton &&
        "&:hover { background-position: left center; background-size: 200%;}"}
    
  img {
    margin-left: 12px;
  }
  &:hover {
    background-position: right center;
  }
`;
export const StyledStake2ItemButton = styled.a`
    cursor: pointer;
    display: flex;
    padding: 21px 25px;
    background: linear-gradient(89.96deg, #131D32 12.11%, #0C1323 48.63%, #131D32 92.55%);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 8px;
    -webkit-transition-duration: 0.2s;
    justify-content: center;
    transition-duration: 0.2s;
    span {
      font-family: 'Gilroy';
      font-style: normal;
      font-weight: 700;
      font-size: 25px;
      line-height: 30px;
      color: rgba(255, 255, 255, 0.9);
    }
    @media (max-width: 600px) {
      padding: 9px 8px;
      span{font-size: 16px;}
    }
    ${(props) =>
      props.activeButton &&
      "background: linear-gradient(89.96deg, #314077 12.11%, #CBC6BC 92.55%) !important;"}
${(props) =>
      props.activeButton &&
      "&:hover { background-position: left center; background-size: 200%;}"}
`;
const StyledStakeItemTextWithButton = styled.div`
  display: flex;
  flex-direction: column;
  span,p {
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    color: rgba(255, 255, 255, 0.9);
  }
  @media (max-width: 600px) {
    span {
    font-size: 17px;
    }
  }
`;
const StyledFarmingItemEarnedWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
  @media (max-width: 600px) {
     margin-top: 14px;
  }
`;
const StyledAPR = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-right: 6px;
  }
`;
const StyledStakeItemTextWithButton2  = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 36px;
span,p {
  font-family: 'Gilroy';
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 30px;
  color: rgba(255, 255, 255, 0.9);
}
@media (max-width: 600px) {
  margin-top: 27px;
  margin-bottom: 8px;
  span {
  font-size: 17px;
  }
}
`;
const StyledStakeItemAccountId = styled.div`
  margin-top: 25px;
  opacity: .5;
  padding: 5px;
  padding-left: 10px;
  font-weight: 600;
  background: rgba(255, 255, 255, .2);
  border-radius: 7px;
`;
const StyledStakeItemHelp = styled.span`
.i .tooltip{display:none;}
@media (min-width: 1200px) {
.i {
  position: relative;
  top: 2px;
}
.i .tooltip {
  display: none;
  background: #000;
  border-radius: 4px;
  color: #fff;
  padding: 4px 4px 6px;
  position: absolute;
  left: calc(50% - 234px/2);
  font-family: 'Gilroy';
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 23px;
  text-align: center;
  bottom: 38px;
  width: 250px;

color: rgba(255, 255, 255, 0.9);
  }
  .i .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(22.svg);
    vertical-align: top;
    margin-top: 3px;
}
.i:hover   .tooltip {display: block;}
.i .tooltip:before{position:absolute;content:'';left:calc(50% - 4px);bottom:-4px;width:8px;height:4px;background-image: url("data:image/svg+xml,%3Csvg width='8' height='4' viewBox='0 0 8 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.01107 4L8 0H0L4.01107 4Z' fill='black'/%3E%3C/svg%3E%0A");}
@media (max-width: 600px) {
  .i img {
    width: 38px;
  }
}
}
`;
const StyledInfoHelp = styled.div`
.info .info__header .info__header_text,
.info__content__item p,
.info .info__header .info__header_close{display:none}
@media (max-width: 600px) {
  display: none;
  position: fixed;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100vw;
  height: 2000px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 650;
  .info {
    position: relative;
    box-sizing: border-box;
    color: white;
    border-radius: 18px;
    padding: 23px 30px;
    background: unset;
  }
    .info .info__header {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    gap: 5px;
  }
  .info .info__header .info__header_text {
    display: block;
    background: rgb(19, 29, 50);
    -webkit-box-flex: 1;
    flex-grow: 1;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-bottom: 17px;
       p{
          font-family: Gilroy;
          font-style: normal;
          font-weight: 700;
          font-size: 26px;
          line-height: 48px;
          color: rgb(112, 191, 80);
        }
    }
    .info .info__header .info__header_close {
      display: block;
      background: rgb(19, 29, 50);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      padding: 11px;
      width: 30px;
      height: 30px;
    }
    .info__content {
      background: rgb(19, 29, 50);
      padding: 20px 12px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 10px;
    }
    .info__content__item {
      display: flex;
      -webkit-box-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      align-items: center;
      width: 256px;
      padding: 10px 20px;
      border-radius: 8px;
      p{
        display: block;
        font-family: 'Gilroy';
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 26px;
        text-align: center;
        color: rgba(255, 255, 255, 0.9);
        animation: unset;
      }
    }
  }
`;
export const StakeItem = ({
    version,
    earnedText,
    activeButton,
    onUseConnection,
    account,
    onStake,
    onWindraw,
    needToApprove,
    provider
}, ref) => {
    let [ APR, setAPR ] = useState(0);
    let [ Rate, setRate ] = useState(0);
    let [ initialized, setInitialized ] = useState(false);
    let [ approved, setApproved ] = useState(false);
    let [ earned, setEarned ] = useState('-');
    let [ inStake, setInStake ]  = useState('-');
    let [ canHarvest, setCanHarvest ] = useState(false);
    let [ canWithdraw, setCanWithdraw ] = useState(false);
    let [ unlockedReward, setUnlockedReward ] = useState(0);
    let [ available, setAvailable ] = useState(0);
    let [ remaining, setRemaining ] = useState(0);
    let [ availableNft, setAvailableNft ] = useState(0);
    let [ remainingNft, setRemainingNft ] = useState(0);
    let [ balanceNft, setBalanceNft ] = useState(0);
    let [ onClose, setClose ] = useState(false);

    const { t } = useTranslation();

    const handleUseConnection = useCallback(() => {
        onUseConnection();
    }, [ onUseConnection ]);

    const handleStake = useCallback(() => {
        onStake();
    }, [ onStake ])

    const handleClose = useCallback(() => {
      onClose(true);
  }, [ onClose ]);

    const handleWindraw = useCallback(() => {
      onWindraw();
  }, [ onWindraw ])
  
    const harvest = useCallback(async () => {
        if (version === "1") {
          await SC.harvest(account);
        } else if (version === "2") {
          await SC.harvestV2(account);
        }
    }, [ version, account ]);

    const withdraw = useCallback(async () => {
        if (version === "1") {
          handleWindraw();
        } else if (version === "2") {
          await SC.withdrawV2(account, SC.inStakeV2);
        }
    }, [ version, account ]);
    
    

    const claimOshi = useCallback(async () => {
      if (version === "3") {
        await SC.claimOshi(account);
      }
  }, [ version, account ]);



    const updateData = useCallback(async () => {
      let inStakeRaw, earnedRaw, holdingTimeRaw, stackedTimeRaw,unlockReward,inStakeRawV2,availabReward,remainReward,inStakeRawV3,availabNftReward,remainNftReward,balanceNftReward;
      if (version === "1") {
          inStakeRaw = await SC.getInStake(account);
          earnedRaw = await SC.getEarned(account);
          holdingTimeRaw =  await SC.getInHoldTime();
          stackedTimeRaw = await SC.getInStackTime(account);
          setInStake(inStakeRaw);
          setEarned(earnedRaw);
      } else if (version === "2") {
           unlockReward = await SC.getUnlockedRewardV2(account);
           inStakeRawV2 = await SC.getInStakeV2(account);
           earnedRaw = await SC.getEarnedV2(account);
           setInStake(inStakeRawV2);
           setEarned(earnedRaw.toFixed(2));
           setUnlockedReward(unlockReward);
      } else if (version === "3") {
           availabReward = await SC.available(account);
           remainReward = await SC.remaining(account);
           inStakeRawV3 = await SC.getInStakeV3(account);
           setInStake(inStakeRawV3);
           setAvailable(availabReward);
           setRemaining(remainReward);
      } else if (version === "4") {
        availabNftReward = await SC.availableNft(account);
        remainNftReward = await SC.remainingNft(account);
        balanceNftReward = await SC.balanceNft(account);
        setAvailableNft(availabNftReward);
        setRemainingNft(remainNftReward);
        setBalanceNft(balanceNftReward)
       }
        if(version === "1") {
          setCanHarvest(true);
          setCanWithdraw(!(parseInt(inStakeRaw) <= 0) && !(holdingTimeRaw >= (Math.floor(Date.now() / 1000) - stackedTimeRaw)));
        }
        else if(version === "2") {
          setCanHarvest(unlockReward > 0);
          setCanWithdraw(!(parseInt(inStakeRawV2) <= 0));
        }

    }, [ account, version, inStake ]);
    const approve = useCallback(async () => {
        let approval;
        if (version === "1") {
            approval = await SC.approve();
        } else if (version === "2") {
            approval = await SC.approveV2();
        } else if (version === "3") {
            approval = await SC.approveV3();
        } else if (version === "4") {
            approval = await SC.approveV4();
        }
        setApproved(approval);

        updateData();
    }, [ version, updateData ]);
      
    useEffect(() => {  
        (async () => {
            if (account && !approved) {
                if (version === "1") {
                    if (await SC.allowance(account)) return setApproved(true);
                   
                } else if (version === "2") {
                    if (await SC.allowanceV2(account)) return setApproved(true);
                } else if(version === "3") {
                    if (await SC.allowanceV3(account)) return setApproved(true);
                }
                 else if(version === "4") {
                    if (await SC.allowanceV4(account)) return setApproved(true);
                }
              }
        
              if (!initialized && approved) {
                if (version === "1") {
                    setAPR(await SC.APR());
                } else if (version === "2") {
                    setAPR(await SC.APRV2());
                } else if(version == "3") {
                    setRate(await SC.Rate());
                }
                 else if(version == "4") {
                setRate(await SC.RateNft());
                }
                setInitialized(true);
                 setInterval(() => {
                   updateData();
               }, 1000);
               
               }
        })();
    }, [
        initialized,
        setInitialized,
        updateData,
        account, earned, version,
        approved,
        setAPR
    ]);
   
    return (
      <StyledStakeItem>
         {version == "1" || version == "2" ?
        <StyledStakeItemContainer>
          {version == "1" ? <div>
             <StyledStakeItemHeader>
                <p>
                    {t("STAKE.TITLE")}
                </p>
                <StyledInfoHelp id="inform">
              <div className="info">
                <div className="info__header">
                    <div className="info__header_text"><p>Info</p></div>
                    <div className="info__header_close" onClick={() => document.getElementById('inform').style.display = 'none'}><img src={CloseIcon} /></div>
                </div>
                <div className="info__content">
                    <div className="info__content__item">
                        <p className="info__content__item_text">Your deposit will be locked for 45 days. However, the rewards will always be available for withdrawal</p>
                    </div>
                </div>
              </div>
            </StyledInfoHelp>
                <StyledStakeItemHelp>
               <span class="i" onClick={() => document.getElementById('inform').style.display = 'flex'}>
                   <img src={HelpIcon} alt=""  />
                   <span class="tooltip">			
                        {t("STAKE.HELPSTAKE")}
                    </span>
                </span>
            </StyledStakeItemHelp>
            
            </StyledStakeItemHeader>
            <StyledStakeItemRow>
               <StyledAPR>
                     <span> {t("STAKE.APR")}</span>
               </StyledAPR>
              <p> {APR ? `${APR}%` : '-' }</p>
            </StyledStakeItemRow>
          </div> : <div>
              <StyledStakeItemHeader>
                  <p>
                      {t("FARMING_LP.TITLE")}
                  </p>
                  <StyledStakeItemHelp>
                  <span class="i">
                   <img src={HelpIcon} alt="" />
                   <span class="tooltip">			
                        {t("FARMING_LP.HELPLP")}
                    </span>
                </span>
                  </StyledStakeItemHelp>
              </StyledStakeItemHeader>
              
              <StyledFarmingItemRow>
               <StyledAPR>
                     <span> {t("FARMING_LP.APR")}</span>
               </StyledAPR>
              <p> { '-' }</p>
            </StyledFarmingItemRow>
        </div>}
      { version === "2" ? <StyledFarmingItemRow>
          <span> {t("FARMING_LP.REWARD")}</span>
          <p>
              {earnedText}
          </p>
      </StyledFarmingItemRow> : null }

      { version === "1" ? <StyledFarmingItemEarnedWithButton>
          <StyledStakeItemTextWithButton>
              <span>
                  {t("STAKE.EARNED")}
              </span>
              <p>{earned}</p>
          </StyledStakeItemTextWithButton>

          <StyledStakeItemButton onClick={ approved && canHarvest ? harvest : () => {} }>
              <span>{t("STAKE.HARVEST")}</span>
          </StyledStakeItemButton>

      </StyledFarmingItemEarnedWithButton> : <StyledFarmingItemEarnedWithButton>
          <StyledStakeItemTextWithButton>
              <span>
                  {t("STAKE.EARNED")}
              </span>
              <p>{'-'}</p>
          </StyledStakeItemTextWithButton>

          <StyledStakeItemButton activeButton={null } onClick={ null}>
              <span>{t("STAKE.HARVEST")}</span>
          </StyledStakeItemButton>
      </StyledFarmingItemEarnedWithButton> }
      { version === "1" ? <StyledStakeItemRowWithButton>
       <StyledStakeItemTextWithButton>
              <span> {t("STAKE.INSTAKE")}</span>
              <p>{inStake}</p>
          </StyledStakeItemTextWithButton>
      

          <StyledStakeItemButton activeButton={ null} onClick={canWithdraw ? withdraw : () => {}}>
             <span>{(activeButton && `${t("STAKE.STAKE")} METO`) ||
                  `${t("STAKE.WITHDRAW1")}`}{" "}</span>
          </StyledStakeItemButton>

      </StyledStakeItemRowWithButton> : <StyledStakeItemRowWithButton>
           <StyledStakeItemTextWithButton>
              <span> LP token in <br />stake</span>
              <p>{'-'}</p>
          </StyledStakeItemTextWithButton>
      
          <StyledStakeItemButton activeButton={null} onClick={null}>
             <span>{(activeButton && `${t("STAKE.STAKE")} METO`) ||
                  `${t("FARMING_LP.WITHDRAW")}`}{" "}</span>
          </StyledStakeItemButton>
      </StyledStakeItemRowWithButton>}


      { version === "1" ? <div>
      <StyledStakeItemRowWithButton>
          <StyledStake2ItemButton onClick={ approved ? handleStake : () => {} } style={{ width: '100%' }}>
              <span>Stake</span>
          </StyledStake2ItemButton>
      </StyledStakeItemRowWithButton>
      <StyledStakeItemRowWithButton2>
          <StyledStake2ItemButton onClick={ needToApprove ? (!approved ? approve : () => {}) : handleUseConnection } activeButton={ approved } style={{ width: '100%',background: 'linear-gradient(89.96deg, #455B3C 12.11%, #16280F 51.45%, #26411B 85.24%)'}}>
               <span>{ needToApprove ? (approved ? 'Approved' : 'Approve') : t("STAKE.CONNECT") }</span>
          </StyledStake2ItemButton>
      </StyledStakeItemRowWithButton2>
      </div> : <div>
      <StyledStakeItemRowWithButton>
          <StyledStake2ItemButton onClick={null } activeButton={  null} style={{ width: '100%' }}>
              <span>{t("FARMING_LP.FARMING")}</span>
          </StyledStake2ItemButton>
      </StyledStakeItemRowWithButton>
        </div>}
</StyledStakeItemContainer>

: version == "3"? 

<StyledStakeItemContainer>
  <StyledStakeItemHeader>
    <p>
       {t("FARMING_NFT.TITLE")}
    </p>
    <StyledStakeItemHelp>
    <span class="i">
          <img src={HelpIcon} alt="" />
          <span class="tooltip">			
          {t("FARMING_NFT.HELPNFT")}
    </span>
    </span>
    </StyledStakeItemHelp>
</StyledStakeItemHeader>

<StyledFarmingItemRow>
<StyledAPR>
  <span>{t("FARMING_NFT.RATE")}</span>
</StyledAPR>
<p style={{'color': '#c2abcb'}}>{'-'}</p>
</StyledFarmingItemRow>
<StyledFarmingItemRow>
<StyledAPR>
  <span>{t("FARMING_NFT.APR")}</span>
</StyledAPR>
<p style={{'color': '#c2abcb'}}>{'-'}</p>
</StyledFarmingItemRow>
  <StyledStakeItemRowWithButton>
     <div>
        <StyledStakeItemTextWithButton2>
           <span>{t("FARMING_NFT.AVAILABLE")} <br />-</span>
        </StyledStakeItemTextWithButton2>
         <StyledStakeItemTextWithButton>
           <span>{t("FARMING_NFT.INSTAKE")} <br />-</span> 
        </StyledStakeItemTextWithButton>
     </div>
     <div>
     <StyledStakeItemButton href="#" style={{'margin-bottom': '4vh', 'textDecoration': 'none'}}>
        <span>{t("FARMING_NFT.BUY")}</span>
      </StyledStakeItemButton>
     <StyledStakeItemButton activeButton={null  } onClick={null}>
        <span>{t("FARMING_NFT.CLAIM")}</span>
      </StyledStakeItemButton>
    </div>
  </StyledStakeItemRowWithButton>
  <div>
      <StyledStakeItemRowWithButton>
          <StyledStake2ItemButton style={{ width: '100%' }}>
             <span>{t("FARMING_NFT.FARMING")}</span>
          </StyledStake2ItemButton>
      </StyledStakeItemRowWithButton>
        </div>
</StyledStakeItemContainer> : null}
</StyledStakeItem>
);
};
