import styled from 'styled-components';
import { accentColor, mainColor, success } from './colors';

export const ItemPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    .back-btn {
        align-self: flex-start;
        margin-top: 2%;
        margin-left: 5%;
    }
`;


export const ItemDiv = styled.div`
    margin: 0 5%;
`;

export const ItemName = styled.h2`
    font-size: 4rem;
`;
export const Detail = styled.p`
    font-size: 1.5rem;
`;
export const Customizable = styled.span`
    font-size: 1rem;
    color: ${success}
`;
export const PriceContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 50%;
    margin: 0 auto;
`;
// box in the images
export const ItemImgContainer = styled.div`
    max-width: 100%;
`;

export const ItemImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    height: 500px;
    width: 500px;
    // remove border styles and object fit if uploaded photos look gross
    // object-fit: contain;
    border: 2px solid ${accentColor};
    box-shadow: 2px 2px 2px ${mainColor};
`;

export const ItemDetails = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-bottom: 1%; // push buttons below away from div 
`;

export const ActionsDiv = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    max-width: 100%;
    width: 25%;
    button {
        margin: 2%;
    }
`;

// single edit form styles 
export const ItemEditForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 5%;
`;

export const ActionContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 5%;
`;

// info container
export const InfoContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-bottom: 2.5%;
`;

// toggle custom div
export const ToggleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    label {
        margin-right: 2%;
    }
`;