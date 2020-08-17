import styled from 'styled-components';
import { accentColor, mainColor, tertiaryColor, success } from './colors';

export const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const HeroContainer = styled.div`
    // width: 100%;
    postion: relative;
    text-align: center;
    // THIS HAS TO BE NESTED FOR CSS TO WORK
    .hero-details{
        margin: 0 auto;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -90%);        
    };
`;

export const HeroImage = styled.img`
    width: 100%;
    max-height: 600px;
    height: auto;
    opacity: 50%;
    object-fit: cover;
    border-top: 2px solid ${mainColor};
    border-bottom: 2px solid ${mainColor}
`;

export const HeroTextDiv = styled.div`
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    .hero-cta{
        color: ${mainColor}
    }
`;

export const HeroText = styled.p`
    color: ${mainColor};
    font-family: 'Marck Script', cursive;
    font-size: 4rem;
    text-shadow: -1px 1px 0 ${accentColor};
    
`;