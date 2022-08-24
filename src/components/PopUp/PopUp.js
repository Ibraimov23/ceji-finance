import { useState, useCallback } from 'react';
import styled from "styled-components";
import CloseIcon from '../../assets/imgs/close.png';


const StyledPopUpContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 650;
`;

const StyledPopUpMessage = styled.div`
    position: relative;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    border-radius: 18px;
    padding: 23px 30px;
    background: #131D32;
    @media (max-width: 600px) {
        background: unset;
    }
`;

const StyledPopUpMessageCloseButton = styled.div`
    cursor: pointer;
    width: 30px;
    height: 30px;
    padding: 6px;
    right: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    transition: .05s ease;
    & img {
        width: 32px;
        height: 32px;
    }
    @media (max-width: 600px) {
        background: #131D32;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        padding: 11px;
    }
`;
const StyledPopUpMessageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 600px) {
        gap: 5px;
    }
`;
const StyledPopUpMessageLabel = styled.div`
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 48px;
    color: #70BF50;
    margin-bottom: 19px;
    @media (max-width: 600px) {
        background: #131D32;
        flex-grow: 1;
        text-align: center;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        font-size: 26px;
        padding-top: 2px;
        padding-bottom: 2px;
        margin-bottom: 17px;
    }
`;


export const PopUp = ({ children, label, visible, onClose }) => {
    const handleClose = useCallback(() => {
        onClose(true);
    }, [ onClose ]);

    return <StyledPopUpContainer style={{ display: visible ? 'flex' : 'none' }}>
        <StyledPopUpMessage>
            <StyledPopUpMessageHeader>
                <StyledPopUpMessageLabel>{ label }</StyledPopUpMessageLabel>
                <StyledPopUpMessageCloseButton onClick={ handleClose }>
                    <img src={ CloseIcon } alt="Close"/>
                </StyledPopUpMessageCloseButton>
            </StyledPopUpMessageHeader>
            { children }
        </StyledPopUpMessage>
    </StyledPopUpContainer>
}