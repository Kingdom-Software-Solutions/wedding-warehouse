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

export const AboutContainer = styled.div`
    margin: -5px;
    background-color: ${pinkLady};
    color: ${jon};
    #logo {
        font-size: 1.25rem;
        margin-top: 1.5%;
        color: ${acadia}
    }
    padding: 1%;
    width:100%;
`;

export const SectionTitleDiv = styled.div`
    // display: flex;
    // flex-direction: column;
    // align-items: center
    width: 80%;
    margin: 0 auto;
`;

export const SubSectionDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

export const AboutTitle = styled.h3`
    font-size: 3rem;
    // overwrites the inherited margin to match first figma
    margin-top: 0;
`;

export const AboutText = styled.p`
    font-size: 1.5rem;
`;

// Is there a better name for this? 🤔
export const FeatureBox = styled.div`
    width: 25%;
    background-color: ${floralWhite};
    margin: 2.5% 0;
    padding: 1%;
`;

export const FeatureTitle = styled.h4`
    font-size: 2rem;
`;

export const FeatureText = styled.p`
    font-size: 1rem;
`;