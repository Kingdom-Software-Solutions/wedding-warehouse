import styled from 'styled-components';
import {
    pinkLady,
    spicyMix,
    floralWhite,
    floralWhiteLite,
    jon,
    acadia,
    success, danger
} from '../colors';

export const CheckoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2% 5%;
`;

export const BackLink = styled.div`
    cursor: pointer;
    align-self: flex-start;
`;

export const CheckoutTitle = styled.h2`
    color: ${spicyMix};
    font-size: 3rem;
`;

export const MasterInputContainer = styled.div`
    width: 80%;
    margin: 0 auto;
`;

export const GuestFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    margin-bottom: 1%;
`;

export const GuestInputContainer = styled.div`
    display: flex;
    width: 605px;
    margin: 0 auto;
    margin-bottom: 1%;
`;

export const GuestLabel = styled.label`
    white-space: nowrap; // keeps the name on one line
    text-align: left;
    margin-right: 5px;
    width: 110px;
`;

export const GuestInput = styled.input`
    max-width: 100%;
    align-self: flex-end;
    flex-grow: 2;
`;

export const NameContainer = styled.div`
    // use if we need to separate name from email
`;

export const ReserveDateContainer = styled.div`
   margin-bottom: 5%;
   .availablity-button {
       margin-left: 400px;
       margin-top: 1%;
       font-family: 'Ledger', serif;
       color: ${danger}
   }
`;

export const DatePickerContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 800px;
    margin: 0 auto;
`;

export const DateInputContainer = styled.div`
    margin: 2% 0;
`;



export const DateLabel = styled.label`
    margin-right: 2px;
`;

export const DateInput = styled.input`

`;

export const ConflictContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
`;

export const ConflictMessage = styled.p`
   white-space: nowrap;
`;

export const RemoveText = styled.p`
   margin: 0 2%;
`;

export const CheckoutCartContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5%;
`;

export const CheckoutItemContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 500px;
    margin: 0 auto;
    margin-bottom: 2%;
`;
export const CheckoutImageContainer = styled.div`
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
`;

export const CheckoutItemImage = styled.img`
    max-height: 100%;
    max-width: 100%;
    height: 5vw;
    width: 9vw;
    margin: 0 auto;
    border-radius: 5%;
`;

export const CheckoutInfoContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`;

export const CheckoutItemName = styled.p`

`;

export const CheckoutItemRate = styled.p`

`;

export const FinalTotalPerDay = styled.p`
    text-align: center;
    .total-amount {
        color: ${success}
    }
    margin-bottom: 5%; // push action div away
`;

export const CheckoutActions = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 90%;
    margin: 0 auto;
    .action {
        font-family: 'Ledger', serif;
    }
`;