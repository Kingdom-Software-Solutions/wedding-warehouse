import styled from 'styled-components';
import {
    pinkLady,
    spicyMix,
    floralWhite,
    floralWhiteLite,
    jon,
    acadia
} from '../colors';


export const InvPageContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const InvPageTitle = styled.h2`
    color: ${spicyMix};
    font-size: 3rem;
    margin-top: 0;
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
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    .add-cart {
        color: ${pinkLady}
    }
`;

export const StyledImg = styled.img`
    max-height: 100%;
    max-width: 100%;
    height: 12vw;
    width: 20vw;
    margin: 0 auto;
    border-radius: 5%;
`;


export const DetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 5%;
`;

export const ActionContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 5%;
`;