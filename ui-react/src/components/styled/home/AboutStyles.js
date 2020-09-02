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
    color: ${acadia}
}
`;

export const SubSectionDiv = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;