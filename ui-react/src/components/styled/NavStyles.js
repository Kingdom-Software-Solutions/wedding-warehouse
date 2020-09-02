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
} from './colors'

export const NavContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    background-color: ${jon};
    // override basic logo styles 
    #logo{
        color: ${floralWhiteLite};
    }
    .okta-cta {
        color: ${floralWhiteLite};
        font-family: 'Ledger', serif;
    }

`;

export const NavWrapper = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 40%;
    a:hover {
        color: ${mainColor}
    }
`;

export const NavTitle = styled.h1`
    text-decoration: none;
    font-family: 'Marck Script', cursive;
    color: ${mainColor};
    border-bottom: 2px solid ${accentColor};
`;

export const StyledLink = styled.a`
    text-decoration: none;
    color: ${floralWhiteLite};
`;
