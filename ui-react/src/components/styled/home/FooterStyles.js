import styled from 'styled-components';
import { 
    accentColor, 
    mainColor, 
    pinkLady,
    spicyMix,
    floralWhite,
    floralWhiteLite,
    jon,
    acadia
 } from '../colors';

 export const FooterContainer = styled.div`
    width: 100%;
    background-color: ${jon};
    color: ${floralWhiteLite};
    #logo{
        color: ${floralWhiteLite};
        font-size: 1.5rem;
    }
    .okta-cta {
        color: ${floralWhiteLite};
        font-family: 'Ledger', serif;
    }
    
 `;

 export const StyledFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    text-align: center;
    align-items: center;
    margin: 0 1%;
 `;

 export const SocialDiv = styled.div`
    // centers the icon, may need to be adjusted later
    margin-left: 5%;
 `;

//  export const FooterAuthButton = styled.button`
    
//  `;