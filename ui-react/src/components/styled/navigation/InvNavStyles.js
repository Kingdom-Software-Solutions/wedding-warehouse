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

export const InvNavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // override basic logo styles 
    #logo{
        font-size: 2rem;
        color: ${spicyMix};
    }
    .okta-cta {
        color: ${spicyMix};
        font-family: 'Ledger', serif;
    }
    .cart-icon {
        // space cart out
        margin: 0 2%;
        color: ${spicyMix}  
    }

`;

export const LogoDiv = styled.div`
    margin-left: 5%;
    cursor: pointer;
`;

export const UserActionDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-right: 5%;
    width: 15%;
`;