import styled from 'styled-components';
import { accentColor, mainColor, tertiaryColor, success } from './colors';

export const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const HeroContainer = styled.div`
    // width: 100%;
    postion: absolute;
    text-align: center;
    // THIS HAS TO BE NESTED FOR CSS TO WORK
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
    height: 50%;
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
    font-size: 5rem;
    text-shadow: -1px 1px 0 ${accentColor};
`;

export const FeatSectionDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const FeatSectionTitle = styled.h3`
    align-self: flex-start;
    font-size: 2rem;
    margin-left: 5%;
`;

export const ItemImg = styled.img`
    width: 100%;
    object-fit: contain;
`;

export const FeaturedDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    // border: 1px solid ${accentColor};
    width: 25%;
    margin: 0 auto;
    margin-bottom: 10%;
    box-shadow: 1px 1px ${accentColor};

`;

export const SpinnerDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const ItemTitle = styled.h4`

`;

export const ItemRent = styled.p`

`;