import { useCallback,useState, useImperativeHandle, useEffect} from 'react';
import styled from 'styled-components';
import { PopUp } from './PopUp';
import MetaMaskLogo from '../../assets/svg/metamask.svg';
import WalletConnectLogo from '../../assets/svg/walletconnect.svg';

const StyledConnectContent = styled.div`
    display: flex;
    align-items: end;
    gap: 140px;
    @media (max-width: 600px) {
        display: block;
        background: #131D32;
        padding: 20px 20px 10px 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
    }
`;
const StyledConnectBlock = styled.div`
    .track__metamask,.track__wallet {min-width: 230px; position: relative;}
`;
const StyledConnectEndStyle = styled.div`
    position: absolute;
    width: 3.5px;
    height: 50px;
    right: -4px;
    border-radius: 8px;
`;
const StyledConnectSubmit = styled.div`
    div {min-width: 145px; justify-content: center; &:hover{background: linear-gradient(89.96deg, #455B3C 12.11%, #16280F 51.45%, #26411B 85.24%);}}
    @media (max-width: 600px) {background: linear-gradient(89.96deg, #455B3C 12.11%, #16280F 51.45%, #26411B 85.24%);}
`;
const StyledConnectButton = styled.div`
    display: flex;
    gap: 20px;
    display: flex;
    align-items: center;
    font-size: 20px;
    padding: 16px;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: .05s ease;
    margin-bottom: 16px;
    & img {
        height: 30px;
    }
    p {
     font-family: 'Gilroy';
     font-style: normal;
     font-weight: 700;
     font-size: 20px;
     line-height: 24px;
     color: rgba(255, 255, 255, 0.9);
    }
    
`;


export const WalletConnectPopUp = ({ visible, onClose, onConnect }) => {
    const [ selected, select ] = useState(null);

    const handleClose = useCallback(() => {
        onClose();
    }, [ onClose ]);
    
    const connect = (value) => {
       let metamask = document.querySelectorAll(".track__metamask")
       let wallet = document.querySelectorAll(".track__wallet")
       if(value == 'MetaMask'){
            select(value);
            metamask[0].classList.add('popUp__track__wallets_selectMetamask')
            wallet[0].classList.remove('popUp__track__wallets_selectWallet')
       }
       else if(value == 'WalletConnect') {
            select(value);
            wallet[0].classList.add('popUp__track__wallets_selectWallet')
            metamask[0].classList.remove('popUp__track__wallets_selectMetamask')
       }
    }

    const handleConnect = useCallback(wallet => {
        onConnect(wallet);
    }, [ onConnect ]);
    
return <PopUp label="Track Wallet" visible={ visible } onClose={ handleClose }>
    <StyledConnectContent>
        <StyledConnectBlock>
            <StyledConnectButton className='track__metamask' onClick={ () => connect('MetaMask') }>
                <img alt="MetaMask" src={ MetaMaskLogo }/>
                <p>MetaMask</p>
                <StyledConnectEndStyle style={{'background-color': '#FF8541','box-shadow': '3px 0px 4px rgba(255, 133, 65, 0.25)'}}></StyledConnectEndStyle>
            </StyledConnectButton>
            <StyledConnectButton className='track__wallet' onClick={ () => connect('WalletConnect')  }>
                <img alt="WalletConnect" src={ WalletConnectLogo }/>
                <p>WalletConnect</p>
                <StyledConnectEndStyle style={{'background-color': '#4E8AFF','box-shadow': '3px 0px 4px rgba(65, 164, 255, 0.25)'}}></StyledConnectEndStyle>
            </StyledConnectButton>
        </StyledConnectBlock>
        <StyledConnectSubmit>
            <StyledConnectButton onClick={ () => handleConnect(selected) }>
                <p>Connect</p>
            </StyledConnectButton>
        </StyledConnectSubmit>
    </StyledConnectContent>
</PopUp>
}