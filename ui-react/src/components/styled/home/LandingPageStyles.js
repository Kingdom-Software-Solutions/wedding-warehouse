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

export const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
export const HeroContainer = styled.div`
    width: 100%;
    postion: absolute;
    text-align: left;
    // THIS HAS TO BE NESTED FOR CSS TO WORK
    color: ${floralWhiteLite};
    .hero-details{
        margin: 0 auto;
        position: absolute;
        line-height: inherit;
        top: 500px; // this needs to be px so it can remain vertically fixed
        left: 50%;
        transform: translate(-50%, -90%);     
    };
`;

export const HeroImage = styled.img`
    width: 100%;
    max-height: 600px;
    opacity: 90%;
    object-fit: cover;
`;

export const HeroTextDiv = styled.div`
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    .hero-cta{
        color: ${floralWhiteLite};
        border: 1 px ${floralWhiteLite};
        font-family: 'Ledger', serif;
    };
`;

export const HeroText = styled.p`
    font-size: 4.6rem;
    text-shadow: -1px 1px 0 ${acadia};
    margin: 0 auto;
`;

export const HeroSubText = styled.p`
    font-size: 1.25rem;
    text-shadow: -1px 1px 0 ${acadia};
`;
