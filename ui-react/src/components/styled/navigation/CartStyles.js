import styled from 'styled-components';
import {
    mainColor,
    secondaryColor,
    pinkLady,
    spicyMix,
    floralWhite,
    floralWhiteLite,
    jon,
    acadia,
    accentColor
} from '../colors'

export const CartContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // maybe fixed?
    z-index: 10;
    max-width: 100%;
    padding: 1%;
    top: 4.3%;
    right: 2%;
    border: 2px solid ${jon};
    background-color: #FFFFFF;
`;

export const TopBar = styled.div`
    display: flex
    align-items: center;
`;

export const CartItem = styled.div`

`;