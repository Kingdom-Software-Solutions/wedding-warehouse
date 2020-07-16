import styled from 'styled-components';
import {
    mainColor,
    secondaryColor,
    tertiaryColor,
    accentColor
} from './colors'

export const InvPageContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const MappedItems = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-flow: wrap;
    width: 90%;
    margin: 0 auto;
`;

export const ItemDiv = styled.div`
    width: 20%;
    margin: 5%;
`;
// box in the images
export const ImgContainer = styled.div`
    max-width: 100%;
    border: 1px solid black
`;

export const StyledImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    height: 200px;
    width: 200px;
    object-fit: contain;
`;