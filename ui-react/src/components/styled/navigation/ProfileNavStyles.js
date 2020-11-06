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

export const ProfileNavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    // override basic logo styles 
    #logo{
        font-size: 2rem;
        font-weight: bold;
        color: ${spicyMix};
    }
    .okta-cta {
        color: ${spicyMix};
        font-family: 'Ledger', serif;
    }
    .cart-icon {
        // fixed to mirror cart popout but both can be changed depending on feedback
        // position: fixed;
        // z-index: 10;
        // top: 8.5%;
        color: ${spicyMix}  
    }

`;

export const LinksDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    margin-right: 5%;
`;

export const StyledLink = styled.a`
    text-decoration: none;
    color: ${spicyMix}
`;

export const CartDiv = styled.div`
    margin-left: 5%;
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