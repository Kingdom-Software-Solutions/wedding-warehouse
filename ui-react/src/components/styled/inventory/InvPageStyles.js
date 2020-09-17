import styled from 'styled-components';
import {
    pinkLady,
    spicyMix,
    floralWhite,
    floralWhiteLite,
    jon,
    acadia,
    success
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
    line-height: 50%;
    align-items: stretch;
    // width: 100%;
    margin-top: 15%;
    margin-bottom: 5%;
`;

export const ActionContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 5%;
`;

export const ItemName = styled.h3`
    font-size: 1.25rem;
`;

export const RentRate = styled.p`
    font-size: 1.35rem;
    font-weight: bold;
    color: ${spicyMix};
    // tricky little hack along with line-height in the details div
    // makes the details div even with each mapped item
    padding-top: 2%;
`;

export const CustomizableItem = styled.p`
    font-size: .85rem;
    margin-top: 0;
    margin-bottom: 0;
    align-self: flex-end;
    color: ${success};

`;

export const CustomInfo = styled.span`

`

export const NullCustomizable = styled.p`
    // crude hack to make items even, forgive me lol
    // color matches the background
    font-size: .7rem;
    margin-top: 0;
    margin-bottom: 0;
    color: ${floralWhite}
`;

export const CustomizableDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    // info styling for customizable items
    .custom:hover {
        cursor: help;
        color: ${spicyMix}
    }
`;

export const RentDiv = styled.div`
`;