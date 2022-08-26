import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { PopUp } from './PopUp';
import WalletIcon from '../../assets/imgs/wallet.png';
import { useTranslation } from "react-i18next";

const StyledStakeContent = styled.div`
   @media (max-width: 600px) {
        background: #131D32;
        padding: 20px 12px 20px 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    }
`;

const StyledStakeAmount = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 570px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    & input {
        background: transparent;
        border: 0;
        flex: 1;
        outline: none;
        font-family: 'Gilroy';
        font-style: normal;
        font-weight: 700;
        font-size: 25px;
        line-height: 30px;
        color: #fff;
    }
    & .currency {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        font-weight: 600;
        opacity: .7;
        & .currency__line {
            border: 1px solid rgba(255, 255, 255, 0.2);
            height: 69px;
            position: absolute;
            left: -28px;
        }
        & .currency__text {
            font-family: 'Gilroy';
            font-style: normal;
            font-weight: 600;
            font-size: 25px;
            line-height: 30px;
            color: rgba(255, 255, 255, 0.5);
        }
    }
    @media (max-width: 600px) {
        width: 256px;
        padding: 10px 20px 10px 20px;
        & input{width: 230px;}
        & .currency {
            & .currency__line{height: 48px;}
            & .currency__text{font-size: 20px;}
        }
    } 
`;

const StyledStakeButtonsRow = styled.div`
    display: flex;
    justify-content: right;
    align-items: center;
    flex-direction: row;
    gap: 20px;
    margin-top: 20px;
`;

const StyledStakeItemButton = styled.a`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 40px 12px 40px;
    max-width: 75px;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.1) 50%,
        rgba(255, 255, 255, 0.1) 50.1%,
        rgba(255, 255, 255, 0.2) 100%
    );
    background-size: 200%;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    flex: 1;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
    letter-spacing: 0.02em;
    color: #ffffff;
    transition-duration: 0.2s;
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
    @media (max-width: 600px){
        padding: 7px 40px 7px 40px;
        max-width: 57px;
    }
`;


export const StakePopUp = ({version, visible, onClose, onConfirm, onSwapConfirm,onWindrawConfirm, inStake }) => {
    let [ amount, setAmount ] = useState(0);
    const { t } = useTranslation();
    
    const handleClose = useCallback(() => {
        onClose(true);
    }, [ onClose ]);

    const handleConfirm = useCallback(() => {
        onConfirm(amount);
    }, [ onConfirm, amount ]);
    
    const handleSwapConfirm = useCallback(() => {
        onSwapConfirm(amount);
    }, [ onSwapConfirm, amount ]);

    const handleWindrawConfirm = useCallback(() => {
        onWindrawConfirm(amount);
    }, [ onWindrawConfirm, amount ]);

    const handleInputChange = event => {
        setAmount(+event.target.value);
    }

    return version == "1" || version == "2" ? <PopUp label="Stake" visible={visible} onClose={ handleClose }>
        <StyledStakeContent><StyledStakeAmount>
            <input type="text" value={ amount } onChange={ handleInputChange }/>
            <div className="currency">
                <div className='currency__line'></div>
                <span className='currency__text'>Ceji</span>
            </div>
        </StyledStakeAmount>
        <StyledStakeButtonsRow>
            <StyledStakeItemButton onClick={ handleClose } style={{background: 'linear-gradient(89.94deg, #171D2C 7.46%, #12254D 52.86%, #171E2C 99.94%)'}}>
                <span>
                    Cancel
                </span>
            </StyledStakeItemButton>
            <StyledStakeItemButton onClick={ () => {handleConfirm() } } style={{background: 'linear-gradient(90.36deg, #171E2C 3.2%, #22311B 52.48%, #171F2D 99.73%)'}}>
                <span>
                    Confirm
                </span>
            </StyledStakeItemButton>
        </StyledStakeButtonsRow></StyledStakeContent>
    </PopUp>
    : version == "3" ? <PopUp label="Swap" visible={visible} onClose={ handleClose }>
        <StyledStakeAmount>
            <input type="text" value={ amount } onChange={ handleInputChange }/>
            <div className="currency">
                { inStake || '-' } METO
                <img src={WalletIcon} alt="Wallet"/>
            </div>
        </StyledStakeAmount>
        <StyledStakeButtonsRow>
            <StyledStakeItemButton onClick={ handleClose }>
                <span>
                   {t("SWAP.CANCEL")}
                </span>
            </StyledStakeItemButton>
            <StyledStakeItemButton onClick={ () => { handleSwapConfirm() } }>
                <span>
                   {t("SWAP.CONFIRM")}
                </span>
            </StyledStakeItemButton>
        </StyledStakeButtonsRow>
    </PopUp> : null
}