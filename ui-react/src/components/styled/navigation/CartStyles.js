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
    accentColor, 
    danger,
    success
} from '../colors'

export const CartContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute; // maybe fixed?
    z-index: 10;
    max-width: 100%;
    width: 20%;
    padding: 1%;
    top: 4.3%;
    right: 2%;
    border: 2px solid ${jon};
    background-color: #FFFFFF;
`;

export const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-bottom: 5%;
`;

export const CartTitle = styled.div`
    font-size: 1rem;
    color: ${spicyMix};
`;

export const CartItem = styled.div`
    display: flex;
`;

export const ItemDetails = styled.div`
    display: flex;
    justify-content: space-around; 
    align-items: center;
    width: 100%;
    margin: 3% 0;
`;

export const ImageContainer = styled.div`
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
`;

export const DetailsImage = styled.img`
    max-height: 100%;
    max-width: 100%;
    height: 3.5vw;
    width: 5vw;
    margin: 0 auto;
    border-radius: 5%;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
`;

export const ItemName = styled.div`
    white-space: nowrap; // keeps the name on one line
    font-size: .85rem;
    margin: 0 auto;
`;

export const ItemRate = styled.div`
    font-size: .75rem;
    margin: 0 auto;
    color: ${spicyMix};
`;

export const TotalPerDay = styled.p`
    font-size: .95rem;
    text-align: center;
    .total-amount {
        color: ${success}
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    .action {
        font-family: 'Ledger', serif;
        font-size: .75rem;
    }
`;